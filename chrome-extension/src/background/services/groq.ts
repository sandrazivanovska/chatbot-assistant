import { ChatGroq } from '@langchain/groq';

export function getGroqLLM() {
  return new ChatGroq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    model: 'llama3-70b-8192',
    temperature: 0.1,
    topP: 0.9,
    maxTokens: 4096,
  });
}
