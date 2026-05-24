import z from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email("Invalid email format").max(255),
  phone: z.string().max(30).optional(),
  message: z.string().min(1).max(2000).trim(),
});

export const ChatRequestSchema = z.object({
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Message must be a string",
    })
    .trim()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long (max 500 characters)")
    .transform((val) => val.replace(/\s+/g, " ")),
});
