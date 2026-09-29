/**
 * Auth feature module — the only import surface for this feature.
 *
 * UI only: the schemas validate input, but no session is created and no request is made
 * (proposal.md Non-Goals).
 */
export { SignUpForm } from "./components/sign-up-form";
export { LogInForm } from "./components/log-in-form";
export { AuthFormCard } from "./components/auth-form-card";
export { logInSchema, signUpSchema } from "./schemas/auth.schemas";

export type { LogInValues, SignUpValues } from "./schemas/auth.schemas";
