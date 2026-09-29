import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The heading block used at the top of every marketing section, so all sections share
 * one heading treatment rather than each declaring its own.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-bold tracking-[0.18em] text-brand-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-heading-s font-semibold text-balance text-brand-foreground lg:text-heading-m">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-pretty text-brand-muted-foreground">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
