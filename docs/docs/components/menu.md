---
id: menu
title: Menu
slug: /components/menu
description: A list of selectable items. Use as a dropdown body, side-nav list, or action menu.
format: mdx
---

# Menu

## Live preview

```tsx live
<Menu style={{ maxWidth: 280 }}>
  <MenuLabel>Recent</MenuLabel>
  <MenuItem>Project Alpha</MenuItem>
  <MenuItem>Project Beta</MenuItem>
  <MenuDivider />
  <MenuLabel>Actions</MenuLabel>
  <MenuItem end="Ctrl+C">Copy</MenuItem>
  <MenuItem end="Ctrl+V">Paste</MenuItem>
  <MenuDivider />
  <MenuItem selected>Settings</MenuItem>
</Menu>
```

A vertical list of selectable items. The Menu component itself is just the styled surface — positioning (as a popover, dropdown, context menu) is left to you, since sidepanels and extension popups rarely need the full floating-UI machinery.

## Import

```tsx
import { Menu, MenuItem, MenuDivider, MenuLabel } from 'chromium-ui-react';
```

## Menu props

| Prop | Type | Default | Description |
|---|---|---|---|
| `role` | `string` | `'menu'` | Override for `listbox`, `navigation`, etc. |

All other `<div>` attributes are forwarded. Ref goes to the root.

## MenuItem props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Leading icon slot |
| `end` | `ReactNode` | — | Trailing slot (keyboard shortcut, check, chevron) |
| `selected` | `boolean` | `false` | Highlights the item as currently chosen |
| `disabled` | `boolean` | — | Disables the item |

All other `<button>` attributes are forwarded. Ref goes to the `<button>`.

## MenuLabel / MenuDivider

`MenuLabel` renders a small section heading. `MenuDivider` renders a separator line.

## Basic menu

```tsx
<Menu>
  <MenuItem icon={<CopyIcon />}>Copy</MenuItem>
  <MenuItem icon={<CutIcon />}>Cut</MenuItem>
  <MenuItem icon={<PasteIcon />} end="Ctrl+V">Paste</MenuItem>
  <MenuDivider />
  <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
</Menu>
```

## Grouped with labels

```tsx
<Menu>
  <MenuLabel>Recent</MenuLabel>
  <MenuItem>Project Alpha</MenuItem>
  <MenuItem>Project Beta</MenuItem>
  <MenuDivider />
  <MenuLabel>Pinned</MenuLabel>
  <MenuItem selected>Dashboard</MenuItem>
  <MenuItem>Analytics</MenuItem>
</Menu>
```

## Using as a listbox

Override the role:

```tsx
<Menu role="listbox" aria-label="Filter by">
  <MenuItem role="option" aria-selected>All</MenuItem>
  <MenuItem role="option">Unread</MenuItem>
  <MenuItem role="option">Starred</MenuItem>
</Menu>
```

## Side-panel navigation

```tsx
<Menu role="navigation" aria-label="Main">
  <MenuItem icon={<BookmarkIcon />} selected>Bookmarks</MenuItem>
  <MenuItem icon={<HistoryIcon />}>History</MenuItem>
  <MenuItem icon={<DownloadIcon />}>Downloads</MenuItem>
  <MenuDivider />
  <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
</Menu>
```

## Positioning as a popover

Menu doesn't ship with a Popover wrapper. Use it inside a custom positioned container:

```tsx
{isOpen && (
  <div style={{ position: 'absolute', top: buttonRect.bottom, left: buttonRect.left }}>
    <Menu role="menu">
      <MenuItem onClick={handleEdit}>Edit</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
  </div>
)}
```

For complex positioning (flipping, shifting, keyboard dismissal), add `@floating-ui/react` and use Menu as the body.

## Accessibility

- `MenuItem` is a native `<button>`, so focus, keyboard activation, and disabled behavior all work for free.
- If you use `role="menu"`, also manage arrow-key navigation yourself — the component doesn't inject a roving tabindex.
- For a picker that reflects *selected* state (listbox pattern), override the roles as shown above.
