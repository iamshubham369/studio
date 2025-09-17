import { z } from "zod";

// ✅ Input schema for assessment analysis
const AssessmentAnalysisInputSchema = z.object({
  // add real fields later
  // Example:
  // questionId: z.string(),
  // answer: z.string(),
});

type AssessmentAnalysisInput = z.infer<typeof AssessmentAnalysisInputSchema>;

// ✅ Schema for insights
const InsightSchema = z.object({
  // add real fields later
  // Example:
  // title: z.string(),
  // description: z.string(),
});

type Insight = z.infer<typeof InsightSchema>;

// Exporting if needed
export { AssessmentAnalysisInputSchema, InsightSchema };
export type { AssessmentAnalysisInput, Insight };
