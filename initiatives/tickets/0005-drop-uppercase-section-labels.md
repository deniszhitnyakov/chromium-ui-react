---
title: "Ticket 0005 — Drop ALL CAPS section labels everywhere; sentence case is the Chromium-native default"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0005 — Drop ALL CAPS section labels everywhere; sentence case is the Chromium-native default

## Status

**open**

## Summary

The Google Maps scraper side panel ships its section labels — "RUN", "PROGRESS", "RESULTS PREVIEW", "FILTERS" — in 11px ALL CAPS with letter-spacing, because that is the recipe the styleguide actively recommends for side panels. But native Chromium surfaces (`chrome://settings`, `chrome://bookmarks`, `chrome://downloads`, the in-browser side-panel surfaces) use **sentence case** for section headings — first letter capitalised, the rest lowercase, no letter-spacing, same weight as body text. The styleguide already says this for full-tab options pages and even calls 11px uppercase "**not** how Chromium settings groups sections", but then carves out a side-panel exception that contradicts itself and contradicts the actual surfaces it points at. Drop the exception; drop the recipe; make sentence case the only blessed shape.

> **Terminology note.** The operator's request used the word "PascalCase". The intended meaning is **sentence case** — `Run`, not `RUN` and not `Run Controls`. PascalCase (`RunControls`) is an identifier convention, never a UI-text convention. The rest of this ticket uses "sentence case".

## Context

Source of the report: the same Google Maps scraper side panel screenshot that drove tickets #0001–#0004. The four section labels at the top of the panel ("RUN" / "PROGRESS" / "RESULTS PREVIEW" / "FILTERS") are visually loud because they are the only ALL-CAPS text on the surface, and they read as more architectural than the actual content rows below them.

Native reference for sentence-case section headings:

- `chrome://settings/` — "On startup", "Appearance", "Search engine", "Default browser", "Privacy and security". Sentence case.
- `chrome://bookmarks/` — sidebar headings "Bookmarks bar", "Other bookmarks", "Mobile bookmarks". Sentence case.
- `chrome://downloads/` — date headings "Today", "Yesterday", "Last week". Sentence case.
- In-browser side panels (Reading List, Bookmarks, Side Search) — section labels are sentence case where they exist; usually no labels at all because the panels are flat lists.

Library state — ALL CAPS is baked in at three layers:

1. **Utility classes in base CSS:** [`packages/chromium-ui-react/src/styles/base.css`](packages/chromium-ui-react/src/styles/base.css)
   - `.cr-label-small` (line 66–73) — `font-size: --cr-font-size-xs`, `letter-spacing: .4px`, `text-transform: uppercase`.
   - `.cr-section-header` (line 74–82) — `font-size: --cr-font-size-xs`, `letter-spacing: .8px`, `text-transform: uppercase`. Named exactly to be the section header.

