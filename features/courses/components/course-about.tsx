import { CheckCircle2 } from "lucide-react";

import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { cn } from "@/lib/utils";
import { courseGalleryImages } from "@/features/courses/data/course-assets";
import { type CourseAboutContent } from "@/features/courses/types/courses.types";

/** Four 167×125 thumbnails in a row, evenly spread across the 725px panel. */
const gallerySlots = [0, 1, 2, 3];

/**
 * The About panel of the Course Details frame (55:4066): description, the sneak-peak
 * strip and the eight key points, in one 24px-spaced column under the tabs.
 *
 * The panel's own line height is 26px for the 16px body face — two pixels above the
 * scale — so the description lands on the 416px box the frame gives it rather than
 * dragging everything below it upward.
 */
export function CourseAbout({
  content,
  className,
}: {
  content: CourseAboutContent;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.descriptionHeading.value}
      </h2>

      <p className="max-w-[723px] text-[16px] leading-[26px] whitespace-pre-line text-brand-neutral-700">
        {content.description.value}
      </p>

      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.galleryHeading.value}
      </h2>

      <div className="grid grid-cols-4 gap-[19px]">
        {gallerySlots.map((slot) => (
          <ImagePlaceholder
            key={slot}
            src={courseGalleryImages[slot]}
            ratio="4/3"
            rounded="rounded-2xl"
            alt={`${content.galleryHeading.value} ${slot + 1}`}
            sizes="10.5rem"
          />
        ))}
      </div>

      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.keyPointsHeading.value}
      </h2>

      <ul className="flex flex-col gap-3">
        {content.keyPoints.map((point) => (
          <li key={point.value} className="flex items-start gap-2">
            <CheckCircle2
              aria-hidden
              className="size-6 shrink-0 text-brand-primary"
            />
            <span className="text-[16px] leading-[26px] text-brand-neutral-700">
              {point.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
