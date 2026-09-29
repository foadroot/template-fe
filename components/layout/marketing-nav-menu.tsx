"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import {
  marketingNavLinks,
  type MarketingLink,
} from "@/components/layout/marketing-nav-links";
import { routes } from "@/config/routes";

const accountLinks: readonly MarketingLink[] = [
  { label: "Sign In", href: routes.publicRoutes.auth.login },
  { label: "Join Us", href: routes.publicRoutes.auth.register },
];

/**
 * The compact navigation for narrow viewports.
 *
 * Isolated as the shell's only client component so the header and every page below it stay
 * server-rendered (design.md D4). Every item is a link, so keyboard operation comes from
 * the platform; Escape closes the panel.
 */
export function MarketingNavMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="marketing-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-xl bg-white/10 text-white outline-none hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/60"
      >
        {open ? (
          <X aria-hidden className="size-5" />
        ) : (
          <Menu aria-hidden className="size-5" />
        )}
      </button>

      <div
        id="marketing-nav-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-white/15 bg-brand-primary p-6"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {[...marketingNavLinks, ...accountLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-brand-card px-3 py-3 text-label-l text-white outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
