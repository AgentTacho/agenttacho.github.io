# agenttacho.github.io

The website of [AgentTacho](https://github.com/AgentTacho/agenttacho), a macOS menu bar app that shows the plan limits and budgets of Claude Code, Codex and OpenCode.

Built with [Astro](https://astro.build) and the [AstroWind](https://github.com/arthelokyo/astrowind) template, starting from the [sandcast site](https://github.com/sandcast-dev/sandcast-dev.github.io).

## Develop

```bash
npm ci
npm run dev        # http://localhost:4321
npm run check      # astro check, ESLint, Prettier
npm run build      # static site in dist/
npm test           # release lookup and page contract tests (after a build)
```

The download button shows the latest release. The build reads it from the GitHub API; set `GITHUB_TOKEN` to avoid rate limits. If the API cannot be reached, the build uses `src/data/release-fallback.json`.

## Deploy

GitHub Actions builds on every push to `main`, daily, and on demand (`gh workflow run deploy.yml`). The deploy job runs only when the repository variable `SITE_LIVE` is `true`.

The AgentTacho release script triggers `deploy.yml` after each release, so the download button follows new versions within minutes. The daily run is only a safety net: GitHub turns off scheduled workflows in a public repository after 60 days without activity, so re-enable it under Actions if it shows as disabled. A build that cannot reach the GitHub API uses `src/data/release-fallback.json` and marks the run with a warning; update that file with each release.

## License

The template code is MIT licensed (see `LICENSE.md`). AgentTacho itself is Apache 2.0.
