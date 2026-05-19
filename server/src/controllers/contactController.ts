import { Request, Response } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  debug: true,
});

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, message } = req.body;

    console.log("Contact request received:", { name, email, phone });

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email and message are required" });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    // Письмо владельцу
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📬 Новое сообщение от ${name}`,
      html: `
        <h2>Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone || "Не указан"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
      `,
    });

    // Копия пользователю
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "📧 Копия вашего сообщения",
      html: `
        <h2>Спасибо за ваше сообщение!</h2>
        <p>Это копия вашего сообщения:</p>
        <p>${message}</p>
        <p>Я свяжусь с вами в ближайшее время.</p>
      `,
    });

    console.log("Both emails sent successfully");
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Email error:", error);

    if (error.code === "EAUTH") {
      res.status(500).json({ error: "Email authentication failed" });
    } else if (error.code === "ETIMEDOUT") {
      res
        .status(500)
        .json({ error: "Connection timeout. Please try again later." });
    } else {
      res.status(500).json({ error: error.message || "Failed to send email" });
    }
  }
};
