# Data completeness rules

This is a civic-information application. Completeness must not mean filling unknown fields with guesses.

## Allowed
- Official source URL
- Source document/page title
- Verification date
- Last-updated date when supplied by the source
- Exact official record
- Explicit `needs_verification` when the record cannot be confirmed

## Not allowed
- Synthetic LGD codes
- Invented population/household counts
- Invented officer names or mobile numbers
- Invented projects, budgets or beneficiaries
- Placeholder schemes presented as real schemes
- Old officials presented as current without a current official source

## Required before a record is marked Verified
`sourceUrl + sourceTitle + verifiedOn + source-specific record match`

## Review cadence
Dynamic records such as officers, phone numbers, schemes, electoral information and project status must be rechecked periodically.
