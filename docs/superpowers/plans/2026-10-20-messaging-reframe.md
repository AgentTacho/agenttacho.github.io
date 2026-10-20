# Landing Page Messaging Reframe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the landing page from a feature catalogue into a focused positioning page: calm, usage-and-budgets, every account on one glance, with an honest CodexBar-respecting niche statement and a slimmer feature set.

**Architecture:** Astro static site. Content lives in `src/data/features.ts`; sections are components under `src/components/agenttacho/` composed in `src/pages/index.astro`. Screenshots render through `Shot.astro` from `src/assets/agenttacho/<stem>-{light,dark}.webp`. Tests assert against the built `dist/index.html`.

**Tech Stack:** Astro, TypeScript, Tailwind, `astro-icon`, `node:test`.

**Spec:** `docs/superpowers/specs/2026-10-20-messaging-reframe-design.md`

## Global Constraints

- No em-dash (U+2014) or en-dash (U+2013) anywhere in copy. The existing test in `tests/page.test.ts` enforces this; keep it.
- New copy must not match the forbidden-copy patterns already tested: `/calm glance/i`, `/no dashboard/i`, `/without a dashboard/i`, `/the only (private|tracker|menu bar)/i`.
- Niche statement carries NO hard numbers: no star count, no provider count. Qualitative framing only.
- CodexBar canonical URL (link target): `https://github.com/steipete/CodexBar`. External links open with `target="_blank"` and `rel="noopener noreferrer"` (match Hero's GitHub link).
- Every `Shot` stem referenced on the page must have both `<stem>-light.webp` and `<stem>-dark.webp` present in `src/assets/agenttacho/`, or `npm run build` throws (`Shot.astro:26`).
- Tests read the built file: run `npm run build` before `npm test`. `npm run check` (astro + eslint + prettier) must also pass before each commit.
- New human-readable prose (niche statement, card bodies, one-liner bodies) is produced with the prose plugin (`prose:content-generator` / `prose:humanizer`) per the global writing-style standard, within the phrase constraints above and in the voice of the existing copy (honest, calm, concrete).
- Tone throughout: confident and respectful, never apologetic, never a dig at any competitor. ClaudeBar is not named or alluded to.

## Review Focus

- **Theme variants:** every feature card's screenshot needs both a light and a dark variant, including the new `same-provider` placeholder. Covered by the extended `every feature image has a dark variant` test in Task 2.
- **External link safety:** the CodexBar link must be `target="_blank"` + `rel="noopener noreferrer"`. Covered by the niche test in Task 1.
- **Numbers leaking into positioning:** a stale "22k" or provider count must never render in the niche block. Covered by the "no digits in the niche block" assertion in Task 1.
- **Stale removed copy:** "One JSON file" must not survive anywhere on the page. Covered by the absence assertion in Task 3.
- **Dash characters in new prose:** any dash introduced by generated copy fails the build contract. Covered by the existing em/en-dash assertions in `avoids forbidden copy`.

---

### Task 1: Niche statement section

**Files:**

- Create: `src/components/agenttacho/Niche.astro`
- Modify: `src/navigation.ts` (add `CODEXBAR` constant)
- Modify: `src/pages/index.astro` (insert `<Niche />` between `<MenuBarStrip />` and `<FeatureGrid />`)
- Test: `tests/page.test.ts`

**Interfaces:**

- Produces: `export const CODEXBAR = 'https://github.com/steipete/CodexBar'` in `src/navigation.ts`; `Niche.astro` (no props), whose root element carries `data-niche` so tests can isolate its text.

- [ ] **Step 1: Write the failing test** in `tests/page.test.ts`:

```ts
test('names and links CodexBar in the niche statement', { skip }, () => {
  const niche = html.split('data-niche')[1]?.split('</section>')[0] ?? '';
  assert.ok(niche, 'niche section present');
  const nicheText = niche.replace(/<[^>]+>/g, ' ');
  assert.ok(/CodexBar/.test(nicheText), 'names CodexBar');
  assert.doesNotMatch(nicheText, /\d/, 'no numbers in the niche statement');
  assert.match(niche, /href="?https:\/\/github\.com\/steipete\/CodexBar/, 'links CodexBar');
  const link = niche.match(/<a\b[^>]*steipete\/CodexBar[^>]*>/)?.[0] ?? '';
  assert.match(link, /target="?_blank/, 'opens in a new tab');
  assert.match(link, /rel="?[^"]*noopener/, 'rel noopener');
});
```

- [ ] **Step 2: Run build then test to verify it fails**

Run: `npm run build && npm test`
Expected: FAIL on the new test (no `data-niche` in output).

- [ ] **Step 3: Add `CODEXBAR` to `src/navigation.ts`** next to the existing `GITHUB`/`SPONSOR` constants.

- [ ] **Step 4: Create `src/components/agenttacho/Niche.astro`** — a `<section>` whose root (or an inner marker element) has `data-niche`, with a heading and one or two short paragraphs. Generate the prose with the prose plugin under the Global Constraints. Required substance: AgentTacho is deliberately focused on usage and budgets with every account on one screen; it does not aim to be everything; CodexBar is the bigger, more feature-rich project with far more providers and a great choice if you want all of that; AgentTacho stays small on purpose; the reader gets to choose. Link "CodexBar" to `CODEXBAR` with `target="_blank" rel="noopener noreferrer"`. No digits, no dashes, none of the forbidden phrases. Match the section styling of `Privacy.astro` / `FeatureGrid.astro` (container width, padding, heading classes).

- [ ] **Step 5: Insert `<Niche />` in `src/pages/index.astro`** between `<MenuBarStrip />` and `<FeatureGrid />`, with the matching import.

- [ ] **Step 6: Run build + test + check to verify pass**

Run: `npm run build && npm test && npm run check`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/agenttacho/Niche.astro src/navigation.ts src/pages/index.astro tests/page.test.ts
git commit -m "feat: add the niche positioning statement"
```

---

### Task 2: Six-card grid (2 x 3)

**Files:**

- Modify: `src/data/features.ts` (`featureRows`)
- Modify: `src/components/agenttacho/FeatureGrid.astro`
- Modify: `scripts/make-placeholders.sh` (add `same-provider`)
- Create: `src/assets/agenttacho/same-provider-light.webp`, `src/assets/agenttacho/same-provider-dark.webp` (placeholders, via the script)
- Test: `tests/page.test.ts`

**Interfaces:**

- Consumes: `Shot` stems `dropdown`, `budget`, `same-provider`, `harnesses`, `prices`, `menubar-settings` (all must have `.webp` pairs).
- Produces: `featureRows` with three entries, labels in order `['Usage & limits', 'Accounts', 'Control']`, each with exactly two `Feature` objects. Card titles and stems are pinned (below); bodies and `alt` are generated prose within constraints.

Pinned card set (pair order, then within-pair order):

1. Usage & limits — "Usage at a glance" (`stem: 'dropdown'`), "Budgets you define" (`stem: 'budget'`)
2. Accounts — "Same provider, more than once" (`stem: 'same-provider'`), "Three agents, one view" (`stem: 'harnesses'`)
3. Control — "Price lists you manage" (`stem: 'prices'`), "Your bar, your way" (`stem: 'menubar-settings'`)

- [ ] **Step 1: Update the failing tests** in `tests/page.test.ts`:
  - Replace `has nine feature cards in three rows` with:

```ts
test('has six feature cards in three pairs', { skip }, () => {
  assert.equal(count(/data-feature-card/), 6);
  // HTML-encodes the ampersand, so decode before comparing.
  const labels = [...html.matchAll(/data-feature-row[^>]*>([^<]+)</g)].map(([, l]) => l.trim().replace(/&amp;/g, '&'));
  assert.deepEqual(labels, ['Usage & limits', 'Accounts', 'Control']);
});
```

- In `every feature image has a dark variant`, change both the expected `cards.length` and the split count from `9` to `6`.

- [ ] **Step 2: Run build then test to verify it fails**

Run: `npm run build && npm test`
Expected: FAIL (still nine cards / old labels; build may also fail once stems change in Step 4 before placeholders exist — see Step 3).

- [ ] **Step 3: Add `same-provider` to `scripts/make-placeholders.sh`** (a `1660x400`-class entry alongside the other card stems) and run `scripts/make-placeholders.sh` to write the light+dark pair. Confirm `src/assets/agenttacho/same-provider-light.webp` and `-dark.webp` exist.

- [ ] **Step 4: Rewrite `featureRows` in `src/data/features.ts`** to the pinned six-card model above: three rows, two features each, with the pinned titles and stems. Generate each `body` and `alt` with the prose plugin under the Global Constraints (card 1 body describes plan limits, pace, and expanded details in one view; others per the design). Remove the now-unused single-feature entries (Plan limits, Pace, Details on demand, Shared budgets, Alerts and colors).

- [ ] **Step 5: Update `src/components/agenttacho/FeatureGrid.astro`** — change the grid from `lg:grid-cols-3` to `lg:grid-cols-2`; adjust the image area so a properly cropped capture fills it with only a small margin (reduce the `p-3.5` padding and/or raise the `h-[150px]` image-area height, keeping `object-contain`); update the section heading away from "Everything in one menu." to a focused line (generated prose, no dashes). Keep the `data-feature-row` and `data-feature-card` markers and the light/dark `Shot` rendering.

- [ ] **Step 6: Run build + test + check to verify pass**

Run: `npm run build && npm test && npm run check`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/data/features.ts src/components/agenttacho/FeatureGrid.astro scripts/make-placeholders.sh src/assets/agenttacho/same-provider-light.webp src/assets/agenttacho/same-provider-dark.webp tests/page.test.ts
git commit -m "feat: slim the feature grid to six cards in three pairs"
```

---

### Task 3: One-line strip

**Files:**

- Modify: `src/data/features.ts` (`smallThings`)
- Modify: `src/components/agenttacho/SmallThings.astro` (heading copy only, if needed)
- Test: `tests/page.test.ts`

**Interfaces:**

- Produces: `smallThings` array of six `{ title, body, icon }` entries.

Pinned entries (title + icon pinned; body generated prose):

- "Notifications" (`tabler:bell`) — usage crossing your thresholds, 80% and 100% by default.
- "Shared budgets" (`tabler:building`) — several accounts under one budget.
- "Works offline" (`tabler:wifi-off`)
- "Adaptive refresh" (`tabler:battery-eco`)
- "Verified updates" (`tabler:shield-check`)
- "Sign-in alerts" (`tabler:key`)

Removed: "One JSON file".

- [ ] **Step 1: Update the failing tests** in `tests/page.test.ts`:

```ts
test('has the one-line strip', { skip }, () => {
  assert.equal(count(/data-small-thing/), 6);
  assert.ok(text.includes('Shared budgets'), 'shared budgets demoted to a one-liner');
  assert.ok(text.includes('Notifications'), 'notifications mentioned');
  assert.ok(!/one json file/i.test(text), 'one JSON file removed');
});
```

(Replace the old `has the small things` test.)

- [ ] **Step 2: Run build then test to verify it fails**

Run: `npm run build && npm test`
Expected: FAIL (count is 5; "One JSON file" still present; "Shared budgets"/"Notifications" absent from the strip).

- [ ] **Step 3: Rewrite `smallThings` in `src/data/features.ts`** to the six pinned entries, dropping "One JSON file" and adding "Notifications" and "Shared budgets". Generate bodies with the prose plugin under the Global Constraints. Adjust the `SmallThings.astro` heading if it no longer fits (generated prose, no dashes); the markup and `data-small-thing` marker stay.

- [ ] **Step 4: Run build + test + check to verify pass**

Run: `npm run build && npm test && npm run check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/features.ts src/components/agenttacho/SmallThings.astro tests/page.test.ts
git commit -m "feat: demote self-evident features to a one-line strip"
```

---

## Notes for the executor

- Hero and MenuBarStrip copy stay unchanged: "One glance. Every account." and "One number per plan or budget." already fit the reframe, and the `SUBTITLE` test must keep passing.
- Nav/footer links (`Features`, `Privacy`) are unchanged; the niche statement gets no nav anchor.
- Screenshots for card 1 (`dropdown`, reused) and card 3 (`same-provider`, placeholder) are phase-1 stand-ins. The real captures are tracked in the app repo (`agentmeter/brainstorm/30-site-reframe-screenshots.md`); swapping them in and updating any stem assertions is phase-2 follow-up, out of scope here.
- Work on a dedicated branch off `main` (e.g. `messaging-reframe`); open one PR at the end.
