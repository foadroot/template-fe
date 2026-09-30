"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Check, Plus, Star, Users } from "lucide-react";

import { routes } from "@/config/routes";
import { formatCount } from "@/features/creators/lib/format";
import { type CreatorSummary } from "@/features/creators/types/creators.types";
import { cn } from "@/lib/utils";

/**
 * The reference's own fallback portrait, used when a roster image 404s rather than
 * dropping the cover out of the card.
 */
const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

/**
 * One creator on the index grid — a port of `bytespace-dointech`'s `CreatorCard`.
 *
 * The cover is a real photograph rather than the `ImagePlaceholder` every other card in
 * this template draws: the reference's roster is what the index ships, and its portraits
 * are the point of a discovery page. The overlay pills sit over the cover behind a
 * `pointer-events-none` so they never steal the click from it, and the badge stays legible
 * on any portrait because it is a solid lime chip.
 *
 * The cover, the name and "View Profile" all lead to the same profile, so the cover and
 * the footer pill are removed from the tab order and the name carries the destination —
 * one tab stop for the card, the same reasoning the course card documents, plus the
 * reference's Follow control as the only other stop.
 */
export function CreatorCard({ creator }: { creator: CreatorSummary }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(creator.followers);
  const [imageFailed, setImageFailed] = useState(false);

  const href = routes.publicRoutes.creators.profile(creator.handle);

  const toggleFollow = () => {
    setFollowers((count) => count + (isFollowing ? -1 : 1));
    setIsFollowing((was) => !was);
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-[32px] border border-brand-border-soft bg-brand-card p-5 shadow-xs transition-all duration-300 hover:border-brand-border hover:shadow-[var(--shadow-brand-card)] sm:p-6">
      <div className="relative aspect-[1.48/1] w-full overflow-hidden rounded-[22px] bg-brand-surface-muted">
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block h-full w-full"
        >
          <Image
            src={imageFailed ? FALLBACK_AVATAR : creator.avatar.src}
            alt={creator.avatar.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        </Link>

        <span className="pointer-events-none absolute top-3 right-3 z-10 inline-flex items-center rounded-brand-pill bg-brand-accent px-3 py-1 text-label-xs font-bold text-brand-on-accent shadow-xs">
          {creator.badge.value}
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-1.5 p-3 sm:p-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-brand-pill border border-white/50 bg-white/85 px-3 py-1.5 text-label-xs font-medium whitespace-nowrap text-brand-foreground shadow-xs backdrop-blur-md sm:px-3.5 sm:text-[13px]">
            <Users aria-hidden className="size-3.5 text-brand-primary" />
            {formatCount(followers)} Followers
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-brand-pill border border-white/50 bg-white/85 px-3 py-1.5 text-label-xs font-medium whitespace-nowrap text-brand-foreground shadow-xs backdrop-blur-md sm:px-3.5 sm:text-[13px]">
            <BookOpen aria-hidden className="size-3.5 text-brand-primary" />
            {creator.courses} Courses
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-1 font-display text-heading-xs font-semibold tracking-tight text-brand-foreground transition-colors group-hover:text-brand-primary">
            <Link
              href={href}
              className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/40"
            >
              {creator.name.value}
            </Link>
          </h3>

          <p className="flex shrink-0 items-center gap-1.5 text-body-l font-normal text-brand-neutral-600">
            {creator.rating.toFixed(1)}
            <Star
              aria-hidden
              className="size-5 fill-amber-400 text-amber-400"
            />
          </p>
        </div>

        <p className="mt-1 text-body-s font-semibold text-brand-primary">
          {creator.username}
        </p>

        <p className="mt-2 mb-4 line-clamp-2 text-body-s text-brand-neutral-500">
          {creator.shortBio.value}
        </p>

        <span className="mb-5 inline-flex w-fit rounded-brand-pill bg-brand-chip px-3.5 py-1.5 text-label-xs font-medium text-brand-foreground">
          {creator.categoryLabel.value}
        </span>

        <div className="mt-auto flex items-center gap-2.5 border-t border-brand-border-soft pt-4">
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className="flex-1 rounded-brand-pill border border-brand-border-soft px-4 py-2.5 text-center text-label-xs font-semibold text-brand-foreground transition-colors hover:bg-brand-surface-muted sm:text-label-s"
          >
            View Profile
          </Link>

          <button
            type="button"
            onClick={toggleFollow}
            aria-pressed={isFollowing}
            className={cn(
              "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-brand-pill px-5 py-2.5 text-label-xs font-bold shadow-xs transition-all select-none sm:text-label-s",
              isFollowing
                ? "bg-brand-foreground text-white hover:bg-brand-neutral-900"
                : "bg-brand-accent text-brand-on-accent hover:bg-brand-accent-hover",
            )}
          >
            {isFollowing ? (
              <>
                <Check aria-hidden className="size-3.5" />
                <span>Following</span>
              </>
            ) : (
              <>
                <Plus aria-hidden className="size-3.5" />
                <span>Follow</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
