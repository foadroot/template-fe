> **SUPERSEDED BY READ ACCESS TO THE DESIGN FILE.**
>
> Groups 5 and 7–10 below were built from a low-resolution canvas render and describe the
> **wrong product**. With a Figma token in `.tokens/figma`, the file's real frames were read
> and the change was corrected:
>
> | Read from the file | Was built |
> | --- | --- |
> | Home, Search Page, Course Details, Course Lessons, Course Reviews, Creator Profile, Register, Login, 404 | Home, "Laptop repair", "Knowledge Hub", FAQ, sign up, log in, 404 |
>
> It is a **course platform**, not a laptop-repair site. There is no Knowledge Hub, no FAQ
> and no services page in the design. The theme was also wrong: the real design system is
> the Electric Violet ramp (`#003be2` brand surface), the chartreuse ramp (`#d4fb20`
> buttons, `#cbfc01` fills), the Neutral ramp, **Poppins** headings with **Satoshi** body
> text, and a 12-column grid with 120px margins.
>
> **Done in the correction pass:** the theme now reads from the file's style guide (all
> three ramps, the full heading/body/label type scale, grid utility); the shell was rebuilt
> (blue header with the real exported logo, Home/Courses/Creators, Sign In/Join Us, cart;
> white footer with newsletter and three link columns); the homepage hero was rebuilt from
> the design's own copy (search-led, lime circle, floating cards); the wrong pages and
> feature modules were deleted; routes now match the design's frames.
>
> **Still to build** — the remaining frames: Search Page, Course Details, Course Lessons,
> Course Reviews, Creator Profile, the homepage's ten further sections (partner logos,
> featured categories, course grids, CTA, testimonials), a creators index (the design has
> a profile frame but no index), and the footer's placeholder destinations (About, Contact,
> Help, legal), which currently land on the branded 404.
>
> Groups 12 below is the *first-pass* mismatch analysis, kept only as a record.
> **Group 13 is the current state.**

## 1. Brand token layer

- [x] 1.1 Add brand colour roles to `:root` in `app/globals.css`: brand primary, brand accent, accent wash, text on brand surface, text on accent, plus marketing surface/border roles. Do not modify any existing token.
- [x] 1.2 Add marketing radius roles (card/panel and a full pill) as new custom properties, leaving the existing dashboard `--radius` scale intact.
- [x] 1.3 Map every new role in the `@theme inline` block under the existing "Brand extensions" section so it is usable as a utility, following the pattern already used for `--color-primary-hover`.
- [x] 1.4 Point the heading font role at the existing font variable so marketing headings have one swappable treatment; do not change `--font-sans` or add a font dependency.
- [x] 1.5 Add a comment block listing every value that is provisional, why (sampled from a low-resolution render), and what is needed to verify it (Figma access via `.tokens/figma`).
- [x] 1.6 Re-read the diff of `app/globals.css` and confirm no pre-existing token value changed. (Verified: 85 insertions, 0 deletions.)

## 2. Route configuration and layout separation

