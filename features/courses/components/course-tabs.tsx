import Link from "next/link";

import { cn } from "@/lib/utils";
import { type CourseTab, type CourseTabId } from "@/features/courses/types/courses.types";

/**
 * The three pills above the panel — About, Lessons, Reviews — at y=1019.5 of the Course
 * Details frame. Only the selected pill carries the lime fill; the design also strokes
 * it in violet, but that paint is marked invisible in the file, so it is not drawn.
 */
export function CourseTabs({
  tabs,
  active,
  className,
}: {
  tabs: CourseTab[];
  active: CourseTabId;
  className?: string;
}) {
  return (
    <nav aria-label="Course sections" className={cn("flex gap-4", className)}>
      {tabs.map((tab) => {
        const selected = tab.id === active;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={selected ? "page" : undefined}
            className={cn(
              "inline-flex h-[43px] items-center rounded-brand-pill px-4 text-label-m font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-brand-primary/40",
              selected
                ? "bg-brand-accent text-brand-foreground"
                : "bg-brand-surface-muted text-brand-neutral-700 hover:bg-brand-neutral-100",
            )}
          >
            {tab.label.value}
          </Link>
        );
      })}
    </nav>
  );
}
