---
title: "Ticket 0016 — Add a Table component (dense default, sticky-header option, automatic horizontal scroll)"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0016 — Add a Table component (dense default, sticky-header option, automatic horizontal scroll)

## Status

**open**

## Summary

The library has no `Table` primitive today, and zero live previews under `docs/docs/` use a `<table>` element. Scrapers, parsers, log viewers, and inspect-style tools — a large part of what extension UIs do — need a tabular display, and the absence of a primitive forces the agent to either invent one with `<div>` rows (no semantics, no scroll, no sticky header) or skip the table view entirely. Add a `Table` component that ships two density variants (dense default for narrow surfaces, regular for full-tab options pages), automatic horizontal overflow for narrow containers, and an opt-in sticky-header mode for vertical scrolling. **Not** a data-table — no sorting, no pagination, no filtering, no virtualisation in this scope. Just rendering tabular data in a Chromium-faithful way.

## Context

Library state:

- No `Table*` component anywhere under `packages/chromium-ui-react/src/components/`.
- No `<table>` or `<Table>` references anywhere under `docs/docs/` (verified with grep).
- The styleguide does not currently document a tabular pattern or include a table-related anti-pattern.

Existing component conventions to mirror (so Table feels native to the library):

- Compound APIs are the established pattern: `PanelStack` + `PanelView` + `PanelHeader` + `PanelRow`; `Card` + `CardHeader` + `CardBody` + `CardFooter` + `CardTitle` + `CardDescription`; `Tabs` + `TabList` + `Tab` + `TabPanel`; `List` + `ListItem`. The Table component should follow the same shape.
- `forwardRef` on every primitive; spread the matching HTML element's props; no `clsx` dependency (use the in-tree `cn`); `cr-*` class names (`cr-table`, `cr-table__row`, `cr-table__cell`, `cr-table--dense`, etc.) — see [`CLAUDE.md`](CLAUDE.md) "Component pattern".
- Variant / size props only emit a class when the value differs from the default, to keep markup clean.
- Three files per primitive in its own folder: `Table.tsx`, `Table.css`, `index.ts`. Multi-part components keep all parts in the same folder with separate `.tsx` / `.css` pairs. (See `PanelStack/` for the canonical shape.)

Native Chromium reference for tabular UI:

- `chrome://settings/content/cookies/...` — table of cookies per origin, dense rows, sticky header inside a scrolling viewport.
- `chrome://extensions/shortcuts` — a wide-form table of keyboard shortcuts per extension.
- `chrome://components` — a small dense table of installed components with versions.
- `chrome://device-log/` — long log table with horizontal columns and vertical scroll, sticky header.

Common shape across these: regular `<table>` HTML semantics; tight padding (`8px 12px` or so); 13px regular text; thin hairlines between rows (`--cr-fallback-color-surface-variant`); column headers in the same weight as body rows but slightly lighter colour; sticky `<thead>` when the container scrolls; horizontal scroll appears when the columns exceed the container width.

Use cases the operator named:

- Scrapers / parsers — collected rows from a page (place name, type, rating, address, phone, …) that need to be reviewable as a table before export.
- Log viewers — request logs, console events, network activity per tab.
- Inspector-style panels — DOM nodes / computed styles / cookies / storage entries.

Ticket #0010 (Material Symbols) intersects: tables often want sort indicators, expand chevrons, status icons inline. The Table component should not ship icons but should leave room for the icon-vocabulary work to land.

## What hurts and why

Three problems:

1. **The agent has no good answer for "show me this as a table".** Without a primitive, the agent either stitches together a faux-table from `<div>` rows (loses `<th>` semantics, loses screen-reader announcement, loses copy-paste-as-tab-separated, loses vertical alignment between header and body) or reaches for an external table library (introduces a dependency the library is otherwise avoiding). Both paths produce non-Chromium output.
2. **Side-panel surfaces specifically need horizontal scroll.** A 360px-wide side panel cannot show six columns at full width. Without an explicit scroll container, the agent's faux-table either truncates content, wraps unreadably, or breaks the layout. The native shape — a single table inside an `overflow-x: auto` wrapper — is unobvious to assemble correctly.
3. **Density is the rule, not the exception, on narrow surfaces.** Default Material table density (16–24px vertical padding, 14–16px text) eats vertical real estate that a side panel does not have. Chromium's own settings tables are tight by comparison. Shipping a regular-density default and asking authors to opt into dense leaves the side-panel case under-served.

The deeper meta-problem: this is the first ticket in the initiative that adds a primitive rather than removing or tightening one. The same "make the right shape the default shape" principle applies — a side-panel-shaped Table needs to be the default, not an opt-in.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Compound API with two density variants and opt-in sticky header / horizontal scroll wrapper.** Shape:

   ```tsx
   <Table density="dense" stickyHeader>
     <Table.Head>
       <Table.Row>
         <Table.HeaderCell>Name</Table.HeaderCell>
         <Table.HeaderCell>Type</Table.HeaderCell>
         <Table.HeaderCell align="end">Rating</Table.HeaderCell>
       </Table.Row>
     </Table.Head>
     <Table.Body>
       <Table.Row>
         <Table.Cell>The Coffee Workshop</Table.Cell>
         <Table.Cell>Coffee shop</Table.Cell>
         <Table.Cell align="end">4.7</Table.Cell>
       </Table.Row>
       …
     </Table.Body>
   </Table>
   ```

   `density: 'dense' | 'regular'` (default `'dense'`); `stickyHeader: boolean` (default `false`, opt-in because it requires the container to have a fixed height); horizontal overflow handled by an outer wrapper `<div class="cr-table-scroll">` that the component renders automatically with `overflow-x: auto`. Cells get an `align?: 'start' | 'center' | 'end'` prop. `Table.Row` accepts `interactive` for hover + click. Pros: matches every other compound API in the library; explicit semantics; full HTML `<table>` underneath for accessibility.