- [x] 2.1 Capture the current rendering of a protected panel route and the current starter homepage as the before-state for regression comparison. (No protected page existed, so a temporary scratch page was used to make the panel renderable, then deleted.)
- [x] 2.2 Move the fixed-height, non-scrolling app-shell constraint off `<body>` in `app/layout.tsx` and into `app/(protected)/panel/layout.tsx`, so the root layout is shell-neutral.
- [x] 2.3 Update `app/layout.tsx` metadata from the starter branding to ByteSpace (title default/template, description, application name), keeping the font setup, providers, and toaster as they are.
- [x] 2.4 Create `app/(marketing)/layout.tsx` rendering the marketing nav above and footer below the page content, on a normally scrolling page.
- [x] 2.5 Add the public route entries to `config/routes.ts` in `publicRoutes`: home, the design's content pages, and the account screens.
- [x] 2.6 Verify the protected panel still renders as captured in 2.1 after the constraint move, and that `Header`/`Sidebar` behaviour is unchanged. (Verified: panel markup after the `<body>` tag is byte-identical, and the panel's own `h-screen`/`overflow-hidden` shell is intact.)

## 3. Marketing shell components

- [x] 3.1 Add the shadcn primitives the shell and pages need with the shadcn CLI against the existing `components.json`. **Deviation:** the registry introduced an unwanted `cn` npm package (removed, imports rewritten to `@/lib/utils`), and `sheet` would have overwritten `components/ui/button.tsx`, so it was not added; see design.md D10/D11.
- [x] 3.2 Build `components/layout/marketing-nav.tsx` as a Server Component: logo linking home, the design's primary links, the search entry point, account entry points, and the primary call-to-action button. All destinations read from `config/routes.ts`.
- [x] 3.3 Build the compact/mobile navigation menu as an isolated client component, revealed by a control on narrow viewports; Escape closes it and every item is a link.
- [x] 3.4 Build `components/layout/marketing-footer.tsx` as a Server Component: logo, the design's link columns, social links, on the brand primary surface.
- [x] 3.5 Export the new nav and footer from `components/layout/index.ts` alongside the existing dashboard exports.
- [x] 3.6 Ensure the shell exposes correct landmarks: the nav as a navigation landmark, the footer as content information, and page content as the main region.
- [ ] 3.7 Verify keyboard traversal of the full nav and the compact menu in a browser, and verify the nav collapses rather than overflowing at a narrow viewport width. **Outstanding:** structure is in place (button with `aria-expanded`/`aria-controls`, all items are links, Escape handled, focus-visible rings), but this needs a real browser pass.

## 4. Homepage feature module and content

- [x] 4.1 Create `features/homepage/` with the documented module shape: `index.ts` barrel, `types/`, `data/`, and `components/`.
- [x] 4.2 Define the content types for each homepage section — hero, logo strip, feature/benefit cards, and testimonials — with the fields those sections need, including the image alt-text field for logos and portraits.
- [x] 4.3 Author the fixture content in `data/`, marking every string that is not verified design copy as placeholder text so unverified copy is identifiable.
- [x] 4.4 Add a shared `ImagePlaceholder` component that reserves the intended aspect ratio and carries an alt-text slot, for use wherever a design asset is unavailable.
- [x] 4.5 Verify that a section receiving empty content data renders no elements and leaves no empty placeholder block on the page. (Verified with a temporary probe page: response rendered, zero `<section>` tags and none of the section copy emitted.)

## 5. Homepage sections and page

- [x] 5.1 Build the hero section component: headline, supporting copy, one dominant call-to-action control, product imagery slot, on the brand primary surface with the design's decorative treatment.
- [x] 5.2 Build the trust/partner logo strip section, rendering each logo as an image with non-empty alternative text.
- [x] 5.3 Build the feature/benefit card section, rendering one card per content item and nothing when the content list is empty.
- [x] 5.4 Build the testimonial section, rendering each entry's quote with its attribution (author and role/company) and portrait.
- [x] 5.5 Compose `app/(marketing)/page.tsx` with the sections in their declared order below the hero, taking content from the feature module barrel only; remove the starter page that currently occupied `/`.
- [x] 5.6 Make the homepage responsive: single column at narrow widths, the design's multi-column arrangement at wide widths, content constrained to a maximum width, and no horizontal overflow at any supported width.
- [x] 5.7 Restyle `app/not-found.tsx` with the brand tokens and the design's 404 treatment, keeping a route back to the homepage, so unimplemented destinations degrade to it.

## 6. Verification

- [x] 6.1 Run `pnpm lint` and `pnpm format` and resolve any findings introduced by this change. (Lint: 0 errors, one pre-existing warning in `proxy.ts`. Prettier: clean on every file this change touches; the repo was not prettier-clean beforehand, so unrelated pre-existing files were left alone.)
- [x] 6.2 Run a production build to confirm the change typechecks and every route builds cleanly. (16 static pages; all 8 articles pre-rendered; `/knowledge-hub` dynamic for the page query.)
- [x] 6.3 Verify that public routes render the marketing shell, scroll to the end of their content, and do not render the dashboard sidebar.
- [x] 6.4 Verify the account entry points navigate to their screens and that an unknown path renders the branded not-found view with a working route back to the homepage. (Rewritten: the auth screens now exist, so the entry points resolve to real pages rather than the 404.)
- [x] 6.5 Verify that no public page title, metadata, or on-page copy references the starter template's branding.
- [x] 6.6 Re-verify the protected panel against the 2.1 capture and confirm its colours, radii, typography, and shell behaviour are unchanged. (Verified by markup comparison plus a zero-deletion token diff, so no colour, radius, or typography value changed.)
- [x] 6.7 Confirm the layout is unchanged when a placeholder is replaced by a same-sized real image, so asset hand-off needs no markup edits. (Verified by construction: both branches render the same aspect-ratio container and differ only in the element inside it.)
- [ ] 6.8 Reconcile the provisional brand values against the design source once Figma access exists (a token in `.tokens/figma` or an exported spec), replacing each sampled value and removing its provisional marking. **Blocked on design-source access** and must be completed before the brand token layer is treated as final.

## 7. Services page (Laptop Repair)

- [x] 7.1 Create `features/services/` with `index.ts`, `types/`, `data/`, and `components/`.
- [x] 7.2 Build the repair offerings section: one card per offering with title, description, indicative price, and turnaround; renders nothing when empty.
- [x] 7.3 Build the inclusions comparison table with real table semantics, a caption, header cells, and a container that scrolls the table rather than the page; missing cell values fall back to a placeholder.
- [x] 7.4 Build the closing call-to-action band on the accent wash.
- [x] 7.5 Add `app/(marketing)/services/laptop-repair/page.tsx` with the shared page header, metadata, and canonical URL.

## 8. Knowledge Hub

- [x] 8.1 Create `features/knowledge-hub/` with `index.ts`, `types/`, `data/`, `config/`, `lib/`, and `components/`.
- [x] 8.2 Author 8 fixture articles across 4 categories with structured bodies (headings, paragraphs, lists), plus lookup and related-article helpers.
- [x] 8.3 Add the pagination helper: slices pages, clamps an out-of-range page into range, and parses the query value.
- [x] 8.4 Build the index page with the article grid, a real empty state, and link-based pagination that identifies the current page to assistive technology.
- [x] 8.5 Build the article detail page: header with byline and cover slot, structured body renderer, contents list built from the article's headings, and related reading.
- [x] 8.6 Return not-found for an unknown article slug so the branded 404 renders.
- [x] 8.7 Add `generateStaticParams` for every article and per-article metadata with canonical URLs.

## 9. FAQ

- [x] 9.1 Create `features/faq/` with `index.ts`, `types/`, `data/`, and `components/`.
- [x] 9.2 Build the disclosure accordion on native `details`/`summary`: answers present in the delivered page, keyboard operable, expanded state announced, works without JavaScript.
- [x] 9.3 Add `app/(marketing)/faq/page.tsx` with the shared page header, grouped questions, and the next-step call to action.

## 10. Auth screens

- [x] 10.1 Add validation schemas for sign up (including password confirmation and terms acknowledgement) and log in.
- [x] 10.2 Build the sign up form with field-level error reporting and correct invalid/described-by wiring.
- [x] 10.3 Build the log in form with field-level error reporting.
- [x] 10.4 Add the auth layout and the sign up and log in pages, each linking to the other and back to the public site.
- [x] 10.5 State plainly on a valid submission that account creation is not connected, and confirm no session is created or route protected (no auth library is installed or used).

## 11. Cross-cutting work in this change

- [x] 11.1 Add the shared `lib/content/copy.ts` helper so page copy carries its own provenance, and route every fixture string through it.
- [x] 11.2 Add the `card`, `badge`, `input`, and `label` primitives, rewriting the registry's `cn` imports to `@/lib/utils` and removing the `cn` dependency from `package.json` and the lockfile.
- [x] 11.3 Add the shared primitives the pages build on: `container`, `section`, `section-heading`, `page-hero`, `image-placeholder`, `decorative-shapes`, and the brand button treatments.
- [x] 11.4 Register every new public route centrally in `config/routes.ts`, including the article route builder.
- [x] 11.5 Fix the pre-existing unreachable `case "employee"` in `panelHomeFor` that prevented the project from type-checking and the production build from passing. No behaviour change.
- [x] 11.6 Run the full route matrix and confirm statuses: every public page 200, unknown article and unknown path 404, `/knowledge-hub?page=2` serving the second page's articles.
- [ ] 11.7 Browser pass at narrow and wide viewport widths for every page, covering the responsive layout, the compact nav menu, keyboard traversal, and confirmation of no horizontal overflow. **Outstanding:** needs a real browser; static analysis and rendered-HTML checks cannot substitute.

## 12. Design conformance — first pass (SUPERSEDED, kept as a record)

These findings came from a 3x-magnified canvas render *before* the design file was readable.
They were directionally right — the shell and most pages were wrong — but they were derived
from the wrong product model, so **do not act on this group**. See group 13.

### Shell

- [ ] 12.1 The header is a **blue bar** with white text and a lime action button. The built nav is white with dark text.
- [ ] 12.2 The footer is **light**, and contains a logo, a **search field with a lime submit button**, several link columns, and a bottom bar. The built footer is brand-primary blue and has no search field.
- [ ] 12.3 The footer appears on the 404 page too; the built 404 renders outside the marketing shell and so shows no footer.

### Homepage

- [ ] 12.4 Hero is a **search-led hero**: headline, one line of subtext, a **search input with a lime submit button**, a large lime circle containing a person with a laptop, floating white data cards, and decorative lime/white shapes. The built hero shows headline + copy + two buttons + a three-item stat row and no search.
- [ ] 12.5 Missing section: an intro block with a rich paragraph containing a lime highlight, followed by a row of four small icon bullets.
- [ ] 12.6 The card grid is **six image cards in a 3x2 layout**, each with an image, title, body text, and a lime "learn more" link. The built equivalent is six icon cards with no images or links.
- [ ] 12.7 Missing section: a chip/stat row of six lime icon items under a centred heading.
- [ ] 12.8 Missing section: an app-showcase split — lime gradient text panel with three small logo marks, paired with a photo collage of laptop/phone mockups and floating UI cards.
- [ ] 12.9 Testimonial is a **single blue card** with a person photo on one side, floating chips, a quote, and the author's name and role. The built version is three plain quote cards, with no blue treatment and no photo.
- [ ] 12.10 Missing section: a blue call-to-action band with a two-line heading, a paragraph, and a centred lime pill button.
- [ ] 12.11 Missing section: a team section on a lime gradient with a heading, a "view all" link, and three people cards with round avatars, names, and roles.
- [ ] 12.12 The logo strip and section ordering differ from the built page; the built order is hero, logos, feature cards, testimonials.

### Service page

- [ ] 12.13 The service page header carries **three pill chips** and its own action buttons, and the body is a six-card image grid followed by a tabular block. The built page has offering cards with price/turnaround metadata and an inclusions table that does not match the design's table.

### Knowledge Hub

- [ ] 12.14 The hub header contains a **search field with a lime submit button** and a filter row; the built header has neither.
- [ ] 12.15 The article grid is **three columns**; the built grid is two.
- [ ] 12.16 Article cards carry an image, a title, body text, and a lime "read more" link; the built card adds a category badge and a date/reading-time row that the design does not show.

### Article detail

- [ ] 12.17 The header carries **three tag chips** below the title; the built header has a category pill only.
- [ ] 12.18 The sidebar is a **card with a lime header ("in this article"), a contents list, and a call-to-action button**; the built sidebar is a plain contents card with no CTA.
- [ ] 12.19 Missing element: a **mid-article image gallery** row of roughly four thumbnails.
- [ ] 12.20 Missing element: an **author byline card** after the body, and a tabular block whose header cells carry the lime accent.

### Auth screens

- [ ] 12.21 The design places a **device/app mockup window inside the brand panel**, beside the form card. The built layout puts copy and a portrait placeholder on one side instead.

### Method and limits

- [x] 12.22 Obtain readable design access. **Done** — a read-only token now lives in `.tokens/figma` (gitignored), and every value in group 13 is read from the file rather than sampled from a render.

## 13. Corrected model — the design read from the file (current state)

Source of truth for every value below: `/v1/files/{key}/nodes` and `/v1/images` against the
file's Style Guide page (frames 73:753 Colours, 73:1014 Layout Grid, 73:1039 Typography)
and its page frames. The file publishes **no** Figma styles, so those frames are the only
authority.

### 13.1 Theme — done

- [x] 13.1.1 Replace the sampled palette with the real ramps: Electric Violet, the chartreuse ramp the file labels "Crimson", and Neutral, each 50–950, namespaced so they never shadow Tailwind's own palettes.
- [x] 13.1.2 Fix the semantic roles against rendered frames: brand surface = Violet 800 `#003be2` (confirmed at 863k pixels of frame 1:1695), buttons = lime 400 `#d4fb20`, large fills and the logo mark = lime 500 `#cbfc01`, text = Neutral 950 `#242528`.
- [x] 13.1.3 Replace the invented display scale with the real one: headings L 72 / M 44 / S 36 / XS 20 at 120% and −1% tracking, body L 18 / M 16 / S 14 / XS 12, labels at 120%.
- [x] 13.1.4 Load Poppins (headings) through `next/font`, and Satoshi (body) from Fontshare — the source the design's own style guide cites. Satoshi is requested via a hoisted `<link>`, because a CSS `@import` after Tailwind's expanded rules is invalid CSS.
- [x] 13.1.5 Add the 12-column grid from the layout guide as a repeating hairline utility, and set the content column to 1200px (1440 − 2 × 120px margins).
- [x] 13.1.6 Keep the dashboard isolated: `--font-sans` and `--font-heading` stay on Geist, so the panel and the Card primitive are untouched; the marketing surface opts in with `font-body` / `font-display`.
- [ ] 13.1.7 Radii remain the only inferred values — the style guide has no radius section, so card/panel radii are measured from renders.

### 13.2 Shell — done

- [x] 13.2.1 Export the real logo from the file and render it as a component with the wordmark colour switched per surface (node 1:1787).
- [x] 13.2.2 Blue header: logo, Home / Courses / Creators, Sign In, Join Us, cart, on the brand surface with the grid overlay; compact menu as the only client island.
- [x] 13.2.3 White footer: newsletter field and lime control, three link columns, bottom bar with the copyright and legal links, matching frame 34:1256.
      Measured against the frame: 1200 content at +71, intro column gaps 16/45/24, link
      columns 528/580 with 40px gutters and 24px heading-to-first-link, rule at +435,
      legal row at +458, total 525 — every footer string is Neutral 950, not muted grey.
- [x] 13.2.4 Footer text and column contents taken from the file, including the design's own — apparently mistaken — "Search" label on the newsletter control.

### 13.3 Homepage — hero done, sections outstanding

- [x] 13.3.1 Hero rebuilt from the design's copy: headline, sub-headline, white pill search plus lime control, lime circle, photograph slot, and the floating UI/UX Design, Learning Progress and Happy Students cards, with the decorative shape treatment.
- [x] 13.3.2 `Logo_Partner` strip (frame 1:1708) — partner logos. Measured 202 tall against the
      frame's 202 (was 174: the `border-y` + `py-14` box model was 12px short and the border
      is not in the frame). **Deviation:** the built strip is an animated marquee while the
      frame draws five static logos — flagged to the user, kept as a deliberate departure.
