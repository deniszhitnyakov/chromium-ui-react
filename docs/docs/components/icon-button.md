---
id: icon-button
title: IconButton
slug: /components/icon-button
description: Square icon-only button with a required accessible label. Two visual variants.
format: mdx
---

# IconButton

## Live preview

```tsx live
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <IconButton aria-label="Refresh" icon={<RefreshIcon size={18} />} />
  <IconButton aria-label="More" icon={<MoreVertIcon size={18} />} variant="filled" />
  <IconButton aria-label="Close" icon={<CloseIcon size={14} />} size="sm" />
  <IconButton aria-label="Edit" icon={<EditIcon />} size="lg" />
</div>
```

A square 32×32 button that holds a single icon. Use it for toolbar affordances, list-row actions, close buttons, and anywhere a full-text Button would be visual noise.

`aria-label` is **required** — the TypeScript prop is non-optional.

## Import

```tsx
import { IconButton } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | **required** | The icon element (SVG, 16×16 with `currentColor`) |
| `aria-label` | `string` | **required** | Describes the action for screen readers |
| `variant` | `'standard' \| 'filled'` | `'standard'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Hit target size |
| `disabled` | `boolean` | `false` | Standard HTML button disabled |

All other `<button>` attributes are forwarded; ref goes to the underlying `<button>`.

## Usage

```tsx
<IconButton icon={<MoreVertIcon />} aria-label="More options" />
<IconButton icon={<CloseIcon />} aria-label="Close" variant="filled" />
<IconButton icon={<EditIcon />} aria-label="Edit" size="sm" />
```

## Variants

- `standard` — transparent background, hover overlay appears on interaction.
- `filled` — subtle tinted background at rest; used when the icon needs to feel more clickable (toolbar primary, floating actions).

## Common pitfalls

- **Don't wrap it in a tooltip without a label.** `aria-label` is what screen readers announce; Tooltip content is visual-only.
- **Don't size the icon via Tailwind classes on the IconButton.** Size the SVG inline (`width={16} height={16}`).
- **Don't use it for text + icon.** If you need both, use [Button](./button.md) with `startIcon`.
- **Don't glue it to a page / panel title in the header.** Parking a settings gear, a "+", or any other `IconButton` immediately next to a `<Toolbar>` / `<PanelHeader>` title is the most common way surfaces stop reading as Chromium-native. Demote to a drill-in `PanelRow` inside the content. See [Styleguide Anti-pattern #16](/styleguide/anti-patterns#16-iconbutton-glued-to-a-title-in-the-header) for the rule and the one narrow case (single `⋮` overflow at the far right, with content between it and the title) where a toolbar `IconButton` is acceptable.
