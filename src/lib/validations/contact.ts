import { z } from "zod";

export const contactServiceOptions = [
  "business-development",
  "technical-marketing",
  "technical-development",
  "automation",
  "ai",
  "general",
] as const;

export const contactMessageSchema = z.object({
  locale: z.enum(["ar", "en"]).default("ar"),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  email: z.string().trim().email().optional().or(z.literal("")),
  service: z.enum(contactServiceOptions),
  budget: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(3000),
  website: z.string().trim().max(0).optional().or(z.literal("")),
});
