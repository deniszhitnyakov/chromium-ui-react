---
id: divider
title: Divider
slug: /components/divider
description: Horizontal or vertical line separator for lists, toolbars, and sectioned content.
format: mdx
---

# Divider

## Live preview

```tsx live
<div style={{ width: 320, border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}>
  <div style={{ padding: 12 }}>First block</div>
  <Divider />
  <div style={{ padding: 12 }}>Second block</div>
  <Divider subtle />
  <div style={{ padding: 12 }}>Third block</div>
</div>
```

A thin line that separates content. Horizontal by default (renders as `<hr>`); can also be vertical for toolbars and inline lists.

## Import

```tsx
import { Divider } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the line |
| `subtle` | `boolean` | `false` | Uses a lighter color (for tight, busy layouts) |
| `inset` | `boolean` | `false` | Adds left padding to align with list-item text (skipping an icon or avatar column) |

All other `<hr>` attributes are forwarded. Ref goes to the `<hr>`.

## Horizontal (default)

```tsx
<div>
  <p>First paragraph</p>
  <Divider />
  <p>Second paragraph</p>
</div>
```

## Vertical

Use inside a flex row — you must give the parent a defined height for the divider to show:

```tsx
<Toolbar>
  <Button variant="text">Save</Button>
  <Divider orientation="vertical" />
  <Button variant="text">Export</Button>
</Toolbar>
```

## Subtle

For dense rows where a full-weight divider is too loud:

```tsx
<List>
  <ListItem>Item one</ListItem>
  <Divider subtle />
  <ListItem>Item two</ListItem>
</List>
```

## Inset (aligned with list text)

When list items have a leading icon or avatar, use `inset` to align the divider with the text column rather than stretching under the icon:

```tsx
<List>
  <ListItem icon={<StarIcon />} primary="Favorites" />
  <Divider inset />
  <ListItem icon={<HistoryIcon />} primary="History" />
</List>
```

## Accessibility

- Renders as `<hr role="separator">` with `aria-orientation`. Screen readers will announce it as a separator.
- Purely decorative dividers (e.g., between flex items with sufficient visual spacing) don't need this component — use CSS borders or margins.
