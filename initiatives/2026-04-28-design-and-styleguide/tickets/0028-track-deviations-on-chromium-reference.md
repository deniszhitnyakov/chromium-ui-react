---
title: "Ticket 0028 — Track every library deviation from Chromium source on the chromium-reference page"
status: done
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0028 — Track every library deviation from Chromium source on the chromium-reference page

## Status

**done** — direction 3 (deviations table at the bottom + intro rewrite). `chromium-reference.md` opening prose rewritten to frame Chromium as the *baseline*, the library as the *shipped value*, and deviations as deliberately catalogued. New "## Deliberate deviations" section at the end with two subsections: a "Value-shaped" table (Tabs height, ALL CAPS labels, action-row Cancel, SearchInput border, Card default, Badge default, Toolbar→Header rename, side-panel composition, in-panel header ban, Tonal removal — 10 rows) and a "Shape-shaped" bullet list (centred primary on side panel, Settings entry placement+naming, no fullWidth, Stop=destructive, sidebar Menu flat). Each deviation cites its implementing ticket. Direction 3's per-table extra columns deferred — every numerical deviation already maps to an existing standalone table elsewhere on the page, and adding columns would have widened tables uncomfortably; the bottom catalogue keeps everything inspectable in one place. Maintenance rule added to `CLAUDE.md`: every deviation-introducing PR updates this page in the same commit.

## Summary

[`docs/docs/styleguide/chromium-reference.md`](docs/docs/styleguide/chromium-reference.md) is currently a one-way ledger: it copies authoritative numbers from Chromium's public source tree and uses them to back up the styleguide's claims. But this initiative is producing a steadily-growing set of deliberate **deviations** from those Chromium reference values — places where the library, in pursuit of its narrower goal of powering Chrome-extension UIs (especially side panels), chooses a different value than `chrome://`-source ships. Today those deviations are scattered: some live in styleguide prose ("this is a deliberate departure"), some only appear in a ticket file, some have no documentation at all. Convert the chromium-reference page into a **two-column ledger**: Chromium's value alongside the library's value, with a reason. Deviations stop being implicit; they become inspectable.

## Context

Source of the report: operator's review of the chromium-reference page in the same packing turn that produced the cleanup tickets (#0029–#0032). His framing: "приоритет остается за style guide и библиотекой при оформлении этих стилей, поскольку для утилитарных целей наши изменения подходят больше" — the styleguide / library values win in the surfaces this library powers, but the Chromium values stay visible so the divergence is honest.

Current state of the page (from a partial read at packing time):

- Front-matter description: "the authoritative measurements, tokens, and layout rules copied directly from the Chromium source tree. Cite this page when you need to justify a specific value."
- Sections: Shell (settings), Section card, Rows, `cr-link-row`, `cr-toolbar`, `cr-dialog`, Form field label, Buttons, State colors, Card sizes per surface.
- Each section is a `Property / Value / Source` table.

Deviations this initiative is already producing (and the corresponding tickets):

