---
id: styleguide-sample-tab-manager
title: Sample — Tab Manager extension
slug: /styleguide/samples/tab-manager
description: A full-tab manager UI for browsing, grouping, and closing tabs — built on the two-pane Bookmarks manager pattern.
format: mdx
---

# Sample — Tab Manager

A fictional extension that replaces the new-tab page with a tab manager: windows and groups on the left, tabs on the right, search and bulk actions in the toolbar. This is the **full-tab manager** counterpart to the popup-first Link Collector and the side-panel-first Reader Mode.

The shape follows [`chrome://bookmarks`](../patterns/bookmarks-manager.md) almost exactly — that is deliberate. Users already know how to operate this layout.

## The manager

```tsx live
<div style={{
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  height: 640,
  display: 'flex',
  flexDirection: 'column',
}}>
  <Toolbar
    title="Tab Manager"
    actions={
      <>
        <IconButton aria-label="New group" icon={<span>＋</span>} />
        <IconButton aria-label="Sort" icon={<span>⇅</span>} />
        <IconButton aria-label="More" icon={<span>⋮</span>} />
      </>
    }
  >
    <SearchInput placeholder="Search tabs by title or URL" style={{ flex: 1, maxWidth: 400 }} />
  </Toolbar>
  <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
    <nav style={{
      width: 240,
      borderRight: '1px solid var(--cr-fallback-color-outline)',
      padding: '8px 0',
      overflowY: 'auto',
    }}>
      <Menu role="tree">
        <MenuLabel>Windows</MenuLabel>
        <MenuItem icon={<span>🪟</span>} selected>This window (14)</MenuItem>
        <MenuItem icon={<span>🪟</span>}>Laptop (7)</MenuItem>
        <MenuDivider />
        <MenuLabel>Groups</MenuLabel>
        <MenuItem icon={<span style={{ color: 'var(--cr-fallback-color-primary)' }}>●</span>}>Chromium UI (4)</MenuItem>
        <MenuItem icon={<span style={{ color: '#e8710a' }}>●</span>}>Recipes (3)</MenuItem>
        <MenuItem icon={<span style={{ color: '#1e8e3e' }}>●</span>}>Reading (5)</MenuItem>
        <MenuDivider />
        <MenuItem icon={<span>🕒</span>}>Recently closed</MenuItem>
        <MenuItem icon={<span>💤</span>}>Sleeping tabs</MenuItem>
      </Menu>
    </nav>
    <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--cr-fallback-color-on-surface-subtle)',
          padding: '0 4px 8px',
        }}>
          Chromium UI · 4 tabs
        </div>
        <Card variant="elevated" style={{ marginBottom: 16 }}>
          <List>
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="Chromium UI React — Overview"
              secondary="ztnkv.github.io/chromium-ui-react"
              interactive
              selected
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
            <Divider subtle />
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="Styleguide — Principles"
              secondary="ztnkv.github.io/chromium-ui-react/styleguide/principles"
              interactive
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
            <Divider subtle />
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="Component — PanelStack"
              secondary="ztnkv.github.io/chromium-ui-react/components/panel-stack"
              interactive
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
            <Divider subtle />
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="Tokens reference"
              secondary="ztnkv.github.io/chromium-ui-react/tokens"
              interactive
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
          </List>
        </Card>
        <div style={{
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--cr-fallback-color-on-surface-subtle)',
          padding: '8px 4px 8px',
        }}>
          Ungrouped · 10 tabs
        </div>
        <Card variant="elevated">
          <List>
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="React"
              secondary="react.dev"
              interactive
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
            <Divider subtle />
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="TypeScript: Documentation"
              secondary="typescriptlang.org"
              interactive
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
            <Divider subtle />
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="MDN — CSS custom properties"
              secondary="developer.mozilla.org"
              interactive
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
            <Divider subtle />
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="Figma — Chromium design tokens"
              secondary="figma.com/file/…"
              interactive
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
            <Divider subtle />
            <ListItem
              icon={<span style={{ fontSize: 14 }}>🌐</span>}
              primary="Hacker News"
              secondary="news.ycombinator.com"
              interactive
              end={<IconButton aria-label="Close tab" icon={<span style={{ fontSize: 12 }}>✕</span>} />}
            />
          </List>
        </Card>
      </div>
    </main>
  </div>
</div>
```

### Design decisions

- **Two-pane shell** from the Bookmarks manager pattern: 240px tree on the left, scrollable main column on the right with a 960px max-width — wider than settings (680px) because tab rows need horizontal room for URL + metadata.
- **Tree pane is a flat `Menu role="tree"`**, no card, just a 1px right border. `MenuLabel` separates "Windows" from "Groups".
- **Colored dots next to group names** are the only saturated-color spots in the UI — they mirror Chromium's tab-group chips. Use the `--cr-fallback-color-primary` token for the "active group" and explicit hex for other group colors (Chromium's group colors are fixed, not theme tokens).
- **Groups rendered as sections** in the main pane. Each section has an 11px all-caps header (count included) above an elevated card. This is the one place 11px all-caps is acceptable inside a manager: *per-group labeling* — analogous to the "Unread" / "Pages you've read" labels in the reading-list side panel.
- **One overflow IconButton per row.** "Close tab" is the only always-visible action because closing is the manager's primary per-row verb (parallel to "mark as read" in reading list). Moving to group, pinning, muting — all go in a per-row overflow `⋮` in the real product.
- **No per-row checkbox.** Selection is click-with-shift/cmd, just like `chrome://bookmarks` and `chrome://history`.

