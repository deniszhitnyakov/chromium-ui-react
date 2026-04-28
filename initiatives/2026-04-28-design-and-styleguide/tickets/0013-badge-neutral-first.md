---
title: "Ticket 0013 — Badge: put 'neutral' first in the variants list and make it the default"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0013 — Badge: put 'neutral' first in the variants list and make it the default

## Status

**open**

## Summary

The Badge component is in good shape after commit `77bafca` (outline-only by design), and the styleguide already says "neutral first, colored only when the user must react". But the docs still present `default` (primary-blue outline) as the first variant in the live-preview list, and the component default is `variant: 'default'`. So the path of least resistance — the agent typing `<Badge>foo</Badge>` — produces a blue badge, not a neutral one. Reorder the variant list to put neutral first, and change the component default to `'neutral'` so the easiest-to-write Badge is the quietest one.

## Context

Library state:

- [`packages/chromium-ui-react/src/components/Badge/Badge.tsx:5`](packages/chromium-ui-react/src/components/Badge/Badge.tsx#L5) — `BadgeVariant = 'default' | 'error' | 'success' | 'neutral' | 'warning'`. The order in the union itself signals which variant is canonical first.
- [`packages/chromium-ui-react/src/components/Badge/Badge.tsx:14`](packages/chromium-ui-react/src/components/Badge/Badge.tsx#L14) — destructured default is `variant = 'default'`. The `default` variant paints with `--cr-fallback-color-primary` (blue) border + text.

Docs state:

- [`docs/docs/components/badge.md`](docs/docs/components/badge.md) — Live preview block (lines 14–21) renders, in order: `default` ("New"), `success` ("Synced"), `error` ("Failed"), `warning` ("Deprecated"), `neutral` ("Beta"). Neutral is *last*. The "Variants" section in the body re-shows the same order.
- [`docs/docs/components/badge.md`](docs/docs/components/badge.md) introductory paragraph already says "Reach for `variant='neutral'` first" — but the visual order argues for the opposite.

Styleguide state:

- [`docs/docs/styleguide/color.md`](docs/docs/styleguide/color.md) — "Badge defaults: quiet first" section (post-#0005 / Badge fix) explicitly lists "neutral first, colored only when the user must react" as the rule. The library API does not yet match.

The bare `<Badge>3</Badge>` form (no variant prop) is currently the primary-blue outline. After the fix, it would be a grey neutral outline — matching the rule the styleguide already wants to enforce.

## What hurts and why

Two problems:

1. **The default is louder than the recommendation.** When the rule is "prefer neutral", the easiest-to-write Badge should *be* neutral. Today it is blue. An agent (or a contributor) typing the shortest syntax produces the visually loudest result, which is the opposite of what the colour budget wants.
2. **Variant order in the docs reads as ranked.** A reader scans the live-preview row left-to-right; whatever sits first reads as "the canonical example". Putting `default` first signals "this is what a Badge usually looks like"; putting `neutral` first signals "this is what a Badge usually looks like, and it is neutral". The signal is free — only the ordering needs to change.

This ticket is the small final move in the Badge cleanup that started with commit `77bafca` (drop solid appearance). The earlier commit removed the wrong shape; this one nudges the right shape.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Reorder the variants list in the docs and keep the component default as `'default'`.** Smallest possible change. Pros: zero API impact. Cons: the API still rewards typing `<Badge>` with a blue badge — the prose-vs-API mismatch remains.

2. **Reorder the variants list and change the component default to `'neutral'`.** The bare `<Badge>foo</Badge>` now renders as the neutral variant. The `default` variant survives in the type but becomes "primary-blue outline, opt-in". Pros: API matches the rule the styleguide already states. Cons: technically a behaviour change for any consumer that relied on `<Badge>` being blue (assume small/zero given pre-1.0 status).

3. **Reorder, change the default, and rename `'default'` to `'primary'`.** Same as direction 2 plus a rename so the type literally reads "neutral, primary, success, warning, error" rather than the slightly confusing "default" identifier (which after the change no longer corresponds to the *default* variant). Pros: cleanest type signature; explicit semantics. Cons: extra breaking rename for a small clarity win.

Working hypothesis (subject to revision when the work starts): direction 2. The `default` → `primary` rename in direction 3 is appealing but probably out of scope for this small ticket; can ride a separate cleanup ticket if it surfaces.

## Acceptance hints

- `BadgeVariant` is reordered so that `'neutral'` is the first member of the union.
- `Badge.tsx` destructures `variant = 'neutral'` (or whatever the new default lands at).
- `<Badge>foo</Badge>` renders as the neutral grey-outline variant on the docs site.
- The Live preview at the top of `docs/docs/components/badge.md` shows neutral first, then default (or primary), success, warning, error.
- The "Variants" section body matches the new order.
- The introductory paragraph that says "Reach for `variant='neutral'` first" is rewritten to say "Reach for `<Badge>` (the default) first" — since neutral *is* the default after the fix.
- Existing live previews elsewhere in the docs that use `<Badge variant="success">…</Badge>` etc. still work; bare `<Badge>` previews now render neutral and any prose around them is updated if it previously described them as blue.
- `npm run build:lib && npm run build:docs` stays green.
- Release: minor version bump (default-behaviour change, same rule as Badge appearance removal).

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related precedent: commit `77bafca` (Badge outline-only).
- Related styleguide: `docs/docs/styleguide/color.md` — "Badge defaults: quiet first" section.
- Related ADRs: _none yet_
- Library files in scope: `packages/chromium-ui-react/src/components/Badge/Badge.tsx`.
- Docs in scope: `docs/docs/components/badge.md`.
