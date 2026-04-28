---
title: "Ticket 0027 — Reader Mode sample: empty space under the Reader Settings card"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0027 — Reader Mode sample: empty space under the Reader Settings card

## Status

**open**

## Summary

The Reader Mode sample at [`docs/docs/styleguide/samples/reader-mode.md`](docs/docs/styleguide/samples/reader-mode.md) renders a panel with a fixed height that is taller than the actual content needs, leaving a visible empty band of surface below the Reader Settings card at the bottom. The operator's screenshot shows it clearly: the bottom ~120–150px of the panel are blank. The fix is layout: either let the panel size to its content (preferred), or — if a fixed height is wanted for the live-preview demo — fill the empty space with something deliberate (a `Divider` and an inline tip, an `EmptyState`, or simply a smaller fixed height).

## Context

Source of the report: operator's review of the Samples section. He attached a screenshot of the Reader Mode panel showing the empty band; the rest of the sample (header, article body, Reader Settings drill-in card at the bottom) renders correctly above the band.

Why this happens (best guess; confirm at implementation time): the live preview wraps the panel content in a fixed-height container (`height: 640` or similar) for the demo, but the actual content stack — header + article body + settings card — does not fill the full height. Without a flex spacer or content-driven sizing, the unused vertical space sits visible at the bottom.

This is a layout-bug class fix, not a styleguide-rule change. The rest of the Reader Mode sample is structurally fine — operator's overall verdict was "очень прикольный, я прям порадовался".

Adjacent observation worth flagging: ticket #0026 (Settings entry placement + naming) also touches this sample — the section currently called "Reader Settings" should become "Settings", and the implementer should decide whether to keep it at the bottom (with justification in the prose) or move it to the upper half. This bug fix should not pre-empt that decision; if #0026 lands first and moves the settings entry up, this layout bug may resolve itself (the trailing empty space disappears because the upper-half settings entry pushes content down). If this ticket lands first, fix the empty space with the current bottom-anchored layout, accepting that #0026 may rework it again.

## What hurts and why

Two problems:

1. **It looks like a verstka bug, because it is one.** A live preview that ships with a visible blank band at the bottom undermines the styleguide's overall "look at how clean these examples are" claim. The operator caught it on a casual review; any reader of the docs page is going to notice the same thing.
2. **It teaches the wrong sizing pattern.** A reader copying the sample copies the fixed-height container too, and inherits the bug. If the example used content-driven sizing (or showed an explicit `EmptyState` filling the bottom), the lesson would be "this is how a reader-mode panel composes" rather than "this is how to leave a blank rectangle below your card".

Low-priority compared to the structural tickets in the backlog, but easy to fix and visible on the deployed docs site.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Content-driven sizing.** Drop the fixed `height` from the panel container in the live preview; let the stack of header + article + settings card determine the height. Pros: the bug literally cannot recur; the example shows the natural shape of a reader-mode panel. Cons: live-preview demos often want a fixed height to show off the scroll behaviour; if the reader-mode panel benefits from showing scroll, this loses that.

2. **Smaller fixed height.** Keep the fixed-height idiom but tune the value down so the content fills it. Pros: keeps the live-preview consistency with other samples; smallest diff. Cons: requires picking a height; the content might shrink-grow on dark mode / different viewport / future edits, re-introducing the bug.

3. **Fill the empty space deliberately.** Keep the fixed height; add an `EmptyState`-style row, a `Divider` plus a one-line tip, or a small `<Button variant="text">` ("Done reading?") that fills the gap. Pros: the panel reads as designed; could even add useful UX. Cons: invents content the sample does not need, just to fill space.

Working hypothesis (subject to revision when the work starts): direction 1 (content-driven sizing). The other reader-mode operations (zoom, font tweak) all happen inside the settings drill-in subview, so the main view does not need a fixed-height shell. If the implementer finds that fixed height is genuinely needed for some specific demo aspect, fall back to direction 2.

## Acceptance hints

- The Reader Mode sample's deployed live preview no longer shows a visible empty band below the Reader Settings card.
- The fix is either content-driven sizing (panel grows to its content) or a deliberate filler element — not whitespace by accident.
- The sample still renders correctly across light and dark mode and at the typical preview viewport widths.
- If #0026 lands first and reshapes the sample's settings-entry placement, this fix is re-evaluated: it may be a no-op, or it may need a different layout treatment.
- `npm run build:docs` stays green.
- Release: docs-only fix. Patch bump.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related: ticket #0026 (Settings entry pattern: placement + naming) — same sample touched; sequence carefully.
- Related ADRs: _none yet_
- Reference: operator's screenshot of the deployed Reader Mode sample with the visible empty band (attached to the report).
- Library files in scope: none — pure docs fix.
- Docs in scope: `docs/docs/styleguide/samples/reader-mode.md` (primary).
