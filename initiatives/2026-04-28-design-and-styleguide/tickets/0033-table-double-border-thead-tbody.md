---
title: "Ticket 0033 — Table: doubled border between thead and the first tbody row"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0033 — Table: doubled border between thead and the first tbody row

## Status

**open**

## Summary

In the live previews on the Table docs page, the divider line between the header row and the first body row reads as visibly thicker than the dividers between body rows — operator's read on the deployed site. The cause is a CSS sum: `.cr-table__header-cell` paints `border-bottom: 1px solid var(--cr-divider-color)` and the very next `.cr-table__cell` paints `border-bottom: 1px solid var(--cr-divider-color)` of its own. With `border-collapse: collapse` they should merge, but in practice they are stacking against each other (likely because `<th>` and `<td>` both apply a *bottom* border rather than one applying bottom and the other applying top). Pick one row to own the hairline between header and first body row, drop the other.

## Context

Library state — [`packages/chromium-ui-react/src/components/Table/Table.css`](packages/chromium-ui-react/src/components/Table/Table.css):

- `.cr-table__header-cell { border-bottom: 1px solid var(--cr-divider-color); }`
- `.cr-table__cell { border-bottom: 1px solid var(--cr-divider-color); }`
- `.cr-table { ... border-collapse: collapse; ... }`

When a `<thead>` has its own `border-bottom` and the first `<tbody>` row's cells also have a `border-bottom`, the visible boundary above the first body row is *both* lines — collapse only merges adjacent borders within the same edge. The header's bottom hairline and the first body row's top edge are not the same edge.

Operator confirmed the visible doubling in the deployed Table preview (the gallery + density example).

## What hurts and why

- The hairline reads thicker than every divider below it, which makes the `<thead>` / `<tbody>` boundary feel like a *section* break rather than a normal row hairline. Native Chromium tables do not do this.
- The Table component is the most-recent addition; a visible "first impression" bug on its docs preview undermines the rest of the styleguide's "Chromium-faithful" claim.

## Direction (not a decision)

1. **Drop `border-bottom` from `.cr-table__header-cell`** and let the first body row's `border-top` (or its own `border-bottom`) carry the hairline. Cleanest single-rule fix; one boundary, no doubling. The active rule in `.cr-table__row:last-child .cr-table__cell { border-bottom: none }` keeps the *bottom* of the table clean (#0034 tracks the last-row issue separately).
2. **Drop `border-bottom` from `.cr-table__cell`, keep the header's bottom border, add a top border to the first body row only.** More conditional CSS; not worth it.
3. **Move the hairline to a `border-top` on `<th>`/`<td>` row-by-row instead of `border-bottom`.** Bigger refactor, no clear win.

Working hypothesis: direction 1.

## Acceptance hints

- The visible hairline between `<thead>` and the first `<tbody>` row is the same weight as the dividers between body rows — a single 1px `--cr-divider-color` line.
- All Table live previews on `docs/docs/components/table.md` look correct in light and dark mode.
- `npm run build:lib && npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: ticket #0034 (last-row bottom border), #0035 (default density flip), #0016 (Table component).
- Library files in scope: `packages/chromium-ui-react/src/components/Table/Table.css`.
