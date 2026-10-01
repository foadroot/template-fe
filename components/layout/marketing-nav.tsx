import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { marketingNavLinks } from "@/components/layout/marketing-nav-links";
import { MarketingNavHeader } from "@/components/layout/marketing-nav-header";
import { MarketingNavLink } from "@/components/layout/marketing-nav-link";
import { MarketingNavMenu } from "@/components/layout/marketing-nav-menu";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { routes } from "@/config/routes";

/**
 * The public site's header: the brand surface with the logo, the primary links and the
 * account entry points. The link that matches the current page wears the lime at a heavier
 * weight (see `MarketingNavLink`), and only the compact menu is otherwise interactive
 * (design.md D4).
 *
 * Measured off the design's `Header_Frame` (1440x120): 120px tall, the logo group at
 * x=122, the link group centred on x=719, and the account group — Sign In, Join Us and a
 * 24px cart glyph at x=1296, 24px between each — ending on x=1320.
 *
 * Scrolling down halves the bar (120px → 60px on desktop, 80px → 40px on mobile) with a
 * short height transition; scrolling back up restores it — see `MarketingNavHeader`.
 */
export function MarketingNav() {
  return (
    <MarketingNavHeader>
      <Container className="relative flex h-full items-center justify-between gap-6">
        {/* The frame's logo group is not centred with the other two groups: it sits at
            y=35 (the icon runs 35-66.5, the wordmark ink 50-67) while the link and
            account groups centre on y=60. In the 60px compact bar it re-centres to
            12.5px = (60-35)/2 — kept as margin rather than align-self so it rides the
            bar's height transition instead of snapping while the bar is still tall. */}
        <Link
          href={routes.publicRoutes.home}
          className="rounded-full transition-[margin-top] duration-300 ease-out outline-none focus-visible:ring-3 focus-visible:ring-white/60 motion-reduce:transition-none lg:mt-[35px] lg:ml-[2px] lg:self-start lg:group-data-[compact=true]:mt-[12.5px]"
        >
          <BrandLogo className="h-7 lg:h-[35px]" />
          <span className="sr-only">ByteSpace home</span>
        </Link>

        {/* Centred on the frame, not on the space between the two side groups: the
            design's link group runs x=614-824, whose midpoint is the viewport's. */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <ul className="flex items-center gap-6">
            {marketingNavLinks.map((link) => (
              <li key={link.href}>
                {/* The one client piece of the desktop header: knowing which link is
                    current needs the pathname, and only this link needs it. */}
                <MarketingNavLink link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 lg:gap-6">
          <Link
            href={routes.publicRoutes.auth.login}
            className="hidden rounded-full text-label-m text-white/95 outline-none hover:text-brand-accent focus-visible:ring-3 focus-visible:ring-white/60 lg:block"
          >
            Sign In
          </Link>
          <Link
            href={routes.publicRoutes.auth.register}
            className="hidden rounded-full text-label-m text-white/95 outline-none hover:text-brand-accent focus-visible:ring-3 focus-visible:ring-white/60 lg:block"
          >
            Join Us
          </Link>

          {/* The frame places a 24px outlined glyph at x=1296, after the account links,
              drawn in the on-surface white with no container of its own. */}
          <button
            type="button"
            aria-label="Cart, 0 items"
            className="grid size-6 place-items-center rounded-full text-white outline-none hover:text-brand-accent focus-visible:ring-3 focus-visible:ring-white/60"
          >
            <ShoppingBag aria-hidden className="size-5" />
          </button>

          <MarketingNavMenu />
        </div>
      </Container>
    </MarketingNavHeader>
  );
}
