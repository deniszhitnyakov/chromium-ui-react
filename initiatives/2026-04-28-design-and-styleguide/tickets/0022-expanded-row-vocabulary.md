---
title: "Ticket 0022 — Sections-and-rows: expand the canonical row vocabulary beyond toggle / drill-in / inline-control"
status: done
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0022 — Sections-and-rows: expand the canonical row vocabulary beyond toggle / drill-in / inline-control

## Status

**done** — direction 2 (expand prose + visual gallery). `sections-and-rows.md` section retitled "## Common row shapes" with an opening paragraph clarifying the slot vocabulary (`icon`/`avatar`/`primary`/`secondary`/`end`) is the actual primitive — the listed shapes are starting points, not a closed set. New gallery preview at the top stacks 7 representative rows in one Card. Four new shape entries appended after the original three: read-only value row (settings-summary value on the right + primary+secondary "info row"), status / progress row (Spinner-in-end for indeterminate, Progress in secondary for x-of-y), status badge row (post-#0013 outline-only Badge variants), action row (single `Button variant="text"` in `end`). Closing "Other shapes" subsection points at avatar-leading / icon+drill-in / multi-line content compositions without giving them dedicated entries. Verified 1 error Badge / 2 Spinners / 1 Progress all render in the live previews.

## Summary

[`docs/docs/styleguide/sections-and-rows.md`](docs/docs/styleguide/sections-and-rows.md) presents "the three canonical rows" as toggle, drill-in, and inline-control. The operator's review of the composition section noted that real extension UIs need more shapes than that — a row may be plain informational text, may host a horizontal or circular `Progress`, or may pair primary + secondary text on the left with a `Badge` on the right. None of these are exotic; the `PanelRow` and `ListItem` primitives already support them via their existing slots (`primary`, `secondary`, `end`, `icon`). They just are not catalogued, so the styleguide implicitly tells the agent "these three exist" and the agent only reaches for those three. Document the rest.

## Context

Source of the report: operator's review of `sections-and-rows.md`, in the same packing turn that surfaced #0020 (Select geometry) and #0021 (Input/Textarea alignment). Direct quote: "почему не просто текст? Потому что иногда row у нас может содержать просто какую-то информацию. Кроме того, у нас бывает row, в котором может быть горизонтальный или круглый progress … Еще у нас может быть row, у которого слева две строчки текста — primary и secondary, — а справа какой-то badge. Это тоже вполне возможно. Так что, на самом деле, базовых rows у нас сильно больше, чем эти три".

Current state of the page:

- [`docs/docs/styleguide/sections-and-rows.md:61`](docs/docs/styleguide/sections-and-rows.md#L61) — section heading "The three canonical rows".
- Sub-headings:
  - line 65 — "1. Toggle row"
  - line 87 — "2. Drill-in row"
  - line 115 — "3. Inline-control row"
- The phrase "the three canonical rows" frames the list as exhaustive. The page does not say "and any other shape composed of the same slots is fine" — so the implicit rule reads as "if your row is not one of these three, you are off-pattern".

Library state (the primitives are already general enough):

- [`packages/chromium-ui-react/src/components/PanelStack/PanelRow.tsx`](packages/chromium-ui-react/src/components/PanelStack/PanelRow.tsx) — `PanelRow` accepts `primary`, `secondary`, `icon`, `end`, `interactive`, `navigateTo`, `chevron`, `disabled`. The `end` slot takes any `ReactNode` — Toggle, Select, Badge, Spinner, ProgressBar, plain text, an icon. Nothing in the API constrains it to the three documented shapes.
- [`packages/chromium-ui-react/src/components/List/List.tsx`](packages/chromium-ui-react/src/components/List/List.tsx) — `ListItem` has the same shape (`primary`, `secondary`, `icon`, `avatar`, `end`).
- The library already ships `Spinner`, `Progress` (or its equivalent — verify name on implementation), `Badge`, plain text, `Link`, `Button variant="text"`, `IconButton` — every part the operator named is already a real component.

Operator's specifically-named additions:

1. **Text-only / informational row.** A row that just shows `primary` (and possibly `secondary`) — no toggle, no inline control, no chevron. Uses: showing the current value of something the user cannot change ("Connected to: Wi-Fi · 192.168.1.42"), a static fact in a settings panel, a header-row inside a card.
2. **Progress row.** A row whose `end` (or whose body) hosts a `Spinner` (circular) or a horizontal progress bar. Uses: showing background work in progress ("Syncing… [spinner]" / "Indexing 47/120 files [bar]"), the "Current phase" status in the operator's scraper prototype.
3. **Primary + secondary + Badge row.** A row with two lines of text on the left and a `Badge` (per the post-#0013 outline-only Badge) in the `end` slot. Uses: the results-preview rows in the scraper prototype, "this item with this status" lists in general.

Likely additional shapes that should also be catalogued in the same pass (not on the operator's explicit list, but in the same family — implementer judgement):

- **Read-only value row** (primary on the left, value as plain text on the right) — settings-style "Version: 1.4.2".
- **Avatar / icon-leading row** (already supported via `avatar` and `icon` slots) — bookmarks, history items.
- **Action row** (primary on the left, `Button variant="text"` in `end`) — "Reset password", "Disconnect account".

## What hurts and why

Three problems with the current "three canonical rows" framing:

1. **It pretends to be an enumeration when it is actually a sample.** The library's primitives accept anything in `end`; the styleguide cherry-picked three popular shapes and called them "canonical". Agents read the heading literally and either force-fit their content into one of the three or assume their use case is unsupported.
2. **It hides existing primitives.** `Spinner`, `Progress`, `Badge`, plain `<Link>`, `Button variant="text"` all live in the library and all compose into rows naturally. The styleguide does not show this. So when the operator's prototype needed a "Current phase: Complete" row, the agent did not have a precedent to reach for and improvised — possibly suboptimally.
3. **It misses the rows the target use case actually needs.** Scrapers / parsers / log viewers / status panels — the surfaces this library targets — are dominated by informational rows, progress rows, and labelled-status rows. The three documented shapes (toggle / drill-in / inline-control) are settings-page rows. The styleguide is over-indexed on settings and under-indexes on the actual extension shape.

The deeper meta-problem is the same shape as ticket #0008 (side-panel composition was modelled on Reading List, the wrong reference): when the styleguide picks one Chrome surface (here, settings) as the implicit reference for a primitive's shape, every other surface that needs a different shape ends up improvised.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Expand the "canonical rows" section.** Rename the section from "The three canonical rows" to "Common row shapes" (or similar). Keep the existing three as the first three entries; add at least the three the operator named (text-only, progress, primary+secondary+badge) plus any others identified in the implementation pass. Each entry has the same structure as the current ones: name, when to use, live preview. Add a closing sentence framing the list as a sample, not an enumeration: "Anything composable from `primary` / `secondary` / `icon` / `end` / `avatar` is fine — these are starting points, not a closed set". Pros: smallest, most direct fix; matches what the operator asked for. Cons: longer page.

2. **Same as direction 1, plus a short visual gallery.** In addition to expanding the prose, add a single live preview at the top of the section that shows 6–8 row shapes stacked inside one card, side-by-side, so the reader can see the variety at a glance before reading any individual entry. Pros: agents pattern-match on visual examples faster than on prose; makes the "rows are flexible" point unmissable. Cons: more docs to maintain; the gallery has to stay in sync with the individual entries.

3. **Same as direction 2, plus extract row-shape examples into a separate page** (`docs/docs/styleguide/row-shapes.md`) linked from `sections-and-rows.md`. Pros: keeps `sections-and-rows.md` focused on the bigger composition rules; gives row shapes their own discoverable home. Cons: heavier; another page to navigate; might be over-engineering for what is a one-paragraph-and-a-gallery problem.

Working hypothesis (subject to revision when the work starts): direction 2. The expansion in direction 1 is necessary either way; the gallery in direction 2 is cheap and high-leverage. Direction 3 is reserved for the case where the row-shape catalogue grows past ~10 entries and `sections-and-rows.md` becomes unwieldy.

## Acceptance hints

- `docs/docs/styleguide/sections-and-rows.md` no longer frames the row catalogue as "the three canonical rows". The list is renamed (e.g. "Common row shapes") and explicitly framed as open-ended.
- At minimum, three new entries are added: text-only / informational row, progress row (showing both Spinner-in-end and ProgressBar variants), primary+secondary+badge row.
- Implementer also reviews and adds any further shapes that are obviously useful (read-only value row, avatar-leading row, action-with-text-button row) without getting carried away — three to six new entries total is the right ceiling.
- Each new entry includes a live preview matching the visual style of the existing three (toggle / drill-in / inline-control).
- (Direction 2) A single live preview at the top stacks several row shapes inside one Card to show variety at a glance.
- A closing sentence makes explicit that the catalogue is a sample — any composition of the existing slots (`primary`, `secondary`, `icon`, `end`, `avatar`) is allowed.
- The page passes `npm run build:docs`; live previews render correctly in light and dark mode.
- The "Common failure modes" / "Avoid" section at the bottom of the page is reviewed against the new shapes; in particular, `Stretching inline controls to fill` (line 243) and `Putting a helper link inside the primary text` (line 244) still apply to the new shapes and should not need rewriting.
- Release: docs-only ticket. Patch bump unless co-shipped with a minor.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0001 (toggle row interactivity — once a row is interactive in any of the new shapes, the row-level click + hover affordance from #0001 should apply uniformly).
- Related: ticket #0008 (side-panel card-per-section) — the new rows live inside the new section cards.
- Related: ticket #0013 (Badge neutral default) — the primary+secondary+badge row should use the post-#0013 Badge defaults.
- Related ADRs: _none yet_
- Reference Chromium surfaces showing varied row shapes: `chrome://settings/` (status-style rows like "Default browser: Yes"), `chrome://downloads/` (avatar-leading rows), `chrome://components/` (informational rows with version strings on the right).
- Library primitives already supporting these shapes: `packages/chromium-ui-react/src/components/PanelStack/PanelRow.tsx`, `packages/chromium-ui-react/src/components/List/List.tsx`, plus `Spinner`, `Progress`, `Badge`, `Link`, `Button variant="text"`.
- Docs in scope: `docs/docs/styleguide/sections-and-rows.md` (primary).
