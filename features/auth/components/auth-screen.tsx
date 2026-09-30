import type { ReactNode } from "react";
import Link from "next/link";

import { AuthArtwork } from "@/features/auth/components/auth-artwork";
import { BrandLogo } from "@/components/shared/brand-logo";
import { routes } from "@/config/routes";

/**
 * The shared frame of the sign in / sign up screens, ported from the reference site's
 * auth pages: a 12-column row on the brand ground, with the mark, headline, subcopy and
 * the illustration on the left (7 of 12) and the white form card on the right (5 of 12).
 *
 * The card carries the reference's header (a small blue eyebrow over a bold title) and
 * its centred cross-link footer; the form itself is `children` between the two. Both
 * screens render through here, so they cannot drift apart — only the copy differs.
 */
export function AuthScreen({
  headline,
  subcopy,
  eyebrow,
  title,
  footer,
  children,
}: {
  headline: string;
  subcopy: string;
  eyebrow: string;
  title: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8 xl:max-w-6xl xl:gap-12">
      <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left xl:col-span-7">
        <Link
          href={routes.publicRoutes.home}
          aria-label="ByteSpace Home"
          className="group mb-3 inline-flex items-center rounded-lg transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none sm:mb-4"
        >
          <BrandLogo
            markOnly
            className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
            label="ByteSpace"
          />
        </Link>

        <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[34px]">
          {headline}
        </h1>

        <p className="mt-2 max-w-md text-xs leading-relaxed text-white/80 sm:text-sm">
          {subcopy}
        </p>

        <div className="relative mt-4 w-full max-w-[260px] sm:mt-5 sm:max-w-[320px] lg:mt-6 lg:max-w-[380px] xl:max-w-[420px]">
          <AuthArtwork />
        </div>
      </div>

      <div className="flex w-full justify-center lg:col-span-6 lg:justify-end xl:col-span-5">
        <div className="w-full max-w-[420px] rounded-2xl border border-white/20 bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7 md:p-8">
          <div className="mb-4 sm:mb-5">
            <span className="block text-xs font-semibold text-brand-primary sm:text-sm">
              {eyebrow}
            </span>
            <h2 className="mt-0.5 text-xl font-bold leading-tight tracking-tight text-brand-neutral-950 sm:text-2xl lg:text-[26px]">
              {title}
            </h2>
          </div>

          {children}

          {footer}
        </div>
      </div>
    </div>
  );
}
