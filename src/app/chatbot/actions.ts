'use server';

import { aiChatbotSupport } from "@/ai/flows/ai-chatbot-support";

export async function getAiChatbotResponse(message: string) {
  try {
    const response = await aiChatbotSupport({ message });
    return { success: true, response: response.response };
  } catch (error) {
    console.error("Error getting AI chatbot response:", error);
    return { success: false, error: "Sorry, I couldn't process your request right now. Please try again later." };
  }
}