2. **Declarative API with `columns` and `data` arrays.** Shape:

   ```tsx
   <Table
     density="dense"
     stickyHeader
     columns={[
       { id: 'name', header: 'Name', align: 'start' },
       { id: 'type', header: 'Type' },
       { id: 'rating', header: 'Rating', align: 'end', render: (row) => row.rating.toFixed(1) },
     ]}
     data={places}
   />
   ```

   Pros: very concise call sites; trivially typed against a row type; easy to add sorting / filtering later if the scope expands. Cons: custom-cell composition is awkward (per-cell JSX has to live inside `render` callbacks); diverges from the rest of the library's compound style; less debuggable in the rendered tree.

3. **Hybrid: ship the compound API, plus a thin `<TableSimple>` declarative helper that lowers to the compound (mirrors `TabsSimple` in `Tabs.tsx`).** Pros: best of both; the compound serves the flexible case, `TableSimple` serves the "I have an array of rows, render them" case. Cons: two APIs to document and maintain.

Working hypothesis (subject to revision when the work starts): direction 1 (compound API) for v1. Direction 3's `TableSimple` is a compelling follow-up if real consumers ask for it; until then the compound is enough and adding `TableSimple` later is non-breaking.

Open API decisions to settle in the work turn:

- **Density default.** Operator's view: `'dense'`. Confirmed in this ticket — dense is the default; `density="regular"` is the opt-in for full-tab options pages.
- **Sticky header trigger.** Two possible UX models: (a) `stickyHeader` boolean, requires the consumer to put `<Table>` inside a scroll container; (b) `maxHeight` prop on `<Table>` that creates the scroll container internally. (a) is more flexible, (b) is more foolproof. Lean (a) — matches how the rest of the library defers layout to the consumer.
- **Horizontal scroll trigger.** Two options: (a) always wrap `<Table>` in an `overflow-x: auto` container, free for everyone; (b) opt-in via `scrollX` prop. Lean (a) — narrow surfaces always benefit, wide surfaces lose nothing.
- **Row interactivity.** `Table.Row interactive` mirroring `ListItem interactive` and `PanelRow interactive`. Should overlap structurally with ticket #0001 (toggle row) so the row-clickable affordance has one consistent shape across primitives.
- **Hover / zebra striping.** Hover yes (matches `--cr-hover-background-color`); zebra striping no (not a Chromium pattern).

## Acceptance hints

- A new component lives at `packages/chromium-ui-react/src/components/Table/` with at least: `Table.tsx`, `Table.css`, `index.ts`. The structure follows the `PanelStack/` multi-part convention (separate `.tsx`/`.css` pairs per part if the work turn lands on that).
- The component renders semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` underneath the React API. Screen readers announce it as a table.
- `density` prop with default `'dense'`. Dense uses `--cr-font-size-sm` (12px) text and tight cell padding; regular uses `--cr-font-size-md` (13px) and the larger cell padding. Padding tokens may be added to `tokens.css` (`--cr-table-cell-padding-dense`, `--cr-table-cell-padding-regular`) if appropriate.
- Horizontal scroll appears automatically when columns exceed the container width — no opt-in needed for the common case.
- `stickyHeader` boolean opt-in. When enabled with a fixed-height container, the `<thead>` stays pinned via `position: sticky; top: 0` while the body scrolls.
- Cell `align?: 'start' | 'center' | 'end'` prop on both `Table.Cell` and `Table.HeaderCell`. Numeric columns probably want `'end'`.
- Hover state on rows uses `--cr-hover-background-color`. No zebra striping. No row dividers heavier than `--cr-fallback-color-surface-variant`.
- Tab order, focus ring, and `interactive` row behaviour mirror `ListItem` / `PanelRow` so a future Toggle-in-row (ticket #0001) lands consistently.
- Component re-exported from `packages/chromium-ui-react/src/index.ts`.
- A docs page at `docs/docs/components/table.md` registered in `docs/sidebars.ts`, following the template established by `button.md`. Live previews demonstrate: dense default; regular variant; sticky header inside a fixed-height container; horizontal scroll inside a narrow container; numeric column with `align="end"`.
- A short pattern entry (or a section in `patterns/side-panel.md` / `patterns/extension-popup.md`) showing a Table inside a side panel — the canonical scraper-results shape that motivated the ticket.
- `npm run build:lib && npm run build:docs` stays green; `npm pack --dry-run` confirms the new files are bundled into `dist/`.
- Release: minor version bump (new public component).

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Related tickets: #0001 (toggle row interactivity — Table.Row interactive should land with a consistent affordance shape); #0010 (Material Symbols — table cells will commonly hold icons).
- Related ADRs: _none yet_; this might warrant an ADR ("Table API: compound vs. declarative") because the choice will outlive the ticket.
- Reference Chromium surfaces: `chrome://settings/content/cookies`, `chrome://extensions/shortcuts`, `chrome://components`, `chrome://device-log/`.
- Reference compound APIs in this library to mirror: `packages/chromium-ui-react/src/components/PanelStack/` (most directly), `Tabs/`, `Card/`, `List/`.
- Library files to add: `packages/chromium-ui-react/src/components/Table/Table.tsx`, `Table.css`, `index.ts`; updates to `packages/chromium-ui-react/src/index.ts`; possibly tokens in `packages/chromium-ui-react/src/styles/tokens.css`.
- Docs to add: `docs/docs/components/table.md`; sidebar entry in `docs/sidebars.ts`; possibly a section in `docs/docs/styleguide/patterns/side-panel.md` showing the scraper-results shape.
