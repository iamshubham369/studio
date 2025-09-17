
'use client';

import { useMoodData } from '@/lib/hooks/use-mood-data';
import { MoodLogger } from './mood-logger';
import { MoodChart } from './mood-chart';
import Link from 'next/link';

interface MoodTrackerClientProps {
    showChartOnly?: boolean;
}

export function MoodTrackerClient({ showChartOnly = false }: MoodTrackerClientProps) {
    const { entries, addEntry } = useMoodData();

    if (showChartOnly) {
        return entries.length > 0 ? (
            <MoodChart data={entries} />
        ) : (
            <div className="flex h-[300px] w-full items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No mood data yet. Start logging to see your chart!</p>
            </div>
        );
    }
    
    return <MoodLogger onLog={addEntry} />;
}
