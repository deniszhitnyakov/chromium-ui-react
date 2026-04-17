---
id: tokens
title: Design Tokens
slug: /tokens
sidebar_position: 4
description: All design tokens exposed as CSS custom properties.
---

# Design Tokens

Every token is a CSS custom property. They are defined on `:root` (and also on `.cr-theme` for scoped usage) by `chromium-ui-react/styles.css`.

## Google color palette

| Token | Light | Dark |
|---|---|---|
| `--google-blue-500` | `#4285f4` | `#4285f4` |
| `--google-blue-600` | `#1a73e8` | `#1a73e8` |
| `--google-green-600` | `#1e8e3e` | `#1e8e3e` |
| `--google-red-600` | `#d93025` | `#d93025` |
| `--google-yellow-400` | `#fcc934` | `#fcc934` |
| `--google-grey-500` | `#9aa0a6` | `#9aa0a6` |

Full palette: blue, green, grey, red, yellow (50–900), purple/pink/cyan (100/500/900).

## Semantic colors

| Token | Use |
|---|---|
| `--cr-fallback-color-primary` | Primary brand color (buttons, links, checked states) |
| `--cr-fallback-color-on-primary` | Foreground on primary surfaces |
| `--cr-fallback-color-surface` | Default page/card background |
| `--cr-fallback-color-surface-1` | Subtle tinted background |
| `--cr-fallback-color-surface-variant` | Borders, disabled backgrounds |
| `--cr-fallback-color-on-surface` | Primary text color |
| `--cr-fallback-color-on-surface-subtle` | Secondary text color |
| `--cr-fallback-color-outline` | Default border color |
| `--cr-fallback-color-error` | Error/destructive color |
| `--cr-fallback-color-disabled-background` | Disabled element background |
| `--cr-fallback-color-disabled-foreground` | Disabled element text |

## State colors

| Token | Value |
|---|---|
| `--cr-hover-background-color` | 6% overlay on current `on-surface` |
| `--cr-active-background-color` | 10% overlay on current `on-surface` |
| `--cr-focus-outline-color` | `--cr-fallback-color-primary` |

## Layout & spacing

| Token | Value |
|---|---|
| `--cr-space-1` | `4px` |
| `--cr-space-2` | `8px` |
| `--cr-space-3` | `12px` |
| `--cr-space-4` | `16px` |
| `--cr-space-5` | `20px` |
| `--cr-space-6` | `24px` |
| `--cr-space-8` | `32px` |
| `--cr-space-10` | `40px` |

## Border radius

| Token | Value |
|---|---|
| `--cr-radius-xs` | `2px` |
| `--cr-radius-sm` | `4px` |
| `--cr-radius-md` | `8px` |
| `--cr-radius-lg` | `16px` |
| `--cr-radius-xl` | `24px` |
| `--cr-radius-full` | `100px` (pill) |

## Typography

| Token | Value |
|---|---|
| `--cr-font-family` | `Roboto, 'Google Sans', 'Segoe UI', system-ui, -apple-system, sans-serif` |
| `--cr-font-family-mono` | `'Roboto Mono', 'Courier New', Courier, monospace` |
| `--cr-font-size-xs` | `11px` |
| `--cr-font-size-sm` | `12px` |
| `--cr-font-size-md` | `13px` (Chromium default body) |
| `--cr-font-size-base` | `14px` |
| `--cr-font-size-lg` | `16px` |
| `--cr-font-size-xl` | `20px` |
| `--cr-font-size-2xl` | `24px` |
| `--cr-font-weight-regular` | `400` |
| `--cr-font-weight-medium` | `500` |
| `--cr-font-weight-bold` | `700` |

## Elevation

| Token | Use |
|---|---|
| `--cr-elevation-1` | Default card shadow |
| `--cr-elevation-2` | Hovered card, small menu |
| `--cr-elevation-3` | Dropdown menu, popovers |
| `--cr-elevation-4` | Large popover |
| `--cr-elevation-5` | Modal dialog |
| `--cr-card-shadow` | Alias for `--cr-elevation-1` |

## Animation

| Token | Value |
|---|---|
| `--cr-transition-duration` | `80ms` (Chromium-standard) — `0ms` if `prefers-reduced-motion: reduce` |

## Forced dark mode

To opt out of `prefers-color-scheme` and force a theme:

```html
<div data-cr-theme="dark">...</div>
```
