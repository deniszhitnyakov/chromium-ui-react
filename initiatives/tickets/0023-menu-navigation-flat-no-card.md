---
title: "Ticket 0023 — Menu in role='navigation' (sidebar): drop shadow + radius, render flat to match native chrome://settings"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0023 — Menu in role='navigation' (sidebar): drop shadow + radius, render flat to match native chrome://settings

## Status

**open**

## Summary

`Menu` ships a single visual style — an elevation-3 shadowed card with rounded corners. That is correct for popover / dropdown menus (where the menu floats above content and needs a visible elevation), but wrong for sidebar navigation menus, which in native `chrome://settings` are completely flat: no card, no shadow, no rounded corners, just rows on the page surface separated by the sidebar's right border. The library currently paints both contexts the same way, and the sidebar in the styleguide's settings-page pattern (and in the composition-navigation page) inherits the popover-card shadow it should not have. Operator attached a screenshot of `chrome://settings/languages` showing the flat shape. Fix: split the styling by role — `Menu role="navigation"` renders flat; the popover use stays elevated.

## Context

Source of the report: operator viewed the `Composition → Navigation` page and the `Settings page` pattern, opened `chrome://settings/languages` for comparison, and called the current sidebar treatment "сверстано отвратительно". Screenshot attached confirms: native sidebar items sit on the bare surface, no card outline, no shadow, no rounded corners; only the right border of the sidebar column separates it from the content area.

Library state — [`packages/chromium-ui-react/src/components/Menu/Menu.css`](packages/chromium-ui-react/src/components/Menu/Menu.css):

