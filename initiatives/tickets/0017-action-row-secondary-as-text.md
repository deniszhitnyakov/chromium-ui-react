---
title: "Ticket 0017 — Action-row secondary (Cancel) should be variant='text', not outlined"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0017 — Action-row secondary (Cancel) should be variant='text', not outlined

## Status

**open**

## Summary

The "Remove bookmark?" example in principle #4 of [`docs/docs/styleguide/principles.md`](docs/docs/styleguide/principles.md) shows a pair of buttons — `<Button>Cancel</Button>` (default `outlined` variant) on the left and `<Button variant="destructive">Remove</Button>` on the right. Both render as pills (full border-radius, 1px outline); the Cancel button paints its label in primary-blue, so the operator reads the row as "two round, blue-leaning pills" — the operator's word was "аляповато" (gaudy / fussy). The fix proposed: leave Remove as it is, but switch Cancel to `variant="text"` so it reads as a quiet text affordance next to the destructive pill instead of competing with it visually.

Operator's later anti-patterns review (same packing session) confirmed this is a **library-wide rule, not a one-example tweak**, and explicitly extended the scope to two anti-pattern updates: (a) introduce a new anti-pattern entry "Secondary action styled as a full Button" with a wrong / right pair; (b) rewrite the existing anti-pattern #11 ("Primary color on secondary actions") so the rule reads "secondary actions are `<Button variant='text'>`", not the looser "anything that is not the primary".

> **Terminology note.** The operator's request used "Conceal" — this is speech-to-text drift for **Cancel** (the secondary button in an action-row pair). The rest of this ticket says "Cancel".

## Context

Library state (relevant variants only):

