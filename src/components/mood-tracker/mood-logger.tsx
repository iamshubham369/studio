'use client';

import { useState } from 'react';
import { Smile, Meh, Frown, Annoyed, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Mood } from '@/lib/hooks/use-mood-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface MoodLoggerProps {
  onLog: (mood: Mood, notes?: string) => void;
}

const moodOptions: { mood: Mood; icon: React.ReactNode; label: string, color: string, selectedColor: string }[] = [
  { mood: 'happy', icon: <Smile />, label: 'Happy', color: 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200', selectedColor: 'ring-green-500' },
  { mood: 'calm', icon: <Waves />, label: 'Calm', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200', selectedColor: 'ring-blue-500' },
  { mood: 'neutral', icon: <Meh />, label: 'Neutral', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200', selectedColor: 'ring-gray-500' },
  { mood: 'anxious', icon: <Annoyed />, label: 'Anxious', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200', selectedColor: 'ring-yellow-500' },
  { mood: 'sad', icon: <Frown />, label: 'Sad', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200', selectedColor: 'ring-indigo-500' },
];

export function MoodLogger({ onLog }: MoodLoggerProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleLogMood = () => {
    if (!selectedMood) {
      toast({
        title: 'Please select a mood',
        description: 'You need to choose how you\'re feeling before logging.',
        variant: 'destructive',
      });
      return;
    }
    onLog(selectedMood, notes);
    toast({
        title: 'Mood Logged!',
        description: `Your mood for today has been saved as "${selectedMood}".`,
    });
    setSelectedMood(null);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Select your mood:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {moodOptions.map(({ mood, icon, label, color, selectedColor }) => (
            <Button
              key={mood}
              variant="outline"
              onClick={() => setSelectedMood(mood)}
              className={cn(
                'h-24 flex-col gap-2 text-base border-2',
                'bg-card hover:bg-accent/50',
                selectedMood === mood ? 'ring-2 ring-primary ring-offset-2' : ''
              )}
            >
              {icon}
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="text-sm font-medium text-foreground mb-2 block">Add notes (optional):</label>
        <Textarea
          id="notes"
          placeholder="What's on your mind? Any specific events or thoughts?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <Button onClick={handleLogMood} size="lg">Log Mood</Button>
    </div>
  );
}
