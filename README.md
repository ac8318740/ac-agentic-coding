# AC's Agentic Coding Marketplace

Plugins and Pi extensions for spec-driven development, design work, and agent ergonomics.

## What installs where

| Plugin or extension | Claude Code | Codex | Pi |
| ------------------- | ----------- | ----- | -- |
| [ACStack](https://github.com/ac8318740/acstack) | Yes | Yes | Yes |
| [open-designer](https://github.com/ac8318740/open-designer) | Yes | Not listed | Yes |
| [agentic-retro](https://github.com/ac8318740/agentic-retro) | Yes | Not listed | Yes |
| [sticky-prompt-line](https://github.com/ac8318740/sticky-prompt-line) | No | No | Yes |
| [ac-teams](https://github.com/ac8318740/ac-teams) | No | No | Yes (Linux) |

Claude Code and Codex use separate catalogs in this repository. The native Codex catalog currently lists ACStack only. Codex compatibility for the other plugins has not been verified here; follow their own setup guides.

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

ACStack installs from the `acstack` npm package at `latest`. It includes the CLI runtime; npm must be available. Claude Code cannot install `sticky-prompt-line` or `ac-teams`.

## Codex install

Install the marketplace once:

```text
codex plugin marketplace add ac8318740/ac-agentic-coding
```

Install ACStack from its npm package:

```text
codex plugin add acstack@ac-agentic-coding
```

This native catalog was checked with Codex CLI 0.163.0. npm must be available. Codex downloads the package with lifecycle scripts disabled; the published package includes the CLI runtime.

Enable and trust ACStack's hooks when Codex asks. Its SessionStart hooks inject orchestrator instructions and install generated subagent definitions into `$CODEX_HOME/agents` (default `~/.codex/agents`), preserving user-owned definitions. Start a fresh session after installation so Codex discovers the agents. Declining hooks leaves this startup behavior inactive.

Native npm catalog parsing and installation were checked with a locally packed artifact. Trusted hook dispatch inside a live Codex session and named-agent delegation still need a manual check.

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

## ACStack npm rollout

The catalogs select `acstack@latest`. Release in this order:

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
