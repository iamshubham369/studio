// src/components/diary/diary-entry-card.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { DiaryEntry } from '@/lib/hooks/use-diary-data';
import { format } from 'date-fns';
import { ScrollArea } from '../ui/scroll-area';

interface DiaryEntryCardProps {
  entry: DiaryEntry;
}

export function DiaryEntryCard({ entry }: DiaryEntryCardProps) {
  const formattedDate = format(new Date(entry.date), 'MMMM d, yyyy - h:mm a');
  const preview = entry.content.substring(0, 100) + (entry.content.length > 100 ? '...' : '');

  return (
    <Dialog>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">{entry.title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{preview}</p>
        </CardContent>
        <CardFooter>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full">Read More</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{entry.title}</DialogTitle>
          <p className="text-sm text-muted-foreground pt-1">{formattedDate}</p>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
            <div className="prose prose-sm dark:prose-invert whitespace-pre-wrap">
                {entry.content}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
