import type { Metadata } from "next";
import Link from "next/link";

import { routes } from "@/config/routes";
import {
  AuthScreen,
  AuthSocialButtons,
  LogInForm,
} from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your ByteSpace account to continue a course and track your progress.",
  alternates: { canonical: routes.publicRoutes.auth.login },
};

/**
 * The sign in screen, mirroring the reference's signin page: the brand panel on the left
 * and the card (eyebrow, title, form, social row, cross-link) on the right.
 *
 * UI only — no session is created on submit.
 */
export default function LoginPage() {
  return (
    <AuthScreen
      headline="Sign in with ease"
      subcopy="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
      eyebrow="Sign In"
      title="Welcome Back"
      footer={
        <p className="mt-4 text-center text-xs text-brand-neutral-400 sm:mt-5">
          New user?{" "}
          <Link
            href={routes.publicRoutes.auth.register}
            className="font-semibold text-brand-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <LogInForm />
      <AuthSocialButtons />
    </AuthScreen>
  );
}