- [`packages/chromium-ui-react/src/components/Button/Button.css:1-28`](packages/chromium-ui-react/src/components/Button/Button.css#L1) — `.cr-button` base: pill (`border-radius: var(--cr-radius-full)`), 1px tonal outline, transparent background, `color: var(--cr-fallback-color-primary)` (the primary blue). This is what `outlined` Cancel paints today.
- [`packages/chromium-ui-react/src/components/Button/Button.css:79-83`](packages/chromium-ui-react/src/components/Button/Button.css#L79) — `.cr-button--text`: no border, smaller `min-width`, `padding: 8px 12px`. Same primary-blue text colour, no pill outline.
- [`packages/chromium-ui-react/src/components/Button/Button.css:71-77`](packages/chromium-ui-react/src/components/Button/Button.css#L71) — `.cr-button--destructive`: error border + error text, hover gets a soft error-container fill. Pill shape.

So the current pair in the example renders as: blue-text pill (Cancel, outlined) + red-text pill (Remove, destructive). Two pills next to each other, of similar visual weight, separated only by accent colour. The operator's read of "round and blue" is correct: the Cancel pill *is* visually round, and its text *is* blue.

Where the action-row pattern is currently shown across the docs:

- [`docs/docs/styleguide/principles.md:51-62`](docs/docs/styleguide/principles.md#L51) — the "Remove bookmark?" example. The one the operator flagged.
- [`docs/docs/styleguide/anti-patterns.md`](docs/docs/styleguide/anti-patterns.md) — anti-pattern #2 ("Primary button on the left") shows `<Button>Cancel</Button> <Button variant="action">Save</Button>` in the **right** version (lines 63–67). Same `outlined` Cancel.
- [`docs/docs/styleguide/dialogs.md`](docs/docs/styleguide/dialogs.md) — likely shows the same pattern; implementation-time read.
- [`docs/docs/styleguide/forms.md`](docs/docs/styleguide/forms.md) — submit row examples; ticket #0002 already enumerated some footers.
- [`docs/docs/styleguide/patterns/primary-action.md`](docs/docs/styleguide/patterns/primary-action.md) — primary-action with optional Cancel.
- Likely several more — `grep -rn '<Button>Cancel' docs/docs/styleguide/` would enumerate the full set on implementation.

Native Chromium reference (matters here, because the rule may be diverging from it):

- `chrome://settings/clearBrowserData` confirmation — Cancel + Clear data, both pill-shaped, Cancel `outlined`, Clear `action` (filled blue).
- `chrome://settings` "Sign out" confirmation — same pair shape.
- `chrome://bookmarks` "Delete folder" — same.

So Chromium itself uses `outlined` for Cancel in action rows. The operator's preferred rendering (Cancel as `text`) is visually quieter than Chromium's current convention. That is not necessarily wrong — the styleguide already has one explicit departure from Chromium (centered full-size primary in side-panel footers, see ticket #0003 / patterns/primary-action.md) — but it should be a **deliberate** decision, not a stealth one. This ticket has to make the choice explicit.

## What hurts and why

Three problems:

1. **The example reads as two competing pills.** When the secondary button has the same shape and a near-equally-saturated text colour as the primary/destructive, the eye does not pick a primary action quickly. The destructive red pill is the verb the user came to confirm; making Cancel a quieter text affordance would let Remove "win" the action row visually. The operator's gut read ("аляповато") is the symptom.
2. **The current rule is invisible.** Right now the styleguide says "secondary on the left, primary on the right" but does not specify which `Button` variant the secondary should use. The examples imply `outlined` by always using bare `<Button>`. An agent assembling an action row from the styleguide gets the visually heavier shape by default, with no rule to push back at it.
3. **Whatever is decided needs to be uniform.** A one-example fix in principles.md would put principles.md out of sync with anti-patterns.md, dialogs.md, forms.md, and primary-action.md. The styleguide already trips over its own internal inconsistencies (see ticket #0005 — the side-panel section-label exception); adding another would make the next agent that loads two pages get contradictory advice.

The deeper meta-problem is the recurring shape of this initiative: the rule that the styleguide *implies* is enforced through example only, the example gets repeated, the implication becomes a convention, and the convention turns out not to match what the operator wants. Either the rule is made explicit (and the examples follow), or the rule changes (and *all* examples follow). Mixing the two is what produces the inconsistency the operator keeps bumping into.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **One-example fix.** Switch only the principles.md example to `<Button variant="text">Cancel</Button>`; leave the rest of the docs as-is. Pros: smallest diff; addresses exactly the surface the operator flagged. Cons: principles.md now contradicts anti-patterns.md / dialogs.md / forms.md / primary-action.md, every other Cancel in the styleguide stays outlined, and the next prototype review will surface the same complaint about a different page.

2. **New rule, sweep everything.** Establish "in an action-row pair, the secondary button is `variant='text'`, the primary is `variant='action'` or `variant='destructive'`". Update principles.md, anti-patterns.md (#2 right version), dialogs.md, forms.md, patterns/primary-action.md, and any styleguide / sample / component live preview that uses `<Button>Cancel</Button>` in an action row. Add a short subsection to `dialogs.md` (or a new `action-rows.md`) that states the rule explicitly. Pros: uniform; the next reader / agent gets one consistent message; matches the operator's preference everywhere. Cons: documents diverge from current Chromium convention (`outlined` Cancel) — this divergence should be acknowledged in the prose, not hidden.

3. **New rule, narrower scope: text Cancel only in destructive confirmations; outlined Cancel everywhere else (settings, forms, neutral dialogs).** A middle ground: the visual competition the operator flagged is sharpest when the primary is destructive (red pill vs. blue pill). For `action` (filled blue pill) primaries, an `outlined` Cancel is already visually distinct and matches Chromium native. So the rule becomes scoped: `secondary = text` when `primary = destructive`, `secondary = outlined` when `primary = action`. Pros: fixes the actual complaint without diverging from Chromium where Chromium is already fine. Cons: more nuance for the agent to remember; "is this a destructive flow?" becomes a decision point that the styleguide will have to scope.

Working hypothesis (subject to revision when the work starts): the operator's anti-patterns review effectively rules out direction 1 (one-example fix) — he wants the rule catalogued globally, not patched in one place. So the realistic choice is between **direction 2** (blanket "secondary = text" everywhere) and **direction 3** (scoped: text for destructive, outlined for action). Direction 3 still preserves Chromium-native behaviour where Chromium is fine; direction 2 simplifies the rule at the cost of one more documented divergence. Default to direction 3 unless the work turn surfaces a reason to go simpler.

## Acceptance hints

- The "Remove bookmark?" example in `docs/docs/styleguide/principles.md` no longer renders Cancel as a pill outlined button next to a destructive pill. It is `variant="text"`.
- A short rule statement appears in the styleguide (probably in `dialogs.md`, possibly a new `action-rows.md`) clarifying which `Button` variant the action-row secondary should use, and under what conditions. The rule explicitly notes whether it diverges from Chromium native, and why (the way the primary-action pinned-footer pattern documents its own divergence today).
- A **new anti-pattern entry** is added to `docs/docs/styleguide/anti-patterns.md` (e.g. "Secondary action styled as a full Button") with wrong / right live previews matching the visual style of the existing entries. Wrong shows a non-text `Button` (outlined or otherwise) as the action-row secondary; right shows `<Button variant="text">…</Button>`.
- The **existing anti-pattern #11** in `docs/docs/styleguide/anti-patterns.md` ("Primary color on secondary actions") is rewritten. Today it says "Exactly one primary action per view. Everything else is `outlined`, `text`, or `tonal`." After this fix the rule narrows to "Secondary actions are `<Button variant='text'>`. Outlined and tonal are not stand-ins for the secondary in an action-row pair." (The wording also picks up the changes from #0009 — `tonal` is gone.)
- Anti-pattern #2 ("Primary button on the left") is reviewed against the new rule and its right-side example is updated to use `variant="text"` for Cancel.
- All other styleguide / pattern / sample / component live previews that show an action-row pair are reviewed and brought in line. Under direction 3 (working hypothesis): no live preview pairs a non-`text` Cancel with a `destructive` primary; `outlined` Cancel survives next to `action` primaries.
- `npm run build:docs` stays green.
- Release: docs-only change unless the work turn discovers a Button API tweak is needed; if docs-only, a patch bump is appropriate.

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Related: ticket #0003 (drop Button `fullWidth` — sweeps the same set of action-row examples; co-implementation worth considering); ticket #0009 (drop Button `tonal` — directly affects the wording of anti-pattern #11 rewrite); ticket #0004 (button label length — this ticket also touches Button copy).
- Related styleguide pages: `docs/docs/styleguide/principles.md` (#4), `docs/docs/styleguide/anti-patterns.md` (#2), `docs/docs/styleguide/dialogs.md`, `docs/docs/styleguide/forms.md`, `docs/docs/styleguide/patterns/primary-action.md`.
- Related ADRs: _none yet_; if direction 2 is chosen, the divergence from Chromium native deserves a short ADR.
- Reference Chromium surfaces: `chrome://settings/clearBrowserData`, `chrome://settings` Sign out confirmation, `chrome://bookmarks` Delete folder confirmation.
- Library files in scope: none — Button already supports `variant="text"`. This is a docs / pattern-rule ticket.
