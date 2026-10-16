// The latest AgentMeter release, read at build time so the download button
// shows the current version and links straight to its DMG (brainstorm 18,
// "Latest version and download link"). It reads the same files the app's
// update check uses: the GitHub release and its release-info.json. Any error
// or inconsistency falls back to the last known release in
// src/data/release-fallback.json, so a build never fails or links nowhere.
//
// Uses erasable TypeScript only: the tests run it under Node's type stripping.

import fallback from '../data/release-fallback.json' with { type: 'json' };

export interface Release {
  version: string;
  dmgUrl: string;
  pageUrl: string;
  fromFallback: boolean;
}

const REPO = 'agentmeter-dev/agentmeter';
const API_LATEST = `https://api.github.com/repos/${REPO}/releases/latest`;
const PAGE_URL = `https://github.com/${REPO}/releases/latest`;
const TIMEOUT_MS = 10_000;

interface Asset {
  name: string;
  browser_download_url: string;
}

interface LatestResponse {
  tag_name?: string;
  assets?: Asset[];
}

interface ReleaseInfo {
  version?: string;
  dmg?: string;
}

function downloadUrl(version: string, dmg: string): string {
  return `https://github.com/${REPO}/releases/download/v${version}/${dmg}`;
}

function fromFallback(reason: string): Release {
  console.warn(`[release] using fallback ${fallback.version}: ${reason}`);
  return {
    version: fallback.version,
    dmgUrl: downloadUrl(fallback.version, fallback.dmg),
    pageUrl: PAGE_URL,
    fromFallback: true,
  };
}

async function getJson<T>(fetchImpl: typeof fetch, url: string, headers: Record<string, string>): Promise<T> {
  const response = await fetchImpl(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  return (await response.json()) as T;
}

export async function getLatestRelease(fetchImpl: typeof fetch = fetch, token?: string): Promise<Release> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const latest = await getJson<LatestResponse>(fetchImpl, API_LATEST, headers);
    const assets = latest.assets ?? [];
    const infoAsset = assets.find((asset) => asset.name === 'release-info.json');
    if (!infoAsset) return fromFallback('release has no release-info.json');

    const info = await getJson<ReleaseInfo>(fetchImpl, infoAsset.browser_download_url, {});
    const { version, dmg } = info;
    if (!version || !dmg) return fromFallback('release-info.json lacks version or dmg');
    if (latest.tag_name !== `v${version}`) return fromFallback(`tag ${latest.tag_name} does not match ${version}`);
    const dmgAsset = assets.find((asset) => asset.name === dmg);
    if (!dmgAsset) return fromFallback(`${dmg} is not an asset of ${latest.tag_name}`);

    return { version, dmgUrl: dmgAsset.browser_download_url, pageUrl: PAGE_URL, fromFallback: false };
  } catch (error) {
    return fromFallback(error instanceof Error ? error.message : String(error));
  }
}
