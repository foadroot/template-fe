import type { ReactNode } from "react";
import Link from "next/link";

import { AuthComposition } from "@/features/auth/components/auth-composition";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { routes } from "@/config/routes";

/**
 * The auth shell, rebuilt from frames 47:351 (Register) and 49:195 (Login).
 *
 * Both frames are a 1440x1024 brand ground carrying three things:
 *
 * - the `Header_Frame` (1440x120) — and its only child is the logo group at (122, 35).
 *   The frame draws no links, no account entry points and no cart, so neither does this;
 *   the logo is the way back out.
 * - the grid overlay `49:156`, the same 120px hairline grid at 12% the hero and the CTA
 *   band use, covering the whole frame.
 * - the decorative collage, which lives in `AuthComposition` and sits behind everything.
 *
 * The split itself — intro column left, white form card right — lives in `AuthScreen`,
 * because the copy differs per screen and a layout cannot know it.
 *
 * These screens are UI only: no session is created and no route is protected.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="brand-grid relative min-h-screen w-full overflow-x-clip bg-brand-primary font-body text-brand-neutral-50">
      <header className="relative h-20 lg:h-[120px]">
        <Container className="flex h-full items-center lg:items-start">
          {/* The logo group sits at y=35 on the 120px band, x=122 — the same 2px the
              marketing nav adds to the content column's x=120 to reach it. */}
          <Link
            href={routes.publicRoutes.home}
            className="rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-white/60 lg:mt-[35px] lg:ml-[2px]"
          >
            <BrandLogo className="h-7 lg:h-[35px]" />
            <span className="sr-only">ByteSpace home</span>
          </Link>
        </Container>
      </header>

      <AuthComposition />

      <Container className="relative pb-16 lg:pb-[120px]">{children}</Container>
    </main>
  );
}
