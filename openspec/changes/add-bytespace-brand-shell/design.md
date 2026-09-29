## Context

See `proposal.md` — Why for motivation. Constraints that shape the approach:

- **Two different products in one app.** The existing code is a dashboard starter: a root
  layout whose `<body>` is `flex h-full flex-col overflow-hidden`, a `Header`/`Sidebar`
  pair in `components/layout/`, and a `(protected)/panel` route group. The ByteSpace site
  is a scrolling public marketing site. Both must live in the same Next.js app.
- **Tailwind v4 is CSS-first.** There is no `tailwind.config.js`; tokens are declared in
  `app/globals.css` in `:root` and mapped to utility namespaces via `@theme inline`. The
  file already has a "Brand extensions" block (`--color-primary-hover`,
  `--color-primary-border`, …) showing the established pattern for adding roles.
- **shadcn is configured** through `components.json` with style `base-nova`, icon library
  `lucide`, `cssVariables: true`, and no prefix. At the start of this change only `button`,
  `loading-spinner`, and `sonner` exist in `components/ui/`; this change adds `card`,
  `badge`, `input`, and `label` through the CLI (see D10).
- **`features/` did not exist**, although `README.md` documents the feature module pattern
  (`index.ts` barrel, `actions.ts`, `queries.ts`, `components/`, `types/`, `data/`). This
  change creates the first five modules and therefore sets the precedent every later
  feature follows.
- **The design source is unreadable at spec fidelity.** Only a 1280px canvas render is
  available; see proposal.md — Design-source limitation.

## Goals / Non-Goals

**Goals:**

- Brand values declared once and consumed by role, so reconciliation is a small edit.
- A public shell that scrolls normally, selectable per route, without regressing the
  dashboard shell.
- Every page in the design built on one shared theme and shell: homepage, service page,
  Knowledge Hub index and article detail, FAQ, the two account screens, and the 404.
- Page composition driven by typed content data, so the provisional composition and copy
  can be corrected by editing data and section order rather than markup.
- Establish the `features/` module shape that every later feature follows.

**Non-Goals (design-level):**

- No dark-mode support. The design shows a light marketing site; the existing `@custom-variant
dark` layer is left untouched but no dark brand roles are authored.
- No data layer, caching, or `lib/apiClient/` wiring — content is local fixtures only.
- No animation/motion system. The design's decorative shapes are static treatments.
- No responsive breakpoint inventions beyond the design's own layout behaviour.

## Decisions

### D1. Brand tokens are additive; existing dashboard tokens are not redefined

Add brand roles as new custom properties in `:root` and new mappings in `@theme inline`,
in the existing "Brand extensions" block, leaving `--primary: #6e62ff` and every other
dashboard token untouched.

- _Why_: the brand primary and accent are needed by public pages only. Redefining
  `--primary` would recolour `components/ui/button.tsx`, the panel, and the sidebar, and
  would make the "dashboard styling is preserved" requirement unachievable.
- _Alternatives considered_: (a) redefine `--primary` to brand blue and give the dashboard
  its own token — rejected, it inverts the blast radius onto the surface that has no
  design to validate against; (b) scope brand tokens to a `.marketing` class — rejected,
  it makes brand utilities unavailable to any future public surface without opting in.
- _Consequence_: two primary-ish roles coexist. Naming must make the audience obvious
  (brand roles name the marketing surface; existing roles stay as they are).

### D2. Public shell is selected by a route group, not by runtime pathname checks

Create `app/(marketing)/layout.tsx` holding the marketing nav and footer, with the
homepage at `app/(marketing)/page.tsx`. The dashboard keeps its own layout.

- _Why_: App Router route groups select a layout at build time. Public pages then never
  ship the dashboard shell's markup or client JS, and vice versa.
- _Alternatives considered_: (a) one root layout that branches on the pathname — rejected,
  it forces a client boundary or a second render pass and ships both shells; (b) each page
  composing nav and footer itself — rejected, duplication and no single place to enforce
  landmark structure.
