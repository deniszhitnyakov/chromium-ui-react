---
title: "Ticket 0006 — Side-panel header bottom border should match Divider color (use PanelHeader, not a hand-rolled div)"
status: done
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0006 — Side-panel header bottom border should match Divider color (use PanelHeader, not a hand-rolled div)

## Status

**done** — direction 1 + the anti-pattern from direction 3: the Reading-list example now uses `<PanelHeader title="Reading list" />` instead of a hand-rolled header div. New anti-pattern #22 "Hand-rolled chrome instead of the matching primitive" added so the lesson sticks beyond this one example.

## Summary

The live example at the top of [`patterns/side-panel.md`](docs/docs/styleguide/patterns/side-panel.md) — the "Reading list" panel that ships as the canonical side-panel illustration — paints its header's bottom border with `--cr-fallback-color-outline`, the heavier card-outline token. The Toolbar and the actual `PanelHeader` component both use `--cr-fallback-color-surface-variant`, the quiet hairline that matches Divider. So the example diverges from its own primitive, the divergence is visible (the line under "Reading list" reads as more architectural than the lines between rows), and consumers copying from the example inherit the wrong border. The fix is to replace the hand-rolled header `<div>` with `<PanelHeader title="Reading list" />` — which already has the correct border out of the box.

> **Terminology note.** The operator referred to the surface as "Site Panel". The correct term is **side panel** — Chrome's native column-on-the-right surface (Reading List, Bookmarks, Side Search). PanelHeader / PanelStack / PanelView in the library all map to that surface. The rest of this ticket and subsequent tickets use "side panel".

## Context

Source of the report: the operator inspected the deployed styleguide page for the side-panel pattern and noticed the same border-asymmetry bug as ticket #0002, except this time on the *upper* hairline of the panel (the header's bottom border) rather than the *lower* one (the footer's top border). Both are caused by the same root mistake: live examples hand-roll structural chrome inline instead of using the matching component, and the inline version picks the heavier outline colour.

State of the offending code:

