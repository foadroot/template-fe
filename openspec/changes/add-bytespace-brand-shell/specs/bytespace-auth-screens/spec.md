## Purpose

Defines the sign up and log in screens: the fields they validate, the feedback they give,
and the required acknowledgement that they do not yet create a session.

## ADDED Requirements

### Requirement: Auth screens validate their input

The sign up and log in screens SHALL validate input before accepting a submission, and SHALL
report each invalid field next to that field rather than only as a summary. Validation
SHALL run without a round trip to a server.

#### Scenario: Invalid submission is rejected with field-level feedback

- **WHEN** a visitor submits the form with an invalid field
- **THEN** the submission is not accepted
- **AND** a message describing the problem renders in association with that field

#### Scenario: Invalid field is identifiable to assistive technology

- **WHEN** a field fails validation
- **THEN** the field is marked invalid for assistive technology
- **AND** the field is associated with its message

#### Scenario: Valid submission is accepted for processing

- **WHEN** every field is valid and the visitor submits
- **THEN** the submission is accepted and feedback is shown to the visitor

### Requirement: Sign up requires a matching, confirmed password

The sign up screen SHALL require a password and a confirmation of that password and SHALL
reject the submission when the two do not match, reporting the problem against the
confirmation field.

#### Scenario: Mismatched confirmation is rejected

- **WHEN** the two password fields do not match
- **THEN** the submission is rejected
- **AND** the problem is reported against the confirmation field

#### Scenario: Unacknowledged terms are rejected

- **WHEN** the visitor has not acknowledged the terms
- **THEN** the submission is rejected
- **AND** the problem is reported against that acknowledgement

### Requirement: Screens state that no account is created

These screens do not create an account, establish a session, or contact a server. On an
otherwise valid submission the screen SHALL tell the visitor that account creation is not
yet connected, so the interface does not imply a session that does not exist.

#### Scenario: Valid submission does not imply a session

- **WHEN** the visitor submits a valid form
- **THEN** feedback states that account creation or sign in is not yet connected
- **AND** the visitor is not left believing they are signed in

#### Scenario: No session is established

- **WHEN** either form is submitted successfully
- **THEN** no session is created
- **AND** no protected route becomes reachable as a result

### Requirement: The two screens link to each other

Each auth screen SHALL offer a route to the other, so a visitor who is on the wrong screen
can switch without going back to the homepage.

#### Scenario: Each screen links to its counterpart

- **WHEN** the sign up screen renders
- **THEN** it offers a route to the log in screen
- **AND** the log in screen offers a route to the sign up screen

#### Scenario: Screens offer a way back to the site

- **WHEN** an auth screen renders
- **THEN** it offers a route back to the public site
