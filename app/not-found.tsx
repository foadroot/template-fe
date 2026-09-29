import Link from "next/link";
import { MoveLeft } from "lucide-react";

import { brandButton } from "@/components/shared/brand-button";
import { Container } from "@/components/shared/container";
import { DecorativeShapes } from "@/components/shared/decorative-shapes";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

/**
 * The brand 404.
 *
 * Root-level, so it covers both public and protected misses, and it deliberately renders
 * outside the marketing shell: the design shows a full-bleed brand surface. It always
 * offers a working route back to the homepage.
 */
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-primary px-6 py-20 text-brand-on-primary">
      <DecorativeShapes variant="splash" />

      <Container className="relative flex flex-col items-center text-center">
        <p
          aria-hidden
          className="bg-gradient-to-r from-white via-white to-brand-accent bg-clip-text font-heading text-[7rem] leading-none font-extrabold text-transparent sm:text-[10rem]"
        >
          404
        </p>

        <p className="mt-4 text-xs font-bold tracking-[0.18em] text-white/70 uppercase">
          Page not found
        </p>

        <h1 className="mt-4 max-w-2xl font-display text-heading-s font-semibold text-balance sm:text-heading-m">
          The page you&apos;re looking for isn&apos;t here
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
          It may have been moved, or the link that brought you here may be out
          of date. Everything else is still where you left it.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={routes.publicRoutes.home}
            className={cn(buttonVariants(), brandButton.accent)}
          >
            <MoveLeft aria-hidden className="size-4" />
            Back to home
          </Link>
          <Link
            href={routes.publicRoutes.courses.list}
            className={cn(buttonVariants(), brandButton.onPrimaryOutline)}
          >
            Browse courses
          </Link>
        </div>
      </Container>
    </div>
  );
}
