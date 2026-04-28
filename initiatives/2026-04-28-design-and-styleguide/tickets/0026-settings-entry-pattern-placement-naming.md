---
title: "Ticket 0026 — Settings entry pattern: upper-half placement + standardised 'Settings' naming"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0026 — Settings entry pattern: upper-half placement + standardised 'Settings' naming

## Status

**open**

## Summary

The styleguide currently recommends putting an extension's settings entry at the **bottom** of the surface — `samples/link-collector.md` literally lists "Settings entry point is a drill-in row at the end of the content" as a positive checkpoint, the same shape recurs in the side-panel pattern's drill-in row, and the operator's review found this is the wrong default for the user journey: open extension → press the primary verb → maybe tweak a setting. A user who needs the setting first should not have to scroll to find it. The fix is twofold: (1) move the settings entry into the **upper half** of the extension surface (typically one of the first few rows), and (2) standardise its row label as **"Settings"** — the same word every time, no variation across "Options" / "Reader settings" / "Quick typography menu" / etc. Codify both as a new pattern page and add a matching anti-pattern entry.

## Context

Source of the report: operator's review of the `Samples` section of the styleguide, in two parts.

Part 1 — placement (Link Collector sample):

- [`docs/docs/styleguide/samples/link-collector.md:105`](docs/docs/styleguide/samples/link-collector.md#L105) — the popup live preview puts the Options drill-in row at the absolute bottom of the content, after the entire `Recently Saved` list of links.
- [`docs/docs/styleguide/samples/link-collector.md:164`](docs/docs/styleguide/samples/link-collector.md#L164) — explicit positive checkpoint: "✅ Settings entry point is a drill-in row at the end of the content, not a gear in the header."
- [`docs/docs/styleguide/patterns/side-panel.md`](docs/docs/styleguide/patterns/side-panel.md) — the canonical side-panel pattern's `Settings` drill-in is at the bottom of the row stack (verify on implementation; this was the shape in the original Reading-List-modelled pattern, before #0008 reshapes it).
- [`docs/docs/styleguide/anti-patterns.md`](docs/docs/styleguide/anti-patterns.md) anti-pattern #16 ("IconButton glued to a title in the header") — the *Right* recommendation says "demote it to a row the user can navigate to — a `Settings` drill-in at the bottom of the main panel". Same bottom-anchored advice, repeated as a positive recommendation.

So the bottom placement is currently a **load-bearing styleguide rule**, not a one-off example. Inverting it touches at least four pages.

Operator's reasoning for the inversion: the user's path is "open the panel → press the primary verb (save / scrape / parse / export) → optionally adjust a setting before pressing again". If the setting is at the bottom, the user has to scroll past unrelated content (saved items, results, status) to reach it. Native Chrome WebUI does not have this problem because most chrome:// surfaces have static sidebars that keep settings persistently visible — but extension popups and side panels are linear scrolling surfaces, so order matters.

Part 2 — naming (Samples sweep):

- Link Collector calls it `Options`.
- Reader Mode (next sample over) calls it `Reader Settings`.
- Other places use `Settings`.
- No styleguide rule on which word to pick.

Operator: "прямо прошу — выделить это в отдельный паттерн … раздел настроек, который практически всегда будет у нас, должен называться Settings".

The two parts are tightly coupled — naming and placement are two attributes of the same recurring pattern (the settings entry row). One pattern page can carry both rules.

## What hurts and why

Three problems:

1. **Bottom-anchored settings buries the most useful affordance.** The user's mental model for an extension is "this is a small focused tool"; the settings affordance is part of "what this tool can do for me". Hiding it at the bottom makes the tool feel less configurable than it is. For a Chrome extension specifically — where the surface is small and there is no global menu / chrome to fall back on — discoverability is everything.
2. **Naming variance signals "different things".** `Options` vs `Reader Settings` vs `Settings` — same row, three labels. A user who learns one extension's vocabulary has to relearn it for the next. Standardising on `Settings` is free and reduces friction across the whole extension ecosystem this library powers.
3. **The styleguide actively endorses the wrong shape.** The "✅ Settings entry point is a drill-in row at the end of the content" checkpoint is not a passive omission — it is a positive recommendation. Anti-pattern #16's right-side example doubles down. Without rewriting these load-bearing pages, every agent following the styleguide will produce the bottom-anchored shape.

The deeper meta-problem: the styleguide picked a positive-recommendation shape (settings-at-the-bottom) without verifying that it survives in the *target use case* (extension surfaces). On `chrome://settings`, the question does not arise — settings *is* the surface. On a 360px popup or side panel, the placement is a real decision that needs a real rule.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **New pattern doc + new anti-pattern; sweep all references.** Create `docs/docs/styleguide/patterns/settings-entry.md` codifying: (a) the row label is always "Settings" (capitalised, sentence case per #0005); (b) the row is in the **upper half** of the surface, typically one of the first 1–3 rows after the header (or first if the surface has no header per #0019); (c) the visual shape is a drill-in row with a chevron. Add an anti-pattern entry "Settings entry buried at the bottom of the surface" to `anti-patterns.md` with wrong / right pairs. Sweep `samples/link-collector.md`, `samples/reader-mode.md`, `samples/tab-manager.md`, `patterns/side-panel.md`, anti-pattern #16's right-side example — wherever the bottom-anchored shape or the variable naming appears, fix it. Pros: one coherent rule across the whole styleguide; matches operator's request directly. Cons: cross-cuts ~5 pages; touches the same files as #0008 (side-panel restructure) and so wants careful sequencing.

2. **Anti-pattern only, no new pattern doc.** Add the anti-pattern entry, sweep examples, mention the rule once in `principles.md` or `layout.md`. Skip the standalone pattern page. Pros: smaller surface area to maintain. Cons: no positive guidance — agents land on the rule via the anti-pattern, which is harder to discover proactively than reading a pattern page.

3. **Pattern only, no anti-pattern.** Create the pattern page, link from existing pages, but do not add a new anti-pattern entry. Pros: positive framing; one less catalogue entry. Cons: the anti-pattern catalogue is the most-scanned part of the styleguide for "what should I avoid"; not having an entry makes the rule weaker in review.

Working hypothesis (subject to revision when the work starts): direction 1, mirroring the precedent set by `patterns/primary-action.md` (a focused pattern doc) plus an anti-pattern entry. Both halves of the rule (placement + naming) live in the pattern page; the anti-pattern catches the wrong shape during review.

Open questions for the work turn:

- Is "upper half" the right phrasing, or should it be more specific (e.g. "first three rows of the content area, immediately below the primary status / verb")? The pattern page should probably show 2–3 layout examples — popup, side panel, options page — and let the implementer pick the closest match.
- Does the standardised name still apply when the extension genuinely has *no* global settings (e.g. a one-button capture extension)? Probably the rule reads "if a settings entry exists, it is called Settings" — having one is not mandatory.
- Anti-pattern #16's right-side example currently recommends bottom-anchored. Should it be rewritten to point at the new pattern page instead of repeating the placement rule?

## Acceptance hints

- A new pattern page exists at `docs/docs/styleguide/patterns/settings-entry.md` covering: (a) row label is always "Settings"; (b) placement is in the upper half of the surface, typically one of the first 1–3 rows; (c) visual shape is a drill-in row; (d) when not to have a settings entry at all (truly stateless extensions). At least one live preview per surface type (popup, side panel, options page).
- A new anti-pattern entry is added to `docs/docs/styleguide/anti-patterns.md`: "Settings entry buried at the bottom of the surface". Wrong = current Link Collector shape; Right = settings drill-in in the upper half.
- `docs/docs/styleguide/samples/link-collector.md` is updated: the `Options` drill-in becomes a `Settings` row in the upper half (probably right after the primary status row, before the saved-links list); the line-164 positive checkpoint about bottom placement is removed or rewritten.
- `docs/docs/styleguide/samples/reader-mode.md` is updated: `Reader Settings` becomes `Settings`, placed in the upper half (the operator noted that for Reader Mode the bottom placement *might* still be defensible because the panel is content-dominated; the implementer can keep it bottom-anchored *if* a brief justification is added in the sample's prose, or move it to upper half for consistency — implementer's call, but lean toward consistency).
- `docs/docs/styleguide/samples/tab-manager.md` is reviewed and updated if needed.
- `docs/docs/styleguide/anti-patterns.md` anti-pattern #16's Right (drill-in row) example is updated: the Settings drill-in moves up in the row stack, not at the bottom.
- `docs/docs/styleguide/patterns/side-panel.md`'s canonical example is updated to put Settings in the upper half (coordinate with #0008's restructure of the same example).
- The new pattern page is registered in `docs/sidebars.ts` next to the other pattern pages.
- `npm run build:docs` stays green.
- Release: docs-only ticket. Patch bump unless co-shipped with a minor.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0008 (side-panel card-per-section) — same canonical example as this ticket's side-panel sweep, co-implementation.
- Related: ticket #0019 (layout shell content-only by default) — both reshape what an extension surface looks like; the "upper half" rule presumes the surface starts with content.
- Related: ticket #0027 (Reader Mode sample empty-space bug) — same sample touched by both.
- Related ADRs: _none yet_; "Settings entry placement and naming" might warrant an ADR if the rule is contested later.
- Reference: there is no single "chrome://" surface to copy here — Chrome's built-in extension model does not standardise this. The rule is a deliberate library-level convention for the extension surfaces this library targets.
- Library files in scope: none — pure docs / pattern work.
- Docs in scope: new file `docs/docs/styleguide/patterns/settings-entry.md`; updates to `docs/docs/styleguide/anti-patterns.md` (new entry + #16 right-side rewrite); `docs/docs/styleguide/samples/link-collector.md`, `docs/docs/styleguide/samples/reader-mode.md`, `docs/docs/styleguide/samples/tab-manager.md`, `docs/docs/styleguide/patterns/side-panel.md`; sidebar registration in `docs/sidebars.ts`.
