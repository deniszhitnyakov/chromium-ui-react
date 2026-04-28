---
title: "Ticket 0009 — Drop Button 'tonal' variant — redundant against outlined / action"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0009 — Drop Button 'tonal' variant — redundant against outlined / action

## Status

**open**

## Summary

`Button` ships five variants: `outlined`, `action`, `tonal`, `destructive`, `text`. The operator's review concluded that `tonal` is redundant — the role it covers (medium-emphasis non-primary) is already covered by `outlined` (low emphasis) and `action` (high emphasis), and Chromium itself does not use a tonal-style button as a distinct middle tier. Remove the variant from the API and the styleguide.

## Context

Library state:

- [`packages/chromium-ui-react/src/components/Button/Button.tsx:5`](packages/chromium-ui-react/src/components/Button/Button.tsx#L5) — `ButtonVariant` includes `'tonal'`.
- [`packages/chromium-ui-react/src/components/Button/Button.css:59-69`](packages/chromium-ui-react/src/components/Button/Button.css#L59) — `.cr-button--tonal` rule, painted with `--cr-fallback-color-secondary-container` background and `--cr-fallback-color-on-tonal-container` text.
- The variant defaults to `outlined`, so `tonal` is opt-in. There are no consumers inside the library that reach for it.

Documentation that mentions `tonal`:

- [`docs/docs/components/button.md`](docs/docs/components/button.md) — props table lists `tonal` and the variants section likely shows it. (Implementation-time read for exact lines.)
- [`docs/docs/styleguide/anti-patterns.md`](docs/docs/styleguide/anti-patterns.md) and other styleguide pages may mention tonal as the "secondary" option in passing.
- [`docs/docs/one-page.md`](docs/docs/one-page.md) lists `tonal` in the Button API summary.
- [`docs/docs/styleguide/chromium-reference.md`](docs/docs/styleguide/chromium-reference.md) describes `tonal-button` as the Chromium reference for "secondary-container" style — that paragraph is the strongest argument *for* keeping the variant, and needs to be addressed in the work turn rather than ignored.

Reference Chromium surfaces:

- `chrome://settings/`, `chrome://bookmarks/`, `chrome://downloads/`, `chrome://extensions/` — surveying these surfaces, the only meaningful button tiers are: a single `action` (filled blue), zero or more `outlined` (default), and `text` (link-style) for tertiary verbs. `cr_button` does have a `tonal-button` class in the source, but its in-product usage is thin — it appears in some specialised dialog flows (e.g. some sync confirmation flows) but is rare on the surfaces this library targets.

## What hurts and why

Three problems:

1. **Redundancy without payoff.** A button library with three non-destructive non-text variants forces the agent to choose between `outlined` and `tonal` for "the secondary action", and there is no clear rule for when one beats the other. Two-tier emphasis (`action` + `outlined`) is the Chromium convention; adding a third tier creates a decision the styleguide cannot meaningfully answer.
2. **The tonal palette pulls in extra tokens.** `--cr-fallback-color-secondary-container` and `--cr-fallback-color-on-tonal-container` exist in `tokens.css` largely to support this one variant. Removing the variant lets a future cleanup pass thin out the palette.
3. **It is a footgun for the colour budget.** `tonal` has a fill — a soft tinted background — which competes with `action` for the user's eye on any surface that uses both. Two coloured fills in close proximity violates the "one primary per view" rule and the colour-budget guidance in `color.md`. `outlined` does not have this problem.

The deeper meta-problem is the same as Badge `solid` (commit `77bafca`) and the queued Button `fullWidth` removal (#0003): every additional variant a styleguide-authored library carries is a path the agent can take that the styleguide later has to talk it out of. If the variant has no clear, irreplaceable role, removing it is more enforceable than restating the rule.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Remove the variant entirely.** Drop `'tonal'` from `ButtonVariant`, drop `.cr-button--tonal` from `Button.css`, drop the supporting `--cr-fallback-color-secondary-container` / `--cr-fallback-color-on-tonal-container` tokens from `tokens.css` if no other component uses them (verify before deleting). Update Button docs, one-page LLM doc, styleguide references. Pros: matches Badge / fullWidth precedent; smallest cumulative API surface. Cons: breaking change for any consumer using `variant="tonal"` (assume small/zero given pre-1.0 status).

2. **Remove the variant but keep the tokens.** Drop `'tonal'` from `ButtonVariant` and the `.cr-button--tonal` rule, but leave the secondary-container tokens in place in case another component (or a future component) uses them. Pros: smaller blast radius, lower regression risk. Cons: leaves orphan tokens; the cleanup is half-done.

3. **Keep variant, downgrade to undocumented.** Mark `'tonal'` as deprecated in TypeScript JSDoc, remove from styleguide and pattern examples, but keep the implementation. Pros: zero breakage. Cons: same shape as the failure modes the initiative keeps fighting — option in the API, no rule in the prose to push back at the agent.

Working hypothesis (subject to revision when the work starts): direction 1, mirroring Badge / fullWidth. The token survey in step 1 is small (one grep) and worth doing in the same work turn.

## Acceptance hints

- `'tonal'` is not in `ButtonVariant`. `.cr-button--tonal` is not in `Button.css`.
- The `--cr-fallback-color-secondary-container` / `--cr-fallback-color-on-tonal-container` tokens are removed if no other component / styleguide example uses them; otherwise they remain with a note explaining the residual scope.
- `docs/docs/components/button.md`, `docs/docs/one-page.md`, and `docs/docs/styleguide/chromium-reference.md` no longer present `tonal` as an active variant. The chromium-reference paragraph is rewritten to reflect "we do not ship the tonal tier; outlined + action covers what extension surfaces need".
- A grep for `tonal` returns no library / docs hits outside this ticket and possibly an archive note.
- `npm run build:lib && npm run build:docs` stays green.
- Release: minor version bump (breaking API change in a pre-1.0 library, same rule as Badge / fullWidth).

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Related precedent: commit `77bafca` (Badge solid removal); ticket #0003 (Button `fullWidth` removal).
- Related ADRs: _none yet_
- Library files in scope: `packages/chromium-ui-react/src/components/Button/Button.tsx`, `packages/chromium-ui-react/src/components/Button/Button.css`, `packages/chromium-ui-react/src/styles/tokens.css`.
- Docs in scope: `docs/docs/components/button.md`, `docs/docs/one-page.md`, `docs/docs/styleguide/chromium-reference.md`.
