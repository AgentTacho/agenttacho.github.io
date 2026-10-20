# Landing page messaging reframe

Date: 2026-10-20
Status: Draft for approval

## Intent and the why

The AgentTacho landing page currently reads as a feature catalogue: a nine-card
grid that tries to show everything the app does. That framing invites the wrong
comparison. Measured on feature count or breadth of provider support,
AgentTacho loses to CodexBar (a large, ~22k-star project) by design, and a
catalogue page implicitly competes on exactly that axis.

This reframe repositions the page around AgentTacho's actual niche: a **calm,
focused menu-bar app for watching agent usage and budgets**, where every
provider and every account is visible at a single glance. It stops competing on
breadth and starts competing on focus, clarity, and a small set of genuinely
differentiated features. It also shortens the page: fewer screenshots, more
restraint, self-evident features demoted to one-line mentions.

The person this page is for: a developer who juggles several accounts (often
because a single company budget does not stretch far enough, so they mix in
their own subscriptions). They make live decisions about which model they can
still afford for a task, so the headroom left in each window must be readable
instantly, and a runaway session must be obvious the moment it starts burning.
That is why usage and budget numbers are always on screen.

## Goals

- Reframe the page's core message from "everything in one menu" to "every
  account, one calm glance; usage and budgets you control."
- Add an honest positioning statement near the top that names CodexBar
  respectfully, acknowledges it is bigger and more feature-rich, and frames
  AgentTacho's smaller scope as a deliberate choice, not a shortfall.
- Shorten the page: replace the nine-card feature grid with a six-card (2 x 3)
  grid, and demote self-evident features to a one-line strip with no
  screenshots.
- Keep the emotional tone confident and respectful throughout, never
  apologetic, never self-deprecating, never a swipe at a competitor.

## Non-goals

- No change to the app itself. This is a website/messaging change only.
- No change to the privacy section's substance or the closing CTA's behaviour.
- No new provider/harness claims. The page states what the app does today.

## Anti-goals (these would make it a failure even if it ships)

- Reading as apologetic or insecure ("we know we have fewer features, sorry").
- Disparaging any competitor. ClaudeBar must not be named or alluded to as
  "too fancy" or similar; that judgement informs our own calm design only.
- Trading the calm, uncluttered feel for a denser page. Shorter and quieter is
  the point; adding cards back in defeats it.
- Two redundant "menu bar" beats that feel like the same thing said twice (see
  the strip-vs-card decision below).

## Constraints

- Astro site, existing component structure under `src/components/agenttacho/`
  and content in `src/data/features.ts`. Build on what is there.
- Screenshots are `.webp` pairs (light + dark) in `src/assets/agenttacho/`,
  rendered through `Shot.astro`. New or re-captured screenshots are produced
  from the AgentTacho **app** repo's demo build (the `capture.sh` workflow lives
  there, not in this repo). This design can specify which assets are needed;
  producing them is an external dependency tracked as such.
- `npm run check`, `npm run build`, and `npm test` must pass. `tests/page.test.ts`
  asserts page content against the built `dist/index.html`; it must be updated
  in lockstep with copy/structure changes (run a fresh `npm run build` before
  `npm test`, since the tests read the built file).
- House style: no em-dash or en-dash in copy.

## The decisions already made

### Page order (top to bottom)

1. **Hero** — the promise. Keep the existing headline direction ("One glance.
   Every account."); the subtitle already covers "across all your models and
   accounts, including several on the same provider." (Builder's call whether
   the subtitle needs a light edit to match the reframed tone.)
