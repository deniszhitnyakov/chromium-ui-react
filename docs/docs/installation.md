---
id: installation
title: Installation
slug: /installation
sidebar_position: 3
description: How to install and set up chromium-ui-react in a project.
---

# Installation

## 1. Install the package

```bash
npm install chromium-ui-react
# or
pnpm add chromium-ui-react
# or
yarn add chromium-ui-react
```

Peer dependencies: `react >= 18` and `react-dom >= 18`.

## 2. Import the stylesheet once

In your app's entry file (e.g. `src/main.tsx` or `pages/_app.tsx`):

```tsx
import 'chromium-ui-react/styles.css';
```

This file contains:

- All design tokens (`--cr-*` CSS variables) under `:root` and `.cr-theme`
- Dark-mode overrides via `@media (prefers-color-scheme: dark)`
- Base reset & typography utility classes
- All component styles

## 3. Use components

```tsx
import { Button, Input, Card, CardBody } from 'chromium-ui-react';

export default function App() {
  return (
    <Card variant="outlined">
      <CardBody>
        <Input label="Email" placeholder="you@example.com" />
        <Button variant="action">Sign in</Button>
      </CardBody>
    </Card>
  );
}
```

## Using only the tokens (no components)

If you want the design tokens but plan to write your own components:

```tsx
import 'chromium-ui-react/tokens.css';
```

Then reference them in your own CSS:

```css
.my-component {
  background: var(--cr-fallback-color-surface);
  color: var(--cr-primary-text-color);
  border-radius: var(--cr-radius-md);
}
```

## Dark mode

Dark mode is automatic via `prefers-color-scheme: dark`. No provider, no context.

To force a theme, set `data-cr-theme` on a wrapping element:

```tsx
<div data-cr-theme="dark">{/* contents always in dark mode */}</div>
```

## Browser extension usage

In `manifest.json` (Manifest V3):

```json
{
  "manifest_version": 3,
  "name": "My Extension",
  "version": "0.1.0",
  "action": { "default_popup": "popup.html" },
  "side_panel": { "default_path": "sidepanel.html" }
}
```

Bundle with Vite + `@crxjs/vite-plugin` (recommended) or Webpack. Import the CSS once in your popup/sidepanel entry.
