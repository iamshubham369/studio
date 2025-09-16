'use client';

import { MoodGarden } from '@/components/mood-garden/mood-garden';
import { useMoodData } from '@/lib/hooks/use-mood-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function MoodGardenPage() {
  const { entries } = useMoodData();

  return (
    <div className="space-y-8">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Mood Garden</CardTitle>
          <CardDescription>
            Watch your garden grow as you log your moods. Each flower represents a day and an emotion.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {entries.length > 0 ? (
                <MoodGarden entries={entries} />
            ) : (
                <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-lg border border-dashed text-center">
                    <p className="text-muted-foreground mb-2">Your garden is empty.</p>
                    <p className="text-sm text-muted-foreground">
                        <Link href="/mood-tracker" className="text-primary underline">Log your mood</Link> to start planting!
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
