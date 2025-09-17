// src/ai/flows/analyze-assessment.ts
'use server';

/**
 * @fileOverview Analyzes a user's mental wellness assessment and provides a detailed report.
 *
 * - analyzeAssessment - A function that handles the assessment analysis.
 * - AssessmentAnalysisInput - The input type for the analyzeAssessment function.
 * - AssessmentAnalysisOutput - The return type for the analyzeAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

export async function analyzeAssessment(input: AssessmentAnalysisInput): Promise<AssessmentAnalysisOutput> {
  return analyzeAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeAssessmentPrompt',
  input: {schema: AssessmentAnalysisInputSchema},
  output: {schema: AssessmentAnalysisOutputSchema},
  prompt: `You are a compassionate mental health assistant. Analyze the following university student's self-assessment responses.
  
  Based on their answers, generate a comprehensive wellness report. The report must include:
  1.  An 'overallScore' from 0-100. A higher score means better well-being. Calculate this by mapping the answers to a scale and averaging them. For example, for sleep: Very Good=100, Good=75, Average=50, Poor=25, Very Poor=0. Apply similar logic to all fields.
  2.  A brief, encouraging 'summary' of their current state.
  3.  An array of 'insights' for at least four key areas (e.g., Sleep, Stress, Mood, Social Life). Each insight must have a title, a score for that area (0-100), a one-sentence summary, and a paragraph of detailed 'feedback' with actionable advice.
  4.  A list of 3-4 simple, actionable 'nextSteps' the student can take.

  Be empathetic, positive, and constructive. Avoid clinical diagnoses. Frame feedback as gentle suggestions.

  User's Assessment Answers:
  - Sleep Quality: {{{sleepQuality}}}
  - Energy Levels: {{{energyLevels}}}
  - Stress Level: {{{stressLevel}}}
  - Anxiety Frequency: {{{anxietyFrequency}}}
  - Interest in Activities: {{{interestInActivities}}}
  - Social Connection: {{{socialConnection}}}
  - Overall Mood: {{{overallMood}}}
  `,
});

const analyzeAssessmentFlow = ai.defineFlow(
  {
    name: 'analyzeAssessmentFlow',
    inputSchema: AssessmentAnalysisInputSchema,
    outputSchema: AssessmentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
