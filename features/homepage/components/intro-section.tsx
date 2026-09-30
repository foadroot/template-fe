import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { type IntroContent } from "@/features/homepage/types/homepage.types";
import { cn } from "@/lib/utils";

/**
 * The centred heading-and-paragraph block the homepage opens two of its sections with
 * (`12:101` above the course grid, `34:684` above the category tiles).
 *
 * The two are the same frame at different scales — 917 wide in both, a 44px heading
 * over a 44px-worded two-line block in the first and a 36px heading that fits on one
 * line in the second (`12:101` is 180 tall, `34:684` 117) — so the size is a prop rather
 * than two near-identical components.
 *
 * The distances around each frame are the design's own: 72px above both, 42px below the
 * first and 68px below the second, measured from the frames' y positions in the Home
 * frame (1298/1478 and 2648/2765 against the tabs' 1520 and the tiles' 2833).
 */
export function IntroSection({
  content,
  size = "m",
}: {
  content: IntroContent;
  size?: "m" | "s";
}) {
  return (
    <section className={cn("pt-[72px]", size === "m" ? "pb-[42px]" : "pb-[68px]")}>
      <Container>
        <Reveal
          as="div"
          className="mx-auto flex max-w-[917px] flex-col items-center gap-4 text-center"
        >
          {/* The two headings measure 588 and 792 in the design; the first box is what
              breaks its heading across two lines at 44px (11:65), and the second is wide
              enough that its 36px heading stays on one (34:685). */}
          <h2
            className={cn(
              "font-display font-semibold text-brand-foreground-ink",
              size === "m"
                ? "max-w-[588px] text-heading-s lg:text-heading-m"
                : "max-w-[917px] text-heading-xs sm:text-heading-s",
            )}
          >
            {content.headline.value}
          </h2>
          <p className="text-body-l text-brand-muted-foreground">
            {content.body.value}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
