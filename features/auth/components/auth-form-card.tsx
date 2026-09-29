import { type ReactNode } from "react";
import Link from "next/link";

import { type MarketingLink } from "@/components/layout/marketing-nav-links";

/**
 * The white form panel on the auth screens' brand-coloured background.
 */
export function AuthFormCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: { prompt: string; link: MarketingLink };
}) {
  return (
    <div className="flex flex-col gap-6 rounded-brand-panel bg-brand-card p-6 text-brand-foreground shadow-[var(--shadow-brand-card)] sm:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-bold text-balance">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-brand-muted-foreground">
          {description}
        </p>
      </div>

      {children}

      {footer ? (
        <p className="border-t border-brand-border pt-5 text-sm text-brand-muted-foreground">
          {footer.prompt}{" "}
          <Link
            href={footer.link.href}
            className="rounded-sm font-semibold text-brand-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-brand-primary/40"
          >
            {footer.link.label}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
