---
title: "Ticket 0036 — Link Collector sample: switch the 'Recently saved' list to a Table"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0036 — Link Collector sample: switch the 'Recently saved' list to a Table

## Status

**open**

## Summary

The Link Collector popup sample at [`docs/docs/styleguide/samples/link-collector.md`](docs/docs/styleguide/samples/link-collector.md) renders the `Recently saved` block as a `<List>` of `<ListItem>`s with site icon + title + secondary line. Now that the library ships a Table component (#0016), this exact use case is what Table is for — title + source/time + (eventually) status, columnar. Migrate the block over so the sample showcases Table in a realistic context.

## Context

Library state: `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell` exported as of #0016.

Sample state — [`docs/docs/styleguide/samples/link-collector.md`](docs/docs/styleguide/samples/link-collector.md):

- The popup live preview's `Recently saved` block is currently `<List>` + `<ListItem icon={<GlobeIcon />} primary="..." secondary="..." interactive />` rows.

Operator's framing: this row shape *is* tabular (link, source, when), and showing the Table in the sample is the right place to demonstrate the new component to consumers reading the styleguide.

## What hurts and why

- Without a real-world example, agents reading the styleguide see Table on its own component page and assume it is for full-page data dumps. Showing it inside a popup sample teaches the right scope: small tabular blocks inside otherwise-list-heavy surfaces.
- Tab Manager and Reader Mode samples don't have an obvious tabular block. Link Collector's Recently-saved is the natural fit — same shape Chromium uses for `chrome://history`.

## Direction (not a decision)

1. **Replace the List block with a Table.** Two columns (Title, Source · Time) or three (Title, Source, Time). Use `<Table density="dense">` since the popup is narrow (400px). After #0035 lands, the explicit `density="dense"` becomes the right opt-in for narrow surfaces. Pros: cleanest demonstration of Table in a realistic surface. Cons: the column layout in 400px wide may need a tighter font / column tuning.
2. **Keep the List, add a separate Table example to the options-page section.** Pros: less disruption. Cons: misses the point — the Recently-saved block is already a tabular use case; hiding it in the options page breaks the parallel.
3. **Both — show List once and Table once.** Bloat. Skip.

Working hypothesis: direction 1.

Open questions for the work turn:

- Column count: 2 (Title, Source · Time stacked) vs. 3 (Title | Source | Time). 3 is more table-like; 2 reads more like an enriched list. Lean 3.
- Sticky header? Probably not — the popup body scrolls but Recently-saved is a small block, not a long log.

## Acceptance hints

- The `Recently saved` block in the Link Collector popup live preview renders as a `<Table>` with header row + 2–3 data rows.
- `density="dense"` is set explicitly (after #0035 the default is regular; the popup wants dense).
- The visual weight of the new block matches the rest of the popup — neither too cramped (title truncation eating the row) nor too tall (defeating the dense purpose).
- The "Design decisions" prose under the popup is updated to reference the Table choice.
- `npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: #0016 (Table component), #0035 (default density flip — landing first changes whether `density="dense"` is implicit or explicit here).
- Docs in scope: `docs/docs/styleguide/samples/link-collector.md`.
