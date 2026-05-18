import { useState, useCallback } from "react";
import type { Message } from "../types";
import { sendMessage } from "../utils/api";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = useCallback((text: string, type: "user" | "assistant") => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      type,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendUserMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      setError(null);
      addMessage(text, "user");
      setIsLoading(true);

      try {
        const response = await sendMessage(text);
        if (response.success && response.reply) {
          addMessage(response.reply, "assistant");
        } else {
          throw new Error(response.error || "No response");
        }
      } catch (err: any) {
        const errorMsg = err.message || "Failed to send message";
        setError(errorMsg);
        addMessage(`❌ ${errorMsg}`, "assistant");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, addMessage],
  );

  return { messages, isLoading, error, sendMessage: sendUserMessage };
}
