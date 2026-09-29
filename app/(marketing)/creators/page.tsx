import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { defaultCreatorHandle } from "@/features/creators";

/**
 * The header's Creators link lands here. The design draws a Creator Profile but no
 * creators index, so rather than send the link to the branded 404 this route forwards to
 * the one profile the file defines (tasks.md 13.4.7). Replacing it with a real index
 * means designing one first.
 */
export default function CreatorsIndexPage() {
  redirect(routes.publicRoutes.creators.profile(defaultCreatorHandle));
}
