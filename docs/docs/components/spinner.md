---
id: spinner
title: Spinner & Progress
slug: /components/spinner
description: Indeterminate circular spinner and linear progress bar with determinate/indeterminate modes.
format: mdx
---

# Spinner & Progress

## Live preview

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Spinner size="sm" />
    <Spinner />
    <Spinner size="lg" />
  </div>
  <div style={{ width: 320 }}><Progress value={42} /></div>
  <div style={{ width: 320 }}><Progress indeterminate /></div>
</div>
```

Two loading indicators. Use `Spinner` when you don't know how long the work will take (network request, inline button loading). Use `Progress` when you *do* know the percentage, or when you want a more prominent indeterminate bar.

## Import

```tsx
import { Spinner, Progress } from 'chromium-ui-react';
```

## Spinner props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Diameter (16 / 24 / 32 px) |
| `label` | `string` | `'Loading'` | `aria-label` for screen readers |

All other `<span>` attributes are forwarded. Ref goes to the `<span>`.

## Progress props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current value |
| `max` | `number` | `100` | Max value (for percentage calculation) |
| `indeterminate` | `boolean` | `false` | Show sliding animation instead of a fixed bar |

All other `<div>` attributes are forwarded. Ref goes to the root `<div>`.

## Spinner

```tsx
<Spinner />
<Spinner size="sm" />
<Spinner size="lg" label="Downloading..." />
```

### Inline in a button

```tsx
<Button variant="action" disabled={loading}>
  {loading ? <Spinner size="sm" /> : 'Save'}
</Button>
```

## Determinate Progress

```tsx
<Progress value={uploaded} max={total} />
```

## Indeterminate Progress

```tsx
<Progress indeterminate />
```

### Pairing with a status message

```tsx
<div>
  <div style={{ marginBottom: 8 }}>Uploading file 2 of 5...</div>
  <Progress value={42} />
</div>
```

## Accessibility

- `Spinner` has `role="status"` and `aria-label`. Screen readers will announce the label on mount.
- `Progress` has `role="progressbar"` with `aria-valuenow` / `aria-valuemax`. In indeterminate mode, `aria-valuenow` is omitted so assistive tech reports a pending state.
- Don't just show a spinner for an action — pair it with text (a hint, a disabled button, a status message), or screen-reader users get no information about what's happening.
