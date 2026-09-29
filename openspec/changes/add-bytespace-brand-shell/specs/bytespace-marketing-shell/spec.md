## Purpose

Defines the public-facing site shell — a normally scrolling layout with a marketing
navigation bar and footer — that all ByteSpace public pages share, kept separate from the
existing dashboard shell so the protected panel is unaffected.

## ADDED Requirements

### Requirement: Public routes render the marketing shell

Public ByteSpace pages SHALL render inside a marketing shell consisting of a top
navigation bar and a footer, on a normally scrolling page. The shell SHALL NOT constrain
the page to a fixed, non-scrolling viewport height.

#### Scenario: Homepage renders the full marketing shell

- **WHEN** a visitor opens the homepage
- **THEN** the marketing navigation bar renders above the page content
- **AND** the marketing footer renders below the page content
- **AND** the page scrolls to reveal all content

#### Scenario: Content longer than the viewport is reachable

- **WHEN** a public page's content is taller than the viewport
- **THEN** the visitor can scroll to the end of the content without inner-scroll clipping

### Requirement: The marketing shell is separate from the dashboard shell

The marketing shell SHALL NOT alter the existing dashboard shell used by protected
routes. The two shells SHALL be independently selectable by route, and a change to one
SHALL NOT change the rendered output of the other.

#### Scenario: Protected panel keeps the dashboard shell

- **WHEN** a protected panel route renders
- **THEN** it renders with the existing dashboard shell
- **AND** it does not render the marketing navigation bar or marketing footer

#### Scenario: Marketing shell is not applied to protected routes

- **WHEN** any public route renders
- **THEN** it renders with the marketing shell
- **AND** it does not render the dashboard sidebar

### Requirement: Marketing navigation bar

The marketing navigation bar SHALL render the ByteSpace logo linking to the homepage, the
design's primary navigation links, an account entry point, and a primary
call-to-action control. It SHALL be present at the top of every public page.

The bar SHALL collapse into a compact menu on narrow viewports, and the menu SHALL be
operable by keyboard, with each item navigating to its destination when activated.

#### Scenario: Logo returns to the homepage

- **WHEN** a visitor activates the logo in the navigation bar
- **THEN** they navigate to the homepage

#### Scenario: Primary link navigates to its destination

- **WHEN** a visitor activates a primary navigation link
- **THEN** they navigate to that link's declared public route

#### Scenario: Navigation collapses on a narrow viewport

- **WHEN** a public page renders at a narrow viewport width
- **THEN** the navigation bar presents a compact menu control instead of the full link list
- **AND** activating that control reveals the navigation items

#### Scenario: Compact menu is keyboard operable

- **WHEN** a keyboard user opens the compact menu and moves through its items
- **THEN** every item is reachable and activatable by keyboard
- **AND** focus is visibly indicated on the focused item

### Requirement: Marketing footer

The marketing footer SHALL render the ByteSpace logo, the design's link columns, and its
social links, with the brand primary surface treatment. Footer links SHALL navigate to
declared routes or external destinations.

#### Scenario: Footer renders its columns and social links

- **WHEN** a visitor scrolls to the bottom of any public page
- **THEN** the footer renders its logo, link columns, and social links
- **AND** the footer uses the brand primary surface

#### Scenario: Footer link navigates

- **WHEN** a visitor activates a footer link
- **THEN** they navigate to that link's declared destination

### Requirement: Public routes are registered centrally

Every public route introduced by this change SHALL be declared in the project's central
route configuration rather than as inline path strings, and navigation and footer links
SHALL resolve to those declarations.

#### Scenario: Links resolve to declared routes

- **WHEN** a navigation or footer link is rendered
- **THEN** its destination comes from the central route configuration
- **AND** every destination it references exists in that configuration

#### Scenario: Unknown path renders the branded not-found view

- **WHEN** a visitor requests a path that is not declared as a public route
- **THEN** the branded not-found view renders
- **AND** it is not an unstyled or platform-default error page

### Requirement: Account entry points lead to the auth screens

The navigation bar and footer SHALL expose the design's account entry points, and each
SHALL navigate to a real, declared destination — the sign up or log in screen. A dead
control or a control leading to an unstyled failure is not acceptable.

#### Scenario: Account entry points are visible

- **WHEN** the marketing navigation bar or footer renders
- **THEN** it presents the design's account entry points

#### Scenario: Account entry point navigates to its screen

- **WHEN** a visitor activates an account entry point
- **THEN** the corresponding sign up or log in screen renders
- **AND** the response status is not an error status

### Requirement: Site identity reflects ByteSpace

Public page titles and metadata SHALL identify the site as ByteSpace. Starter-template
branding SHALL NOT appear in any public page title, share metadata, or on-page copy.

#### Scenario: Homepage title identifies the site

- **WHEN** the homepage is requested
- **THEN** its document title identifies the site as ByteSpace

#### Scenario: No starter branding remains on public pages

- **WHEN** any public page renders
- **THEN** no page title, metadata, or on-page copy references the starter template's
  branding

### Requirement: Shell is accessible to assistive technology

The shell SHALL expose the navigation bar and footer as distinct landmarks, and the
page's primary content SHALL be identifiable as the main content region.

#### Scenario: Landmarks are exposed

- **WHEN** a public page renders
- **THEN** the navigation bar is exposed as a navigation landmark
- **AND** the footer is exposed as a content-information landmark
- **AND** the primary content is exposed as the main region
