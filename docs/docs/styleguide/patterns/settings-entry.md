---
id: styleguide-pattern-settings-entry
title: Pattern — Settings entry
slug: /styleguide/patterns/settings-entry
description: Where the settings drill-in row goes inside an extension surface, and what to call it. Two rules — consistent label, consistent placement.
format: mdx
---

# Pattern — Settings entry

Almost every extension surface (popup, side panel, options page) has a place where the user adjusts how the tool behaves. This page codifies two rules for that affordance — what to call it, and where to put it — so users moving between extensions in the wild see the same word in roughly the same place.

The two rules:

1. **Always label it `Settings`.** Sentence case, single word, no qualifier. Not `Options`, not `Preferences`, not `Reader settings`, not `Quick typography menu`.
2. **Place it in the upper half of the surface.** Typically one of the first one to three rows of content (immediately under the primary status / verb), never at the very bottom of a long scrollable list.

Both rules are deliberate library conventions — Chromium itself does not have a single "settings entry row" pattern (its surfaces use persistent sidebars), so the rules below are how *extension* surfaces built with this library should consistently behave.

## Why "Settings"

A user who has used one extension built with this library should recognise the affordance instantly in another. Synonyms (`Options`, `Preferences`) carry the same meaning but make the user re-pattern-match every time. Qualified labels (`Reader settings`, `Capture options`) add noise — the surface already labels itself via its own header / icon, so qualifying the row is redundant.

If the extension genuinely has *no* configurable state — a one-button capture extension, say — the row simply does not exist. Having a settings entry is not mandatory; *naming it consistently when it does exist* is.

## Why upper-half placement

The user journey on an extension surface is "open → press the primary verb → maybe tweak a setting before pressing again". A user who needs to adjust the setting *first* (set the destination folder, switch the tone, change the rate mode) should not have to scroll past unrelated content to reach the row.

Native Chrome WebUI does not face this problem because `chrome://settings`-style surfaces have persistent sidebars that keep configuration visible at all times. Extension surfaces are linear-scroll surfaces — there is no sidebar, so vertical order *is* the navigation. Putting Settings at the top of the row stack solves the discoverability problem at zero cost.

## Canonical placement examples

### In an extension popup (380×520)

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
  <Header title="Link Collector" />
  <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Card variant="elevated">
      <List>
        <ListItem
          primary="Default collection"
          secondary="Inbox"
          interactive
          end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
        />
        <Divider subtle />
        <ListItem
          primary="Settings"
          interactive
          end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
        />
      </List>
    </Card>
    <div style={{ fontSize: 14, fontWeight: 400, padding: '4px 4px 0' }}>Recently saved</div>
    <Card variant="elevated">
      <List>
        <ListItem icon={<GlobeIcon size={14} />} primary="A Case Study on Fixing a Memory Leak" secondary="v8.dev · 3 min ago" interactive />
        <Divider subtle />
        <ListItem icon={<GlobeIcon size={14} />} primary="Settling the 3xx redirect debate" secondary="jakearchibald.com · 1 h ago" interactive />
      </List>
    </Card>
  </div>
  <div style={{ padding: 16, borderTop: '1px solid var(--cr-divider-color)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button variant="text">Cancel</Button>
    <Button variant="action">Save link</Button>
  </div>
</div>
```

`Settings` sits in the same upper card as the primary configuration row (`Default collection`), above the historical / log content (`Recently saved`).

### In an extension side panel (~360px)

```tsx live
<div style={{
  width: 360,
  height: 520,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
}}>
  <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Card variant="elevated">
      <List>
        <ListItem primary="Capture mode" secondary="Selection only" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
        <Divider subtle />
        <ListItem primary="Settings" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
      </List>
    </Card>
    <div style={{ fontSize: 14, fontWeight: 400, padding: '0 4px' }}>Recent captures</div>
    <Card variant="elevated">
      <List>
        <ListItem primary="Section: introduction" secondary="2 min ago" interactive />
        <Divider subtle />
        <ListItem primary="Quote about typography" secondary="9 min ago" interactive />
      </List>
    </Card>
  </div>
  <div style={{ padding: 16, borderTop: '1px solid var(--cr-divider-color)', display: 'flex', justifyContent: 'center' }}>
    <Button variant="action">Capture</Button>
  </div>
</div>
```

Side-panel extensions have no in-panel `Header` (Chrome paints a system header above the iframe — see [Layout & shell](../layout.md) and [Anti-pattern #25](../anti-patterns.md#25-in-panel-header-in-a-side-panel-extension)). The first card under the system strip is the natural home for `Settings`.

### In a full-tab options page

A full-tab options page *is* settings — the persistent left sidebar handles navigation between sections, so a `Settings` row inside the content does not apply. (See [Pattern — Settings page](./settings-page.md) for the full-tab shape.)

## When not to render a settings entry at all

If the extension has no configurable state — a one-button capture, a toggle-a-bookmark popup — `Settings` does not need to exist. The rule is: *if* the extension has settings, *then* surface them via a `Settings` row in the upper half. A missing settings row is fine; a misnamed or buried one is not.

## Common mistakes

- **`Options` / `Preferences` / `Reader settings`.** Use `Settings`. The single word, every time.
- **Settings drill-in at the very bottom of the row stack.** See [Anti-pattern #26](../anti-patterns.md#26-settings-entry-buried-at-the-bottom-of-the-surface).
- **Settings as an `IconButton` in the header.** That is [Anti-pattern #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header). The settings affordance is a row in the content, not chrome.
- **Two settings entries on the same surface.** One row, one place. If the user expects a deep-link to a specific setting, that is a sub-row inside the settings page, not a second top-level entry.
