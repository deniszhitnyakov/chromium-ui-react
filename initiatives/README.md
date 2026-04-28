---
title: Initiatives — internal documentation root
status: living
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: readme
language: en
---

# Initiatives

This folder follows the [Initiative-Driven Documenting](https://github.com/ztnkv/initiative-driven-docs-framework) framework. It is the project's internal journal: visions, plans, decisions, and the in-flight reasoning behind library / styleguide / docs changes.

## Why `initiatives/` and not `docs/`

The framework recommends `docs/`, but in this repository `docs/` is already the Docusaurus workspace that publishes the public component reference for `chromium-ui-react`. Mixing the two would conflate *public reference for library consumers* with *internal project journal*, and Docusaurus would try to render initiative files as docs pages. So the framework lives at `initiatives/` instead. Everything else in the framework (front-matter, lifecycle, kanban format, ADR layout) is followed verbatim.

## Navigation

- **[`glossary.md`](./glossary.md)** — shared vocabulary used across all initiatives
- **[`TIMELINE.md`](./TIMELINE.md)** — chronological register of every initiative with its current status
- **`YYYY-MM-DD-<name>/`** — one folder per initiative, dated by start date

## How to read this

- **To understand the current state** — open `TIMELINE.md`, jump to the most recent `in-progress` initiative
- **To understand why something was decided** — read that initiative's `journal.md` and `decisions/`
- **To understand a term** — check `glossary.md` first

## How to start a new initiative

1. Pick a `kebab-case` name and today's date
2. `mkdir initiatives/YYYY-MM-DD-<name>/`
3. Add `README.md`, `journal.md`, and the main artifact (or `kanban.md` if the initiative is catalogue-shaped)
4. Append a row to `TIMELINE.md`
5. Commit (TIMELINE update goes in the same commit that creates the folder)

## Scope: not shipped to npm

`initiatives/` lives at the repo root, outside the published library workspace at `packages/chromium-ui-react/`. The library's `package.json` uses an explicit `files` allowlist (`dist`, `src/styles`, `README.md`, `LICENSE`), so initiative content cannot leak into the npm tarball. It does ship to GitHub — the repository itself is the public artifact for this folder.
