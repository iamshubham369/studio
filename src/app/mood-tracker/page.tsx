
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MoodTrackerClient } from '@/components/mood-tracker/mood-tracker-client';

export default function MoodTrackerPage() {
  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">How are you feeling today?</CardTitle>
          <CardDescription>Log your mood to track your emotional well-being.</CardDescription>
        </CardHeader>
        <CardContent>
          <MoodTrackerClient />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Mood History</CardTitle>
          <CardDescription>Visualize your mood patterns over the past week.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* The client component will handle showing the chart or the empty state */}
            <MoodTrackerClient showChartOnly={true} />
        </CardContent>
      </Card>
    </div>
  );
}
