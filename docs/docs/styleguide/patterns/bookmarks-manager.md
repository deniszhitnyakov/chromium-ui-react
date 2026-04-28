---
id: styleguide-pattern-bookmarks-manager
title: Pattern — Bookmarks / item manager
slug: /styleguide/patterns/bookmarks-manager
description: Two-pane manager with a tree on the left and a row list on the right — the pattern chrome://bookmarks uses and most "manager" UIs should follow.
format: mdx
---

# Pattern — Bookmarks / item manager

`chrome://bookmarks`, `chrome://history`, and similar manager surfaces share a shape: a `<Header>` at the top with a search field, a left pane containing a tree or filter list, a resizable splitter, and a main pane with a wide row-list.

Use this pattern whenever you have:

- A collection of structured items (bookmarks, tabs, notes, saved clips).
- A hierarchy or a set of filters (folders, tags, dates).
- A bulk-management need (select, move, delete).

## The finished manager

```tsx live
<div style={{
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  height: 560,
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header
    title="Bookmarks"
    actions={<IconButton aria-label="More" icon={<MoreVertIcon />} />}
  >
    <SearchInput placeholder="Search bookmarks" style={{ flex: 1, maxWidth: 400 }} />
  </Header>
  <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
    <nav style={{
      width: 240,
      borderRight: '1px solid var(--cr-fallback-color-outline)',
      padding: '8px 0',
      overflowY: 'auto',
    }}>
      <Menu role="tree">
        <MenuItem icon={<FolderIcon />} selected>Bookmarks bar</MenuItem>
        <MenuItem icon={<FolderIcon />}>Work</MenuItem>
        <MenuItem icon={<FolderIcon />}>Recipes</MenuItem>
        <MenuItem icon={<FolderIcon />}>Reading</MenuItem>
        <MenuDivider />
        <MenuItem icon={<FolderIcon />}>Other bookmarks</MenuItem>
        <MenuItem icon={<FolderIcon />}>Mobile bookmarks</MenuItem>
      </Menu>
    </nav>
    <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      <Card variant="elevated" style={{ margin: '0 auto', maxWidth: 960 }}>
        <List>
          <ListItem
            icon={<GlobeIcon size={14} />}
            primary="Chromium UI React"
            secondary="ztnkv.github.io/chromium-ui-react"
            interactive
            end={<IconButton aria-label="More" icon={<MoreVertIcon />} />}
          />
          <Divider subtle />
          <ListItem
            icon={<GlobeIcon size={14} />}
            primary="Docusaurus — Build optimized websites quickly"
            secondary="docusaurus.io"
            interactive
            selected
            end={<IconButton aria-label="More" icon={<MoreVertIcon />} />}
          />
          <Divider subtle />
          <ListItem
            icon={<GlobeIcon size={14} />}
            primary="React"
            secondary="react.dev"
            interactive
            end={<IconButton aria-label="More" icon={<MoreVertIcon />} />}
          />
          <Divider subtle />
          <ListItem
            icon={<GlobeIcon size={14} />}
            primary="Chromium Design — Fundamentals"
            secondary="chromium.org/Home/user-experience"
            interactive
            end={<IconButton aria-label="More" icon={<MoreVertIcon />} />}
          />
          <Divider subtle />
          <ListItem
            icon={<GlobeIcon size={14} />}
            primary="HTML Living Standard"
            secondary="html.spec.whatwg.org"
            interactive
            end={<IconButton aria-label="More" icon={<MoreVertIcon />} />}
          />
        </List>
      </Card>
    </main>
  </div>
</div>
```

## What to copy from this

