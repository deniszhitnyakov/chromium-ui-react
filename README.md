<div align="center">

# chromium-ui-react

**A React component library that looks and feels like Chromium itself.**

Chromium-native UI primitives for building browser extensions, companion apps, and internal tools that feel like first-party Google surfaces — not yet another bespoke web dashboard.

[![npm version](https://img.shields.io/npm/v/chromium-ui-react?style=flat-square&color=1a73e8&label=npm)](https://www.npmjs.com/package/chromium-ui-react)
[![npm downloads](https://img.shields.io/npm/dm/chromium-ui-react?style=flat-square&color=34a853&label=downloads)](https://www.npmjs.com/package/chromium-ui-react)
[![bundle size](https://img.shields.io/bundlephobia/minzip/chromium-ui-react?style=flat-square&color=4285f4&label=min%2Bgzip)](https://bundlephobia.com/package/chromium-ui-react)
[![types](https://img.shields.io/npm/types/chromium-ui-react?style=flat-square&color=3178c6)](./packages/chromium-ui-react)
[![license](https://img.shields.io/badge/license-MIT-1a73e8?style=flat-square)](./LICENSE)
[![docs](https://img.shields.io/badge/docs-live-1a73e8?style=flat-square&logo=readthedocs&logoColor=white)](https://ztnkv.github.io/chromium-ui-react/)
[![CI](https://img.shields.io/github/actions/workflow/status/ztnkv/chromium-ui-react/deploy-docs.yml?style=flat-square&label=docs%20deploy&logo=githubactions&logoColor=white)](https://github.com/ztnkv/chromium-ui-react/actions)
[![GitHub stars](https://img.shields.io/github/stars/ztnkv/chromium-ui-react?style=flat-square&color=fbbc04&logo=github)](https://github.com/ztnkv/chromium-ui-react/stargazers)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-1a73e8?style=flat-square)](./CONTRIBUTING.md)

**[→ Open the documentation site](https://ztnkv.github.io/chromium-ui-react/)**

</div>

![Chromium UI React showcase — light mode. Toolbar with search, sidebar menu, account preferences card with tabs and form, sync status with progress, recent activity list, buttons, chips, badges, and toasts.](docs/static/img/showcase-light.v2.png#gh-light-mode-only)
![Chromium UI React showcase — dark mode. Same layout on a dark surface.](docs/static/img/showcase-dark.v2.png#gh-dark-mode-only)

<div align="center">
<sub>
  Light/dark swap automatically based on your GitHub theme. Source HTML at <a href="docs/static/showcase/index.html">docs/static/showcase/index.html</a> — served at <a href="https://ztnkv.github.io/chromium-ui-react/showcase/index.html">ztnkv.github.io/chromium-ui-react/showcase/index.html</a>.
</sub>
</div>

---

## Why this exists

Every time someone builds a browser extension popup, a side-panel UI, or a DevTools-adjacent tool, they face the same choice:

- Pull in Material Web and fight its aesthetic until it looks "close enough" to Chromium.
- Reach for shadcn / Radix / Mantine and accept that their extension will look like a generic React app wearing a browser.
- Hand-roll CSS from scratch, reinventing Chromium's palette, spacing, and interaction rules.

`chromium-ui-react` is the fourth option: **actual Chromium styling, pre-wrapped in React components**. Colors, spacing, typography, elevation, focus rings, dark mode — all mirror Chromium's internal `cr_elements` design system (the one used inside `chrome://settings`, `chrome://bookmarks`, side-panel UIs, and the rest of Chromium's WebUI surfaces).

It's built first and foremost for **Chromium extension developers**, but nothing about it is extension-specific — it works equally well in:

- Electron and Tauri apps that want a Google-adjacent feel
- Admin panels and internal tools for Chromium-adjacent products
- Web apps that complement Chromium (companion sites, onboarding flows)
- Docusaurus / Astro / Next.js sites where you want a native-browser aesthetic

## Highlights

- **21 accessible React components** — Button, Input, Toggle, Dialog, Tabs, Menu, Toast, and more
- **Chromium-authentic design tokens** — Google color palette (blue / green / red / yellow / grey), 4 / 8 / 12 / 16 px spacing scale, Roboto typography, `cr_shared_vars.css`-aligned elevation
- **Automatic dark mode** via `prefers-color-scheme` — no provider, no context, no setup
- **Zero-runtime styling** — plain CSS, no CSS-in-JS bundle bloat
- **SSR-safe** — works with Next.js, Remix, Astro, Docusaurus out of the box
- **Tree-shakeable** — ESM + CJS builds, import only what you use
- **Strictly typed** — ships with full `.d.ts` declarations
- **LLM-ready documentation** — every docs page has a **Copy Markdown** button, plus a dedicated **One-page LLM doc** designed to be pasted into a coding agent

## Quick start

```bash
npm install chromium-ui-react
```

```tsx
import 'chromium-ui-react/styles.css';
import { Button, Input, Card, CardBody } from 'chromium-ui-react';

export default function SignIn() {
  return (
    <Card variant="outlined">
      <CardBody>
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" />
        <Button variant="action" fullWidth>
          Sign in
        </Button>
      </CardBody>
    </Card>
  );
}
```

That's it. Dark mode works automatically; no context provider, no setup.

Full documentation lives in [`docs/`](./docs) and is served as a Docusaurus site — see [Running the docs locally](#running-the-docs-locally).

## Repository layout

This repository is a small npm workspaces monorepo:

```
.
├── packages/
│   └── chromium-ui-react/      # the published library (react + css)
├── docs/                        # Docusaurus 3 documentation site
│   ├── docs/                    # markdown pages (25 total)
│   ├── plugins/raw-markdown/    # "Copy Markdown" plugin
│   └── src/theme/               # swizzled DocItem for Copy Markdown button
├── package.json                 # workspaces root
└── tsconfig.base.json           # shared TypeScript config
```

## Running the docs locally

```bash
npm install
npm run dev:docs            # http://localhost:3000
```

Or to develop the library and the docs in parallel:

```bash
npm run dev                 # library (vite --watch) + docs site
```

## Building

```bash
npm run build:lib           # bundle the library to packages/chromium-ui-react/dist
npm run build:docs          # build the static docs site to docs/build
```

## LLM-friendly docs

Every documentation page has a **Copy Markdown** button in its header. Clicking it copies the raw source markdown for that page — perfect for pasting into ChatGPT, Claude, Cursor, or any coding agent that needs a focused reference for the component you're using.

In addition to the per-component pages, there's a dedicated **[One-page LLM doc](https://ztnkv.github.io/chromium-ui-react/one-page)** that fits the entire library (tokens, all 21 components, composition examples) into a single copy-pasteable document. Give it to an agent once and they can generate the rest of your extension UI from there.

**Live site: [ztnkv.github.io/chromium-ui-react](https://ztnkv.github.io/chromium-ui-react/)**

## Browser support

Chrome, Edge, Brave, Arc, Opera, and any Chromium-based browser (v100+). Firefox and Safari work — the library uses standard CSS custom properties and modern DOM APIs — but the design is Chromium-native by intent, so visual parity on non-Chromium browsers is not a goal.

## Contributing

Contributions, bug reports, and design feedback are welcome. Before opening a PR:

1. Check that your change matches the Chromium aesthetic — when in doubt, open `chrome://settings` or `chrome://bookmarks` for reference.
2. Keep the zero-runtime / plain-CSS rule. No `styled-components`, no `emotion`, no runtime theming engines.
3. If you're adding a component, mirror the existing `packages/chromium-ui-react/src/components/<Name>/` layout: `<Name>.tsx`, `<Name>.css`, `index.ts`.
4. Add a documentation page under `docs/docs/components/` following the template of the existing ones.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more detail once it's written.

## Authors

Built by **Claude Opus 4.7**, **Denis Zhitnyakov**, and contributors.

Most of the code, component implementations, and the documentation site in this repository were generated pair-programming with Anthropic's Claude Opus 4.7. Human-side direction, API decisions, and review by Denis Zhitnyakov. Additional contributors listed in the git history.

## Acknowledgements

This library is an unofficial, community-built approximation of the design language used by the Chromium project. It is not affiliated with, endorsed by, or produced by Google or The Chromium Authors. "Chrome" and "Chromium" are trademarks of Google LLC.

Visual inspiration comes from:

- [Chromium `cr_elements`](https://source.chromium.org/chromium/chromium/src/+/main:ui/webui/resources/cr_elements/) — the source of truth for WebUI components
- [`cr_shared_vars.css`](https://source.chromium.org/chromium/chromium/src/+/main:ui/webui/resources/css/cr_shared_vars.css) — design tokens
- [Material Web](https://github.com/material-components/material-web) — Chromium shares lineage with Material

---

Licensed under the [MIT License](./LICENSE).
