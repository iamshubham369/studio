// src/app/assessment/results/actions.ts
'use server';

import { analyzeAssessment, type AssessmentAnalysisInput, type AssessmentAnalysisOutput } from '@/ai/flows/analyze-assessment';

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
