'use server';

import { recommendResources, type MoodEntry } from '@/ai/flows/personalized-resource-recommendations';

export async function getPersonalizedResources(moodEntries: MoodEntry[]) {
  // The Genkit flow expects a specific input structure
  const input = { moodEntries };

  try {
    const recommendations = await recommendResources(input);
    return { success: true, recommendations };
  } catch (error) {
    console.error('Error getting personalized resources:', error);
    return { success: false, error: 'Could not fetch recommendations at this time.' };
  }
}