- **Header.** 56px, title on the left, `SearchInput` in the middle (`maxWidth: 400`), a single `⋮` overflow `IconButton` at the far right. **The `SearchInput` sits between the title and the icon** — the icon never butts up against the title. "Add bookmark" and other one-off actions live inside that overflow `Menu`, not as their own toolbar icons. See [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
- **Tree pane.** 240px wide, 1px right border separating from main. No shadow, no background tint. `Menu role="tree"` is the right semantic.
- **Main pane.** Scrollable, 24px padding, content column max-width 960px centered. This is wider than the settings page's 680px — because manager rows need horizontal room for URL + metadata.
- **Row structure.** 16px favicon, 40–48px row height, primary is the title, secondary is the URL (short domain for the un-selected state, full URL when selected in Chromium). `IconButton` on the right for per-row actions.
- **Selected row.** The `selected` prop on `ListItem` highlights the row with a subtle fill. Supports keyboard navigation.

## Row structure in detail

From `chrome/browser/resources/bookmarks/item.css`, a bookmark row is:

```
┌──────────────────────────────────────────────────┐
│  [favicon 16px]  Title                    [⋮]    │
│                  domain.com                       │
└──────────────────────────────────────────────────┘
```

- Row height: **40px** (`#content` in item.css). Two-line feel comes from overflow/truncation, not min-height — the URL is often hidden until the row is selected.
- Favicon margin: 20px on the start, 20px between favicon and title.
- Title: `--cr-primary-text-color`, no special weight.
- Domain: hidden by default (`display: none`), shown on `[is-selected-item_]`. Color `rgba(0,0,0,.54)` or `--google-grey-800` dark.
- Action button: 12px right margin.

Use `<ListItem secondary>` to always show the URL — the hide-until-selected behavior is a Chromium nicety, not a requirement.

## Empty and zero-result states

When the user searches and nothing matches, or the folder is empty:

```tsx live
<div style={{
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 8,
  background: 'var(--cr-fallback-color-surface)',
  padding: 24,
}}>
  <EmptyState
    title="No bookmarks yet"
    description="Bookmark a page from the address bar or drag a link here."
    action={<Button variant="action">Import bookmarks</Button>}
  />
</div>
```

Keep the empty state text-only (title + description + one action). No illustration is fine — Chromium uses a small greyscale illustration for history/bookmarks empty states, but a plain text empty state is also idiomatic.

## Bulk actions

When items are selected, swap the toolbar into "selection mode":

```tsx live
<Header
  title="3 selected"
  actions={
    <>
      <IconButton aria-label="Delete" icon={<TrashIcon />} />
      <IconButton aria-label="Move" icon={<FolderIcon />} />
      <IconButton aria-label="More" icon={<MoreVertIcon />} />
    </>
  }
  style={{ border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}
>
  <IconButton aria-label="Close" icon={<CloseIcon />} />
</Header>
```

- Title becomes the selection count.
- Close button (`✕`) on the left exits selection mode.
- Actions are the bulk operations.

This is the `chrome://history` selection pattern. Selection mode is the *only* case where multiple `IconButton`s in the toolbar `actions` slot are correct — the toolbar has swapped modes, the title is no longer the page title, and the actions are the verbs of the current selection. In a persistent (non-selection) toolbar, see [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header). Do not add a second strip below the toolbar — replace, don't stack.

## Sorting and filtering

The Chromium bookmarks manager supports sort order via a `Menu` inside the "more" action. Keep it subtle:

- One `IconButton` with an overflow menu — not three buttons in the toolbar.
- Menu items check-marked for the current choice (use `selected` on `MenuItem`).

## Common mistakes

- **Tree rendered as a card with shadow.** The tree pane is flat (no card), with a 1px right border.
- **Wide rows with colored backgrounds.** Selection is a subtle fill at `--cr-hover-background-color`-ish intensity — not a full-saturation blue.
- **Multi-column table.** Manager rows are single-row `ListItem`s, not table rows. Density comes from text truncation and smaller icons, not from splitting into columns.
- **Per-row checkboxes on the left.** Selection happens via click (with shift/cmd for multi). A leading checkbox on every row is a spreadsheet pattern, not a Chromium pattern.
- **"Edit" / "Delete" buttons on every row.** One overflow `IconButton aria-label="More"` on each row opens a menu.

## Mapping to Chromium source

| Element | Source reference |
|---|---|
| Shell | `chrome/browser/resources/bookmarks/app.css` |
| List / card | `chrome/browser/resources/bookmarks/list.css` (`--card-max-width: 960px`) |
| Row | `chrome/browser/resources/bookmarks/item.css` |
| Header | `chrome/browser/resources/bookmarks/toolbar.css` |
