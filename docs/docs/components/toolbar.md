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
  actions={
    <>
      <IconButton aria-label="Search" icon={<span style={{fontSize:14}}>🔍</span>} />
      <Button variant="text">Clear all</Button>
    </>
  }
  style={{ border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}
/>
```

The header strip at the top of a view. Hosts a title on the left, arbitrary children in the middle, and actions on the right. Common in settings pages, side panels, and popup bodies.

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

```tsx
<Toolbar title="Settings" />
```

## With actions

```tsx
<Toolbar
  title="Bookmarks"
  actions={
    <>
      <IconButton icon={<SearchIcon />} aria-label="Search" />
      <IconButton icon={<MoreVertIcon />} aria-label="More" />
    </>
  }
/>
```

## With a search field in the middle

```tsx
<Toolbar
  title="History"
  actions={<IconButton icon={<MoreVertIcon />} aria-label="More" />}
>
  <SearchInput style={{ flex: 1, maxWidth: 320 }} placeholder="Search history..." />
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
