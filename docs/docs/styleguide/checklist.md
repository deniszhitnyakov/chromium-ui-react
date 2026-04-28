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

The shell is content-first; the header and the pinned footer are opt-in based on the surface:

```
┌─────────────────────────────────┐
│  Header (opt-in)                │  ← cr-header — 56px when present
├─────────────────────────────────┤
│                                 │
│  Content (mandatory)            │  ← scrollable region
│                                 │
├─────────────────────────────────┤
│  Footer actions (opt-in)        │  ← only for popups with a single primary action
└─────────────────────────────────┘
```

| Surface | Header | Footer |
|---|---|---|
| Extension popup | Optional | Optional |
| Extension **side panel** | **Forbidden** (Chrome paints a system header above the iframe — duplicating it inside is [Anti-pattern #25](./anti-patterns.md#25-in-panel-header-in-a-side-panel-extension)). `PanelHeader` for drill-in subviews remains allowed. | Optional |
| Full-tab options page | Recommended | Rare (settings save inline) |
| In-page injected UI | Rarely | Rare |

- When you do render a header, use `<Header title="..." />`. **Never** replace it with a custom `<h1>` in a header div.
- Content below scrolls. Header (when present) stays fixed.
- **The header `actions` slot is empty by default.** Do not park a settings gear, a "+", or any other `IconButton` next to the title — see [Anti-patterns #16](./anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header). A settings entry point is a drill-in `PanelRow` inside the content, not an icon in the header.
- For popups and side panels: use `display: flex; flex-direction: column; height: 100vh` so the (optional) header is pinned, content scrolls, footer pins.
- For options pages: content max-width is **680px**, centered. Do not stretch settings to the full viewport.

## Step 3 — Composition

Compose the content as a **vertical stack of rows inside one or more cards**. In Chromium:

- A "section" is a `<Card>` (default `elevated` — Chromium-faithful subtle elevation-2 shadow) containing a `<List>` of `<ListItem>`s, or a stack of dedicated row primitives like `<ToggleRow>`.
- **Side panels are composed the same way** — each section is its own elevated `<Card>` with a sentence-case `<h2>` heading above it. The bare-list shape was modelled on Chrome's Reading List and does not generalise.
- Sections may have a 14px regular-weight `<h2>` heading above them, sentence case — not inside the card. **Never** an ALL CAPS label.
- Rows are separated by `<Divider subtle />`.
- Common row shapes (not exhaustive — see [Sections & rows — Common row shapes](./sections-and-rows.md#common-row-shapes)):
  - **Toggle row** — use `<ToggleRow primary="..." secondary="..." defaultChecked />`. The whole row is one click target. *Do not* use `<ListItem end={<Toggle />}>` for toggle-only rows — it swallows clicks outside the switch.
  - **Drill-in row** — `primary` + `secondary` + chevron + `interactive` (or `<PanelRow navigateTo="...">` inside a `PanelStack`).
  - **Inline-control row** — `primary` + `end={<Select />}` (or `<Input />`) for enum / short free-form values.
  - Plus **read-only value**, **status / progress** (Spinner / Progress), **status badge**, **action row** (single `Button variant="text"` in `end`).
- **Settings entry row** is labelled exactly `Settings` (one word, sentence case — never `Options` / `Preferences` / `Reader settings`) and placed in the **upper half** of the surface (typically the first 1–3 rows after the primary status / verb). See [Pattern — Settings entry](./patterns/settings-entry.md).

```tsx
<Card>
  <ToggleRow primary="Notifications" secondary="Allow notifications" defaultChecked />
  <Divider subtle />
  <ToggleRow primary="Sync" />
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
| 16 | `--cr-font-size-lg` | Header title, dialog title |
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

- Put them in a **right-aligned row** at the bottom of the surface or dialog. Side-panel surfaces are the exception — see [Pattern — Primary action button](./patterns/primary-action.md) for the centred-in-pinned-footer rule there.
- Order: `[Cancel] [Primary]`. Not the other way around.
- Exactly two buttons. If you have a third, move it into a Menu behind an `IconButton`.
- Primary is `variant="action"`. Destructive is `variant="destructive"`. Stop / abort verbs (interrupting in-flight work) are also `variant="destructive"`.
- **Cancel's variant follows the primary.** Next to an `action` primary, Cancel is `outlined` (Chromium-native — pill outline against a filled pill is enough contrast). Next to a `destructive` primary, Cancel is `variant="text"` (the library divergence — quieter Cancel keeps the destructive verb owning the row). See [Anti-pattern #24](./anti-patterns.md#24-non-text-cancel-next-to-a-destructive-primary).
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
- [ ] **Is the header `actions` slot empty, or at most a single far-right `⋮` with content between it and the title?** No settings gear, no "+", no typography icon glued to the heading.
- [ ] If the surface is an extension side panel, **is there no in-panel `<Header>`?** Chrome paints a system header above the iframe. (`PanelHeader` for drill-in subviews is fine.)
- [ ] If a `Settings` row exists, is it labelled exactly `Settings` (not `Options` / `Reader Settings`) and placed in the upper half of the surface?
- [ ] Are toggle-only rows using `<ToggleRow>` (whole row clickable), not `<ListItem end={<Toggle />}>`?
- [ ] Are icons real SVGs (Material Symbols outlined, 20px, weight 400) — never Unicode glyphs like `⋮` `↻` `✓` or emoji?
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
6. **Oversized title.** Reduce to `--cr-font-size-lg` in `<Header>`.
7. **Settings gear (or any IconButton) in the header.** Demote to a `PanelRow` inside the content. See [Anti-patterns #16](./anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
8. **Full-width primary action.** Stretching a button edge-to-edge produces a banner. Buttons are content-sized; use [Pattern — Primary action button](./patterns/primary-action.md) for the side-panel pinned-footer shape. See [Anti-patterns #19](./anti-patterns.md#19-full-width-primary-action-in-a-narrow-footer).
9. **Settings entry buried at the bottom.** Move it to the upper half (typically the first 1–3 rows after the primary status). Label it exactly `Settings`. See [Anti-patterns #26](./anti-patterns.md#26-settings-entry-buried-at-the-bottom-of-the-surface).
10. **In-panel `<Header>` in a side-panel extension.** Chrome paints a system header above the iframe — drop the in-panel one. See [Anti-patterns #25](./anti-patterns.md#25-in-panel-header-in-a-side-panel-extension).
11. **ALL CAPS section labels.** Use sentence case 14px regular `<h2>` above each card. The 11px caps recipe is for the narrow `cr-form-field-label` use only. See [Anti-patterns #21](./anti-patterns.md#21-all-caps-section-labels).
12. **Unicode characters as icons.** `⋮` `↻` `✓` `🔒` render at inconsistent sizes / weights / baselines per OS. Use Material Symbols outlined (20px / weight 400) SVGs. See [Anti-patterns #23](./anti-patterns.md#23-unicode-characters-as-icons).
13. **`<ListItem end={<Toggle />}>` for a toggle-only row.** Use `<ToggleRow>` so the whole row is clickable. See [Anti-patterns #18](./anti-patterns.md#18-toggle-parked-inside-listitemend).
14. **Cancel as `outlined` next to a destructive primary.** Switch Cancel to `variant="text"` so the destructive verb owns the row. (`outlined` Cancel is correct next to an `action` primary.) See [Anti-patterns #24](./anti-patterns.md#24-non-text-cancel-next-to-a-destructive-primary).

These fixes resolve the majority of "doesn't look like Chromium" feedback.