- _Consequence_: the marketing homepage and the starter's `app/page.tsx` cannot both own
  `/`. The starter page is replaced by the ByteSpace homepage.

### D3. The root layout becomes shell-neutral; the app-shell constraint moves into the dashboard layout

`app/layout.tsx` keeps `<html>`, fonts, providers, and the toaster, but the
`overflow-hidden` fixed-height behaviour moves into `app/(protected)/panel/layout.tsx`
(and/or the dashboard layout that consumes `Header`/`Sidebar`), so public pages can scroll.

- _Why_: a single root-level `overflow-hidden` is incompatible with a scrolling marketing
  site, and the marketing shell must not have to fight it with nested scroll containers.
- _Alternatives considered_: (a) leave the root as-is and give marketing pages their own
  `overflow-y-auto` inner container — rejected, it duplicates the scrolling model and
  reintroduces the fixed-viewport feel the design does not have; (b) move `Header`/`Sidebar`
  out of the panel group — rejected as unrelated churn.
- _Consequence_: this is the highest-regression-risk edit in the change. Every protected
  route must be visually checked after it.

### D4. Homepage is a Server Component tree; interactivity is a single client island

The page and all section components render on the server. Only the compact/mobile
navigation menu is a client component.

- _Why_: the homepage is static content; keeping it server-rendered avoids shipping
  framework JS for markup and matches the existing RSC-first style (`rsc: true`).
- _Alternatives considered_: (a) mark sections client components to ease future motion —
  rejected, premature; (b) use a headless menu library — rejected, one toggle does not
  justify a dependency.
- _Consequence_: any future interactive section must introduce its own client island
  rather than making the page client.

### D5. New UI primitives come from the shadcn CLI, not hand-written

Add the primitives the design's surfaces need (expected: `card`, `badge`, and a
menu/popover for the compact nav) by running the shadcn CLI against the existing
`components.json`, rather than writing them by hand.

- _Why_: `components.json` pins style `base-nova`, `cssVariables: true`, and lucide icons.
  CLI-generated components match that configuration and the `@base-ui/react` primitives
  already in the dependency tree; hand-written ones drift from the project convention.
- _Alternatives considered_: hand-writing Card/Badge as plain divs with Tailwind classes —
  rejected, it bypasses the project's component convention and the accessibility behaviour
  the base components already provide.
- _Consequence_: adds files under `components/ui/` and possibly imports from
  `@base-ui/react`; no new package is expected since it is already a dependency. If the
  CLI proposes a new package, that must be surfaced before installing.

### D6. Content is typed fixture data inside a feature module

Introduce `features/homepage/` with `index.ts` (barrel), `types/`, `data/`, and
`components/`, holding the homepage's content and its section components; the route file
imports only from the barrel.

- _Why_: `README.md` documents this shape as the project convention and `features/` does
  not exist yet, so this change defines it. Keeping content in `data/` satisfies the
  requirements that items come from typed data and that empty data renders nothing.
- _Alternatives considered_: (a) content constants colocated in `app/(marketing)/page.tsx` —
  rejected, it puts copy in a route file and no type boundary; (b) a top-level `content/`
  directory — rejected as a second convention competing with the documented one.
- _Consequence_: later increments must follow this shape, and content authors edit `data/`
  rather than markup. Every string that is not verified design copy is marked as
  placeholder (a `TODO(design)` style marker or a `placeholder: true` flag) so the
  homepage's unverified-copy requirement is checkable.

### D7. Missing imagery renders a sized placeholder component, not fake asset files

Add a small shared placeholder component used wherever a design asset is unavailable,
reserving the intended aspect ratio and offering optional alt text. Real assets, once
supplied, render through `next/image` in the same slot.

- _Why_: the design's photography and decorative artwork are not in the repository, and the
  requirements call for placeholders that do not shift layout when replaced.
- _Alternatives considered_: (a) commit grey stub JPEGs to `public/` — rejected, they look
  like real assets, get referenced by path, and are easy to forget to replace; (b) leave
  empty divs — rejected, they carry no aspect-ratio contract and no alt-text slot.
