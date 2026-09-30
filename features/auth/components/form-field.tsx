import { type ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * A labelled field that wires up the error message, so both auth forms announce invalid
 * input consistently instead of each rolling their own markup.
 *
 * The label treatment is the frames' own (47:370 and its siblings): Satoshi Medium 14
 * with a 17px line box — Figma renders the 16.8 as a whole pixel — Neutral 950, sitting
 * 8px above the input: the gap the frame's field auto-layout uses between the label and
 * the 52px control.
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
    <div className={cn("flex w-full flex-col", className)}>
      <Label
        htmlFor={id}
        className="mb-2 block text-[14px] leading-[17px] font-medium text-brand-neutral-950"
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
