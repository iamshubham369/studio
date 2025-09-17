
import {z} from 'genkit';

/**
 * @fileOverview Schemas and types for the mental wellness assessment analysis.
 *
 * - AssessmentAnalysisInputSchema: The Zod schema for the assessment input.
 * - AssessmentAnalysisInput: The TypeScript type for the assessment input.
 * - AssessmentAnalysisOutputSchema: The Zod schema for the analysis output.
 * - AssessmentAnalysisOutput: The TypeScript type for the analysis output.
 */

export const AssessmentAnalysisInputSchema = z.object({
  sleepQuality: z.string().describe('User rating for sleep quality'),
  energyLevels: z.string().describe('User rating for energy levels'),
  stressLevel: z.string().describe('User rating for stress levels'),
  anxietyFrequency: z.string().describe('User rating for anxiety frequency'),
  interestInActivities: z.string().describe('User rating for interest in activities'),
  socialConnection: z.string().describe('User rating for social connection'),
  overallMood: z.string().describe('User rating for overall mood'),
});

export type AssessmentAnalysisInput = z.infer<typeof AssessmentAnalysisInputSchema>;

const AnalysisCategorySchema = z.object({
  title: z.string().describe('The category being analyzed (e.g., "Sleep Quality").'),
  score: z.number().min(0).max(100).describe('A score from 0-100 for this specific category.'),
  feedback: z.string().describe('Personalized feedback and observations for this category based on the user\'s answer.'),
});

export const AssessmentAnalysisOutputSchema = z.object({
  overallScore: z.number().min(0).max(100).describe('An overall mental wellness score from 0 to 100, calculated from all inputs.'),
  overallSummary: z.string().describe('A brief, encouraging summary of the overall results.'),
  categoryAnalyses: z.array(AnalysisCategorySchema).describe('An array of detailed analyses for different wellness categories like Sleep, Stress, and Mood.'),
  nextSteps: z.array(z.string()).describe('A list of 2-3 actionable and simple suggestions for the user based on their results.'),
});

export type AssessmentAnalysisOutput = z.infer<typeof AssessmentAnalysisOutputSchema>;
