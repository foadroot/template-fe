import type { Metadata } from "next";
import Link from "next/link";

import { routes } from "@/config/routes";
import { AuthScreen, SignUpForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Join ByteSpace",
  description:
    "Create a ByteSpace account to enrol in courses and follow the creators you learn from.",
  alternates: { canonical: routes.publicRoutes.auth.register },
};

/**
 * The sign up screen, mirroring the reference's signup page: the brand panel on the left
 * and the card (eyebrow, title, form, cross-link) on the right — the same frame as the
 * sign in screen, only the copy and the fields differ.
 *
 * UI only — no account is created on submit.
 */
export default function RegisterPage() {
  return (
    <AuthScreen
      headline="Sign up and come in"
      subcopy="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost."
      eyebrow="Create an Account"
      title={
        <>
          Welcome to
          <br />
          ByteSpace
        </>
      }
      footer={
        <p className="mt-4 text-center text-xs text-brand-neutral-400 sm:mt-5">
          Already have an account?{" "}
          <Link
            href={routes.publicRoutes.auth.login}
            className="font-semibold text-brand-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      }
    >
      <SignUpForm />
    </AuthScreen>
  );
}
