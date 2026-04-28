---
title: "Ticket 0003 — Drop Button fullWidth prop and the full-width primary-action pattern"
status: done
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0003 — Drop Button fullWidth prop and the full-width primary-action pattern

## Status

**done** — direction 1: `fullWidth` prop removed from `Button.tsx`, `.cr-button--full` removed from `Button.css`. Primary-action pattern's "Full-width" variant section deleted; centred variant rewritten to spell out the content-sized rule. `layout.md`, `button.md`, `one-page.md`, `README.md`, and `side-panel.md` updated. New anti-pattern #19 "Full-width primary action in a narrow footer".

## Summary

A `Button` stretched to the container's full width is not a Chromium pattern — `chrome://settings`, `chrome://bookmarks`, `chrome://downloads`, and the side-panel surfaces inside the browser never use it. Chromium buttons are content-sized: width = label + horizontal padding, full stop. Today the library ships `fullWidth` as a Button prop and the styleguide actively recommends it for narrow popup / side-panel footers — including a whole "Full-width" section in the primary-action pattern. That recommendation is wrong and produces UI that visibly does not match Chromium (see the Google Maps scraper side panel screenshot — the bottom-edge "Start new scrape" pill is the smoking gun). Remove the option; do not restate the rule.

## Context

Surfaced from the same Google Maps scraper side panel prototype that drove tickets #0001 (toggle rows) and #0002 (footer border). The full-width primary CTA at the bottom is the most visually prominent deviation from Chromium feel in the prototype, and the library / styleguide led the agent to it directly.

Library state — `fullWidth` is a first-class Button affordance:

