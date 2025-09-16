'use client';

import { useState, useEffect, useCallback } from 'react';

export type Mood = 'happy' | 'neutral' | 'sad' | 'anxious' | 'calm';

export interface MoodEntry {
  date: string; // ISO string for the date
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

export function useMoodData() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem('mood-entries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error("Could not retrieve mood entries from localStorage", error);
    }
  }, []);

  const addEntry = useCallback((mood: Mood, notes?: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day
    const dateString = today.toISOString().split('T')[0];

    const newEntry: MoodEntry = {
      date: dateString,
      mood,
      notes,
      value: MOOD_VALUES[mood],
    };

    setEntries(prevEntries => {
      // Remove any existing entry for today
      const filteredEntries = prevEntries.filter(entry => entry.date !== dateString);
      const updatedEntries = [...filteredEntries, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      try {
        localStorage.setItem('mood-entries', JSON.stringify(updatedEntries));
      } catch (error) {
        console.error("Could not save mood entries to localStorage", error);
      }
      
      return updatedEntries;
    });
  }, []);

  return { entries, addEntry };
}
