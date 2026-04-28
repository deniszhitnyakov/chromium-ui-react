---
title: "Ticket 0021 — Input / Textarea: align height, border-radius, and font-size with the new Select"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0021 — Input / Textarea: align height, border-radius, and font-size with the new Select

## Status

**open**

## Summary

`Input` and `Textarea` (the library's `Textarea` is just `Input` rendered with the `--textarea` modifier — same CSS file) currently match the *current* Select geometry: 36px height, `--cr-radius-sm` border-radius, 13px text. Once Select moves to its native-Chrome dimensions (ticket #0020), Input and Textarea need to come along — otherwise a form row that mixes Input, Select, and the multiline Textarea ends up with three controls of three different heights / radii / font sizes, and the Chromium-native consistency the form is supposed to read with collapses. This ticket tracks the alignment.

## Context

Source of the report: operator's review of the composition / forms section, immediately after the Select observation: "то же самое справедливо и для прочих Inline Input, а еще — для уменьшения размера шрифта у них" (the same applies to other inline inputs, and to reducing their font size). Plus the explicit consistency note for border-radius: he wants Input radius to follow whatever Select lands at in #0020 because there is no separate native-Chrome reference for a standalone Input — the natural anchor is Select.

Library state — [`packages/chromium-ui-react/src/components/Input/Input.css`](packages/chromium-ui-react/src/components/Input/Input.css):

| Property | Current value | Defined at |
|---|---|---|
| Field `height` | `36px` (single-line Input) | line 15 |
| Field `padding` | `0 12px` | line 16 |
| Field `border` | `1px solid var(--cr-fallback-color-outline)` | line 17 |
| Field `border-radius` | `var(--cr-radius-sm)` | line 18 |
| Field `font-size` | `var(--cr-font-size-md)` (13px) | line 22 |
| Focus border | grows to `2px` with compensating padding shrink | lines 33–37 |
| Textarea modifier | `min-height: 80px`, `padding: 8px 12px`, otherwise inherits | lines 63–72 |
| Search field | `height: 36px`, `border-radius: 18px` (pill — separate shape, intentional) | lines 91–105 |

Note: `SearchInput` uses a deliberately different shape (pill / filled background). It is *not* in scope for this alignment — it has its own Chromium-faithful look (the `chrome://history` search field is a filled pill, distinct from form-field inputs) and stays as-is. This ticket is about the standard `Input` and `Textarea` only.

Why this ticket exists separately from #0020:

1. The operator explicitly named both Select *and* "the other inline inputs" as needing the same treatment.
2. Implementing Select's geometry change without bringing Input/Textarea along would break visual consistency in any form that mixes them — and the styleguide's `forms.md` page is built almost entirely on such mixed forms.
3. The two tickets *can* land in one PR (and probably should), but tracking them separately keeps the reasoning clean: #0020 picks the values, #0021 propagates them.

## What hurts and why

Three problems if Input/Textarea are *not* aligned after Select changes:

1. **Mixed forms become uneven.** A typical Chromium-style form has labelled rows like "Display name [Input]" / "Time zone [Select]" / "Bio [Textarea]". If Input and Select have different heights and radii, the row labels stop visually lining up; the form gains an asymmetry the eye keeps catching on.
2. **The styleguide's "consistent form controls" implication breaks.** `forms.md` does not currently spell out "all form controls share geometry", but every example assumes it. After #0020 alone, that implicit rule is broken silently.
3. **Vertical real estate gain from #0020 is partially wasted.** A side-panel form that mixes 32px Selects with 36px Inputs only saves space on half the controls. Aligning gives the full saving.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Match Select exactly.** Whatever values #0020 settles on (height, border-radius, border colour, font-size), apply the same to `.cr-input__field` and the textarea modifier. Single-source the values via shared tokens (`--cr-form-control-height`, `--cr-form-control-radius`, etc.) so future tweaks affect both at once. Pros: maximum consistency; values already justified by #0020's research; minimal extra work in the same PR. Cons: forces every form-control change to be coordinated across both files; small overhead but probably worth it.

2. **Match Select except font-size.** Use Select's height, border, and radius, but keep Input/Textarea at 13px (`--cr-font-size-md`) because text inside an editable field reads better at 13px than 12px (selection, caret position, multi-line wrapping). Pros: editable-text legibility wins over geometric consistency. Cons: forms gain a font-size mismatch between Input and Select that becomes visible the moment the user clicks into a row.

3. **Match Select height and font-size, but leave border-radius unchanged.** Same as direction 1 but skip the radius alignment — argument is that Input is rectangular by tradition and a rounder corner makes it look "less like an input". Pros: preserves a familiar visual cue. Cons: breaks the cross-control consistency the operator explicitly asked for ("border-radius должен быть consistent с Select").

Working hypothesis (subject to revision when the work starts): direction 1 (match exactly), implemented via shared tokens. The shared-token approach also makes a future `density="dense"` variant (if the styleguide ever needs one) trivial to add — flip one token, all form controls follow. Direction 2's legibility argument is valid in principle but probably wrong here: Chromium's actual Input controls run at 12–13px depending on surface, and consistent geometry trumps a 1px legibility argument for screenshots taken side-by-side.

## Acceptance hints

- `Input.css` updated: field height matches Select's new height (probably 32px); border-radius matches Select's new radius; font-size matches Select's new font-size; border colour matches Select's new border colour.
- Textarea modifier updated to match where appropriate: `min-height` keeps a sensible default (probably ~80px), `padding` adjusted if the new height changes line spacing.
- A short comment in `Input.css` (or a token in `tokens.css`) explicitly notes that Input and Select share geometry by design — so a future contributor knows to update both together.
- `SearchInput` is **not** changed — the pill shape and filled background are intentional and Chromium-faithful for that specific control.
- Focus state stays unambiguous; no vertical jitter on focus.
- All live previews that include Input or Textarea (forms.md, settings-page pattern, side-panel pattern, dialog examples) render correctly at the new geometry.
- The styleguide's `forms.md` page gains one short sentence (probably under the "Submit row" or "Field stack" section) noting that Input, Textarea, and Select share geometry for visual consistency.
- `npm run build:lib && npm run build:docs` stays green.
- Release: minor version bump (visual default change), co-shipped with #0020.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0020 (Select native geometry) — co-implemented; this ticket inherits #0020's chosen values.
- Related: ticket #0011 (RadioGroup uncontrolled bug) — same form-controls family; could be sequenced into the same forms cleanup PR if convenient.
- Related precedent: tickets #0013 (Badge neutral default), #0014 (Card elevated default), #0015 (Tabs height).
- Related ADRs: _none yet_
- Library files in scope: `packages/chromium-ui-react/src/components/Input/Input.css`, possibly `packages/chromium-ui-react/src/styles/tokens.css` (shared form-control tokens).
- Docs to verify post-fix: `docs/docs/components/input.md`, `docs/docs/components/textarea.md` (if separate), `docs/docs/styleguide/forms.md`, every pattern / sample / dialog example using Input or Textarea.
