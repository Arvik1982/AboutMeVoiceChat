import type { ChatResponse } from "../types";

const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:3001";

export async function sendMessage(message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message.trim() }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}
