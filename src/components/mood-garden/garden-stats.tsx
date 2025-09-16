// src/components/mood-garden/garden-stats.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useGardenState, type GardenState } from '@/lib/hooks/use-garden-state';
import { CHALLENGES, XP_PER_LEVEL } from '@/lib/constants';
import { Award, CheckCircle2, RefreshCw } from 'lucide-react';
import type { MoodEntry } from '@/lib/hooks/use-mood-data';
import { isToday, subDays, differenceInCalendarDays } from 'date-fns';

interface GardenStatsProps {
    moodEntries: MoodEntry[];
}

export function GardenStats({ moodEntries }: GardenStatsProps) {
    const { state, resetState } = useGardenState();
    const { toast } = useToast();

    if (!state) {
        return null; // Or a loading state
    }
    
    const xpForNextLevel = state.level * XP_PER_LEVEL;
    const levelProgress = (state.score / xpForNextLevel) * 100;

    const handleReset = () => {
        resetState();
        toast({
            title: 'Garden Reset',
            description: 'Your score, level, and challenges have been reset.',
        });
    };

    const getChallengeProgress = (challengeId: string) => {
        switch (challengeId) {
            case 'log_3_days_row':
            case 'log_7_days_row':
                const streak = calculateStreak(moodEntries);
                return streak;
            case 'log_5_happy':
                return moodEntries.filter(e => e.mood === 'happy').length;
            case 'log_all_moods':
                return new Set(moodEntries.map(e => e.mood)).size;
            default:
                return 0;
        }
    }
    
    const calculateStreak = (moodEntries: MoodEntry[]) => {
        if (moodEntries.length === 0) return 0;
        const sortedEntries = [...moodEntries].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const lastEntryDate = new Date(sortedEntries[0].date);
        if (!isToday(lastEntryDate) && !isToday(subDays(lastEntryDate, -1))) {
            return 0;
        }
        let streak = 1;
        for (let i = 1; i < sortedEntries.length; i++) {
            const current = new Date(sortedEntries[i-1].date);
            const previous = new Date(sortedEntries[i].date);
            if (differenceInCalendarDays(current, previous) === 1) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    return (
        <Card className="sticky top-8">
            <CardHeader>
                <CardTitle className="font-headline">Garden Stats</CardTitle>
                <CardDescription>Your progress and challenges.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-bold">Level {state.level}</p>
                        <p className="text-sm text-muted-foreground">{state.score} / {xpForNextLevel} XP</p>
                    </div>
                    <Progress value={levelProgress} />
                </div>
                <div>
                    <h4 className="font-semibold mb-3 flex items-center"><Award className="mr-2 h-5 w-5 text-primary" /> Challenges</h4>
                    <div className="space-y-4">
                        {CHALLENGES.map(challenge => {
                            const isCompleted = state.completedChallenges.includes(challenge.id);
                            const progress = getChallengeProgress(challenge.id);
                            const progressPercent = Math.min((progress / challenge.goal) * 100, 100);

                            return (
                                <div key={challenge.id}>
                                    <div className="flex justify-between items-center text-sm mb-1">
                                        <p className="font-medium">{challenge.title}</p>
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <p className="text-muted-foreground">{progress} / {challenge.goal}</p>
                                        )}
                                    </div>
                                    <Progress value={isCompleted ? 100 : progressPercent} />
                                    <p className="text-xs text-muted-foreground mt-1">{challenge.description} (+{challenge.xp} XP)</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset Progress
                </Button>
            </CardFooter>
        </Card>
    );
}
