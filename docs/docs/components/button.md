---
id: button
title: Button
slug: /components/button
description: Primary interactive control for actions. Five visual variants that mirror Chromium's cr-button semantics.
format: mdx
---

# Button

The workhorse action control. Four variants map onto Chromium's `cr-button` semantics: `outlined` (default), `action` (filled primary), `destructive` (error), and `text` (bare).

## Live preview

```tsx live
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
  <Button>Cancel</Button>
  <Button variant="action">Save</Button>
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
| `variant` | `'outlined' \| 'action' \| 'destructive' \| 'text'` | `'outlined'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control size |
| `startIcon` | `ReactNode` | — | Icon placed before children |
| `endIcon` | `ReactNode` | — | Icon placed after children |
| `disabled` | `boolean` | `false` | Standard HTML button disabled |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Default is `'button'` (not `'submit'`) |

All other `<button>` attributes (`onClick`, `aria-*`, `form`, etc.) are forwarded. A `ref` is forwarded to the underlying `<button>`.

## Variants

```tsx
<Button>Cancel</Button>
<Button variant="action">Save</Button>
<Button variant="destructive">Delete</Button>
<Button variant="text">Learn more</Button>
```

### When to use which

- `outlined` — the default. Secondary actions, cancel buttons, neutral choices.
- `action` — the single primary action in a view (form submit, main CTA).
- `destructive` — irreversible or data-destroying actions (delete, remove).
- `text` — lowest-emphasis affordance; inline with body text or dense rows. The Cancel side of an action row in destructive contexts.

The library deliberately does not ship a `tonal` (filled-tinted) middle tier — Chromium settles on a binary `action` + `outlined` emphasis split. Two filled tiers in close proximity reliably violate the colour budget and the "one primary per view" rule. Reach for `outlined` whenever you would have reached for `tonal`.

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

## Sizing

Buttons are content-sized — width is label plus horizontal padding, no full-width affordance. A button stretched edge-to-edge stops reading as a button and starts reading as a banner; that is not how Chromium uses buttons. If a footer needs visual weight, place the content-sized primary on the right (or centred for the side-panel pattern) — see [Pattern — Primary action button](../styleguide/patterns/primary-action.md).

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
