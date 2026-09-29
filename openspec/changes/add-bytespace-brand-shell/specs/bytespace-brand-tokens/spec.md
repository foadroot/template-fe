## Purpose

Defines the ByteSpace brand token layer that every public-facing page draws its colour,
surface, and shape values from, so brand values are declared once and consumed by role
rather than repeated as raw values across pages.

## ADDED Requirements

### Requirement: Brand palette is available by role

The styling layer SHALL expose the ByteSpace brand palette as named roles that pages
consume, at minimum: a brand primary (the saturated electric blue used for heroes, primary
buttons, and the footer), a brand accent (the chartreuse used for primary call-to-action
buttons and highlight marks), a lighter accent wash (used for large soft backgrounds), and
a heading/body text pair suitable for use on both light surfaces and the brand primary
surface.

Pages SHALL reference these roles rather than raw colour values, so that reconciling a
brand value later requires changing it in one place.

#### Scenario: Primary call to action uses the brand accent

- **WHEN** the homepage renders its primary call-to-action button
- **THEN** the button uses the brand accent role as its background
- **AND** its label uses the role reserved for text on the accent surface

#### Scenario: Brand surface uses the brand primary role

- **WHEN** a hero, footer, or 404 view renders its brand-coloured surface
- **THEN** that surface uses the brand primary role
- **AND** no page hardcodes a raw colour value in place of the role

#### Scenario: A brand value is reconciled in one place

- **WHEN** a brand token's value is changed
- **THEN** every page consuming that role reflects the new value without per-page edits

### Requirement: Dashboard styling is preserved

The brand token layer SHALL be additive. Existing dashboard and protected-panel styling
SHALL continue to resolve to its current values, and introducing brand roles SHALL NOT
alter the rendered appearance of any protected route.

#### Scenario: Protected panel is visually unchanged

- **WHEN** a protected panel route renders after this change
- **THEN** its colours, radii, and surfaces match the pre-change rendering
- **AND** no dashboard token has been redefined to a brand value

#### Scenario: Existing dashboard tokens remain resolvable

- **WHEN** a component referencing a pre-existing dashboard token renders
- **THEN** that token still resolves to a valid value

### Requirement: Marketing surface and shape language

The token layer SHALL provide marketing surface roles — page background, card surface, and
a border/divider role — and SHALL provide the larger corner radii the design uses for
marketing cards, panels, and pill-shaped controls, distinct from the tighter radii used by
dashboard surfaces.

#### Scenario: Marketing card uses marketing surface and radius roles

- **WHEN** a homepage card renders
- **THEN** it uses the marketing card surface and border roles
- **AND** it uses a marketing radius role larger than the dashboard card radius

#### Scenario: Pill-shaped controls

- **WHEN** a marketing button or badge renders
- **THEN** its corner radius resolves to the fully rounded pill treatment

### Requirement: Brand typography is applied consistently

Public marketing pages SHALL render headings and body copy from a single, consistent
type system applied at the page level, so that every marketing section shares the same
family, weight scale, and heading treatment rather than declaring its own.

Where the design source does not establish an exact type scale, marketing headings SHALL
use a display-sized treatment that is visually distinct from body copy and consistent
across all sections.

#### Scenario: Headings share one treatment across sections

- **WHEN** two different homepage sections each render a section heading
- **THEN** both headings resolve to the same family, weight, and scale
- **AND** neither section declares its own heading family

#### Scenario: Marketing typography does not alter dashboard typography

- **WHEN** a protected panel route renders after this change
- **THEN** its typography is unchanged from the pre-change rendering

### Requirement: Provisional brand values are disclosed and reconciled

The brand token values introduced by this change are sampled from a low-resolution render
of the design source and are not authoritative. The token layer SHALL document which
values are provisional, and those values SHALL be reconciled against the design source
before the brand token layer is treated as final.

#### Scenario: Provisional values are identifiable

- **WHEN** a maintainer reads the brand token layer
- **THEN** every token whose value is unverified against the design source is marked as
  provisional
- **AND** the documentation states what is needed to verify it

#### Scenario: Reconciliation replaces sampled values

- **WHEN** authoritative design values become available
- **THEN** each provisional sampled value is replaced by the authoritative value
- **AND** the provisional marking is removed for the reconciled tokens
