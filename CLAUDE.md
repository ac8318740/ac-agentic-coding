# ac-agentic-coding Development

## What This Repo Is

A plugin marketplace named **ac-agentic-coding**, hosted at
`ac8318740/ac-agentic-coding`. It serves Claude Code and Codex through separate
catalogs and documents native Pi installs.

The marketplace holds no plugin code. Claude Code reads
`.claude-plugin/marketplace.json`; Codex reads `.agents/plugins/marketplace.json`.

- **ACStack**, **open-designer**, and **agentic-retro** use npm packages
  `acstack`, `open-designer-viewer`, and `agentic-retro` at `latest` in both catalogs.
- **sticky-prompt-line** is Pi-only despite its retained legacy Git entry in the
  Claude catalog. It does not belong in the Codex catalog.
- **ac-teams** is a Pi-only npm package listed in the README, not either catalog.

Develop and release each plugin in its own repository. Publish and verify the
complete npm artifact before deploying its catalog changes. agentic-retro needs
0.1.10 or later; 0.1.9 omits its plugin hooks. Verify that `latest` selects the
compatible release before deployment. For ACStack's bundle-removal migration,
publish the marketplace switch before removing the tracked source bundle.
Tarballs must include their runtime assets. Preserve marketplace identity and
install commands.

## Repo Structure

```
.claude-plugin/marketplace.json   – Claude registry (npm and Git URL sources)
.agents/plugins/marketplace.json  – Native Codex registry (three npm plugins)
README.md                         – Plugin list, install commands, and rollout
tests/marketplace.test.mjs         – Static catalog checks
```

`plugins/` and `.claude/` are gitignored. A local clone under `plugins/` is a
convenience for side-by-side work, never the source installs use.

## Writing Standards

All prose in this project – commit messages, READMEs, skill docs, comments – must follow these rules:

- **En dashes (–) only.** Never em dashes.
- **Simple language.** Short sentences. Plain words over jargon.
- **Concise.** No filler, no repetition, no marketing tone.
- **Active voice.** "Add feature" not "Feature was added."

## Dev Skills

### `/sync-upstream` – Sync from upstream

Pulls workflow changes from the upstream project into ACStack. Diffs, classifies changes as generalizable vs project-specific, presents each for approval. This skill is gitignored – it's a development tool, not part of the published plugin.

## Key Context

- **Author pseudonym**: `ac8318740`

## Browser Automation

Use `agent-browser` (CDP-based, connects to the user's existing Chrome) for any browser interaction – snapshots, screenshots, clicks, form fills. Do not use the `webapp-testing` / Playwright skill in this repo; it launches its own headless browser and can't see the user's real session.

## Releasing open-designer

**Critical**: `open-designer` ships as BOTH a Claude plugin AND an npm package (`open-designer-viewer`, used via `npx open-designer-viewer`). These two MUST stay in lock-step.

**The rule (no exceptions):** any user-visible change in the open-designer repo – skills, README, briefing docs, `launcher/`, `viewer/`, anything a plugin consumer would notice – requires a plugin version bump AND an npm republish in the same commit. "Docs only" and "skills only" both count as user-visible: the plugin cache on each user's machine only picks up changes on a version bump, so without one the new docs/skills never reach anyone.

- Source of truth for the version is `.claude-plugin/plugin.json` in the open-designer repo.
- `package.json` is synced from it automatically – never edit its `version` by hand.
- To release: bump `plugin.json`, then run `npm run release` from the open-designer repo root. This syncs the version, builds the viewer, and publishes.
- Full details: `RELEASING.md` in the open-designer repo.

If you bump plugin.json and forget to republish to npm, users on `npx open-designer-viewer` stay stuck on the old version. If you change skills/docs without bumping plugin.json, users on any device never see the update.

## Commands

Marketplace checks: `node --test tests/marketplace.test.mjs` and
`claude plugin validate .claude-plugin/marketplace.json --strict`. The README
shows isolated Codex catalog validation. There is no repo-wide build or lint.
Per-plugin commands:

- open-designer repo: `npm run build:viewer`, `npm run sync-version`, `npm run release`.
- acstack repo: use its release and packaging commands to build and validate the npm artifact. Never remove the CLI from the tarball when removing tracked generated files.
