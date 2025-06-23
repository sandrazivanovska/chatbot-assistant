import { getGroqLLM } from '../services/groq';

export const createChatModel = async () => {
  return getGroqLLM(); // always return Groq
};
