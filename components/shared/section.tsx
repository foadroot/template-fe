import { type ReactNode } from "react";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

/**
 * A page section on the marketing surface. Applies the shared vertical rhythm and,
 * when `muted`, the alternating surface treatment the design uses between sections.
 */
export function Section({
  children,
  className,
  muted = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-20",
        muted && "bg-brand-surface-muted",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
