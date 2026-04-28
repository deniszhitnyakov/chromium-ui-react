---
title: "Ticket 0039 — Extension Popup pattern: Settings entry is at the bottom, should be in the upper half (regression of #0026)"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0039 — Extension Popup pattern: Settings entry is at the bottom, should be in the upper half (regression of #0026)

## Status

**open**

## Summary

Ticket #0026 codified that the `Settings` drill-in row must be labelled exactly `Settings` and placed in the **upper half** of the surface. The Extension Popup pattern's live preview at [`docs/docs/styleguide/patterns/extension-popup.md`](docs/docs/styleguide/patterns/extension-popup.md) was updated to call the row `Settings` (per #0029's sweep), but it remains positioned at the very bottom of the popup body, after the form fields and toggles. Move it up.

## Context

Source of the report: operator's repeat note on the deployed pattern site.

State of the offending preview: the popup's content stack is roughly:

1. Header (title)
2. Card with primary form (URL input, options checkboxes)
3. ... long body content ...
4. List with `Settings` drill-in row at the very bottom

Per #0026, the `Settings` row should be in the upper half — typically the first 1–3 rows after the primary status / verb. In a popup that opens directly on a *form* (not a settings list), "upper half" maps to: settings entry sits above the form, or as the first non-header row.

## What hurts and why

- Pattern pages are the primary reference for compositions. A pattern page that contradicts a styleguide rule it should be following is a confusion source for anyone copying from it.
- The post-#0026 sweep of samples reached `link-collector.md` (Recently saved → upper half) but the *pattern* page (`extension-popup.md`) was missed because the only fix in #0029 was the label rename (Options → Settings), not the placement.

## Direction (not a decision)

1. **Move the `Settings` drill-in to the top of the popup body.** Just above the form card, or as the first element inside the form card. Pros: matches #0026 directly. Cons: in this specific popup, the form is the immediate primary action — putting Settings above it might feel like a settings-first popup. Trade-off: weaker than the placement rule.
2. **Group Settings with the primary state row.** If the popup has any "what context am I in" row near the top, drop Settings into that group. Pros: contextual. Cons: this popup's first card is a form, not a state row.
3. **Pin `Settings` at the bottom but justify it as a Reader-Mode-style content-dominant exception.** Pros: minimal change. Cons: this popup is a *form*, not content-dominant — the exception doesn't apply.

Working hypothesis: direction 1. Move it up; the rule from #0026 applies cleanly.

## Acceptance hints

- Extension Popup pattern's live preview renders the `Settings` drill-in row in the upper half of the popup body — first or second row inside the content area, before the form fields.
- The "Design decisions" / explanatory prose under the preview reflects the placement.
- Cross-reference [Pattern — Settings entry](./settings-entry.md) and [Anti-pattern #26](../anti-patterns.md#26-settings-entry-buried-at-the-bottom-of-the-surface) explicitly in the prose.
- `npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: #0026 (Settings entry pattern — this is fallout cleanup).
- Related: #0029 (cleanup sweep — caught the rename but missed the placement).
- Docs in scope: `docs/docs/styleguide/patterns/extension-popup.md`.
