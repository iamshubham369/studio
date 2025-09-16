// src/app/diary/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDiaryData } from '@/lib/hooks/use-diary-data';
import { DiaryEntryCard } from '@/components/diary/diary-entry-card';
import { DiaryEntryForm } from '@/components/diary/diary-entry-form';

export default function DiaryPage() {
  const { entries, addEntry } = useDiaryData();
  const [isAdding, setIsAdding] = useState(false);

  // Sort entries from newest to oldest
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleFinishEditing = (title: string, content: string) => {
    addEntry(title, content);
    setIsAdding(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Personal Diary</h1>
          <p className="text-muted-foreground mt-2">
            A private space for your thoughts. Your entries are saved only on this device.
          </p>
        </div>
        {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>New Entry</Button>
        )}
      </div>

      {isAdding && (
        <DiaryEntryForm onSave={handleFinishEditing} onCancel={() => setIsAdding(false)} />
      )}

      {sortedEntries.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedEntries.map((entry) => (
            <DiaryEntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        !isAdding && (
          <Card className="flex h-[300px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed text-center">
            <CardHeader>
                <CardTitle>Your diary is empty.</CardTitle>
                <CardDescription>Click "New Entry" to write down your thoughts.</CardDescription>
            </CardHeader>
        </Card>
        )
      )}
    </div>
  );
}
