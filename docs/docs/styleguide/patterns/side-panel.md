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
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 'var(--cr-space-5)' }}>
        <section>
          <h2 style={{
            fontSize: 14, fontWeight: 400,
            color: 'var(--cr-fallback-color-on-surface)',
            margin: '0 0 8px 4px', padding: '4px 0',
          }}>Unread</h2>
          <Card elevation={1} padding="none">
            <List>
              <ListItem
                primary="The Elements of Typographic Style"
                secondary="practicaltypography.com · 12 min read"
                interactive
                end={<IconButton aria-label="Mark as read" icon={<CheckIcon size={14} />} />}
              />
              <Divider subtle />
              <ListItem
                primary="Settling the 3xx redirect debate once and for all"
                secondary="jakearchibald.com · 8 min read"
                interactive
                end={<IconButton aria-label="Mark as read" icon={<CheckIcon size={14} />} />}
              />
              <Divider subtle />
              <ListItem
                primary="Why The Sudden Rise of TypeScript?"
                secondary="bytecodealliance.org · 15 min read"
                interactive
                end={<IconButton aria-label="Mark as read" icon={<CheckIcon size={14} />} />}
              />
            </List>
          </Card>
        </section>
        <section>
          <h2 style={{
            fontSize: 14, fontWeight: 400,
            color: 'var(--cr-fallback-color-on-surface)',
            margin: '0 0 8px 4px', padding: '4px 0',
          }}>Pages you've read</h2>
          <Card elevation={1} padding="none">
            <List>
              <ListItem
                primary="Things You Should Never Do, Part I"
                secondary="joelonsoftware.com · 6 min read"
                interactive
                end={<IconButton aria-label="Delete" icon={<CloseIcon size={14} />} />}
              />
              <Divider subtle />
              <ListItem
                primary="A Case Study on Fixing a Memory Leak"
                secondary="v8.dev · 10 min read"
                interactive
                end={<IconButton aria-label="Delete" icon={<CloseIcon size={14} />} />}
              />
            </List>
          </Card>
        </section>
      </div>
    </PanelView>
  </PanelStack>
</div>
```

## What to copy from this

- **Width.** 360–400px fixed. Chromium's side panel is user-resizable; your code does not need to be.
- **Header height.** **48px**, not 56px. Chromium uses `--cr-sidepanel-header-height: 48px` — the side panel header is one notch shorter than the main toolbar.
- **Header title.** 14px weight-500, `padding-left: 16px`. Nothing else in the header — no gear, no "+", no `⋮`. Row-level actions live on the rows; a single "Add current tab" control (if needed) is an `EmptyState` / footer `Button`, not a header icon. See [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
- **Group labels.** 14px regular-weight, sentence case, on-surface colour. Same shape as a settings-page `<h2>`. Padding `8px 16px 4px`. Side panels are *not* an exception to the no-ALL-CAPS rule — see [Anti-pattern #21](../anti-patterns.md#21-all-caps-section-labels).
- **Rows.** Standard `ListItem` with primary + secondary + trailing `IconButton`. 48px or 64px min-height depending on sublabel presence. Per-row `IconButton`s are fine — they sit *inside* rows, not in the header.
- **Card per section.** Each section is its own elevated card with the heading above it — same composition as `chrome://settings`. The panel surface holds the cards; cards hold the rows. Sections sit `--cr-space-5` (20px) apart vertically. (Earlier versions of this pattern said "no card, the panel is the card" — that was modelled on Chrome's built-in Reading List, which is a single homogeneous list. Heterogeneous extension panels want the settings shape.)
- **Search is optional, not default.** Most extension side panels do not need search. If yours does (Bookmarks-shaped, History-shaped — long scrollable lists), drop a `<SearchInput />` in a `--cr-space-2` / `--cr-space-4` (8/16px) gutter directly under the header. The Reading-list example above does *not* show search; that omission is deliberate.

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
          icon={<FolderIcon />}
          primary="Bookmarks bar"
          secondary="12 items"
          navigateTo="bar"
        />
        <PanelRow
          icon={<FolderIcon />}
          primary="Other bookmarks"
          secondary="47 items"
          navigateTo="other"
        />
        <PanelRow
          icon={<FolderIcon />}
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
          <ListItem icon={<GlobeIcon size={14} />} primary="Chromium UI React" secondary="ztnkv.github.io" interactive />
          <Divider subtle />
          <ListItem icon={<GlobeIcon size={14} />} primary="Docusaurus" secondary="docusaurus.io" interactive />
          <Divider subtle />
          <ListItem icon={<GlobeIcon size={14} />} primary="React" secondary="react.dev" interactive />
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
- **Section cards use `elevation={1}`, not the default `2`.** A 360px-wide column makes the standard elevation-2 shadow read as too heavy under each card. The `<Card elevation={1}>` opt-in (subtle `--cr-elevation-1` shadow) keeps the cards visibly grouped without "puffing them up" off the panel surface. The settings-page pattern keeps elevation-2 — the wider card column absorbs the heavier shadow.

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

- **One bare list on a flat panel surface.** Heterogeneous extension panels want the settings composition: each section is its own elevated card, with a sentence-case `<h2>` heading above it. The "no card" rule from earlier versions of this pattern was modelled on Chrome's single-list Reading List and does not generalise.
- **Top-of-surface `<Header>` inside the panel.** Forbidden — Chrome paints a system header (icon + extension name) above the iframe, so an in-panel `Header` duplicates it. See [Anti-patterns #25](../anti-patterns.md#25-in-panel-header-in-a-side-panel-extension). Drill-in subview headers via `<PanelHeader>` inside `<PanelStack>` are still allowed because they sit below the surface root.
- **`IconButton`s in the `PanelHeader` next to the title.** The drill-in header is title-only. Row actions live on rows; the view's single primary action lives in a centered footer (see [Pattern — Primary action button](./primary-action.md)). See [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
- **Right-aligned or `size="sm"` primary action at the bottom.** The panel's single primary CTA is pinned at the bottom, centered, and full-size — see [Pattern — Primary action button](./primary-action.md) and [Anti-patterns #17](../anti-patterns.md#17-primary-action-buried-on-a-side-panel).
- **Two-pane inside the side panel.** A side panel is already narrow — drill in, don't split.
- **Tabs at the top.** Use `PanelStack` for sub-views, or 14px sentence-case group headings for in-place grouping.
- **Large icons on rows.** 16px favicons or 16px leading icons. Nothing larger.

## Mapping to Chromium source

| Element | Source reference |
|---|---|
| Panel shell | `chrome/browser/resources/side_panel/reading_list/reading_list_app.css` |
| Tokens | `chrome/browser/resources/side_panel/shared/sp_shared_vars.css` |
| Header | delegates to `cr-header` with `--cr-sidepanel-header-height: 48px` |
| Row | `reading_list_item.css` (not fetched in research; structure inferred from conventions) |
