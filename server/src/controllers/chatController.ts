import { Request, Response } from "express";
import { openai, OPENAI_CONFIG } from "../config/openai.js";
import { ChatRequest } from "../types/index.js";

export const sendMessage = async (
  req: Request<{}, {}, ChatRequest>,
  res: Response,
) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    console.log(
      `Sending to ${OPENAI_CONFIG.model}:`,
      trimmedMessage.slice(0, 50),
    );

    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        { role: "system", content: OPENAI_CONFIG.systemPrompt },
        { role: "user", content: trimmedMessage },
      ],
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: OPENAI_CONFIG.temperature,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      throw new Error("No response from OpenRouter");
    }

    res.json({ success: true, reply: reply.trim() });
  } catch (error: any) {
    console.error("OpenRouter API Error:", error);

    if (error.status === 401) {
      return res.status(401).json({ error: "Invalid OpenRouter API key" });
    }
    if (error.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again." });
    }
    if (error.status === 402) {
      return res.status(402).json({
        error: "Insufficient credits. Please add credits on OpenRouter.",
      });
    }

    throw new Error("Failed to get response from AI. Please try again.");
  }
};
