import { test } from 'node:test';
import assert from 'node:assert/strict';

import { getLatestRelease } from '../src/utils/release.ts';

const API = 'https://api.github.com/repos/agentmeter-dev/agentmeter/releases/latest';
const INFO = 'https://github.com/agentmeter-dev/agentmeter/releases/download/v0.4.1/release-info.json';

// Shaped like the app's Tests/UsageCoreTests/Fixtures/update/releases-latest.json.
function latest(tag: string, assetNames: string[]) {
  return {
    tag_name: tag,
    assets: assetNames.map((name) => ({
      name,
      browser_download_url: `https://github.com/agentmeter-dev/agentmeter/releases/download/${tag}/${name}`,
    })),
  };
}

type Route = { status: number; body?: unknown };

function stubFetch(routes: Record<string, Route>, seen: Request[] = []): typeof fetch {
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    seen.push(request);
    const route = routes[request.url];
    if (!route) return new Response('not found', { status: 404 });
    return new Response(JSON.stringify(route.body ?? {}), { status: route.status });
  }) as typeof fetch;
}

test('resolves version and dmg from the latest release', async () => {
  const fetchImpl = stubFetch({
    [API]: { status: 200, body: latest('v0.4.1', ['AgentMeter-0.4.1.dmg', 'release-info.json']) },
    [INFO]: { status: 200, body: { version: '0.4.1', dmg: 'AgentMeter-0.4.1.dmg' } },
  });
  const release = await getLatestRelease(fetchImpl);
  assert.equal(release.version, '0.4.1');
  assert.ok(release.dmgUrl.endsWith('/releases/download/v0.4.1/AgentMeter-0.4.1.dmg'));
  assert.equal(release.pageUrl, 'https://github.com/agentmeter-dev/agentmeter/releases/latest');
  assert.equal(release.fromFallback, false);
});

test('falls back when the API fails', async () => {
  const release = await getLatestRelease(stubFetch({ [API]: { status: 403 } }));
  assert.equal(release.version, '0.4.0');
  assert.ok(release.dmgUrl.endsWith('/releases/download/v0.4.0/AgentMeter-0.4.0.dmg'));
  assert.equal(release.fromFallback, true);
});

test('falls back when release-info is missing', async () => {
  const release = await getLatestRelease(
    stubFetch({ [API]: { status: 200, body: latest('v0.4.1', ['AgentMeter-0.4.1.dmg']) } })
  );
  assert.equal(release.version, '0.4.0');
  assert.equal(release.fromFallback, true);
});

test('falls back when the dmg is not an asset', async () => {
  const release = await getLatestRelease(
    stubFetch({
      [API]: { status: 200, body: latest('v0.4.1', ['AgentMeter-0.4.1-arm64.dmg', 'release-info.json']) },
      [INFO]: { status: 200, body: { version: '0.4.1', dmg: 'AgentMeter-0.4.1.dmg' } },
    })
  );
  assert.equal(release.version, '0.4.0');
  assert.equal(release.fromFallback, true);
});

test('falls back when the tag does not match release-info', async () => {
  const release = await getLatestRelease(
    stubFetch({
      [API]: { status: 200, body: latest('v0.4.1', ['AgentMeter-0.4.0.dmg', 'release-info.json']) },
      [INFO]: { status: 200, body: { version: '0.4.0', dmg: 'AgentMeter-0.4.0.dmg' } },
    })
  );
  assert.equal(release.fromFallback, true);
});

test('sends the token when given', async () => {
  const seen: Request[] = [];
  await getLatestRelease(stubFetch({ [API]: { status: 403 } }, seen), 't');
  assert.equal(seen[0]?.headers.get('authorization'), 'Bearer t');
});
