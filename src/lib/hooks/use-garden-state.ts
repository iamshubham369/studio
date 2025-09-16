// src/lib/hooks/use-garden-state.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CHALLENGES } from '@/lib/constants';

export type ChallengeId = (typeof CHALLENGES)[number]['id'];

export interface GardenState {
    score: number;
    level: number;
    completedChallenges: ChallengeId[];
}

const STORAGE_KEY = 'garden-state';

const initialState: GardenState = {
    score: 0,
    level: 1,
    completedChallenges: [],
};

export function useGardenState() {
  const [state, setState] = useState<GardenState | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
        try {
            const storedState = localStorage.getItem(STORAGE_KEY);
            setState(storedState ? JSON.parse(storedState) : initialState);
        } catch (error) {
            console.error('Could not retrieve garden state from localStorage:', error);
            setState(initialState);
        }
    };

    handleStorageChange(); // Initial load

    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const resetState = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
      setState(initialState);
    } catch (error) {
      console.error('Could not reset garden state in localStorage:', error);
    }
  }, []);

  return { state, resetState };
}
