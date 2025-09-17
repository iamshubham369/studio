// src/ai/flows/analyze-assessment.ts
'use server';
import 'server-only';

/**
 * @fileOverview Analyzes a user's mental wellness assessment and provides a detailed report.
 * This file contains the server-only Genkit flow.
 */

import {ai} from '@/ai/genkit';
import type { AssessmentAnalysisInput, AssessmentAnalysisOutput } from '@/app/assessment/results/actions';
import { AssessmentAnalysisInputSchema, AssessmentAnalysisOutputSchema } from '@/app/assessment/results/actions';


async function analyzeAssessmentFlow(input: AssessmentAnalysisInput): Promise<AssessmentAnalysisOutput> {
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

  const flow = ai.defineFlow(
    {
      name: 'analyzeAssessmentFlow',
      inputSchema: AssessmentAnalysisInputSchema,
      outputSchema: AssessmentAnalysisOutputSchema,
    },
    async (flowInput) => {
      const {output} = await prompt(flowInput);
      return output!;
    }
  );

  return await flow(input);
}


export async function analyzeAssessment(input: AssessmentAnalysisInput): Promise<AssessmentAnalysisOutput> {
  return analyzeAssessmentFlow(input);
}