- _Consequence_: the visual result is intentionally incomplete until assets land; this is
  recorded as an open question rather than hidden.

### D8. Reserved routes are declared centrally now, and unimplemented ones 404 by design

Add the public route entries for the design's pages — home plus the account entry points
whose screens are deferred — to `config/routes.ts`, with nav and footer links reading from
that object.

- _Why_: the requirement is that links resolve to centrally declared routes, and the design
  shows account entry points in the navigation. Declaring them keeps the nav faithful and
  makes the later auth change a matter of adding pages, not rewiring links.
- _Alternatives considered_: (a) omit the account CTAs until auth exists — rejected, it
  visibly contradicts the design; (b) point the CTAs at the homepage — rejected, it hides a
  gap instead of surfacing it.
- _Consequence_: activating an account CTA lands on the branded not-found view until the
  auth change lands. This is the behaviour the shell spec requires.

### D9. Keep the existing fonts; expose a heading role so the display face can be swapped later

Leave the `next/font` setup (Geist / Geist Mono) unchanged and map marketing headings to the
existing `--font-heading` role.

- _Why_: the design's typeface cannot be identified at the available resolution. Adding a
  display font now would be a guess plus a dependency; the requirements only demand internal
  consistency across sections.
- _Alternatives considered_: pick a geometric sans now (adds a dependency on an unverified
  choice); re-set `--font-sans` globally (would leak into the dashboard and break D1's
  isolation).
- _Consequence_: the site will not match the design's typeface until reconciliation; the
  swap is a one-line change to the heading role.

### D10. The shadcn registry's `cn` package is rejected; its imports are rewritten

Running the shadcn CLI to add `card`, `badge`, `input`, and `label` also added an npm
package named `cn` and emitted `import { cn } from "cn"` in every generated file. Those
imports are rewritten to the project's own `@/lib/utils`, and the `cn` dependency is
removed from `package.json` and the lockfile.

- _Why_: every existing component in this project imports `cn` from `@/lib/utils`, and the
  project's `cn` is not a plain clsx wrapper — it extends tailwind-merge with the display
  type classes. Two `cn` helpers with different merge behaviour would resolve conflicting
  utilities inconsistently, and the extra package is an undeclared dependency for behaviour
  the project already owns.
- _Alternatives considered_: (a) keep the package — rejected, it duplicates an existing
  utility and diverges from the codebase's convention; (b) hand-write all four primitives —
  rejected, the CLI's output otherwise matches the pinned `base-nova` style and the
  `@base-ui/react` primitives already in the tree.
- _Consequence_: the generated files carry a one-line deviation from the registry.
  Re-running the CLI will re-introduce it, so the rewrite must be repeated whenever a
  primitive is added.

### D11. The compact nav menu is hand-written, not a registry sheet

The mobile navigation is a small client component using a button plus a panel, rather than
`sheet` from the registry.

- _Why_: adding `sheet` would overwrite the project's customised
  `components/ui/button.tsx`, which carries the project's variant and size definitions.
  Nothing in the design justifies losing that customisation for a slide-over panel.
- _Alternatives considered_: (a) accept the overwrite and restore `button.tsx` by hand —
  rejected, fragile and easy to get subtly wrong; (b) a native popover — rejected, it adds
  behaviour and styling surface the design does not need.
- _Consequence_: the menu's only behaviours are open/close, Escape to close, and click-to-
  navigate. Every item is a link, so keyboard operation comes from the platform rather than
  from focus-management code.

### D12. The FAQ uses native disclosure elements instead of an accordion primitive

The FAQ renders `details`/`summary` rather than a JavaScript accordion component.

- _Why_: the answer text must be present in the delivered page and expandable with
  JavaScript unavailable. Native disclosure gives keyboard operation, announced expanded
  state, and in-page find support for free, with no dependency, and keeps the page a Server
  Component.
