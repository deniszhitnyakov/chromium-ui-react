---
id: styleguide-navigation
title: Navigation
slug: /styleguide/navigation
description: When to use Tabs, PanelStack, a sidebar Menu, or plain drill-in rows. Chromium uses each in specific circumstances.
format: mdx
---

# Navigation

Chromium has four distinct navigation primitives, and each one has a precise job. Picking the wrong primitive is the most common "why does this feel off" bug in LLM-generated UIs. This page is about which primitive to reach for, not how to use each one (the [Components](/components/button) docs cover that).

## The decision

```
Is the surface wider than ~768px?
├── No  →  Use PanelStack + PanelRow navigateTo.
└── Yes →
    Are there 3+ top-level areas (settings, appearance, privacy, …)?
    ├── Yes →  Left-hand Menu role="navigation" as a sidebar.
    └── No  →  One content column; use drill-in rows (or Tabs if switching between *views* of the same data).
```

Expanded:

| Surface | Navigation primitive |
|---|---|
| Extension popup (360–420px) | `PanelStack` — drill in to subpages |
| Side panel (360–400px) | `PanelStack` — drill in to subpages |
| Full-tab options page, single area | 680px centered column + drill-in rows → router-backed subpages |
| Full-tab options page, 3+ areas | Sidebar `Menu role="navigation"` + content column |
| Switching between views of one data set | `Tabs` inside the content region |
| Extensions, bookmarks manager, history | `Header` + content, with filtering in the toolbar itself |

## 1. PanelStack — for narrow surfaces

`PanelStack` is the Chromium native pattern for narrow surfaces (side panels, popups). Click a row, a sub-page slides in from the right; a back arrow slides it back. Depth is unlimited.

**Use when:** side panel, popup, any surface under ~400px wide.

**Do not use when:** the surface is wide enough for a sidebar (≥768px). In that case, a sidebar is more scannable.

```tsx live
<div style={{
  width: 360,
  height: 480,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
}}>
  <PanelStack defaultView="main">
    <PanelView id="main">
      <PanelHeader title="Reading list" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <PanelRow primary="Unread" secondary="12 items" end={<Badge>12</Badge>} navigateTo="unread" />
        <PanelRow primary="Pages you've read" secondary="42 items" navigateTo="read" />
        <PanelRow primary="Recently closed" secondary="5 items" navigateTo="closed" />
      </div>
    </PanelView>
    <PanelView id="unread">
      <PanelHeader title="Unread" back />
      <div style={{ padding: 16, color: 'var(--cr-fallback-color-on-surface-subtle)', fontSize: 13 }}>
        (items go here)
      </div>
    </PanelView>
    <PanelView id="read">
      <PanelHeader title="Pages you've read" back />
      <div style={{ padding: 16 }} />
    </PanelView>
    <PanelView id="closed">
      <PanelHeader title="Recently closed" back />
      <div style={{ padding: 16 }} />
    </PanelView>
  </PanelStack>
</div>
```

## 2. Sidebar Menu — for wide multi-area pages

For full-tab options pages with 3+ top-level areas, Chromium uses a left-hand persistent sidebar. The sidebar is a `Menu role="navigation"` at a fixed width (`266px` in `chrome://settings`). Below a 980px viewport, Chromium collapses the sidebar into a hamburger drawer.

**Use when:** full-tab options page (or Electron/Tauri window) with 3+ top-level areas.

**Do not use when:** the surface is narrow — the sidebar eats too much width.

```tsx live
<div style={{
  display: 'flex',
  height: 360,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 8,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
}}>
  <nav style={{ width: 240, borderRight: '1px solid var(--cr-fallback-color-outline)' }}>
    <Menu role="navigation">
      <MenuItem selected>Appearance</MenuItem>
      <MenuItem>Privacy and security</MenuItem>
      <MenuItem>Autofill</MenuItem>
      <MenuItem>Search engine</MenuItem>
      <MenuDivider />
      <MenuItem>About</MenuItem>
    </Menu>
  </nav>
  <main style={{ flex: 1, padding: 24, color: 'var(--cr-fallback-color-on-surface-subtle)', fontSize: 13 }}>
    Content for the selected area.
  </main>
</div>
```

Width guidelines:

- Sidebar: 240–280px. Chromium's is 266px.
- Content: 680px max-width, centered in the remaining space.
- Below 980px: collapse sidebar into a hamburger-button drawer. In this library, gate on `window.innerWidth` or a media query.

## 3. Tabs — for views of one thing

`Tabs` switch between views of the **same subject**. Use sparingly. In Chromium they appear:

- Inside a section of settings ("Basic / Advanced").
- At the top of a side panel's content to filter a list (not as top-level navigation).
- Inside `chrome://inspect` to pick a device category.

**Do not use tabs for top-level app navigation.** That is what the sidebar or `PanelStack` is for.

