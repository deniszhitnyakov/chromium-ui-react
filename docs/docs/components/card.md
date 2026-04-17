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
<Card variant="outlined" style={{ maxWidth: 360 }}>
  <CardHeader>
    <CardTitle>Bookmarks backup</CardTitle>
    <CardDescription>Last synced 3 minutes ago</CardDescription>
  </CardHeader>
  <CardBody>Your bookmarks are up to date across all devices.</CardBody>
  <CardFooter>
    <Button variant="text">History</Button>
    <Button variant="action">Sync now</Button>
  </CardFooter>
</Card>
```

A rectangular surface used to group related content. Comes with four visual variants and a set of semantic sub-components (`CardHeader`, `CardBody`, `CardFooter`, `CardTitle`, `CardDescription`) that handle spacing and typography for you.

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
| `variant` | `'default' \| 'outlined' \| 'filled' \| 'elevated'` | `'default'` | Visual style |
| `interactive` | `boolean` | `false` | Adds hover/active states (use when the whole card is clickable) |

All other `<div>` attributes are forwarded. Ref goes to the root `<div>`.

`CardHeader`, `CardBody`, `CardFooter`, `CardTitle`, `CardDescription` all accept their native element attributes (div or heading/paragraph) and forward ref.

## Variants

```tsx
<Card>Default (no border, no shadow — blends with the page)</Card>
<Card variant="outlined">Outlined (1px border)</Card>
<Card variant="filled">Filled (subtle tinted background)</Card>
<Card variant="elevated">Elevated (drop shadow)</Card>
```

### When to use which

- `default` — grouping content on a page that already has structure (e.g., inside a settings row).
- `outlined` — the workhorse for panels and dashboards; gives a clear boundary without visual weight.
- `filled` — highlights related content without borders (inline alerts, quote blocks).
- `elevated` — pop a single surface above the page (feature highlight, selected item).

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
