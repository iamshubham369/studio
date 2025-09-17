
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldName } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { runAssessmentAnalysis } from './actions';
import { AssessmentAnalysisInputSchema as formSchema } from '@/ai/schemas/assessment-analysis';
import type { z } from 'zod';

type FormData = z.infer<typeof formSchema>;

const questions = [
  {
    name: 'sleepQuality' as const,
    label: '1. Over the last week, how would you rate your sleep quality?',
    options: [
      { value: 'very_good', label: 'Very Good' },
      { value: 'good', label: 'Good' },
      { value: 'average', label: 'Average' },
      { value: 'poor', label: 'Poor' },
      { value: 'very_poor', label: 'Very Poor' },
    ],
  },
  {
    name: 'energyLevels' as const,
    label: '2. How have your energy levels been recently?',
    options: [
      { value: 'very_high', label: 'Very High' },
      { value: 'high', label: 'High' },
      { value: 'moderate', label: 'Moderate' },
      { value: 'low', label: 'Low' },
      { value: 'very_low', label: 'Very Low' },
    ],
  },
    {
    name: 'stressLevel' as const,
    label: '3. How often have you felt overwhelmed by stress in the past week?',
    options: [
      { value: 'never', label: 'Never' },
      { value: 'rarely', label: 'Rarely' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'often', label: 'Often' },
      { value: 'always', label: 'Always' },
    ],
  },
  {
    name: 'anxietyFrequency' as const,
    label: '4. How often have you been bothered by feeling nervous, anxious, or on edge?',
    options: [
        { value: 'not_at_all', label: 'Not at all' },
        { value: 'several_days', label: 'Several days' },
        { value: 'more_than_half_the_days', label: 'More than half the days' },
        { value: 'nearly_every_day', label: 'Nearly every day' },
    ],
  },
    {
    name: 'interestInActivities' as const,
    label: '5. How much interest or pleasure have you had in doing things you normally enjoy?',
    options: [
      { value: 'very_high_interest', label: 'Very high interest' },
      { value: 'high_interest', label: 'High interest' },
      { value: 'some_interest', label: 'Some interest' },
      { value: 'little_interest', label: 'Little interest' },
      { value: 'no_interest', label: 'No interest at all' },
    ],
  },
    {
    name: 'socialConnection' as const,
    label: '6. How connected have you felt to others (friends, family, etc.)?',
    options: [
      { value: 'very_connected', label: 'Very connected' },
      { value: 'connected', label: 'Connected' },
      { value: 'somewhat_connected', label: 'Somewhat connected' },
      { value: 'disconnected', label: 'Disconnected' },
      { value: 'very_disconnected', label: 'Very disconnected' },
    ],
  },
  {
    name: 'overallMood' as const,
    label: '7. In general, how would you describe your overall mood lately?',
    options: [
      { value: 'excellent', label: 'Excellent' },
      { value: 'good', label: 'Good' },
      { value: 'fair', label: 'Fair' },
      { value: 'poor', label: 'Poor' },
      { value: 'very_poor', label: 'Very Poor' },
    ],
  },
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sleepQuality: '',
      energyLevels: '',
      stressLevel: '',
      anxietyFrequency: '',
      interestInActivities: '',
      socialConnection: '',
      overallMood: '',
    },
  });

  const processForm = (values: FormData) => {
    toast({
      title: 'Analyzing your results...',
      description: 'This may take a moment. Please wait.',
    });

    startTransition(async () => {
      try {
        const results = await runAssessmentAnalysis(values);
        sessionStorage.setItem('assessmentResults', JSON.stringify(results));
        router.push('/assessment/results');
      } catch (error) {
        console.error('Assessment analysis failed:', error);
        toast({
          title: 'Analysis Failed',
          description: 'We couldn\'t process your assessment right now. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  const handleNext = async () => {
    const fieldName = questions[currentStep].name;
    const isValid = await form.trigger(fieldName as FieldName<FormData>);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold">Mental Wellness Assessment</h1>
        <p className="text-muted-foreground mt-2">
          This short, confidential assessment helps you understand your current well-being.
        </p>
      </div>

      <div className="space-y-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground text-center">Question {currentStep + 1} of {questions.length}</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className="overflow-hidden relative min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
            >
                <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{currentQuestion.label}</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                    control={form.control}
                    name={currentQuestion.name}
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-2"
                            >
                            {currentQuestion.options.map((opt) => (
                                <FormItem key={opt.value} className="flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-colors hover:bg-accent hover:text-accent-foreground has-[:checked]:bg-accent">
                                <FormControl>
                                    <RadioGroupItem value={opt.value} />
                                </FormControl>
                                <FormLabel className="font-normal w-full cursor-pointer">{opt.label}</FormLabel>
                                </FormItem>
                            ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 w-full flex justify-between mt-6">
            <Button type="button" onClick={handlePrev} disabled={currentStep === 0 || isPending} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < questions.length - 1 ? (
              <Button type="button" onClick={handleNext} disabled={isPending}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                 {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Submit for Analysis
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
