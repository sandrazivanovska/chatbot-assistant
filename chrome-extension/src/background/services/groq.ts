import { ChatGroq } from '@langchain/groq';

export function getGroqLLM() {
  return new ChatGroq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile',
    temperature: 0.1,
    topP: 0.9,
    maxTokens: 4096,
  });
}
