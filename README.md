# AC's Agentic Coding Marketplace

Plugins and Pi extensions for spec-driven development, design work, and agent ergonomics.

## What installs where

| Plugin or extension | Claude Code | Codex | Pi |
| ------------------- | ----------- | ----- | -- |
| [ACStack](https://github.com/ac8318740/acstack) | Yes | Yes | Yes |
| [open-designer](https://github.com/ac8318740/open-designer) | Yes | Yes | Yes |
| [agentic-retro](https://github.com/ac8318740/agentic-retro) | Yes | Yes | Yes |
| [sticky-prompt-line](https://github.com/ac8318740/sticky-prompt-line) | No | No | Yes |
| [ac-teams](https://github.com/ac8318740/ac-teams) | No | No | Yes (Linux) |

Claude Code and Codex use separate catalogs in this repository. Both install ACStack, open-designer, and agentic-retro from npm. GitHub repository links identify the source projects; the catalog's `source` field controls installation.

agentic-retro requires version 0.1.10 or later for npm plugin hooks. Version 0.1.9 includes skills and the CLI but omits automatic session capture and startup notices. Publish and verify the compatible release before deploying these catalog changes.

Pi installs native packages from npm with `pi install npm:<package>`. `sticky-prompt-line` and `ac-teams` are Pi-only extensions. `open-designer` also ships `open-designer-viewer` for local browser previews.

## Claude Code install

Install the marketplace once:

```text
/plugin marketplace add ac8318740/ac-agentic-coding
```

Install any Claude Code plugin from this marketplace:

```text
/plugin install acstack@ac-agentic-coding
/plugin install open-designer@ac-agentic-coding
/plugin install agentic-retro@ac-agentic-coding
```

The catalogs select `latest` from `acstack`, `open-designer-viewer`, and `agentic-retro`. npm must be available. ACStack and agentic-retro include their CLI runtimes; open-designer includes its viewer launcher. Claude Code cannot install `sticky-prompt-line` or `ac-teams`.

## Codex install

Install the marketplace once:

```text
codex plugin marketplace add ac8318740/ac-agentic-coding
```

Install the plugins you want:

```text
codex plugin add acstack@ac-agentic-coding
codex plugin add open-designer@ac-agentic-coding
codex plugin add agentic-retro@ac-agentic-coding
```

The native catalog uses Codex CLI's npm source support, checked with version 0.163.0. npm must be available. Codex downloads packages with lifecycle scripts disabled, so published packages must include their runtime assets.

Enable and trust ACStack's hooks when Codex asks. Its SessionStart hooks inject orchestrator instructions and install generated subagent definitions into `$CODEX_HOME/agents` (default `~/.codex/agents`), preserving user-owned definitions. Start a fresh session after installation so Codex discovers the agents. Declining hooks leaves this startup behavior inactive.

Open-designer exposes `design-system`, `design`, and `design-integrate`. Follow its guide to launch the local viewer and configure optional integrations.

Agentic-retro exposes `setup`, `retro`, `review`, and `run`. Trust its session hooks to enable automatic capture and startup notices. Follow its setup guide before enabling background runs.

ACStack's published version 0.57.10 was checked with trusted native hook dispatch, complete startup instructions, and named-agent delegation. Before changing either catalog's npm source, verify the actual published package; skill discovery alone does not prove its hooks or runtime work.

## Pi install

Install the Pi packages you want from npm:

```text
pi install npm:@tintinweb/pi-subagents
pi install npm:acstack
pi install npm:open-designer-viewer
pi install npm:agentic-retro
pi install npm:sticky-prompt-line
pi install npm:ac-teams
```

`@tintinweb/pi-subagents` provides a subagent runtime for ACStack. `ac-teams` provides persistent Pi agent teams on Linux; follow its guide for supported Node and Pi versions. The other packages do not need a subagent runtime.

The native `agentic-retro` package includes its CLI. Do not also run the legacy `agentic-retro install-pi` installer.

The `open-designer-viewer` package includes the viewer and native Pi workflows. Restart Pi or run `/reload`, then start with `/open-designer:design-system`.

## Setup details

Each plugin lives in its own repository. Follow its guide for setup and requirements:

- [ACStack](https://github.com/ac8318740/acstack#1-quickstart)
- [open-designer](https://github.com/ac8318740/open-designer#readme)
- [agentic-retro](https://github.com/ac8318740/agentic-retro#install)
- [sticky-prompt-line](https://github.com/ac8318740/sticky-prompt-line#readme)
- [ac-teams](https://github.com/ac8318740/ac-teams#readme)

## npm release order

Publish and verify each plugin's complete npm package before deploying a catalog change. agentic-retro 0.1.10 is the minimum compatible npm plugin release; confirm it is public and selected by `latest` first. Check registry installation, packaged CLI commands, and trusted hooks in both hosts. Never treat a Git checkout or local tarball as proof of the public artifact.

ACStack's bundle-removal migration follows this order:

1. In ACStack, dispatch `gh workflow run tag-release.yml --ref <release-branch>` on the reviewed branch before promoting bundle removal to `main`. Branch dispatches stage the tested npm tarball without a Git tag. Approve the staged package on npmjs.com, then verify registry installation, CLI startup, and trusted hooks on each host.
2. Publish these marketplace changes only after the package is available. Keep the marketplace name and `acstack@ac-agentic-coding` install identity unchanged.
3. Remove the old tracked CLI bundle from ACStack's source repository only after the npm route works. Continue building and including the CLI bundle in every npm tarball. Any Git-source installation instructions must move to npm first.

The marketplace changes alone do not publish ACStack. Never switch the live catalog to an unavailable or incomplete npm release.

## Marketplace checks

Run the static catalog checks:

```sh
node --test tests/marketplace.test.mjs
```

Validate the Claude catalog with the installed Claude CLI:

```sh
claude plugin validate .claude-plugin/marketplace.json --strict
```

Validate native Codex catalog loading in an isolated home (requires Codex CLI):

```sh
sandbox=$(mktemp -d)
mkdir -p "$sandbox/codex"
CODEX_HOME="$sandbox/codex" codex plugin marketplace add "$PWD" --json
CODEX_HOME="$sandbox/codex" codex plugin list --available --json
rm -rf "$sandbox"
```

Catalog loading does not install the registry package or exercise trusted session hooks.
