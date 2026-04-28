---
id: styleguide-layout
title: Layout & shell
slug: /styleguide/layout
description: The shell every Chromium WebUI page shares — toolbar, scrollable content, optional footer, with the measurements and proportions to match.
format: mdx
---

# Layout & shell

Every Chromium surface — settings, bookmarks, history, the side panel, an extension popup — is built from the same three-part shell:

```
┌─────────────────────────────────────────┐
│  Toolbar                                │  fixed, ~56px
├─────────────────────────────────────────┤
│                                         │
│  Content (scrolls)                      │  flex: 1, overflow: auto
│                                         │
├─────────────────────────────────────────┤
│  Footer actions (optional, pinned)      │  ~56–64px
└─────────────────────────────────────────┘
```

Matching the outer proportions of this shell is the first thing your reader's eye picks up. Get it right and almost everything inside the shell will read as native. Get it wrong (a 96px marketing header, no toolbar, centered everything) and nothing below can rescue it.

## The surfaces

Chromium-native UIs built with this library fall into four shapes. Pick one explicitly — do not blur the line.

### 1. Extension popup

Opened from the toolbar icon. Small, fixed size.

| Property | Value |
|---|---|
| Width | 360–420px |
| Height | 480–600px (max 600 before Chrome scrollbars kick in) |
| Toolbar height | 56px |
| Scroll | Content region only |

```tsx live
<div style={{
  width: 380,
  height: 520,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
}}>
  <Toolbar title="Quick capture" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <List>
      <ListItem primary="Save page" secondary="Current tab" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
      <Divider subtle />
      <ListItem primary="Save selection" secondary="Highlighted text only" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
      <Divider subtle />
      <ListItem primary="Save screenshot" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
      <Divider subtle />
      <ListItem primary="Settings" secondary="Where to save, format, shortcut" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
    </List>
  </div>
  <div style={{
    padding: 'var(--cr-space-4)',
    borderTop: '1px solid var(--cr-divider-color)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--cr-space-2)',
  }}>
    <Button>Cancel</Button>
    <Button variant="action">Capture</Button>
  </div>
</div>
```

Note the `Settings` row at the bottom of the list, not a gear `IconButton` in the header — see [Anti-patterns — IconButton glued to a title](./anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).

### 2. Side panel

Opened from the side-panel icon, occupies a column on the side of the browser tab.

| Property | Value |
|---|---|
| Width | 360–400px (user-resizable in Chromium) |
| Height | Full tab height |
| Toolbar height | 56px |
| Scroll | Content region only |
| Navigation | `PanelStack` drill-in — not a sidebar, not tabs |

Layout pattern:

```tsx
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <Toolbar title="Reading list" />
  <PanelStack style={{ flex: 1, minHeight: 0 }}>
    <PanelView id="main">{/* rows, ending with a Settings drill-in row */}</PanelView>
    <PanelView id="detail">{/* ... */}</PanelView>
  </PanelStack>
</div>
```

Do not nest a sidebar inside a side panel — it is already a narrow column. Use drill-in navigation. Do not hang icon buttons off the title; if you need a settings entry point, it is a `PanelRow` at the bottom of the main view, not a gear in the header.

### 3. Full-tab options page

Rendered in a browser tab. Behaves like `chrome://settings` — sidebar of sections on the left, a scrollable content column on the right.

| Property | Value |
|---|---|
| Sidebar width | 240–280px |
| Content max-width | **680px**, with equal gutters |
| Toolbar height | 56px |
| Breakpoint | Below ~768px, the sidebar collapses into a hamburger menu |

```tsx
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <Toolbar title="Settings" />
  <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
    <nav style={{ width: 260, borderRight: '1px solid var(--cr-fallback-color-outline)' }}>
      <Menu role="navigation">
        <MenuItem icon={<span>☆</span>} selected>Appearance</MenuItem>
        <MenuItem icon={<span>🔒</span>}>Privacy</MenuItem>
        <MenuItem icon={<span>🔔</span>}>Notifications</MenuItem>
      </Menu>
    </nav>
    <main style={{ flex: 1, overflowY: 'auto', padding: 'var(--cr-space-6) 0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 var(--cr-space-6)' }}>
        {/* Sections */}
      </div>
    </main>
  </div>
</div>
```

