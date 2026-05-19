import { Request, Response } from "express";
import { sendEmail } from "../services/emailService.js";

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, message } = req.body;

    console.log("Contact request:", { name, email, phone });

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email and message are required" });
    }

    // 1. Письмо владельцу
    await sendEmail({
      to: process.env.EMAIL_USER!,
      subject: `Новое сообщение от ${name}`,
      html: `
        <h2>Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone || "Не указан"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Отправлено с сайта arvik1982.github.io/about-me</p>
      `,
    });

    // 2. Копия пользователю
    await sendEmail({
      to: email,
      subject: "Мы получили ваше письмо",
      text: `Привет! ${name || ""},

Спасибо за ваше письмо. Я его получил и в ближайшее время дам на него ответ.

Best regards,
Арсений

Письмо:
${message}`,
    });

    console.log("Both emails sent successfully");
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Email error:", error);
    res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
};
