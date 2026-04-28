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
  <Badge>Beta</Badge>
  <Badge variant="info">New</Badge>
  <Badge variant="success">Synced</Badge>
  <Badge variant="warning">Deprecated</Badge>
  <Badge variant="error">Failed</Badge>
</div>
```

A tiny inline tag used to annotate a row or control with a status: "New", "Beta", "3 unread", "Error", etc. Non-interactive — if you need click behaviour, use a [Button](./button.md) with `variant="outlined"` or `variant="text"`.

Badges in `chromium-ui-react` are outline-only by design: a 1px border and matching text color, with a transparent fill. The default variant is **neutral** (grey outline) — reach for `<Badge>foo</Badge>` first and only escalate to a coloured variant when the state is something the user must react to. See [Color & surfaces — Badge defaults](../styleguide/color.md#badge-defaults-quiet-first).

## Import

```tsx
import { Badge } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | Semantic color of the border and text |

All other `<span>` attributes are forwarded. Ref goes to the underlying `<span>`.

## Variants

```tsx
<Badge>Beta</Badge>
<Badge variant="info">New</Badge>
<Badge variant="success">Synced</Badge>
<Badge variant="warning">Deprecated</Badge>
<Badge variant="error">Failed</Badge>
```

### Semantic meaning

- `neutral` (default) — informational, no urgency. "Draft", "Archived", "Beta", a plain count.
- `info` — brand/accent colour. "New", "Featured", non-semantic callouts.
- `success` — positive state. "Synced", "Active", "Verified".
- `warning` — caution state. "Deprecated", "Limited".
- `error` — problem state. "Failed", "Expired", "Blocked".

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
