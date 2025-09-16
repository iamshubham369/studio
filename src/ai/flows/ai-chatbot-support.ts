// src/ai/flows/ai-chatbot-support.ts
'use server';

/**
 * @fileOverview AI chatbot support for students, offering guidance on stress and time management, and directing them to mental health resources.
 *
 * - aiChatbotSupport - A function that provides AI chatbot support.
 * - AIChatbotSupportInput - The input type for the aiChatbotSupport function.
 * - AIChatbotSupportOutput - The return type for the aiChatbotSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotSupportInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
});
export type AIChatbotSupportInput = z.infer<typeof AIChatbotSupportInputSchema>;

const AIChatbotSupportOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type AIChatbotSupportOutput = z.infer<typeof AIChatbotSupportOutputSchema>;

export async function aiChatbotSupport(input: AIChatbotSupportInput): Promise<AIChatbotSupportOutput> {
  return aiChatbotSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotSupportPrompt',
  input: {schema: AIChatbotSupportInputSchema},
  output: {schema: AIChatbotSupportOutputSchema},
  prompt: `You are a mental health support chatbot for university students. Your goal is to provide helpful and supportive guidance to students who are experiencing stress, time management issues, or other mental health concerns. You can provide tips and strategies for managing stress and time effectively.

  If the student expresses serious mental health concerns, gently guide them towards seeking professional help and provide them with resources such as the university counseling center or other mental health services.

  You are not a replacement for professional mental health support, but you are a helpful resource for students in need.

  Student Message: {{{message}}}`,
});

const aiChatbotSupportFlow = ai.defineFlow(
  {
    name: 'aiChatbotSupportFlow',
    inputSchema: AIChatbotSupportInputSchema,
    outputSchema: AIChatbotSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
