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
 * The sign up screen, rebuilt from frame 47:351 (1440x1024).
 *
 * Every string below is the frame's own (read from its text nodes): the intro column at
 * (122, 120), the card's eyebrow and two-line title, the three field labels and their
 * placeholders, the "Continue" pill and the centred cross-link. The frame draws no
 * password confirmation and no terms acknowledgement, so neither does this screen.
 *
 * UI only — no account is created on submit.
 */
export default function RegisterPage() {
  return (
    <AuthScreen
      introHeading="Sign up and come in"
      introBody="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost"
      eyebrow="Create an Account"
      title="Welcome to ByteSpace"
      footer={
        <p className="flex gap-1 text-[16px] leading-[26px] text-brand-neutral-700">
          Already have an account?
          <Link
            href={routes.publicRoutes.auth.login}
            className="text-brand-primary hover:underline"
          >
            Login
          </Link>
        </p>
      }
    >
      <SignUpForm />
    </AuthScreen>
  );
}
