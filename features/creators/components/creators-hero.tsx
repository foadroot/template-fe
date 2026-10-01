"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";

import { Container } from "@/components/shared/container";
import {
  CREATORS_GRID_ANCHOR,
  creatorsHref,
} from "@/features/creators/lib/url";
import {
  type CreatorsHeroContent,
  type CreatorsQuery,
} from "@/features/creators/types/creators.types";
import { useDebounce } from "@/hooks/useDebounce";
import { getLenis } from "@/lib/lenis-instance";

/** How long the field waits after the last keystroke before the URL catches up. */
const SEARCH_DEBOUNCE_MS = 300;

/**
 * The index's opening band — a port of `bytespace-dointech`'s `CreatorHeroBanner`, on
 * this template's brand surface rather than the reference's photo texture: every other
 * blue band here (the nav, the auth screens, the courses hero) wears the 120px grid, and
 * a second texture on the one page the design does not draw would be the odd one out.
 *
 * The search is live rather than submit-driven. Typing updates the field immediately and
 * the URL a beat later, so the address bar always describes the grid — a share, a refresh
 * and the back button all land on the same results. `page` is dropped with every edit: a
 * new search starts at the first page of what it matches.
 *
 * The field and the URL are two states that have to be reconciled in both directions, and
 * a plain "copy the prop into state" would race: the response to the last keystroke lands
 * after the next one has been typed, and adopting it would type over the user. A ref
 * holding the last `q` this component pushed settles it — an incoming value that matches
 * it is our own echo and is ignored, so only a genuine external move (the Reset link, the
 * back button) is adopted, whether or not the field happens to hold focus.
 */
export function CreatorsHero({
  content,
  query,
}: {
  content: CreatorsHeroContent;
  query: CreatorsQuery;
}) {
  const router = useRouter();
  const [value, setValue] = useState(query.q);
  const debounced = useDebounce(value, SEARCH_DEBOUNCE_MS);
  const pushedQ = useRef(query.q);

  // Take the URL's value back when something other than this field moved it.
  useEffect(() => {
    if (pushedQ.current === query.q) return;
    pushedQ.current = query.q;
    setValue(query.q);
  }, [query.q]);

  // Push a settled value out to the URL. `query` is a fresh object on every render of the
  // route, so the guard is on the string rather than on referential equality.
  useEffect(() => {
    if (debounced === pushedQ.current) return;
    pushedQ.current = debounced;
    router.replace(creatorsHref(query, { q: debounced, page: 1 }));
  }, [debounced, query, router]);

  const scrollToGrid = () => {
    const target = document.getElementById(CREATORS_GRID_ANCHOR);
    if (!target) return;

    // Lenis owns the marketing pages' scroll (see components/shared/smooth-scroll.tsx):
    // a native smooth `scrollIntoView` would move the real position without telling
    // Lenis, so the next wheel input would animate back to its stale position and snap
    // the page. Routing through the instance keeps its tracked position honest; the
    // fallback below only covers the unmounted case.
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="overflow-hidden bg-brand-primary brand-grid py-14 sm:py-16 md:py-20 lg:py-24">
      <Container className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-neutral-50 drop-shadow-xs sm:text-4xl md:text-5xl lg:text-[52px]">
          {content.headline.value}
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-body-s leading-relaxed text-brand-on-primary/85 md:mt-4 md:text-body-m">
          {content.subcopy.value}
        </p>

        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-6 flex w-full max-w-xl items-center rounded-brand-pill bg-white p-1.5 shadow-2xl transition-all focus-within:ring-4 focus-within:ring-brand-accent/40 sm:mt-8 sm:max-w-2xl sm:p-2"
        >
          <label htmlFor="creators-search" className="sr-only">
            Search creators
          </label>

          <Search
            aria-hidden
            className="ml-4 size-5 shrink-0 text-brand-neutral-400"
          />

          <input
            id="creators-search"
            type="search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={content.searchPlaceholder}
            className="min-w-0 flex-1 border-0 bg-transparent px-3 py-1.5 text-body-s text-brand-foreground outline-none placeholder:text-brand-neutral-400 focus-visible:ring-0 sm:text-body-m"
          />

          <button
            type="button"
            onClick={scrollToGrid}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-brand-pill bg-brand-accent px-4 py-2 text-label-xs font-bold text-brand-on-accent shadow-xs transition-colors select-none hover:bg-brand-accent-hover focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none sm:px-6 sm:py-2.5 sm:text-label-s"
          >
            {content.searchButtonLabel.value}
            <ChevronDown aria-hidden className="size-3.5" />
          </button>
        </form>
      </Container>
    </section>
  );
}
