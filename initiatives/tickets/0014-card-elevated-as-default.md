---
title: "Ticket 0014 — Card: 'elevated' should be the default variant (and shown first in the live preview)"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0014 — Card: 'elevated' should be the default variant (and shown first in the live preview)

## Status

**open**

## Summary

`Card` ships four variants — `default`, `outlined`, `filled`, `elevated`. The component default is `variant: 'default'`, which paints as a flat surface with no shadow and no outline. But Chromium's `chrome://settings`, `chrome://bookmarks`, `chrome://downloads`, and the side-panel surfaces all use the elevated style by default — a card with the subtle `--cr-elevation-2` shadow. The styleguide's settings-page pattern correctly reaches for `<Card variant="elevated">` everywhere. The component default disagrees with the canonical use; the docs disagree by showing the flat default first. Make `elevated` the default variant and reorder the docs to match.

## Context

Library state:

- [`packages/chromium-ui-react/src/components/Card/Card.tsx:5`](packages/chromium-ui-react/src/components/Card/Card.tsx#L5) — `CardVariant = 'default' | 'outlined' | 'filled' | 'elevated'`.
- [`packages/chromium-ui-react/src/components/Card/Card.tsx:13`](packages/chromium-ui-react/src/components/Card/Card.tsx#L13) — destructured default is `variant = 'default'`.

Styleguide state (where Card is canonical):

- [`docs/docs/styleguide/patterns/settings-page.md:56,85,99`](docs/docs/styleguide/patterns/settings-page.md#L56) — every section card uses `<Card variant="elevated">`.
- [`docs/docs/styleguide/patterns/settings-page.md:142-143`](docs/docs/styleguide/patterns/settings-page.md#L142) — explicitly says "Section card. `variant='elevated'` — has the subtle `--cr-elevation-2` shadow that Chromium's `settings-section` uses. No outline."
- [`docs/docs/styleguide/anti-patterns.md`](docs/docs/styleguide/anti-patterns.md) (#10 "Drop shadows on everything") gives a precise rule: "A settings card has a **subtle elevation-2 shadow** — `<Card variant='elevated'>` or the library default. **Outlined cards are an acceptable alternative** for dense admin layouts, but the Chromium-faithful default is shadowed." The phrase "or the library default" reads as if the library default *is* elevated — but it is not.
- Ticket #0008 (side panel: card-per-section) lands directly on `variant="elevated"` for each section card. Its working hypothesis assumes elevated is the right shape there too.

Docs state:

- [`docs/docs/components/card.md`](docs/docs/components/card.md) — to be checked at implementation time. The pattern for component pages in this library is to show variants in the order they appear in the type union, so likely `default` is shown first. Re-read on implementation.

Native Chromium reference: Chromium's `cr-card` and `settings-section` styles ship with the elevation-2 shadow as the default look. There are surfaces that prefer outline-only (some dense admin dialogs, Quick Settings rows), but the dominant card style across `chrome://` is elevated.

## What hurts and why

Three coupled problems:

1. **The library default is the rare style, not the common one.** Chromium-faithful cards are elevated. The library default is flat. So every consumer who reaches for `<Card>` and expects "what Chromium uses" gets the wrong thing on first try and has to discover `variant="elevated"`.
2. **The styleguide already implies the fix is done.** Anti-pattern #10 says "or the library default" as if the library default is shadowed. It is not. The styleguide and the API disagree, and the styleguide's wording will keep being subtly wrong until the API matches.
3. **Variant order in the docs reinforces the wrong default.** A reader scanning the Card live preview sees `default` first and assumes that is what a card usually looks like. Reordering to put `elevated` first (and making it the literal default) closes the prose-vs-API gap that exists for the same reason as the Badge gap fixed by #0013.

The deeper meta-problem is exactly the one ticket #0013 names for Badge: when the styleguide says "prefer X" and the API ships "Y is the easiest to type", agents type Y. Closing the gap means changing the default, not just restating the rule.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Make `'elevated'` the default; reorder the type union and the docs preview to put it first.** `Card.tsx` becomes `variant = 'elevated'`. `CardVariant` reorders to `'elevated' | 'outlined' | 'filled' | 'default'`. The docs preview leads with the elevated example. Pros: matches the styleguide's stated default; closes the prose-vs-API gap; mirrors #0013 / Badge fix. Cons: behaviour change for any consumer using `<Card>` without an explicit variant (visible: shadow appears). Pre-1.0 status absorbs this.

2. **Reorder docs only; keep the API default at `'default'`.** Smallest visible change. Pros: zero API impact. Cons: same failure mode the initiative keeps fighting — docs say one thing, API rewards typing the other.

3. **Make `'elevated'` the default *and* remove `'default'` as a named variant** (rename / collapse it into something like `'flat'` or remove entirely). The current `'default'` variant — flat surface, no shadow, no outline — is rarely the right answer in Chromium UI; if its only role is "I want a card without any chrome", that role can probably be served by not using a `Card` at all (just a `<div>` or a `Section`). Pros: simplest type union; one less variant to choose between. Cons: bigger breaking change; needs a careful audit of who uses the bare `<Card>` for the no-chrome look.

Working hypothesis (subject to revision when the work starts): direction 1. Direction 3's removal of the flat variant is appealing but should ride a separate ticket after observing real consumer needs.

## Acceptance hints

- `Card.tsx` destructures `variant = 'elevated'`.
- `CardVariant` is reordered so `'elevated'` comes first in the union.
- `<Card>` (no variant prop) renders with the `--cr-elevation-2` shadow.
- The Live preview block at the top of `docs/docs/components/card.md` shows the elevated card first.
- The "Variants" section in the body re-orders to match.
- Anti-pattern #10's wording in `docs/docs/styleguide/anti-patterns.md` ("`<Card variant='elevated'>` or the library default") becomes accurate without rewording — or the wording is tightened to make the equivalence explicit.
- `docs/docs/styleguide/patterns/settings-page.md` examples can drop the explicit `variant="elevated"` (now redundant) — implementation-time judgement call whether to leave it for clarity or remove it for compactness.
- Ticket #0008's implementation (side-panel card-per-section) inherits the elevated default for free if it lands later.
- `npm run build:lib && npm run build:docs` stays green.
- Release: minor version bump (default-behaviour change, same rule as Badge / fullWidth).

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Related precedent: commit `77bafca` (Badge outline-only); ticket #0013 (Badge neutral default).
- Related: ticket #0008 (side panel card-per-section) — directly benefits from `elevated` default.
- Related styleguide: anti-pattern #10 in `docs/docs/styleguide/anti-patterns.md`; section card prose in `docs/docs/styleguide/patterns/settings-page.md`.
- Related ADRs: _none yet_
- Library files in scope: `packages/chromium-ui-react/src/components/Card/Card.tsx`.
- Docs in scope: `docs/docs/components/card.md`, `docs/docs/styleguide/anti-patterns.md`, `docs/docs/styleguide/patterns/settings-page.md`.
