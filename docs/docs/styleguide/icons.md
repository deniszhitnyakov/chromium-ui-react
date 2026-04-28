---
id: styleguide-icons
title: Icons
slug: /styleguide/icons
description: Icon vocabulary for chromium-ui-react. Material Symbols (outlined, weight 400, 20–24 px) is the canonical set. Unicode glyphs and emoji are not icons.
format: mdx
---

# Icons

`chromium-ui-react` does not ship icons. Components like `IconButton`, `Toolbar`, and `Menu` accept any `ReactNode` for their icon slots — but if your icons do not match the Chromium toolbar register, the surrounding library work is wasted. This page is the recommendation.

## Recommendation: Material Symbols (outlined)

Use **[Material Symbols](https://fonts.google.com/icons)** — Google's modern icon library, the same family used in current Chromium WebUI surfaces.

Defaults that match the library:

- **Style:** Outlined.
- **Weight:** 400.
- **Size:** 20px in dense rows and `IconButton`s; 24px in headers and primary actions; 16px only for inline glyphs in body text.
- **Colour:** `currentColor`. The icon inherits from its parent — let the surrounding component (Button, IconButton, ListItem, Toolbar) set the colour.

```tsx live
<div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'var(--cr-fallback-color-on-surface)' }}>
  <RefreshIcon />
  <MoreVertIcon />
  <CloseIcon />
  <CheckIcon />
  <SearchIcon />
  <SettingsIcon />
  <FolderIcon />
  <PlusIcon />
</div>
```

Three ways to consume the set:

1. **Inline SVG (recommended for small icon counts).** Copy the SVG from the [Material Symbols catalogue](https://fonts.google.com/icons), paste it as a React component. No runtime dependency. The docs site uses this approach — every icon you see in a live preview here is a small inline SVG component.
2. **`@material-symbols/svg-400` npm package.** Tree-shakable per-icon imports. Use this for any extension that needs more than ~20 icons.
3. **Material Symbols variable font** via Google Fonts. Renders icons as glyphs through ligatures (`<span class="material-symbols-outlined">refresh</span>`). Smallest CSS footprint when you have many icons; one font load.

Pick whichever fits your bundle. The library does not depend on any of them — you decide.

## Acceptable alternative: Material Design Icons (community)

[Material Design Icons](https://pictogrammers.com/library/mdi/) is the community fork at `@mdi/react` / `@mdi/font`. Larger catalogue (~7000+ icons), broader topic coverage — useful when Material Symbols does not cover your domain. Visually slightly different from current Chromium (slightly thicker strokes, more rounded terminals). Acceptable, but if both sets cover your icon, prefer Material Symbols.

## Sizing in components

| Where | Size |
|---|---|
| `IconButton` (default) | 20px |
| `Toolbar` action `IconButton` | 20px |
| `Button` `startIcon` / `endIcon` | 16px |
| `ListItem` leading icon | 20px |
| `Menu` item icon | 18–20px |
| `EmptyState` illustration | 48–64px |
| Inline body-text glyph | 16px |

There are no other sizes. If your icon needs to be 28px or 32px, you are probably wanting a Badge or an EmptyState illustration, not an icon.

## What not to use

- **Unicode glyphs.** `⋮`, `↻`, `✓`, `✕`, `›`, `↩`, `⌘`, `⏎` — these render at inconsistent baselines, weights, and sizes per OS, depend on the system font, and look nothing like Chromium's actual icons. See [Anti-pattern #23](./anti-patterns.md#23-unicode-characters-as-icons).
- **Emoji as icons.** `🔒`, `🔔`, `📁`, `🌐`, `⭐`, `🗑️` — these render as colourful rasterised glyphs on most platforms and undercut every claim the library makes about Chromium-authentic visuals.
- **Mixed sets in the same surface.** Pick one — Material Symbols outlined, full stop. Do not mix outlined and rounded styles, do not mix Material Symbols with Heroicons, do not import Lucide for "the one missing icon". Visual register comes from consistency.

## Naming convention (suggested)

Whatever your import mechanism, name the React components after the Material Symbol name (snake_case → PascalCase + `Icon` suffix): `more_vert` → `MoreVertIcon`, `chevron_right` → `ChevronRightIcon`, `delete` → `TrashIcon` (rename for clarity — `DeleteIcon` collides with the JS keyword in some toolchains).
