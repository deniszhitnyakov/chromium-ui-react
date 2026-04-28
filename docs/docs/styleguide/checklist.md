---
id: styleguide-checklist
title: Pre-flight checklist (for LLMs)
slug: /styleguide/checklist
description: A short, prescriptive checklist to run before generating any layout with chromium-ui-react. Written for LLM coding agents; humans may find it useful too.
format: mdx
---

# Pre-flight checklist

> **If you are an LLM generating a layout with `chromium-ui-react`, read this page top-to-bottom before writing any JSX.** The rules below are ordered by how often they are violated. Skipping the first few will produce UI that visibly does not match Chromium.

This is the short form of the [Principles](./principles.md), [Layout](./layout.md), [Typography](./typography.md), [Color](./color.md), [Sections & rows](./sections-and-rows.md), [Forms](./forms.md), [Dialogs](./dialogs.md), and [Navigation](./navigation.md) pages. Use it as a final review gate.

## Step 1 — Identify the surface

Before writing anything, name the surface. One of:

1. **Browser extension popup** — 360–420px wide, 480–600px tall, opens from the toolbar icon.
2. **Browser extension side panel** — ~360–400px wide, full tab height.
3. **Full-tab options page** — rendered in a browser tab, behaves like `chrome://settings`.
4. **In-page injected UI** — overlay or banner inside a host page.
5. **Electron / Tauri window** — desktop app with its own chrome.

The surface dictates every layout rule that follows. If you cannot name the surface, ask the user.

## Step 2 — Shell

Every Chromium-native surface has the same shell:

```
┌─────────────────────────────────┐
│  Toolbar (title + actions)      │  ← cr-toolbar — 56px tall
├─────────────────────────────────┤
│                                 │
│  Content                        │  ← scrollable region
│                                 │
├─────────────────────────────────┤
│  Footer actions (optional)      │  ← only for popups with a single primary action
└─────────────────────────────────┘
```