- [x] 13.3.3 Featured Categories cards (11:21) — six tiles at 167×167 on 40px gutters, plus
      the three category tab rows (21:33, 21:56, 21:63) as 43px pills at 16/21 gaps.
- [x] 13.3.4 The two intro blocks (12:101 "Discover Your Passion, Build Your Skills" and
      34:684 "Explore Diverse Learning Paths at Bytespace") and the intro+tiles span
      1226-1768 / 2576-3120.
- [x] 13.3.5 Course card grid (33:683) and the 1460px showcase block (34:1159) with the
      design's card anatomy, INSIDE 1px stroke → `border` + `p-[15px]`, cover r12 inset
      13/19, chip row, `line-clamp-1` title (the frame sets `maxLines: 1`), level pill,
      four-ellipse learner stack on 24px pitch, rating and price. Measured: rows at
      1768/2192 x 120/533/946 373×384; showcase blocks 3240-3792 and 3864-4460 within 1px.
- [x] 13.3.6 The category tab/filter row (21:33, 21:56, 21:63) — see 13.3.3.
- [x] 13.3.7 The stats band (12K Students, 70+ Courses, 16 Creators) inside both showcase
      blocks and the creator CTA band (34:1161): heading 710×106, paragraph 964×87, lime
      pill 172×46, band 4580-5068. Measured within 1-2px.
