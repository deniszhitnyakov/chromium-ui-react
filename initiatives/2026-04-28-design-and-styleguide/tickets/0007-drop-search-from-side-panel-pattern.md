---
title: "Ticket 0007 — Drop the SearchInput from the side-panel pattern; it's not a required ingredient"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0007 — Drop the SearchInput from the side-panel pattern; it's not a required ingredient

## Status

**open**

## Summary

The canonical side-panel example in [`patterns/side-panel.md`](docs/docs/styleguide/patterns/side-panel.md) puts a `SearchInput` immediately under the header, and the page's "What to copy from this" list describes "Search in the panel" as a *thing the panel has*. Search is genuinely optional for a side panel — most extension side panels do not need or want one — but pattern pages are normative: when an agent reads this page to scaffold a new side panel, the search input reads as a required ingredient and gets included. Strip it from the example and from the prose, leaving search as a separate, optional pattern (or a dedicated "side panel with search" variant) so the default scaffold is search-free.

## Context

Source of the report: the operator viewed the deployed styleguide page for the side-panel pattern and flagged that the search input is misleading-by-default. He's right — Chrome's own side panels split fairly cleanly into "has search" (Bookmarks, History) and "no search" (Reading List as currently shipped, Side Search itself, Reading Mode, the Performance panel). For the surfaces this library is most likely to power — small extension side panels with a few sections of state — search is rare.

State of the offending code:

- [`docs/docs/styleguide/patterns/side-panel.md:38-40`](docs/docs/styleguide/patterns/side-panel.md#L38) — the live example puts `<SearchInput placeholder="Search reading list" />` inside a 16/8px-padded gutter immediately below the header, before the first section.
- [`docs/docs/styleguide/patterns/side-panel.md:109`](docs/docs/styleguide/patterns/side-panel.md#L109) — "What to copy from this" bullet: "**Search in the panel.** Placed immediately below the header, in a small horizontal gutter. `--cr-space-2` (8px) vertical, `--cr-space-4` (16px) horizontal." This is the prose that legitimises the inline element as a pattern ingredient.

The agent that built the Google Maps scraper prototype almost certainly read this page when wiring up the panel — and would have inferred that search-below-header is the canonical layout for *any* side panel, not just for one with searchable content. Even when the prototype's surface had no search semantics, the layout slot remained reserved.

## What hurts and why

Three problems, each minor on its own, structural in combination:

1. **Pattern pages are normative.** Whatever appears in the canonical live preview reads as "this is what a side panel is". An optional ingredient parked at the top of the page becomes a required one in the agent's mental model, because there is nothing else in the example flagging it as optional. Compare with a checkout pattern: if the canonical example always shows a discount code field, every checkout the agent builds will have one.
2. **Search-below-header eats the panel's most precious vertical real estate.** A 360–400px-wide side panel has very little width to begin with; the 48px header + the search input strip cost ~88px before the first row of content appears. On a 600px-tall panel that is ~15% of the viewport spent on chrome the user did not ask for.
3. **It's the wrong default for an extensions library.** This library targets browser extensions in side-panel surfaces. The typical extension side panel has 3–6 controls + a primary action — the kind of UI where the user already knows what is on the panel and does not need to search it. The Reading List screenshot felt like a Chromium reference because Reading List is one of the few cases where a side-panel search is genuinely useful; presenting it as the default biases agents toward an over-shaped UI for the wrong target.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Strip search from the pattern entirely; mention it once in passing.** Remove the `<SearchInput>` from the live example, drop the "Search in the panel" bullet from "What to copy from this", keep one short sentence elsewhere in the page noting "if your panel needs search, drop a `SearchInput` in a 16/8px-padded gutter directly under the header — but most extension side panels do not." Pros: simplest; smallest diff; the default example is now correct for the typical extension case. Cons: the search recipe is lost from the pattern page; if a contributor later wants to build a Reading-List-shaped panel they have to reach for `SearchInput` docs and re-derive the gutter measurements.

2. **Strip search from the main pattern; add a small "side panel with search" variant section.** Same as direction 1 for the main example, but add a short variant subsection ("If your panel needs search …") with a smaller, more focused live preview that shows search-below-header in isolation. Pros: keeps the recipe accessible without making it the default; mirrors how `patterns/primary-action.md` handles full-width vs. centered footer variants today. Cons: more surface area to maintain.

3. **Promote search to its own pattern file** (`patterns/side-panel-with-search.md`) and link from the main pattern. Pros: clear separation; the main side-panel page becomes simpler; the with-search variant has space to discuss filtering, debouncing, empty state. Cons: heaviest of the three; might be overengineering for what is currently a four-line code block.

Working hypothesis (subject to revision when the work starts): direction 1 — strip and replace with one sentence. The recipe is just "render `<SearchInput />` in a 16/8px gutter under the header"; that is small enough to live in a single sentence rather than a separate variant section. If a real Reading-List-shaped extension comes up later, direction 2 or 3 can follow as its own ticket.

## Acceptance hints

- The canonical "Reading list" live example in `docs/docs/styleguide/patterns/side-panel.md` no longer renders a `<SearchInput>`. The example surface goes header → first section → rows.
- The "What to copy from this" list no longer has a "Search in the panel" bullet. (Search may still be mentioned once elsewhere on the page as an optional ingredient with a one-line recipe; the working hypothesis says yes.)
- The Bookmarks drill-in example further down the page is left alone unless it also has a search input — verify on read.
- No other side-panel-shaped live example anywhere in the styleguide treats search as a default ingredient.
- `npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related tickets: #0006 and #0008 — same pattern page, same operator turn, likely co-implemented as one "side-panel pattern overhaul" PR.
- Related ADRs: _none yet_
- Reference URL where the misleading default is visible: `https://ztnkv.github.io/chromium-ui-react/styleguide/patterns/side-panel`
- Reference Chromium surfaces with no panel-level search: Reading List (current), Side Search, Reading Mode, Performance side panel.
- Reference Chromium surfaces *with* panel-level search (for the variant if pursued): Bookmarks, History.
- Docs in scope: `docs/docs/styleguide/patterns/side-panel.md` (lines 38–40, line 109; rest of file should be re-read on implementation to confirm no other search references).
