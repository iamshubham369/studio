
'use server';

import { analyzeAssessment } from "@/ai/flows/assessment-analysis";
import type { AssessmentAnalysisInput, AssessmentAnalysisOutput } from "@/ai/schemas/assessment-analysis";

export async function runAssessmentAnalysis(input: AssessmentAnalysisInput): Promise<AssessmentAnalysisOutput> {
    return await analyzeAssessment(input);
}