- _Alternatives considered_: (a) a registry accordion — rejected, it needs a new primitive
  plus client JavaScript to achieve less; (b) a hand-rolled controlled accordion — rejected,
  it re-implements platform behaviour and breaks find-in-page for collapsed answers.
- _Consequence_: the accordion is not styled through the project's component layer; its look
  comes from utilities on the elements themselves.

### D13. Article listing pages are server-rendered from the URL

The Knowledge Hub reads its page number from the query string and slices the fixture list on
  the server. Pagination renders as links.

- _Why_: each page becomes a real, shareable, reloadable URL that works without JavaScript,
  and the listing needs no client state. Requesting a page beyond the last clamps to the last
  page rather than rendering an empty grid.
- _Alternatives considered_: (a) client-side paging over the whole list — rejected, it ships
  every article to the browser and produces URLs a visitor cannot share or reload; (b) a
  dynamic API-backed listing — rejected, there is no backend in this change.
- _Consequence_: the index route is dynamic rather than static because it reads a query
  parameter; the article pages themselves are pre-rendered from their known slugs.

### D14. Missing imagery is a sized placeholder that swaps in place

A shared placeholder component renders in every image slot. It always applies the same
aspect-ratio container and varies only the element inside it; supplying a real asset renders
`next/image` with `fill` into that identical container.

- _Why_: the design's photography and artwork are not in the repository. Because the aspect
  box is what reserves space and it is present either way, handing over an asset is a `src`
  change with no markup or layout edit. The placeholder also carries the asset's intended
  alt text, so no slot is an unlabelled image.
- _Alternatives considered_: (a) grey stub files in `public/` — rejected, they look like real
  assets and are easy to forget to replace; (b) bare empty divs — rejected, no aspect-ratio
  contract and nowhere to put alt text.
- _Consequence_: the first render is visibly imagery-free, which is honest about what is
  still missing. Asset sourcing is tracked as an open question.

### D15. Copy carries its own provenance

Page copy is stored as a `{ value, placeholder }` pair through a shared `lib/content/copy`
helper, and every string written to fill a gap in the design source is constructed through
`placeholderCopy(...)`.

- _Why_: the design's body text cannot be read at the available resolution, so almost every
  string in the fixtures is invented. Tagging at the string level makes the invented ones
  findable in review and mechanical to reconcile — replace the string and flip the flag —
  instead of leaving real copy and guessed copy indistinguishable.
- _Alternatives considered_: (a) plain strings with a section-level "is provisional" flag —
  rejected, it cannot express a section that is partly verified; (b) a separate TODO list —
  rejected, it drifts from the data it describes.
- _Consequence_: content data is slightly noisier to read, and reconciliation is a per-string
  edit rather than a single swap.

### D16. The auth screens validate for real and explicitly stop short of a session

The sign up and log in screens run schema validation through the project's existing form
stack and, on an otherwise valid submission, show feedback stating that account creation or
sign in is not yet connected.

- _Why_: the design shows working-looking forms. Validation makes them honest about input
  errors, and the explicit message stops a visitor believing they hold an account or a
  session when they hold neither.
- _Alternatives considered_: (a) fake a signed-in state — rejected, it is a lie the rest of
  the app cannot support; (b) disable the submit control — rejected, it prevents exercising
  validation and reads as a broken screen.
- _Consequence_: the screens are visibly incomplete by design. Wiring them up is a later
  change that adds a backend and a session.

## Risks / Trade-offs

- **[Design values are sampled, not read]** The palette, radii, and type scale are guesses
  from a 1280px render → every provisional value is centralised in one token block and
  marked, with a reconciliation task; nothing downstream embeds raw values.
- **[Root layout change regresses the dashboard]** Moving `overflow-hidden` off `<body>` can
  break the panel's fixed-shell behaviour → the constraint is relocated rather than deleted,
  and the tasks require checking protected routes and a production build, not just the
  homepage.
- **[Homepage replaces the starter page at `/`]** The starter's marketing page and its
  "Dashboard" link are removed from `/` → deliberate; the panel remains reachable and D3's
  verification covers it. Reverting this change restores the starter page.
