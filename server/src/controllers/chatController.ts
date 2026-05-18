import { Request, Response } from "express";
import { openai, generateSystemPrompt } from "../config/openai.js";
import { profileData } from "./profileController.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = generateSystemPrompt(profileData);

    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "openrouter/free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message.trim() },
      ],
      max_tokens: 700,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      throw new Error("No response from AI");
    }

    res.json({ success: true, reply: reply.trim() });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
};
