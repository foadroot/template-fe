import { placeholderCopy, verifiedCopy } from "@/lib/content/copy";
import { coursesContent, readCatalogue } from "@/features/courses";
import { readCreatorRecord } from "@/features/creators/data/creators-list.data";
import { formatCount } from "@/features/creators/lib/format";
import {
  type CreatorProfileContent,
  type CreatorSummary,
} from "@/features/creators/types/creators.types";

/**
 * The frame's own bio, including its line break after "learn together!" and the word the
 * design drops in front of "ive into my creative portfolio". Both are how the file
 * reads; the break is kept because it is what makes the paragraph four lines tall.
 */
const bio = [
  "Welcome to the creative world of [Creator's Name]. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
  "ive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
].join("\n");

const purePearlStudio: CreatorProfileContent = {
  handle: "purepearl-studio",
  name: verifiedCopy("PurePearl Studio"),
  badge: verifiedCopy("Creator"),
  tagline: verifiedCopy("Passionate UI/UX, Web designer"),
  bio: verifiedCopy(bio),
  avatarAlt: "Portrait of the PurePearl Studio team",
  stats: [
    { value: verifiedCopy("3"), label: verifiedCopy("Products") },
    { value: verifiedCopy("12"), label: verifiedCopy("Followers") },
  ],
  followLabel: verifiedCopy("Follow"),
  // The profile frame repeats the results page's toolbar verbatim — same three pills,
  // same sort control — so it is read from the one place that owns it.
  coursesToolbar: coursesContent.toolbar,
  // Six cards over two rows: the same six titles the frame repeats across its catalogue.
  courses: readCatalogue().slice(0, 6),
};

const designed: Record<string, CreatorProfileContent> = {
  [purePearlStudio.handle]: purePearlStudio,
};

/**
 * The index links all twenty roster entries to a profile, but the frame only draws one.
 * The other nineteen are built from the same roster record on the way out — the tagline
 * from the role, the bio and counts from the card — so no "View Profile" lead lands on
 * the branded 404. The frame's own fixture wins when it exists, because it carries this
 * file's design copy rather than the reference's.
 */
function derivedProfile(record: CreatorSummary): CreatorProfileContent {
  return {
    handle: record.handle,
    name: record.name,
    badge: record.badge,
    tagline: record.role,
    bio: record.bio,
    avatarAlt: record.avatar.alt,
    stats: [
      {
        value: placeholderCopy(String(record.courses)),
        label: placeholderCopy("Products"),
      },
      {
        value: placeholderCopy(formatCount(record.followers)),
        label: placeholderCopy("Followers"),
      },
    ],
    followLabel: placeholderCopy("Follow"),
    coursesToolbar: coursesContent.toolbar,
    courses: readCatalogue().slice(0, 6),
  };
}

/** Looks a creator up by handle, for the dynamic route to render or 404 on. */
export function creatorProfile(handle: string): CreatorProfileContent | null {
  const drawn = designed[handle];
  if (drawn) return drawn;

  const record = readCreatorRecord(handle);
  return record ? derivedProfile(record) : null;
}
