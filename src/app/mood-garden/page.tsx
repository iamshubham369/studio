
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MoodGardenClient } from '@/components/mood-garden/mood-garden-client';
import Link from 'next/link';

export default function MoodGardenPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
       <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Mood Garden</CardTitle>
            <CardDescription>
              Watch your garden grow as you log your moods. Each flower represents a day and an emotion.
            </CardDescription>
          </CardHeader>
          <CardContent>
              <MoodGardenClient showGardenOnly={true} />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <MoodGardenClient showStatsOnly={true} />
      </div>
    </div>
  );
}
