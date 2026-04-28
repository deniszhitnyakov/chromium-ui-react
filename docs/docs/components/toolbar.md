---
id: toolbar
title: Toolbar
slug: /components/toolbar
description: Top-of-page bar with a title and action slots. The pattern used at the top of Chromium's settings and side panels.
format: mdx
---

# Toolbar

## Live preview

```tsx live
<Toolbar
  title="Bookmarks"
  actions={<IconButton aria-label="More" icon={<MoreVertIcon />} />}
  style={{ border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}
>
  <SearchInput placeholder="Search bookmarks" style={{ flex: 1, maxWidth: 320 }} />
</Toolbar>
```

The header strip at the top of a view. Hosts a title on the left, arbitrary children in the middle, and actions on the right. Common in settings pages, side panels, and popup bodies.

:::warning Actions slot defaults to empty
On a Chromium-native surface the `actions` slot is **empty by default**. Do not park a settings gear, a "+", or any other `IconButton` immediately next to the title — that is [Styleguide Anti-pattern #16](/styleguide/anti-patterns#16-iconbutton-glued-to-a-title-in-the-header). The two narrow cases where `actions` may hold something: a single `⋮` overflow `IconButton` at the far right (with `SearchInput` or content between it and the title — the `chrome://bookmarks` shape), or a single `Button variant="text"` like "Clear all" when the whole surface has one bulk operation. Everything else belongs in a drill-in `ListItem` / `PanelRow` inside the content.
:::

## Import

```tsx
import { Toolbar } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | — | Rendered as `<h1>` on the left |
| `actions` | `ReactNode` | — | Rendered on the right (usually buttons or icon buttons) |
| `tall` | `boolean` | `false` | Taller variant (for pages with longer titles or subtitles) |

Children render between title and actions — use this slot for search fields, tabs, or breadcrumbs. All other `<div>` attributes are forwarded. Ref goes to the root.

## Basic usage

The default shape — title-only, nothing in `actions`. This is the right choice for most surfaces (popups, side panels, full-tab settings pages).

```tsx
<Toolbar title="Settings" />
```

## With a search field in the middle

Full-tab *managers* (`chrome://bookmarks`, `chrome://history`) put a `SearchInput` in the children slot with a single `⋮` overflow `IconButton` at the far right — the `SearchInput` sits between the title and the icon, never butting up against the title.

```tsx
<Toolbar
  title="History"
  actions={<IconButton icon={<MoreVertIcon />} aria-label="More" />}
>
  <SearchInput style={{ flex: 1, maxWidth: 320 }} placeholder="Search history..." />
</Toolbar>
```

## With a single bulk action

When the surface has exactly one bulk verb (e.g. "Clear all" on the history page), render it as a `Button variant="text"` in the `actions` slot.

```tsx
<Toolbar
  title="History"
  actions={<Button variant="text">Clear all</Button>}
/>
```

## Selection mode (mode swap)

The one case where multiple `IconButton`s are correct: the toolbar has swapped modes, the title is replaced by the selection count, and the icons are the verbs of the current selection.

```tsx
<Toolbar
  title="5 selected"
  actions={
    <>
      <IconButton aria-label="Delete" icon={<DeleteIcon />} />
      <IconButton aria-label="Move" icon={<FolderIcon />} />
      <IconButton aria-label="More" icon={<MoreVertIcon />} />
    </>
  }
>
  <IconButton aria-label="Exit selection" icon={<CloseIcon />} />
</Toolbar>
```

## Tall variant

Use when you have a subtitle or need more vertical space:

```tsx
<Toolbar
  tall
  title={
    <>
      <div>Downloads</div>
      <div style={{ fontSize: 13, fontWeight: 400 }}>3 items, 42 MB total</div>
    </>
  }
  actions={<Button variant="text">Clear all</Button>}
/>
```

## Accessibility

- The title renders as `<h1>`. If your page already has an `<h1>` elsewhere, either omit `title` and provide your own heading, or override the element with a custom prop.
- The toolbar itself has no landmark role. Wrap it in a `<header>` element if it's the page header.
