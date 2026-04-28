---
id: styleguide-principles
title: Principles
slug: /styleguide/principles
description: The five design principles that every Chromium WebUI surface respects. Internalize these before composing anything.
format: mdx
---

# Principles

Every decision in this styleguide follows from one of five principles. When you hit a situation this guide does not cover, fall back to these.

## 1. Restraint over expression

Chromium WebUI is deliberately quiet. It has no hero sections, no illustrations in functional flows, no gradients, no shadows beyond the ones needed for elevation semantics, no decorative color. The page is mostly whitespace and rows.

**Consequence.** Your default instinct should be to remove. If you are debating whether to add a separator, an icon, a title decoration, a background tint — do not add it.

**Smell test.** If a screenshot of your UI would look *quieter* next to `chrome://settings`, you have overproduced it.

## 2. Rows are the unit of composition

Almost every Chromium surface is a vertical stack of rows. A row is a fixed-height strip containing one label, optional secondary text, and one control or chevron on the right. Rows are separated by a 1px divider or by section grouping — never by a gap larger than a few pixels.

**Consequence.** When you have a choice between "a row" and "a card," pick the row. Cards are for grouping rows together in a settings page, not for individual settings.

```tsx live
<List style={{ maxWidth: 520, border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}>
  <ListItem primary="Show home button" secondary="Replaces the tab's new-tab page" end={<Toggle defaultChecked />} />
  <Divider />
  <ListItem primary="Startup" secondary="Open the New Tab page" end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} interactive />
  <Divider />
  <ListItem primary="Site Settings" secondary="Controls what information sites can use and show" end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>} interactive />
</List>
```

This is recognizably Chromium. Two `Card`s of the same content, with their own titles and padding, would not be.

## 3. Drill-in over expand

When a setting has sub-settings, Chromium hides them behind a row and slides in a subpage. It does not expand them inline. This keeps the top-level surface scannable and every list the same length regardless of user state.

**Consequence.** Use `PanelStack` (for side panels and popups) or router-backed subpages (for full WebUI-style pages) before you reach for an accordion, expand/collapse, or an "Advanced" details.

See the [Navigation](./navigation.md) page for which primitive to pick.

## 4. The action row is a pair, right-aligned

Every Chromium confirmation has exactly two buttons, right-aligned, with the secondary (Cancel) on the left and the primary/destructive on the right. Not three buttons. Not center-aligned. Not stacked.

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

**Consequence.** If you have three actions, one of them is either a menu item or a separate affordance earlier in the flow — not a third footer button.

## 5. Tokens, not pixels

Every spacing, color, radius, and font-size in your code should map to a `--cr-*` token. The library exposes them on `:root`; you reference them with `var(--cr-space-4)`, not `16px`. This is how `prefers-color-scheme` switches work, how High Contrast Mode is respected, and how a theme override can retint the whole surface with a single CSS variable redeclaration.

**Consequence.**

- Hex codes in your stylesheet are a bug.
- Raw `px` values in JSX inline styles are a code smell. Prefer `var(--cr-space-4)` or the equivalent token.
- Media queries for dark mode in your own code are a bug — the tokens already flip.

See [Color & surfaces](./color.md) and [Spacing & rhythm](./spacing.md) for the specific tokens to reach for.

---

If you remember only one thing: **Chromium UI is a list of rows on a quiet background.** The rest is details.