| Aspect | Chromium source value | Library proposed value | Source ticket |
|---|---|---|---|
| Side-panel composition | bare-surface flat list (Reading List) | card-per-section with elevated cards | #0008 |
| Side-panel header | 48px in-panel header strip | forbidden in side-panel extensions (system header outside iframe) | #0019 |
| ALL CAPS section labels | used in some Chromium menu group labels | dropped everywhere except the narrow `cr-form-field-label` use | #0005 |
| Tabs height | ~48px (settings-style sub-tabs) | ~32–36px (compact for extension use) | #0015 |
| Tonal Button | `cr-tonal-button` exists | dropped from library | #0009 |
| `Toolbar` component name | `cr-toolbar` in Chromium source | renamed to `Header` in library | #0018 |
| Action-row Cancel | `outlined` Button (chrome://settings dialogs) | possibly `text` Button (working hypothesis under #0017) | #0017 |
| Settings entry placement | persistent sidebar in chrome://settings | upper-half drill-in row in extension surfaces | #0026 |
| Badge default | various filled accents in Chromium | outline-only, neutral default | commit `77bafca` + #0013 |
| Card default | mostly elevated in chrome:// | becoming the library default (was `default` flat) | #0014 |

This list is illustrative, not exhaustive — every implementing turn that lands a deviation should add a row. The styleguide already documents two such departures inline (the side-panel pinned-footer pattern in `patterns/primary-action.md`, the no-`fullWidth` rule once #0003 lands), but they are not consolidated anywhere.

## What hurts and why

Three problems:

1. **Deviations become invisible over time.** When a library matures past 1.0 and starts shipping releases at distance from this initiative's commit log, "why is the Tabs height 32px when Chromium uses 48px?" becomes a question with no central answer. The chromium-reference page, by name, is the place a reader will look — and today it would say "48px from Chromium" without any flag that the library disagrees.
2. **The styleguide can quietly drift.** A future contributor reading chromium-reference and copying its values into a new styleguide page will reintroduce a deviation we have already removed (e.g. ALL CAPS section labels, tonal button, full-width primary). The reference page should make it impossible to copy a value the library has explicitly walked away from.
3. **Honesty / discoverability for downstream consumers.** Anyone evaluating the library or trying to understand its design philosophy benefits from a single page that says "these are the places we depart from Chrome, and here is why". It is also the right surface to flag deviations in release notes for a pre-1.0 → 1.0 transition.

The deeper meta-problem is the one the operator's framing names directly: the library's "Chromium-authentic visuals" claim survives best when it is honest about the surfaces it does not match. The reference page is the natural place for that honesty.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Add a "Library value" column and a "Reason" column to every table on chromium-reference.** Each existing row gets two extra cells: the library's chosen value (if it differs), and a one-line reason linked to the relevant ticket / commit. Cells where the library matches Chromium stay blank or say "matches". Pros: keeps the page's existing shape; deviations are inline next to the numbers they affect; easy to scan. Cons: tables get wider; some deviations don't fit cleanly into the existing tables (e.g. composition rules, naming conventions).

2. **Add a single "Deliberate deviations" section at the bottom.** Keep the existing tables as Chromium-source-of-truth; add a new section enumerating each deviation with a short reason and a ticket / commit link. Pros: keeps existing tables clean; deviations are one scrollable list; easy to maintain (one place to update). Cons: harder to spot a deviation when scanning a specific table; the source value and the deviation are not visually adjacent.

3. **Both: in-table column + bottom section.** In-table column for value-shaped deviations (numbers, tokens, class names); bottom section for shape-shaped deviations (composition rules, naming conventions, presence/absence of patterns). Pros: best of both; covers all deviation types. Cons: more maintenance overhead; two places to keep in sync.

Working hypothesis (subject to revision when the work starts): direction 3. Most deviations are value-shaped (a different number, a different token, a renamed class) and benefit from in-table proximity to the source value; a few are shape-shaped (composition, naming policy) and need their own section. The split keeps the page honest without bloating any one part of it.

Open questions for the work turn:

- What is the policy when the *Chromium* value changes (e.g. Chromium drops `cr-tonal-button` or renames `cr-toolbar`)? The page is currently a snapshot; should it gain a "verified against Chromium as of YYYY-MM-DD" footer?
- Does the deviation policy apply only to values *currently* deviating, or do we want to record the *history* (e.g. "library used to ship X, now ships Y, dropped on YYYY-MM-DD")? Lean toward "current state only" — history lives in the ticket files and the journal.
- Should every implementing-turn PR that lands a deviation be required to update chromium-reference in the same commit (mirroring the TIMELINE / glossary same-commit rule from the framework)? Lean yes, and this ticket's acceptance hints can codify that.

## Acceptance hints

- `docs/docs/styleguide/chromium-reference.md` updated to expose deliberate deviations: per-table extra columns for value-shaped deviations, plus a bottom "Deliberate deviations" section for shape-shaped ones.
- The page's intro paragraph is rewritten so it reads as "Chromium values are the source of truth for the *Chromium* baseline; the library may deliberately depart from a value when the extension-UI use case warrants it. Deviations are flagged below" — not "trust the source over the guide" (which is the current framing and contradicts the deviation policy).
- Every deviation already created by this initiative (#0005, #0008, #0009, #0013, #0014, #0015, #0017, #0018, #0019, #0026, plus commit `77bafca`) is recorded once the corresponding ticket lands. This ticket itself does not require those tickets to be implemented first — it can land with placeholder rows that say "pending ticket #00XX" until each ticket closes.
- A short maintenance rule is added (probably to `CLAUDE.md`'s "Initiative-driven internal docs" section, or to `chromium-reference.md` itself): every implementing-turn PR that introduces or removes a deviation updates this page in the same commit.
- `npm run build:docs` stays green.
- Release: docs-only ticket. Patch bump, or co-shipped with one of the deviation-introducing tickets.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: every deviation-producing ticket in this initiative — #0005, #0008, #0009, #0013, #0014, #0015, #0017, #0018, #0019, #0026. (Plus commit `77bafca` for the Badge solid removal.)
- Related: cleanup tickets #0029 (actualize all docs), #0030 (one-page LLM doc), #0031 (preflight checklist) — chromium-reference is one of the docs touched by the broader sweep.
- Related ADRs: _none yet_; the deviation policy itself might be the first ADR of this initiative.
- Library files in scope: none — pure docs work.
- Docs in scope: `docs/docs/styleguide/chromium-reference.md` (primary); `CLAUDE.md` (maintenance rule).
