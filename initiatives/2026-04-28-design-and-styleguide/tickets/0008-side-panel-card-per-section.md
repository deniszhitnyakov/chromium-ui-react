---
title: "Ticket 0008 — Side panel: each section is its own elevated Card with the heading above it (mirror settings-page)"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0008 — Side panel: each section is its own elevated Card with the heading above it (mirror settings-page)

## Status

**open**

## Summary

The current side-panel pattern explicitly forbids cards: rows live on the bare panel surface, separated by hairline `Divider`s, with section labels typeset directly on the surface above each group. The full-tab settings-page pattern does the opposite — `<section>` wrapper, sentence-case `<h2>` *outside* the card, an `<Card variant="elevated">` *containing* the rows. The operator's request is to bring side panels in line with the settings-page shape: each section is its own elevated card with rounded corners and shadow, the section heading sits above the card, and the panel becomes a vertical stack of (heading, card) pairs. This inverts two explicit rules in [`patterns/side-panel.md`](docs/docs/styleguide/patterns/side-panel.md) ("No card", "Wrapping the list in a Card") and updates the canonical example accordingly. Even with the side panel's narrower width (~360–400px), the elevated-card structure is preserved.

## Context

Source of the report: the operator viewed the deployed styleguide page for the side-panel pattern and flagged that its underlying composition is the wrong shape for an extensions library. The current pattern was modelled on Chrome's *built-in* Reading List panel (a flat list of rows on bare surface, no cards). But the surfaces this library is most likely to power — small extension side panels with 2–4 sections of mixed state and controls — read better in the same card-per-section shape that Chrome uses for `chrome://settings`. The operator's screenshot for ticket #0001+ (the Google Maps scraper prototype) had four sections (RUN / PROGRESS / RESULTS PREVIEW / FILTERS) and visibly wanted the settings-page composition; instead it inherited the bare-surface composition because the side-panel pattern told the agent to.

State of the rules being inverted:

