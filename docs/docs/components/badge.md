---
id: badge
title: Badge
slug: /components/badge
description: Small non-interactive status tag with five semantic variants in a quiet outline style.
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

A tiny inline tag used to annotate a row or control with a status: "New", "Beta", "3 unread", "Error", etc. Non-interactive — if you need click behaviour, use a [Button](./button.md) with `variant="outlined"` or `variant="text"`.

Badges in `chromium-ui-react` are outline-only by design: a 1px border and matching text color, with a transparent fill. Solid-tinted badges read as too aggressive on the dense, mostly-grey surfaces this library targets, so they were removed. Reach for `variant="neutral"` first; only escalate to a colored variant when the state is something the user must react to. See [Color & surfaces — Badge defaults](../styleguide/color.md#badge-defaults-quiet-first).

## Import

```tsx
import { Badge } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'error' \| 'success' \| 'neutral' \| 'warning'` | `'default'` | Semantic color of the border and text |

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
- `neutral` — informational, no urgency. "Draft", "Archived", a plain count.

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
- Don't rely on color alone to convey meaning — pair `variant="error"` with an explicit label like "Failed" or an icon. The outline visual keeps the color signal intentionally quiet, so a bare colored badge with no label is easy to miss.
