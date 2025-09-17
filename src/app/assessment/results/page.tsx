
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import type { AssessmentAnalysisOutput } from '@/ai/flows/assessment-analysis';

type ResultData = AssessmentAnalysisOutput;

const categoryIcons: Record<string, string> = {
  "Sleep & Energy": "😴",
  "Stress & Anxiety": "😟",
  "Mood & Interests": "😊",
  "Social Connection": "🤝",
};

export default function ResultsPage() {
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const resultsJson = sessionStorage.getItem('assessmentResults');
    if (resultsJson) {
      setData(JSON.parse(resultsJson));
      // sessionStorage.removeItem('assessmentResults'); // Optional: clear after reading
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

  const radarChartData = data.categoryAnalyses.map(cat => ({
    subject: cat.title.split(' & ')[0], // "Sleep", "Stress", etc.
    score: cat.score,
    fullMark: 100,
  }));

  const scoreColor = data.overallScore > 75 ? 'text-green-500' : data.overallScore > 50 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold">Your Wellness Snapshot</h1>
        <p className="text-muted-foreground mt-2">{data.overallSummary}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Wellness Score</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 items-center">
          <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Mike" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className={`text-7xl font-bold ${scoreColor}`}>{data.overallScore}</div>
            <p className="text-muted-foreground">out of 100</p>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">In-depth Analysis</h2>
        <div className="grid gap-6 md:grid-cols-2">
            {data.categoryAnalyses.map(category => (
                <Card key={category.title}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                           <span className="text-2xl">{categoryIcons[category.title] || "📊"}</span>
                           {category.title}
                        </CardTitle>
                        <CardDescription>Your score: {category.score}/100</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{category.feedback}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
      
      <Card className="bg-primary/10 border-primary/30">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Here are a few simple suggestions based on your results.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
                {data.nextSteps.map((step, index) => (
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
