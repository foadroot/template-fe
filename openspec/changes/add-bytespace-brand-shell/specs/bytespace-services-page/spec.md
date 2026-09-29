## Purpose

Defines the Laptop Repair service page: the repair types it presents, the comparison of
what each kind of job includes, and the page's closing call to action.

## ADDED Requirements

### Requirement: Service page presents its repair offerings

The service page SHALL render, for each repair offering in its content data, the
offering's title, description, indicative starting price, and typical turnaround. It SHALL
render one entry per item in data order and SHALL render no offerings when the list is
empty.

#### Scenario: Each offering renders its details

- **WHEN** the service page renders
- **THEN** every offering in the content data renders with its title, description, price,
  and turnaround
- **AND** the offerings appear in data order

#### Scenario: Empty offerings data renders no grid

- **WHEN** the offerings content data is empty
- **THEN** no offering cards render
- **AND** the page does not render an empty grid or orphaned heading for them

### Requirement: Inclusions are compared as a table

The service page SHALL present what each kind of repair includes as a table with a row per
inclusion and a column per repair type, using real table semantics so the row-to-column
relationship is exposed to assistive technology.

When the table is wider than the viewport, the table SHALL scroll within its own container
rather than widening the page.

#### Scenario: Table is exposed with real semantics

- **WHEN** the inclusions table renders
- **THEN** it is marked up as a table with a caption
- **AND** each column and each inclusion row is identified as a header cell

#### Scenario: Narrow viewport scrolls the table, not the page

- **WHEN** the inclusions table renders at a narrow viewport width
- **THEN** the table scrolls horizontally within its own container
- **AND** the page itself does not scroll horizontally

#### Scenario: Missing cell value does not break the row

- **WHEN** an inclusion row has fewer values than there are columns
- **THEN** the row still renders for every column
- **AND** the missing cell shows a placeholder rather than shifting the row

### Requirement: Service page closes with a call to action

The service page SHALL end with a call-to-action band presenting a heading, supporting
copy, and a control that leads to the booking destination.

#### Scenario: Closing call to action renders and navigates

- **WHEN** the visitor reaches the end of the service page
- **THEN** a call-to-action band renders with a heading and a control
- **AND** activating the control navigates to the booking destination

### Requirement: Indicative pricing is disclosed as such

Where the page shows prices or turnaround times, it SHALL state that they are indicative
and that the approved quote is the amount charged.

#### Scenario: Pricing caveat is present

- **WHEN** the service page renders its offerings or inclusions
- **THEN** the page states that prices are indicative
- **AND** it states that the quote confirmed in writing is the amount charged
