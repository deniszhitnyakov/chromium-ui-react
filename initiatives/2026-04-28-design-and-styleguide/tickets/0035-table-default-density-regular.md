---
title: "Ticket 0035 — Table: default density should be 'regular', not 'dense'"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0035 — Table: default density should be 'regular', not 'dense'

## Status

**done** — direction 1 (flip default). `Table.tsx`: `density = 'regular'` is the default; the `TableDensity` union order is `'regular' | 'dense'`. `Table.css`: the unmarked `.cr-table` rule paints regular geometry (13px text via `--cr-font-size-md`, 10px 16px padding); a new `.cr-table--dense` modifier opts down to 12px / 6px 12px. `docs/docs/components/table.md` Live preview now leads with the regular look; the Density section's example renders `<Table density="dense">` as the opt-in. The "default density on a side panel" anti-pattern updated to point at the new opt-in. `docs/docs/one-page.md` Table section updated. Verified in browser: default Table has `cr-table--dense` absent, `font-size: 13px`, `padding: 10px 16px`.

## Summary

Ticket #0016 packed the Table component with `density: 'dense'` as the default, on the reasoning that extension surfaces (popups, side panels) are vertical-real-estate-constrained. Operator's review of the deployed Table previews disagrees: the dense default reads cramped at typical preview / docs-site widths, and the right shape is the inverse — `regular` is the default, `dense` is the opt-in for narrow surfaces. Flip it.

## Context

Library state — [`packages/chromium-ui-react/src/components/Table/Table.tsx`](packages/chromium-ui-react/src/components/Table/Table.tsx):

- `Table` destructures `density = 'dense'`.
- `regular` adds `cr-table--regular` (font-size 13px, padding 10px 16px); the unmarked default is dense (font-size 12px, padding 6px 12px).

Ticket #0016's "Density default" open question explicitly noted: *"Operator's view: 'dense'. Confirmed in this ticket — dense is the default; density='regular' is the opt-in for full-tab options pages."* — which the operator has now revised after seeing the previews. This ticket records the reversal.

## What hurts and why

- The dense default makes every Table example on the docs page look tight — the row-padding of 6px is below what the rest of the library typically uses for content rows (most rows are 48–64px tall; a dense table is ~30px per row).
- Side-panel surfaces *do* benefit from dense, but they are the exception, not the rule. Hardcoding the exception as the default makes the common case verbose (`<Table density="regular">` everywhere) and the rare case implicit.
- Aligns with the broader pattern in this initiative: make the right shape the default shape.

## Direction (not a decision)

1. **Flip the default.** `density = 'regular'` in `Table.tsx`. Reorder the `TableDensity` union to `'regular' | 'dense'`. CSS already has the `cr-table--regular` modifier — flip it so the unmarked rule is regular and add `cr-table--dense` for the opt-in. Update the docs page so the Live preview leads with the regular look and the density example shows `<Table density="dense">` as the opt-in. Pros: matches the operator's revised intent; smallest behavioural change for consumers (most live previews don't pass `density` and will silently re-render in regular mode). Cons: a follow-up bump.
2. **Add a per-surface convention rule** without changing the default. Pros: preserves existing API. Cons: ignores the operator's call; the styleguide already documents per-surface behaviour and that didn't help.
3. **Drop the `density` prop entirely; pick one.** Pros: simplest. Cons: real surfaces need both, this is the wrong direction.

Working hypothesis: direction 1.

## Acceptance hints

- `Table.tsx`: `density = 'regular'` is the default. The `TableDensity` union order is `'regular' | 'dense'`.
- `Table.css`: the unmarked `.cr-table` rule paints regular geometry (13px text, 10px 16px padding); a new `.cr-table--dense` modifier paints the dense look (12px text, 6px 12px padding).
- `docs/docs/components/table.md` Live preview leads with the default (regular) look. The Density section's example becomes `<Table density="dense">`.
- The "Anti-patterns" / "Material-density rows on a side panel" prose is preserved — narrow surfaces still want dense, just opt-in.
- `npm run build:lib && npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: #0033 (header border doubling), #0034 (last-row border), #0016 (Table component).
- Library files in scope: `packages/chromium-ui-react/src/components/Table/Table.tsx`, `packages/chromium-ui-react/src/components/Table/Table.css`.
- Docs in scope: `docs/docs/components/table.md`, `docs/docs/one-page.md` (Table section's "default" mention).
