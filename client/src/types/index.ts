export interface Message {
  id: string;
  text: string;
  type: "user" | "assistant";
  timestamp: Date;
}

export interface ChatResponse {
  success: boolean;
  reply?: string;
  error?: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: unknown;
    SpeechRecognition: unknown;
  }
}
