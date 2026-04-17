---
id: list
title: List
slug: /components/list
description: Vertical list of items with structured slots for icon, avatar, primary/secondary text, and a trailing element.
format: mdx
---

# List

## Live preview

```tsx live
<List style={{ maxWidth: 360, border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}>
  <ListItem primary="Favorites" secondary="4 items" interactive end={<span>›</span>} />
  <ListItem primary="History" secondary="Last visited today" interactive end={<span>›</span>} />
  <ListItem primary="Downloads" secondary="2 pending" interactive selected end={<span>›</span>} />
  <ListItem primary="Settings" interactive dense end={<span>›</span>} />
</List>
```

A semantic `<ul>` / `<li>` container with layout opinions. `ListItem` supports five content slots: icon, avatar, primary text, secondary text, and end. Each slot is optional — if you don't use any, the item becomes a plain block you can fill with children.

## Import

```tsx
import { List, ListItem } from 'chromium-ui-react';
```

## List props

No custom props. All `<ul>` attributes forwarded. Ref goes to the `<ul>`.

## ListItem props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Leading icon (small) |
| `avatar` | `ReactNode` | — | Leading avatar (larger, typically an image or initials) |
| `primary` | `ReactNode` | — | Main text line |
| `secondary` | `ReactNode` | — | Subtitle line |
| `end` | `ReactNode` | — | Trailing element (chevron, badge, toggle, menu button) |
| `interactive` | `boolean` | `false` | Adds hover/active states |
| `selected` | `boolean` | `false` | Highlights as currently active |
| `dense` | `boolean` | `false` | Reduces vertical padding for compact layouts |

If no structured slot is set and you pass children directly, the item renders them without wrapping. Ref goes to the `<li>`.

## Plain list

```tsx
<List>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</List>
```

## Structured rows

```tsx
<List>
  <ListItem
    icon={<BookmarkIcon />}
    primary="Favorite pages"
    secondary="4 items"
    end={<Chevron />}
    interactive
  />
  <ListItem
    icon={<HistoryIcon />}
    primary="History"
    secondary="Last visited today"
    end={<Chevron />}
    interactive
  />
</List>
```

## With avatar

```tsx
<ListItem
  avatar={<img src="/avatar.jpg" alt="" />}
  primary="Alex Doe"
  secondary="alex@example.com"
  end={<IconButton icon={<MoreVertIcon />} aria-label="More" />}
/>
```

## Selected state

```tsx
<ListItem
  icon={<FolderIcon />}
  primary="Inbox"
  selected
  interactive
/>
```

## Dense

For settings pages and file lists where vertical space matters:

```tsx
<List>
  <ListItem dense primary="Auto-start on launch" end={<Toggle aria-label="Auto-start" />} />
  <ListItem dense primary="Show badge count" end={<Toggle aria-label="Badge count" defaultChecked />} />
  <ListItem dense primary="Enable shortcuts" end={<Toggle aria-label="Shortcuts" />} />
</List>
```

## Interactive (clickable rows)

```tsx
<ListItem
  icon={<SettingsIcon />}
  primary="Open settings"
  end={<Chevron />}
  interactive
  onClick={() => router.push('/settings')}
  role="button"
  tabIndex={0}
/>
```

The `interactive` prop adds the hover/active styles but **does not** add button semantics. If the row is clickable, add `role="button"` and `tabIndex={0}` (or wrap the item in an `<a>` / `<button>`).

## Accessibility

- The component emits a plain `<ul>` / `<li>`. Screen readers announce "list, N items" and navigate items with standard list commands.
- For a navigation list, wrap with `<nav>` or add `role="navigation"` to the parent `<List>` via its attributes.
- Don't make all rows `interactive` if only some are — it confuses the user about what's clickable.
