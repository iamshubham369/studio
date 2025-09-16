// src/components/diary/diary-entry-form.tsx
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DiaryEntryFormProps {
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
}

export function DiaryEntryForm({ onSave, onCancel }: DiaryEntryFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both a title and content for your entry.',
        variant: 'destructive',
      });
      return;
    }
    onSave(title, content);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">New Diary Entry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Write what's on your mind..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-48"
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Entry</Button>
      </CardFooter>
    </Card>
  );
}
