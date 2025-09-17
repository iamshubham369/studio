
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DiaryClient } from '@/components/diary/diary-client';

export default function DiaryPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Personal Diary</h1>
          <p className="text-muted-foreground mt-2">
            A private space for your thoughts. Your entries are saved only on this device.
          </p>
        </div>
        {/* The client component will handle showing the button */}
        <DiaryClient showNewEntryButtonOnly={true} />
      </div>

      {/* The client component will handle the form and the list of entries */}
      <DiaryClient />
    </div>
  );
}
