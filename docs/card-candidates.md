# Card candidates

New AgentTacho features that earn a feature card on the landing page. The card grid fills in pairs, so cards are added two at a time: once two candidates are listed as ready, one pull request adds both cards to `src/data/features.ts`, their stems and capture steps in the app repository, the new shots, and raises the card count in `tests/page.test.ts`. Then both entries leave this list.

A feature that changes an existing shot (for example `glance`) still recaptures it in its own pull request; only new cards wait here.

## How to add an entry

The app pull request that ships a card-worthy feature adds its entry here in a site pull request, linked from the app pull request.

- **Feature**: the name a card title could use
- **App**: the spec or issue, and the pull request
- **Status**: `planned` (spec exists), `ready` (merged in the app, demo scenario shows it)
- **Shot idea**: what the new shot should show, and which demo state it needs
- **Card copy draft**: one or two sentences, no em dash or en dash

## Candidates

### Free reset tickets

- **Feature**: Free limit resets at a glance
- **App**: brainstorm 32 (`brainstorm/32-free-reset-tickets.md`), spec pending
- **Status**: planned
- **Shot idea**: a Claude section header with gift glyphs next to the account name and a tooltip naming the expiry; the demo scenario gives one account a ticket without expiry and one expiring soon
- **Card copy draft**: Claude and Codex sometimes grant free limit resets. AgentTacho shows each one next to the account and reminds you before it expires.