```tsx live
<TabsSimple
  defaultValue="basic"
  tabs={[
    {
      value: 'basic',
      label: 'Basic',
      content: (
        <Card variant="elevated" style={{ marginTop: 16 }}>
          <List>
            <ListItem primary="Browsing history" end={<Toggle defaultChecked />} />
            <Divider subtle />
            <ListItem primary="Cookies and other site data" end={<Toggle defaultChecked />} />
            <Divider subtle />
            <ListItem primary="Cached images and files" end={<Toggle defaultChecked />} />
          </List>
        </Card>
      ),
    },
    {
      value: 'advanced',
      label: 'Advanced',
      content: (
        <Card variant="elevated" style={{ marginTop: 16 }}>
          <List>
            <ListItem primary="Download history" end={<Toggle />} />
            <Divider subtle />
            <ListItem primary="Passwords and other sign-in data" end={<Toggle />} />
            <Divider subtle />
            <ListItem primary="Autofill form data" end={<Toggle />} />
            <Divider subtle />
            <ListItem primary="Site settings" end={<Toggle />} />
            <Divider subtle />
            <ListItem primary="Hosted app data" end={<Toggle />} />
          </List>
        </Card>
      ),
    },
  ]}
/>
```

Rules:

- Tab labels are short (one or two words): Basic / Advanced. Not "Configure basic options."
- Two or three tabs, rarely four, never five. Five tabs are a sidebar.
- The tab strip is **below** the toolbar, not inside it. Do not nest tabs into `<Header>`.
- Tabs apply to *one* area of content. Do not have a second row of tabs below the first.

## 4. Drill-in rows — for occasional subpages

On a full-tab options page, most settings are on the main column. When a setting has sub-settings, it becomes a row with `navigateTo`/`onClick` leading to a subpage at its own URL.

This is how `chrome://settings/privacy` works — it is a subpage, not a tab, not a panel. On full-tab surfaces, a router handles the URL change; on side panels, `PanelStack` handles it in-memory.

```tsx live
<Card variant="elevated" style={{ maxWidth: 520 }}>
  <List>
    <ListItem
      primary="Site Settings"
      secondary="Controls what information sites can use and show"
      interactive
      end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
    />
    <Divider subtle />
    <ListItem
      primary="Customize Chrome"
      secondary="Change theme, color, and layout"
      interactive
      end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
    />
    <Divider subtle />
    <ListItem
      primary="Manage keyboard shortcuts"
      interactive
      end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
    />
  </List>
</Card>
```

The secondary line, where used, summarizes the current value — users learn state without leaving the top-level page.

## Breadcrumbs

Chromium does **not** use breadcrumbs in its WebUI. A subpage has a back arrow on the left of its toolbar (`<PanelHeader back />` or a custom `<IconButton icon={<Back />} />` + `<Header title="…" />`). That is it.

If you feel a breadcrumb would help, your subpage depth is probably too deep. Flatten.

## A common misuse: tabs as app navigation

The single most common anti-pattern is:

```tsx
<TabsSimple tabs={[
  { value: 'home',     label: 'Home',     content: <HomePage /> },
  { value: 'library',  label: 'Library',  content: <LibraryPage /> },
  { value: 'settings', label: 'Settings', content: <SettingsPage /> },
]} />
```

This is a mobile app pattern, not a Chromium pattern. On narrow surfaces, use `PanelStack`. On wide, use a sidebar `Menu`. Reserve `Tabs` for in-view switches.

## Search as navigation

On `chrome://settings`, the search field in the toolbar is a navigation primitive in its own right: typing jumps to the matching section. This is a nice polish, not a requirement. If you add it, the behavior should be:

- Typing filters the visible sections.
- Hitting Enter jumps to the top match.
- Clearing the search restores the full list.

Do not make the search a separate "Search results page" — the filtering happens inline.

## Keyboard

Every navigation primitive in this library responds to keyboard:

- `Tab` moves between focusable items.
- `Enter` / `Space` activates.
- Arrow keys move between sibling items in a `Menu role="navigation"` if you add them (the library does not auto-install a roving tabindex — see [Menu docs](/components/menu)).
- `Esc` goes back one level in `PanelStack` if you wire it to `pop()`.

Do not ship a navigation UI that works only with a mouse — it fails WCAG and fails Chromium's own convention.

## Avoid

- **Tabs as top-level app navigation.**
- **A sidebar on a narrow surface.** Use `PanelStack`.
- **A second-level tab strip.** One row of tabs, not two.
- **A floating action button.** Chromium does not use FABs.
- **Breadcrumbs.** See above.
- **A "Home" breadcrumb chip in the toolbar.** The back arrow is the affordance.
- **Persistent bottom navigation (mobile-app pattern).** Not a Chromium pattern.

Pick one primitive per surface. Stick with it. Almost every layout resolves to one of the four choices above.
