# AC's Agentic Coding Marketplace

Plugins for spec-driven development and design work with coding agents. Works
with both Claude Code and Codex, which read the same marketplace manifest.

## Plugins

| Plugin | Description |
|--------|-------------|
| [SpecHub](https://github.com/ac8318740/spechub) | Spec-driven TDD workflow with a three-phase implementation pipeline |
| [open-designer](https://github.com/ac8318740/open-designer) | Local design loop – Claude writes HTML drafts, you click elements in a viewer to iterate |
| [agentic-retro](https://github.com/ac8318740/agentic-retro) | Learns from finished coding sessions and proposes improvements to code clarity, agent setup, and the repo itself |
| [sticky-prompt-line](https://github.com/ac8318740/sticky-prompt-line) | Shows the nearest off-screen user prompt as a sticky one-line marker in Pi's fullscreen transcript |

## Claude Code

```
/plugin marketplace add ac8318740/ac-agentic-coding
/plugin install spechub@ac-agentic-coding
```

## Codex

```
codex plugin marketplace add ac8318740/ac-agentic-coding
codex plugin add spechub@ac-agentic-coding
```

Codex prompts once to trust a plugin's hooks. SpecHub's hook injects its
orchestrator instructions and installs its subagent definitions, so decline it
and the plugin does very little.

## Notes

Each plugin lives in its own repository and is referenced by URL, so installs
always resolve to the plugin's own `main`. This repository only carries the
marketplace manifest; the submodules under `plugins/` are a development
convenience and play no part in installation.
