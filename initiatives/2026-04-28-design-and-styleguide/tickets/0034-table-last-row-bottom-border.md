---
title: "Ticket 0034 — Table: last tbody row is missing its bottom border, table reads as 'floating'"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0034 — Table: last tbody row is missing its bottom border, table reads as 'floating'

## Status

**done** — direction 1. Removed the `.cr-table__row:last-child .cr-table__cell { border-bottom: none; }` rule. Every body row, including the last, paints the same 1px `--cr-divider-color` hairline. The table now reads as a contained unit instead of "floating in air". Verified — `tbody tr:last-child td` paints `border-bottom: 1px solid rgb(225, 227, 234)` across all live previews.

## Summary

The Table component's last body row deliberately drops its `border-bottom` (`.cr-table__row:last-child .cr-table__cell { border-bottom: none }`), and the table itself paints no outer border. Visually, the table ends without a closing hairline — operator's read is "the table hangs in the air" because there is no line under the last row to mark "this is where the data ends". Add the closing hairline.

## Context

Library state — [`packages/chromium-ui-react/src/components/Table/Table.css`](packages/chromium-ui-react/src/components/Table/Table.css):

- `.cr-table { min-width: 100%; border-collapse: collapse; ... background: transparent; }` — no outer border on the `<table>` itself.
- `.cr-table__cell { border-bottom: 1px solid var(--cr-divider-color); ... }`
- `.cr-table__row:last-child .cr-table__cell { border-bottom: none; }` — explicitly drops the bottom hairline of the very last row.

The last-child `border-bottom: none` rule was probably added to avoid a doubled hairline when a Table sat inside a Card with its own bottom border, but in the standalone live previews on the Table docs page, the result is a table that visibly ends mid-air.

## What hurts and why

The closing hairline is part of how a table reads as a *contained* unit. Without it the eye searches for the boundary and the table feels unfinished — especially on the docs site where the Table previews sit on a plain surface.

## Direction (not a decision)

1. **Drop the `:last-child border-bottom: none` rule.** Every body row, including the last, paints the hairline. Pros: cleanest; the table ends with a visible boundary regardless of context. Cons: in a future composition where the Table sits flush with an outer container's border, the hairlines might double up — but the current docs use cases never do that.
2. **Keep the `:last-child` rule, add `border-bottom` on `.cr-table` itself.** Same visible result, different mechanism. Pros: the closing line lives on the table, not on the last row, which matches the mental model. Cons: minor — `border-bottom` on `<table>` with `border-collapse: collapse` interacts with the last row's borders in subtle ways and may need testing.
3. **Both at once.** Belt and suspenders. Probably overkill.

Working hypothesis: direction 1 — drop the `:last-child` exception, let the row hairlines do the work uniformly.

## Acceptance hints

- The last `<tbody>` row paints the same `1px solid var(--cr-divider-color)` bottom hairline as every other body row.
- The visible bottom edge of the table is a clear hairline, not blank space.
- All Table live previews look correct in light and dark mode.
- `npm run build:lib && npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: #0033 (header double border), #0035 (default density), #0016 (Table component).
- Library files in scope: `packages/chromium-ui-react/src/components/Table/Table.css`.
