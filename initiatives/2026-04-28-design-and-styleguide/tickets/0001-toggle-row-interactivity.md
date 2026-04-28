---
title: "Ticket 0001 — Toggle rows: whole row clickable + row-level hover"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0001 — Toggle rows: whole row clickable + row-level hover

## Status

**open**

## Summary

A row in `chromium-ui-react` that contains a `Toggle` in its `end` slot does not behave the way a native Chromium settings row does: clicking on the row's text area does not flip the switch, and hovering over the row does not produce a row-level fill. Both signals — the click target and the hover affordance — are wired only to the `Toggle` itself, leaving the rest of the row inert and visually flat. The fix should make the broken composition the harder thing to assemble.

## Context

Source of the report: the Google Maps scraper side panel prototype generated against the current library + styleguide. The operator noticed it because rows like "Auto-resume on scroll" / "Has phone" / "Has website" felt dead — the secondary text and primary label were unresponsive, even though they visually look like they should be part of the same hit target as the switch on the right.

Native reference: `chrome://settings/`, `chrome://flags/`, `chrome://settings/performance/` — every settings row with a switch is one click target end-to-end, and the entire row paints a hover fill on pointer-over.

Current state in the library:

- `packages/chromium-ui-react/src/components/Toggle/Toggle.tsx` — `Toggle` is an `<input type="checkbox" role="switch">` wrapped in its own `<label>`. The label only spans the track + the optional inline `label` prop; it cannot be widened externally without restructuring the row markup, because the row containers are not slotting an `<input>` of their own to associate with.
- `packages/chromium-ui-react/src/components/List/List.tsx` — `ListItem` accepts `interactive` as a boolean prop (`ListItemProps`, line 17), but the implementation only adds a CSS modifier class (line 32). There is no `onClick`, no `role="button"`, no `tabIndex`, no keyboard handling, and no relationship between the row click surface and whatever sits in `end`.
- `packages/chromium-ui-react/src/components/PanelStack/PanelRow.tsx` — `PanelRow` *is* properly interactive (`role="button"`, `tabIndex`, Enter/Space handlers, hover styles when `cr-panel-row--interactive` is set), but the click handler invokes `onClick` and/or `navigateTo` (`PanelRow.tsx:60-75`). A `Toggle` parked in `end` is just a child node — its checked state is not touched by the row's click handler.

So neither container resolves the problem on its own, and the `Toggle` cannot widen its own label because it is structurally one of several siblings inside `end`.

## What hurts and why

Two coupled issues:

1. **Click target is too narrow.** A user who points at the row label expects the same affordance that every Chromium settings row provides — clicking the text flips the switch. In our library, that click is silently swallowed. This is more than a polish problem: agents that follow the styleguide and assemble `ListItem` + `Toggle` (or `PanelRow` + `Toggle`) end up with UI that *looks* like Chromium and *behaves* unlike Chromium. The styleguide's anti-patterns page already calls out this kind of "looks-right, behaves-wrong" failure mode for icon buttons in headers (#16) and for buried primaries (#17); this is the same shape, in a different surface.
2. **Hover affordance is missing.** Without a row-level hover fill, the row reads as decorative text plus an interactive widget. Users learn to aim for the widget; the row itself stops feeling like a control. This makes problem (1) self-reinforcing, because the row never advertised itself as clickable in the first place.

The deeper meta-problem is the same one that drove the Badge fix in commit `77bafca`: when the styleguide says "rows with controls should behave like Chromium rows" but the components let an agent assemble a row that does not, the rule is not enforced where it matters. The component API is the only place that scales.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **New primitive** — `ToggleRow` (or `SwitchRow`). A purpose-built row that takes a `Toggle`'s state props (`checked`, `defaultChecked`, `onChange`, `disabled`) plus row-shape props (`primary`, `secondary`, `icon`) and renders the whole thing inside a single `<label>` so that any click in the row reaches the underlying input via standard HTML association. Pros: most idiomatic, no behavioural ambiguity, hover styling is a one-liner because the row is the label. Cons: yet another primitive to remember; agents must know to reach for it instead of `ListItem` + `Toggle`.

2. **Enriched `ListItem` / `PanelRow`** for the `end={<Toggle>}` case. Detect a `Toggle` (or any `role="switch"` / `type="checkbox"` element) in `end` and either (a) wire the row's click handler to call the toggle's `onChange`, or (b) render the row inside a `<label>` whose `htmlFor` ties to the input's id. Pros: existing call sites become correct without new component imports. Cons: magical behaviour that depends on the *type* of children — bad for explainability, hard to test, surprising when a non-Toggle ends up in `end`.

3. **`<label>`-wrapping styleguide pattern**, no API change. Document the canonical Chromium-row-with-toggle composition (`<label>` outside, `Toggle` inside, row content beside it) as the only blessed way to build this surface. Pros: zero code change. Cons: identical to the failure mode this ticket is about — relying on the styleguide to enforce a rule that the components allow violating.

Working hypothesis (subject to revision when the work starts): direction (1) is the cleanest fit with the existing component vocabulary, especially after the Badge precedent of "remove the option, not restate the rule." Direction (2) might still appear as a soft warning in dev, but as the primary path it carries too much hidden behaviour for a pre-1.0 library that emphasises explicit composition.

## Acceptance hints

- A row with a switch — built using whatever the chosen primitive ends up being — toggles its switch on click anywhere within the row's bounds, including on the primary text, secondary text, and any decorative icon.
- The same row paints a hover fill across its entire width on pointer-over, matching `--cr-hover-background-color` (or whatever token the existing `cr-list-item--interactive` / `cr-panel-row--interactive` hover uses).
- Keyboard parity: focusing the switch and pressing Space toggles it (this already works via the underlying `<input>`). If the row exposes its own focus target in addition, Enter/Space on the row toggles too.
- Accessibility: only one focusable element per row (the switch) so that tab-order does not double up. Screen readers announce it as a switch with the row's primary text as the accessible name.
- Existing call sites that already use `ListItem` / `PanelRow` + `Toggle` either keep working (if the fix is direction 2) or get a deprecation hint pointing to the new primitive (if the fix is direction 1). The `anti-patterns.md` and `forms.md` styleguide pages get updated to point at the canonical pattern.
- If a new primitive is introduced, it ships with its own docs page under `docs/docs/components/`, registered in `docs/sidebars.ts`, and a live preview that demonstrates click-anywhere + hover.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related ADRs: _none yet_
- Reference surfaces: `chrome://settings/`, `chrome://flags/`, `chrome://settings/performance/`
- Library files in scope: `packages/chromium-ui-react/src/components/List/List.tsx`, `packages/chromium-ui-react/src/components/PanelStack/PanelRow.tsx`, `packages/chromium-ui-react/src/components/Toggle/Toggle.tsx`
- Styleguide pages likely affected: `docs/docs/styleguide/sections-and-rows.md`, `docs/docs/styleguide/forms.md`, `docs/docs/styleguide/anti-patterns.md`
