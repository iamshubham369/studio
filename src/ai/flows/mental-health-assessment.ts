
'use server';

/**
 * @fileOverview AI flow to analyze mental health assessment responses and provide feedback.
 *
 * - analyzeAssessment - A function that takes assessment answers and returns analysis.
 */

import {ai} from '@/ai/genkit';
import type { AssessmentInput, AssessmentResult } from '@/app/assessment/actions';
import { AssessmentInputSchema, AssessmentResultSchema } from '@/app/assessment/actions';


export async function analyzeAssessment(input: AssessmentInput): Promise<AssessmentResult> {
  return mentalHealthAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentalHealthAssessmentPrompt',
  input: {schema: AssessmentInputSchema},
  output: {schema: AssessmentResultSchema},
  prompt: `You are an empathetic AI assistant designed to analyze a student's mental health assessment. Your task is to provide a supportive and insightful analysis of their responses. Do not give a medical diagnosis.

Analyze the following assessment answers to identify patterns related to anxiety, depression, and stress. The answers are provided as a JSON object.

For each category (Anxiety, Depression, Stress), calculate a score from 0 to 100 based on the severity and frequency of symptoms reported in the answers. A higher score means more severe symptoms. Provide brief, constructive feedback for each category.

Then, provide a supportive overall feedback summary.

Finally, based on the answers, determine if the user is at high risk. Set the 'isHighRisk' flag to true if responses indicate severe distress, thoughts of self-harm, or an inability to function.

The user's assessment answers are provided in the 'answers' field of the input object. Please process them.
`,
});

const mentalHealthAssessmentFlow = ai.defineFlow(
  {
    name: 'mentalHealthAssessmentFlow',
    inputSchema: AssessmentInputSchema,
    outputSchema: AssessmentResultSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model did not return a valid output.");
    }
    return output;
  }
);