| Property | Current value | Defined at |
|---|---|---|
| `.cr-menu` `background` | `var(--cr-fallback-color-surface)` | line 2 |
| `.cr-menu` `border-radius` | `var(--cr-radius-md)` | line 3 |
| `.cr-menu` `box-shadow` | `var(--cr-elevation-3)` | line 4 |
| `.cr-menu` `padding` | `8px 0` | line 5 |
| `.cr-menu` `min-width` | `140px` | line 6 |
| `.cr-menu` `overflow` | `hidden` | line 7 |
| `.cr-menu__label` | `text-transform: uppercase` (already covered by ticket #0005) | line 73 |

Where the navigation use is documented:

- [`docs/docs/styleguide/patterns/settings-page.md:35`](docs/docs/styleguide/patterns/settings-page.md#L35) — `<Menu role="navigation">` inside the sidebar `<nav>` element. The `role="navigation"` is already on the call site — the discriminator the fix needs is *already there*.
- The composition-navigation page (`docs/docs/styleguide/navigation.md` — verify on implementation) likely has a similar example.

Where the popover use is correct (do not regress):

- `Menu` opened from an `IconButton` (overflow `⋮`, action menus on rows, etc.) — these *should* keep the elevation-3 shadow because they float above the content.
- The styleguide's anti-pattern #16 right-side example uses an overflow-menu IconButton; the popover render there should stay shadowed.

Native Chromium reference (operator's screenshot of `chrome://settings/languages`):

- Sidebar navigation: flat list of menu items on the page surface, single right border separating sidebar from content, no per-item card, no group card. Active item gets a tinted background (`--cr-fallback-color-surface-1` or similar) — that part the library already does correctly via `cr-menu-item--selected`.

The discriminator: `role="navigation"` (already on the navigation use) vs. no role (or `role="menu"`, the default for popover menus). CSS `[role="navigation"]` attribute selector is the cleanest way to scope without touching the JSX API.

## What hurts and why

Three problems:

1. **The styleguide pattern looks unlike Chromium where it claims to mirror it.** Settings-page pattern's frontmatter literally says "matching `chrome://settings`" — but the sidebar paints with an elevation-3 shadow and a rounded card outline that `chrome://settings` does not have. Anyone copying from the pattern produces non-Chromium output by following instructions. Same shape as ticket #0005's section-label contradiction and #0008's bare-surface side-panel: the styleguide claims one thing and ships the other.
2. **One Menu styling cannot serve two contexts.** A popover dropdown floating above content needs elevation to read as "above"; a sidebar pinned to the page needs no elevation because there is nothing for it to be "above". Treating them identically gives one of the two contexts the wrong affordance — and the more common, more visible context (sidebar nav in a settings page) is the one that loses.
3. **The fix is one CSS rule.** `[role="navigation"].cr-menu { box-shadow: none; border-radius: 0; }` + drop the `padding` if it does not need to be there. The discriminator already exists at every navigation call site. The cost of this fix is approximately one commit, the upside is one less visible "this looks Material, not Chromium" complaint.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Attribute-selector scoping.** Add `.cr-menu[role="navigation"] { box-shadow: none; border-radius: 0; padding: 0; }` (or the equivalent — implementer to verify what padding the navigation use wants). Keep the popover styling as the default. Update the settings-page and composition-navigation examples if any inline overrides become redundant. Pros: smallest possible change; no API surface change; the navigation call sites already pass `role="navigation"`. Cons: the visual style now depends on an HTML attribute that some consumers might forget to set; if they do, they get the popover style by default in a navigation context.

2. **New `appearance` prop on Menu.** Add `appearance?: 'popover' | 'navigation'` (default `'popover'`). The composition-navigation use becomes `<Menu appearance="navigation" role="navigation">`. Pros: explicit; type-safe; no reliance on a stringly-typed HTML attribute. Cons: redundant with `role="navigation"` (which is *required* for accessibility anyway); two ways to say the same thing.

3. **Separate component: `<NavMenu>`.** A thin wrapper that composes `Menu` with the navigation styling and the right `role`. Pros: separation of concerns at the API level; impossible to mix up. Cons: yet another component to remember; the actual styling difference is one CSS rule, hardly enough to justify a new export.

Working hypothesis (subject to revision when the work starts): direction 1 (attribute selector). The discriminator already exists, accessibility already requires it, the CSS fix is mechanical. Direction 2's "explicit prop" is appealing in principle but the prop and the role would always agree — adding a prop only to mirror a required ARIA attribute is overhead. Direction 3 is overengineering for a one-rule fix.

## Acceptance hints

- `.cr-menu[role="navigation"]` rule added to `Menu.css` that nulls the popover-card styling: `box-shadow: none`, `border-radius: 0`, `padding` zero or whatever the navigation use needs (likely zero so the sidebar gets edge-to-edge rows).
- Popover Menu (without `role="navigation"`) keeps `var(--cr-elevation-3)` and `var(--cr-radius-md)` — verify by checking any popover live preview after the change.
- Settings-page pattern's sidebar renders flat, edge-to-edge, with the right border of the `<nav>` element being the only separator between sidebar and content — matches the operator's `chrome://settings/languages` screenshot.
- Composition-navigation page's sidebar example renders flat too.
- The `.cr-menu__label` `text-transform: uppercase` issue is not in scope here — already covered by ticket #0005.
- The active-item tint (`cr-menu-item--selected`) survives both contexts.
- `npm run build:lib && npm run build:docs` stays green; spot-check Menu live previews in light and dark mode.
- Release: minor version bump (visual change for a public component, even if no JS API change).

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Strongly related: ticket #0024 (settings-page SearchInput placement + no border) — same pattern page, same operator turn. Ticket #0005 (drop ALL CAPS) — Menu.css already in scope there for `.cr-menu__label`, this ticket touches the same file; coordinate.
- Related: ticket #0008 (side-panel card-per-section) — same shape of "styleguide claims to match Chromium but ships a card where Chromium has none".
- Related ADRs: _none yet_
- Reference Chromium surface: `chrome://settings/languages` (operator's screenshot attached to the report); also `chrome://settings/appearance`, `chrome://settings/privacy`, `chrome://settings/performance`.
- Library files in scope: `packages/chromium-ui-react/src/components/Menu/Menu.css`.
- Docs to verify post-fix: `docs/docs/styleguide/patterns/settings-page.md`, `docs/docs/styleguide/navigation.md`, `docs/docs/components/menu.md`.
