import { type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The marketing content column. Constrains page content to the brand content width and
 * applies the horizontal gutter every public section shares.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-content px-6", className)}>
      {children}
    </Tag>
  );
}
