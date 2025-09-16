'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GardenState, ChallengeId } from './use-garden-state';
import { CHALLENGES, XP_PER_LOG } from '@/lib/constants';
import { isToday, subDays, differenceInCalendarDays } from 'date-fns';

export type Mood = 'happy' | 'neutral' | 'sad' | 'anxious' | 'calm';

export interface MoodEntry {
  date: string; // ISO string for the date YYYY-MM-DD
  mood: Mood;
  notes?: string;
  value: number; // A numeric value for charting
}

const MOOD_VALUES: Record<Mood, number> = {
  happy: 5,
  calm: 4,
  neutral: 3,
  anxious: 2,
  sad: 1,
};

const MOOD_STORAGE_KEY = 'mood-entries';

export function useMoodData() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(MOOD_STORAGE_KEY);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error("Could not retrieve mood entries from localStorage", error);
    }
  }, []);

  const addEntry = useCallback((mood: Mood, notes?: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateString = today.toISOString().split('T')[0];

    const newEntry: MoodEntry = {
      date: dateString,
      mood,
      notes,
      value: MOOD_VALUES[mood],
    };

    setEntries(prevEntries => {
      const filteredEntries = prevEntries.filter(entry => entry.date !== dateString);
      const updatedEntries = [...filteredEntries, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      try {
        localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(updatedEntries));
        updateGardenState(updatedEntries);
      } catch (error) {
        console.error("Could not save mood entries to localStorage", error);
      }
      
      return updatedEntries;
    });
  }, []);
  
  const updateGardenState = (moodEntries: MoodEntry[]) => {
    try {
        const storedState = localStorage.getItem('garden-state');
        let state: GardenState = storedState ? JSON.parse(storedState) : { score: 0, level: 1, completedChallenges: [] };
        
        // 1. Add XP for logging
        state.score += XP_PER_LOG;

        // 2. Check for completed challenges
        const newlyCompleted: ChallengeId[] = [];

        for (const challenge of CHALLENGES) {
            if (state.completedChallenges.includes(challenge.id)) continue;

            let progress = 0;
            switch (challenge.id) {
                case 'log_3_days_row':
                case 'log_7_days_row':
                    progress = calculateStreak(moodEntries);
                    break;
                case 'log_5_happy':
                    progress = moodEntries.filter(e => e.mood === 'happy').length;
                    break;
                case 'log_all_moods':
                    progress = new Set(moodEntries.map(e => e.mood)).size;
                    break;
            }

            if (progress >= challenge.goal) {
                state.score += challenge.xp;
                newlyCompleted.push(challenge.id);
            }
        }
        
        if(newlyCompleted.length > 0) {
          state.completedChallenges.push(...newlyCompleted);
        }

        // 3. Check for level up
        const { XP_PER_LEVEL } = require('@/lib/constants');
        while (state.score >= (state.level * XP_PER_LEVEL)) {
            state.score -= (state.level * XP_PER_LEVEL);
            state.level += 1;
        }

        localStorage.setItem('garden-state', JSON.stringify(state));
    } catch(error) {
        console.error("Could not update garden state", error);
    }
  }
  
  const calculateStreak = (moodEntries: MoodEntry[]) => {
    if (moodEntries.length === 0) return 0;

    const sortedEntries = [...moodEntries].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const lastEntryDate = new Date(sortedEntries[0].date);
    if (!isToday(lastEntryDate) && !isToday(subDays(lastEntryDate, -1))) {
        return 0; // Streak is broken if the last log was not today or yesterday
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

  return { entries, addEntry };
}
