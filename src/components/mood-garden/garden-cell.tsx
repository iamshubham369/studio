'use client';
import type { Mood, MoodEntry } from '@/lib/hooks/use-mood-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { format, isToday } from 'date-fns';
import { Flower, Sun, Cloud, Snowflake, CloudRain, Zap } from 'lucide-react';

const moodVisuals: Record<Mood, { icon: React.ReactNode; color: string; label: string }> = {
  happy: { icon: <Sun className="h-6 w-6 text-yellow-500" />, color: 'bg-yellow-100/50 border-yellow-200', label: 'Happy' },
  calm: { icon: <Flower className="h-6 w-6 text-pink-500" />, color: 'bg-pink-100/50 border-pink-200', label: 'Calm' },
  neutral: { icon: <Cloud className="h-6 w-6 text-gray-500" />, color: 'bg-gray-100/50 border-gray-200', label: 'Neutral' },
  anxious: { icon: <Zap className="h-6 w-6 text-purple-500" />, color: 'bg-purple-100/50 border-purple-200', label: 'Anxious' },
  sad: { icon: <CloudRain className="h-6 w-6 text-blue-500" />, color: 'bg-blue-100/50 border-blue-200', label: 'Sad' },
};

interface GardenCellProps {
  date: Date;
  entry?: MoodEntry;
}

export function GardenCell({ date, entry }: GardenCellProps) {
    const dayOfMonth = format(date, 'd');
    const visual = entry ? moodVisuals[entry.mood] : null;

    const cellContent = (
         <div className={cn(
            'aspect-square rounded-lg border-2 flex items-center justify-center relative transition-all duration-300',
            visual ? visual.color : 'bg-muted/30 border-dashed',
            isToday(date) && 'ring-2 ring-primary ring-offset-2'
         )}>
             <span className="absolute top-1 left-1.5 text-xs font-bold text-muted-foreground">{dayOfMonth}</span>
            {visual && (
                <div className="transform transition-transform duration-500 hover:scale-125">
                    {visual.icon}
                </div>
            )}
        </div>
    );

    if (!entry) {
        return cellContent;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {cellContent}
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-bold">{format(date, 'MMMM d, yyyy')}</p>
                    <p>Mood: <span className="font-semibold">{visual?.label}</span></p>
                    {entry.notes && <p className="text-muted-foreground mt-1">Notes: "{entry.notes}"</p>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
