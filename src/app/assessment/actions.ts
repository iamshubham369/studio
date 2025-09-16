
'use server';

import { analyzeAssessment, type AssessmentInput, type AssessmentResult } from "@/ai/flows/mental-health-assessment";

// Re-export types for use in client components
export type { AssessmentInput, AssessmentResult };

export async function getAssessmentResult(input: AssessmentInput) {
  try {
    const result = await analyzeAssessment(input);
    return { success: true, result };
  } catch (error) {
    console.error("Error getting assessment result:", error);
    return { success: false, error: "Sorry, I couldn't process your assessment right now. Please try again later." };
  }
}
