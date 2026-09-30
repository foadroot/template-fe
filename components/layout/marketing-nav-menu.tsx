"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

import {
  marketingNavLinks,
  type MarketingLink,
} from "@/components/layout/marketing-nav-links";
import { BrandLogo } from "@/components/shared/brand-logo";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

const accountLinks: readonly MarketingLink[] = [
  { label: "Sign In", href: routes.publicRoutes.auth.login },
  { label: "Join Us", href: routes.publicRoutes.auth.register },
];

/** The panel's rows: the header links first, then the account entry points. */
const menuLinks: readonly MarketingLink[] = [
  ...marketingNavLinks,
  ...accountLinks,
];

/** The account CTA pinned below the rows — the panel's own "do this now" surface. */
const ctaLink: MarketingLink = {
  label: "Join Us",
  href: routes.publicRoutes.auth.register,
};

function isLinkActive(pathname: string, href: string) {
  if (href === routes.publicRoutes.home) return pathname === "/";
  return pathname === href;
}

/**
 * The compact navigation for narrow viewports.
 *
 * Isolated as the shell's only client component so the header and every page below it stay
 * server-rendered (design.md D4). Every item is a link, so keyboard operation comes from
 * the platform; Escape closes the panel, and the page behind it stops scrolling while it
 * is open.
 *
 * Below `lg` the toggle opens a full-screen popup — a circular clip-path wipe out of the
 * toggle's own corner (see `mobile-nav-open` in globals.css), with each row staggering in
 * behind it — rather than an inline panel that pushes the page down. It lives inside the
 * header but sizes against the viewport: no ancestor (header, Container, layout div)
 * carries a transform or filter, so `fixed inset-0` is not re-anchored to any of them.
 */
export function MarketingNavMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // True once the popup has opened at least once — otherwise the close animation would
  // play on first paint, before any real interaction. State, not a ref: this value feeds
  // the render output, so it must trigger one.
  const [everOpened, setEverOpened] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the popup on navigation without an effect (render-time state adjustment — see
  // https://react.dev/learn/you-might-not-need-an-effect). Covers navigations the panel's
  // own onClick never sees, such as the browser's back button.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Escape closes the popup, and body scroll is locked while it's open — both need
  // cleanup, so this stays an effect rather than a render check.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="marketing-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => {
          setEverOpened(true);
          setOpen((value) => !value);
        }}
        className="grid size-10 place-items-center rounded-full bg-white/10 text-white outline-none hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/60"
      >
        {open ? (
          <X aria-hidden className="size-5" />
        ) : (
          <Menu aria-hidden className="size-5" />
        )}
      </button>

      {/* `inert` while closed: the panel stays mounted through the close animation, and
          without it its links would remain in the tab order (and the a11y tree) behind an
          invisible, pointer-dead overlay. */}
      <div
        id="marketing-nav-menu"
        inert={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-brand-primary brand-grid p-6 text-white sm:p-8",
          open
            ? "mobile-nav-open"
            : everOpened
              ? "mobile-nav-close"
              : "pointer-events-none opacity-0",
        )}
      >
        {/* Wrapper toggles `nav-items-hidden` so rows reset instantly on close and the
            stagger replays cleanly on the next open. */}
        <div className={cn("contents", !open && "nav-items-hidden")}>
          <div
            className="nav-item flex items-center justify-between"
            style={{ animationDelay: "0.15s" }}
          >
            <Link
              href={routes.publicRoutes.home}
              onClick={close}
              className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-white/60"
            >
              <BrandLogo className="h-7" />
              <span className="sr-only">ByteSpace home</span>
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition-colors outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/60"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <div className="my-auto flex flex-col pt-6 pb-8">
            <nav aria-label="Mobile" className="flex flex-col">
              {menuLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  aria-current={
                    isLinkActive(pathname, link.href) ? "page" : undefined
                  }
                  className={cn(
                    "nav-item border-b border-white/15 py-3.5 font-display text-[30px] leading-tight font-semibold tracking-tight uppercase transition-colors outline-none focus-visible:ring-3 focus-visible:ring-white/60 sm:text-heading-s",
                    isLinkActive(pathname, link.href)
                      ? "text-brand-accent"
                      : "text-white hover:text-brand-accent",
                  )}
                  style={{ animationDelay: `${0.22 + index * 0.07}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* The panel's CTA — the reference's closing card, on this site's button
                surface: lime on the blue panel, since `brand-accent` is what every
                marketing button uses. The figure is the design's own showcase stat. */}
            <Link
              href={ctaLink.href}
              onClick={close}
              className="nav-item group relative mt-8 block overflow-hidden rounded-brand-card bg-brand-accent p-6 text-brand-on-accent outline-none focus-visible:ring-3 focus-visible:ring-white/60"
              style={{
                animationDelay: `${0.22 + menuLinks.length * 0.07 + 0.08}s`,
              }}
            >
              <div className="relative flex items-center gap-1.5 text-lg font-medium">
                <span>{ctaLink.label}</span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <p className="relative mt-1 text-body-s text-brand-on-accent/70">
                70+ courses, one platform
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
