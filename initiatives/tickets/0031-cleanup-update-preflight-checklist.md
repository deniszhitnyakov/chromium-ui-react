---
title: "Ticket 0031 — Cleanup: update the Preflight Checklist for LLMs after the initiative's changes land"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0031 — Cleanup: update the Preflight Checklist for LLMs after the initiative's changes land

## Status

**open**

## Summary

[`docs/docs/styleguide/checklist.md`](docs/docs/styleguide/checklist.md) is the LLM-facing pre-flight checklist — the "read this before generating any layout" page that codifies the styleguide's rules into a short, prescriptive sequence (Identify the surface → Shell → Composition → Typography → Color → Action rows → Navigation → Final pass). It is one of two pages explicitly written for LLMs (the other is `one-page.md`, tracked by #0030), and like the one-page it goes stale every time a substantive ticket lands. The checklist has already been edited mid-initiative (when #0005 / #0017 / etc. updated specific bullets), but the structural shape — the surface table, the Shell step, the per-step rules — needs a deliberate end-of-initiative pass to absorb everything. This ticket is that pass.

## Context

Source of the report: operator named this explicitly as one of four required cleanup tickets at the close of the styleguide review.

Current state of the page (from prior reads in the initiative):

- Step 1 (Identify the surface): popup / side panel / options page / in-page / Electron — likely OK; verify after #0019 (which forbids in-panel Header in side panels) lands.
- Step 2 (Shell): asserts the three-part shell — needs rewrite per #0019 (content-only by default, header / footer opt-in, header forbidden in side panel).
- Step 3 (Composition): currently mentions card-per-section for settings; needs alignment with #0008 (side panel also card-per-section) and #0026 (settings entry in upper half).
- Step 4 (Typography): type-scale row at line 77 says `--cr-font-size-xs` is for "All-caps section labels, tiny badges" — already updated per #0005's tightening (was patched to "tiny inline labels, badges, kbd hints" per #0005's acceptance hints). Verify after #0005 lands.
- Step 5 (Color): badge bullet at line 99 — already updated by #0005 acceptance hints. Verify.
- Step 6 (Action rows): primary on the right rule survives; needs alignment with #0017 (Cancel as text in destructive contexts).
- Step 7 (Navigation): tabs as last resort survives.
- Step 8 (Final pass): checklist of "did you do X" items — line 135 was updated per #0005; needs further review for fallout from #0008 / #0019 / #0026.
- Common failure modes (closing section): seven items today — needs additions for new failure modes (settings buried at the bottom per #0026, in-panel header in side panel per #0019, full-width primary per #0003).

This is a focused subset of #0029 (actualise all docs). It exists separately because:

- The checklist is the *first* thing an LLM is told to read before generating layout. Its currency matters disproportionately.
- The checklist's structure is prescriptive — its bullets directly cause or prevent specific failure modes. A stale checklist actively causes the failures the rest of the styleguide spends hundreds of lines warning against.
- Operator separated the two explicitly; respect that.

## What hurts and why

Two problems if this is skipped:

1. **The most-followed page in the styleguide becomes the most-misleading.** LLMs that load the styleguide context pick up the checklist first because it tells them to. A stale checklist will tell agents to do things this initiative explicitly walked away from (use `fullWidth`, put settings at the bottom, render the in-panel header in side panels, etc.).
2. **The "Common failure modes" section is the closest thing the styleguide has to a self-improving loop.** Every failure mode this initiative caught (from the prototype review) should be added to that section so future agents learn from it. Skipping the update breaks the loop.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Single integrated rewrite.** Re-read the checklist top-to-bottom, update every rule and example to reflect post-initiative state, rewrite the "Common failure modes" closing section to absorb the new ones. Pros: one focused pass; checklist comes out coherent. Cons: easy to miss a subtle fallout if the rewriter is not also re-reading the substantive tickets.

2. **Per-step diff against the substantive tickets.** Take each step (1 through 8) and walk through every substantive ticket asking "does this step need updating because of this ticket?". Build the rewrite from the diff. Pros: systematic; misses fewer things. Cons: more upfront effort.

3. **Generated from the one-page.** If #0030 (one-page regeneration) lands a process / convention for keeping one-page current, this checklist could be derived from it. Pros: structural alignment between the two LLM-facing artifacts. Cons: probably over-engineered for the size of the artifact.

Working hypothesis (subject to revision when the work starts): direction 2. The substantive tickets in this initiative are well-enumerated; using them as the diff source ensures nothing slips. Direction 1 is the fallback if direction 2 turns out to be slow.

## Acceptance hints

- `docs/docs/styleguide/checklist.md` is updated end-to-end. Every numbered step's rules and examples reflect post-initiative state.
- Step 2 (Shell) explicitly carries the per-surface table from #0019 — "in side panels, no in-panel header; in popups, header optional; in options pages, header recommended".
- Step 3 (Composition) reflects #0008 (side panel card-per-section) and #0026 (settings entry in upper half).
- Step 5 (Color) bullets reflect Badge (#0013, post-#0005), Card (#0014), and any other default-changes.
- Step 6 (Action rows) reflects #0017's outcome (Cancel as text in destructive contexts; possibly elsewhere depending on which direction landed) and #0003 (no fullWidth).
- The "Common failure modes" closing section gains entries for: full-width primary (#0003), Settings buried at the bottom (#0026), in-panel header in side panel (#0019), Unicode characters as icons (#0010), ALL CAPS section labels (#0005, the original failure mode that drove the cleanup). If a failure mode already has an anti-pattern entry, this section just summarises it and links to the anti-pattern; no need to duplicate.
- Cross-links from the checklist to the corresponding anti-pattern entries are still valid.
- `npm run build:docs` stays green.
- Release: docs-only ticket. Co-shipped with #0029 / #0030.

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Strongly related: every substantive ticket — checklist absorbs all of them.
- Related cleanup tickets: #0029 (actualise all docs), #0030 (one-page LLM doc), #0032 (preview images).
- Related ADRs: _none yet_
- Library files in scope: none — pure docs work.
- Docs in scope: `docs/docs/styleguide/checklist.md` (primary).
