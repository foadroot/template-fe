## Purpose

Defines the Knowledge Hub: the paginated article index, the article detail view with its
contents list and further reading, and the behaviour when an article does not exist.

## ADDED Requirements

### Requirement: Article index lists articles in pages

The Knowledge Hub index SHALL list articles from its content data, at most one page's worth
at a time, and SHALL present navigation between pages when more than one page exists. The
selected page SHALL be expressed in the URL so a page is linkable and reloadable.

#### Scenario: First page lists the first set of articles

- **WHEN** a visitor opens the Knowledge Hub with no page specified
- **THEN** the first page of articles renders
- **AND** no article appears twice across the listing

#### Scenario: Page selection is expressed in the URL

- **WHEN** a visitor follows the navigation to a later page
- **THEN** the URL changes to identify that page
- **AND** reloading that URL shows the same page of articles

#### Scenario: Out-of-range page shows a real page

- **WHEN** a visitor requests a page number beyond the last page
- **THEN** the last page of articles renders
- **AND** the visitor is not shown an empty listing

#### Scenario: Single page hides the navigation

- **WHEN** every article fits on one page
- **THEN** no page navigation renders

#### Scenario: Current page is identified

- **WHEN** page navigation renders
- **THEN** the current page is identified to assistive technology
- **AND** controls for unavailable previous or next pages are not presented as usable links

### Requirement: Article index shows a real empty state

When there are no articles to list, the index SHALL show an explanatory empty state with a
route to a useful next destination, instead of an empty grid.

#### Scenario: Empty listing shows the empty state

- **WHEN** the article content data contains no articles
- **THEN** an empty state renders explaining that there is nothing to show
- **AND** it offers a route to another part of the site

### Requirement: Each article entry presents its identity and metadata

Every article entry SHALL render its title, a short excerpt, its category, its publication
date as a machine-readable date, and its reading time. The entry SHALL be usable as a
single link to the article, without presenting duplicate links for the same destination to
assistive technology.

#### Scenario: Entry shows title, excerpt, and metadata

- **WHEN** an article entry renders in the index
- **THEN** it shows the title, the excerpt, the category, the publication date, and the
  reading time
- **AND** the publication date is machine readable

#### Scenario: Entry is one link

- **WHEN** a visitor navigates the index by keyboard
- **THEN** each article is reachable as a single link
- **AND** the destination is not exposed as a second link within the same entry

### Requirement: Article detail presents the full article

The article page SHALL render the article's title, excerpt, author, publication date,
reading time, cover image slot, and its full body. It SHALL present a contents list built
from the article's own headings, linking to those headings.

#### Scenario: Article renders its byline and body

- **WHEN** a visitor opens an article
- **THEN** the title, excerpt, author, publication date, reading time, and body render
- **AND** the body renders in the order defined by the article's content data

#### Scenario: Contents list links to headings

- **WHEN** an article with headings renders
- **THEN** a contents list names each heading
- **AND** each entry links to an anchor that exists on the page

#### Scenario: An article without headings shows no contents list

- **WHEN** an article has no headings in its body
- **THEN** no contents list renders

### Requirement: Article detail suggests further reading

The article page SHALL suggest other articles, preferring those in the same category, with
links to each suggestion.

#### Scenario: Related articles render

- **WHEN** a visitor reaches the end of an article
- **THEN** other articles are suggested with links
- **AND** the article being read is not suggested as its own related reading

### Requirement: Unknown article is a not-found

Requesting an article that does not exist SHALL produce a not-found response rendering the
site's branded not-found view, not an unstyled error.

#### Scenario: Unknown slug returns not found

- **WHEN** a visitor requests an article slug that does not exist
- **THEN** the response status is 404
- **AND** the branded not-found view renders with a route back to the homepage
