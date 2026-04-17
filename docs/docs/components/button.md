---
id: button
title: Button
slug: /components/button
description: Primary interactive control for actions. Five visual variants that mirror Chromium's cr-button semantics.
format: mdx
---

# Button

The workhorse action control. Five variants map 1:1 onto Chromium's `cr-button` semantics: `outlined` (default), `action` (filled primary), `tonal` (soft filled), `destructive` (error), and `text` (bare).

## Live preview

```tsx live
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
  <Button>Cancel</Button>
  <Button variant="action">Save</Button>
  <Button variant="tonal">Import</Button>
  <Button variant="destructive">Delete</Button>
  <Button variant="text">Learn more</Button>
</div>
```

## Import

```tsx
import { Button } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'outlined' \| 'action' \| 'tonal' \| 'destructive' \| 'text'` | `'outlined'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control size |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `startIcon` | `ReactNode` | — | Icon placed before children |
| `endIcon` | `ReactNode` | — | Icon placed after children |
| `disabled` | `boolean` | `false` | Standard HTML button disabled |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Default is `'button'` (not `'submit'`) |

All other `<button>` attributes (`onClick`, `aria-*`, `form`, etc.) are forwarded. A `ref` is forwarded to the underlying `<button>`.

## Variants

```tsx
<Button>Cancel</Button>
<Button variant="action">Save</Button>
<Button variant="tonal">Import</Button>
<Button variant="destructive">Delete</Button>
<Button variant="text">Learn more</Button>
```

### When to use which

- `outlined` — the default. Secondary actions, cancel buttons, neutral choices.
- `action` — the single primary action in a view (form submit, main CTA).
- `tonal` — secondary emphasis, paired with an `action` primary in a toolbar.
- `destructive` — irreversible or data-destroying actions (delete, remove).
- `text` — lowest-emphasis affordance; inline with body text or dense rows.

## Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Icons

```tsx
<Button startIcon={<DownloadIcon />}>Download</Button>
<Button variant="action" endIcon={<ArrowRight />}>Next</Button>
```

Icons should be 16×16 inline SVGs with `currentColor` fills. The Button does not size icons for you.

## Full-width

Useful inside narrow popups and side panels:

```tsx
<Button variant="action" fullWidth>Continue</Button>
```

## Loading state

Compose with `Spinner` — the Button does not ship a built-in `loading` prop:

```tsx
<Button variant="action" disabled={loading}>
  {loading ? <Spinner size="sm" /> : 'Save'}
</Button>
```

## Accessibility

- Default `type="button"` prevents accidental form submission when used outside `<form>`.
- Disabled buttons are not focusable; if you need a focusable-but-inert button (e.g. to show a tooltip explaining *why* it's disabled), use `aria-disabled` and `tabIndex={0}` instead of `disabled`.
- Icon-only buttons should use [IconButton](./icon-button.md) — it enforces `aria-label`.
