
'use client';

import { useState } from 'react';
import { useDiaryData } from '@/lib/hooks/use-diary-data';
import { DiaryEntryCard } from './diary-entry-card';
import { DiaryEntryForm } from './diary-entry-form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DiaryClientProps {
    showNewEntryButtonOnly?: boolean;
}

export function DiaryClient({ showNewEntryButtonOnly = false }: DiaryClientProps) {
  const { entries, addEntry } = useDiaryData();
  const [isAdding, setIsAdding] = useState(false);
  
  if (showNewEntryButtonOnly) {
      return !isAdding ? <Button onClick={() => setIsAdding(true)}>New Entry</Button> : null;
  }
  
  // Sort entries from newest to oldest
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleFinishEditing = (title: string, content: string) => {
    addEntry(title, content);
    setIsAdding(false);
  }

  return (
    <>
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
    </>
  );
}