## Selection mode

Click-and-drag or shift-click to select multiple tabs. The toolbar swaps into selection mode — this is the `chrome://history` pattern:

```tsx live
<div style={{
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
}}>
  <Toolbar
    title="5 selected"
    actions={
      <>
        <IconButton aria-label="Close selected" icon={<span>✕</span>} />
        <IconButton aria-label="Move to group" icon={<span>📁</span>} />
        <IconButton aria-label="Bookmark all" icon={<span>☆</span>} />
        <IconButton aria-label="More" icon={<span>⋮</span>} />
      </>
    }
  >
    <IconButton aria-label="Exit selection" icon={<span>✕</span>} />
  </Toolbar>
</div>
```

- **Title becomes the count.** Not "5 tabs selected" — just "5 selected", matching Chromium.
- **Exit control is a leading `✕` `IconButton`**, not a text button.
- **Max four icon actions** in the actions slot. If you need more, the fifth goes in `⋮ More`.

## Bulk close confirmation

Closing many tabs is destructive — confirm before doing it:

```tsx live noInline
function BulkCloseDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Close 23 tabs</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Close 23 tabs?"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Close tabs</Button>
          </>
        }
      >
        <div style={{ width: 420 }}>
          These tabs will close immediately. You can restore them from <strong>Recently closed</strong> for the next 24 hours.
        </div>
      </Dialog>
    </>
  );
}
render(<BulkCloseDemo />);
```

- Title repeats the count so the user confirms the actual number, not a generic "are you sure".
- Body tells the user *how* to recover — half of the fear of destructive actions is not knowing if they are truly irreversible.
- `[Cancel] [Close tabs]` right-aligned, destructive on the right.

## Sort menu

Three sort modes fit in an overflow `Menu` behind the toolbar's sort `IconButton`:

```tsx live
<div style={{ position: 'relative', display: 'inline-block' }}>
  <Menu style={{ minWidth: 200 }}>
    <MenuLabel>Sort tabs by</MenuLabel>
    <MenuItem selected>Recently used</MenuItem>
    <MenuItem>Title (A–Z)</MenuItem>
    <MenuItem>Domain</MenuItem>
    <MenuItem>Time open</MenuItem>
    <MenuDivider />
    <MenuItem>Reverse order</MenuItem>
  </Menu>
</div>
```

- `selected` checkmark on the current mode.
- "Reverse order" is separated by `MenuDivider` because it is a modifier, not a mode.

## Empty window

When a window has no tabs open (selected "Recently closed" on an empty day, for instance):

```tsx live
<div style={{
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  padding: 48,
  display: 'flex',
  justifyContent: 'center',
}}>
  <EmptyState
    title="Nothing recently closed"
    description="Tabs you close will appear here for 24 hours so you can restore them."
  />
</div>
```

No action button — there is nothing to do here yet. The empty state is purely informational, and that is fine. Adding a fake "Browse the web" button would be patronizing.

## What makes this Chromium-native

- ✅ Two-pane manager shell (tree + main), exactly the `chrome://bookmarks` shape.
- ✅ 56px `<Toolbar>` with title + `SearchInput` (maxWidth 400) + 2–3 `IconButton`s.
- ✅ Tree pane flat (no card), 240px, 1px right border.
- ✅ Main column centered, 960px max-width, 24px outer padding.
- ✅ Row actions are `IconButton` only; multi-action rows use `⋮ More`.
- ✅ Selection mode swaps the toolbar instead of stacking a second strip.
- ✅ Destructive confirmations have a count in the title and recovery info in the body.
- ✅ Sort behind one `IconButton` + `Menu`, not three buttons in the toolbar.
- ✅ No tabs at the top, no accordion, no per-row checkbox.

## What to reuse

Across all three sample extensions — Link Collector (popup + options), Reader Mode (side panel), and Tab Manager (full-tab manager) — the same primitives recur:

| Surface | Shell | Nav | Row unit |
|---|---|---|---|
| Popup | 380×520 bordered box + `Toolbar` | None / `PanelStack` | Row list inside form |
| Side panel | 360–400 wide + 48px custom header | `PanelStack` drill-in | `ListItem` with trailing `IconButton` |
| Full-tab manager | Viewport + 56px `Toolbar` | 240px `Menu role="tree"` | `ListItem` inside elevated card |
| Full-tab options | Viewport + 56px `Toolbar` | 240px `Menu role="navigation"` | `ListItem` inside elevated card, `<h2>` per section |

Pick the row-based shell appropriate to your surface and the rest follows.
