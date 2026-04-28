---
title: "Ticket 0030 — Cleanup: regenerate the one-page LLM doc after the initiative's changes land"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0030 — Cleanup: regenerate the one-page LLM doc after the initiative's changes land

## Status

**open**

> **Mandatory verification gate.** This ticket runs to completion at the end of the initiative regardless of whether the implementer believes one-page is already current. The full top-to-bottom re-read of `one-page.md` against the live state of every component and styleguide page happens; finding nothing to change is a valid outcome, but the verification itself is not optional. The initiative cannot be marked `approved` until this ticket is `done`.

## Summary

[`docs/docs/one-page.md`](docs/docs/one-page.md) is the library's LLM-facing single-page reference — a flat dump of every component's API summary, every styleguide rule in capsule form, every recommended pattern. Agents (the operator's own coding agents, third-party tooling, anyone evaluating the library) load this page as their primary context. After the substantive tickets in this initiative land, the one-page will lie in dozens of places: it will list `Toolbar` instead of `Header`, document a `tonal` Button variant that no longer exists, recommend `fullWidth` for narrow popups, present the Badge `appearance` prop that was already removed by commit `77bafca`, and so on. Regenerate it.

## Context

Source of the report: operator named this explicitly as one of four required cleanup tickets at the close of the styleguide review.

Current state of the page (sampled from earlier reads):

- [`docs/docs/one-page.md:95`](docs/docs/one-page.md#L95) — Button props summary lists `'outlined' | 'action' | 'tonal' | 'destructive' | 'text'`, `fullWidth?: boolean`, etc. After #0003 (drop `fullWidth`) and #0009 (drop `tonal`), this line lies on two counts.
- The page also documents Badge appearance as if it still has the `appearance` prop (commit `77bafca` removed it; the one-page doc is stale on this).
- Likely many more such mismatches accumulated across components and styleguide rules.

This is a focused subset of #0029 (actualise all docs). It exists separately because:

- The one-page doc is the *primary* artifact agents load — its currency matters disproportionately.
- It can be regenerated semi-mechanically from the per-component docs and the styleguide pages, so the work is structured differently from a full doc sweep.
- Operator separated the two explicitly; respect that.

## What hurts and why

Two problems if this is skipped:

1. **Every agent that loads the one-page gets a wrong picture of the library.** They will try to use APIs that no longer exist, follow rules that were deleted, recommend patterns that were inverted. The output looks correct (it cites the docs!) but is broken.
2. **The one-page is the most public-facing artifact for LLM-driven adoption.** A consumer evaluating the library by piping its one-page into Claude / GPT / their internal tool will measure the library by what the one-page says. A stale one-page is the worst possible first impression for the audience this library most wants to reach.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Manual rewrite, top-to-bottom.** Read the page, compare against the current state of every component and styleguide page, rewrite each section. Pros: full control; catches subtle prose drift, not just API differences. Cons: tedious; easy to miss something.

2. **Build a generator script.** Write a small Node script that walks `docs/docs/components/*.md` and `docs/docs/styleguide/*.md`, extracts API summaries / rules, and assembles them into `one-page.md`. Run on each release. Pros: automated; one-page can never go out of date again. Cons: significant scaffolding for a problem that recurs only every few months; probably overkill for the current volume.

3. **Hybrid: manual rewrite this round + a checklist for keeping it current going forward.** Do the rewrite by hand for this release, then add a step to the project's release checklist (`CLAUDE.md`'s release flow section?) that says "regenerate one-page from current docs". Pros: closes the immediate gap; establishes a habit without building tooling. Cons: relies on the habit being kept.

Working hypothesis (subject to revision when the work starts): direction 3. Manual rewrite this round catches everything; the checklist entry prevents re-drift between this release and the next major review. The generator (direction 2) can come back if the manual rewrite proves repeatedly painful — but for a library this size, the per-component pages are short enough that mechanical extraction is borderline more work than just writing the summary by hand.

## Acceptance hints

- `docs/docs/one-page.md` is rewritten so every component, every prop, every variant, every default reflects the current library after the substantive tickets land.
- A grep across `one-page.md` confirms zero references to:
  - `Toolbar` as a component (use `Header` per #0018)
  - `Chip` (removed per #0012)
  - `tonal` Button variant (removed per #0009)
  - `fullWidth` Button prop (removed per #0003)
  - `appearance` Badge prop (removed by commit `77bafca`)
  - any other API surface change landed in this initiative.
- The styleguide-rules section of the one-page reflects the current rules: settings entry placement (#0026), header forbidden in side panels (#0019), Card elevated default (#0014), Badge neutral default (#0013), action-row Cancel as text (#0017's outcome), Tabs height tightened (#0015), Select / Input geometry (#0020 / #0021), etc.
- New components added by this initiative are present in the one-page: `Table` (per #0016), and any new pattern pages (`settings-entry` per #0026).
- A short note is added to `CLAUDE.md` (release flow section, or initiative framework section) reminding future contributors to regenerate one-page on any release that changes a public API or a styleguide rule.
- `npm run build:docs` stays green.
- Release: docs-only ticket. Co-shipped with #0029 in the cleanup PR, or just before the first release that bundles the substantive changes.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: every substantive ticket — #0001 through #0028 — feeds into this regeneration. Strongly related: cleanup tickets #0029 (actualise all docs), #0031 (preflight checklist), #0032 (preview images).
- Related ADRs: _none yet_
- Library files in scope: none — pure docs work.
- Docs in scope: `docs/docs/one-page.md` (primary); `CLAUDE.md` (release-flow note).