- [`docs/docs/styleguide/patterns/side-panel.md:112`](docs/docs/styleguide/patterns/side-panel.md#L112) — "**No card.** Side panels do not wrap their lists in cards — the panel itself is the card."
- [`docs/docs/styleguide/patterns/side-panel.md:200`](docs/docs/styleguide/patterns/side-panel.md#L200) — under "Common side-panel mistakes": "**Wrapping the list in a `Card`.** The panel itself is the card. Do not nest."
- [`docs/docs/styleguide/patterns/side-panel.md:38-97`](docs/docs/styleguide/patterns/side-panel.md#L38) — the canonical "Reading list" example, which lays out `SearchInput → group label → List → group label → List` directly on the panel surface, with no cards.

State of the rules being mirrored (settings-page):

- [`docs/docs/styleguide/patterns/settings-page.md:52-127`](docs/docs/styleguide/patterns/settings-page.md#L52) — three sections, each as `<section>` with an `<h2>` outside the card, `<Card variant="elevated">` containing the rows.
- [`docs/docs/styleguide/patterns/settings-page.md:142-145`](docs/docs/styleguide/patterns/settings-page.md#L142) — "Section header. `<h2>` 14px weight-400 (regular!), letter-spacing 0.25px, above the card. Not inside." / "Section card. `variant="elevated"` — has the subtle `--cr-elevation-2` shadow that Chromium's `settings-section` uses. No outline."

This ticket has heavy overlap with #0005 (drop ALL CAPS section labels). The two should land together: the section heading recipe in #0005 (sentence case `<h2>`, regular weight) is also the heading for a card-per-section composition here. Implementing #0008 without #0005 would mean keeping the ALL CAPS recipe but moving it outside a new card — which is the worst of both worlds.

A note on `sections-and-rows.md`: that page already states the general "Cards group rows; rows do not live alone" rule, with `chrome://settings` as the reference. Side-panel was the only documented exception. Inverting the side-panel exception brings the styleguide back to one consistent rule across all surfaces.

## What hurts and why

Three coupled problems with the bare-surface composition in a typical extension side panel:

1. **Sections lose their boundaries.** A flat stack of rows with a hairline divider between groups makes the section headings and the rows feel like the same horizontal stratum. The user's eye does not group; everything reads as one long list. Card-per-section gives each group an outer perimeter that the eye registers as a unit before reading the rows.
2. **State and controls don't have a home.** A scraper panel with sections like RUN (current page + status), PROGRESS (collected count + phase), RESULTS PREVIEW (items + per-item state), FILTERS (toggle list) is a settings-shaped surface, not a flat-list-shaped surface. Settings-shaped surfaces want settings-shaped composition — exactly what `chrome://settings` ships and what `patterns/settings-page.md` documents.
3. **The bare-surface pattern was modelled on the wrong reference.** Chrome's built-in side panels (Reading List, Bookmarks, History) are flat lists of homogeneous content — each row has the same shape as the next. That justifies "no cards, the panel is the card". Extension side panels are heterogeneous — different sections have different shapes, different sections have different verbs. The right reference is settings, not Reading List. The current pattern picked the wrong template.

The deeper meta-problem is that the side-panel pattern carved out a special-case composition rule on the basis of one Chrome surface (Reading List) without testing whether that rule generalises to the actual target use case (extension side panels). It does not. Bringing side-panel composition back in line with settings-page composition removes the exception, simplifies the styleguide, and matches what extensions actually need.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Mirror settings-page exactly: one elevated card per section, sentence-case heading above.** Replace the `<List>`-on-bare-surface bodies in the canonical side-panel example with `<section>` + `<h2>` + `<Card variant="elevated"><List>…</List></Card>` blocks. Drop the "No card" rule and the "Wrapping the list in a Card" mistake. Tighten the side panel's tokens (`--sp-*`) to match: padding, gap, header height stay side-panel-specific, but the *composition* matches settings. Pros: one consistent rule across surfaces; matches the operator's request directly; resolves the styleguide's internal exception. Cons: the published side-panel pattern changes shape — anyone who built against the previous "no card" rule will visually regress. That risk is small for a pre-1.0 library.

2. **Hybrid: card-per-section *only when there are 2+ sections*; bare list when the panel is a single homogeneous list (Reading-List-shaped).** Keep both compositions documented; clarify the choice criterion explicitly. Pros: honours both the Reading-List and the settings reference; matches the actual heterogeneity of side-panel use cases. Cons: another decision point for the agent; "what counts as multiple sections" becomes a judgement call that the styleguide will have to enumerate.

3. **Drop side panels' card rule entirely; defer to the general sections-and-rows guidance.** No "No card" rule, no "use cards" rule — just say "side panels follow the same composition rules as any other surface (see `sections-and-rows.md`)". Pros: smallest, most principled diff; the side-panel page stops being a composition special case. Cons: leaves the canonical Reading-List example in an awkward position — it would have to be either rebuilt with cards (effectively direction 1) or kept as a one-off "single homogeneous list" example.

Working hypothesis (subject to revision when the work starts): direction 1, paired with #0005's sentence-case section headings. Direction 2 is appealing in theory but has a "what counts as multiple sections" sharp edge that the agent-following-prose failure mode keeps tripping over. Direction 3 collapses into direction 1 once the canonical example is rebuilt.

## Acceptance hints

- The canonical "Reading list" live example in `docs/docs/styleguide/patterns/side-panel.md` is restructured: each section is `<section>` + sentence-case `<h2>` (per #0005) + `<Card variant="elevated">` containing the `<List>` of rows. Sections sit on the panel surface separated by `--sp-card-gap` (or equivalent).
- The "No card" bullet at line 112 and the "Wrapping the list in a Card" mistake at line 200 are removed (or rewritten to recommend the card-per-section composition).
- The Bookmarks drill-in example further down the page is reviewed: if it has multiple sections, it gets the same treatment; if it remains a single flat list (folders), it can stay as-is with a note explaining the single-homogeneous-list case.
- The "Common side-panel mistakes" list is re-curated to remove rules invalidated by this change.
- `sections-and-rows.md` and `patterns/settings-page.md` are checked for consistency: the section composition rule is now uniform across surfaces (settings, side panel, popup), with no surface-specific exceptions in the prose.
- `npm run build:docs` stays green.
- Worth releasing in the same minor bump as #0002 / #0003 / #0005 / #0006 / #0007 — the side-panel pattern's overall shape is changing.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0005 (drop ALL CAPS section labels) — the heading recipe needed by this ticket.
- Related: tickets #0006 and #0007 — same pattern page, same operator turn, expected to co-implement.
- Related: ticket #0001 (toggle row interactivity) — toggle-bearing rows in the FILTERS section of the operator's prototype are the immediate beneficiaries of card-per-section.
- Related ADRs: _none yet_
- Reference URLs:
  - `https://ztnkv.github.io/chromium-ui-react/styleguide/patterns/side-panel` — current (bare surface).
  - `https://ztnkv.github.io/chromium-ui-react/styleguide/patterns/settings-page` — target composition shape.
- Reference Chromium surfaces: `chrome://settings/` (the composition target), `chrome://reading-list/` (the original — but-not-applicable — reference for "bare surface").
- Library files in scope: `packages/chromium-ui-react/src/components/Card/` (verify `variant="elevated"` is appropriate for the narrower side-panel surface).
- Docs in scope: `docs/docs/styleguide/patterns/side-panel.md` (primary), `docs/docs/styleguide/sections-and-rows.md` (consistency check), `docs/docs/styleguide/patterns/settings-page.md` (reference target).
