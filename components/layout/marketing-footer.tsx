import Link from "next/link";

import {
  marketingFooterColumns,
  marketingLegalLinks,
} from "@/components/layout/marketing-nav-links";
import { BrandLogo } from "@/components/shared/brand-logo";
import { brandButton } from "@/components/shared/brand-button";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

/**
 * The public site's footer: white surface, newsletter form, three link columns and a
 * bottom bar, matching the design's Footer frame (34:1256), 1440x525.
 *
 * Every offset below is measured from the frame's top edge: content starts at y=71 and
 * is 406 tall, the intro column is 528 wide with gaps of 16/45/24 between its three
 * blocks, the link block is 580 wide at x=740 with 40px column gutters and 24px between a
 * heading and its first link, the hairline rule sits at y=435 with the legal row at y=458,
 * and the frame ends with 48px of bottom padding. All footer type is neutral-950.
 *
 * The newsletter form is presentational for now — there is no backend in this change, so
 * submitting it is prevented and the field is not wired to anything.
 */
export function MarketingFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface">
      <Container className="pt-[71px] pb-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,528px)_minmax(0,580px)] lg:justify-between">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <Link
                href={routes.publicRoutes.home}
                className="flex w-fit rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/40"
              >
                <BrandLogo
                  className="h-[35px]"
                  wordmarkColor="var(--brand-foreground)"
                />
                <span className="sr-only">ByteSpace home</span>
              </Link>

              <p className="text-body-s text-brand-foreground">
                Stay Up to date with our latest features and releases by joining
                our newsletter.
              </p>
            </div>

            <div className="mt-[45px] flex max-w-[504px] flex-col gap-6">
              <form className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="h-[52px] w-full rounded-brand-pill border border-brand-border bg-brand-card px-6 text-body-m text-brand-foreground outline-none placeholder:text-brand-foreground focus-visible:border-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/20"
                />
                <button
                  type="submit"
                  className={cn(
                    buttonVariants(),
                    brandButton.accent,
                    "h-[46px] px-6 text-label-l",
                  )}
                >
                  {/* The design's own label for this control is "Search". */}
                  Search
                </button>
              </form>

              <p className="text-body-xs text-brand-foreground">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {marketingFooterColumns.map((column, index) => (
              <nav
                key={column.heading ?? index}
                aria-label={`Footer links ${index + 1}`}
                /* The middle column carries no heading of its own, so it drops by the
                   heading's 24px plus the 24px gap to line up with the other two. */
                className={column.heading ? undefined : "sm:mt-12"}
              >
                <ul className="flex flex-col gap-4 text-body-s">
                  {column.heading ? (
                    <li className="mb-2">
                      <span className="text-body-m text-brand-foreground">
                        {column.heading}
                      </span>
                    </li>
                  ) : null}
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="rounded-sm text-body-s text-brand-foreground outline-none hover:text-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/40"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-brand-border pt-[22px] lg:mt-[130px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-body-xs text-brand-foreground">
              @ 2023 ByteSpace. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-xs">
              {marketingLegalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-body-xs text-brand-foreground outline-none hover:text-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/40"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