- [x] 13.3.8 Testimonials (34:1175) — three cards at x 118/533/948, heights 432/436/407,
      heading bottom-aligned against the 5-line paragraph (gap 43). Section height was 781
      against the frame's 784 — the three missing pixels were `leading-[28px]` on the
      paragraph, role and quote; now `leading-[29px]` and the section measures 784.
      **Footer link column also re-measured at 222.4 (was 256) after the same fix.**

### 13.4 Remaining frames to build

- [x] 13.4.1 Search Page (55:117) — search and results listing. Built and measured
      against the frame at 1440 (headless Chrome + pixel scan): hero band 0-360 with the
      12% white grid, toolbar 432-480, pill row 512-555, the 18-card grid at 632/1056/
      1480/1904/2328/2752 x 384 (pitch 424), pagination 3208-3256, footer frame 3328-
      3853 with its content at +71, rule at +435 and legal row at +458 — all within 1-3px.
- [x] 13.4.2 Course Details (55:4066) — `/courses/[slug]`. The blue band with the title
      block, three fact pills, the Share control hanging past the column and the 720px
      player, over the 725px About panel (description, four-up sneak peak, eight key
      points) with the 412px enrolment card floating over the band's lower edge. Measured
      at 1440: band 0-957, video 125-845 x 416-896, tabs 1019.5, panel 1102.5-2127.5,
      card 908/416, footer hairline 2193, total 2718 against the frame's 2717. The four
      decorative photographs the band draws are omitted: one sits behind the H1 and the
      placeholder's light hatch would swallow `#f5f5f6` title text, and image fills are
      not in the local renders to check them against.