- [`packages/chromium-ui-react/src/components/Button/Button.tsx:11`](packages/chromium-ui-react/src/components/Button/Button.tsx#L11) — `fullWidth?: boolean` in `ButtonProps`.
- [`packages/chromium-ui-react/src/components/Button/Button.tsx:17,28`](packages/chromium-ui-react/src/components/Button/Button.tsx#L17) — destructured and threaded into the class list.
- [`packages/chromium-ui-react/src/components/Button/Button.css:97`](packages/chromium-ui-react/src/components/Button/Button.css#L97) — `.cr-button--full { width: 100%; }`.

Documentation that legitimises full-width:

- [`docs/docs/components/button.md:37`](docs/docs/components/button.md#L37) — `fullWidth` row in the props table.
- [`docs/docs/components/button.md:85`](docs/docs/components/button.md#L85) — live example `<Button variant="action" fullWidth>Continue</Button>`.
- [`docs/docs/one-page.md:95`](docs/docs/one-page.md#L95) — listed in the LLM API summary alongside `variant`, `size`, etc.
- [`docs/docs/styleguide/layout.md:196`](docs/docs/styleguide/layout.md#L196) — "only `fullWidth` stretches it, and that is mainly for narrow popup footers" — explicitly endorses it.
- [`docs/docs/styleguide/patterns/primary-action.md:87`](docs/docs/styleguide/patterns/primary-action.md#L87) — entire "Full-width" recipe in the variant list, framed as "Reads as 'this is the CTA' — useful when the label is long or the panel is very narrow (320–360px)".
- [`docs/docs/styleguide/patterns/primary-action.md:175`](docs/docs/styleguide/patterns/primary-action.md#L175) — paragraph: "On a narrow panel or with a long label, prefer full-width — the action itself becomes the footer".
- [`docs/docs/styleguide/patterns/primary-action.md:200`](docs/docs/styleguide/patterns/primary-action.md#L200) — live example `<Button variant="action" fullWidth>Enrich visible leads</Button>`.

For comparison, [`docs/docs/styleguide/forms.md:140`](docs/docs/styleguide/forms.md#L140) already says, about Inputs, "Max-width ~360px. Never full-width — it becomes a form input visually." The Input rule is correct; Button currently disagrees with itself.

## What hurts and why

A full-width primary button in a 360px side panel does three things at once that Chromium never does:

1. **It turns the button into a banner.** A control that spans the entire content area stops reading as a button and starts reading as a section header or a banner — exactly what `chrome://settings` avoids. Native settings buttons in narrow surfaces (Reading Mode panel, Side Search) sit at content-sized width, often paired with a Cancel.
2. **It violates the colour budget.** A 320px slab of `--cr-fallback-color-primary` blue at the bottom edge is far more saturated pixels than the 5% colour-budget rule the styleguide asserts in `color.md`. Combined with the rule that there is exactly one primary per view, a full-width primary becomes a dominating coloured rectangle that competes with everything above it.
3. **It encourages long labels.** A 320px-wide button has *room* for "Start new scrape" or "Enrich visible leads", and once the room exists the writer fills it. Content-sized buttons impose a width budget that pushes labels back to one or two words. (See ticket #0004 — that rule should be made explicit, but it is also enforced indirectly by removing this affordance.)

The deeper meta-problem is the same shape as the Badge fix and ticket #0001: the styleguide's principles already say "Chromium buttons are content-sized" implicitly (every other example respects it), but the `fullWidth` prop and the primary-action pattern's "Full-width" recipe carve out an exception that becomes the path of least resistance for any agent assembling a narrow surface. Removing the option is more enforceable than tightening the prose.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Remove `fullWidth` entirely.** Drop the prop from `ButtonProps`, drop the destructure / class generation in `Button.tsx`, drop `.cr-button--full` from `Button.css`. Update docs/components/button.md and docs/one-page.md to remove the prop. Rewrite the primary-action pattern to drop the "Full-width" variant section and the `fullWidth` example (replace with a content-sized centered or right-aligned variant). Tighten layout.md:196 from "only `fullWidth` stretches it" to "buttons are always content-sized". Add anti-pattern #18 "Full-width primary action in a narrow footer" to keep the lesson catalogued. Pros: matches the Badge precedent — the library API enforces the styleguide rule, no prose-only enforcement. Breaking change, rides a minor bump. Cons: existing call sites that use `fullWidth` get a compile error; brief migration note in the release.

2. **Keep prop, restate the rule.** Document `fullWidth` as "do not use" in the Button page, remove all live examples that use it, but leave the prop in place so existing consumers do not break. Pros: zero breaking change. Cons: repeats the exact failure mode the Badge fix was meant to teach against — the rule is in the prose, the option is in the API, the agent picks the option.

3. **Deprecate now, remove in the next minor.** Mark the prop deprecated in TypeScript (`@deprecated` JSDoc), add a dev-only `console.warn` when it is set, plan removal for the next minor bump. Pros: gives downstream a window. Cons: this is a pre-1.0 library with a small consumer base; the Badge precedent already chose hard removal; running two release cycles for a deprecation is overhead the project does not need.

Working hypothesis (subject to revision when the work starts): direction 1, mirroring the Badge fix exactly, including a minor version bump and an anti-pattern entry. The styleguide-only direction (2) is what the project already had for Badge before commit `77bafca`, and it did not work — the agent generated solid badges anyway. Same shape, same fix.

## Acceptance hints

- `fullWidth` is not a Button prop, the `BadgeAppearance`-style type alias is gone, `.cr-button--full` is not in the published CSS, and grepping the repo for `fullWidth` returns zero hits outside this ticket file.
- The primary-action pattern page no longer has a "Full-width" variant. Its body and examples present the canonical Chromium-native shape — content-sized button, centered or right-aligned in the footer, paired with Cancel when the action has a meaningful undo.
- `layout.md:196` reads as a one-line rule: "Buttons are content-sized; padding ships the only horizontal slack." No `fullWidth` exception.
- A new anti-pattern is added to `docs/docs/styleguide/anti-patterns.md` ("Full-width primary action in a narrow footer") with wrong and right live previews using the existing #16 / #17 visual style.
- `npm run build:lib && npm run build:docs` stays green, `npm pack --dry-run` confirms no stale CSS class ships.
- Release: minor version bump (this is a breaking API change in a pre-1.0 library; rides the `prop renames should still ride a minor bump` rule from the project CLAUDE.md).

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related tickets: #0004 (button label length — same screenshot, related symptom).
- Related ADRs: _none yet_
- Related precedent: commit `77bafca` ("feat!: drop solid Badge appearance, outline-only by design") — same removal-over-restatement shape.
- Reference surfaces: `chrome://settings/`, `chrome://bookmarks/`, `chrome://downloads/`, the in-browser Reading Mode side panel.
- Library files in scope: `packages/chromium-ui-react/src/components/Button/Button.tsx`, `packages/chromium-ui-react/src/components/Button/Button.css`.
- Docs in scope: `docs/docs/components/button.md`, `docs/docs/one-page.md`, `docs/docs/styleguide/layout.md`, `docs/docs/styleguide/patterns/primary-action.md`, `docs/docs/styleguide/anti-patterns.md`.
