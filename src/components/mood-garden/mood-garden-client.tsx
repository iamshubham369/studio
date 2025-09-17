
'use client';

import { useMoodData } from '@/lib/hooks/use-mood-data';
import { MoodGarden } from './mood-garden';
import { GardenStats } from './garden-stats';
import Link from 'next/link';

interface MoodGardenClientProps {
    showGardenOnly?: boolean;
    showStatsOnly?: boolean;
}

export function MoodGardenClient({ showGardenOnly, showStatsOnly }: MoodGardenClientProps) {
    const { entries } = useMoodData();

    if (showGardenOnly) {
        return entries.length > 0 ? (
            <MoodGarden entries={entries} />
        ) : (
            <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed text-center">
                <p className="text-muted-foreground mb-2">Your garden is empty.</p>
                <p className="text-sm text-muted-foreground">
                    <Link href="/mood-tracker" className="text-primary underline">Log your mood</Link> to start planting!
                </p>
            </div>
        );
    }
    
    if (showStatsOnly) {
        return <GardenStats moodEntries={entries} />;
    }

    return null;
}
