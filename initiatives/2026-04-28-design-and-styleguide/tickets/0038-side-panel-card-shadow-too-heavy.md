---
title: "Ticket 0038 — Side panel pattern: Card shadow reads too heavy"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0038 — Side panel pattern: Card shadow reads too heavy

## Status

**done** — direction 1 (side-panel-local) implemented as a small Card API extension. New `Card.elevation: 1 | 2` prop (default `2`); when `variant="elevated"` and `elevation={1}`, paints `--cr-elevation-1` instead of `--cr-elevation-2`. CSS modifier `cr-card--elevation-1` opts down. Side-panel pattern's section cards now render `<Card elevation={1}>`; same change applied to the side-panel example in the new Settings entry pattern. Settings-page pattern is **not** affected — its cards still use elevation-2 via the default. Card docs page gains the new prop in the props table; side-panel pattern's Notes lists the elevation-1 rule as one of its measurements. Verified — side-panel cards render `box-shadow` matching `--cr-elevation-1`, classes `cr-card cr-card--elevation-1`.

## Summary

After #0008 restructured the side panel into card-per-section, and #0014 made `elevated` the default Card variant, the Side panel pattern's live preview is now a stack of `--cr-elevation-2` cards. Operator's read of the deployed pattern: the shadows under each card are too heavy at the side-panel width, the cards visually "puff up" off the surface. Reduce the shadow weight on side-panel cards specifically — likely by switching the side-panel cards to `--cr-elevation-1` (subtle 1-step shadow) or by giving Card a tunable shadow option.

## Context

Library state — [`packages/chromium-ui-react/src/components/Card/Card.css`](packages/chromium-ui-react/src/components/Card/Card.css):

- Default `.cr-card` paints `box-shadow: var(--cr-elevation-2)` (after #0014 made elevated the default).
- `--cr-elevation-2` = `0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15)` — visible at any width, but proportionally heavier on a narrow surface where the card is small.

Side panel pattern: [`docs/docs/styleguide/patterns/side-panel.md`](docs/docs/styleguide/patterns/side-panel.md).

Native Chromium reference: settings cards on `chrome://settings` use the elevation-2 shadow at *full-tab* width (~680px content column). A 360px-wide side panel renders cards proportionally smaller, so the same shadow looks proportionally heavier.

## What hurts and why

- A pile of elevation-2 cards in a 360px column reads as bubbly / Material-y rather than Chromium-quiet. The settings-page version of the same shadow looks correct because the card is wider and the shadow spreads across more horizontal space.
- The fix should *not* downgrade the settings-page Card default — that one is correct. It needs to be local to the side-panel surface (or available as a Card prop for cases that want a quieter shadow).

## Direction (not a decision)

1. **Side-panel-local override: paint side-panel cards with `--cr-elevation-1`.** A scoped CSS rule (e.g. via a class on the panel root, or a styleguide-level recipe in the pattern page) makes side-panel cards quieter without touching the global default. Pros: surgical; doesn't affect settings page. Cons: requires a discriminator the consumer has to set; agents may forget.
2. **New Card `elevation` prop** — `<Card elevation="1" | "2">`, default `2`. Pros: explicit per-card control. Cons: more API surface; feels like creep.
3. **Switch the default Card shadow to `--cr-elevation-1` everywhere; let surfaces that want elevation-2 (settings page) opt up.** Pros: simpler API; the quieter shadow is also closer to many real Chromium cards. Cons: settings page review (#0014) explicitly chose elevation-2 — flipping the global default reverses that decision after one release.
4. **Reduce `--cr-elevation-2` itself.** Pros: token-level fix, every consumer benefits. Cons: token mirrors a Chromium token; messing with the token breaks the "Chromium tokens are authoritative" claim.

Working hypothesis: direction 1 — scoped override at the side-panel level. Either a `cr-card--soft` modifier (or just elevation-1 for the side-panel sample) plus a styleguide note "on side panels, prefer the quieter elevation-1 shadow". This keeps the settings-page result unchanged and gives the side-panel review what it needs.

Implementer's call whether the fix lands as a CSS class (e.g. `cr-card--elevation-1`), a Card prop (`elevation="1"`), or pattern-side inline-style only. The minimum viable fix is updating the Side panel pattern's live preview to use whichever mechanism produces a quieter shadow; the maximum is a Card prop.

## Acceptance hints

- The Side panel pattern's live preview reads with proportionally lighter shadows under each section card.
- The Settings page pattern's live preview is **not** affected — its cards still use elevation-2.
- Whatever mechanism is chosen (modifier class, prop, inline style), it is documented on the relevant pattern page so consumers reproduce the right look.
- `npm run build:lib && npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: #0008 (side panel card-per-section), #0014 (elevated default), #0040 (Tab Manager sidebar elevation).
- Library files in scope: possibly `packages/chromium-ui-react/src/components/Card/Card.css` and `Card.tsx` (if a prop is added).
- Docs in scope: `docs/docs/styleguide/patterns/side-panel.md`.
