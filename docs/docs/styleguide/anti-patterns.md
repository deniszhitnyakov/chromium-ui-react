---
id: styleguide-anti-patterns
title: Anti-patterns
slug: /styleguide/anti-patterns
description: Compositions that use the right components but produce a non-Chromium result. Each shows the wrong version, the right version, and the underlying rule.
format: mdx
---

# Anti-patterns

Every example here is something a good-faith developer (or LLM) has shipped using `chromium-ui-react`. Each one violates at least one [Principle](./principles.md). The goal of this page is pattern-matching: once you have seen these once, you will recognize them on review.

## 1. One card per setting

**Wrong.** Each toggle gets its own card with a title and a description.

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
  <Card variant="outlined">
    <CardHeader><CardTitle>Notifications</CardTitle><CardDescription>Allow notifications from this extension.</CardDescription></CardHeader>
    <CardFooter><Toggle defaultChecked /></CardFooter>
  </Card>
  <Card variant="outlined">
    <CardHeader><CardTitle>Sync</CardTitle><CardDescription>Sync your data across devices.</CardDescription></CardHeader>
    <CardFooter><Toggle /></CardFooter>
  </Card>
  <Card variant="outlined">
    <CardHeader><CardTitle>Auto-start</CardTitle><CardDescription>Launch this extension on browser startup.</CardDescription></CardHeader>
    <CardFooter><Toggle /></CardFooter>
  </Card>
</div>
```

**Right.** One card, multiple rows, shared divider — using [`ToggleRow`](../components/toggle-row.md) so the whole row is one click target.

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <ToggleRow primary="Notifications" secondary="Allow notifications from this extension" defaultChecked />
  <Divider subtle />
  <ToggleRow primary="Sync" secondary="Sync your data across devices" />
  <Divider subtle />
  <ToggleRow primary="Auto-start" secondary="Launch this extension on browser startup" />
</Card>
```

**Rule.** Cards group rows; rows do not live alone. See [Sections & rows](./sections-and-rows.md).

## 2. Primary button on the left

**Wrong.** "Save" is on the left because it is the most important action.

```tsx live
<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, maxWidth: 420 }}>
  <Button variant="action">Save</Button>
  <Button>Cancel</Button>
</div>
```

**Right.** Primary is always on the right; Cancel is on the left.

```tsx live
<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, maxWidth: 420 }}>
  <Button>Cancel</Button>
  <Button variant="action">Save</Button>
</div>
```

**Rule.** Chromium's dialog button order is `[Cancel] [Primary]` — the pointer ends up on the primary by default. See [Dialogs](./dialogs.md).

## 3. Three footer buttons

**Wrong.** "Cancel, Save as draft, Publish" as three footer buttons.

**Right.** The draft is a menu item on the primary button, or it lives on an earlier step. Footer is always `[secondary] [primary]` — at most two.

If a split button is unavoidable, use a primary `Button` plus an adjacent `IconButton` that opens a `Menu`. Never three equal-weight buttons in a row.

## 4. Dialog that takes the whole viewport

**Wrong.** `Dialog` with `width: 100vw` or no `maxWidth`.

**Right.** Chromium dialogs are narrow. Confirmation dialogs are ~320–420px wide; form dialogs are ~480px wide. Never full-bleed unless the content is genuinely an editor (e.g., an image cropper).

## 5. Colored backgrounds behind sections

**Wrong.** Page background is `--google-blue-50` or a custom gradient.

**Right.** Page background is `--cr-fallback-color-surface`. Cards, if used, sit on it at `--cr-fallback-color-surface` (outlined) or `--cr-fallback-color-surface-1` (filled). Dark mode flips automatically.

Color in Chromium is reserved for: the primary action, the checked state of a toggle/checkbox, error text, the focus ring, and small informational badges. Everything else is a shade of grey.

## 6. Icons on every row

**Wrong.** Every settings row has a decorative icon on the left.

**Right.** Icons on rows are used sparingly, and only when they carry information — a folder, a file type, a category. Most Chromium settings rows have *no* leading icon; they lead with text.

## 7. Tabs for navigation between pages

