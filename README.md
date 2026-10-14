# AC's Agentic Coding Marketplace

Plugins and Pi extensions for spec-driven development, design work, and agent ergonomics.

## What installs where

| Plugin or extension | Claude Code | Codex | Pi |
| ------------------- | ----------- | ----- | -- |
| [ACStack](https://github.com/ac8318740/acstack) | ✓ | ✓ | ✓ |
| [open-designer](https://github.com/ac8318740/open-designer) | ✓ | ✓ | ✗ |
| [agentic-retro](https://github.com/ac8318740/agentic-retro) | ✓ | ✓ | ✗ |
| [sticky-prompt-line](https://github.com/ac8318740/sticky-prompt-line) | ✗ | ✗ | ✓ |

- Claude Code and Codex install Claude plugin packages from this marketplace
- Pi installs Pi packages from npm with `pi install npm:<package>`
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

Codex prompts once to trust a plugin's hooks. SpecHub's hook injects its orchestrator instructions and installs its subagent definitions. Declining the prompt leaves SpecHub mostly inactive.

## Pi install

Install both Pi extensions from npm:

```text
pi install npm:pi-subagents
pi install npm:acstack
pi install npm:sticky-prompt-line
```

`pi-subagents` provides the subagent runtime that ACStack uses.

Pi cannot install the Claude Code or Codex plugin packages for `open-designer` or `agentic-retro`.

## Notes

Each plugin lives in its own repository. The marketplace manifest references each plugin by URL.
