# Positioning Refresh (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reword the landing page's hero, metadata, comparison table, and social card to lead on budgets and the many-accounts-one-budget strength, dropping the generic "menu bar app" / "one line" claims.

**Architecture:** Astro static site. Copy lives in `.astro` components and `src/data/*.ts`; the social card is a baked PNG built by a shell script. Tests assert on the built `dist/index.html` (`npm run build` then `npm test`). Each task updates the test first, builds, watches it fail, then changes the copy and watches it pass.

**Tech Stack:** Astro v7, TypeScript, `node --test`, ImageMagick (`magick`) for the social card.

**Spec:** `docs/superpowers/specs/2026-10-18-positioning-refresh-design.md` (Phase 1 only; the spec's Phase 2 spotlight band is out of scope here, as it depends on an `agentmeter` capture).

## Global Constraints

- **No em-dash or en-dash** anywhere in copy. Use commas, parentheses, or separate sentences. (Enforced by the existing `avoids forbidden copy` test.)
- **Keep the SEO title** `AgentTacho: usage at a glance` in `src/config.yaml` (`metadata.title.default` and `template`) and the OG `site_name`. Do not change it.
- **Keep the requirements line** text `macOS 14+ on Apple Silicon` in the hero meta line (only `signed and notarized` is removed).
- **Comparison is a dated, fair table.** Any claim about a competitor is verified against that project's current README/docs, and `comparison.checked` is bumped to the verification date. Do not invent competitor facts.
- **Node >= 22.22.3** (the test runner uses `node --test`).
- New body prose that we author (the comparison intro sentence, the new row label) stays plain and dash-free; the hero eyebrow/headline/tagline are the exact strings decided in the spec and are used verbatim.

## Review Focus

- **Em/en dash in any new string** — covered by the `avoids forbidden copy` test; make sure that test runs green after every copy task.
- **Hero tagline and `metadata.description` drifting apart** — both change in Task 1; a reader seeing the visible tagline and a crawler seeing the meta description should get the same substance. Pinned by Task 1's test on the visible tagline plus a manual check of the meta string.
- **`og.png` still showing the old slogan** — the card is a baked image with no automated test; Task 4 ends with a visual confirmation step that the regenerated card shows the new headline.
- **Comparison cell type change breaking the render** — flipping `'No'`/`'None'` strings to `true`/`false` changes how `Compare.astro` renders those cells (icon vs text); Task 2's test asserts the new labels render and the build succeeds.
- **"one line" surviving somewhere** — it appears in the hero tagline, the config description, the comparison intro, and the comparison "Menu bar" row; Task 1 and Task 2 each remove their copy, and Task 2's test asserts the phrase is gone from the page.

---

### Task 1: Hero copy, metadata description, drop "signed and notarized"

**Files:**

- Modify: `src/components/agenttacho/Hero.astro` (eyebrow, H1, tagline, meta line)
- Modify: `src/config.yaml` (`metadata.description`)
- Test: `tests/page.test.ts`

**Interfaces:**

- Produces: the visible strings later tasks and tests rely on — eyebrow `Budgets and limits for coding agents`; headline lines `One glance.` and `Every account.`; tagline `See what's left and whether it lasts to the reset, across all your models and accounts, including several on the same provider.`

- [ ] **Step 1: Update the page test to the new hero copy**

In `tests/page.test.ts`, change the `SUBTITLE` constant to the new tagline and rewrite the `has the headline and subtitle` test:

```ts
const SUBTITLE =
  "See what's left and whether it lasts to the reset, across all your models and accounts, including several on the same provider.";

test('has the headline and subtitle', { skip }, () => {
  assert.ok(text.includes('One glance.'), 'headline first line');
  assert.ok(text.includes('Every account.'), 'headline second line');
  assert.ok(text.includes(SUBTITLE), 'subtitle');
  assert.ok(!/signed and notarized/i.test(text), 'no signed-and-notarized badge');
});
```

- [ ] **Step 2: Build and run the test to verify it fails**

Run: `npm run build && npm test`
Expected: FAIL on `has the headline and subtitle` (dist still has the old copy).

- [ ] **Step 3: Apply the new copy in `Hero.astro`**

- Eyebrow `<p>`: `Budgets and limits for coding agents`.
- `<h1>`: first line `One glance.`, accent `<span class="text-accent">` second line `Every account.`.
- Tagline `<p>`: the `SUBTITLE` string above.
- Meta line: remove `signed and notarized ·` so it reads `Free and open source · macOS 14+ on Apple Silicon ·&nbsp;` followed by the existing `<details>`.

- [ ] **Step 4: Update `metadata.description` in `src/config.yaml`**

Set it to a dash-free description matching the new tagline's substance while keeping the agent names for SEO, e.g. `Budgets and limits for Claude Code, Codex and OpenCode. See what's left and whether it lasts, across every account, including several on one provider.` Leave `metadata.title` unchanged. Note: the value contains an apostrophe, so in YAML either use double quotes or double the apostrophe inside single quotes (`what''s`); run `npm run build` to confirm the config parses.

- [ ] **Step 5: Build and run the full test suite**

Run: `npm run build && npm test`
Expected: PASS (including `avoids forbidden copy`, `states the system requirements`, `links GitHub and Sponsors`).

- [ ] **Step 6: Commit**

```bash
git add src/components/agenttacho/Hero.astro src/config.yaml tests/page.test.ts
git commit -m "feat: lead the hero on budgets and accounts"
```

---

### Task 2: Comparison flip, intro rewrite, remove the "one line" row

**Files:**

- Modify: `src/data/comparison.ts` (two row labels + values, remove one row)
- Modify: `src/components/agenttacho/Compare.astro` (intro paragraph)
- Test: `tests/page.test.ts`

**Interfaces:**

- Consumes: `comparison.rows` / `Compare.astro`'s existing render (`true` -> check icon, `false` -> minus icon, string -> text).
- Produces: comparison rows labelled `No browser cookies` and `No telemetry` where a checkmark means the good thing; no `Menu bar` / "one line" row.

- [ ] **Step 1: Add a comparison test**

In `tests/page.test.ts`:

```ts
test('comparison flips to checkmark-means-good and drops one line', { skip }, () => {
  assert.ok(text.includes('No browser cookies'), 'cookies row relabelled');
  assert.ok(text.includes('No telemetry'), 'telemetry row relabelled');
  assert.ok(!/reads browser cookies/i.test(text), 'old cookies label gone');
  assert.ok(!/one line/i.test(text), 'no "one line" claim anywhere');
});
```

- [ ] **Step 2: Build and run the test to verify it fails**

Run: `npm run build && npm test`
Expected: FAIL on the new test.

- [ ] **Step 3: Edit the rows in `comparison.ts`**

- Rename `Reads browser cookies` to `No browser cookies`; values become `[true, 'Optional', 'Optional (session key)', 'Optional', true]` (the two that do not read cookies become `true`; the "Optional" ones stay as text).
- Rename `Telemetry` to `No telemetry`; values become `[true, 'Not stated', false, 'Not stated', 'Not stated']` (None becomes `true`; the anonymous heartbeat becomes `false`; unknown stays `'Not stated'`).
- Remove the `Menu bar` row (the `'One line, entries you choose'` row) entirely. The replacement row is added in Task 3.

- [ ] **Step 4: Rewrite the intro paragraph in `Compare.astro`**

Replace `and keeps the menu bar to one line.` so the sentence ends `and shows every account in one view.` Keep the rest of the paragraph (CodexBar covers far more providers; AgentTacho's budget and shared-budget strengths).

- [ ] **Step 5: Build and run the full test suite**

Run: `npm run build && npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/comparison.ts src/components/agenttacho/Compare.astro tests/page.test.ts
git commit -m "feat: comparison leads on one view, not one line"
```

---

### Task 3: Add the "Everything in one view" comparison row (verified facts)

**Files:**

- Modify: `src/data/comparison.ts` (new row + `checked` date)
- Test: `tests/page.test.ts`

**Interfaces:**

- Consumes: the five-column order `['AgentTacho', 'CodexBar', 'Claude Usage Tracker', 'ClaudeBar', 'ccusage']` from `comparison.columns`.
- Produces: a row labelled `Everything in one view`.

- [ ] **Step 1: Verify each competitor's behavior**

For CodexBar, Claude Usage Tracker, ClaudeBar, and ccusage, read each project's current README/docs and decide, for "shows every account and model in one consolidated view at once", whether it is `true`, `false`, or a short descriptive string (for example `One item per provider`). Record the source per cell. AgentTacho is `true`.

- [ ] **Step 2: Add the failing test**

```ts
test('comparison has the one-view row', { skip }, () => {
  assert.ok(text.includes('Everything in one view'), 'one-view row present');
});
```

- [ ] **Step 3: Build and run the test to verify it fails**

Run: `npm run build && npm test`
Expected: FAIL on the new test.

- [ ] **Step 4: Add the row and bump the date in `comparison.ts`**

Append a row `{ label: 'Everything in one view', values: [true, <...verified cells in column order...>] }`. Set `checked` to the date the facts were verified in Step 1 (format `YYYY-MM-DD`).

- [ ] **Step 5: Build and run the full test suite**

Run: `npm run build && npm test`
Expected: PASS. Confirm the `As of <date>` caption shows the bumped date.

- [ ] **Step 6: Commit**

```bash
git add src/data/comparison.ts tests/page.test.ts
git commit -m "feat: comparison row for one consolidated view"
```

---

### Task 4: Regenerate the social card

**Files:**

- Modify: `scripts/make-og.sh` (the baked headline and sub-text)
- Regenerate: `src/assets/images/og.png`

**Interfaces:**

- Consumes: the hero copy from Task 1 (the card mirrors the page).

- [ ] **Step 1: Update the text baked into `make-og.sh`**

In the `magick ... -annotate` lines, replace `Usage at a glance.` / `Nothing more.` with `One glance.` / `Every account.`, and replace the two sub-text lines (`Plan limits and budgets for Claude Code, Codex` / `and OpenCode, in one line of your menu bar.`) with two dash-free lines matching the new tagline's substance, for example `See what's left and whether it lasts, across` / `every account, including several on one provider.` Keep the layout, colors, mascot, and menu-bar shot.

- [ ] **Step 2: Regenerate the card**

Run: `scripts/make-og.sh`
Expected: exits 0 and prints `wrote src/assets/images/og.png`.

- [ ] **Step 3: Visually confirm the card**

Open `src/assets/images/og.png` and confirm it shows `One glance.` / `Every account.` and the new sub-text, with no old "one line" wording and no dashes.

- [ ] **Step 4: Commit**

```bash
git add scripts/make-og.sh src/assets/images/og.png
git commit -m "chore: regenerate social card for the new hero"
```

---

## Notes on spec coverage

- **Spec Decision 5 (tone pass)** is satisfied by Tasks 1-3: the hero and the comparison intro carry the calm/gauge framing. A broader page rewrite is a spec anti-goal, so no separate tone task is created.
- **Spec Decision 3 (spotlight band) and the Cross-Repo Dependencies** are Phase 2 and are intentionally not in this plan; they wait on an `agentmeter` capture run.
