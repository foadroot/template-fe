## Purpose

Defines the FAQ page: question groups, how answers are revealed, and the route it offers
to a real next step when the answer is not there.

## ADDED Requirements

### Requirement: FAQ presents questions grouped by topic

The FAQ page SHALL render its questions grouped under topic headings, with each question
rendered together with its answer. Groups and questions SHALL render in the order held by
the content data, and each group heading SHALL be associated with the group it introduces.

#### Scenario: Groups and questions render in data order

- **WHEN** the FAQ page renders
- **THEN** every group renders under its own heading, in data order
- **AND** every question renders with its answer

#### Scenario: Group heading is associated with its group

- **WHEN** the page renders a question group
- **THEN** the group is associated with its heading for assistive technology

#### Scenario: Empty content renders no accordion

- **WHEN** the FAQ content data contains no groups
- **THEN** no questions render
- **AND** the page does not render an empty accordion

### Requirement: Answers are disclosed without requiring JavaScript

Question answers SHALL be present in the delivered page and SHALL be revealable using
controls that work without JavaScript, are operable by keyboard, and expose their expanded
or collapsed state.

#### Scenario: Answer is present before expansion

- **WHEN** the FAQ page is delivered
- **THEN** each answer's text is present in the delivered response

#### Scenario: Keyboard operating the control

- **WHEN** a keyboard user focuses a question's control and activates it
- **THEN** the answer is revealed
- **AND** the control's state reflects that it is expanded

#### Scenario: Disclosure works with JavaScript unavailable

- **WHEN** the page is used with JavaScript unavailable
- **THEN** questions can still be expanded and collapsed

### Requirement: FAQ offers a next step

The FAQ page SHALL present a call to action leading to a real destination for visitors
whose question is not answered.

#### Scenario: Next step renders and navigates

- **WHEN** a visitor does not find their answer
- **THEN** a call to action is presented with a route to the booking destination
- **AND** activating it navigates there
