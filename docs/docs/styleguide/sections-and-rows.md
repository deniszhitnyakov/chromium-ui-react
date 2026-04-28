---
id: styleguide-sections-and-rows
title: Sections & rows
slug: /styleguide/sections-and-rows
description: The one pattern that, more than any other, makes a surface read as Chromium — the section-of-rows. Anatomy, slot rules, and the three canonical row shapes.
format: mdx
---

# Sections & rows

If you get only one thing right from this styleguide, make it this one. The "section of rows" is the atomic unit of almost every Chromium WebUI surface: settings, bookmarks, history, downloads, extensions, the side panel. It is what the eye identifies as "this is Chrome, not a generic webapp."

## Anatomy

A **section** in Chromium settings is exactly:

1. An `<h2>` title — 14px, weight 400 (regular), sitting *above* the card with no card chrome of its own.
2. A card below the title, with a subtle elevation-2 shadow (`--cr-card-shadow`), 8px radius, white background (same as the page in light mode).
3. A vertical stack of rows inside the card. Each row is 48px min-height (64px if it has a sublabel), 20px horizontal padding.
4. 1px hairline separators (`--cr-separator-line` = 6% opacity of on-surface) between rows. The first row's top border is suppressed.

The source template is `settings_section.html` — see [Chromium source reference](./chromium-reference.md#section-card).

```tsx live
<div style={{ maxWidth: 520 }}>
  <h2 style={{
    fontSize: 14,
    fontWeight: 400,
    color: 'var(--cr-fallback-color-on-surface)',
    letterSpacing: '0.25px',
    margin: '0 0 12px 4px',
    padding: '8px 0 4px',
  }}>
    Appearance
  </h2>
  <Card variant="elevated">
    <List>
      <ListItem primary="Theme" secondary="System default" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
      <Divider subtle />
      <ToggleRow primary="Show home button" defaultChecked />
      <Divider subtle />
      <ToggleRow primary="Show bookmarks bar" />
      <Divider subtle />
      <ListItem primary="Font size" end={<Select options={[{ value: 'md', label: 'Medium (recommended)' }]} />} />
    </List>
  </Card>
</div>
```

That is the Chromium settings block — four rows, one elevated card, one h2 above. Copy this shape. It is the right answer for probably 80% of extension settings UIs.

## ALL CAPS labels — only above an input

Chromium does have a small ALL CAPS label, but it lives in exactly one place: **above a single form input**, where it acts as the field's accessible label. The library's `.cr-label-small` utility (10–11px, weight 500, letter-spacing 0.4px, uppercase) exists for that one use.

It is **not** how Chromium settings groups sections. The section heading above a card is a plain 14px regular-weight `<h2>` in sentence case, full stop. Reaching for the 11px caps recipe to label a section, a card, or a side-panel block is the single most visible "this is older Material, not Chromium" tell — see [Anti-pattern #21](./anti-patterns.md#21-all-caps-section-labels).

In short:

- Group of sections on a settings page → **14px weight-400 `<h2>` above each card**, sentence case.
- Label above a standalone input → `.cr-label-small` (10–11px, caps), one input only.
- Anywhere else → no label, or a sentence-case heading at the appropriate body size.

## The three canonical rows

Almost every row in Chromium fits one of three shapes. Learn to recognize them; then compose any settings surface as a sequence of these three.

### 1. Toggle row

A single boolean setting. Primary label on the left, optional secondary description below, switch on the right. Use [`<ToggleRow>`](../components/toggle-row.md) — it wraps the row in a `<label>` so the entire row is one click target and paints a hover fill, the way `chrome://settings` does.

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <ToggleRow primary="Enable notifications" defaultChecked />
  <Divider subtle />
  <ToggleRow
    primary="Sync across devices"
    secondary="Requires you to be signed in"
  />
</Card>
```

- Reach for `ToggleRow` whenever the trailing control is *only* a switch. `ListItem + Toggle` looks the same but swallows clicks outside the switch — that's the Chromium-native rule violated.
- Never put the switch on the left. Controls are on the right.
- Keep the secondary line to one sentence. If it is longer, it belongs in a subpage.

### 2. Drill-in row

A row that leads into more settings. Primary + optional secondary summarizing the current value, chevron (`›`) on the right, clickable.

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <List>
    <ListItem
      primary="Startup"
      secondary="Open the New Tab page"
      interactive
      end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
    />
    <Divider subtle />
    <ListItem
      primary="Site Settings"
      secondary="Controls what information sites can use and show"
      interactive
      end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
    />
  </List>
</Card>
```

- The secondary line summarizes the current state ("Open the New Tab page", "System default", "Allow all"). This is useful — the user learns the current value without drilling in.
- In a `PanelStack` context, use `<PanelRow navigateTo="...">` which handles the chevron and click-to-navigate for you.
- On a full options page with a router, make the row a semantic `<a>` or `<button>` with `role="button"`.

### 3. Inline-control row

A row with a `Select`, `Input`, or `RadioGroup` inline on the right (rather than a chevron).

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <List>
    <ListItem
      primary="Search engine"
      end={<Select options={[{ value: 'g', label: 'Google (default)' }, { value: 'b', label: 'Bing' }, { value: 'ddg', label: 'DuckDuckGo' }]} />}
    />
    <Divider subtle />
    <ListItem
      primary="Preload pages"
      secondary="For faster browsing and search"
      end={<Select options={[{ value: 'standard', label: 'Standard' }, { value: 'extended', label: 'Extended' }, { value: 'off', label: 'No preloading' }]} />}
    />
  </List>
</Card>
```

- Used when the value space is small (2–6 enums) and doesn't need a subpage.
- Inline `Input` is acceptable for short free-form values (a URL, a number). For longer free-form (textarea-needed), drill in.
- Never inline a multi-line Textarea.

## Grouping

Multiple sections stack with `--cr-space-6` (24px) between them. Each section has its own card.

```tsx live
<div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 'var(--cr-space-6)' }}>
  <div>
    <div style={{ fontSize: 14, fontWeight: 400, color: 'var(--cr-fallback-color-on-surface)', padding: '8px 4px 4px' }}>
      Appearance
    </div>
    <Card variant="outlined">
      <List>
        <ListItem primary="Theme" end={<Select options={[{ value: 'sys', label: 'System' }]} />} />
        <Divider subtle />
      </List>
      <ToggleRow primary="Show home button" defaultChecked />
    </Card>
  </div>
  <div>
    <div style={{ fontSize: 14, fontWeight: 400, color: 'var(--cr-fallback-color-on-surface)', padding: '8px 4px 4px' }}>
      On startup
    </div>
    <Card variant="outlined">
      <List>
        <RadioGroup defaultValue="ntp" style={{ padding: 16, gap: 12 }}>
          <Radio value="ntp" label="Open the New Tab page" />
          <Radio value="continue" label="Continue where you left off" />
          <Radio value="specific" label="Open a specific page or set of pages" />
        </RadioGroup>
      </List>
    </Card>
  </div>
  <div>
    <div style={{ fontSize: 14, fontWeight: 400, color: 'var(--cr-fallback-color-on-surface)', padding: '8px 4px 4px' }}>
      Advanced
    </div>
    <Card variant="outlined">
      <List>
        <ListItem primary="Privacy and security" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
        <Divider subtle />
        <ListItem primary="Languages" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
        <Divider subtle />
        <ListItem primary="Downloads" interactive end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} />
      </List>
    </Card>
  </div>
