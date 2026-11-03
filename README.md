# AC's Agentic Coding Marketplace

Plugins and Pi extensions for spec-driven development, design work, and agent ergonomics.

## What installs where

| Plugin or extension | Claude Code | Codex | Pi |
| ------------------- | ----------- | ----- | -- |
| [ACStack](https://github.com/ac8318740/acstack) | ✓ | ✓ | ✓ |
| [open-designer](https://github.com/ac8318740/open-designer) | ✓ | ✓ | ✓ |
| [agentic-retro](https://github.com/ac8318740/agentic-retro) | ✓ | ✓ | ✓ |
| [sticky-prompt-line](https://github.com/ac8318740/sticky-prompt-line) | ✗ | ✗ | ✓ |

The table shows host support. Each host uses its own install route:

- Claude Code and Codex install plugin packages from this marketplace
- Pi installs native Pi packages from npm with `pi install npm:<package>`, not the marketplace plugin packages
- `sticky-prompt-line` is a Pi extension only
- `open-designer` also ships `open-designer-viewer` for local browser previews

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

Claude Code cannot install `sticky-prompt-line`.

## Codex install

Install the marketplace once:

```text
codex plugin marketplace add ac8318740/ac-agentic-coding
```

Install any Codex plugin from this marketplace:

```text
codex plugin add acstack@ac-agentic-coding
codex plugin add open-designer@ac-agentic-coding
codex plugin add agentic-retro@ac-agentic-coding
```

Codex cannot install `sticky-prompt-line`.

Codex prompts once to trust a plugin's hooks. ACStack's hook injects its orchestrator instructions and installs its subagent definitions. Declining the prompt leaves ACStack mostly inactive.

## Pi install

Install the Pi packages you want from npm:

```text
pi install npm:@tintinweb/pi-subagents
pi install npm:acstack
pi install npm:open-designer-viewer
pi install npm:agentic-retro
pi install npm:sticky-prompt-line
```

`@tintinweb/pi-subagents` provides the subagent runtime for ACStack. The other packages do not need it.

The native `agentic-retro` package includes its CLI. Do not also run the legacy `agentic-retro install-pi` installer.

Open Designer's Pi commands require `open-designer-viewer` v0.7.8 or later. The release needs npm approval before that version becomes available; v0.7.7 is viewer-only. Once installed, start with `/open-designer:design-system`.

## Setup details

Each plugin lives in its own repository. Follow its guide for setup and requirements:

- [ACStack](https://github.com/ac8318740/acstack#1-quickstart)
- [open-designer](https://github.com/ac8318740/open-designer#readme)
- [agentic-retro](https://github.com/ac8318740/agentic-retro#install)
- [sticky-prompt-line](https://github.com/ac8318740/sticky-prompt-line#readme)

The marketplace manifest references each plugin by URL.
