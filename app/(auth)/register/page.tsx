import type { Metadata } from "next";

import { routes } from "@/config/routes";
import { AuthFormCard, SignUpForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Join ByteSpace",
  description:
    "Create a ByteSpace account to enrol in courses and follow the creators you learn from.",
  alternates: { canonical: routes.publicRoutes.auth.register },
};

// PLACEHOLDER copy: the Register frame's own strings have not been read yet (the Figma API
// rate-limited during this pass). Replace once the frame's text is pulled.
export default function RegisterPage() {
  return (
    <AuthFormCard
      title="Join ByteSpace"
      description="Create an account to enrol in courses and keep your progress in one place."
      footer={{
        prompt: "Already have an account?",
        link: {
          label: "Sign In",
          href: routes.publicRoutes.auth.login,
        },
      }}
    >
      <SignUpForm />
    </AuthFormCard>
  );
}
