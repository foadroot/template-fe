"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  isLinkActive,
  type MarketingLink,
} from "@/components/layout/marketing-nav-links";
import { cn } from "@/lib/utils";

/**
 * A primary header link that marks itself when it is the section being viewed: the
 * lime it already shows on hover, held permanently, one weight step up from the
 * inactive links so the current page reads as selected without a background pill
 * the design doesn't have.
 *
 * The only part of the desktop header that needs the visitor's pathname, so it
 * stands alone as a client component and the header around it stays server-rendered
 * (design.md D4) — the same split the mobile menu already makes.
 */
export function MarketingNavLink({ link }: { link: MarketingLink }) {
  const pathname = usePathname();
  const active = isLinkActive(pathname, link.href);

  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full text-label-m outline-none hover:text-brand-accent focus-visible:ring-3 focus-visible:ring-white/60",
        active
          ? "font-semibold text-brand-accent"
          : "text-white/95",
      )}
    >
      {link.label}
    </Link>
  );
}