2. **Menu-bar strip** (`MenuBarStrip.astro`) — the proof. Kept, directly under
   the hero. Its copy stays focused on *what you see at a glance* (today's "One
   number per plan or budget" direction). It must NOT drift into customization
   messaging; that belongs to card 6.
3. **Niche statement** — the positioning. New text block. Sits below the strip
   (show-before-tell: the strip earns the claim). Content requirements:
   - Names CodexBar explicitly and respectfully, and links to it; acknowledges
     it is larger, more feature-rich, supports far more providers, and is a
     great choice for people who want all of that.
   - No hard numbers on the page (no star count, no provider count). The framing
     stays qualitative; numbers drift and a stale figure undercuts the
     credibility the section exists to build, so they inform tone only.
   - States plainly that AgentTacho does not aim to match that breadth, and
     that this is deliberate: it focuses on usage and budgets for the most
     prominent coding harnesses whose usage can be read from local disk.
   - Frames it as a choice for the reader: if you want everything, CodexBar is
     there; if you want a calm, focused view of usage and budgets across
     accounts, this is for you.
   - Confident and warm in tone. No apology, no dig at anyone.
4. **Six-card screenshot grid (2 x 3)**, grouped in three pairs:
   - Pair 1 — Usage & limits:
     1. **Usage at a glance** — the dropdown showing plan limits and pace with
        the details expanded, in one view. This merges today's separate *Plan
        limits*, *Pace*, and *Details on demand* cards into one. Needs a new or
        re-composed screenshot showing all three in a single capture.
     2. **Budgets you define** — your own weekly/monthly dollar budget on
        pay-per-token accounts, with pace. (Uses the existing `budget` shot;
        the configuration screen does NOT get a screenshot.)
   - Pair 2 — Accounts:
     3. **Same provider, more than once** — two Claude Max subscriptions side by
        side via separate directories. **New screenshot required.**
     4. **Three agents, one view** — Claude Code, Codex, OpenCode; an account
        stands for who pays. (Uses the existing `harnesses` shot.)
   - Pair 3 — Control:
     5. **Price lists you manage** — built-in table, LiteLLM/CSV import,
        overrides, preview before import. (Uses the existing `prices` shot.)
     6. **Your bar, your way** — pick the entries and their order with a live
        preview. (Uses the existing `menubar-settings` shot.) This is the
        customization beat, distinct from the strip's at-a-glance beat.
5. **One-line strip** — mentions, no screenshots:
   - Notifications at your thresholds (today's alert threshold behaviour)
   - Shared budgets across accounts (several accounts under one budget)
   - Works offline
   - Adaptive refresh
   - Verified updates
   - Sign-in alerts
   The old "small things" section is absorbed here; there is no separate
   small-things row.
   (Dropped during review: "Limits freely definable" turned out to be the same
   capability as card 2 "Budgets you define," so it is not a separate line.)
6. **Privacy** — kept as is (reads from local directories, nothing leaves the
   machine).
7. **Closing CTA** — kept as is.

### Removed

- The "One JSON file" item (implementation detail).
- The nine-card grid structure and its three single-feature cards that now fold
  into card 1 (Plan limits, Pace, Details on demand) and the one-line strip
  (Alerts, Your bar when not card 6 — but it IS card 6 here, so Alerts only).

### Naming policy

- CodexBar: named, respected, positioned as the full-featured alternative.
- ClaudeBar and any other competitor: not named, not alluded to.

## What is left to the builder

- Exact wording of the hero subtitle tweak (if any), the niche statement, the
  six card titles/bodies, and the one-line strip entries. Draft in the voice of
  the existing copy; honest, calm, concrete, no dashes.
- Whether the niche statement is its own component or an extension of an
  existing one, and the grid's responsive layout for 2 x 3 (the current grid is
  `lg:grid-cols-3`; a pair layout likely wants `lg:grid-cols-2` or three rows of
  two).
- Updating `src/data/features.ts` to the six-card model and the one-line strip
  data shape, and updating `FeatureGrid.astro` / `SmallThings.astro` (or their
  replacements) accordingly.
- Updating `tests/page.test.ts` to match the new structure and copy (remove
  assertions tied to dropped cards/sections; add assertions for the niche
  statement and the new card set as appropriate).
- Nav/footer links: `Features` and `Privacy` remain; no new anchors unless the
  niche statement warrants one.
- Card image area: the screenshots should fill the card's image region nearly
  fully, with only a small margin to the border (see the fill requirement under
  phasing). Today's grid uses a fixed `h-[150px]` area with `object-contain` and
  `p-3.5` padding, which leaves small shots looking sparse; adjust the image-area
  height/padding/fit so a properly cropped capture fills it. This is the site
  side of the same fill requirement the app-repo captures must satisfy.

## Phasing and the screenshot dependency

This ships in two phases, and the site PR does **not** block on the app repo.

**Phase 1 (this repo, ships first):** the full restructure, copy, niche
statement, six-card grid, one-line strip, and test updates. For the two
screenshots that do not exist yet, use the nearest existing shots so the build
stays green:
- Card 1 "Usage at a glance": reuse the existing `dropdown` capture for now.
- Card 3 "Same provider, more than once": use a nearest-fit placeholder (there
  is no existing side-by-side shot), clearly tracked for replacement.
`Shot.astro` fails the build if a `<stem>-light/dark.webp` pair is missing, so
every referenced stem must have a pair present even in phase 1.

**Phase 2 (app repo `agentmeter`, tracked separately):** produce the two real
captures from the demo build and drop the obsolete ones. This is tracked in the
app repo brainstorm `brainstorm/30-site-reframe-screenshots.md` (created
alongside this design). It covers:
- Two new/recomposed captures: "usage at a glance" (one dropdown with plan
  limits, pace, and details expanded together) and "same provider, more than
  once" (two Claude Max accounts side by side via separate directories).
- Removing the now-unused captures from the site's asset set: `plan-limits`,
  `pace`, `details` (folded into card 1), `groups` and `alert` (demoted to
  one-line mentions). These come out of the `capture.sh` `STEMS` list too.
- **Fill requirement:** the new captures must fill the card's image area more or
  less fully, with only a small margin to the border. Crop them to roughly the
  card image aspect rather than leaving large empty padding, so the cards do not
  look sparse.

When phase 2 lands, swap the phase-1 placeholder stems for the real `.webp`
pairs in `src/assets/agenttacho/` and update any screenshot-stem assertions in
`tests/page.test.ts`.