- Use `<Toolbar title="..." />` at the top. **Never** replace it with a custom `<h1>` in a header div.
- Content below scrolls. Toolbar stays fixed.
- **The toolbar `actions` slot is empty by default.** Do not park a settings gear, a "+", or any other `IconButton` next to the title — see [Anti-patterns #16](./anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header). A settings entry point is a drill-in `PanelRow` inside the content, not an icon in the header.
- For popups and side panels: use `display: flex; flex-direction: column; height: 100vh` so the toolbar is pinned, content scrolls, footer pins.
- For options pages: content max-width is **680px**, centered. Do not stretch settings to the full viewport.

## Step 3 — Composition

Compose the content as a **vertical stack of rows inside one or more cards**. In Chromium:

- A "section" is a `Card variant="outlined"` containing a `List` of `ListItem`s.
- Sections may have a 14px regular-weight `<h2>` heading above them, sentence case — not inside the card. **Never** an ALL CAPS label.
- Rows are separated by `<Divider subtle />`.
- Rows have one of three layouts:
  - `primary` + `end={<Toggle />}` for boolean settings.
  - `primary` + `secondary` + `end={<span>›</span>}` + `interactive` for drill-in rows.
  - `primary` + `end={<Select ... />}` for enum settings.

```tsx
<Card variant="outlined">
  <List>
    <ListItem primary="Notifications" secondary="Allow notifications" end={<Toggle defaultChecked />} />
    <Divider subtle />
    <ListItem primary="Sync" end={<Toggle />} />
  </List>
</Card>
```

## Step 4 — Typography

Use only the library's `--cr-font-size-*` tokens. The full scale is: 11, 12, 13, 14, 16, 20, 24. What appears where:

| Size | Token | Use |
|---|---|---|
| 11 | `--cr-font-size-xs` | Tiny inline labels, badges, kbd hints. **Not** for section labels — section labels are 14px regular. |
| 12 | `--cr-font-size-sm` | Secondary text on rows, helper text |
| 13 | `--cr-font-size-md` | **Chromium's default body font size** — `ListItem` primary, menu items, button labels |
| 14 | `--cr-font-size-base` | Larger body, section titles |
| 16 | `--cr-font-size-lg` | Toolbar title, dialog title |
| 20 | `--cr-font-size-xl` | Rarely — only for the `settings-main` root heading |
| 24 | `--cr-font-size-2xl` | Never, in functional surfaces |

Never use 32px, 28px, 18px, or any arbitrary value. If you feel the urge to make something "more prominent," use weight-500 (medium), not a larger size.

## Step 5 — Color

Every color must be a `--cr-*` token. If you are tempted to write `#`, stop.

The color budget for a Chromium surface:

- **Backgrounds:** `--cr-fallback-color-surface` (default) and `--cr-fallback-color-surface-1` (subtle tint, for a nested area).
- **Text:** `--cr-fallback-color-on-surface` (primary) and `--cr-fallback-color-on-surface-subtle` (secondary, hints, placeholders).
- **Borders:** `--cr-fallback-color-outline`.
- **Primary accent:** `--cr-fallback-color-primary` — used for the single primary button, checked toggles, the focus ring, and links. Nothing else.
- **Error:** `--cr-fallback-color-error` — used for destructive buttons and inline error text. Nothing else.
- **Success / warning / info:** only on Badges and Toasts. Never on body text, never on backgrounds.
- **Badges are outline-only and default to neutral.** Every `Badge` renders as a 1px outline with matching text — there is no solid fill, by design. Prefer `variant="neutral"` for informational labels ("Beta", "Draft", a plain count); reserve `success` / `warning` / `error` for states the user actually needs to react to. A column of colored badges in a results list is a smell — drop them to neutral. See [Color & surfaces — Badge defaults](./color.md#badge-defaults-quiet-first).

Do not write dark-mode media queries. The tokens handle it.

## Step 6 — Action rows

Any time the user has a primary/secondary action pair:

- Put them in a **right-aligned row** at the bottom of the surface or dialog.
- Order: `[Cancel] [Primary]`. Not the other way around.
- Exactly two buttons. If you have a third, move it into a Menu behind an `IconButton`.
- Primary is `variant="action"`. Destructive is `variant="destructive"`. Secondary is default (outlined) or `variant="text"`.
- Buttons are content-sized — there is no `fullWidth` prop. Stretching a button edge-to-edge produces a banner, not a control.
- **Labels are one word, two when the verb genuinely needs a noun.** `Save`, `Cancel`, `Add`, `Remove`, `Sync`, `Continue`. `Save changes` and `Add account` are acceptable. `Start new scrape`, `Enrich visible leads`, `Save and continue` are wrong — pick a tighter verb or move the noun into the surface around the button. See [Content & labels — Button labels](./content.md#button-labels).

## Step 7 — Navigation

Pick exactly one based on the surface:

- **Side panel / popup with sub-views:** `PanelStack` + `PanelRow navigateTo="..."`. Never tabs.
- **Full options page with 3–6 top-level areas:** left-hand `Menu role="navigation"`.
- **Single settings area with two or three related views:** `Tabs` inside the view.
- **Linear form:** no navigation, just a scrolling column.

`Tabs` are the last resort, not the first.

## Step 8 — Final pass

Before you declare a layout complete, run through this:

- [ ] Does every color come from a `--cr-*` token?
- [ ] Does the surface have exactly one primary button visible?
- [ ] Are all footer actions right-aligned with Cancel on the left?
- [ ] Are all type sizes from the `--cr-font-size-*` scale?
- [ ] Are rows separated by `Divider subtle`, not by gaps?
- [ ] Is any `Card` flat (no shadow) unless it is a hover state?
- [ ] Is the focus ring the default one (no custom `:focus-visible` override)?
- [ ] Did you avoid adding icons to every row?
- [ ] Are badges defaulting to `variant="neutral"` for informational labels, with colored variants reserved for states the user must react to (and never stacked down a whole column)?
- [ ] **Is the toolbar `actions` slot empty, or at most a single far-right `⋮` with content between it and the title?** No settings gear, no "+", no typography icon glued to the heading.
- [ ] If there is navigation, is it the right primitive (`PanelStack` / `Menu` / `Tabs`)?
- [ ] No gradient, no illustration, no marketing copy, no emoji in labels?

If any answer is "no," the layout is not Chromium-native yet. Fix before handing off.

## Common failure modes

When an LLM-produced layout looks wrong, it is almost always one of:

1. **Card-per-setting.** Collapse into a single card with rows.
2. **Primary on the left.** Flip.
3. **Full-bleed dialog.** Add `maxWidth: 420` (or 480 for form dialogs).
4. **Tabs used for navigation.** Replace with `Menu` or `PanelStack`.
5. **Colored page background.** Remove; use `--cr-fallback-color-surface`.
6. **Oversized title.** Reduce to `--cr-font-size-lg` in `<Toolbar>`.
7. **Settings gear (or any IconButton) in the header.** Demote to a `PanelRow` inside the content. See [Anti-patterns #16](./anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).

These seven fixes resolve the majority of "doesn't look like Chromium" feedback.
