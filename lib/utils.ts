import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-lg",
            "display-md",
            "display-script-lg",
            "display-script-md",
            // Brand type scale, registered in app/globals.css from the design's
            // Typography style guide. Listed here so a later `text-*` class correctly
            // overrides an earlier one instead of both being emitted.
            "heading-l",
            "heading-m",
            "heading-s",
            "heading-xs",
            "body-l",
            "body-m",
            "body-s",
            "body-xs",
            "label-l",
            "label-m",
            "label-s",
            "label-xs",
          ],
        },
      ],
      // Brand radii, registered in app/globals.css from the design's radius scale.
      // Without them `cn(buttonVariants(), brandButton.accent)` kept the primitive's
      // `rounded-sm` alongside `rounded-brand-pill` and the CTAs rendered as rounded
      // rectangles instead of the design's pills.
      rounded: [
        {
          rounded: ["brand-card", "brand-panel", "brand-pill"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
