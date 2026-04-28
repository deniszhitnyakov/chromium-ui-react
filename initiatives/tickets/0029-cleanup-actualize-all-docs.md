---
title: "Ticket 0029 — Cleanup: actualise all documentation after the initiative's changes land"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0029 — Cleanup: actualise all documentation after the initiative's changes land

## Status

**open**

## Summary

The Design & Styleguide Refinement initiative is producing ~25+ tickets that touch component APIs, default values, styleguide prose, anti-patterns, patterns, and samples. Each implementing turn updates the docs that are *immediately in scope* — but cross-cutting effects (a renamed component referenced from a sample three folders away, an anti-pattern entry made obsolete by a default change, prose that now says one thing while a freshly-landed live preview says another) inevitably accumulate. This ticket is the cleanup pass: a deliberate, dedicated sweep of the entire docs site after the substantive tickets have landed, to catch what the per-ticket implementations missed. It exists specifically because the operator asked for it, and because cleanup tickets are the most-skipped kind of work — naming this one explicitly raises its priority.

## Context

Source of the report: operator's closing remarks of the styleguide review, naming four explicit cleanup tickets (this one, plus #0030 / #0031 / #0032).

What "all documentation" covers:

- `docs/docs/intro.md` — Introduction landing page, including the showcase imagery (separately tracked by #0032).
- `docs/docs/styleguide/*` — every page (`principles.md`, `layout.md`, `typography.md`, `color.md`, `spacing.md`, `sections-and-rows.md`, `forms.md`, `dialogs.md`, `navigation.md`, `anti-patterns.md`, `chromium-reference.md`, `checklist.md` — separately tracked by #0031).
- `docs/docs/styleguide/patterns/*` — settings-page, side-panel, extension-popup, bookmarks-manager, primary-action, plus any new pattern pages (likely `settings-entry.md` from #0026).
- `docs/docs/styleguide/samples/*` — link-collector, reader-mode, tab-manager.
- `docs/docs/components/*` — every component page, especially any whose API changed (Badge, Button, Card, Tabs, Select, Input, Toolbar→Header, Menu, Radio).
- `docs/docs/one-page.md` — separately tracked by #0030.
- `docs/sidebars.ts` — sidebar registration for any added / removed pages (settings-entry pattern, possible Header rename, possible Chip removal).
- `README.md` (repo root and `packages/chromium-ui-react/README.md`) — verify version, links, examples.

This ticket is **not** the place to do net-new docs work — that lives in the substantive tickets. This ticket is the integration sweep: *after* everything else lands, read every page top-to-bottom, fix the leftover inconsistencies, dead links, stale screenshots, and contradictory examples.

Why this is its own ticket and not "implementer's responsibility on each PR":

- Per-ticket implementers see only their immediate scope. Cross-cutting fallout is invisible to them by design.
- The amount of fallout is unknowable until most substantive tickets have landed. Doing the sweep too early misses things; doing it never leaves the docs visibly inconsistent.
- Naming it explicitly is the only way to ensure it gets done. Cleanup is the most skipped step of any non-trivial change set.

## What hurts and why

Two problems if this is skipped:

1. **The deployed docs site fragments visibly.** Pages will reference a renamed component by its old name, anti-patterns will warn against problems we already fixed, samples will show outdated geometry, the LLM-facing one-page doc will lie about the API. Each individual sin is small; together they erode trust in the styleguide as authoritative.
2. **Future agents loading the styleguide get conflicting signals.** The styleguide is built to be loaded as agent context; an agent that reads three pages simultaneously and finds two of them disagree will produce inconsistent output — exactly the failure mode this whole initiative is trying to prevent.

This is a low-glamour, high-leverage ticket. Its value is exactly proportional to how complete and recent the substantive work is.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Single big sweep at the end.** Wait for all (or substantially all) substantive tickets to land, then do one dedicated PR that reads every page top-to-bottom, fixing leftover issues. Pros: maximum amount of fallout caught at once; one focused review. Cons: large PR; risk of merge conflicts; "all substantive tickets land" is a moving target.

2. **Rolling sweeps after each release.** After each minor / patch release that bundles substantive tickets, a follow-up PR sweeps the docs for fallout from that batch. Pros: smaller PRs; faster feedback; aligns with release cadence. Cons: more overhead per release; still misses cross-release inconsistencies.

3. **Linter-style per-PR check + final sweep.** Implement (or just write down as a checklist for implementers) a "before merging this PR, grep the docs for these strings" step — for example, after #0018 lands, every implementer of a subsequent Toolbar-touching ticket grep-checks for stale `Toolbar` references. Plus one final sweep at the end for shape-level inconsistencies the grep-checks cannot catch. Pros: catches the obvious fallout in the PRs that cause it; final sweep handles the rest. Cons: requires discipline from each implementer; checklist drift over time.

Working hypothesis (subject to revision when the work starts): direction 1 — single big sweep after substantive tickets are landed enough that the cost of doing the sweep is worth the cost of waiting. The implementer of this ticket's eventual work turn should start by re-reading the journal and the kanban Done column to see what changed.

## Acceptance hints

- A grep across all `docs/docs/` files surfaces zero references to:
  - `Toolbar` (renamed to `Header` per #0018)
  - `Chip` (removed per #0012)
  - `tonal` Button variant (removed per #0009)
  - `fullWidth` Button prop (removed per #0003)
  - `appearance` Badge prop (already removed by commit `77bafca`)
  - `text-transform: uppercase` in section-label inline-style recipes (per #0005)
  - `Options` / `Reader Settings` as variant naming for the standardised "Settings" entry (per #0026)
  - …plus any other API surface change that landed.
- Every styleguide page's prose claims are consistent with the live previews on the same page.
- Every cross-page link works.
- Every Live Preview renders correctly in light and dark mode.
- The styleguide's anti-patterns page lists every anti-pattern this initiative added, and rewrites every right-side example invalidated by a substantive ticket (notably anti-pattern #16's right-side Settings drill-in, per #0026).
- `docs/sidebars.ts` is current — added pages registered, removed pages unregistered.
- `docs/docs/components/*` pages match the current component APIs (props tables, default values, available variants).
- README files at repo root and `packages/chromium-ui-react/README.md` are current — verify version, links, code snippets.
- One-page LLM doc and Preflight Checklist are tracked by #0030 and #0031 respectively — this ticket does not duplicate that work, it just verifies that the pages it does cover are coherent with those.
- `npm run build:docs` stays green; visual spot-check of the deployed site after merge.
- Release: docs-only ticket. Often the last commit before a release tag.

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Strongly related (all the substantive tickets whose fallout this sweep cleans up): every other ticket in this initiative.
- Related cleanup tickets: #0030 (one-page LLM doc), #0031 (preflight checklist), #0032 (preview images).
- Related ADRs: _none yet_
- Library files in scope: none — pure docs sweep.
- Docs in scope: every file under `docs/docs/`, plus `docs/sidebars.ts`, plus README files.
