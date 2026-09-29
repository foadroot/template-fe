import { z } from "zod";

/**
 * Validation for the auth screens.
 *
 * These screens are UI only — the schemas validate input so the forms behave like real
 * ones, but nothing is submitted to a backend and no session is created (proposal.md
 * Non-Goals).
 */
export const signUpSchema = z
  .object({
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
    confirmPassword: z.string().min(1, "Confirm your password"),
    terms: z
      .boolean()
      .refine((accepted) => accepted, "Accept the terms to continue"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const logInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean(),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type LogInValues = z.infer<typeof logInSchema>;
