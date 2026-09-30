import type { ReactNode } from "react";
import Link from "next/link";
import { Filter, LayoutGrid, SignalHigh } from "lucide-react";

import { Container } from "@/components/shared/container";
import { coursesHref } from "@/features/courses/lib/url";
import {
  type CoursesQuery,
  type CoursesToolbarContent,
  type FilterIconName,
} from "@/features/courses/types/courses.types";
import { cn } from "@/lib/utils";

/** Material's `filter_alt`, `signal_cellular_alt` and `category`. */
const icons: Record<FilterIconName, typeof Filter> = {
  filter: Filter,
  level: SignalHigh,
  category: LayoutGrid,
};

/**
 * Material's `sort` glyph — three bars 18x12px into the 24px box, matching the design's
 * own vector (the frame draws it at instance +3,+6). Lucide's nearest neighbour adds an
 * arrow the design does not have, so the path is carried here instead.
 */
function SortIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
    </svg>
  );
}

const pillClass =
  "inline-flex h-12 items-center gap-1 rounded-brand-pill border border-brand-border bg-white px-4 text-label-m font-medium text-brand-neutral-700 outline-none transition-all duration-200 hover:-translate-y-0.5 active:scale-95 hover:bg-brand-surface-muted focus-visible:ring-3 focus-visible:ring-brand-primary/40";

const activePillClass = "border-brand-primary text-brand-primary";

/**
 * A pill that opens a list of options on click. The frame draws no open state, so the
 * summary keeps the pill's exact closed shape — icon and label, nothing added — and the
 * options appear underneath it. Written on `<details>` so it works without script.
 */
function MenuPill({
  summary,
  active,
  children,
}: {
  summary: ReactNode;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <details className="group relative">
      <summary
        className={cn(
          pillClass,
          "cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden",
          active && activePillClass,
        )}
      >
        {summary}
      </summary>
      {/* `menu-pop` is keyed off `details[open]` in globals.css, so the list drops in
          from under the pill on every open — the rule stops matching the moment the
          details closes, which is what makes it replay rather than run once. */}
      <ul className="menu-pop absolute top-full left-0 z-30 mt-2 w-48 rounded-2xl border border-brand-border bg-white p-2 shadow-[var(--shadow-brand-card)]">
        {children}
      </ul>
    </details>
  );
}

const optionClass =
  "block rounded-brand-pill px-3 py-2 text-label-m font-medium text-brand-neutral-700 outline-none transition-colors hover:bg-brand-surface-muted focus-visible:ring-3 focus-visible:ring-brand-primary/40";

/**
 * The results toolbar (frame 55:117, y=432): three outlined 48px pills on the left of
 * the content column and the sort control flush right, 72px under the hero band.
 *
 * Every control reads the current query and rebuilds the URL from it, so setting one
 * filter never drops the one set before it, and every change sends you back to page 1.
 * `activeIds` marks the pills the current query has switched on.
 *
 * The Creator Profile (60:1878) repeats the row 62px under its own blue band rather than
 * 72px, so the offset is overridable instead of being rewritten per page.
 */
export function CoursesToolbar({
  content,
  query,
  activeIds,
  className,
}: {
  content: CoursesToolbarContent;
  query: CoursesQuery;
  activeIds: FilterIconName[];
  className?: string;
}) {
  const activeSort = content.sorts.find((sort) => sort.id === query.sort);

  return (
    <section aria-label="Filters" className={cn("pt-18", className)}>
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap items-center gap-4">
          {content.filters.map((filter) => {
            const Icon = icons[filter.icon];
            const isActive = activeIds.includes(filter.id);

            const label = (
              <>
                <Icon aria-hidden className="size-6 text-brand-neutral-950" />
                {filter.label.value}
              </>
            );

            if (filter.id === "level") {
              return (
                <li key={filter.id}>
                  <MenuPill summary={label} active={isActive}>
                    <li>
                      <Linkish
                        href={coursesHref(query, { level: null, page: 1 })}
                        active={query.level === null}
                      >
                        Any level
                      </Linkish>
                    </li>
                    {content.levels.map((level) => (
                      <li key={level.slug}>
                        <Linkish
                          href={coursesHref(query, {
                            level:
                              query.level === level.slug ? null : level.slug,
                            page: 1,
                          })}
                          active={query.level === level.slug}
                        >
                          {level.label.value}
                        </Linkish>
                      </li>
                    ))}
                  </MenuPill>
                </li>
              );
            }

            const href =
              filter.id === "filter"
                ? coursesHref(query, { featured: !query.featured, page: 1 })
                : "#categories";

            return (
              <li key={filter.id}>
                {/* Remounted when the filter's own state flips, so the pill that just
                    came on pops the way the category row's does. */}
                <Link
                  key={String(isActive)}
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    pillClass,
                    isActive && "animate-pop",
                    isActive && activePillClass,
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <MenuPill
          active={query.sort !== "relevant"}
          summary={
            <>
              <SortIcon className="size-6 text-brand-neutral-950" />
              {activeSort?.label.value}
            </>
          }
        >
          {content.sorts.map((sort) => (
            <li key={sort.id}>
              <Linkish
                href={coursesHref(query, { sort: sort.id, page: 1 })}
                active={query.sort === sort.id}
              >
                {sort.label.value}
              </Linkish>
            </li>
          ))}
        </MenuPill>
      </Container>
    </section>
  );
}

/**
 * An option inside a menu pill. A plain anchor keeps the whole toolbar on full page
 * loads, the way the frame's own controls are links rather than toggles.
 */
function Linkish({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        optionClass,
        active && "bg-brand-surface-muted text-brand-primary",
      )}
    >
      {children}
    </Link>
  );
}
