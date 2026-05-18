import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENROUTER_API_KEY) {
  console.error("OPENROUTER_API_KEY is not set in .env file");
  process.exit(1);
}

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:5173",
    "X-Title": "AI Chat Assistant",
  },
});

export const OPENAI_CONFIG = {
  model: process.env.OPENROUTER_MODEL || "openrouter/auto",
  maxTokens: 500,
  temperature: 0.7,
  systemPrompt: `Ты полезный AI ассистент. Отвечай ТОЛЬКО на русском языке. Будь дружелюбным, используй эмодзи, отвечай кратко и по существу.`,
};

console.log(`Using model: ${OPENAI_CONFIG.model}`);
console.log(`Language: Russian (forced)`);
