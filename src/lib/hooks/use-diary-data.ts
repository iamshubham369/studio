// src/lib/hooks/use-diary-data.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface DiaryEntry {
  id: string;
  date: string; // ISO string for the date and time
  title: string;
  content: string;
}

const STORAGE_KEY = 'diary-entries';

export function useDiaryData() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(STORAGE_KEY);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error(`Could not retrieve diary entries from localStorage:`, error);
    }
  }, []);

  const addEntry = useCallback((title: string, content: string) => {
    const newEntry: DiaryEntry = {
      id: new Date().toISOString() + Math.random(), // Simple unique ID
      date: new Date().toISOString(),
      title,
      content,
    };

    setEntries(prevEntries => {
      const updatedEntries = [...prevEntries, newEntry];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      } catch (error) {
        console.error(`Could not save diary entry to localStorage:`, error);
      }
      return updatedEntries;
    });
  }, []);

  return { entries, addEntry };
}