**Wrong.** Top-level app navigation is a `Tabs` component: "Home / Items / Settings".

**Right.** App navigation is a `Menu` in a sidebar (for multi-page surfaces) or a drill-in `PanelStack` (for side panels). `Tabs` are for *within* a view — for switching between the General / Advanced panels of a single settings section, not between top-level areas. See [Navigation](./navigation.md).

## 8. Expand/collapse for "Advanced" settings

**Wrong.** An accordion-style expander that reveals 15 more checkboxes when the user clicks a chevron.

**Right.** A `PanelRow` with `navigateTo="advanced"` — the advanced settings are a subpage that slides in. The top-level list stays the same length for every user.

## 9. Centered content in a narrow popup

**Wrong.** Side panel with `align-items: center` and 24px of padding on every side, so every row is centered.

**Right.** Rows are full-width with their own left/right padding (16px). Content is left-aligned; only *action rows* (Buttons at the bottom) may be right-aligned or centered. See [Layout & shell](./layout.md).

## 10. Drop shadows on everything

**Wrong.** Every `Card` has `--cr-elevation-2`; every settings row has `--cr-elevation-1`.

**Right.** Elevation in Chromium carries meaning:

- `--cr-elevation-2` — the default settings/downloads section card (`--cr-card-shadow` aliases here).
- `--cr-elevation-3` — popover menus, `cr-action-menu`.
- `--cr-elevation-5` — dialogs.

A settings card has a **subtle elevation-2 shadow** — `<Card>` (the library default is `variant="elevated"`). Outlined cards are an acceptable alternative for dense admin layouts, but the Chromium-faithful default is shadowed. A settings row has **no shadow at all** — row separators are 1px hairlines inside the card.

## 11. Primary color on secondary actions

**Wrong.** Every button uses `variant="action"` because "it looks friendlier."

