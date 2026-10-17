// Page contract for the landing page (brainstorm 18): checks the built
// dist/index.html, so run `npm run build` first. The HTML is minified, so
// attribute values may come without quotes; the patterns allow both.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const DIST = new URL('../dist/index.html', import.meta.url);
const built = existsSync(DIST);
const html = built ? readFileSync(DIST, 'utf8') : '';
const skip = built ? false : 'dist/index.html is missing; run `npm run build` first';

const text = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ');

const GITHUB = 'https://github.com/AgentTacho/agenttacho';
const SPONSOR = 'https://github.com/sponsors/rhuss';
const SUBTITLE = 'Plan limits and budgets for Claude Code, Codex and OpenCode, in one line of your menu bar.';

function count(pattern: RegExp): number {
  return (html.match(new RegExp(pattern.source, 'g')) ?? []).length;
}

test('has the headline and subtitle', { skip }, () => {
  assert.ok(text.includes('Usage at a glance.'), 'headline first line');
  assert.ok(text.includes('Nothing more.'), 'headline second line');
  assert.ok(text.includes(SUBTITLE), 'subtitle');
});

test('has the download button with a version', { skip }, () => {
  const links = [...html.matchAll(/<a\b[^>]*href="?([^"\s>]+)"?[^>]*>([\s\S]*?)<\/a>/g)];
  const download = links.find(([, href]) =>
    /\/releases\/download\/v\d+\.\d+\.\d+\/[A-Za-z]+-\d+\.\d+\.\d+\.dmg$/.test(href)
  );
  assert.ok(download, 'a link to a release DMG');
  const version = download[1].match(/\/v(\d+\.\d+\.\d+)\//)?.[1];
  assert.ok(download[2].replace(/<[^>]+>/g, '').includes(`v${version}`), 'the button names the version');
});

test('labels the budget row without a period', { skip }, () => {
  // ClaudeBar's Bedrock budget is daily, so the row must not say "weekly or monthly".
  assert.ok(text.includes('Dollar budgets you set'), 'budget row label');
  assert.ok(!/weekly or monthly dollar budgets/i.test(text), 'no period in the row label');
});

test('states the system requirements', { skip }, () => {
  // The app README: "macOS 14 or newer on Apple Silicon".
  assert.ok(text.includes('macOS 14+ on Apple Silicon'), 'requirements line names Apple Silicon');
});

test('links GitHub and Sponsors', { skip }, () => {
  assert.ok(html.includes(GITHUB), 'GitHub repository link');
  assert.ok(html.includes(SPONSOR), 'Sponsors link');
});

test('has the sections', { skip }, () => {
  for (const id of ['features', 'privacy', 'compare']) {
    assert.match(html, new RegExp(`id="?${id}"?[\\s>]`), `section #${id}`);
  }
});

test('has nine feature cards in three rows', { skip }, () => {
  assert.equal(count(/data-feature-card/), 9);
  const labels = [...html.matchAll(/data-feature-row[^>]*>([^<]+)</g)].map(([, label]) => label.trim());
  assert.deepEqual(labels, ['Limits', 'Budgets', 'Your setup']);
});

test('has the small things', { skip }, () => {
  assert.equal(count(/data-small-thing/), 5);
});

test('every feature image has a dark variant', { skip }, () => {
  // Each card is an <article data-feature-card>; its markup ends at </article>.
  const cards = html.split(/data-feature-card/).slice(1);
  assert.equal(cards.length, 9);
  for (const card of cards) {
    const body = card.split('</article>')[0];
    assert.match(body, /data-theme-variant="?light/, 'light variant');
    assert.match(body, /data-theme-variant="?dark/, 'dark variant');
  }
});

test('avoids forbidden copy', { skip }, () => {
  for (const phrase of [
    /calm glance/i,
    /no dashboard/i,
    /without a dashboard/i,
    /the only (private|tracker|menu bar)/i,
  ]) {
    assert.doesNotMatch(text, phrase);
  }
  // Built from code points so no formatter turns them into literal dashes.
  assert.ok(!html.includes(String.fromCharCode(0x2014)), 'no em dash');
  assert.ok(!html.includes(String.fromCharCode(0x2013)), 'no en dash');
});
