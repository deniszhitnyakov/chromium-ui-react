---
title: Glossary — project terminology
status: living
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: glossary
language: en
---

# Glossary

Single source of truth for terms used across initiatives. Term identifier in English; definition in English (the project's canonical content language).

Rule: every new term introduced in any initiative document is added here in the **same commit**.

## Library & docs surfaces

- **chromium-ui-react** — the React component library published from `packages/chromium-ui-react/`. Goal: components and styles that read as Chromium-native (the `chrome://settings` / `chrome://bookmarks` family), not as a generic webapp.
- **token** — a CSS custom property prefixed `--cr-*`, defined in `packages/chromium-ui-react/src/styles/tokens.css`, that components read instead of hardcoded values. Tokens flip with dark mode and forced-colors automatically.
- **docs site / Docusaurus site** — the public component reference at `ztnkv.github.io/chromium-ui-react`, built from the `docs/` workspace. Distinct from `initiatives/`.
- **styleguide** — the prescriptive part of the docs site, at `docs/docs/styleguide/`: principles, color, layout, typography, anti-patterns, patterns. Tells consumers (human or LLM) how to compose Chromium-native UIs from the library.

## Composition vocabulary

- **anti-pattern** — a composition that uses the right components but produces a non-Chromium result. Catalogued in `docs/docs/styleguide/anti-patterns.md`.
- **pattern** — a recommended composition for a recurring extension surface (popup, side panel, options page, settings page, bookmarks-manager-style toolbar). Lives under `docs/docs/styleguide/patterns/`.
- **prototype-driven critique** — the working mode of this initiative: the operator generates a real Chrome extension UI with an AI agent, then surfaces each visible deviation from the Chromium feel as a fix candidate for the library or the styleguide.

## Extension surfaces

- **side panel** — a Chrome extension surface, ~360–400px wide, full tab height, opened from the side panel slot. Has a pinned footer for the primary action.
- **popup** — a Chrome extension surface, 360–420px wide and 480–600px tall, opened from the toolbar icon. Functional from the first frame; no landing-page onboarding.
- **options page** — a full browser tab rendered like `chrome://settings`; content max-width 680px, centered.

## Framework vocabulary

- **initiative** — a focused stretch of work with a beginning, middle, and end, captured as one folder under `initiatives/`. See the [framework README](https://github.com/ztnkv/initiative-driven-docs-framework).
- **kanban card** — one checklist item in an initiative's `kanban.md`, in one of three columns (To Do / In Progress / Done). Used as the per-initiative board view; the card is a one-line title plus a link to the corresponding ticket file.
- **ticket** — a single packed problem with a sequential global number (`#0001`, `#0002`, …) and a long-form description at `initiatives/tickets/NNNN-<short-name>.md`. The ticket file is the source of truth for what the work is about; the kanban card in an initiative is a thin pointer at it. Numbering is global across initiatives, never reused. Lifecycle: `open → in-progress → done` (or `wontfix`).
- **packing** — turning a problem the operator surfaces into a numbered ticket file plus a kanban card under To Do, without implementing it. The agent writes the ticket body (summary, context, what hurts and why, possible directions, acceptance hints, links); implementation is a separate, explicit operator request.
