---
id: badge
title: Badge
slug: /components/badge
description: Small non-interactive status tag. Five semantic variants in solid and outline appearances.
format: mdx
---

# Badge

## Live preview

```tsx live
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
  <Badge>New</Badge>
  <Badge variant="success">Synced</Badge>
  <Badge variant="error">Failed</Badge>
  <Badge variant="warning">Deprecated</Badge>
  <Badge variant="neutral">Beta</Badge>
</div>
```

A tiny inline tag used to annotate a row or control with a status: "New", "Beta", "3 unread", "Error", etc. Non-interactive — if you need click behavior, use [Chip](./chip.md) instead.

## Import

```tsx
import { Badge } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'error' \| 'success' \| 'neutral' \| 'warning'` | `'default'` | Semantic color |
| `appearance` | `'solid' \| 'outline'` | `'solid'` | Fill style — solid tint vs. outlined with matching text color |

All other `<span>` attributes are forwarded. Ref goes to the underlying `<span>`.

## Variants

```tsx
<Badge>New</Badge>
<Badge variant="success">Synced</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning">Deprecated</Badge>
<Badge variant="neutral">Beta</Badge>
```

### Semantic meaning

- `default` — brand/accent color. Use for "New", "Featured", and non-semantic callouts.
- `success` — positive state. "Synced", "Active", "Verified".
- `error` — problem state. "Failed", "Expired", "Blocked".
- `warning` — caution state. "Deprecated", "Limited", "Beta".
- `neutral` — informational, no urgency. "Draft", "Archived".

## Outline appearance

A quieter variant for dense layouts where a fully tinted fill would feel heavy. The border and the text share the same semantic color; the fill is transparent, so the badge inherits the surface underneath.

```tsx live
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
  <Badge appearance="outline">New</Badge>
  <Badge appearance="outline" variant="success">Synced</Badge>
  <Badge appearance="outline" variant="error">Failed</Badge>
  <Badge appearance="outline" variant="warning">Deprecated</Badge>
  <Badge appearance="outline" variant="neutral">Beta</Badge>
</div>
```

### When to prefer outline

- Inside cards, list rows, or toolbars where several badges appear close together and a wall of solid color would dominate the row.
- Next to other tinted elements (chips, primary buttons) where solid badges would compete for attention.
- On colored or busy backgrounds where a transparent fill reads more cleanly than a second fill on top of the first.

Solid stays the right choice for high-signal states that must be spotted at a glance — a single "Failed" in a long list of "OK", for example.

## Counting badge

Badges work well as numeric counters next to menu items or tab labels:

```tsx
<Tab value="inbox">
  Inbox <Badge variant="error">3</Badge>
</Tab>
```

## With an icon

```tsx
<Badge variant="success">
  <CheckIcon /> Verified
</Badge>
```

## Accessibility

- For counting badges, consider adding visually-hidden text to clarify the count's meaning to screen readers: `<span className="cr-sr-only">3 unread messages</span>` alongside the visible number.
- Don't rely on color alone to convey meaning — pair `variant="error"` with an explicit label like "Failed" or an icon. This matters more for `appearance="outline"`, where the fill is transparent and the color signal is slightly quieter.
