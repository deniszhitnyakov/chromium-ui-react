---
title: "Ticket 0040 — Tab Manager sample: sidebar still rendered as elevated card; SearchInput not centred in the header"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0040 — Tab Manager sample: sidebar still rendered as elevated card; SearchInput not centred in the header

## Status

**open**

## Summary

The Tab Manager sample at [`docs/docs/styleguide/samples/tab-manager.md`](docs/docs/styleguide/samples/tab-manager.md) carries two visible regressions on the deployed site:

1. The sidebar `<nav>` still renders the `Menu` with elevation / card chrome — this should already be flat per #0023 (sidebar `Menu role="navigation"` paints flat by default), so either the role is missing on the call site or a wrapping container is adding the shadow back.
2. The `SearchInput` in the header is not centred — should follow the centred placement codified by #0024 (matched in the Settings page pattern, missed here).

Bundle both fixes into one sample-level cleanup ticket.

## Context

Source of the report: operator's review of the deployed Tab Manager sample after the v0.4.0 release.

State of the offending code:

- [`docs/docs/styleguide/samples/tab-manager.md:40`](docs/docs/styleguide/samples/tab-manager.md#L40) — `<Menu role="tree">` on the call site, **not** `role="navigation"`. The flat-CSS rule from #0023 only triggers on `role="navigation"`, so this Menu is using the popover-shadow default. Operator's read on the deployed site is "card with shadow", which is the popover style.
- [`docs/docs/styleguide/samples/tab-manager.md:31`](docs/docs/styleguide/samples/tab-manager.md#L31) — `<SearchInput placeholder="Search tabs..." style={{ flex: 1, maxWidth: 400 }} />` inside `<Header>`. `flex: 1` anchors it to the right of the title, not centred. The Settings page pattern was reworked in #0024 to wrap SearchInput in a `flex: 1` container with `justifyContent: center` and a fixed width — Tab Manager needs the same.

Note on `role`: `role="tree"` on a sidebar is technically defensible — a tree of windows + groups is a tree. But the visual fix needs the flat styling that's wired to `role="navigation"`. Either: (a) switch the call site to `role="navigation"`, accepting the loss of "tree" semantics; (b) extend the flat-CSS rule from #0023 to cover both `[role="navigation"]` and `[role="tree"]`.

## What hurts and why

- Tab Manager is one of three flagship samples. Two visible regressions on the same surface tell a reader that the styleguide's fixes have not actually shipped, even when they have.
- The shadow on the sidebar makes the surface read as "popover floating inside a manager", not as "sidebar". That contradicts the entire point of #0023.

## Direction (not a decision)

1. **Both fixes inline in the sample.** (a) Switch `<Menu role="tree">` to `<Menu role="navigation">` (sidebar nav semantics; the tree of windows/groups is rendered structurally inside, not via role). (b) Wrap SearchInput in a centring flex container, mirroring the Settings page pattern. Pros: smallest diff; matches the existing styleguide fixes directly. Cons: drops the `role="tree"` semantic.
2. **Extend the CSS rule to cover `role="tree"` too.** Update `.cr-menu[role="navigation"]` to `.cr-menu[role="navigation"], .cr-menu[role="tree"]`. Keep the call site as `role="tree"`. Pros: preserves semantics; same flat shape. Cons: the discriminator widens — agents who add some other ARIA role on a sidebar will trip back into popover styling.
3. **A) for the role, plus (b) for the search.** Same as 1 but pick the search fix while explicitly preserving role="tree" using direction 2. Hybrid.

Working hypothesis: direction 1, with direction 2's CSS change considered as a follow-up if any consumer reports needing `role="tree"` semantics. Tab Manager is a single sample; ARIA-strict consumers can override per-instance.

## Acceptance hints

- The Tab Manager sample's sidebar `<Menu>` paints flat (no shadow, no border-radius, no card chrome) — matches the Settings page pattern's sidebar.
- The Tab Manager sample's `<Header>` SearchInput renders centred in the toolbar (flex-1 centring container, fixed `width: 360` or similar), not anchored to the right.
- The "Design decisions" prose under the sample is updated where necessary.
- Cross-reference [#0023](#0023) and [#0024](#0024) in the prose if useful.
- `npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: #0023 (Menu navigation flat), #0024 (Settings page SearchInput centring).
- Related: #0037 (Settings page sidebar right border).
- Docs in scope: `docs/docs/styleguide/samples/tab-manager.md`.
