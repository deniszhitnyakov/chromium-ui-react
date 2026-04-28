---
title: "Ticket 0044 — Side Panel pattern: add a centred Action Footer with the primary verb"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0044 — Side Panel pattern: add a centred Action Footer with the primary verb

## Status

**open**

## Summary

The Side Panel pattern at [`docs/docs/styleguide/patterns/side-panel.md`](docs/docs/styleguide/patterns/side-panel.md) now reads correctly thanks to #0008 / #0019 / #0023 / #0037 / #0038 — card-per-section composition, no in-panel header, flat sidebar, softer shadows. What is still missing from the canonical example is the **Action Footer**: a pinned bottom strip with the panel's single primary verb (Start / Capture / Scan / Save / Add bookmark — abstract, but visibly the next thing to press). The pattern *describes* this in prose ("If the side panel has a single clear CTA, it belongs in a pinned footer, horizontally centered, content-sized") and links to the Primary action button pattern, but the live preview itself doesn't render one. Add it so the canonical example demonstrates the rule.

## Context

State of the pattern:

- The live preview's Side Panel ends after the section cards. There is no `<div>` rendering a footer with the primary `<Button>` inside.
- The "The panel's primary action" subsection states the rule and links to `patterns/primary-action.md` for the full reasoning, but a reader who does not click through sees a side panel without its footer.

Operator's framing: "не хватает Main Action с Action Footer. Допустим, пусть Main Action будет Start. Вообще без разницы, какая она; пусть будет абстрактная. Но важно закрепить этот паттерн."

## What hurts and why

- The pattern's prose claims a centred-primary-button footer is canonical, but the example doesn't render one. Readers / agents copying from the live preview will produce side panels without footers and miss the rule.
- The Primary action button pattern (`patterns/primary-action.md`) shows the footer in isolation, but the Side Panel pattern is where authors land first when assembling a side panel — that's the right place to demonstrate the rule in context.

## Direction (not a decision)

1. **Add a pinned footer to the canonical example with one centred `Button variant="action"` labelled `Start`.** Same shape as the Primary action button pattern's main example. Drop a one-line note next to the live preview pointing back to the Primary action button pattern for the running-state replacement and other variants. Pros: directly answers operator's request; reinforces the rule in the canonical reference. Cons: makes the example slightly taller — fine, side panels are tall by definition.
2. **Add the footer but use a different verb (Capture / Scan / Save / Add bookmark).** Same shape, different word. Operator said "вообще без разницы". `Start` is fine.
3. **Add the footer behind a "with primary action" toggle in the prose, not the live preview.** Pros: smallest diff. Cons: the live preview is the canonical artifact; not having the footer there leaves the rule unenforced.

Working hypothesis: direction 1.

## Acceptance hints

- The Side Panel pattern's canonical live preview renders a pinned footer at the bottom with one `<Button variant="action">Start</Button>`, centred horizontally.
- The footer uses the same construction as the Primary action button pattern: `padding: var(--cr-space-4)`, `borderTop: 1px solid var(--cr-divider-color)`, `display: flex; justifyContent: center`.
- A short caption next to / under the live preview points at [Pattern — Primary action button](./primary-action.md) for the running-state replacement variant, no-primary case, etc.
- `npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: #0008 (side-panel composition), #0019 (no in-panel header), #0023 (flat sidebar Menu — different surface but same pattern session), #0038 (softer side-panel card shadow), `patterns/primary-action.md` (full reasoning for the centred-primary footer).
- Docs in scope: `docs/docs/styleguide/patterns/side-panel.md`.
