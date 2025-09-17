'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, BarChart, Activity, Moon, Users, AlertCircle } from 'lucide-react';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  PolarRadiusAxis,
} from 'recharts';

interface Analysis {
  overallScore: number;
  summary: string;
  insights: {
    title: string;
    score: number;
    summary: string;
    feedback: string;
  }[];
  nextSteps: string[];
}

const iconMap: { [key: string]: React.ElementType } = {
  default: BarChart,
  Stress: Activity,
  Sleep: Moon,
  Social: Users,
  Mood: Activity, // Re-using an icon
};

// This is a placeholder function to generate a plausible analysis
// In a real scenario, this logic would live on the server and be powered by an LLM
function generateSimpleAnalysis(answers: any): Analysis {
    // Simple scoring logic
    const scoreMap: { [key: string]: number } = {
        'very_good': 100, 'good': 75, 'average': 50, 'poor': 25, 'very_poor': 0,
        'very_high': 100, 'high': 75, 'moderate': 50, 'low': 25, 'very_low': 0,
        'never': 100, 'rarely': 75, 'sometimes': 50, 'often': 25, 'always': 0,
        'not_at_all': 100, 'several_days': 66, 'more_than_half_the_days': 33, 'nearly_every_day': 0,
        'very_high_interest': 100, 'high_interest': 75, 'some_interest': 50, 'little_interest': 25, 'no_interest': 0,
        'very_connected': 100, 'connected': 75, 'somewhat_connected': 50, 'disconnected': 25, 'very_disconnected': 0,
        'excellent': 100
    };

    const sleepScore = scoreMap[answers.sleepQuality] ?? 50;
    const stressScore = scoreMap[answers.stressLevel] ?? 50;
    const moodScore = scoreMap[answers.overallMood] ?? 50;
    const socialScore = scoreMap[answers.socialConnection] ?? 50;

    const overallScore = Math.round((sleepScore + stressScore + moodScore + socialScore) / 4);

    return {
        overallScore,
        summary: overallScore > 70 ? "You're showing great signs of well-being!" : "There are opportunities to enhance your well-being.",
        insights: [
            {
                title: 'Sleep Quality',
                score: sleepScore,
                summary: 'Consistent sleep is key to energy and mood.',
                feedback: 'Try to establish a regular sleep schedule, even on weekends. Avoid screens before bed to help your mind wind down naturally. A calm, dark, and cool room can significantly improve sleep quality.'
            },
            {
                title: 'Stress Level',
                score: stressScore,
                summary: 'Managing stress is crucial for academic success.',
                feedback: 'Incorporate short breaks into your study sessions. Techniques like deep breathing or a quick walk can help reset your focus. Identifying your main stressors is the first step to addressing them.'
            },
            {
                title: 'Overall Mood',
                score: moodScore,
                summary: 'Your mood influences your daily outlook.',
                feedback: 'Engaging in hobbies you enjoy can be a great mood booster. Even small moments of joy, like listening to a favorite song or spending time in nature, can make a positive difference.'
            },
            {
                title: 'Social Connection',
                score: socialScore,
                summary: 'Strong social ties are important for mental health.',
                feedback: 'Make an effort to connect with friends or family, even with a short text or call. Joining a club or a study group can also be a great way to meet new people with similar interests.'
            },
        ],
        nextSteps: [
            'Try one new relaxation technique from our Relax page this week.',
            'Schedule a 15-minute walk outside at least three times this week.',
            'Reach out to one friend or family member just to chat.',
            'Explore the personalized resources section for more tailored advice.'
        ]
    };
}


export default function ResultsPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const answersJson = sessionStorage.getItem('assessmentAnswers');
    if (answersJson) {
      try {
        const answers = JSON.parse(answersJson);
        const generatedAnalysis = generateSimpleAnalysis(answers);
        setAnalysis(generatedAnalysis);
      } catch (e) {
        setError('Failed to process your assessment. Please try again.');
        console.error(e);
      }
    } else {
      // If there are no answers, it's better to redirect than to show an error
      router.replace('/assessment');
    }
  }, [router]);
  
  const radarChartData = analysis?.insights.map(insight => ({
      subject: insight.title,
      score: insight.score,
      fullMark: 100,
  })) || [];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
        <p className="text-muted-foreground max-w-md mb-6">{error}</p>
        <Button onClick={() => router.push('/assessment')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Try Assessment Again
        </Button>
      </div>
    );
  }

  if (!analysis) {
    // This can be a simple loading state or skeleton
    return (
        <div className="flex items-center justify-center h-full min-h-[50vh]">
            <p>Generating your report...</p>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold">Your Wellness Report</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Here is a summary of your self-assessment.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center">
            <CardHeader>
                <CardTitle>Overall Wellness Score</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative h-48 w-48">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[{ subject: 'Score', score: analysis.overallScore, fullMark: 100 }]}>
                          <PolarGrid gridType="circle" />
                           <PolarAngleAxis dataKey="subject" tick={false} />
                           <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                    <p className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-primary">
                        {analysis.overallScore}
                    </p>
                </div>
                <p className="text-muted-foreground text-sm mt-2">{analysis.summary}</p>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>How you scored in different areas of your well-being.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarChartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar 
                            name="Score" 
                            dataKey="score" 
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary))" 
                            fillOpacity={0.6} 
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader>
            <CardTitle>Insights & Suggestions</CardTitle>
            <CardDescription>Personalized feedback and suggestions for each category.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            {analysis.insights.map(insight => {
                 const Icon = iconMap[insight.title.split(' ')[0]] || iconMap.default;
                 return (
                    <div key={insight.title} className="p-4 rounded-lg border bg-card/50">
                        <h3 className="font-headline font-semibold flex items-center mb-2">
                            <Icon className="mr-2 h-5 w-5 text-primary" />
                            {insight.title} (Score: {insight.score})
                        </h3>
                        <p className="text-sm text-muted-foreground italic mb-3">"{insight.summary}"</p>
                        <p className="text-sm">{insight.feedback}</p>
                    </div>
                 );
            })}
        </CardContent>
      </Card>
      
      <Card className="bg-primary/10 border-primary/30">
        <CardHeader>
          <CardTitle>Your Next Steps</CardTitle>
          <CardDescription>Here are a few simple, actionable suggestions based on your report.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={() => router.push('/')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
