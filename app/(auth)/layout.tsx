import type { ReactNode } from "react";

import { DecorativeShapes } from "@/components/shared/decorative-shapes";

/**
 * The auth shell: the reference site's auth layout — the brand ground (with its grid and
 * splash ornaments) and nothing else, centring whatever the page renders. The split
 * itself (artwork left, form card right) lives in `AuthScreen`, because the headline and
 * card copy differ per screen and a layout cannot know them.
 *
 * These screens are UI only: no session is created and no route is protected.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="brand-grid relative flex min-h-screen w-full items-center justify-center bg-brand-primary p-4 font-body text-brand-on-primary sm:p-6 lg:p-8">
      <DecorativeShapes variant="splash" />

      <div className="relative w-full">{children}</div>
    </main>
  );
}
