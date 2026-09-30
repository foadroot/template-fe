"use client";

import { useMemo } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";

import { cn } from "@/lib/utils";

type SectionErrorBoundaryProps = {
  children: ReactNode;
  /** Section name for the fallback copy and the console log — e.g. "Hero", "Stats". */
  name: string;
  className?: string;
};

// Matches the marketing site's bordered-card treatment (rounded-brand-panel on
// brand-border) rather than the dashboard ErrorBoundary's shadcn styling, so a
// failed section still reads as part of the public site instead of the app shell.
function SectionFallback({
  name,
  className,
  error,
  resetErrorBoundary,
}: FallbackProps & { name: string; className?: string }) {
  return (
    <div
      role="alert"
      className={cn(
        "mx-auto flex w-full max-w-xl flex-col items-center gap-4 rounded-brand-panel border border-brand-border bg-brand-card px-6 py-16 text-center",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center border border-destructive/30 bg-destructive/5 text-destructive"
      >
        <TriangleAlert className="h-5 w-5" />
      </span>

      <div className="flex flex-col gap-1">
        <p className="font-display text-base font-semibold text-brand-foreground">
          This section couldn&apos;t load
        </p>
        <p className="max-w-sm text-[14px] leading-relaxed text-brand-muted-foreground">
          {name} ran into a problem. The rest of the page is unaffected.
        </p>
      </div>

      {process.env.NODE_ENV !== "production" && error instanceof Error ? (
        <pre className="max-h-40 w-full overflow-auto border border-brand-border bg-background p-3 text-left text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
          {error.message}
          {error.stack ? `\n\n${error.stack}` : null}
        </pre>
      ) : null}

      <button
        type="button"
        onClick={resetErrorBoundary}
        className="mt-2 inline-flex h-10 items-center gap-2 rounded-brand-pill border border-brand-border px-5 text-[12px] font-semibold tracking-[0.1em] text-brand-foreground uppercase transition-colors hover:border-brand-primary hover:text-brand-primary"
      >
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}

// Isolates one page section's render/runtime errors so a single broken
// section (bad data, a rendering bug) falls back to an inline notice instead
// of taking down every other section on the page. Wrap each top-level
// section at the page-composition call site, e.g.:
//   <SectionErrorBoundary name="Hero"><Hero /></SectionErrorBoundary>
export function SectionErrorBoundary({
  children,
  name,
  className,
}: SectionErrorBoundaryProps) {
  function handleError(error: unknown, info: ErrorInfo) {
    console.error(
      `[SectionErrorBoundary] "${name}" failed to render`,
      error,
      info.componentStack,
    );
  }

  // Kept stable so an update never remounts the fallback mid-retry.
  const FallbackComponent = useMemo(() => {
    function Fallback(props: FallbackProps) {
      return <SectionFallback {...props} name={name} className={className} />;
    }
    return Fallback;
  }, [name, className]);

  return (
    <ReactErrorBoundary
      onError={handleError}
      FallbackComponent={FallbackComponent}
    >
      {children}
    </ReactErrorBoundary>
  );
}
