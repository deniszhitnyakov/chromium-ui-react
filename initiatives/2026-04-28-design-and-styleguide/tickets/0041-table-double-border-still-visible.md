---
title: "Ticket 0041 — Table: doubled header/body border is still visible after #0033"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0041 — Table: doubled header/body border is still visible after #0033

## Status

**done** — direction 1 (Infima reset) plus a `display: table; overflow: visible` reset on `.cr-table` itself (Docusaurus / Infima sets `display: block; overflow: auto` on every `<table>` and that was breaking column alignment + the sticky scroll context). Resets are wrapped in `:where(...)` so cell-level rules win the cascade. Verified — `<th>` / `<td>` no longer paint inherited Infima borders, `tbody tr:nth-child(2n)` background reset to transparent (no zebra), `<table>` is `display: table` again, hairline between header and body is the same single 1px line as the row dividers below.

## Summary

#0033 moved the header/body hairline from `.cr-table__header-cell` (cell-level) to `.cr-table__head` (thead-level), expecting `border-collapse: collapse` to merge any overlapping borders. The operator's screenshot of the deployed v0.4.1 Table preview shows the doubling is still visible — the boundary between `<thead>` and the first `<tbody>` row reads as visibly thicker than the row hairlines below it. Re-investigate.

## Context

The most likely culprit is that the docs site's Infima / Docusaurus default markdown CSS still styles the underlying `<table>`, `<th>`, `<td>` elements (e.g. via `.markdown table th { border-bottom: 2px solid ... }`), and those defaults stack with the library's own borders inside the live-preview block. The library CSS does not override these explicitly — `.cr-table__head` adds its own `border-bottom`, but it is not the only border on the path between `<thead>` and `<tbody>`.

Additional observations from the same screenshot:

- Body rows alternate in subtle background (Roastery Lane is greyer than The Coffee Workshop). This is also Infima default `<tbody> tr:nth-child(odd) / even` styling, leaking into the cr-table render. We did not intend zebra striping.
- The whole table is wrapped in an outer outline. We did not paint an outer border on `.cr-table` — that is also leaking from Infima.

So the underlying problem is broader than the original "single hairline doubling" — Infima's table styling is overlaying cr-table's intentions.

## What hurts and why

- A flagship component shipped on the docs site that visibly doesn't match its own design intent erodes trust in the library's "Chromium-faithful" claim.
- The fix needs to be defensive against Infima — `cr-table` styling has to override or reset every relevant Infima rule, not assume defaults.

## Direction (not a decision)

1. **Explicit Infima reset on `.cr-table` and its children.** Add CSS resets that zero out border-top / border-left / border-right / background on `<th>` and `<td>` inside `.cr-table`, and the alternating-row / outer-border styling on `<table>` / `<tr>`. Then the library's own hairlines are the only thing painted. Pros: surgical; doesn't touch the `chrome://`-faithful intent. Cons: a small list of rules to maintain.
2. **Increase specificity / add `!important`.** Cheap, ugly. Skip.
3. **Wrap `<table>` in a class that opts out of Infima styling globally.** Possible if the docs site's swizzle theme allows it. Higher infrastructure cost; probably not worth it for one component.

Working hypothesis: direction 1.

## Acceptance hints

- Hairline between `<thead>` and the first `<tbody>` row is exactly the same weight as the dividers between body rows on the deployed Table page.
- No alternating-row background.
- No outer border around the table beyond what cr-table itself paints.
- Verified on the deployed docs site (the Live preview, the Density section, and Horizontal scroll all render clean).
- `npm run build:lib && npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: #0033 (first attempt at the same fix), #0034 (last-row border), #0035 (default density flip), #0016 (Table component).
- Library files in scope: `packages/chromium-ui-react/src/components/Table/Table.css`.
