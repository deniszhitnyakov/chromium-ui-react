---
title: "Ticket 0037 — Settings page pattern: drop the dark right border on the sidebar nav"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0037 — Settings page pattern: drop the dark right border on the sidebar nav

## Status

**done** — direction 1. `borderRight` removed from the `<nav>` style in `settings-page.md`, `samples/link-collector.md` (options page), and `samples/tab-manager.md`. Prose updated everywhere it described the right border (`settings-page.md` "Sidebar" bullet, `tab-manager.md` Design decisions + ✅ checklist). Sidebar / content boundary now relies on the implicit gutter, matching native `chrome://settings`.

## Summary

The Settings page pattern's `<nav>` paints `border-right: 1px solid var(--cr-fallback-color-outline)` — a noticeably dark hairline that does not exist in native `chrome://settings`. Operator's review (second time on this surface — see #0023's framing) confirms: native Chrome does not paint a right border on the settings sidebar. Either drop the border entirely, or switch it to `var(--cr-divider-color)` (the quieter hairline) — but cleanest match to native is no border at all.

## Context

Source of the report: operator's repeat note while reviewing the Settings page pattern after #0023 / #0024 landed. Direct phrasing: "сайдбар-меню имеет справа границу, причем довольно неприятную, черную. Еще раз повторюсь: справа у сайдбара границы быть не должно, так сделано в Chrome".

State of the offending code:

- [`docs/docs/styleguide/patterns/settings-page.md:31`](docs/docs/styleguide/patterns/settings-page.md#L31) — `<nav style={{ width: 260, borderRight: '1px solid var(--cr-fallback-color-outline)', padding: '12px 0', overflowY: 'auto' }}>`. The `--cr-fallback-color-outline` token resolves to `rgb(116, 119, 127)` in light mode — a much darker stroke than `--cr-divider-color` (which resolves to `--cr-fallback-color-surface-variant` = `rgb(225, 227, 234)`).
- The same shape may recur in `samples/link-collector.md` (options page) and `samples/tab-manager.md` (sidebar nav) — verify and sweep on implementation.

Native Chromium reference: `chrome://settings/<anything>` — the sidebar column has *no* right border. The visual separation between sidebar and main content comes from the empty white gutter, not a stroke.

## What hurts and why

- The dark stroke makes the sidebar read as a separate panel rather than as part of the same surface. Native Chromium's settings page reads as one continuous surface with a sidebar groove on the left, no chrome between sidebar and content.
- This is the second report on this surface (#0023 was about the Menu styling, #0024 was about the SearchInput placement). The sidebar's right border is the third surface-level mismatch on the same pattern page.

## Direction (not a decision)

1. **Drop `borderRight` entirely.** Cleanest match to native `chrome://settings`. Pros: matches the reference; the visual separation from main is just the implicit gutter (sidebar column ends, main column begins). Cons: very large viewports may make the boundary feel ambiguous — but native Chrome accepts that trade-off.
2. **Switch to `--cr-divider-color`.** Quieter stroke, still present. Pros: keeps a structural cue while toning it down. Cons: native Chrome paints no stroke at all; this is half-measure.
3. **Drop the stroke and replace with a subtle background tint on the sidebar column.** Pros: the column reads as "sidebar" without a hairline. Cons: native Chrome doesn't tint the sidebar background either — it's plain surface.

Working hypothesis: direction 1. Match native Chrome.

## Acceptance hints

- `docs/docs/styleguide/patterns/settings-page.md`'s sidebar `<nav>` no longer paints a right border.
- The sidebar / content boundary still reads correctly because the sidebar column ends at its `width: 260` and the main column begins immediately — the implicit gutter is enough.
- Sweep `docs/docs/styleguide/samples/link-collector.md` (options page section) and `docs/docs/styleguide/samples/tab-manager.md` for the same pattern; same fix.
- `npm run build:docs` stays green.
- Related: ticket #0040 (Tab Manager sample — sidebar still rendered as elevated card) is the same surface family; co-implementation likely.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: #0023 (Menu navigation flat), #0024 (Settings page SearchInput), #0040 (Tab Manager sidebar).
- Docs in scope: `docs/docs/styleguide/patterns/settings-page.md`, possibly `docs/docs/styleguide/samples/link-collector.md`, `docs/docs/styleguide/samples/tab-manager.md`.
