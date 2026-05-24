import { Request, Response } from "express";
import {
  openai,
  generateSystemPrompt,
  ProfileData,
  OPENAI_CONFIG,
} from "../config/openai.js";

import OpenAI from "openai";
import { ChatRequestSchema } from "../validation/schemas.js";
import { profileData } from "../data/profile.js";

export const sendMessage = async (req: Request, res: Response) => {
  const parseResult = ChatRequestSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: parseResult.error.format(),
    });
  }

  const { message } = parseResult.data;

  try {
    const systemPrompt = generateSystemPrompt(profileData as ProfileData);

    const completion = await openai.chat.completions.create({
      ...OPENAI_CONFIG,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({
        success: false,
        error: "AI returned empty response",
      });
    }

    return res.json({
      success: true,
      reply: reply.trim(),
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Chat error:", errorMessage);

    if (error instanceof OpenAI.APIError) {
      return res.status(502).json({
        success: false,
        error: "AI service temporarily unavailable",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to get response from AI",
    });
  }
};
