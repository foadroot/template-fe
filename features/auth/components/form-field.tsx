import { type ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * A labelled field that wires up the error message, so both auth forms announce invalid
 * input consistently instead of each rolling their own markup. The label treatment is
 * the reference's: a small, medium-weight neutral caption sitting right above the input.
 */
export function FormField({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Label
        htmlFor={id}
        className="mb-1 block text-xs font-medium text-brand-neutral-700"
      >
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
