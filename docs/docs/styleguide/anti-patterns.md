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

**Right.** One card, multiple rows, shared divider.

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <List>
    <ListItem primary="Notifications" secondary="Allow notifications from this extension" end={<Toggle defaultChecked />} />
    <Divider subtle />
    <ListItem primary="Sync" secondary="Sync your data across devices" end={<Toggle />} />
    <Divider subtle />
    <ListItem primary="Auto-start" secondary="Launch this extension on browser startup" end={<Toggle />} />
  </List>
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

A settings card has a **subtle elevation-2 shadow** — `<Card variant="elevated">` or the library default. Outlined cards are an acceptable alternative for dense admin layouts, but the Chromium-faithful default is shadowed. A settings row has **no shadow at all** — row separators are 1px hairlines inside the card.

## 11. Primary color on secondary actions

**Wrong.** Every button uses `variant="action"` because "it looks friendlier."

**Right.** Exactly one primary action per view. Everything else is `outlined`, `text`, or `tonal`. A screen full of blue filled buttons has no primary.

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

---

If you catch any of these in review, the fix is usually: remove a card, remove a shadow, remove a color, remove an icon, remove a heading. Restraint is the default setting.