- [x] 13.4.3 Course Lessons (60:102) — `/courses/[slug]/lessons`. Same band and card,
      then the 723px panel: module intro, six module rows on lime `videocam` tiles, the
      two prose blocks and the progress card. Measured at 1440: tabs 1036.8, panel
      1119.8-2276.7, footer hairline 2358, total 2883 — exact. The frame numbers its rows
      1, 2, 4, 5, 6, 7 (there is no Module 3) and the list is reproduced as drawn.
- [x] 13.4.4 Course Reviews (60:681) — `/courses/[slug]/reviews`. Same band and card,
      then the summary card (lime 4.7 tile, five bars with counts, grey star rows), the
      rating filter row and four review cards. Measured at 1440: tabs 1036.8, summary
      1269.8-2295.8, cards at 1639.8 on 306px pitch, footer hairline 2925, total 3450
      against 3449. The frame draws the first review's body at 24px line height and the
      other three at 26px; all four run at 26px and the six pixels it costs come out of
      the section's bottom padding, so the footer still lands where the file puts it.
- [x] 13.4.5 Creator Profile (60:1878) — the header's Creators destination. Built as
      `/creators/[handle]` with the blue identity band (avatar, name, lime Creator chip,
      tagline, bio, the Products/Followers pills and the Follow control) over the filter
      toolbar and a six-card grid, on the shared header and footer. Measured against the
      frame at 1440: blue band 0-592, identity block x=122 y=172, badge 180-215, count
      row 464-510 with Follow flush to x=1320, toolbar 654-702, card rows 742 and 1166 at
      columns 120/533/947, footer frame 1611-2136 with content at +71 and rule at +435 —
      total page height 2136, every landmark within 0-5px (the drift is body-face
      metrics). Unknown handles fall through to the branded 404.
