---
title: Design & Styleguide Refinement — overview
status: in-progress
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: readme
language: en
---

# Design & Styleguide Refinement — overview

## Goal

Tighten `chromium-ui-react`'s component defaults, styleguide rules, and anti-pattern catalogue so that AI-agent-generated extension UIs land closer to Chromium-native by default. The forcing function is a real Chrome extension prototype (a Google Maps scraper side panel, generated with an AI agent against the current library + styleguide) — each visible deviation from the Chromium feel surfaces a gap to close, either in the component API, the styleguide prose, or the catalogue of anti-patterns.

The initiative is **catalogue-shaped**, not project-shaped: there is no fixed scope or end date. Problems are added to `kanban.md` as the operator notices them in the prototype, packed individually, and shipped one at a time. The initiative closes when no new problems have surfaced for a meaningful stretch, or when scope diverges enough to warrant a successor initiative.

## Status

**in-progress** — first round of cleanup. Badge has been forced to outline-only; the rest of the prototype-driven backlog will be unpacked into `kanban.md` as the operator surfaces issues.

| Section / Artifact         | State    |
| -------------------------- | -------- |
| Goal agreed                | done     |
| Backlog seeded in kanban   | rolling  |
| First fix shipped (Badge)  | done     |
| Decisions logged           | none yet |

## Artifacts

- [`journal.md`](./journal.md) — living log of how the work unfolded, reverse-chronological
- [`kanban.md`](./kanban.md) — subtask board (Obsidian Kanban). One card per problem packed from the prototype. Three columns: To Do, In Progress, Done.
- `decisions/` — created on demand, when a fix forces a load-bearing trade-off worth recording as an ADR

There is **no** primary artifact (`vision.md` / `rfc.md` / `plan.md`) — this initiative's deliverable is the cumulative diff against the library and styleguide, captured per-card on the board, not a single document.

## Working agreement

- The operator surfaces a problem from the prototype (or from review of the library / docs).
- The agent **packs the problem as a kanban card under "To Do"** — one short title plus a 1–2 sentence "what hurts and why" hook, plus a long-form ticket file under `tickets/`. **No implementation in the same turn.**
- The operator decides priority and triggers implementation explicitly.
- When implementation starts: card moves To Do → In Progress, work happens, then card moves In Progress → Done **in the same commit** as the code/docs change. At most one card In Progress at a time.

## Definition of Done (initiative-level)

This initiative cannot be moved to `approved` in `TIMELINE.md` until **all** of the following are true:

- Every substantive ticket in `tickets/` (every `#NNNN` not in the cleanup quartet below) is `done` or `wontfix`.
- The four mandatory cleanup tickets — **#0029** (actualise all docs), **#0030** (regenerate one-page LLM doc), **#0031** (update Preflight Checklist), **#0032** (re-render Introduction preview images) — are all `done`. These run as verification gates regardless of whether prior implementing turns appear to have already taken care of their work; finding nothing to change in any of them is a valid outcome, but the gate itself is not optional. See each ticket's "Mandatory verification gate" note in its `## Status` section.
- `TIMELINE.md` is updated to flip this initiative from `in-progress` to `approved` in the same commit that closes the last ticket.

The cleanup quartet is non-negotiable because cleanup work is the most-skipped step of any non-trivial change set, and this initiative produces enough cross-cutting fallout that drift between docs, the LLM-facing artifacts, and the visual showcase is the default outcome unless explicitly verified at the end.

## How to read this folder

- For the *current state* — read this `README.md` and the most recent entry in `journal.md`.
- For *what's queued / in flight* — open `kanban.md`.
- For *how a specific fix was reasoned about* — find the matching journal entry by date.
- For *load-bearing trade-offs* — check `decisions/` (created on demand).
