import Link from "next/link";

import { cn } from "@/lib/utils";
import { type CourseTab, type CourseTabId } from "@/features/courses/types/courses.types";

/**
 * The three pills above the panel — About, Lessons, Reviews.
 * Supports interactive client tab switching via `onTabChange` or fallback navigation via `Link`.
 */
export function CourseTabs({
  tabs,
  active,
  onTabChange,
  className,
}: {
  tabs: CourseTab[];
  active: CourseTabId;
  onTabChange?: (tabId: CourseTabId) => void;
  className?: string;
}) {
  return (
    <nav aria-label="Course sections" className={cn("flex gap-3 sm:gap-4", className)}>
      {tabs.map((tab) => {
        const selected = tab.id === active;

        const commonClassName = cn(
          "inline-flex h-[43px] items-center justify-center rounded-brand-pill px-6 text-label-m font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-brand-primary/40 cursor-pointer",
          selected
            ? "bg-brand-accent text-brand-foreground shadow-xs font-semibold"
            : "bg-brand-surface-muted text-brand-neutral-700 hover:bg-brand-neutral-100",
        );

        if (onTabChange) {
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-current={selected ? "page" : undefined}
              className={commonClassName}
            >
              {tab.label.value}
            </button>
          );
        }

        return (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={selected ? "page" : undefined}
            className={commonClassName}
          >
            {tab.label.value}
          </Link>
        );
      })}
    </nav>
  );
}
