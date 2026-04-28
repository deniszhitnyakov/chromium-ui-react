---
title: "Ticket 0025 — Primary-action running-state replacement: Stop button is variant='destructive', not outlined"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0025 — Primary-action running-state replacement: Stop button is variant='destructive', not outlined

## Status

**open**

## Summary

The "Primary action button" pattern includes a "Running-state replacement" variant: when the primary verb (Start / Capture / Scan) flips into running state, replace the button in place rather than stacking two — flipping the verb to Stop / Cancel and switching the variant. Today the styleguide recommends `<Button variant="outlined">Stop</Button>` for the running-state replacement. The operator argues this is wrong: stopping in-flight work is structurally a destructive action (interrupting useful progress), so the variant should be `destructive` (red outline + red text), not `outlined` (the neutral grey-outlined look). The "outlined, not filled" part of the rule survives — the running-state button stays visually quieter than the original filled primary — but the colour signal moves from neutral to destructive.

## Context

Source of the report: operator's review of the `patterns/primary-action.md` page in the same packing turn that produced #0023 (Menu nav flat) and #0024 (SearchInput placement). Direct read of the operator's reasoning: "честно говоря, в этом примере я бы вообще заменил кнопку Stop на красную кнопку, а не на синюю, потому что синяя кнопка Stop — это оксюморон. Но то, что она должна быть Outlined, — факт".

Two parts:
- **Outlined (not filled)** — operator confirms the existing pattern's "single-footer discipline, replace in place" logic. The replacement button is *not* filled-action-blue; that part of the rule is right.
- **Colour: destructive (not neutral)** — operator wants the Stop semantics carried in the colour. A neutral outlined Stop reads as "Cancel" or "Close"; a destructive outlined Stop reads as "interrupt this thing".

State of the offending code:

- [`docs/docs/styleguide/patterns/primary-action.md:205-207`](docs/docs/styleguide/patterns/primary-action.md#L205) — section heading "Running-state replacement" plus the prose: "When the primary's state flips (Start → Stop, Capture → Cancel), replace the button in place — do not stack two. The single-footer discipline stays the same, the verb and variant change".
- [`docs/docs/styleguide/patterns/primary-action.md:234`](docs/docs/styleguide/patterns/primary-action.md#L234) — live example: `<Button variant="outlined">Stop</Button>`.
- [`docs/docs/styleguide/patterns/primary-action.md:239`](docs/docs/styleguide/patterns/primary-action.md#L239) — explicit prose: "`Stop` during a running operation is `variant="outlined"`, still centered, still the only action on screen. Two filled primaries at once is always wrong."

Library state:

- [`packages/chromium-ui-react/src/components/Button/Button.css:71-77`](packages/chromium-ui-react/src/components/Button/Button.css#L71) — `.cr-button--destructive`: error-coloured border + error-coloured text, soft error-container hover fill. Already the right shape for "outlined but in a warning colour". No new variant needed.

Native Chromium reference: Chromium's own download manager uses a similar pattern when a download is paused/in-progress — the "Cancel" button appears next to the progress in error-tinted text on hover. The closest direct analogue is harder to point to (Chromium does not have many in-flight-and-cancellable verbs in chrome:// surfaces); the operator's argument is more semantic-than-precedent — "interrupting valuable in-flight work is destructive enough to deserve red". Reasonable.

## What hurts and why

Two problems:

1. **The colour signal is wrong.** Outlined-grey Stop reads as "this button cancels something neutral" (closing a dialog, dismissing a hint). Outlined-red Stop reads as "this interrupts something the user actively wanted to do". The latter is what Stop means in a running scrape, an in-flight capture, an indexing operation — every example the styleguide names. The grey signal undersells the action.
2. **It's inconsistent with the destructive-confirmation precedent elsewhere in the styleguide.** Anti-pattern #2 ("Primary button on the left") right-side example pairs an outlined Cancel with a destructive Remove; principle #4 in `principles.md` does the same. The destructive variant is the established library shape for "verb that breaks an in-flight or persistent thing". Stop in a running operation belongs to the same family.

The fix is two lines of prose + one variant change in one live preview. Low-cost, high-clarity.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Switch the live example and the prose to `variant="destructive"`.** Replace `<Button variant="outlined">Stop</Button>` with `<Button variant="destructive">Stop</Button>`. Update the explanatory paragraph: "`Stop` during a running operation is `variant="destructive"` (outlined error-colour), still centered, still the only action on screen". Pros: smallest, most direct fix; matches operator's request literally. Cons: none material — destructive is already a Button variant, no API change.

2. **Switch the live example, but keep both options described in the prose.** Document that the running-state replacement is destructive *if* interrupting the work is genuinely costly (long-running scrapes, indexing, recordings), and outlined-neutral *if* interrupting is cheap (a one-second capture). Pros: nuanced; respects the cases where outlined-neutral might still be right. Cons: introduces a "judge for yourself" rule that the agent will get wrong half the time; the styleguide's recurring failure mode.

3. **Introduce a `variant="warning"` or `variant="caution"` Button** — orange/yellow text on outline, sitting between neutral outlined and red destructive. Use it for the running-state replacement to convey "interrupt with caution" without going full destructive. Pros: semantically precise. Cons: another Button variant when the initiative has been removing them (#0009 dropped tonal); destructive already covers the operator's intent without adding API surface.

Working hypothesis (subject to revision when the work starts): direction 1. The operator's intent is clear, the existing destructive variant fits exactly, no new API surface, no nuance for the agent to misjudge.

Adjacent observation worth flagging in the work turn: ticket #0017 ("Action-row Cancel as text") proposed a scoped rule — "secondary = text when primary = destructive, secondary = outlined when primary = action". That rule applies to *paired* action rows (Cancel + Save / Cancel + Remove). The Running-state replacement is *single-button* (one button visible at any time), so #0017 does not directly govern it — but the destructive verb rule from #0017 generalises here: when the verb is destructive, the visual signals destructive. Worth cross-referencing in the styleguide rewrite.

## Acceptance hints

- `docs/docs/styleguide/patterns/primary-action.md:234` (the running-state live preview) renders Stop as `<Button variant="destructive">Stop</Button>`.
- `docs/docs/styleguide/patterns/primary-action.md:239` (the explanatory prose) is updated to say `variant="destructive"`, with one short sentence noting why ("Stop interrupts useful in-flight work — the colour carries that meaning").
- The "Running-state replacement" section's other examples (Start → Stop, Capture → Cancel, anywhere a long-running verb appears) are all consistent: replacement uses `variant="destructive"`.
- A spot-check across other styleguide pages: any other "Stop" / "Cancel running" / "Abort" Button uses destructive, not outlined-neutral. Implementer can grep for `>Stop<` and similar verbs in `docs/docs/`.
- The "Two filled primaries at once is always wrong" sentence survives — the no-stacking, single-footer-discipline part of the rule is unchanged.
- `npm run build:docs` stays green.
- Release: docs-only change. Patch bump unless co-shipped with a minor.

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Related: ticket #0017 (action-row Cancel as text — same family of "secondary verb gets a quieter visual; destructive verb gets a destructive visual"). Ticket #0003 (drop Button fullWidth — same primary-action.md page, co-implementation may be efficient). Ticket #0004 (Button label length — running-state Stop / Cancel labels are already 1-word, no conflict).
- Related ADRs: _none yet_
- Reference Chromium surface: `chrome://downloads` cancel-during-download (closest in-product analogue).
- Library files in scope: none — `Button variant="destructive"` already exists.
- Docs in scope: `docs/docs/styleguide/patterns/primary-action.md` (lines 205–239 primary).
