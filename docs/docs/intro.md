---
id: intro
title: Introduction
slug: /
sidebar_position: 1
description: A React component library that recreates Chromium's native cr_elements UI.
format: mdx
---

# Chromium UI React

A React component library that recreates Chromium's native `cr_elements` design system — the visual language used inside the browser for settings pages, side-panel UIs, downloads, bookmarks manager, and other WebUI surfaces.

Use it to build browser extensions, companion desktop apps, or internal tools that feel like first-party Google surfaces rather than yet another bespoke web dashboard.

<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 16,
  margin: '24px 0',
}}>
  <figure style={{ margin: 0 }}>
    <img
      src="/chromium-ui-react/img/showcase-light.v3.png"
      alt="Chromium UI React showcase in light mode — toolbar, sidebar menu, tabs, forms, list, buttons, chips, badges and toasts"
      style={{ width: '100%', borderRadius: 8, border: '1px solid var(--cr-fallback-color-outline, #dadce0)' }}
    />
    <figcaption style={{ fontSize: 12, opacity: 0.7, marginTop: 6, textAlign: 'center' }}>Light</figcaption>
  </figure>
  <figure style={{ margin: 0 }}>
    <img
      src="/chromium-ui-react/img/showcase-dark.v3.png"
      alt="Chromium UI React showcase in dark mode — same layout rendered on a dark surface"
      style={{ width: '100%', borderRadius: 8, border: '1px solid var(--cr-fallback-color-outline, #3c4043)' }}
    />
    <figcaption style={{ fontSize: 12, opacity: 0.7, marginTop: 6, textAlign: 'center' }}>Dark</figcaption>
  </figure>
</div>

A live (non-React) HTML version of the same layout is served at [`/showcase/index.html`](pathname:///showcase/index.html) — open it to inspect every class and token used.

## What's inside

- **22 accessible React component families** — buttons, inputs, toggles, dialogs, toasts, tabs, menus, and a drill-in `PanelStack` for native Chromium side-panel navigation.
- **Design tokens** — Google color palette, semantic colors, spacing, typography, elevation — all exposed as CSS custom properties that mirror Chromium's `cr_shared_vars.css`.
- **Automatic dark mode** — components switch via `prefers-color-scheme`; no provider or setup needed.
- **Zero-runtime styles** — plain CSS, no CSS-in-JS bundle, no emotion/styled-components runtime.
- **SSR-safe** — works with Next.js, Remix, Astro, Docusaurus.
- **Tree-shakeable** — import only what you use.

## Who this is for

- Browser extension developers who want an authentic Chromium look
- Teams building Google-adjacent web surfaces
- LLM coding agents that need a small, well-documented component vocabulary (see the [One-page LLM doc](./one-page.md))

## Next steps

- [Installation](./installation.md)
- [One-page LLM doc](./one-page.md) — everything an LLM needs to start generating code
- [Design tokens](./tokens.md)
- [Button](./components/button.md) — a good first component to play with

## Non-goals

- Not a general-purpose component library — the aesthetic is deliberately narrow.
- Not a compatibility shim for Material Web — we approximate the look, not the API.
- Not a headless UI toolkit — components ship with styling and are opinionated.
