
'use server';

import { analyzeAssessment } from "@/ai/flows/mental-health-assessment";
import { z } from 'zod';


// Zod Schemas
const AssessmentAnswerSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const AssessmentInputSchema = z.object({
  answers: z.array(AssessmentAnswerSchema).describe("An array of questions and the user's answers."),
});

const CategoryScoreSchema = z.object({
    category: z.string().describe("The mental health category (e.g., 'Anxiety', 'Depression', 'Stress')."),
    score: z.number().describe("A score from 0 to 100 for the category, where higher indicates more severe symptoms."),
    feedback: z.string().describe("Personalized feedback and interpretation of the score for this category."),
});

export const AssessmentResultSchema = z.object({
  overallFeedback: z.string().describe("A general summary and supportive feedback based on all answers."),
  categoryScores: z.array(CategoryScoreSchema).describe("An array of scores and feedback for each mental health category."),
  isHighRisk: z.boolean().describe("A flag indicating if the user's responses suggest a high risk of severe mental health issues, warranting professional help."),
});

// Types
export type AssessmentInput = z.infer<typeof AssessmentInputSchema>;
export type AssessmentResult = z.infer<typeof AssessmentResultSchema>;


export async function getAssessmentResult(input: AssessmentInput) {
  try {
    const result = await analyzeAssessment(input);
    return { success: true, result };
  } catch (error) {
    console.error("Error getting assessment result:", error);
    return { success: false, error: "Sorry, I couldn't process your assessment right now. Please try again later." };
  }
}
