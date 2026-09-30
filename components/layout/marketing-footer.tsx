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
 * The public site's footer, ported element for element from the reference site's
 * `Footer.tsx` (the bytespace-dointech project): a 5/7 grid whose left column carries the
 * icon + wordmark lockup, the newsletter copy, an inline pill form with its thank-you
 * note and the disclaimer, whose right column is three heading-less link lists, and which
 * closes on a rule-separated legal row.
 *
 * The palette is the shared one the two projects draw from, so the reference's
 * `shuttle-gray-*` and `secondary` read back as our `brand-neutral-*` and `brand-primary`
 * here. The one thing kept from our own shell is `Container`, so the footer stays on the
 * same content column as the nav and the sections above it.
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
      className="w-full border-t border-brand-neutral-200/60 bg-white pt-14 pb-10 sm:pt-16 sm:pb-12 md:pt-20"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
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

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-brand-neutral-700 sm:text-sm">
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-5 flex max-w-md items-center gap-2 sm:gap-3"
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
                className="min-w-0 flex-1 rounded-full border border-brand-neutral-200 bg-white px-5 py-2.5 text-xs text-brand-neutral-950 transition-all placeholder:text-brand-neutral-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none sm:text-sm"
              />

              <button
                type="submit"
                className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-accent px-6 text-xs font-bold text-brand-primary shadow-sm transition-all hover:bg-brand-accent-hover hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 active:scale-[0.98] sm:px-7 sm:text-sm"
              >
                {/* The design's own label for this control is "Search". */}
                Search
              </button>
            </form>

            {subscribed ? (
              <p className="mt-2 text-xs font-semibold text-brand-primary">
                ✓ Thank you for subscribing to our newsletter!
              </p>
            ) : null}

            <p className="mt-3.5 max-w-sm text-[11px] leading-normal text-brand-neutral-400 sm:text-xs">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 lg:col-span-7 lg:gap-12">
            {marketingFooterColumns.map((group, groupIndex) => (
              <ul key={groupIndex} className="space-y-3 sm:space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block text-xs text-brand-neutral-700 transition-colors duration-200 hover:text-brand-primary focus-visible:text-brand-primary focus-visible:outline-none sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-neutral-200/70 pt-6 sm:mt-16 sm:flex-row sm:pt-8 md:mt-20">
          <p className="text-center text-xs text-brand-neutral-400 sm:text-left">
            © 2023 ByteSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-brand-neutral-400 sm:gap-6">
            {marketingLegalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-200 hover:text-brand-neutral-950"
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
