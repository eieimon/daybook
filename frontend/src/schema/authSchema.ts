import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z.string().nonempty("Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
