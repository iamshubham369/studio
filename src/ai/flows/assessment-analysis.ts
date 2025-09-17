
'use server';

/**
 * @fileOverview Analyzes a user's mental wellness assessment and provides a score and detailed feedback.
 *
 * - analyzeAssessment - A function that processes assessment data.
 */

import {ai} from '@/ai/genkit';
import {
    AssessmentAnalysisInput,
    AssessmentAnalysisInputSchema,
    AssessmentAnalysisOutput,
    AssessmentAnalysisOutputSchema
} from '@/ai/schemas/assessment-analysis';

export async function analyzeAssessment(input: AssessmentAnalysisInput): Promise<AssessmentAnalysisOutput> {
  return analyzeAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeAssessmentPrompt',
  input: {schema: AssessmentAnalysisInputSchema},
  output: {schema: AssessmentAnalysisOutputSchema},
  prompt: `You are a compassionate mental wellness assistant. Analyze the following assessment responses from a university student. Your goal is to provide a supportive and insightful analysis, not a medical diagnosis.

  **Assessment Data:**
  - Sleep Quality: {{{sleepQuality}}}
  - Energy Levels: {{{energyLevels}}}
  - Stress Level: {{{stressLevel}}}
  - Anxiety Frequency: {{{anxietyFrequency}}}
  - Interest in Activities: {{{interestInActivities}}}
  - Social Connection: {{{socialConnection}}}
  - Overall Mood: {{{overallMood}}}

  **Your Task:**

  1.  **Calculate an \`overallScore\` from 0 (concerning) to 100 (excellent).**
      -   "very_good", "very_high", "never", "not_at_all", "very_high_interest", "very_connected", "excellent" are positive indicators.
      -   "very_poor", "very_low", "always", "nearly_every_day", "no_interest", "very_disconnected" are negative indicators.
      -   Calculate a holistic score based on the combination of all answers.

  2.  **Write a brief, positive \`overallSummary\`**. It should be 1-2 sentences and acknowledge their effort for taking the assessment.

  3.  **Provide detailed \`categoryAnalyses\` for the following 4 categories:** "Sleep & Energy", "Stress & Anxiety", "Mood & Interests", and "Social Connection".
      -   For each category, combine the relevant inputs (e.g., "Sleep & Energy" uses \`sleepQuality\` and \`energyLevels\`).
      -   Assign a specific \`score\` (0-100) for each category.
      -   Write 2-3 sentences of personalized \`feedback\`. Be encouraging. If the score is low, offer gentle observations and suggest it's an area to focus on. If it's high, be positive and reinforcing.

  4.  **Suggest 2-3 simple, actionable \`nextSteps\`**. These should be practical tips a student can implement, like "Try a 5-minute breathing exercise" or "Reach out to one friend this week."

  Output the entire response in the required JSON format.
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
