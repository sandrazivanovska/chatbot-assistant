import { ChatGroq } from '@langchain/groq';

export function getGroqLLM() {
  return new ChatGroq({
    apiKey: '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',
    model: 'llama3-70b-8192',
    temperature: 0.1,
    topP: 0.9,
    maxTokens: 4096,
  });
}
