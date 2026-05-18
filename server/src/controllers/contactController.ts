import { Request, Response } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email and message are required" });
    }

    // Письмо владельцу
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      html: `<h2>New message</h2><p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone || "Not provided"}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    // Копия пользователю
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Copy of your message",
      html: `<h2>Thank you for your message!</h2><p>This is a copy:</p><p>${message}</p><br><p>I will contact you soon.</p>`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
