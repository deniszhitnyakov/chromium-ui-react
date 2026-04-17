---
id: toast
title: Toast
slug: /components/toast
description: Transient notification bar with a message, optional action, and optional close button.
format: mdx
---

# Toast

## Live preview

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
  <Toast>Changes saved.</Toast>
  <Toast variant="success">Synced successfully.</Toast>
  <Toast variant="error" onClose={() => {}}>Upload failed.</Toast>
  <Toast variant="warning" actionLabel="Review">Running low on storage.</Toast>
  <Toast variant="info" onClose={() => {}}>A new version is available.</Toast>
</div>
```

A single transient notification. The component renders the toast *body* — positioning (bottom-center, top-right, stack), auto-dismiss timing, and mounting are left to you or a toast manager.

For a production app with many toasts, pair this component with a library like `sonner` or `react-hot-toast`, using this Toast as the rendered body.

## Import

```tsx
import { Toast } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Semantic color |
| `action` | `ReactNode` | — | Custom action element (overrides `actionLabel`) |
| `actionLabel` | `string` | — | Shortcut for an action button |
| `onActionClick` | `() => void` | — | Handler for the action button |
| `onClose` | `() => void` | — | If set, renders an ✕ close button |

All other `<div>` attributes are forwarded. Ref goes to the root `<div>`.

## Basic usage

```tsx
<Toast>Changes saved.</Toast>
```

## With variant

```tsx
<Toast variant="success">Synced successfully.</Toast>
<Toast variant="error">Failed to save. Check your connection.</Toast>
<Toast variant="warning">Running low on storage.</Toast>
<Toast variant="info">A new version is available.</Toast>
```

## With action

```tsx
<Toast
  actionLabel="Undo"
  onActionClick={() => restoreItem(id)}
  onClose={() => dismiss()}
>
  Bookmark deleted.
</Toast>
```

## Dismissible

```tsx
<Toast variant="info" onClose={() => setVisible(false)}>
  Tip: you can pin frequently-used sites.
</Toast>
```

## Custom action element

```tsx
<Toast
  variant="error"
  action={<Button variant="text" size="sm" onClick={retry}>Retry</Button>}
>
  Upload failed.
</Toast>
```

## Typical positioning pattern

Render toasts into a fixed stack at the bottom of the viewport:

```tsx
<div
  style={{
    position: 'fixed',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    zIndex: 1000,
  }}
>
  {toasts.map((t) => <Toast key={t.id} {...t} />)}
</div>
```

## Accessibility

- The root has `role="status"` (polite announcement on mount).
- For **assertive** (error-like) toasts, override with `role="alert"`:
  ```tsx
  <Toast variant="error" role="alert">Something went wrong.</Toast>
  ```
- Don't auto-dismiss error toasts — users need time to read them. Keep a close button visible (`onClose`).
