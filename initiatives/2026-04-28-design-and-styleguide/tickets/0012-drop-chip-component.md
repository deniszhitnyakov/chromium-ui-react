---
title: "Ticket 0012 — Drop Chip component — role overlaps with Badge / Button, no clear extension use case"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0012 — Drop Chip component — role overlaps with Badge / Button, no clear extension use case

## Status

**open**

## Summary

`Chip` exists in the library as a small button-like pill that supports `selected` state, an optional `startIcon`, and an `onRemove` × button. The operator's review concluded that he cannot find a use for it in the extension surfaces this library targets: Badge already covers "small inline tag" (for status / label), Button covers "the user can press this", and an extension UI does not typically have the multi-select chip-cloud that material design uses Chips for (filter chips, input chips for tags, suggestion chips). Drop the component unless a concrete in-Chromium use case can be named.

## Context

Library state:

- [`packages/chromium-ui-react/src/components/Chip/Chip.tsx`](packages/chromium-ui-react/src/components/Chip/Chip.tsx) — 51-line component. Variants: `default`, `selected`, `compact`. Props: `selected`, `startIcon`, `onClick`, `onRemove`. Renders as `<button>` with `aria-pressed`.
- [`packages/chromium-ui-react/src/components/Chip/Chip.css`](packages/chromium-ui-react/src/components/Chip/Chip.css) — bundled into the library CSS.
- [`packages/chromium-ui-react/src/index.ts`](packages/chromium-ui-react/src/index.ts) — re-exports Chip.
- [`docs/docs/components/chip.md`](docs/docs/components/chip.md) — component docs page.

Native Chromium reference: Chromium's WebUI does have something chip-shaped in a few specific surfaces — the chip-style filters in `chrome://history`, the suggestion chips in some address-bar prompts, the tag-style entries in some sync settings flows. None of these are surfaces an extension typically reproduces, and even Chromium's own usage is sparse compared to Material Design's.

Comparison with adjacent primitives:

- **Badge (post commit `77bafca`)** — small outline pill, non-interactive, status / label. Fully covers "show a short piece of metadata next to a row".
- **Button** — interactive pill, all sizes / variants, has `text` and `outlined` for low-emphasis verbs. Fully covers "the user can press this thing".
- **What Chip uniquely covers** — `selected` state with `aria-pressed`, plus the embedded × removal button. The first is achievable as a `<Button variant="outlined">` with a `selected`-style modifier; the second is rarely needed in extension UI.

## What hurts and why

Three problems:

1. **API surface inflation without a use case.** Every additional component in the library is a path the agent can take. If Chip has no clearly Chromium-native use case, having it documented as a first-class primitive invites agents to use it for things that Badge, Button, or a `<ListItem>` would handle better.
2. **It's a weak Chromium fit.** The chip-cloud / filter-chip / input-chip patterns belong to mobile-shaped Material UI more than to `chrome://`-style desktop UI. Surfaces that *do* use chip-shaped elements in Chromium use them for one specific filter row in `chrome://history` and similar narrow contexts; an extension popup or side panel almost never has that shape.
3. **It overlaps semantically with Badge.** A reader of the library docs sees `Badge` (outline pill) and `Chip` (pill that can be selected and removed) and has to decide which to reach for, with no clear rule. The styleguide does not currently distinguish them with a sharp boundary; removing Chip removes the decision.

The deeper meta-problem is the same shape as Button `tonal` (#0009): a variant / component that exists because it could exist, not because there is a verified Chromium pattern that demands it. Removing it shrinks the library back toward "the smallest set of primitives that covers what extension UIs actually need".

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Remove Chip entirely.** Delete `packages/chromium-ui-react/src/components/Chip/`, drop the re-export from `src/index.ts`, delete `docs/docs/components/chip.md`, remove the sidebar entry in `docs/sidebars.ts`. Grep for any styleguide / pattern reference to Chip and rewrite. Pros: smallest library; clearest "use Badge or Button" choice; mirrors Badge / fullWidth / tonal precedent. Cons: breaking change for any consumer using Chip (assume small/zero given pre-1.0 status).

2. **Keep Chip, scope it to one named use case in the docs.** Rewrite the Chip docs page to say "use Chip only for filter rows like `chrome://history`'s top bar; for everything else, use Badge or Button". Add an anti-pattern ("Chip cloud as a pseudo-tag input") to keep the boundaries enforced in prose. Pros: keeps the option for the rare valid use. Cons: same failure mode the initiative keeps fighting — option in the API plus rule in the prose loses to agents.

3. **Replace Chip with a Badge variant or a Button variant, then remove the standalone component.** If the only thing Chip uniquely offers is "selectable pill" or "removable pill", absorb that into Badge or Button as a thin variant or prop. Pros: preserves the use case without standalone API surface. Cons: bigger refactor; might bloat Badge or Button with unrelated affordances.

Working hypothesis (subject to revision when the work starts): direction 1 — remove. If a real use case surfaces later (an actual filter row in an actual extension), it can come back as a fresh ticket with the use case as its justification.

## Acceptance hints

- `packages/chromium-ui-react/src/components/Chip/` no longer exists.
- `Chip` is not exported from `packages/chromium-ui-react/src/index.ts`.
- `docs/docs/components/chip.md` is removed and unregistered from the sidebar.
- A grep for `Chip` returns no library / docs hits outside this ticket file (and possibly an archive note).
- The deployed docs no longer show a Chip page in the navigation.
- `npm run build:lib && npm run build:docs` stays green.
- Release: minor version bump (breaking API change in a pre-1.0 library, same rule as Badge / fullWidth / tonal).

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related precedent: commit `77bafca` (Badge solid removal); ticket #0003 (Button `fullWidth`); ticket #0009 (Button `tonal`).
- Related ADRs: _none yet_
- Library files to remove: `packages/chromium-ui-react/src/components/Chip/Chip.tsx`, `Chip.css`, `index.ts`; updates to `src/index.ts`.
- Docs to remove / update: `docs/docs/components/chip.md`, `docs/sidebars.ts`.
