---
id: styleguide-spacing
title: Spacing & rhythm
slug: /styleguide/spacing
description: The 4-8-12-16-20-24 spacing scale Chromium uses, where each step belongs, and how to keep vertical rhythm tight.
format: mdx
---

# Spacing & rhythm

Chromium WebUI uses a small, dense spacing scale. If your layout has 40px+ gaps between elements, it feels like a marketing page, not an app. If it has arbitrary values like 13px or 18px, it drifts off-grid. The `--cr-space-*` tokens are the only values you should reach for.

## The scale

| Token | Value | Use |
|---|---|---|
| `--cr-space-1` | 4px | Icon ↔ text inside a button; tight inline pairs |
| `--cr-space-2` | 8px | Button ↔ button gap; control ↔ label gap; inline small elements |
| `--cr-space-3` | 12px | Dense row vertical padding; paragraph spacing |
| `--cr-space-4` | 16px | Default row horizontal padding; card inner padding (small) |
| `--cr-space-5` | 20px | Card inner padding (medium); vertical gap between related rows |
| `--cr-space-6` | 24px | Gap between sections; toolbar horizontal padding; page top/bottom padding |
| `--cr-space-8` | 32px | Gap between page groups on a full options page |
| `--cr-space-10` | 40px | Very rare — only for the empty-state illustration → action gap |

There is no `--cr-space-7` / `-9`. The jumps are deliberate — each is ~1.25–1.5× the previous.

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'var(--cr-font-family)', fontSize: 12 }}>
  {[
    [4, '--cr-space-1'],
    [8, '--cr-space-2'],
    [12, '--cr-space-3'],
    [16, '--cr-space-4'],
    [20, '--cr-space-5'],
    [24, '--cr-space-6'],
    [32, '--cr-space-8'],
    [40, '--cr-space-10'],
  ].map(([px, name]) => (
    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 80 }}>{name}</div>
      <div style={{ width: px, height: 12, background: 'var(--cr-fallback-color-primary)', borderRadius: 2 }} />
      <div style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>{px}px</div>
    </div>
  ))}
</div>
```

## Where each step belongs

The guide below is prescriptive. Deviating is allowed but you should be able to articulate why.

### Inside a button — 4/8

- Icon ↔ label: `--cr-space-1` (4px) — handled by the component, do not override.
- Two sibling buttons: `--cr-space-2` (8px) between them.

### Inside a form field — 8

- Label ↔ field: `--cr-space-2` (8px) — handled by `Input` / `Select`.
- Field ↔ hint / error: `--cr-space-2` (8px).

### Inside a row — 12/16

- Row horizontal padding: `--cr-space-4` (16px) left and right.
- Row vertical padding: 12px for `ListItem` (default), 8px for `dense`.
- Primary ↔ secondary text: ~2px — handled by `ListItem`.
- Icon ↔ text group: `--cr-space-3` (12px) — handled by `ListItem`.

### Inside a card — 16/20/24

- Card inner padding: `--cr-space-5` (20px) for body blocks. For a card that wraps a `List`, the list items already have their own padding — do not add another 20px wrapper.
- `CardHeader` bottom padding: `--cr-space-4` (16px).
- `CardFooter` top padding: `--cr-space-4` (16px).

### Between sections — 24/32

- Adjacent sections on a settings page: `--cr-space-6` (24px) gap.
- Groups of sections with an 11px label header: `--cr-space-8` (32px) gap above the next group.
- Page top/bottom padding: `--cr-space-6` (24px) on narrow surfaces, `--cr-space-8` (32px) on full-tab pages.

### Inside a toolbar — 16

- Toolbar horizontal padding: `--cr-space-4` (16px) on narrow surfaces, `--cr-space-6` (24px) on wide. `<Toolbar>` sets this for you — do not wrap in another padded container.

### Inside a dialog — 20/24

- Dialog padding: `--cr-space-6` (24px) on all sides of the content area.
- Title ↔ body: `--cr-space-4` (16px).
- Body ↔ action row: `--cr-space-6` (24px).
- Between action buttons: `--cr-space-2` (8px).

## Vertical rhythm

Chromium's vertical rhythm is **tight**. Stack rows with no gap — separation comes from dividers, not space. Stack sections with 24px gaps, not 48.

### Right rhythm

```tsx live
<div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 'var(--cr-space-6)' }}>
  <Card variant="outlined">
    <List>
      <ListItem primary="Show home button" end={<Toggle defaultChecked />} />
      <Divider subtle />
      <ListItem primary="Show bookmarks bar" end={<Toggle />} />
      <Divider subtle />
      <ListItem primary="Show side panel" end={<Toggle defaultChecked />} />
    </List>
  </Card>
  <Card variant="outlined">
    <List>
      <ListItem primary="Save passwords" end={<Toggle defaultChecked />} />
      <Divider subtle />
      <ListItem primary="Autofill addresses" end={<Toggle defaultChecked />} />
    </List>
  </Card>
</div>
```

### Wrong rhythm — loose

The same content with 24px between every row and 48px between sections. It feels like a landing page.

```tsx live
<div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 48 }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Card variant="outlined"><CardBody><ListItem primary="Show home button" end={<Toggle defaultChecked />} /></CardBody></Card>
    <Card variant="outlined"><CardBody><ListItem primary="Show bookmarks bar" end={<Toggle />} /></CardBody></Card>
    <Card variant="outlined"><CardBody><ListItem primary="Show side panel" end={<Toggle defaultChecked />} /></CardBody></Card>
  </div>
</div>
```

The two look like different applications. The first is Chromium.

## Gutters

For full-tab options pages:

- Horizontal gutter on each side of the 680px content column: `max(24px, (viewport - 680) / 2)` — centered.
- Between the left nav and the content: border only, no gap.
- Mobile (≤ 768px): 16px gutter, full-width content.

## Avoid

- **Arbitrary `padding: 18px`**. Snap to the scale.
- **`margin-top` on every third element** to add breathing room. Use `gap` on the parent flex container.
- **Negative margins** to "tuck" things. If you need to tuck, the padding is wrong upstream.
- **Padding on `<Toolbar>` or `<ListItem>` from the outside**. Both set their own padding — wrapping them in a padded container double-insets.
- **`--cr-space-10` or larger for anything routine**. 40px exists for the empty-state illustration gap; that is its job.

Ninety-five percent of a Chromium-native layout uses only `--cr-space-2` (8), `--cr-space-4` (16), and `--cr-space-6` (24). If you are reaching outside this triplet, check that you actually need to.
