// src/ai/flows/personalized-resource-recommendations.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending personalized resources (articles, videos, support groups) to students based on their mood tracker entries.
 *
 * - `recommendResources`: A function that takes mood tracker entries as input and returns a list of recommended resources.
 * - `RecommendResourcesInput`: The input type for the `recommendResources` function.
 * - `RecommendedResource`: Represents a single recommended resource with a title, URL, and description.
 * - `RecommendResourcesOutput`: The output type for the `recommendResources` function, which is an array of `RecommendedResource` objects.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodEntrySchema = z.object({
  date: z.string(), // e.g., '2024-07-24'
  mood: z.string().describe('The mood of the student on a particular day (e.g., happy, sad, anxious)'),
  notes: z.string().optional().describe('Optional notes about the mood entry'),
});

export type MoodEntry = z.infer<typeof MoodEntrySchema>;

const RecommendResourcesInputSchema = z.object({
  moodEntries: z.array(MoodEntrySchema).describe('Array of mood entries from the mood tracker.'),
});

export type RecommendResourcesInput = z.infer<typeof RecommendResourcesInputSchema>;

const RecommendedResourceSchema = z.object({
  title: z.string().describe('Title of the resource'),
  url: z.string().url().describe('URL of the resource'),
  description: z.string().describe('Short description of the resource'),
});

export type RecommendedResource = z.infer<typeof RecommendedResourceSchema>;

const RecommendResourcesOutputSchema = z.array(RecommendedResourceSchema);

export type RecommendResourcesOutput = z.infer<typeof RecommendResourcesOutputSchema>;


export async function recommendResources(input: RecommendResourcesInput): Promise<RecommendResourcesOutput> {
  return recommendResourcesFlow(input);
}

const recommendResourcesPrompt = ai.definePrompt({
  name: 'recommendResourcesPrompt',
  input: {schema: RecommendResourcesInputSchema},
  output: {schema: RecommendResourcesOutputSchema},
  prompt: `Given the following mood tracker entries from a student, recommend relevant articles, videos, and local support groups that address their specific needs and concerns.  The output should be a JSON array of resources, each with a title, URL, and short description.

Mood Tracker Entries:
{{#each moodEntries}}
- Date: {{this.date}}, Mood: {{this.mood}}, Notes: {{this.notes}}
{{/each}}

Please provide resources tailored to the student's reported moods and any notes they've added. Focus on providing actionable and helpful recommendations.
`,
});

const recommendResourcesFlow = ai.defineFlow(
  {
    name: 'recommendResourcesFlow',
    inputSchema: RecommendResourcesInputSchema,
    outputSchema: RecommendResourcesOutputSchema,
  },
  async input => {
    const {output} = await recommendResourcesPrompt(input);
    return output!;
  }
);
