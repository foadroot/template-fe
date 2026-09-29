import { Video } from "lucide-react";

import { cn } from "@/lib/utils";
import { type CourseLessonsContent } from "@/features/courses/types/courses.types";

/**
 * The Lessons panel of the Course Lessons frame (60:102): six module rows, the two
 * prose blocks below them and the progress card that closes the column.
 *
 * The frame runs this panel at 1156px under a 40px gap from the tabs — the same rhythm
 * the About panel uses — so the body copy keeps the frame's own 26px line height, which
 * is what lands every block on the y the design draws it at.
 */
export function CourseLessons({
  content,
  className,
}: {
  content: CourseLessonsContent;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.modulesHeading.value}
      </h2>

      <p className="max-w-[723px] text-[16px] leading-[26px] text-brand-neutral-700">
        {content.modulesIntro.value}
      </p>

      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.listHeading.value}
      </h2>

      <ul className="flex flex-col gap-6">
        {content.modules.map((module) => (
          <li key={module.label.value} className="flex items-center gap-[13px]">
            <span className="flex size-[72px] shrink-0 items-center justify-center rounded-[24px] bg-brand-accent">
              <Video
                aria-hidden
                className="size-10 shrink-0 text-brand-foreground"
              />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-label-m font-medium text-brand-foreground">
                {module.label.value}
              </span>
              <span className="text-[16px] leading-[26px] text-brand-neutral-700">
                {module.body.value}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.contentHeading.value}
      </h2>

      <p className="max-w-[723px] text-[16px] leading-[26px] text-brand-neutral-700">
        {content.contentBody.value}
      </p>

      <h2 className="font-display text-heading-xs font-semibold text-brand-foreground">
        {content.progressHeading.value}
      </h2>

      <p className="max-w-[723px] text-[16px] leading-[26px] text-brand-neutral-700">
        {content.progressBody.value}
      </p>

      <div className="flex flex-col gap-2 rounded-[16px] border border-brand-border bg-white p-[15px]">
        <span className="text-label-s font-medium text-brand-foreground">
          {content.progressLabel.value}
        </span>
        <span className="font-display text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-brand-foreground">
          {content.progressValue.value}
        </span>
        <span
          role="progressbar"
          aria-valuenow={content.progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="block h-2 w-full overflow-hidden rounded-brand-pill bg-brand-neutral-100"
        >
          <span
            className="block h-full rounded-brand-pill bg-brand-accent"
            style={{ width: `${content.progressPercent}%` }}
          />
        </span>
      </div>
    </div>
  );
}
