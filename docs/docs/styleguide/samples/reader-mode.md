---
id: styleguide-sample-reader-mode
title: Sample — Reader Mode extension
slug: /styleguide/samples/reader-mode
description: A side-panel extension that strips page chrome and presents a readable version. Demonstrates PanelStack, the 48px side-panel header, and settings drill-in.
format: mdx
---

# Sample — Reader Mode

A fictional extension that opens in the side panel and renders a cleaned-up, readable version of the current tab's article. This is a **side-panel-first** extension, so it uses the 48px header and `PanelStack` drill-in.

## The panel

```tsx live
<div style={{
  width: 400,
  height: 640,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <PanelStack defaultView="reader" style={{ flex: 1, minHeight: 0 }}>
    <PanelView id="reader">
      <div style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderBottom: '1px solid var(--cr-fallback-color-outline)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Reader Mode
        </div>
      </div>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        fontFamily: 'Georgia, serif',
        color: 'var(--cr-fallback-color-on-surface)',
      }}>
        <div style={{ padding: '24px 24px 32px' }}>
          <div style={{ fontSize: 12, color: 'var(--cr-fallback-color-on-surface-subtle)', marginBottom: 4 }}>
            practicaltypography.com · 12 min read
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 500, margin: '0 0 16px' }}>
            The Elements of Typographic Style Applied to the Web
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 12px' }}>
            The web is mostly text. And what is a good web typography, anyway? Good web typography is typography that is nearly invisible — the reader neither notices nor thinks about it.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 12px' }}>
            Yet bad web typography is obvious, jarring, distracting. It gets in the way. The role of the typographer is to set type so that readers get absorbed, and stay absorbed, in the content.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 12px' }}>
            If you take nothing else from this guide, take the practice of rigorous, unsentimental revision. A quality document is not typed fast and published — it is built, revised, reviewed.
          </p>
        </div>
        <List>
          <Divider subtle />
          <ListItem
            primary="Reader settings"
            secondary="Font, size, spacing, background"
            interactive
            end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
          />
        </List>
      </div>
    </PanelView>
    <PanelView id="settings">
      <PanelHeader title="Reader settings" back />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <List>
          <ListItem primary="Font family" end={<Select defaultValue="serif" options={[{ value: 'serif', label: 'Serif' }, { value: 'sans', label: 'Sans-serif' }, { value: 'mono', label: 'Monospace' }]} />} />
          <Divider subtle />
          <ListItem primary="Font size" end={<Select defaultValue="md" options={[{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }, { value: 'xl', label: 'Very large' }]} />} />
          <Divider subtle />
          <ListItem primary="Line spacing" end={<Select defaultValue="normal" options={[{ value: 'tight', label: 'Tight' }, { value: 'normal', label: 'Normal' }, { value: 'loose', label: 'Loose' }]} />} />
          <Divider subtle />
          <ListItem primary="Background" end={<Select defaultValue="white" options={[{ value: 'white', label: 'White' }, { value: 'sepia', label: 'Sepia' }, { value: 'dark', label: 'Dark' }]} />} />
          <Divider subtle />
          <ListItem primary="Use system fonts" secondary="Match the OS default reading font" end={<Toggle />} />
          <Divider subtle />
          <ListItem primary="Show images" end={<Toggle defaultChecked />} />
        </List>
      </div>
    </PanelView>
  </PanelStack>
</div>
```

### Design decisions

- **Custom 48px header, title-only.** Side-panel convention. The header does **not** carry icon-button shortcuts (no Typography, Settings, or overflow icons next to the title) — that is [Anti-pattern #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header). It eats horizontal space that is already scarce at 400px and makes the panel read as a generic webapp rather than a Chromium surface.
- **Reader content** uses a different font family (Georgia) and larger sizes (15–20px) *inside* a content block. This is the one acceptable place to use display-like sizes: article content, not UI chrome.
- **`Reader settings` drill-in row** pinned at the end of the article is the single access point for font / size / background controls. It is a full-width row with a chevron — matches the Chromium drill-in convention.
- **Settings drill-in** is a list of inline-control rows (`Select`, `Toggle`) — the classic Chromium settings pattern, reused in the panel.

## Quick typography menu (optional)

If you want a lighter-weight access point than drilling into the full settings view, render a compact `Menu` with font/size pickers inside the settings view (as a first group, above the full options) — or open it via a secondary trigger *inside the content* (for example, a `Button` at the end of the article). Do **not** wire it to an `IconButton` in the header.

```tsx live
<div style={{ position: 'relative', display: 'inline-block' }}>
  <Menu style={{ minWidth: 240 }}>
    <MenuLabel>Typography</MenuLabel>
    <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.4px',
          color: 'var(--cr-fallback-color-on-surface-subtle)',
          marginBottom: 8,
          textTransform: 'uppercase',
        }}>
          Font
        </div>
        <RadioGroup orientation="horizontal" defaultValue="serif">
          <Radio value="serif" label="Serif" />
          <Radio value="sans" label="Sans" />
          <Radio value="mono" label="Mono" />
        </RadioGroup>
      </div>
      <div>
        <div style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.4px',
          color: 'var(--cr-fallback-color-on-surface-subtle)',
          marginBottom: 8,
          textTransform: 'uppercase',
        }}>
          Size
        </div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
          <IconButton aria-label="Smaller" icon={<span style={{ fontSize: 12 }}>A-</span>} />
          <div style={{ alignSelf: 'center', fontSize: 13 }}>Medium</div>
          <IconButton aria-label="Larger" icon={<span style={{ fontSize: 16 }}>A+</span>} />
        </div>
      </div>
    </div>
    <MenuDivider />
    <MenuItem>Reset to defaults</MenuItem>
  </Menu>
</div>
```

Note the 10px weight-500 letter-spaced labels — the canonical Chromium form-field label style, used inside this menu because we are labelling controls.

## Handling the close affordance

Side panels are closed by the browser's own "close" control (the chevron on the side-panel chrome). Your extension does not own that affordance. Do not render a close button inside the panel header — it duplicates the browser's.

## What makes this Chromium-native

- ✅ 48px side-panel header, title-only (not 56px `<Toolbar>`, no `IconButton`s next to the title).
- ✅ `PanelStack` for settings drill-in.
- ✅ Content region with its own typography, clearly separated from the UI chrome.
- ✅ Row list of inline-control rows for settings.
- ✅ Settings entry point is a drill-in row at the end of the content, not a gear in the header.
- ✅ No footer (side panels rarely need one — drill-in rows replace header actions).
- ✅ No second-level tabs; drill-in only.

## What to reuse

Copy the 48px custom header code block if you are rolling a side-panel extension — the library does not ship a shorter `<Toolbar>` variant, so you compose one manually. Keep it **title-only**; demote any entry points (Settings, Typography, More) to drill-in rows inside the content, matching Chromium's reading-list / bookmarks side-panel shape.

```tsx
<div style={{
  height: 48,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  borderBottom: '1px solid var(--cr-fallback-color-outline)',
}}>
  <div style={{ fontSize: 14, fontWeight: 500 }}>Your panel</div>
</div>
```

This matches Chromium's `--cr-sidepanel-header-height: 48px`.