The **680px content max-width** is the single most visually distinctive measurement in Chromium's settings. A settings page that stretches to 1200px instantly reads as non-native.

### 4. In-page injected UI

Banner, floating button, or overlay injected by a content script into a host page. This is the one case where the shell bends — you do not have a toolbar, you are sharing the host page's chrome. Still, stay within the library's primitives (`Card`, `Toast`, `Dialog`), use tokens, and keep the surface small.

## The toolbar

`<Toolbar>` is fixed at the top of every surface shape above. Rules:

- **Height is 56px** — determined by the component. Do not wrap it in a container that forces a different height.
- **Title is left-aligned.** If your surface is narrow (popup/side panel), no icon on the left. If wide (options page), optionally a hamburger or back arrow on the left.
- **Search goes in the middle** (children slot) — usually a `<SearchInput>` that fills available width.
- **The `actions` slot defaults to empty.** `chrome://settings`, `chrome://history`, and a plain popup have *nothing* in this slot. The two narrow cases where you may use it: a single `⋮` overflow `IconButton` at the far right of a full-page manager's toolbar (with the `SearchInput` between it and the title — the `chrome://bookmarks` shape), or a single `Button variant="text"` like "Clear all" when the whole surface has exactly one bulk operation. Do **not** park icon-button shortcuts next to the title — see [Anti-patterns — IconButton glued to a title](./anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).

```tsx live
<Toolbar
  title="Bookmarks"
  actions={<IconButton aria-label="More" icon={<span>⋮</span>} />}
  style={{ border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}
>
  <SearchInput placeholder="Search bookmarks" style={{ flex: 1, maxWidth: 320 }} />
</Toolbar>
```

Do **not** put:

- Icon-button shortcuts (settings gear, "+ add", typography) immediately next to the title — demote them to drill-in rows inside the content area. See [Anti-patterns #16](./anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
- A secondary title below the primary title (use `tall` variant with composed nodes — see [Toolbar](/components/toolbar) — but keep it rare).
- A tab bar inside the toolbar — tabs go *below* it, as a separate strip.
- The app's logo — Chromium surfaces do not have logos. The title text is enough.

## The content region

Below the toolbar. It is the only scrollable area. Inside it you will compose sections and rows — that is [Sections & rows](./sections-and-rows.md).

Rules:

- `overflow-y: auto; overflow-x: hidden;` — never horizontal scroll.
- Vertical padding on the content container is `--cr-space-6` (24px) top and bottom.
- For wide surfaces, center a 680px-max column. For narrow surfaces, content is full-bleed minus a 16px gutter.
- Background is `--cr-fallback-color-surface` (never tinted).

## The footer

Optional, and only used in popups and dialogs. It is a pinned strip with right-aligned action buttons.

- Height: 56–64px (padding `--cr-space-4`, buttons sized `md`).
- Border-top: 1px `--cr-fallback-color-outline`.
- Actions: right-aligned, `[Cancel] [Primary]`. See [Dialogs](./dialogs.md) for button order.

A full-tab options page does **not** have a footer. Settings save inline (toggle flips, selection applies). That is the Chromium convention — no "Save" at the bottom of a settings page.

## Avoid

- **Two scroll regions.** The content region is the only scrollable area. Do not nest another `overflow: auto` inside unless it is a code block or explicitly horizontal data.
- **Horizontal layouts at narrow widths.** At side-panel width (~360px), everything stacks vertically.
- **Sticky section headers.** Chromium uses plain section titles, not sticky ones.
- **Floating action buttons.** There is no FAB pattern in Chromium.
- **Max-width on buttons.** Buttons are content-sized; padding ships the only horizontal slack. There is no full-width affordance — a button stretched edge-to-edge reads as a banner, not a control.

Pick your surface shape, match its shell precisely, and the inside will have the right frame to sit in.
