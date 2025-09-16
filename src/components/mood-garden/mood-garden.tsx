'use client';
import type { MoodEntry } from '@/lib/hooks/use-mood-data';
import { eachDayOfInterval, subDays, format, startOfMonth, endOfMonth, getDay, isSameDay } from 'date-fns';
import { GardenCell } from './garden-cell';

interface MoodGardenProps {
    entries: MoodEntry[];
}

export function MoodGarden({ entries }: MoodGardenProps) {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    const daysInMonth = eachDayOfInterval({ start, end });

    // Create an array for the grid, including blank days for the start of the month
    const startingDayIndex = getDay(start); // 0 for Sunday, 1 for Monday, etc.
    const gridDays = Array.from({ length: startingDayIndex }, () => null);
    gridDays.push(...daysInMonth);
    
    return (
        <div className="grid grid-cols-7 gap-2 md:gap-3">
           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-bold text-muted-foreground text-sm">{day}</div>
            ))}
            {gridDays.map((day, index) => {
                if (!day) {
                    return <div key={`empty-${index}`} />;
                }
                const entry = entries.find(e => isSameDay(new Date(e.date), day));
                return <GardenCell key={day.toISOString()} date={day} entry={entry} />;
            })}
        </div>
    );
}