- **[Registry re-adds its `cn` package]** Re-running the shadcn CLI will re-introduce the
  `cn` dependency and its imports (D10) → the rewrite is documented here and in the task
  list, and a future primitive addition must repeat it.
- **[The `sheet` overwrite trap]** Adding further registry components can silently overwrite
  customised files such as `button.tsx` → registry adds are always previewed with
  `shadcn add --dry-run` first, which is how the `sheet` overwrite was caught (D11).
- **[Invented copy ships as real copy]** Nearly every string is placeholder (D15), and the
  pages read as complete → every string is constructed through `placeholderCopy(...)`, so
  the unverified set is enumerable by grep rather than by memory, and reconciliation is
  tracked as a task.
- **[Account screens look functional]** Validation succeeds and the form accepts input, so
  a visitor may assume an account exists → the success feedback states plainly that account
  creation is not connected, and no session is ever created (D16).
- **[Pre-existing type error]** `panelHomeFor` had an unreachable `case "employee"`, so the
  project did not type-check and the production build failed before this change → the
  unreachable case is removed with no behaviour change, because the build verification this
  change depends on could not pass otherwise.
- **[Two primitives for "primary" colour invite misuse]** `--primary` (dashboard) and the
  brand primary both exist → brand roles are named for the marketing surface and D1's
  verification checks protected routes are unchanged.
- **[Feature-module precedent]** The first `features/` usage sets expectations for later
  increments → the module ships with the full documented shape (barrel, types, data,
  components) even where parts are thin, so later work extends rather than reshapes it.
- **[Placeholder-heavy first render]** Most imagery is a placeholder → placeholders are
  aspect-ratio-correct so dropping in real assets changes no layout, and asset sourcing is
  tracked as an open question.

## Migration Plan

No data or schema migration. Deployment is a normal Next.js build; the change adds routes
and tokens and replaces `/`.

- **Before/after check**: capture the protected panel's current rendering, then re-verify it
  after D3's root-layout change; this is the only step with a real regression surface.
- **Rollback**: revert the change; it introduces no persistent state, so rollback is a code
  revert. The starter homepage returns with it.
- **Ordering**: tokens (D1) and the shell (D2, D3) land before any page work, so the
  dashboard regression check happens before page work compounds on top of it. Pages then
  follow the shared theme and shell rather than each inventing one.

## Open Questions

- **Authoritative design values** — the exact palette, radii, type scale, and spacing. Needs
  a Figma token in `.tokens/figma` or an exported spec; deferrable because all values are
  centralised in the token block and marked provisional.
- **Asset sourcing** — where the design's photography, portraits, partner logos, and
  decorative SVG shapes come from, and whether they are exported from Figma or supplied
  separately. Deferrable: placeholders are aspect-ratio-correct.
- **Composition confirmation** — whether the frames that look like a light-background
  homepage variant are a second homepage or sections of the same page. Deferrable: it
  changes section data and order, which the composition requirement already treats as
  provisional, and does not alter the approach or task breakdown.
- **Search entry point** — the design's nav appears to include a search control. It is
  currently an entry point to the Knowledge Hub rather than a query. Deferrable: replacing
  it with real search touches one link and does not alter the approach.
- **Typeface identity** — the display face cannot be determined at this resolution;
  deferrable per D9, since headings resolve through a single role.
- **Social link handles** — the footer's social destinations are invented placeholders, as
  the design's own handles are unreadable. Deferrable: they live in one exported list.
- **Article content source** — whether article bodies stay as fixtures or are authored
  elsewhere. Deferrable: the listing and detail views read through one data module, so a
  swap is contained.
- **Dashboard chrome branding** — `Header`/`Sidebar` still show the starter's branding. Left
  untouched deliberately, so the panel stays byte-identical. Deferrable: it is a separate
  surface with its own decisions.
- **Composition and pricing confirmation** — the service page's offering list, inclusions
  table, and indicative prices are inferred from a low-resolution render; the design may
  present these differently. Deferrable: all of it lives in fixture data.
