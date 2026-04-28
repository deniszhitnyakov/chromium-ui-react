---
title: "Ticket 0043 — Bookmarks Manager pattern: sidebar still rendered as elevated card with a dark right border"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0043 — Bookmarks Manager pattern: sidebar still rendered as elevated card with a dark right border

## Status

**open**

## Summary

#0023 codified that sidebar `Menu role="navigation"` renders flat (no shadow / radius / card chrome). #0037 dropped the dark right border on the settings-page / link-collector / tab-manager sidebars. The Bookmarks Manager pattern at [`docs/docs/styleguide/patterns/bookmarks-manager.md`](docs/docs/styleguide/patterns/bookmarks-manager.md) was missed by both sweeps — operator's review of v0.4.1 confirms the sidebar still renders with the popover-card shadow and the dark right border. Sweep both fixes through this pattern as well.

## Context

State of the offending pattern (verify on implementation):

- The Menu in the sidebar is likely declared without `role="navigation"`, so the popover-shadow default kicks in. The flat-CSS rule from #0023 only triggers on `role="navigation"`.
- The sidebar's `<nav>` likely paints `borderRight: '1px solid var(--cr-fallback-color-outline)'` — the same shape the other sidebars had before #0037 stripped it.

Both fixes are mechanical; this ticket bundles them so the Bookmarks Manager pattern catches up to the sidebar look established across the rest of the styleguide.

## What hurts and why

- Patterns are the primary reference for compositions. A pattern page that contradicts a styleguide rule it should be following is a confusion source for anyone copying from it.
- The Bookmarks Manager pattern is the canonical "two-pane manager" reference (Tab Manager sample inherits its shape). A regression here propagates to every two-pane consumer building from this reference.

## Direction (not a decision)

1. **Apply both fixes inline.** Switch the sidebar `<Menu>` to `role="navigation"`; drop the `borderRight` from the `<nav>` style. Update prose in the same file if it explicitly described the right border. Pros: smallest diff; mirrors the Tab Manager / settings-page fixes from #0040 / #0037. Cons: none.
2. **Extend the flat-CSS rule to cover other roles (`role="tree"`).** Possible alternative if the pattern's call site uses `tree` semantics (like the original Tab Manager did). Probably not needed here — `navigation` is the right semantic for a Bookmarks sidebar.

Working hypothesis: direction 1.

## Acceptance hints

- The Bookmarks Manager pattern's sidebar `<Menu>` paints flat — no shadow, no radius, no padding box — verified on the deployed pattern page.
- The sidebar `<nav>` does not paint a right border. The sidebar / main boundary uses the implicit gutter, matching native `chrome://bookmarks`.
- Prose in the pattern is updated wherever it described the right border.
- `npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: #0023 (Menu navigation flat — same fix in a different file), #0037 (sidebar right border — same), #0040 (Tab Manager — sister sample).
- Docs in scope: `docs/docs/styleguide/patterns/bookmarks-manager.md`.
