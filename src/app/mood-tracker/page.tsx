'use client';

import { MoodLogger } from '@/components/mood-tracker/mood-logger';
import { MoodChart } from '@/components/mood-tracker/mood-chart';
import { useMoodData } from '@/lib/hooks/use-mood-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MoodTrackerPage() {
  const { entries, addEntry } = useMoodData();

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">How are you feeling today?</CardTitle>
          <CardDescription>Log your mood to track your emotional well-being.</CardDescription>
        </CardHeader>
        <CardContent>
          <MoodLogger onLog={addEntry} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Mood History</CardTitle>
          <CardDescription>Visualize your mood patterns over the past week.</CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
             <MoodChart data={entries} />
          ) : (
            <div className="flex h-[300px] w-full items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No mood data yet. Start logging to see your chart!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
