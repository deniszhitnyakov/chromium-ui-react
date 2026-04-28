---
title: "Ticket 0002 — Pinned-footer top border should match Divider color, not Card outline"
status: done
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0002 — Pinned-footer top border should match Divider color, not Card outline

## Status

**done** — directions 1 + 2 combined: introduced `--cr-divider-color` semantic alias (resolves to `--cr-fallback-color-surface-variant` in light and dark), Toolbar / Divider read from it, and all 9 styleguide live previews now use `var(--cr-divider-color)` for the pinned-footer top border. `color.md` row split into "Border (heavy)" / "Border (hairline)" so the rule has a name.

## Summary

The 1px top border on the pinned "footer actions" strip in our extension-popup / side-panel live examples uses `--cr-fallback-color-outline` — the same token cards and inputs use for their visible border. That reads heavier than a section divider and ends up looking like a stronger architectural seam than it should. The Toolbar's bottom border and every `Divider` use `--cr-fallback-color-surface-variant`, which is the quiet hairline you want bracketing a footer too. Normalise the footer to match.

## Context

Surfaced from the public styleguide page on layout, section "1. Extension popup" — [`https://ztnkv.github.io/chromium-ui-react/styleguide/layout#1-extension-popup`](https://ztnkv.github.io/chromium-ui-react/styleguide/layout#1-extension-popup) — where the footer's top border visibly differs from the Toolbar's bottom border in the same preview. They are sitting on the same surface and bracketing the same scroll region, so the eye expects them to read as twins.

Token state in [`packages/chromium-ui-react/src/styles/tokens.css`](packages/chromium-ui-react/src/styles/tokens.css):

- `--cr-fallback-color-surface-variant` — quiet hairline grey, flips for dark mode (line 92 light, line 208/243 dark).
- `--cr-fallback-color-outline` — heavier outline used for cards, inputs, the panel-stack frame.
- There is **no** `--cr-divider-color` semantic alias today.

What actually uses `--cr-fallback-color-surface-variant`:

- [`packages/chromium-ui-react/src/components/Toolbar/Toolbar.css:7`](packages/chromium-ui-react/src/components/Toolbar/Toolbar.css#L7) — Toolbar `border-bottom`.
- [`packages/chromium-ui-react/src/components/Divider/Divider.css:4`](packages/chromium-ui-react/src/components/Divider/Divider.css#L4) — Divider default `background`.

What uses `--cr-fallback-color-outline` for the pinned footer (all live examples, all should switch):

| File | Line |
|---|---|
| [`docs/docs/styleguide/layout.md`](docs/docs/styleguide/layout.md) | 67 |
| [`docs/docs/styleguide/forms.md`](docs/docs/styleguide/forms.md) | 178 |
| [`docs/docs/styleguide/anti-patterns.md`](docs/docs/styleguide/anti-patterns.md) | 288 |
| [`docs/docs/styleguide/patterns/side-panel.md`](docs/docs/styleguide/patterns/side-panel.md) | 162 |
| [`docs/docs/styleguide/patterns/extension-popup.md`](docs/docs/styleguide/patterns/extension-popup.md) | 101 |
| [`docs/docs/styleguide/patterns/primary-action.md`](docs/docs/styleguide/patterns/primary-action.md) | 160, 198, 230 |
| [`docs/docs/styleguide/samples/link-collector.md`](docs/docs/styleguide/samples/link-collector.md) | 114 |

There is no `Footer` / `ActionFooter` / `SheetFooter` component in the library — every live example builds the pinned strip from a raw `<div>` with inline styles. So the divergence is reproduced in nine places by hand, and any consumer copying from the docs will inherit the same heavier border.

## What hurts and why

The pinned-footer strip is structurally the lower mirror of the Toolbar: thin hairline, surface fill, holds chrome (title above, primary action below) for a scrolling region between them. When the upper hairline is `surface-variant` (quiet) and the lower is `outline` (heavier), the surface gains a visual asymmetry that does not correspond to anything semantic — the bottom of the popup reads as more solid than the top, and the eye keeps re-noticing it. On a dense, mostly-grey Chromium-style surface the effect is exactly the kind of "5% colour ratio violation" the styleguide already warns against in the colour budget.

The deeper meta-problem is the same shape as ticket #0001 and the Badge fix: the styleguide expresses the rule (Toolbar / Divider use `surface-variant`, footers should look like Dividers), but there is no component or token to enforce it, so every example author re-derives the border colour and one of them is going to get it wrong. Nine examples did.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Mass token swap in styleguide examples.** Replace `var(--cr-fallback-color-outline)` with `var(--cr-fallback-color-surface-variant)` in all nine live-preview footer strips. Pros: smallest diff, no library API change, immediate normalisation in the deployed docs. Cons: leaves the inline-style pattern in place — the next live example written by an agent or a contributor will face the same fork.

2. **Introduce a semantic `--cr-divider-color` token.** Alias `--cr-fallback-color-surface-variant` (with the matching dark-mode flip), update Toolbar / Divider / styleguide examples to read from `--cr-divider-color`. Pros: the intent is now in the token name — "this border is a divider, regardless of which neutral grey it resolves to today." Cons: adds a token to the public API surface (it ends up in `tokens.css` exports); only useful if direction 3 is not also taken.

3. **Introduce a `Footer` (or `ActionFooter` / `SurfaceFooter`) component** that ships the pinned strip with the right border, padding, and flex layout out of the box. Live examples become `<Footer><Button>Cancel</Button><Button variant="action">Save</Button></Footer>` (or similar). Pros: closes the path-of-least-resistance — agents copying the live example get the right border for free, the styleguide does not have to repeat the recipe nine times. Cons: introduces a thin-wrapper component into the library; needs a docs page, sidebar entry, and a clear scope boundary against `Toolbar`.

Working hypothesis (subject to revision when the work starts): direction 1 + direction 2 together is probably the right starting point — fix the symptom in the docs, give the token a name that explains why. Direction 3 is the cleanest long-term but is a bigger discussion (Footer component scope, naming, interaction with primary-action pattern), worth its own ticket if pursued.

## Acceptance hints

- The Toolbar's `border-bottom` and the pinned-footer's `border-top` paint with the same colour in light mode and in dark mode, on every live preview that shows both at once.
- `--cr-fallback-color-outline` no longer appears in `borderTop` declarations for pinned-footer strips anywhere under `docs/docs/styleguide/`.
- If a `--cr-divider-color` token is introduced, it is exported from `chromium-ui-react/tokens.css`, used by Toolbar's `border-bottom` and Divider's `background`, and documented under [`docs/docs/styleguide/color.md`](docs/docs/styleguide/color.md).
- If a `Footer` component is introduced, it has its own folder under `packages/chromium-ui-react/src/components/Footer/`, a docs page under `docs/docs/components/`, and the affected live examples migrate to use it.
- `npm run build:lib && npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related ADRs: _none yet_
- Reference URL where the divergence is visible: `https://ztnkv.github.io/chromium-ui-react/styleguide/layout#1-extension-popup`
- Library files defining the canonical hairline colour: `packages/chromium-ui-react/src/components/Toolbar/Toolbar.css`, `packages/chromium-ui-react/src/components/Divider/Divider.css`
- Tokens file: `packages/chromium-ui-react/src/styles/tokens.css`
- Styleguide files in scope: see the table in Context above (9 files / 9 lines).
