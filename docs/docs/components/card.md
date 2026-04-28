---
id: card
title: Card
slug: /components/card
description: Surface container for grouped content. Four elevations, plus interactive and composable header/body/footer parts.
format: mdx
---

# Card

## Live preview

```tsx live
<Card style={{ maxWidth: 360 }}>
  <CardHeader>
    <CardTitle>Bookmarks backup</CardTitle>
    <CardDescription>Last synced 3 minutes ago</CardDescription>
  </CardHeader>
  <CardBody>Your bookmarks are up to date across all devices.</CardBody>
  <CardFooter>
    <Button variant="text">History</Button>
    <Button variant="action">Sync</Button>
  </CardFooter>
</Card>
```

A rectangular surface used to group related content. Default is **elevated** — the subtle `--cr-elevation-2` shadow `chrome://settings`, `chrome://bookmarks`, and `chrome://downloads` ship with. Three other variants cover the cases where elevation is wrong (outlined, filled, flat). Plus a set of semantic sub-components (`CardHeader`, `CardBody`, `CardFooter`, `CardTitle`, `CardDescription`) that handle spacing and typography for you.

## Import

```tsx
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
} from 'chromium-ui-react';
```

## Card props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'elevated' \| 'outlined' \| 'filled' \| 'flat'` | `'elevated'` | Visual style |
| `elevation` | `1 \| 2` | `2` | Shadow weight when `variant='elevated'`. Use `1` on narrow surfaces (side panels) where elevation-2 reads too heavy. Ignored for non-elevated variants. |
| `interactive` | `boolean` | `false` | Adds hover/active states (use when the whole card is clickable) |

All other `<div>` attributes are forwarded. Ref goes to the root `<div>`.

`CardHeader`, `CardBody`, `CardFooter`, `CardTitle`, `CardDescription` all accept their native element attributes (div or heading/paragraph) and forward ref.

## Variants

```tsx
<Card>Elevated (default — subtle elevation-2 shadow)</Card>
<Card variant="outlined">Outlined (1px border, no shadow)</Card>
<Card variant="filled">Filled (subtle tinted background, no shadow)</Card>
<Card variant="flat">Flat (no border, no shadow)</Card>
```

### When to use which

- `elevated` (default) — settings sections, side-panel sections, dashboard tiles, dialog content cards. The Chromium-faithful default.
- `outlined` — dense admin layouts, dialogs that already sit on an elevated surface, places where another shadow would feel like noise.
- `filled` — quote blocks, code samples, inline alerts — content that wants to look distinct without competing for elevation.
- `flat` — when the parent already provides the boundary (e.g., a card-shaped drawer); reach for it sparingly.

## Structured composition

```tsx
<Card variant="outlined">
  <CardHeader>
    <CardTitle>Bookmarks backup</CardTitle>
    <CardDescription>Last synced 3 minutes ago</CardDescription>
  </CardHeader>
  <CardBody>
    Your bookmarks are up to date across all devices.
  </CardBody>
  <CardFooter>
    <Button variant="text">View history</Button>
    <Button variant="action">Sync now</Button>
  </CardFooter>
</Card>
```

## Interactive (whole card clickable)

```tsx
<Card variant="outlined" interactive onClick={() => openDetails(item.id)}>
  <CardHeader>
    <CardTitle>{item.name}</CardTitle>
    <CardDescription>{item.summary}</CardDescription>
  </CardHeader>
</Card>
```

If the card is interactive, also set `role="button"` and `tabIndex={0}` so it's keyboard-focusable, or wrap its content in an `<a>` / `<button>` instead.

## Plain body-only

For a quick container without headers or footers:

```tsx
<Card variant="outlined">
  <CardBody>
    <Input label="Name" />
    <Input label="Email" type="email" />
    <Button variant="action">Save</Button>
  </CardBody>
</Card>
```

## Accessibility

- `CardTitle` renders as `<h3>` by default. Override the element with a custom tag if that breaks your heading hierarchy.
- `interactive` doesn't add ARIA semantics for you — add `role="button"`, `tabIndex={0}`, and a key handler if the whole card is an action.
