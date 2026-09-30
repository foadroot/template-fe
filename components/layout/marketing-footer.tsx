"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import {
  marketingFooterColumns,
  marketingLegalLinks,
} from "@/components/layout/marketing-nav-links";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { routes } from "@/config/routes";

/**
 * The public site's footer, rebuilt against the design's own `Footer` frame (`34:1256`,
 * 1440x525) rather than the reference site's column set: a 528/92/580 split whose left
 * column carries the lockup, the newsletter copy, an inline pill form and the disclaimer,
 * whose right side is three link lists under two headings, and which closes on a
 * rule-separated legal row.
 *
 * The vertical arithmetic is the frame's, and it is exact: 71 above the nav, 234 of nav,
 * 130 of clear space, a 42px legal row (a hairline, 22, a 19.2 line) and 48 below —
 * 71 + 234 + 130 + 42 + 48 = 525. The left column is what sets the nav's height: a 37px
 * lockup, 16, a one-line tagline, 45, the 52px form, 24, the two-line disclaimer, which
 * lands on 234.
 *
 * The palette is the shared one the two projects draw from, so the reference's
 * `shuttle-gray-*` reads back as our `brand-neutral-*`. The one thing kept from our own
 * shell is `Container`, so the footer stays on the same content column as the nav.
 *
 * The newsletter is still presentational: submitting is prevented, the note is local
 * state, and nothing is sent anywhere.
 */
export function MarketingFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  }

  return (
    <footer
      aria-label="Site Footer"
      className="w-full border-t border-brand-neutral-200/60 bg-white pt-14 pb-10 sm:pt-16 sm:pb-12 md:pt-20 lg:pt-[71px]"
    >
      <Container>
        {/* 528 | 92 | 580, measured off 34:1259 (x 0-528) and 34:1272 (x 620-1200). */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[528fr_580fr] lg:gap-[92px]">
          <div className="flex flex-col">
            <Link
              href={routes.publicRoutes.home}
              className="group inline-flex w-fit items-center gap-2.5 rounded-full transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none"
            >
              <BrandLogo
                markOnly
                className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
                label="ByteSpace"
              />
              <span className="font-sans text-2xl font-extrabold tracking-tight text-brand-neutral-950">
                ByteSpace
              </span>
            </Link>

            {/* One line at 528 wide, so the measure has to be the frame's own rather
                than a sm-width truncation of it. */}
            <p className="mt-4 max-w-[528px] text-xs leading-relaxed text-brand-neutral-950 sm:text-sm">
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex max-w-[504px] items-start gap-6 lg:mt-[45px]"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="h-[52px] min-w-0 flex-1 rounded-full border border-brand-neutral-200 bg-white px-6 text-base text-brand-neutral-950 transition-all placeholder:text-brand-neutral-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none"
              />

              {/* Flat lime on the design's own on-accent ink (34:1269/34:1270: no stroke,
                  no effect), top-aligned with the field because the frame's row does not
                  centre it. */}
              <button
                type="submit"
                className="inline-flex h-[46px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-accent px-6 text-label-l font-medium text-brand-on-accent transition-all hover:bg-brand-accent-hover focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                {/* The design's own label for this control is "Search" (34:1270). */}
                Search
              </button>
            </form>

            {subscribed ? (
              <p className="mt-2 text-xs font-semibold text-brand-primary">
                ✓ Thank you for subscribing to our newsletter!
              </p>
            ) : null}

            <p className="mt-6 max-w-[504px] text-xs leading-[19.2px] text-brand-neutral-950">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-10">
            {marketingFooterColumns.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* The design starts every column's links 48px down — a 24px heading
                    over a 24px gap for "Browse" and "Platform" (34:1274, 34:1289), and
                    plain clearance for the heading-less middle list (34:1281). */}
                {group.heading ? (
                  <p className="mb-6 text-base leading-6 text-brand-neutral-950">
                    {group.heading}
                  </p>
                ) : (
                  <div className="mb-6 h-6" aria-hidden />
                )}

                <ul className="space-y-[15.6px]">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block text-sm leading-[22.4px] text-brand-neutral-950 transition-colors duration-200 hover:text-brand-primary focus-visible:text-brand-primary focus-visible:outline-none"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 130 of clear space to the frame's hairline, then 22 to its 19.2px row. */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-neutral-200/70 pt-6 sm:mt-16 sm:flex-row sm:pt-8 md:mt-20 lg:mt-[130px] lg:pt-[22px]">
          <p className="text-center text-xs leading-[19.2px] text-brand-neutral-950 sm:text-left">
            © 2023 ByteSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs leading-[19.2px] text-brand-neutral-950 sm:gap-6">
            {marketingLegalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-200 hover:text-brand-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
