import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

const NODE_ENV = process.env.NODE_ENV || "development";

const nodemailerTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const from = process.env.EMAIL_USER!;

  if (NODE_ENV === "production") {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not configured");
    }
    await sgMail.send({ ...options, from });
    console.log(`Email sent via SendGrid (production) to: ${options.to}`);
  } else {
    await nodemailerTransporter.sendMail({ ...options, from });
    console.log(`Email sent via Nodemailer (development) to: ${options.to}`);
  }
}
