
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ResultsPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const resultsJson = sessionStorage.getItem('assessmentResults');
    if (resultsJson) {
      try {
        setData(JSON.parse(resultsJson));
      } catch (error) {
        console.error("Failed to parse assessment results:", error);
        router.replace('/assessment');
      }
    } else {
      // Handle case where user lands here directly
      router.replace('/assessment');
    }
    setLoading(false);
  }, [router]);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  const nextSteps = [
    "Consider exploring the 'Relaxation' section for guided breathing exercises.",
    "Try writing down your thoughts in the private 'Diary' to clear your mind.",
    "If you're feeling stressed, our 'AI Chatbot' can offer some quick tips.",
    "Remember to connect with friends or family this week."
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold">Thank You for Completing the Assessment</h1>
        <p className="text-muted-foreground mt-2">Taking a moment to check in with yourself is a great step for your well-being.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Responses</CardTitle>
          <CardDescription>Here's a summary of the answers you provided.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li><strong>Sleep Quality:</strong> {data.sleepQuality.replace(/_/g, ' ')}</li>
                <li><strong>Energy Levels:</strong> {data.energyLevels.replace(/_/g, ' ')}</li>
                <li><strong>Stress Level:</strong> {data.stressLevel.replace(/_/g, ' ')}</li>
                <li><strong>Anxiety Frequency:</strong> {data.anxietyFrequency.replace(/_/g, ' ')}</li>
                <li><strong>Interest in Activities:</strong> {data.interestInActivities.replace(/_/g, ' ')}</li>
                <li><strong>Social Connection:</strong> {data.socialConnection.replace(/_/g, ' ')}</li>
                <li><strong>Overall Mood:</strong> {data.overallMood.replace(/_/g, ' ')}</li>
            </ul>
        </CardContent>
      </Card>
      
      <Card className="bg-primary/10 border-primary/30">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
            <CardDescription>Based on your responses, here are a few simple suggestions you might find helpful.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
                {nextSteps.map((step, index) => (
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
