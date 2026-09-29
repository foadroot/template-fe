import type { ReactNode } from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { DecorativeShapes } from "@/components/shared/decorative-shapes";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { routes } from "@/config/routes";

/**
 * The auth shell, matching the design's Register (47:351) and Login (49:195) frames: a
 * split on the brand surface, with the brand panel beside the form card.
 *
 * These screens are UI only: no session is created and no route is protected.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="brand-grid relative min-h-screen bg-brand-primary font-body text-brand-on-primary">
      <DecorativeShapes variant="splash" />

      <Container className="relative grid min-h-screen gap-10 py-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={routes.publicRoutes.home}
              className="rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-white/60"
            >
              <BrandLogo className="h-7" />
              <span className="sr-only">ByteSpace home</span>
            </Link>

            <Link
              href={routes.publicRoutes.home}
              className="inline-flex items-center gap-2 rounded-brand-pill px-3 py-2 text-label-m text-white/90 outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/60"
            >
              <MoveLeft aria-hidden className="size-4" />
              Back to website
            </Link>
          </div>

          <div className="hidden flex-col gap-6 lg:flex">
            <h1 className="font-display text-heading-m font-semibold text-balance">
              Unlock your potential as a creator with ByteSpace
            </h1>
            <p className="max-w-md text-body-l text-white/85">
              Experience the collaboration of numerous creators and an
              expanding selection of courses.
            </p>
            <div className="max-w-sm">
              <ImagePlaceholder
                ratio="4/5"
                alt="A ByteSpace creator recording a lesson"
                sizes="(min-width: 1024px) 24rem, 100vw"
              />
            </div>
          </div>
        </div>

        <div className="w-full justify-self-center lg:max-w-md">{children}</div>
      </Container>
    </div>
  );
}
