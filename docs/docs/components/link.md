---
id: link
title: Link
slug: /components/link
description: Styled anchor element that matches Chromium's link semantics. Supports a subtle variant.
format: mdx
---

# Link

## Live preview

```tsx live
<div>
  <p>Read more in the <Link href="#">documentation</Link>.</p>
  <p>Some items may be <Link href="#" subtle>managed by your administrator</Link>.</p>
</div>
```

A styled `<a>` tag. Sits in body copy, footers, and anywhere you need navigation that isn't a button. Two visual variants: default (brand-colored, underlined on hover) and `subtle` (on-surface text color).

## Import

```tsx
import { Link } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `subtle` | `boolean` | `false` | Renders in `on-surface` color instead of brand color |
| `href`, `target`, `rel`, ... | — | — | All standard anchor attributes |

Ref forwards to the underlying `<a>`.

## Basic usage

```tsx
<Link href="/settings/privacy">Privacy settings</Link>
```

## Subtle

Use when the link is in a dense list or inline with body text where the brand color would be too noisy:

```tsx
<p>
  Some items may be managed by your administrator.{' '}
  <Link href="/help/managed" subtle>Learn more</Link>
</p>
```

## External links

Opening in a new tab:

```tsx
<Link href="https://chromium.org" target="_blank" rel="noopener noreferrer">
  Chromium project
</Link>
```

## Router integration

For framework routers (Next.js, Remix, React Router), pass the framework's `Link` wrapper or render as a component:

```tsx
// Next.js
<NextLink href="/settings" legacyBehavior>
  <Link>Settings</Link>
</NextLink>
```

Or render a custom element via `asChild`-style wrapping (not built-in — use the framework's own Link primitive directly for complex cases).

## Accessibility

- Always set a meaningful href. A `<button>` disguised as a link (or vice versa) confuses both users and assistive tech.
- When opening in a new tab, add `rel="noopener noreferrer"` for security (the component doesn't auto-apply it).
- Underline is shown on hover/focus only, to reduce visual noise in dense layouts — but the visited/focus state is still distinguishable.