**Right.** Exactly one primary action per view. Everything else is `outlined` (next to an `action` primary) or `text` (next to a `destructive` primary, or anywhere the secondary should stay quiet). A screen full of blue filled buttons has no primary. See [anti-pattern #24](#24-non-text-cancel-next-to-a-destructive-primary) for the action-row rule.

## 12. Custom font family

**Wrong.** Importing Inter, Manrope, or "the client's corporate font" and overriding `--cr-font-family`.

**Right.** The token is `Roboto, 'Google Sans', 'Segoe UI', system-ui, -apple-system, sans-serif` for a reason — on ChromeOS it renders as Roboto, on Windows as Segoe UI, on macOS as SF. This IS the Chromium font stack. Do not override.

## 13. Large display-size headings

**Wrong.** Page title is 32px bold.

**Right.** The page title in Chromium is rendered by `Toolbar` at the `--cr-font-size-lg` (16px) weight-500 size. Section headers are `--cr-font-size-base` (14px) weight-500. There is no 32px in a native Chromium page. See [Typography](./typography.md).

## 14. Custom focus ring

**Wrong.** Replacing the blue focus ring with a custom border, or turning it off for "cleaner" design.

**Right.** The focus ring is the default one — `outline: 2px solid var(--cr-focus-outline-color)` with a 2px offset. It is a core accessibility affordance. If you want to restyle focus, your only allowed move is to tune the offset for a dense layout — never the color, never the visibility.

## 15. Extension popup as a landing page

**Wrong.** The popup opens with a logo, a value proposition, and a "Get Started" CTA.

**Right.** The popup opens directly on the feature. Chromium-native popups are immediately functional. Onboarding belongs in a full-tab options page, not the 360×520 popup.

## 16. IconButton glued to a title in the header

**Wrong.** A settings gear, a "+", or any other `IconButton` placed immediately to the right of a page/panel title, on the same row, in the header.

```tsx live
<div style={{
  width: 360,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
}}>
  <Toolbar
    title="Google Maps Scraper"
    actions={<IconButton aria-label="Settings" icon={<SettingsIcon />} />}
  />
  <div style={{ padding: 16, color: 'var(--cr-fallback-color-on-surface-subtle)', fontSize: 13 }}>
    (panel body)
  </div>
</div>
```

Looks harmless until you open `chrome://settings`, `chrome://history`, or `chrome://bookmarks` side-by-side — none of them put a lone icon button next to the page title. The moment you add one, the surface stops reading as Chromium-native and starts reading as a generic webapp. On narrow surfaces (popups, side panels) it is worse: the icon eats width that is already scarce, and the user's eye keeps tripping over an affordance it did not ask for.

**Right (drill-in row).** Demote the icon to a row the user can navigate to — a `Settings` drill-in at the bottom of the main panel, or a row in the main list.

```tsx live
<div style={{
  width: 360,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Toolbar title="Google Maps Scraper" />
  <div style={{ flex: 1 }}>
    <PanelRow primary="Source" secondary="www.google.com · ready" end={<Badge variant="success">ready</Badge>} />
    <Divider subtle />
    <PanelRow primary="Run controls" secondary="No run yet" end={<Button variant="action" size="sm">Start</Button>} />
    <Divider subtle />
    <PanelRow primary="Single place" secondary="Quick QA from the open place card" end={<Button size="sm">Extract</Button>} />
    <Divider subtle />
    <PanelRow primary="Settings" secondary="Run defaults, output format, filters" navigateTo="settings" />
  </div>
</div>
```

**Right (overflow menu at the far corner).** If the surface genuinely has 3+ one-off actions (a bookmarks / history manager), use a single `⋮` `IconButton` placed at the far right of the toolbar — **with the `SearchInput` or content between it and the title**, never butting up against the title. That matches the `chrome://bookmarks` shape.

```tsx live
<Toolbar
  title="Bookmarks"
  actions={<IconButton aria-label="More" icon={<MoreVertIcon />} />}
  style={{ border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}
>
  <SearchInput placeholder="Search bookmarks" style={{ flex: 1, maxWidth: 320 }} />
</Toolbar>
```

**Rule.** On a Chromium-native surface, the `actions` slot of a `<Toolbar>` or `<PanelHeader>` is **not** a shelf for icon-button shortcuts next to the title. The default state is empty. You may add:

- **One** single `⋮` overflow `IconButton` at the far corner of a *full-page manager's* toolbar, with other content (usually a `SearchInput`) between it and the title — matching `chrome://bookmarks`.
- A `Button variant="text"` like "Clear all" when the whole surface has exactly one bulk operation.
- The toolbar's **bulk-selection mode** may host the selection verbs (Delete / Move) as `IconButton`s — that is a *mode swap*, not a persistent header, and the title is replaced by the selection count (`"5 selected"`).

Everything else is a drill-in row. If it feels like it deserves an icon in the header, it probably deserves a proper `PanelRow` instead.

### Narrow-purpose exception

Chromium does put a small feedback `IconButton` next to some section labels in `chrome://settings/performance`. That is the one in-Chromium precedent for an icon-adjacent-to-heading pattern, and it is scoped narrowly: a single icon, a single purpose (send feedback), sitting beside a *section* label (not the page title). If you reproduce *that* exact shape, you are inside the precedent. Anything broader is not.

## 17. Primary action buried on a side panel

**Wrong.** A browser-extension side panel with a single primary verb (Start, Capture, Export, Scan) inlined into the `end` slot of a mid-surface row as a `size="sm"` button.

```tsx live
<div style={{
  width: 360,
  height: 460,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Toolbar title="Maps scraper" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <PanelRow primary="Columns" secondary="4 of 9 visible" navigateTo="columns" />
    <Divider subtle />
    <PanelRow primary="Scraping" secondary="Idle" end={<Button variant="action" size="sm">Start</Button>} />
    <Divider subtle />
    <PanelRow primary="Collected" secondary="4 unique · 1 duplicate · 0 errors" end={<Badge>5</Badge>} />
    <Divider subtle />
    <PanelRow primary="Export" secondary="CSV / XLSX / JSON" navigateTo="export" />
  </div>
</div>
```

The verb is labelled and coloured correctly. But a first-time user has to scan past two rows, tell the `Start` pill apart from the `5` badge two rows below, and only then decide to press. That friction eats directly into the extension's first-run aha moment.

**Right.** Promote the primary out of the row, pin it to a centered footer, full-size. The mid-surface row becomes a pure status row.

```tsx live
<div style={{
  width: 360,
  height: 460,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Toolbar title="Maps scraper" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <PanelRow primary="Columns" secondary="4 of 9 visible" navigateTo="columns" />
    <Divider subtle />
    <PanelRow primary="Scraping" secondary="Idle" />
    <Divider subtle />
    <PanelRow primary="Collected" secondary="4 unique · 1 duplicate · 0 errors" end={<Badge>5</Badge>} />
    <Divider subtle />
    <PanelRow primary="Export" secondary="CSV / XLSX / JSON" navigateTo="export" />
  </div>
  <div style={{
    padding: 'var(--cr-space-4)',
    borderTop: '1px solid var(--cr-divider-color)',
    display: 'flex',
    justifyContent: 'center',
  }}>
    <Button variant="action">Start</Button>
  </div>
</div>
```

**Rule.** On an extension **side panel** (only — not popup, not options page, not dialog), the single primary action is pinned at the bottom, centered, full-size, and alone. This is an extension-specific departure from Chromium's `[Cancel] [Primary]` right-aligned footer, justified by the aha-moment cost of a buried CTA. Full reasoning, scope, and variants in [Pattern — Primary action button](./patterns/primary-action.md).

## 18. Toggle parked inside `ListItem.end`

**Wrong.** A settings row uses `<ListItem … end={<Toggle />}>`. Visually it looks identical to a Chromium row; behaviourally only the switch is clickable, the rest of the row swallows pointer events.

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <List>
    <ListItem primary="Auto-resume on scroll" secondary="Continue scraping when the page scrolls" end={<Toggle defaultChecked />} />
  </List>
</Card>
```

**Right.** Use [`<ToggleRow>`](../components/toggle-row.md). The whole row is one `<label>` — clicking the primary text, secondary text, or icon all flip the switch, and the row paints a hover fill on pointer-over.

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <ToggleRow primary="Auto-resume on scroll" secondary="Continue scraping when the page scrolls" defaultChecked />
</Card>
```

**Rule.** Whenever a row's only trailing control is an on/off switch, reach for `ToggleRow`. The `ListItem + Toggle` composition is reserved for rows that mix the switch with other inline controls — there the loss of click-anywhere is the explicit trade-off.

## 19. Full-width primary action in a narrow footer

**Wrong.** A primary action stretched edge-to-edge inside the side-panel footer. The button reads as a coloured banner, not as a control. (`Button` no longer ships a `fullWidth` prop, but the same shape is reproducible with raw CSS or by setting `style={{ width: '100%' }}` — don't.)

```tsx live
<div style={{
  width: 360,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  padding: 'var(--cr-space-4)',
  borderTop: '1px solid var(--cr-divider-color)',
  background: 'var(--cr-fallback-color-surface)',
}}>
  <button style={{
    width: '100%', height: 36, border: 'none', borderRadius: 100,
    background: 'var(--cr-fallback-color-primary)', color: 'var(--cr-fallback-color-on-primary)',
    fontFamily: 'var(--cr-font-family)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
  }}>Start new scrape</button>
</div>
```

**Right.** Content-sized primary, centred (or right-aligned in dialogs). Width is label plus padding; padding is the only horizontal slack.

```tsx live
<div style={{
  width: 360,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  padding: 'var(--cr-space-4)',
  borderTop: '1px solid var(--cr-divider-color)',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  justifyContent: 'center',
}}>
  <Button variant="action">Start scraping</Button>
</div>
```

**Rule.** Chromium buttons are content-sized. A button stretched to the container's full width stops reading as a button and starts reading as a banner — exactly what `chrome://settings`, `chrome://bookmarks`, and the in-browser side panels never produce. Long verbs are a labelling problem, not a sizing one (see [Content & labels — Button labels](./content.md#button-labels)).

## 20. Multi-word button labels

**Wrong.** Three- or four-word verbs in a button. The instinct is "be explicit", but the result reads like a SaaS CTA, not a Chromium control.

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button>Cancel</Button>
    <Button variant="action">Save and continue</Button>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Button variant="action">Start new scrape</Button>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Button variant="action">Enrich visible leads</Button>
  </div>
</div>
```

**Right.** One word, or two when the verb genuinely needs a noun. Move qualifying nouns into the surface around the button — the dialog title, the panel header, the row's primary text already say what is being acted on.

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button>Cancel</Button>
    <Button variant="action">Save</Button>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Button variant="action">Start</Button>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Button variant="action">Enrich</Button>
  </div>
</div>
```

**Rule.** Aim for one word; two is acceptable when the verb genuinely needs a noun ("Save changes", "Add account", "Restore defaults"). Three or more is wrong. See [Content & labels — Button labels](./content.md#button-labels) for the canonical Chromium verb list.

## 21. ALL CAPS section labels

**Wrong.** Sections grouped under 11px ALL CAPS letter-spaced headings — the recipe survives in older Material designs but is not how Chromium settings group anything.

```tsx live
<div style={{ maxWidth: 520 }}>
  <div style={{
    fontSize: 11,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--cr-fallback-color-on-surface-subtle)',
    padding: '0 16px 8px',
  }}>
    APPEARANCE
  </div>
  <Card variant="outlined">
    <List>
      <ListItem primary="Theme" end={<Select options={[{ value: 'sys', label: 'System' }]} />} />
    </List>
  </Card>
</div>
```

**Right.** A plain 14px regular-weight `<h2>` (or `<div>` with the same shape) above the card. Sentence case. No tracking. Same colour as body text. This is what `chrome://settings`, `chrome://bookmarks`, and `chrome://downloads` actually do.

```tsx live
<div style={{ maxWidth: 520 }}>
  <h2 style={{
    fontSize: 14,
    fontWeight: 400,
    color: 'var(--cr-fallback-color-on-surface)',
    margin: '0 0 12px 4px',
    padding: '8px 0 4px',
  }}>
    Appearance
  </h2>
  <Card variant="outlined">
    <List>
      <ListItem primary="Theme" end={<Select options={[{ value: 'sys', label: 'System' }]} />} />
    </List>
  </Card>
</div>
```

**Rule.** Section labels are sentence case at 14px regular weight. The 11px caps recipe (`.cr-label-small`) survives only as a form-field-label utility — used above a single input, never above a card or list. Reaching for it as a section label is the single most visible "this is older Material, not Chromium" tell. See [Typography — section title](./typography.md#section-title--description).

## 22. Hand-rolled chrome instead of the matching primitive

**Wrong.** A live example builds a side-panel header out of a `<div>` with hard-coded `height: 48`, padding, border, and an inline-styled title. The library exposes `<PanelHeader />` two folders away, but the example reaches for inline CSS — and reliably picks the heavier `--cr-fallback-color-outline` token instead of the quiet hairline.

```tsx live
<div style={{ width: 320, border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 12, overflow: 'hidden' }}>
  <div style={{
    height: 48,
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    borderBottom: '1px solid var(--cr-fallback-color-outline)',
  }}>
    <div style={{ fontSize: 14, fontWeight: 500 }}>Reading list</div>
  </div>
  <div style={{ padding: 16, color: 'var(--cr-fallback-color-on-surface-subtle)', fontSize: 13 }}>
    (rest of panel)
  </div>
</div>
```

**Right.** Use the matching component. `PanelHeader` already has the right height, the right padding, the right hairline (`--cr-divider-color`, matching Toolbar and Divider), and forwards a back button slot.

```tsx live
<div style={{ width: 320, border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 12, overflow: 'hidden' }}>
  <PanelStack defaultView="main">
    <PanelView id="main">
      <PanelHeader title="Reading list" />
      <div style={{ padding: 16, color: 'var(--cr-fallback-color-on-surface-subtle)', fontSize: 13 }}>
        (rest of panel)
      </div>
    </PanelView>
  </PanelStack>
</div>
```

**Rule.** Whenever the library exposes a primitive for the structural chrome you are about to draw — `Toolbar` (or `Header`), `PanelHeader`, `Divider`, `Card` — reach for it. Inline reconstructions reliably diverge from the canonical token, the canonical sizes, or the canonical hairline, and ship the divergence to anyone who copies the example. The `var(--cr-divider-color)` token (introduced in #0002) names the hairline so even structural divs can read from it instead of `--cr-fallback-color-outline`.

## 23. Unicode characters as icons

**Wrong.** Reaching for `⋮`, `↻`, `✓`, `✕`, `›`, `🔒`, `🔔`, `📁` to fill an `icon` slot. The glyphs render at inconsistent baselines, weights, and sizes per OS; emoji renders as colourful raster on most platforms. Either way, the surface stops looking Chromium-native and starts looking like a generic webapp built from system fonts.

```tsx live
<div style={{ display: 'flex', gap: 8 }}>
  <IconButton aria-label="Refresh" icon={<RefreshIcon size={18} />} />
  <IconButton aria-label="More" icon={<MoreVertIcon size={18} />} />
  <IconButton aria-label="Close" icon={<CloseIcon size={14} />} />
  <IconButton aria-label="Lock" icon={<LockIcon size={14} />} />
</div>
```

**Right.** Use [Material Symbols](./icons.md) (outlined, weight 400, 20px) — the same icon family the actual Chromium WebUI uses. The docs preview scope ships a small set of inline-SVG components for the most common icons; in real apps, copy SVGs from the [Material Symbols catalogue](https://fonts.google.com/icons) or import from `@material-symbols/svg-400`.

```tsx live
<div style={{ display: 'flex', gap: 8 }}>
  <IconButton aria-label="Refresh" icon={<RefreshIcon />} />
  <IconButton aria-label="More" icon={<MoreVertIcon />} />
  <IconButton aria-label="Close" icon={<CloseIcon />} />
  <IconButton aria-label="Lock" icon={<LockIcon />} />
</div>
```

**Rule.** Icons are SVGs (Material Symbols outlined, 20px, weight 400). Unicode characters and emoji are not icons. See [Icons](./icons.md) for the full vocabulary recommendation.

## 24. Non-text Cancel next to a destructive primary

**Wrong.** Pairing a destructive primary with an `outlined` Cancel. Two pills next to each other — one red-text, one blue-text — read as "two competing actions" instead of "one verb the user came to confirm, plus an out". The eye doesn't pick the destructive verb fast enough, and the row reads gaudy.

```tsx live
<Card variant="outlined" style={{ maxWidth: 420 }}>
  <CardHeader>
    <CardTitle>Remove bookmark?</CardTitle>
    <CardDescription>This will permanently remove "Docs — chromium-ui-react" from this device.</CardDescription>
  </CardHeader>
  <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button>Cancel</Button>
    <Button variant="destructive">Remove</Button>
  </CardFooter>
</Card>
```

**Right.** Cancel is `variant="text"` whenever the primary is `destructive`. Cancel stays quiet, the destructive verb owns the row.

```tsx live
<Card variant="outlined" style={{ maxWidth: 420 }}>
  <CardHeader>
    <CardTitle>Remove bookmark?</CardTitle>
    <CardDescription>This will permanently remove "Docs — chromium-ui-react" from this device.</CardDescription>
  </CardHeader>
  <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button variant="text">Cancel</Button>
    <Button variant="destructive">Remove</Button>
  </CardFooter>
</Card>
```

**Rule.** In an action-row pair, the secondary's variant follows the primary:

- Primary `action` (filled blue) → Cancel is `outlined` (matches Chromium native — pill outline against a filled pill is already visually distinct).
- Primary `destructive` (red text on outlined pill) → Cancel is `text` (no border, quiet — the destructive verb wins the row).

This is the one styleguide divergence from Chromium's confirmation dialogs (`chrome://settings/clearBrowserData`, `chrome://bookmarks` "Delete folder"), which use an outlined Cancel even next to destructive primaries. The library prefers a quieter Cancel in that pairing because the operator's read is consistently that two pills compete for attention. Everywhere else (settings forms, neutral confirmations, anything not destructive), the Chromium-native `outlined` Cancel stays.

---

If you catch any of these in review, the fix is usually: remove a card, remove a shadow, remove a color, remove an icon, remove a heading. Restraint is the default setting.
