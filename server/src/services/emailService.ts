import nodemailer from "nodemailer";
import { Resend } from "resend";

const NODE_ENV = process.env.NODE_ENV || "development";

const nodemailerTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const resend =
  NODE_ENV === "production" && process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const from =
    NODE_ENV === "production"
      ? process.env.EMAIL_FROM || "onboarding@resend.dev"
      : process.env.EMAIL_USER;

  if (!from) {
    throw new Error("Email sender (from) is not configured");
  }

  if (NODE_ENV === "production") {
    if (!resend) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { data, error } = await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    console.log(
      `Email sent via Resend (production) to: ${options.to}, id: ${data?.id}`,
    );
  } else {
    await nodemailerTransporter.sendMail({ ...options, from });
    console.log(`Email sent via Nodemailer (development) to: ${options.to}`);
  }
}
