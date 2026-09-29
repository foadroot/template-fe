import { type ImageRatio } from "@/components/shared/image-placeholder";
import { type Copy } from "@/lib/content/copy";

/** The icon a category tile draws. Resolved to a component in the tile itself. */
export type CategoryIconName =
  | "design"
  | "development"
  | "it"
  | "business"
  | "marketing"
  | "photography";

/**
 * The design draws two different floating stat cards in the hero, so the card carries a
 * discriminant rather than letting the renderer guess from which fields are present.
 *
 * `progress` is node 1:1797 (232x131): a 14px label, a 48px Poppins figure and an 8px
 * track. `avatars` is node 1:1821 (258x121): a 16px label, a 12px rating line with a lime
 * star, and eight 43px circles overlapping by 16px, the last of them the badge.
 */
export type HeroStatCard = {
  id: string;
  variant: "progress" | "avatars";
  label: Copy;
  /** The emphasised figure: "55%" on the progress card, "2K+" on the trailing badge. */
  value: Copy;
  /** Supporting line under the label, e.g. "4.5 (240)". */
  meta?: Copy;
  /** How full the progress track is, as a percentage. */
  progress?: number;
  /** How many portraits sit in the overlapping row, ahead of the badge. */
  avatars?: number;
};

/** The "UI/UX Design" card (node 46:126, 208x70). */
export type HeroCategoryCard = {
  id: string;
  title: Copy;
  /** The two facts under the title, drawn 8px apart around a bullet. */
  meta: Copy[];
};

export type HeroContent = {
  headline: Copy;
  subheadline: Copy;
  searchPlaceholder: string;
  searchButtonLabel: Copy;
  /** Describes the hero photograph, and the image that will replace it. */
  imageAlt: string;
  categoryCard: HeroCategoryCard;
  statCards: HeroStatCard[];
};

/** The partner logos band (`1:1794`). */
export type LogoStripContent = {
  /** One entry per logo, so the row renders exactly as many marks as the design has. */
  logos: { id: string; alt: string }[];
};

/** A centred heading-and-paragraph block with no other content (frames `12:101`, `34:684`). */
export type IntroContent = {
  headline: Copy;
  body: Copy;
};

/** The pill filter above the first course grid (`21:33`, `21:56`, `21:63`). */
export type CategoryTabsContent = {
  /** The selected pill, which is the only one wearing the accent fill, leading row one. */
  active: Copy;
  /**
   * The design draws the filter as three rows of pills rather than one wrapping list, so
   * the groups are its own — 1086, 952 and 622 wide, centred. Each row still wraps inside
   * itself on a viewport narrower than the design's 1440.
   */
  rows: Copy[][];
  /** The trailing "+ More" affordance at the end of the last row. */
  moreLabel: Copy;
};

export type CourseCardContent = {
  id: string;
  href: string;
  title: Copy;
  creator: Copy;
  /** Describes the cover photography, and the image that will replace it. */
  imageAlt: string;
  /** The three chips overlaid on the cover. */
  facts: Copy[];
  level: Copy;
  students: Copy;
  price: Copy;
  priceSuffix: Copy;
  rating: Copy;
};

export type CourseGridContent = {
  cards: CourseCardContent[];
};

/** The outlined tiles with a lime icon circle (`34:725`). */
export type CategoryTilesContent = {
  tiles: { id: string; label: Copy; icon: CategoryIconName }[];
};

export type StatItem = {
  id: string;
  value: Copy;
  label: Copy;
};

/**
 * The two-block feature showcase (`34:1159`). Each block pairs a text column with a media
 * column; `media` says which side the artwork sits on.
 *
 * The design composes each block by hand rather than from a shared rule — the two media
 * columns are different sizes (621x552 and 541x596), the columns' widths and gaps differ,
 * and every floating card is placed at its own offset — so the placement lives in the data
 * alongside the copy, measured from the frame.
 */
export type ShowcaseBlock = {
  id: string;
  media: "start" | "end";
  eyebrow?: Copy;
  headline: Copy;
  /** The headline's own measure; the design breaks its 44px headings across two lines. */
  headlineWidth: number;
  body: Copy;
  /** The body's measure: 477px in the first block, 574 in the second. */
  bodyWidth: number;
  /** Headline figures, only on the first block. */
  stats?: StatItem[];
  /** Tick-list features, only on the second block. */
  features?: Copy[];
  /** The media column's own box, and the artwork the design places inside it. */
  mediaBox: ShowcaseMediaBox;
  /** Small app cards the design floats over the media column. */
  overlayCards: ShowcaseOverlayCard[];
};

/**
 * A showcase block's media column: a fixed box holding a photograph, a masked image the
 * design draws as a lime silhouette, and the floating cards immediately below.
 */
export type ShowcaseMediaBox = {
  width: number;
  height: number;
  /** The photograph, offset inside the column. */
  image: {
    x: number;
    y: number;
    width: number;
    height: number;
    ratio: ImageRatio;
  };
  /** Describes the photograph, and the image that will replace it. */
  imageAlt: string;
  /** The 215x215 artwork the design masks into a silhouette (nodes 34:981, 34:1006). */
  ornament: { x: number; y: number; size: number; alt: string };
};

/**
 * How much weight the design gives an overlay card's figure: 48px on the progress card,
 * 24px on the two revenue cards, and the student card's 10px rating line.
 */
export type ShowcaseOverlayEmphasis = "display" | "value" | "compact";

export type ShowcaseOverlayCard = {
  id: string;
  label: Copy;
  value: Copy;
  emphasis: ShowcaseOverlayEmphasis;
  meta?: Copy;
  /** The lime pill beside a revenue figure. */
  chip?: Copy;
  /**
   * The design puts the revenue card's pill beside its figure and the narrower Year to
   * Date card's pill on its own row below it, which is 16px of the difference in height.
   */
  chipBelow?: boolean;
  /** How full the card's own 8px track is, as a percentage (the design fills 112 of 200). */
  progress?: number;
  /** How many 43px portraits the student card's row draws ahead of its badge. */
  avatars?: number;
  /** The badge that closes the student card's portrait row. */
  badge?: Copy;
  /** The revenue cards are drawn on brand blue rather than white. */
  tone?: "brand";
  /**
   * The card's hand-placed box inside the media column, in px from its top-left. The
   * design positions each card individually, so this is measured, not derived.
   */
  place: { x: number; y: number; width: number };
};

export type ShowcaseContent = {
  blocks: ShowcaseBlock[];
};

/** The blue creator band (`34:1161`). */
export type CreatorCtaContent = {
  headline: Copy;
  body: Copy;
  ctaLabel: Copy;
  ctaHref: string;
};

export type TestimonialItem = {
  id: string;
  name: Copy;
  role: Copy;
  quote: Copy;
  /** Describes the portrait, and the image that will replace it. */
  avatarAlt: string;
};

export type TestimonialsContent = {
  headline: Copy;
  body: Copy;
  items: TestimonialItem[];
};

export type HomepageContent = {
  hero: HeroContent;
  logoStrip: LogoStripContent;
  intro: IntroContent;
  categoryTabs: CategoryTabsContent;
  courseGrid: CourseGridContent;
  categoriesIntro: IntroContent;
  categoryTiles: CategoryTilesContent;
  showcase: ShowcaseContent;
  creatorCta: CreatorCtaContent;
  testimonials: TestimonialsContent;
};
