"use client";

import { toast } from "@/lib/toast";

/**
 * The "or" divider and the two social sign-in squares that sit between the log in form
 * and the card's cross-link — frame 49:221's `Frame 18` (node 50:362), measured at 453x141:
 *
 * - a 29px divider row: two 200px hairlines in #D1D1D1 on a 11px gap with "or" between
 *   them (Satoshi 400 at 18px, #888888);
 * - a 40px gap;
 * - two 72px squares on a 16px gap, centred in the column, radius 24, a 1px INSIDE stroke
 *   in #D1D1D1 and **no fill** — node 50:355 carries a solid paint marked invisible, so
 *   the control reads as an outline on the white card.
 *
 * The two 33px vectors inside them are unnamed in the file and their paths are empty, so
 * the glyphs cannot be read from the file: the left one (50:357) measures 33.33x33.13,
 * the right one (50:361) 32.63x33.33, which is the Google mark's near-square against the
 * Facebook mark's taller box. They are drawn here as those two marks, monochrome to the
 * frame's #000000, and flagged as inferred rather than read.
 *
 * Like everything on these screens they are presentational: clicking one reports that
 * social sign-in is not connected yet rather than pretending to authenticate.
 */
function signInWith(provider: "Facebook" | "Google") {
  toast.info(`${provider} sign-in is not connected yet`, {
    description:
      "Social sign-in needs an auth provider wired to a backend, which is a separate change.",
  });
}

export function AuthSocialButtons() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-[11px]">
        <span aria-hidden className="h-px w-[200px] bg-[#d1d1d1]" />
        <span className="text-[18px] leading-[29px] text-[#888888]">or</span>
        <span aria-hidden className="h-px w-[200px] bg-[#d1d1d1]" />
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <SocialButton
          provider="Google"
          glyph={
            <>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </>
          }
        />
        <SocialButton
          provider="Facebook"
          glyph={
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          }
        />
      </div>
    </div>
  );
}

function SocialButton({
  provider,
  glyph,
}: {
  provider: "Facebook" | "Google";
  glyph: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => signInWith(provider)}
      aria-label={`Sign in with ${provider}`}
      className="grid size-[72px] cursor-pointer place-items-center rounded-brand-panel border border-[#d1d1d1] bg-transparent outline-none transition-colors hover:bg-brand-neutral-50 focus-visible:ring-3 focus-visible:ring-brand-primary/40"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-[33.33px] fill-black"
        xmlns="http://www.w3.org/2000/svg"
      >
        {glyph}
      </svg>
    </button>
  );
}
