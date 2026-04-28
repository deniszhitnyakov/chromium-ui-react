---
id: table
title: Table
slug: /components/table
description: Semantic <table> primitive with a regular Chromium-faithful default, opt-in dense density, opt-in sticky header, and automatic horizontal scroll for narrow surfaces.
format: mdx
---

# Table

A thin, semantic wrapper over `<table>` for tabular data — scraper results, log viewers, inspector-style panels. Density defaults to `'regular'` (13px text, roomy padding) for full-tab and options-page surfaces. Opt into `density="dense"` (12px text, tight padding) for side panels and other narrow surfaces. The component renders an outer `overflow-x: auto` container automatically, so columns wider than the surface scroll horizontally instead of breaking the layout.

This is **not** a data-table — there is no sorting, no pagination, no filtering, no virtualisation. Compose those concerns above the primitive if you need them.

## Live preview

```tsx live
<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Type</TableHeaderCell>
      <TableHeaderCell align="end">Rating</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>The Coffee Workshop</TableCell>
      <TableCell>Coffee shop</TableCell>
      <TableCell align="end">4.7</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Roastery Lane</TableCell>
      <TableCell>Coffee shop</TableCell>
      <TableCell align="end">4.5</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Steam &amp; Beans</TableCell>
      <TableCell>Cafe</TableCell>
      <TableCell align="end">4.2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Import

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from 'chromium-ui-react';
```

## Props

### `Table`

| Prop | Type | Default | Description |
|---|---|---|---|
| `density` | `'regular' \| 'dense'` | `'regular'` | Roomy padding + 13px text vs. tight 12px text for narrow surfaces |
| `stickyHeader` | `boolean` | `false` | Pin `<thead>` while the body scrolls. The container must bound the height. |
| `wrapperClassName` | `string` | — | Class on the outer `overflow-x: auto` wrapper |

All other `<table>` attributes are forwarded. A `ref` is forwarded to the underlying `<table>`.

### `TableRow`

| Prop | Type | Default | Description |
|---|---|---|---|
| `interactive` | `boolean` | inferred from `onClick` | Make the row clickable + focusable (mirrors `ListItem interactive` / `PanelRow interactive`) |
| `selected` | `boolean` | `false` | Highlight the row as the current selection |
| `disabled` | `boolean` | `false` | Disable the interactive row |

### `TableCell` / `TableHeaderCell`

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Horizontal text alignment |

`TableHeaderCell` defaults `scope="col"`. Override for row headers.

## Density

```tsx live
<>
  <p style={{ marginBottom: 8 }}>Regular (default)</p>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Component</TableHeaderCell>
        <TableHeaderCell>Version</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow><TableCell>WidevineCdm</TableCell><TableCell>4.10.2</TableCell></TableRow>
      <TableRow><TableCell>RecoveryImprovedCRX</TableCell><TableCell>2.3.1</TableCell></TableRow>
    </TableBody>
  </Table>
  <p style={{ marginTop: 16, marginBottom: 8 }}>Dense</p>
  <Table density="dense">
    <TableHead>
      <TableRow>
        <TableHeaderCell>Component</TableHeaderCell>
        <TableHeaderCell>Version</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow><TableCell>WidevineCdm</TableCell><TableCell>4.10.2</TableCell></TableRow>
      <TableRow><TableCell>RecoveryImprovedCRX</TableCell><TableCell>2.3.1</TableCell></TableRow>
    </TableBody>
  </Table>
</>
```

`'regular'` is the default — comfortable on full-tab options pages and any surface where vertical room is not scarce. Opt into `'dense'` for narrow surfaces like extension popups and side panels, or for log-style views where row count matters more than per-row breathing room.

## Sticky header

```tsx live
<div style={{ height: 200, overflow: 'auto', border: '1px solid var(--cr-divider-color)', borderRadius: 8 }}>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Time</TableHeaderCell>
        <TableHeaderCell>Method</TableHeaderCell>
        <TableHeaderCell>URL</TableHeaderCell>
        <TableHeaderCell align="end">Status</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: 24 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>{`12:0${i % 6}:${(i * 7) % 60}`.slice(0, 8)}</TableCell>
          <TableCell>{i % 3 === 0 ? 'POST' : 'GET'}</TableCell>
          <TableCell>/api/resource/{i + 1}</TableCell>
          <TableCell align="end">{200 + (i % 2) * 4}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
```

`stickyHeader` requires the outer container to bound the height — without that, there is nothing for the header to be sticky against.

## Horizontal scroll

```tsx live
<div style={{ width: 280, border: '1px solid var(--cr-divider-color)', borderRadius: 8 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Place</TableHeaderCell>
        <TableHeaderCell>Type</TableHeaderCell>
        <TableHeaderCell>Address</TableHeaderCell>
        <TableHeaderCell>Phone</TableHeaderCell>
        <TableHeaderCell align="end">Rating</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>The Coffee Workshop</TableCell>
        <TableCell>Coffee shop</TableCell>
        <TableCell>120 Mission St</TableCell>
        <TableCell>(415) 555-0102</TableCell>
        <TableCell align="end">4.7</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Roastery Lane</TableCell>
        <TableCell>Coffee shop</TableCell>
        <TableCell>248 Howard Ave</TableCell>
        <TableCell>(415) 555-0177</TableCell>
        <TableCell align="end">4.5</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

The outer `overflow-x: auto` wrapper is rendered by `<Table>` itself — wider columns scroll, narrower content sits flush.

## Interactive rows

```tsx live
function InteractiveRows() {
  const [selected, setSelected] = React.useState('roastery');
  const rows = [
    { id: 'workshop', name: 'The Coffee Workshop', type: 'Coffee shop' },
    { id: 'roastery', name: 'Roastery Lane', type: 'Coffee shop' },
    { id: 'steam', name: 'Steam & Beans', type: 'Cafe' },
  ];
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((r) => (
          <TableRow
            key={r.id}
            interactive
            selected={r.id === selected}
            onClick={() => setSelected(r.id)}
          >
            <TableCell>{r.name}</TableCell>
            <TableCell>{r.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

`interactive` adds `role="button"`, `tabIndex={0}`, hover background, focus ring, and Enter/Space keyboard activation. Use it when clicking the row should select an entry, drill into details, or otherwise act on the whole row.

## Accessibility

- Renders semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` — screen readers announce it as a table with rows, columns, and column headers.
- `TableHeaderCell` defaults `scope="col"`. Set `scope="row"` for row headers when the first column labels its row.
- For interactive rows, focus is managed by the row, not the cells — keep cell content non-interactive (no nested buttons that compete for the row's click target).
- Sortable headers, expandable rows, multi-select checkboxes, and other rich interactions are not built into this primitive. Compose them above it using `Button`, `Checkbox`, etc.

## Anti-patterns

- **Faux-tables built from `<div>` rows.** Lose `<th>` semantics, lose copy-paste-as-tab-separated, lose vertical column alignment. Always reach for `<Table>` when the data is genuinely tabular.
- **Zebra striping.** Not a Chromium pattern. Hairline row borders + hover-background are enough.
- **Default density on a side panel.** A 360px-wide side panel cannot afford the regular-density row padding. Opt into `density="dense"` for narrow surfaces; the default is regular density for full-tab and options-page use.
