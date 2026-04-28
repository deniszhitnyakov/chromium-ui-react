---
id: styleguide-pattern-side-panel
title: Pattern — Side panel
slug: /styleguide/patterns/side-panel
description: A full side-panel layout mirroring Chromium's reading list / bookmarks side panel, with drill-in navigation.
format: mdx
---

# Pattern — Side panel

Chromium's side panel (reading list, bookmarks, search, journeys) shares a precise shape: ~360px wide, a 48px header (shorter than the main toolbar), a single content column, drill-in sub-pages. This pattern reproduces that shape.

## The finished panel

```tsx live
<div style={{
  width: 380,
  height: 600,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <PanelStack defaultView="main" style={{ flex: 1, minHeight: 0 }}>
    <PanelView id="main">
      <PanelHeader title="Reading list" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: 'var(--cr-space-2) var(--cr-space-4)' }}>
          <SearchInput placeholder="Search reading list" />
        </div>
        <div style={{
          fontSize: 14,
          fontWeight: 400,
          color: 'var(--cr-fallback-color-on-surface)',
          padding: '16px 16px 8px',
        }}>
          Unread
        </div>
        <List>
          <ListItem
            primary="The Elements of Typographic Style"
            secondary="practicaltypography.com · 12 min read"
            interactive
            end={<IconButton aria-label="Mark as read" icon={<span style={{ fontSize: 12 }}>✓</span>} />}
          />
          <Divider subtle />
          <ListItem
            primary="Settling the 3xx redirect debate once and for all"
            secondary="jakearchibald.com · 8 min read"
            interactive
            end={<IconButton aria-label="Mark as read" icon={<span style={{ fontSize: 12 }}>✓</span>} />}
          />
          <Divider subtle />
          <ListItem
            primary="Why The Sudden Rise of TypeScript?"
            secondary="bytecodealliance.org · 15 min read"
            interactive
            end={<IconButton aria-label="Mark as read" icon={<span style={{ fontSize: 12 }}>✓</span>} />}
          />
        </List>
        <div style={{
          fontSize: 14,
          fontWeight: 400,
          color: 'var(--cr-fallback-color-on-surface)',
          padding: '16px 16px 8px',
        }}>
          Pages you've read
        </div>
        <List>
          <ListItem
            primary="Things You Should Never Do, Part I"
            secondary="joelonsoftware.com · 6 min read"
            interactive
            end={<IconButton aria-label="Delete" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
          />
          <Divider subtle />
          <ListItem
            primary="A Case Study on Fixing a Memory Leak"
            secondary="v8.dev · 10 min read"
            interactive
            end={<IconButton aria-label="Delete" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
          />
        </List>
      </div>
    </PanelView>
  </PanelStack>
</div>
```

## What to copy from this

