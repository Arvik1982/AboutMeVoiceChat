import { Request, Response } from "express";
import { sendEmail } from "../services/emailService.js";
import { ContactSchema } from "../validation/schemas.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export const sendContactEmail = async (req: Request, res: Response) => {
  const parseResult = ContactSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: parseResult.error.format(),
    });
  }

  const { name, email, phone, message } = parseResult.data;

  try {
    await Promise.all([
      sendEmail({
        to: process.env.EMAIL_USER!,
        subject: `Новое сообщение от ${name}`,
        html: `
          <h2>Новое сообщение с сайта</h2>
          <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
          <p><strong>Телефон:</strong> ${phone ? escapeHtml(phone) : "Не указан"}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Сообщение:</strong></p>
          <p>${escapeHtml(message)}</p>
          <hr>
          <p>Отправлено с сайта arvik1982.github.io/about-me</p>
        `,
      }),

      sendEmail({
        to: email,
        subject: `${name}, спасибо за ваше письмо!`,
        text: [
          `Привет, ${name}!`,
          "",
          "Спасибо за ваше письмо. Я получил его и отвечу в ближайшее время.",
          "",
          "Best regards,",
          "Арсений",
          "",
          "Ваше сообщение:",
          message,
        ].join("\n"),
      }),
    ]);

    console.log(`Email sent successfully to owner and ${email}`);

    return res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Email error:", errorMessage);

    if (errorMessage.includes("invalid email")) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address",
      });
    }

    if (errorMessage.includes("rate limit")) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
};
