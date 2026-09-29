import { Container } from "@/components/shared/container";
import { type LogoStripContent } from "@/features/homepage/types/homepage.types";

/**
 * The partner logo band (`1:1794`): a neutral-50 strip holding one row of muted marks.
 *
 * The frame is 1440x202 and its logo row (`1:1708`) is 1132x42, sitting 80px down — so
 * the band's padding is 80 above and below its content. The five marks are 167-170px wide
 * with a uniform 72px between them, which is the row below.
 *
 * The marks themselves are vector artwork inside the design file rather than imagery, so
 * each slot reserves the mark's measured box and carries the mark's alt text; the marks'
 * own colour is neutral-400. Dropping in the exported artwork is a `src` change.
 */
export function LogoStripSection({ content }: { content: LogoStripContent }) {
  if (content.logos.length === 0) {
    return null;
  }

  return (
    <section aria-label="Partners" className="bg-brand-surface-muted py-20">
      <Container>
        <ul className="mx-auto flex max-w-[1132px] flex-wrap items-center justify-center gap-x-[72px] gap-y-8">
          {content.logos.map((logo) => (
            <li key={logo.id}>
              <span
                role="img"
                aria-label={logo.alt}
                className="grid h-[42px] w-[168px] place-items-center rounded-brand-card bg-brand-neutral-100 text-label-xs font-medium tracking-[0.2em] text-brand-muted-foreground uppercase"
              >
                Logo
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
