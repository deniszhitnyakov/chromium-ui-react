# chromium-ui-react

[![npm](https://img.shields.io/npm/v/chromium-ui-react?style=flat-square&color=1a73e8&label=npm)](https://www.npmjs.com/package/chromium-ui-react)
[![types](https://img.shields.io/badge/types-TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://github.com/ztnkv/chromium-ui-react)
[![license](https://img.shields.io/badge/license-MIT-1a73e8?style=flat-square)](https://github.com/ztnkv/chromium-ui-react/blob/main/LICENSE)
[![docs](https://img.shields.io/badge/docs-live-1a73e8?style=flat-square)](https://ztnkv.github.io/chromium-ui-react/)

**React components that look and feel like Chromium's native UI.**

Built first and foremost for **Chromium extension developers** who want their popups, side panels, and options pages to feel like first-party Google surfaces rather than generic React apps. Works anywhere React works — including Electron, Tauri, Next.js, Remix, Astro, and Docusaurus.

![Chromium UI React showcase — toolbar, sidebar, card with tabs and form, progress, activity list, buttons, chips, badges, and toasts.](https://raw.githubusercontent.com/ztnkv/chromium-ui-react/main/docs/static/img/showcase-light.v2.png)

## Features

- 21 accessible React components (Button, Input, Toggle, Dialog, Tabs, Menu, Toast, Card, ...)
- Chromium-authentic design tokens mirroring [`cr_shared_vars.css`](https://source.chromium.org/chromium/chromium/src/+/main:ui/webui/resources/css/cr_shared_vars.css)
- Automatic dark mode via `prefers-color-scheme`, or force it with `data-cr-theme="dark"`
- Zero-runtime styling — plain CSS, no CSS-in-JS bundle
- SSR-safe, tree-shakeable ESM + CJS + `.d.ts`
- React 18 and React 19 supported

## Install

```bash
npm install chromium-ui-react
# or
pnpm add chromium-ui-react
# or
yarn add chromium-ui-react
```

Peer dependencies: `react >= 18` and `react-dom >= 18`.

## Usage

Import the stylesheet **once** in your app's entry file, then use components anywhere:

```tsx
// main.tsx / _app.tsx / root layout
import 'chromium-ui-react/styles.css';
```

```tsx
import { Button, Input, Card, CardBody } from 'chromium-ui-react';

export default function SignIn() {
  return (
    <Card variant="outlined">
      <CardBody>
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" />
        <Button variant="action">Sign in</Button>
      </CardBody>
    </Card>
  );
}
```

That's it. Dark mode is already working via `prefers-color-scheme`.

## Tokens without components

If you want the design tokens but plan to write your own components, import the tokens file on its own:

```tsx
import 'chromium-ui-react/tokens.css';
```

Then reference the `--cr-*` custom properties in your own CSS:

```css
.my-custom-panel {
  background: var(--cr-fallback-color-surface);
  color: var(--cr-primary-text-color);
  border-radius: var(--cr-radius-md);
  padding: var(--cr-space-4);
  box-shadow: var(--cr-elevation-1);
}
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

Bundle with [Vite + `@crxjs/vite-plugin`](https://crxjs.dev/vite-plugin) (recommended) or Webpack. Import `chromium-ui-react/styles.css` once in your popup/sidepanel entry.

## Component overview

| Category | Components |
|---|---|
| **Actions** | `Button`, `IconButton`, `Link` |
| **Forms** | `Input`, `Textarea`, `SearchInput`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Toggle`, `ToggleRow` |
| **Tags** | `Badge` |
| **Surfaces** | `Card`, `CardHeader`, `CardBody`, `CardFooter`, `CardTitle`, `CardDescription` |
| **Layout** | `Divider`, `Header`, `List`, `ListItem`, `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell`, `TableHeaderCell` |
| **Navigation** | `Tabs`, `TabList`, `Tab`, `TabPanel`, `TabsSimple`, `Menu`, `MenuItem`, `MenuDivider`, `MenuLabel`, `PanelStack`, `PanelView`, `PanelHeader`, `PanelRow` |
| **Feedback** | `Spinner`, `Progress`, `Toast`, `Dialog`, `Tooltip` |
| **Empty** | `EmptyState` |

Plus the utility `cn(...)` className helper.

## Documentation

Full docs with live previews, prop tables, and a Copy-Markdown-for-your-LLM button on every page:

→ **[ztnkv.github.io/chromium-ui-react](https://ztnkv.github.io/chromium-ui-react/)**

The docs also expose the [One-page LLM doc](https://ztnkv.github.io/chromium-ui-react/one-page) designed to be pasted into a coding agent — everything the agent needs to generate Chromium-styled UI from a single prompt.

Source on GitHub: [github.com/ztnkv/chromium-ui-react](https://github.com/ztnkv/chromium-ui-react).

## Browser support

Chromium-based browsers (Chrome 100+, Edge, Brave, Arc, Opera). Firefox and Safari render fine — the library uses only standard CSS custom properties and modern DOM APIs — but visual parity on non-Chromium browsers is not a design goal.

## License

[MIT](https://github.com/ztnkv/chromium-ui-react/blob/main/LICENSE)