</div>
```

This is, structurally, a faithful reproduction of a `chrome://settings` section. The only thing missing is the specific strings.

## Slot rules

The `<ListItem>` slot rules, restated for clarity:

| Slot | Contains | Do not put |
|---|---|---|
| `icon` | Small leading icon, 16×16, `currentColor` | Avatars, emoji, colored decorative icons |
| `avatar` | Larger leading image (24×24+) for profile/site rows | Random icons |
| `primary` | The label — 13px, `on-surface` | Multi-line text, inline controls |
| `secondary` | One-line hint or current-value summary — 12px, subtle | Long descriptions, dates in raw form |
| `end` | One control: `Toggle`, `Badge`, `Select`, `Chip`, a chevron, or an `IconButton` | Multiple stacked controls, long text |

Anything that does not fit these slots — a multi-input row, a chart, a preview tile — does not belong in a `ListItem`. Those go in a direct child of `CardBody` or as their own component.

## When to drill in

Rule of thumb: if answering a setting requires more than one control or more than 2–3 enum options, make it a subpage.

- "Enable dark mode" → toggle row.
- "Pick a theme" with 4 choices → inline `Select` row.
- "Customize theme" with color picker + font size + icon + layout → **drill-in** row pointing to a subpage.
- "Manage blocked sites" with a list you edit → drill-in row.

Inside the subpage, repeat the same section-of-rows pattern. Depth is unlimited — Chromium's site settings go 3–4 levels deep — but each level should fit one screen without horizontal scroll.

## Radio group inside a card

When a radio group is the whole point of a section, drop the `List`/`ListItem` wrapper and put the `RadioGroup` directly in the card body:

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <CardBody>
    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>On startup</div>
    <RadioGroup defaultValue="ntp" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio value="ntp" label="Open the New Tab page" />
      <Radio value="continue" label="Continue where you left off" />
      <Radio value="specific" label="Open a specific page or set of pages" />
    </RadioGroup>
  </CardBody>
</Card>
```

- 14px weight-500 title at the top of the card.
- Radios stacked, 12px between them.
- Section grows to accommodate the exact number of options — no pagination.

## Avoid

- **Rows outside a card.** A single row floating on the page background is a free-standing element (a toast, an empty-state primary). A settings row lives inside a card.
- **Mixing row shapes within one section.** If one row has a chevron and the next an inline select, the user's eye can't predict the interaction. Sort rows by shape or split into two sections.
- **Icons on every row.** See [Anti-patterns](./anti-patterns.md#6-icons-on-every-row). Most Chromium rows lead with text.
- **Alternating row background colors.** No zebra striping. Dividers, not bands.
- **Stretching inline controls to fill.** `Select` and inline `Input` hug their content on the right. They do not span the row.
- **Putting a helper link inside the primary text.** Put the link under the card as a separate `<Link>` or inside the secondary line of a drill-in row.

Memorize the three row shapes, memorize the section composition, and most Chromium settings UIs will assemble themselves.
