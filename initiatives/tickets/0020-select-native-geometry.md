---
title: "Ticket 0020 — Select: bring height, border, border-radius, and font-size in line with native Chrome"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0020 — Select: bring height, border, border-radius, and font-size in line with native Chrome

## Status

**open**

## Summary

The library's `Select` reads as a Material-Design-influenced control: 36px tall, 1px outline, small radius, 13px text. Native Chrome (the operator confirmed by inspecting a real `chrome://` Select with the screenshot attached to the report) is visibly different on four axes: shorter overall height, slightly more rounded corners, lighter / more secondary border, and one step smaller font size. Tighten Select on all four to match. The fix is geometry-only — no API surface change, no behaviour change, just CSS.

## Context

Source of the report: operator pulled up a native Chrome Select side-by-side with the library's preview while reviewing the styleguide composition / forms section, and called out the visual mismatch. Screenshot attached to the report shows a "Device" select from native Chrome at notably smaller height with a softer outline.

Library state — [`packages/chromium-ui-react/src/components/Select/Select.css`](packages/chromium-ui-react/src/components/Select/Select.css):

| Property | Current value | Defined at |
|---|---|---|
| `height` | `36px` | line 16 |
| `padding` | `0 28px 0 12px` (right padding accommodates the chevron SVG) | line 17 |
| `border` | `1px solid var(--cr-fallback-color-outline)` | line 18 |
| `border-radius` | `var(--cr-radius-sm)` | line 19 |
| `font-size` | `var(--cr-font-size-md)` (13px) | line 23 |
| Focus border | grows to `2px` width with compensating padding shrink | lines 38–42 |

Native Chrome reference (from the operator's screenshot of a "Device" select):

- Visibly shorter — looks ~32–33px tall, not 36px.
- Border feels lighter / more secondary — possibly `--cr-fallback-color-surface-variant` rather than `--cr-fallback-color-outline`, possibly a thinner stroke. Implementer should pick the closest match by eye and verify in dark mode.
- Corners more rounded — the current `--cr-radius-sm` produces a sharp-ish corner; the native shape looks closer to a 6–8px radius.
- Font size one notch down — the operator's read was "12 vs 13, or 13 vs 14, but one step smaller than body". Library currently uses `--cr-font-size-md` (13px); the native style probably wants `--cr-font-size-sm` (12px).

Where the value lands matters because Input and Textarea are expected to align with it (see ticket #0021). So this ticket sets the *anchor*; the next ticket tracks the *alignment*.

## What hurts and why

Two problems:

1. **The control reads as Material, not Chromium.** A 36px tall, sharp-cornered Select with primary-text-coloured chrome is the canonical Material Design select. Native Chrome's Select is visibly smaller, softer-cornered, and quieter. The library marketing claim is "Chromium-authentic visuals" — Select is one of the most-used form primitives, so a Material-feeling Select propagates the wrong feel everywhere.
2. **Vertical real estate matters in side panels.** A 360–400px-wide side panel that has 2–4 Select controls (FILTERS section in the operator's scraper prototype) currently spends 36px per control. Bringing the height down by 3–4px per control adds up — roughly half a row of saved space across the FILTERS section. The cost is zero — these are just CSS values.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Direct mirror of native Chrome.** Pick the closest `--cr-*` tokens to the visible native dimensions: `height: 32px`, `border-radius: var(--cr-radius-md)` (or a new token if `--cr-radius-md` does not match the native curve), `border-color: var(--cr-fallback-color-surface-variant)` (or whatever lands closest to the lighter-feeling stroke in both light and dark mode), `font-size: var(--cr-font-size-sm)` (12px). Pros: matches Chromium directly; smallest reasoning step. Cons: a 32px Select with 12px text might feel cramped on regular options pages; verify at the docs preview.

2. **Two-step compromise (33–34px / token-aligned).** Slightly less aggressive — keep height around 33–34px, use `--cr-radius-md`, `font-size` stays at 13px (`--cr-font-size-md`) but a future "compact form" mode can opt to 12px. Pros: less visual jump; lower regression risk. Cons: still doesn't fully match the native screenshot the operator referenced.

3. **Density-variant Select** (mirroring the Table component packed in #0016). Add a `density?: 'dense' | 'regular'` prop to Select; dense matches native Chrome (32px / 12px), regular keeps current 36px / 13px for full-tab options pages. Pros: addresses the side-panel-vs-options-page split cleanly. Cons: another prop in the public API; the simpler answer (just match Chromium) avoids the decision entirely.

Working hypothesis (subject to revision when the work starts): direction 1 (direct mirror), with the implementer verifying the chosen values against native Chrome side-by-side at implementation time. The density-variant idea (direction 3) is appealing for consistency with Table but probably overkill for Select alone — Chromium itself does not ship a denser-Select variant; one shape covers all surfaces. If a real consumer asks for the regular-density variant later, it can come back as a follow-up.

Three open questions to settle in the work turn:

- Is there a Chromium-faithful token for the lighter border colour, or does this ticket need to introduce one (e.g. `--cr-form-control-border` aliasing surface-variant)?
- Does the focus-state border thickening (1px → 2px with padding compensation) survive at the new height, or does it cause vertical jitter? Verify visually.
- Does the chevron SVG (currently a 10×6px triangle painted as `background-image`) still look right at the new height / font-size, or does it need a rescale?

## Acceptance hints

- `Select.css` updated: height ≤ 34px (likely 32px), border-radius matches the visible native curve, border colour reads as quieter than the current `--cr-fallback-color-outline`, font-size dropped one step (likely to `--cr-font-size-sm`).
- The visual diff is verified against a real `chrome://settings`-style Select side-by-side. The implementer should attach a screenshot pair to the PR description.
- Focus state stays unambiguous (the focus ring or border thickening still reads as "this is focused"); no vertical jitter on focus.
- Hover state (border darkens to `--cr-fallback-color-on-surface`) survives at the new geometry without looking heavy.
- Disabled state stays distinguishable.
- Dark mode (both `prefers-color-scheme: dark` and `[data-cr-theme="dark"]`) verified: the lighter border survives, the chevron SVG colour survives.
- All live previews of Select across docs render correctly at the new dimensions; spot-check forms, settings-page, side-panel patterns.
- `npm run build:lib && npm run build:docs` stays green.
- Release: minor version bump (visual default change for a public component, mirrors Card / Badge default-change rules).

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Strongly related: ticket #0021 (Input / Textarea geometry alignment with Select) — co-implemented; this ticket sets the anchor values.
- Related: ticket #0015 (Tabs: reduce default height) — same shape of "library default is more Material than Chromium, tighten it"; reference for how to pick a height-reduction value.
- Related precedent: tickets #0013 (Badge neutral default), #0014 (Card elevated default) — make the right shape the default shape.
- Related ADRs: _none yet_
- Reference: native Chrome `chrome://settings` Select controls (operator's screenshot attached to the report).
- Library files in scope: `packages/chromium-ui-react/src/components/Select/Select.css`, possibly `packages/chromium-ui-react/src/styles/tokens.css` (if a new border-colour or radius token is added).
- Docs to verify post-fix: `docs/docs/components/select.md`, `docs/docs/styleguide/forms.md`, `docs/docs/styleguide/sections-and-rows.md`, every pattern / sample that uses Select.
