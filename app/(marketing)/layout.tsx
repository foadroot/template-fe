import type { ReactNode } from "react";

import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { SmoothScroll } from "@/components/shared/smooth-scroll";

/**
 * The public site shell: a normally scrolling page with the header above and the footer
 * below. Deliberately not the dashboard shell — route groups select the shell at build
 * time, so public pages never ship the panel's markup (design.md D2/D3).
 *
 * `font-body` opts this subtree into the design's Satoshi body face; the dashboard keeps
 * the project's Geist setup.
 *
 * `SmoothScroll` mounts here rather than in the root layout: only these pages get Lenis,
 * while the auth screens and the dashboard's own scroll shell keep native scrolling.
 */
export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-surface font-body text-brand-foreground">
      <SmoothScroll />
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
