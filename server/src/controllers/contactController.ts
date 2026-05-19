import { Request, Response } from "express";
import { sendEmail } from "../services/emailService.js";

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, message } = req.body;

    console.log("📧 Contact request:", { name, email, phone });

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email and message are required" });
    }

    // 1. Письмо владельцу
    await sendEmail({
      to: process.env.EMAIL_USER!,
      subject: `New message from ${name}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 2. Копия пользователю
    await sendEmail({
      to: email,
      subject: "Copy of your message",
      html: `
        <h2>Thank you for your message!</h2>
        <p>This is a copy of your message:</p>
        <p>${message}</p>
        <br/>
        <p>I will contact you soon.</p>
      `,
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
