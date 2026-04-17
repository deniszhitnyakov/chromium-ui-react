---
id: tooltip
title: Tooltip
slug: /components/tooltip
description: CSS-only hover/focus tooltip with four placements. No JS positioning.
format: mdx
---

# Tooltip

## Live preview

```tsx live
<div style={{ display: 'flex', gap: 32, padding: 32, flexWrap: 'wrap' }}>
  <Tooltip content="Tooltip on top"><Button>Top (default)</Button></Tooltip>
  <Tooltip content="Tooltip below" placement="bottom"><Button>Bottom</Button></Tooltip>
  <Tooltip content="Tooltip at right" placement="right"><Button>Right</Button></Tooltip>
  <Tooltip content="Tooltip at left" placement="left"><Button>Left</Button></Tooltip>
</div>
```

A lightweight CSS-only tooltip. Appears on hover or focus of the wrapped element. Four placement options: `top`, `bottom`, `left`, `right`.

Because it uses pure CSS (no floating-ui runtime), it's perfect for extensions and popups where bundle size matters. For tooltips that must dodge viewport edges, choose a floating-ui-based solution instead.

## Import

```tsx
import { Tooltip } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | **required** | The tooltip bubble content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Where the bubble appears relative to children |

Children are the trigger element. All other `<span>` attributes are forwarded to the outer wrapper. Ref goes to the wrapper `<span>`.

## Basic usage

```tsx
<Tooltip content="Refresh the list">
  <IconButton icon={<RefreshIcon />} aria-label="Refresh" />
</Tooltip>
```

## Placements

```tsx
<Tooltip content="Above" placement="top"><Button>Top</Button></Tooltip>
<Tooltip content="Below" placement="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip content="Left" placement="left"><Button>Left</Button></Tooltip>
<Tooltip content="Right" placement="right"><Button>Right</Button></Tooltip>
```

## Rich content

`content` takes any `ReactNode`, but keep it short — tooltips shouldn't become mini-dialogs:

```tsx
<Tooltip content={<><strong>Pro tip</strong><br />Use Cmd+K for search</>}>
  <IconButton icon={<HelpIcon />} aria-label="Help" />
</Tooltip>
```

## Positioning notes

- The tooltip is absolutely positioned relative to the wrapping `<span>`, which is `display: inline-block`.
- Because it's CSS-only, it won't flip or shift to stay in the viewport. Place it carefully for edge-of-screen triggers (especially side panels).
- If the trigger is inside an `overflow: hidden` container, the tooltip will be clipped. Either lift the tooltip out, change the container's `overflow`, or use a portal-based solution.

## Accessibility

- The trigger gets `aria-describedby` pointing to the tooltip content.
- `role="tooltip"` is applied to the bubble.
- **Don't use Tooltip as the only label** for an icon-only button — always provide `aria-label` on the IconButton itself. The Tooltip is *supplementary* context, not a name.
