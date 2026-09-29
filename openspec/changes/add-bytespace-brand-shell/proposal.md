## Why

The ByteSpace design is a public marketing website, but this repository is currently a
dashboard-oriented starter: the root layout is a fixed, non-scrolling app shell
(`flex h-full flex-col overflow-hidden`), the only public route is `/`, the brand tokens
are the starter's indigo (`--primary: #6e62ff`), and the only shadcn primitives that exist
are `button`, `loading-spinner`, and `sonner`. None of the design's visual language
(electric blue, chartreuse accent, rounded marketing cards, organic decorative shapes) is
representable with today's token layer, and none of the design's pages exist.

The site is being built in one pass, so this change delivers the whole public site: the
brand theme, the shell every page shares, and every page in the design.

## What Changes

- **Rebrand the token layer.** Extend `app/globals.css` with ByteSpace brand tokens
  alongside the existing `:root` and `@theme inline` layers: a primary blue, a chartreuse
  accent plus soft/wash variants, marketing surface and border roles, larger corner radii,
  a display type scale, and a marketing content width. The existing dashboard tokens are
  preserved so the protected panel keeps working.
- **Add a public marketing route group** with its own layout and shell, separate from the
  existing app-shell layout used by `(protected)/panel`, and an auth route group for the
  account screens. Both scroll normally.
- **Add the marketing nav and footer** as reusable layout components beside the existing
  dashboard `Header`/`Sidebar`, including a compact mobile menu as an isolated client
  island.
- **Build the homepage** from composable section components — hero, logo strip, benefit
  cards, testimonials — fed by typed fixture data in a feature module.
- **Build the Laptop Repair service page**: page header, repair offering cards, an
  inclusions comparison table, and a closing call to action.
- **Build the Knowledge Hub**: a paginated article index with a real empty state, and
  article detail pages with byline, contents list, structured body, and related reading.
- **Build the FAQ page**: topic-grouped questions using disclosure controls that work
  without JavaScript, plus a next-step call to action.
- **Build the sign up and log in screens**: real field-level validation via schemas, with
  no session, no request, and copy that says so.
- **Restyle the 404 page** to the design's brand treatment, keeping a route home.
- **Register every public route** in `config/routes.ts`, and update root metadata from the
  starter's branding to ByteSpace.
- Exact colour, type-scale, spacing, and radius values are **provisional**. They are
  sampled from a 1280px canvas render of the Figma file, not read from the design's own
  values. Every unverified string is tagged as placeholder in the content data.

## Non-Goals

- **Any backend integration.** Content comes from typed local fixtures; `lib/apiClient/` is
  not wired up and no API calls are introduced.
- **Working authentication of any kind.** No session, no `next-auth` (not currently a
  dependency), no route protection, no password reset, no email verification, no social
  sign-in. The account screens validate input and stop there.
- **A working search.** The nav's search control is an entry point to the Knowledge Hub,
  not a query.
- **Article authoring, categories filtering, or tagging UI.** Articles are fixture data.
- **The dashboard panel's own rebrand.** `Header`/`Sidebar` still carry the starter's
  branding; the panel is deliberately left byte-identical so this change cannot regress it.

## Capabilities

### New Capabilities

- `bytespace-brand-tokens`: the brand theme — which colour, radius, surface, and type roles
  exist, their intended purpose, and the rule that ByteSpace pages consume roles rather
  than raw values. Covers the provisional-values caveat and the reconciliation requirement.
- `bytespace-marketing-shell`: the public shell — the marketing route group and its
  scrolling layout, the nav (logo, primary links, search entry point, account entry points,
  call to action), the footer, and central route registration.
- `bytespace-homepage`: the homepage — required sections and their declared order, the
  typed content contract feeding them, placeholders for missing imagery, responsive
  behaviour, and the placeholder-copy policy.
- `bytespace-services-page`: the Laptop Repair page — offerings, the inclusions comparison
  table, indicative-pricing disclosure, and the closing call to action.
- `bytespace-knowledge-hub`: the article index with pagination and empty state, and the
  article detail view with contents list and related reading.
- `bytespace-faq-page`: topic-grouped questions, JavaScript-independent disclosure, and the
  next-step call to action.
- `bytespace-auth-screens`: sign up and log in validation, field-level feedback, and the
  requirement that the screens state no account is created.

### Modified Capabilities

None. `openspec/specs/` is empty, so there are no existing capabilities to modify.

## Impact

**Affected code**

- `app/globals.css` — brand tokens added; `:root` and `@theme inline` extended.
- `app/layout.tsx` — metadata rebranded to ByteSpace; the `<body>` app-shell constraint
  removed so public pages can scroll.
- `app/page.tsx` — **removed**; the marketing homepage takes over `/`.
- `app/not-found.tsx` — restyled to the brand treatment.
- `app/(marketing)/` — new route group: layout, homepage, service page, Knowledge Hub index
  and article detail, FAQ.
- `app/(auth)/` — new route group: layout, sign up, log in.
- `components/layout/` — new `marketing-nav.tsx`, `marketing-footer.tsx`,
  `marketing-nav-menu.tsx`, `marketing-nav-links.ts`; `index.ts` extended. The dashboard
  `header.tsx`/`sidebar.tsx` are untouched.
- `components/shared/` — new `container.tsx`, `section.tsx`, `section-heading.tsx`,
  `page-hero.tsx`, `image-placeholder.tsx`, `decorative-shapes.tsx`, `brand-button.ts`.
- `components/ui/` — `card.tsx`, `badge.tsx`, `input.tsx`, `label.tsx` added.
- `config/routes.ts` — the public route set added; one pre-existing unreachable `switch`
  case removed so the project type-checks (see below).
- `lib/content/copy.ts` — new shared copy-with-provenance helper.
- `features/` — new modules: `homepage`, `services`, `knowledge-hub`, `faq`, `auth`.

**Dependency notes**

- No new runtime dependency is intended. The shadcn CLI adds a `cn` npm package as a
  side effect of its registry items; it is removed here and the generated imports rewritten
  to the project's `@/lib/utils`, matching every existing component.
- Adding `sheet` from the registry would overwrite the project's customised
  `components/ui/button.tsx`, so the compact nav menu is a small client component instead.

**Pre-existing defect fixed**

`panelHomeFor` in `config/routes.ts` had a `case "employee"` that `Role` cannot produce, so
the project did not type-check and `next build` failed. The unreachable case was removed;
the `default` branch already returned `null` for it, so behaviour is unchanged. This had to
be fixed for the change's own build verification to pass.

**Design-source limitation**

The only available view of the design is a 1280px canvas render, which is too small to read
body copy or extract exact values. Everything value-related and every prose string in this
change is provisional, tagged as placeholder, and carries a reconciliation task. Reading the
file properly requires a Figma access token; the repository already gitignores `/.tokens`
for exactly this purpose.
