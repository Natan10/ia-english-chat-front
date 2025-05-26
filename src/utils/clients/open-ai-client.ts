import OpenAI from "openai";

export const openAIClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});