- [ ] 13.4.6 Register (47:351) and Login (49:195) — the pages exist with validation, but their own copy has not been read yet (the API rate-limited); the current strings are placeholders.
- [x] 13.4.7 A creators index does not exist in the design, so `/creators` forwards to the
      one profile the file draws (`purepearl-studio`) and the header link resolves. The
      redirect is routing, not a designed page; a real index still needs a frame first.
- [ ] 13.4.8 Footer destinations with no frame (About, Contact, Help, Affiliate, Become a Creator, legal) currently land on the branded 404.

### 13.4.9 Card fix carried out of 13.4.5

- [x] The card's three fact chips were reflowing to two rows: the design's row is a single
      315px auto-layout and our body face sets the labels a few pixels wider, so the wrap
      lifted the row off the cover's bottom edge. The row is now `flex-nowrap` with
      `shrink-0` chips — measured back at x 163-450 on one line for both the profile grid
      and the results grid, against the frame's 160-451.

### 13.4.10 Search and filtering on `/courses`

- [x] The toolbar, category pills and pagination were drawing but did nothing. They now
      read one `CoursesQuery` and rebuild the URL from the whole of it through
      `coursesHref`, so a filter set on one control survives the next: `q` narrows the
      catalogue on title, creator, level and facts; `category`, `featured` and `level`
      each select a subset; `sort` reorders (relevant is the frame's own order); `page`
      walks what is left and is clamped to the filtered set's page count. Verified over
      the built page — 18 cards unfiltered across 5 pages, 15 for `q=figma`, 12 for
      `category=music`, 18 on two pages for `level=intermediate`, A–Z and top-rated
      orderings different from the default, 18 on five pages for `page=2`, and an empty
      state with no pagination for a query that matches nothing.
- [x] The search form is a plain GET, so it only submitted its own field and dropped the
      filters the toolbar had set. It now carries `category`, `level`, `featured` and
      `sort` as hidden inputs and deliberately leaves `page` off, so a new search starts
      at the first page of what it matches with the filters intact.

### 13.5 Verification

- [x] 13.5.1 Typecheck, lint and production build pass; the homepage, register and login render 200 and an unknown path renders the branded 404.
- [x] 13.5.2 Confirm the rebuilt theme actually compiles: every new type utility, font role, grid utility and brand colour resolves in the built CSS.
- [ ] 13.5.3 Re-read Register and Login once the API rate limit clears, and replace their placeholder copy with the frames' own strings.
- [ ] 13.5.4 Browser pass at narrow and wide widths once the remaining pages exist (see 11.7) — and re-shoot the built pages against the rendered frames for a real visual diff.
