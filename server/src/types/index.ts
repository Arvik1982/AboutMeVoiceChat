export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  reply?: string;
  error?: string;
}

export interface ErrorResponse {
  error: string;
  status?: number;
}