2. **Component CSS:**
   - [`packages/chromium-ui-react/src/components/Tabs/Tabs.css:25`](packages/chromium-ui-react/src/components/Tabs/Tabs.css#L25) — `text-transform: uppercase`.
   - [`packages/chromium-ui-react/src/components/Menu/Menu.css:73`](packages/chromium-ui-react/src/components/Menu/Menu.css#L73) — `text-transform: uppercase` (Menu group labels).

3. **Live examples + styleguide prose:** the inline-style recipe `{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cr-fallback-color-on-surface-subtle)', padding: '0 16px 8px' }` is hand-rolled in at least eight places:
   - [`docs/docs/styleguide/typography.md`](docs/docs/styleguide/typography.md) — line 36 (in the type-scale demo), section "All-caps section label" line 124+, lines 96, 102, 133, 167.
   - [`docs/docs/styleguide/sections-and-rows.md`](docs/docs/styleguide/sections-and-rows.md) — lines 147, 159, 173, plus the prose at lines 52–54 that *contradicts* the recipe ("11px uppercase ... is **not** how Chromium settings groups sections").
   - [`docs/docs/styleguide/forms.md`](docs/docs/styleguide/forms.md) — line 145, 150, 162.
   - [`docs/docs/styleguide/patterns/side-panel.md`](docs/docs/styleguide/patterns/side-panel.md) — lines 44, 76, 110 (the explicit endorsement: "Side panels *do* use this pattern").
   - [`docs/docs/styleguide/samples/tab-manager.md`](docs/docs/styleguide/samples/tab-manager.md) — lines 59, 105.
   - [`docs/docs/styleguide/samples/link-collector.md`](docs/docs/styleguide/samples/link-collector.md) — line 131.
   - [`docs/docs/components/panel-stack.md`](docs/docs/components/panel-stack.md) — lines 76, 90.
   - [`docs/docs/styleguide/checklist.md`](docs/docs/styleguide/checklist.md) — line 54 ("Sections may have a small all-caps label above them").
   - [`docs/docs/styleguide/checklist.md`](docs/docs/styleguide/checklist.md) — line 77 (type-scale table: `--cr-font-size-xs` "All-caps section labels").

The styleguide's internal contradiction is itself part of the bug: `sections-and-rows.md:52–54` and `patterns/side-panel.md:110` say opposite things about the same pattern. The agent followed the side-panel page (because the prototype is a side panel) and produced ALL CAPS labels — exactly what `sections-and-rows.md` warned against.

A note on `cr-form-field-label`: the styleguide's [`chromium-reference.md`](docs/docs/styleguide/chromium-reference.md) correctly observes that Chromium does have a 10px caps-style label — but it is the label *above an input*, not above a section. That narrow precedent does not justify the section-label recipe and should not be conflated with it.

## What hurts and why

Three coupled problems:

1. **It does not match Chromium.** The most basic test — open `chrome://settings` next to the prototype — and the typographic register is wrong. Sentence-case headings read as "this is part of the surface"; ALL CAPS reads as "this is a different layer of the application", because in Chromium ALL CAPS is reserved for legal small print, kbd labels, and the rare 10px form-field label — not for grouping content.
2. **It violates the typography-restraint principle.** `typography.md` explicitly says "If you feel the urge to make something more prominent, use weight-500 (medium), not a larger size" and "The only tracked text in Chromium is the 11px all-caps label (~0.06em). Nothing else gets tracked." The 11px-caps recipe was the styleguide's one carved-out exception and it is leaking into every section header. Removing it returns the styleguide to its own stated principle.
3. **The styleguide is internally inconsistent.** Two pages, opposite advice, same recipe. An agent loading both pages sequentially (which any agent will, since they are linked from each other) gets contradictory guidance and picks the visually louder option. The fix has to remove the contradiction, not paper over it with another rule.

The deeper meta-problem is the same one that produced tickets #0001, #0003, #0005: a pattern that produces non-Chromium output is supported by both a CSS class (`.cr-section-header`) and a styleguide recipe. Either layer alone might be salvageable; both together make the wrong shape the easy shape.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Remove the recipe everywhere; sentence case is the only shape.** Strip `text-transform: uppercase` and `letter-spacing` from `.cr-section-header` and `.cr-label-small` in `base.css`; rebuild them as plain "subtle small label" utilities (e.g. weight-500 sentence-case, `--cr-fallback-color-on-surface-subtle`). Do the same in `Tabs.css` and `Menu.css`. Sweep all eight live-example sites in the styleguide and components docs. Resolve the `sections-and-rows.md` ↔ `patterns/side-panel.md` contradiction by deleting the side-panel exception and rewriting the bullet at `patterns/side-panel.md:110`. Add an anti-pattern entry "ALL CAPS section labels" with wrong / right pairs. Pros: direct, mirrors the Badge / fullWidth removals. Cons: small visual regression for any consumer who already relies on the caps look; that risk is low for a pre-1.0 library.

2. **Scope reduction — keep caps only where Chromium itself uses them.** Audit `cr-elements` precedents (form-field labels, kbd-style hints, and possibly menu group labels in `cr-action-menu`). Keep `text-transform: uppercase` only where it has a verified Chromium precedent, and only on the matching primitive (a dedicated `<FormFieldLabel>` for the 10px caps label, for instance). Drop everywhere else. Pros: respects the few real Chromium caps usages. Cons: heavier audit, more nuance to maintain, and the hard line "no caps for section labels" gets fuzzier — which is the failure mode this initiative keeps fighting.

3. **Prose-only normalisation.** Tighten the styleguide to forbid ALL CAPS section labels, sweep examples, but leave `.cr-section-header` and the component CSS as-is so that consumers who already use them keep their look. Pros: zero CSS-level breakage. Cons: same shape as Badge prose-only-rule before commit `77bafca` — the rule is in the prose, the option is in the API, the agent picks the option.

Working hypothesis (subject to revision when the work starts): direction 1, mirroring the Badge precedent. If a narrow `cr-form-field-label`-style component is later needed for forms, it can come back as its own primitive with a single, clearly-scoped use; that is a separate ticket, not a reason to leave the section-label recipe in place.

## Acceptance hints

- `text-transform: uppercase` does not appear in `.cr-section-header`, `.cr-label-small`, `Tabs.css`, or `Menu.css`. The classes either become sentence-case-and-subtle or are renamed / removed if they no longer carry a unique role.
- No live preview anywhere under `docs/docs/styleguide/`, `docs/docs/components/`, or `docs/docs/styleguide/samples/` uses the `textTransform: 'uppercase'` inline recipe for a section label.
- The `sections-and-rows.md` ↔ `patterns/side-panel.md` contradiction is resolved: both pages say the same thing, which is "section labels are sentence case, regardless of surface".
- `typography.md` no longer carries an "All-caps section label" section as a recommended pattern. If the form-field label survives as a separate, narrow concept, it lives in its own subsection with explicit scope ("only above a single input, never above a card / list / section").
- `checklist.md:54` and `checklist.md:77` updated — the type-scale row for `--cr-font-size-xs` lists "tiny inline labels, badges, kbd hints", not "all-caps section labels".
- A new anti-pattern is added to `docs/docs/styleguide/anti-patterns.md` ("ALL CAPS section labels") with wrong / right live previews matching the visual style of #16 / #17.
- `npm run build:lib && npm run build:docs` stays green.
- Release: this is visual-only on the consumer side (no API changes), but it changes the painted look of `.cr-section-header` and `.cr-label-small`. Worth flagging in the release notes, even on a minor bump.

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Related tickets: #0001 (toggle rows), #0002 (footer border), #0003 (drop fullWidth), #0004 (button label length) — all from the same prototype screenshot, all the same shape of "styleguide already suspects the rule, but a CSS / API affordance carries the wrong default".
- Related precedent: commit `77bafca` ("feat!: drop solid Badge appearance") — same removal-over-restatement shape.
- Reference surfaces: `chrome://settings/`, `chrome://bookmarks/`, `chrome://downloads/`, in-browser Reading List side panel.
- Library files in scope: `packages/chromium-ui-react/src/styles/base.css`, `packages/chromium-ui-react/src/components/Tabs/Tabs.css`, `packages/chromium-ui-react/src/components/Menu/Menu.css`.
- Docs in scope: `docs/docs/styleguide/typography.md`, `docs/docs/styleguide/sections-and-rows.md`, `docs/docs/styleguide/forms.md`, `docs/docs/styleguide/patterns/side-panel.md`, `docs/docs/styleguide/checklist.md`, `docs/docs/styleguide/anti-patterns.md`, `docs/docs/styleguide/samples/tab-manager.md`, `docs/docs/styleguide/samples/link-collector.md`, `docs/docs/components/panel-stack.md`.
