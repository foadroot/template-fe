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
 * The sign in screen, rebuilt from frame 49:195 (1440x1024) — the same shell as the
 * register screen with one field fewer, and a `Frame 18` (node 50:362) of divider and
 * social squares between the form and the cross-link.
 *
 * Every string below is the frame's own. Note the cross-link's lead-in is #888888 here
 * against #4B4C53 on the register frame: the file is inconsistent, and it is reproduced
 * as drawn.
 *
 * UI only — no session is created on submit.
 */
export default function LoginPage() {
  return (
    <AuthScreen
      introHeading="Sign in with ease"
      introBody="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
      eyebrow="Sign In"
      title="Welcome Back"
      beforeFooter={<AuthSocialButtons />}
      footer={
        <p className="flex gap-1 text-[16px] leading-[26px] text-[#888888]">
          New user?
          <Link
            href={routes.publicRoutes.auth.register}
            className="text-brand-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <LogInForm />
    </AuthScreen>
  );
}
