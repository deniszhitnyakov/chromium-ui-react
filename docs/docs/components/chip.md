---
id: chip
title: Chip
slug: /components/chip
description: Small interactive tag for filters, selections, or removable tokens.
format: mdx
---

# Chip

## Live preview

```tsx live
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  <Chip>All</Chip>
  <Chip selected>Active</Chip>
  <Chip>Done</Chip>
  <Chip variant="compact">Recent</Chip>
  <Chip onRemove={() => {}}>Removable</Chip>
</div>
```

A small pill-shaped button used for filter toggles, selected tokens in an input, and compact tag-like affordances. Renders as a `<button>` so it's fully focusable and keyboard-interactive.

## Import

```tsx
import { Chip } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'selected' \| 'compact'` | `'default'` | Visual style |
| `selected` | `boolean` | `false` | Shorthand for `variant="selected"` (also toggles `aria-pressed`) |
| `startIcon` | `ReactNode` | — | Icon before the label |
| `onClick` | `(e: MouseEvent) => void` | — | Click on the chip body |
| `onRemove` | `(e: MouseEvent) => void` | — | If set, renders a ✕ that fires this handler |
| `disabled` | `boolean` | `false` | Disables the chip |

All other `<button>` attributes are forwarded. Ref goes to the underlying `<button>`.

## Filter chips

```tsx
const [filter, setFilter] = useState('all');

<div style={{ display: 'flex', gap: 8 }}>
  <Chip selected={filter === 'all'} onClick={() => setFilter('all')}>All</Chip>
  <Chip selected={filter === 'active'} onClick={() => setFilter('active')}>Active</Chip>
  <Chip selected={filter === 'done'} onClick={() => setFilter('done')}>Done</Chip>
</div>
```

## Removable chips (token input)

```tsx
{tags.map((tag) => (
  <Chip key={tag} onRemove={() => setTags((t) => t.filter((x) => x !== tag))}>
    {tag}
  </Chip>
))}
```

The ✕ stops event propagation, so `onClick` on the chip body still works independently of `onRemove`.

## With a leading icon

```tsx
<Chip startIcon={<StarIcon />} selected>Favorites</Chip>
```

## Compact variant

Half the vertical padding — fits into dense rows, table filter bars, or toolbars:

```tsx
<Chip variant="compact">Recent</Chip>
```

## Accessibility

- Rendered as `<button aria-pressed={selected}>`, so screen readers announce the toggle state.
- Grouping a row of chips? Wrap them in a `<div role="group" aria-label="Filter by status">` — the component doesn't add group semantics itself.
