import { z } from "zod";

/**
 * Validation for the auth screens, mirroring the reference's field sets: sign in is email
 * + password, sign up adds a full name.
 *
 * These screens are UI only — the schemas validate input so the forms behave like real
 * ones and report each problem against its field, but nothing is submitted to a backend
 * and no session is created (proposal.md Non-Goals).
 */
export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(80, "That name is too long"),
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(10, "Use at least 10 characters")
    .max(72, "That password is too long"),
});

export const logInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type LogInValues = z.infer<typeof logInSchema>;
