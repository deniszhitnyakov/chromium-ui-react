---
title: "Ticket 0024 — Settings-page SearchInput: center in the header, drop the border (match native chrome://settings)"
status: done
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0024 — Settings-page SearchInput: center in the header, drop the border (match native chrome://settings)

## Status

**done** — direction 1 (drop border + fix centering). `Input.css` `.cr-search__field` border switched from `1px solid var(--cr-fallback-color-outline)` to `1px solid transparent` so the resting state shows just the filled pill on the surface; the focus rule that turns the border `--cr-fallback-color-primary` is preserved (border still appears on focus). Settings-page pattern's live preview header now wraps SearchInput in a `flex: 1` container with `justifyContent: center` and a fixed `width: 360`, so the field sits in the visual middle of the toolbar instead of being right-anchored. The "What to copy" bullet rewritten to spell out the centred placement and the no-border default. Verified in browser: border-color `rgba(0, 0, 0, 0)`, background `var(--cr-fallback-color-surface-1)` (filled).

## Summary

The Settings-page pattern's `SearchInput` sits in the toolbar after the page title, anchored to the right by `flex: 1, maxWidth: 400`. The operator's reference (`chrome://settings/languages` screenshot attached to the report) shows the search field **centered** in the header, not right-aligned, and **without a visible border** — only the filled subtle background distinguishes it from the toolbar surface. Today the library's `SearchInput` renders a 1px outline border around the field. Two fixes, both visible on the same screenshot: place SearchInput in the header center; drop the outlined border on the SearchInput control itself.

## Context

Source of the report: operator viewed the deployed `Settings page` pattern next to `chrome://settings/languages` and called out two specific layout / styling differences from the native reference.

State of the offending code:

- [`docs/docs/styleguide/patterns/settings-page.md:26`](docs/docs/styleguide/patterns/settings-page.md#L26) — the live preview puts `<SearchInput placeholder="Search settings" style={{ flex: 1, maxWidth: 400 }} />` inside `<Toolbar title="Settings">`. The toolbar's children are appended after the title via flex layout, so `flex: 1` makes the SearchInput take all remaining width up to its `maxWidth: 400`, anchoring it to the right side of the toolbar.
- [`docs/docs/styleguide/patterns/settings-page.md:139`](docs/docs/styleguide/patterns/settings-page.md#L139) — "What to copy from this" bullet: "**Toolbar.** 56px tall (component default). Search field in the middle, `maxWidth: 400`. No shadow below the toolbar." The prose already says "in the middle" but the live example does not paint it that way — another self-contradictory bit, like the side-panel ALL CAPS in #0005.
- [`packages/chromium-ui-react/src/components/Input/Input.css:91-105`](packages/chromium-ui-react/src/components/Input/Input.css#L91) — `.cr-search__field` paints `border: 1px solid var(--cr-fallback-color-outline)` plus `background: var(--cr-fallback-color-surface-1)` (filled) and `border-radius: 18px` (pill). On the operator's native screenshot, the border is invisible — the field is just the filled pill on the toolbar surface.

Native Chromium reference (operator's screenshot of `chrome://settings/languages`):

- Toolbar layout: title left, **search input centered** in the toolbar (not right-anchored after title), no third element. The centering is real layout (not flex-1), so the field stays in the middle of the visible toolbar regardless of viewport width.
- Search field appearance: no visible border, filled subtle background (looks like `--cr-fallback-color-surface-1` or `surface-variant`), pill rounding, magnifier icon on the left, placeholder text on the left.

Note that ticket #0007 (drop SearchInput from the side-panel pattern) is *separate* — that one is about removing search from a context where it does not belong. This one is about styling and placement of the search where it *does* belong (the full-tab options page / settings-shaped surfaces).

## What hurts and why

Three problems:

1. **The pattern says one thing and shows another.** The "Search field in the middle, maxWidth: 400" bullet on line 139 is the rule the pattern wants to teach; the live preview at line 26 does not implement it (right-anchored, not centered). An agent reading the page picks up the visual, not the prose.
2. **The bordered search field reads as a form input, not a toolbar search.** `chrome://settings`'s search-in-header is visually distinct from form fields below — borderless, filled, pill-shaped. The library's bordered SearchInput conflicts with that visual contract: it looks like just another form Input parked at the top of the page.
3. **It locks SearchInput into one shape.** Some surfaces *do* want a bordered search (some standalone search dialogs, possibly the Bookmarks Manager search). If `SearchInput` is borderless by default, those surfaces can opt in to a border via prop; if it is bordered by default, the toolbar use is wrong-by-default.

The deeper meta-problem is the standard shape of this initiative: a published example that contradicts its own caption, plus a component visual that defaults to the rare style instead of the common one.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Drop the SearchInput border entirely; fix the centering in the live example.** Modify `.cr-search__field` to remove `border` (or set `border-color: transparent`); update the settings-page live preview to center SearchInput in the toolbar (probably by wrapping toolbar content in a flex layout that places `<Toolbar title>` left, `<div style={{ flex: 1 }} />` spacer, `<SearchInput style={{ width: 360 }} />` centered, `<div style={{ flex: 1 }} />` spacer — or by Toolbar growing a `searchSlot` prop that handles the centering internally). Pros: matches native chrome://settings; smallest API change; the bordered-feeling can come back as `<SearchInput bordered />` opt-in if a future ticket needs it. Cons: visible visual change for any consumer relying on the bordered SearchInput.

2. **Add a `bordered` prop to SearchInput, default `false`; fix centering separately.** Same visual outcome by default, but the bordered shape stays available without a follow-up ticket. Pros: zero regression risk for bordered consumers. Cons: a prop nobody asked for; the working principle of this initiative is "remove the option, not add a switch".

3. **Toolbar layout fix only; leave SearchInput border alone.** Center the search in the toolbar but keep the bordered field. Pros: smallest diff. Cons: only fixes one of the two issues the operator named; leaves the bordered look that visibly differs from native.

Working hypothesis (subject to revision when the work starts): direction 1 — drop the border, fix the centering. The "this is pre-1.0, no compatibility shim" precedent (Badge / fullWidth / tonal / Chip) covers the regression risk for any consumer relying on the current bordered style. If the work turn finds the centering needs a Toolbar-level layout slot, propose that as a small follow-up rather than expanding scope here.

Open question for the work turn: should the centering be solved at the Toolbar layout level (more permanent, benefits any future search-in-header use) or at the example level (one-off CSS in the live preview)? Lean toward Toolbar-level once the implementation eyes the existing `<Toolbar>` layout — but the renamed `<Header>` from ticket #0018 will land first, and may want to absorb this anyway. Sequence accordingly.

## Acceptance hints

- `.cr-search__field` no longer paints a 1px outline border. The field reads as a filled pill on the surface, matching native `chrome://settings` search.
- The `Settings page` live example renders SearchInput **centered** in the header, not anchored to the right of the title.
- The "Search field in the middle" bullet in the "What to copy from this" list (line 139) is no longer contradicted by the live preview.
- Bookmarks Manager pattern's search-in-header (if present) is reviewed against the new style and updated if needed.
- Side-panel pattern's SearchInput placement is *not* in scope here — that surface is being reshaped by ticket #0007.
- If a `bordered` opt-in prop is introduced (direction 2 fallback), it is documented on the SearchInput page; otherwise, no API change.
- If Toolbar layout grows a `searchSlot` (or equivalent) to handle the centering at the component level, document it on the Toolbar / Header page after #0018 lands.
- `npm run build:lib && npm run build:docs` stays green.
- Release: minor version bump (visual default change for a public component).

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0023 (Menu navigation flat) — same pattern page, same operator turn, expected co-implementation. Ticket #0007 (drop SearchInput from side-panel pattern) — different scope (removal vs. restyling) but same component.
- Related: ticket #0018 (rename Toolbar → Header) — if this lands first, the centering fix may want to absorb a `searchSlot` into the renamed Header. Ticket #0021 (Input/Textarea geometry) — `cr-search__field` is *not* in scope of #0021 by design; this ticket is the SearchInput counterpart.
- Related ADRs: _none yet_
- Reference Chromium surface: `chrome://settings/languages` (operator's screenshot attached); also any other `chrome://settings/*` page.
- Library files in scope: `packages/chromium-ui-react/src/components/Input/Input.css` (the `.cr-search*` rules); possibly `packages/chromium-ui-react/src/components/Toolbar/Toolbar.tsx` for a layout slot (after #0018 renames it to Header).
- Docs in scope: `docs/docs/styleguide/patterns/settings-page.md`, `docs/docs/styleguide/patterns/bookmarks-manager.md` (verify), `docs/docs/components/input.md` (SearchInput section).
