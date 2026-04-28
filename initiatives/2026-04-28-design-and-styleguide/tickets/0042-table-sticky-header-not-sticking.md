---
title: "Ticket 0042 — Table sticky header does not actually stick (scroll context issue)"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0042 — Table sticky header does not actually stick (scroll context issue)

## Status

**open**

## Summary

The Table component's `stickyHeader` prop wires `position: sticky; top: 0` onto the `<th>` cells. Operator's review of the deployed v0.4.1 Table page: the Sticky-header live preview does **not** stick — the very first vertical scroll inside the demo container loses the header off the top. Horizontal scroll works fine, but Y-axis stickiness is broken.

## Context

The library renders Table as:

```
<div class="cr-table-scroll" style="overflow-x: auto">
  <table>
    <thead><tr><th class="cr-table__header-cell">…</th>…</tr></thead>
    <tbody>…</tbody>
  </table>
</div>
```

The current docs example wraps that in:

```tsx
<div style={{ height: 200, overflow: 'auto', border: '...', borderRadius: 8 }}>
  <Table stickyHeader>…</Table>
</div>
```

The CSS spec says a sticky element pins relative to its **nearest scrolling ancestor**. Because `.cr-table-scroll` has `overflow-x: auto`, it counts as a scrolling ancestor in CSS terms — *both* axes — even though only X is actually scrollable in practice. The sticky `<th>` therefore pins to the top of `.cr-table-scroll`, which itself moves with the outer 200px-tall div as the user scrolls. Net result: the header doesn't stick.

To make sticky work, the same element that scrolls vertically has to be the sticky's nearest scroll ancestor.

## What hurts and why

- A live preview labelled "Sticky header" that does not stick contradicts itself. Anyone copying the example sees the bug, not the feature.
- The `stickyHeader` prop is documented as the supported way to pin headers; consumers using it in their own code will hit the same problem.

## Direction (not a decision)

1. **In `stickyHeader` mode, make `.cr-table-scroll` itself the vertical scroll container.** Add a `cr-table--sticky-wrap` modifier on the wrapper that sets `overflow-y: auto` and `height: 100%`. The consumer is expected to bound the parent's height (already a precondition for sticky to make sense). Drop the outer `overflow: auto` from the docs example (the wrapper now scrolls). Pros: fixes the issue without a new API surface; the prop alone is enough. Cons: requires the docs example to change shape (no outer overflow).
2. **Drop the `cr-table-scroll` wrapper when `stickyHeader` is set.** Lets the outer container be the only scroll context. Pros: simpler render. Cons: loses horizontal scroll for sticky tables — narrow surfaces with both wide columns and a sticky header can't get both.
3. **Document the constraint, don't fix the CSS.** Tell consumers "if you want sticky, use the inner cr-table-scroll as the scroll container; do not wrap in an outer overflow:auto." Pros: zero code change. Cons: passes the buck; the live preview still misbehaves.

Working hypothesis: direction 1. It keeps both axes working, the prop alone is enough, and the docs example just needs to drop one `overflow: auto`.

## Acceptance hints

- The Table docs page's Sticky header live preview actually pins the `<thead>` row at the top while body rows scroll — verified by scrolling the demo container and observing the header stays visible.
- The same wrapper still allows horizontal scroll if columns exceed the container width.
- Sticky and horizontal scroll both work simultaneously.
- The Table docs prose explicitly states the precondition: the consumer's container must bound the height; the wrapper handles the rest.
- `npm run build:lib && npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: #0016 (Table component), #0041 (header/body double border — same component, different bug).
- Library files in scope: `packages/chromium-ui-react/src/components/Table/Table.css`, `Table.tsx`.
- Docs in scope: `docs/docs/components/table.md` (Sticky header section).
