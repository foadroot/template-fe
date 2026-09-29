import type { Metadata } from "next";

import { routes } from "@/config/routes";
import { AuthFormCard, LogInForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your ByteSpace account to continue a course and track your progress.",
  alternates: { canonical: routes.publicRoutes.auth.login },
};

// PLACEHOLDER copy: the Login frame's own strings have not been read yet (the Figma API
// rate-limited during this pass). Replace once the frame's text is pulled.
export default function LoginPage() {
  return (
    <AuthFormCard
      title="Welcome back"
      description="Sign in to pick up where you left off."
      footer={{
        prompt: "New to ByteSpace?",
        link: {
          label: "Join Us",
          href: routes.publicRoutes.auth.register,
        },
      }}
    >
      <LogInForm />
    </AuthFormCard>
  );
}