- **Width.** 360–400px fixed. Chromium's side panel is user-resizable; your code does not need to be.
- **Header height.** **48px**, not 56px. Chromium uses `--cr-sidepanel-header-height: 48px` — the side panel header is one notch shorter than the main toolbar.
- **Header title.** 14px weight-500, `padding-left: 16px`. Nothing else in the header — no gear, no "+", no `⋮`. Row-level actions live on the rows; a single "Add current tab" control (if needed) is an `EmptyState` / footer `Button`, not a header icon. See [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
- **Search in the panel.** Placed immediately below the header, in a small horizontal gutter. `--cr-space-2` (8px) vertical, `--cr-space-4` (16px) horizontal.
- **Group labels.** 14px regular-weight, sentence case, on-surface colour. Same shape as a settings-page `<h2>`. Padding `8px 16px 4px`. Side panels are *not* an exception to the no-ALL-CAPS rule — see [Anti-pattern #21](../anti-patterns.md#21-all-caps-section-labels).
- **Rows.** Standard `ListItem` with primary + secondary + trailing `IconButton`. 48px or 64px min-height depending on sublabel presence. Per-row `IconButton`s are fine — they sit *inside* rows, not in the header.
- **No card.** Side panels do not wrap their lists in cards — the panel itself is the card.

## Subpage navigation

For a bookmarks side panel (folders → children), wire in `PanelStack` drill-in:

```tsx live
<div style={{
  width: 380,
  height: 520,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
}}>
  <PanelStack defaultView="all">
    <PanelView id="all">
      <PanelHeader title="Bookmarks" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <PanelRow
          icon={<span>📁</span>}
          primary="Bookmarks bar"
          secondary="12 items"
          navigateTo="bar"
        />
        <PanelRow
          icon={<span>📁</span>}
          primary="Other bookmarks"
          secondary="47 items"
          navigateTo="other"
        />
        <PanelRow
          icon={<span>📁</span>}
          primary="Mobile bookmarks"
          secondary="3 items"
          navigateTo="mobile"
        />
      </div>
    </PanelView>
    <PanelView id="bar">
      <PanelHeader title="Bookmarks bar" back />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <List>
          <ListItem icon={<span style={{ fontSize: 14 }}>🌐</span>} primary="Chromium UI React" secondary="ztnkv.github.io" interactive />
          <Divider subtle />
          <ListItem icon={<span style={{ fontSize: 14 }}>🌐</span>} primary="Docusaurus" secondary="docusaurus.io" interactive />
          <Divider subtle />
          <ListItem icon={<span style={{ fontSize: 14 }}>🌐</span>} primary="React" secondary="react.dev" interactive />
        </List>
      </div>
      <div style={{ padding: 'var(--cr-space-4)', borderTop: '1px solid var(--cr-divider-color)', display: 'flex', justifyContent: 'center' }}>
        <Button variant="action">Add bookmark</Button>
      </div>
    </PanelView>
    <PanelView id="other"><PanelHeader title="Other bookmarks" back /></PanelView>
    <PanelView id="mobile"><PanelHeader title="Mobile bookmarks" back /></PanelView>
  </PanelStack>
</div>
```

Notes:

- `<PanelHeader>` replaces the hand-rolled 48px header when you use `PanelStack` — it is 48px tall and has the back arrow built in.
- The header is title-only. Context-specific actions ("Add bookmark" on a folder view) belong in the content area — a centered footer `Button` for the view's single primary action (see [Pattern — Primary action button](./primary-action.md)), or per-row `IconButton`s for row operations. Do not hang icon buttons off the `PanelHeader` — see [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
- Icons on rows are acceptable in a side-panel context (favicon, folder icon). They are 16px, leading.

## The panel's primary action

If the side panel (or any of its subviews) has a single clear CTA — *Start*, *Capture*, *Export*, *Scan*, *Add bookmark*, the verb the user came to press — it belongs in a **pinned footer, horizontally centered, content-sized**, and it is the **only** `variant="action"` visible. This is a deliberate departure from Chromium's `[Cancel] [Primary]` right-aligned footer; it exists to shorten the time a new user spends finding the thing to press. See [Pattern — Primary action button](./primary-action.md) for the full reasoning, scope, and variants (running-state replacement, no-primary case).

Side panels without a single primary (pure viewers, status-only panels) omit the footer entirely.

## Spacing differences from full-page

Side panels use tighter padding than full settings pages. Authoritative tokens from `sp_shared_vars.css`:

| Token | Value | What it controls |
|---|---|---|
| `--sp-body-padding` | 8px | Outer padding |
| `--sp-card-inline-padding` | 16px | Row horizontal padding |
| `--sp-card-block-padding` | 8px | Row vertical padding |
| `--sp-card-gap` | 12px | Gap between groups |
| `--cr-sidepanel-header-height` | 48px | Header height (**not 56**) |

If you reuse the settings-page spacing (24px gaps, 20px padding) in a side panel, it looks too loose. Tighten one notch everywhere.

## Common side-panel mistakes

- **Wrapping the list in a `Card`.** The panel itself is the card. Do not nest.
- **Using `Toolbar` at 56px height.** Use the 48px custom header or `<PanelHeader>`.
- **`IconButton`s in the header next to the title.** The 48px header is title-only. Row actions live on rows; the view's single primary action lives in a centered footer (see [Pattern — Primary action button](./primary-action.md)). See [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
- **Right-aligned or `size="sm"` primary action at the bottom.** The panel's single primary CTA is pinned at the bottom, centered, and full-size — see [Pattern — Primary action button](./primary-action.md) and [Anti-patterns #17](../anti-patterns.md#17-primary-action-buried-on-a-side-panel).
- **Two-pane inside the side panel.** A side panel is already narrow — drill in, don't split.
- **Tabs at the top.** Use `PanelStack` for sub-views, or 14px sentence-case group headings for in-place grouping.
- **Large icons on rows.** 16px favicons or 16px leading icons. Nothing larger.

## Mapping to Chromium source

| Element | Source reference |
|---|---|
| Panel shell | `chrome/browser/resources/side_panel/reading_list/reading_list_app.css` |
| Tokens | `chrome/browser/resources/side_panel/shared/sp_shared_vars.css` |
| Header | delegates to `cr-toolbar` with `--cr-sidepanel-header-height: 48px` |
| Row | `reading_list_item.css` (not fetched in research; structure inferred from conventions) |
