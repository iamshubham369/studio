// src/app/assessment/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, ArrowRight, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { getAssessmentResult } from './actions';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import type { AssessmentResult } from '@/ai/flows/mental-health-assessment';

const questions = [
  { id: 'q1', text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"], category: "Anxiety" },
  { id: 'q2', text: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"], category: "Anxiety" },
  { id: 'q3', text: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"], category: "Depression" },
  { id: 'q4', text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"], category: "Depression" },
  { id: 'q5', text: "Over the last 2 weeks, how often have you felt overwhelmed by your responsibilities?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"], category: "Stress" },
  { id: 'q6', text: "Over the last 2 weeks, how often have you found it difficult to relax?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"], category: "Stress" },
  { id: 'q7', text: "Over the last 2 weeks, have you had any thoughts that you would be better off dead, or of hurting yourself?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"], category: "High-Risk" },
];

type AnswersState = { [key: string]: string };

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      const assessmentData = {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question: questions.find(q => q.id === questionId)?.text || '',
          answer: answer,
        })),
      };

      const res = await getAssessmentResult(assessmentData);
      if (res.success) {
        setResult(res.result!);
      } else {
        setError(res.error || 'An unknown error occurred.');
      }
    });
  };
  
  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setError(null);
  }

  const progress = (currentQuestionIndex / (questions.length -1)) * 100;
  const isCurrentQuestionAnswered = !!answers[questions[currentQuestionIndex].id];

  if (isPending) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Analyzing your results...</p>
            <p>This may take a moment.</p>
        </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg text-destructive mb-4">Failed to analyze results.</p>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={handleSubmit}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }


  if (result) {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Your Assessment Results</CardTitle>
                    <CardDescription>This is not a medical diagnosis. It's a tool to help you understand your feelings. If you are in distress, please seek professional help.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {result.isHighRisk && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Important: Please Seek Support</AlertTitle>
                            <AlertDescription>
                                Your responses suggest you may be going through a difficult time. We strongly encourage you to talk to a professional. 
                                <Link href="/emergency" className="font-bold underline ml-2">Find Emergency Contacts</Link>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Overall Summary</h3>
                        <p className="text-muted-foreground">{result.overallFeedback}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg mb-2">Category Breakdown</h3>
                        {result.categoryScores.map(category => (
                            <div key={category.category}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-medium">{category.category}</p>
                                    <p className="text-sm font-bold">{category.score}/100</p>
                                </div>
                                <Progress value={category.score} />
                                <p className="text-sm text-muted-foreground mt-2">{category.feedback}</p>
                            </div>
                        ))}
                    </div>

                </CardContent>
            </Card>
             <div className="flex justify-center gap-4">
                <Button onClick={handleRetake}>
                  <RefreshCw className="mr-2 h-4 w-4"/> Retake Assessment
                </Button>
                <Button asChild>
                    <Link href="/resources">
                        View Personalized Resources <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Mental Health Assessment</CardTitle>
        <CardDescription>
          Answer the following questions honestly to get insight into your well-being. This is a private assessment.
        </CardDescription>
         <div className="pt-4">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground mt-2 text-center">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{currentQuestion.text}</Label>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-2"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${currentQuestion.id}-${index}`} />
                  <Label htmlFor={`${currentQuestion.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={handleNext} disabled={!isCurrentQuestionAnswered}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!isCurrentQuestionAnswered}>
                View Results
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
