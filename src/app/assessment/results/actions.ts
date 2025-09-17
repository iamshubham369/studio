// src/app/assessment/results/actions.ts
'use server';

import { analyzeAssessment } from '@/ai/flows/analyze-assessment';
import { z } from 'zod';

// Define schemas and types here, outside the 'use server' file for the flow.
export const AssessmentAnalysisInputSchema = z.object({
  sleepQuality: z.string(),
  energyLevels: z.string(),
  stressLevel: z.string(),
  anxietyFrequency: z.string(),
  interestInActivities: z.string(),
  socialConnection: z.string(),
  overallMood: z.string(),
});
export type AssessmentAnalysisInput = z.infer<typeof AssessmentAnalysisInputSchema>;

const InsightSchema = z.object({
    title: z.string().describe("The category of the insight (e.g., 'Sleep Quality', 'Stress Levels')."),
    score: z.number().min(0).max(100).describe("A score from 0-100 for this specific category."),
    summary: z.string().describe("A concise one-sentence summary of the user's state in this category."),
    feedback: z.string().describe("A paragraph of constructive feedback and advice for this category."),
});

export const AssessmentAnalysisOutputSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("The user's overall mental wellness score from 0 to 100, where 100 is excellent."),
  summary: z.string().describe("A brief, encouraging overall summary of the user's mental wellness."),
  insights: z.array(InsightSchema).describe("An array of detailed insights for different wellness categories."),
  nextSteps: z.array(z.string()).describe("A list of 3-4 actionable next steps or suggestions for the user."),
});
export type AssessmentAnalysisOutput = z.infer<typeof AssessmentAnalysisOutputSchema>;


export async function runAssessmentAnalysis(
  input: AssessmentAnalysisInput
): Promise<{ success: boolean; data?: AssessmentAnalysisOutput; error?: string }> {
  try {
    const data = await analyzeAssessment(input);
    return { success: true, data };
  } catch (error: any) {
    console.error('Error running assessment analysis:', error);
    return {
      success: false,
      error: 'Sorry, the AI analysis could not be completed at this time. Please try again later.',
    };
  }
}