- [`docs/docs/styleguide/patterns/side-panel.md:26-34`](docs/docs/styleguide/patterns/side-panel.md#L26) — the example renders a `<div>` with `height: 48`, `padding: '0 16px'`, and `borderBottom: '1px solid var(--cr-fallback-color-outline)'`, then puts the title inside as a styled inner `<div>`. No `<PanelHeader />` despite that being the canonical primitive for this exact shape, defined and styled three lines away.
- [`packages/chromium-ui-react/src/components/PanelStack/PanelHeader.css:8`](packages/chromium-ui-react/src/components/PanelStack/PanelHeader.css#L8) — `border-bottom: 1px solid var(--cr-fallback-color-surface-variant)`. Already correct, already matches Toolbar and Divider.
- [`packages/chromium-ui-react/src/components/Toolbar/Toolbar.css:7`](packages/chromium-ui-react/src/components/Toolbar/Toolbar.css#L7) — same token, same colour. Reference for "this is the right hairline".
- [`packages/chromium-ui-react/src/components/Divider/Divider.css:4`](packages/chromium-ui-react/src/components/Divider/Divider.css#L4) — same token. Reference for "this is the divider colour".

This is the same shape as ticket #0002 (footer top border in nine live examples), and could be implemented in the same work turn — the underlying fix-token is the same, and the meta-rule ("don't hand-roll chrome that the library already exposes as a component") applies to both.

A note on the second example in the same file (the Bookmarks / drill-in example at line 118+): it uses `<PanelHeader title="..." back />` correctly, so the bug is only in the top "Reading list" example. The contrast is itself useful — one example shows the right way, the other shows a hand-rolled divergence.

## What hurts and why

Three coupled problems:

1. **Visible asymmetry in a pattern page that exists to be copied.** The Reading-list example is the largest, top-of-page canonical illustration of the side-panel pattern. The header line under "Reading list" is heavier than the divider lines between rows — so the surface gains an extra horizontal seam at the top that does not match what `chrome://reading-list` (or any native side panel) actually looks like. Anyone copying the example into an extension gets this bug for free.
2. **The example argues against its own component.** `PanelHeader` is the right tool for the job, defined in the same library, already styled correctly. Building a header by hand — a `<div>` with hard-coded height, padding, border, and an inner styled title `<div>` — implicitly tells the reader that `PanelHeader` is either insufficient, optional, or unknown. None of those are true. The pattern page is teaching the wrong reach.
3. **It reproduces the failure mode of ticket #0002.** Same root cause: a live-example author rebuilt structural chrome by hand and picked the heavier outline token instead of the quiet surface-variant token. Two tickets, one underlying anti-pattern. Worth catalogue-ing once and for all.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Replace the hand-rolled header with `<PanelHeader title="Reading list" />`.** Smallest, most direct change. The example body becomes a `<PanelStack>` containing a single `<PanelView>` with a `<PanelHeader title="Reading list" />` and the rest of the content. Pros: the pattern page now teaches the canonical reach (use the component); the border colour is correct because `PanelHeader.css` already says so; no new code anywhere. Cons: arguably none, given the component already exists.

2. **Token swap only.** Replace `var(--cr-fallback-color-outline)` with `var(--cr-fallback-color-surface-variant)` on the inline header `<div>`, leave the structure as-is. Pros: single-character fix. Cons: keeps the hand-rolled-chrome anti-pattern as the published reference example, which is exactly what the surrounding initiative is trying to teach against.

3. **Fold into ticket #0002's implementation.** Treat both the upper hairline (this ticket) and the lower hairline (#0002) as one sweep through the styleguide, with two passes: (a) replace inline structural divs with the matching components where possible (Toolbar / PanelHeader / and a future Footer if introduced); (b) where structural divs are unavoidable, normalise their borders to `--cr-fallback-color-surface-variant`. Add an anti-pattern entry "Hand-rolled chrome instead of the matching primitive" so the lesson is catalogued. Pros: addresses both tickets and the meta-rule in one work turn; smallest cumulative diff; one anti-pattern entry instead of two ticket-specific fixes. Cons: bigger work turn; risk of scope creep into other patterns pages.

Working hypothesis (subject to revision when the work starts): direction 3 — combine with #0002, sweep both hairlines and any other hand-rolled chrome found in passing, add the anti-pattern. Direction 1 alone is the smallest acceptable fix if the work turn is time-boxed.

## Acceptance hints

- The "Reading list" live example in `docs/docs/styleguide/patterns/side-panel.md` no longer hand-rolls a header `<div>`; it uses `<PanelHeader title="Reading list" />` (or, if the example is still demonstrating something pre-`PanelStack`, a token-corrected inline version).
- The border under the header reads as the same hairline as the Divider lines between rows in the same preview — the "second toolbar" effect goes away.
- If implementing alongside #0002: no `var(--cr-fallback-color-outline)` remains in `borderTop` / `borderBottom` declarations for structural chrome (header / footer strips) anywhere under `docs/docs/styleguide/`.
- If a "Hand-rolled chrome instead of the matching primitive" anti-pattern is added, it lives in `docs/docs/styleguide/anti-patterns.md` with wrong / right pairs and references both `Toolbar` / `PanelHeader` and (if introduced) `Footer`.
- `npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0002 (footer top border) — same root cause, likely co-implemented.
- Related: tickets #0007 (SearchInput in side-panel pattern) and #0008 (card-per-section in side panel) — same operator turn, same pattern page.
- Related ADRs: _none yet_
- Reference URL where the divergence is visible: `https://ztnkv.github.io/chromium-ui-react/styleguide/patterns/side-panel`
- Library files defining the canonical hairline: `packages/chromium-ui-react/src/components/PanelStack/PanelHeader.css`, `packages/chromium-ui-react/src/components/Toolbar/Toolbar.css`, `packages/chromium-ui-react/src/components/Divider/Divider.css`.
- Docs in scope: `docs/docs/styleguide/patterns/side-panel.md` (lines 26–34, primary), `docs/docs/styleguide/anti-patterns.md` (if anti-pattern added).
