---
id: styleguide-chromium-reference
title: Chromium source reference
slug: /styleguide/chromium-reference
description: The Chromium source-of-truth values for cr-elements, alongside the library's deliberate deviations for extension surfaces.
format: mdx
---

# Chromium source reference

Every number on this page is taken directly from Chromium's public source tree. When the guidance on other styleguide pages says "the page header is 56px," it is this page that backs the claim.

The library deliberately departs from a few Chromium values when the extension-UI surfaces it powers (popups, side panels, options pages) need a different shape than the surfaces Chromium itself paints. **Those deviations are flagged below** — value-shaped ones in extra columns next to the source value, shape-shaped ones in the [Deliberate deviations](#deliberate-deviations) section at the end. The Chromium value is the source of truth for the *Chromium baseline*; the library value is what `chromium-ui-react` ships, and is the right value to cite when building on this library.

All paths are relative to `chromium/src`. Browse at `https://chromium.googlesource.com/chromium/src/+/refs/heads/main/<path>` or `https://source.chromium.org/chromium/chromium/src/+/main:<path>`.

> **Maintenance rule.** Every implementing-turn PR that introduces or removes a deviation from this page updates it in the same commit.

## Shell (settings as the canonical example)

From `chrome/browser/resources/settings/settings_ui/settings_ui.html`:

| Property | Value | Source |
|---|---|---|
| Toolbar height | `56px` | `--cr-toolbar-height` |
| Sidebar width | `266px` | `--settings-menu-width` |
| Narrow breakpoint | `980px` | `narrow-threshold="980"` on `<cr-toolbar>` |
| Centered card max-width | `680px` | `--cr-centered-card-max-width` |
| Centered card width percentage | `0.96` | `--cr-centered-card-width-percentage` |
| Centered card min-width | `550px` | `.cr-centered-card-container` |

Below 980px, the sidebar collapses into a `<cr-drawer>` opened from a hamburger button in the toolbar.

## Section card

From `chrome/browser/resources/settings/settings_page/settings_section.html`:

| Property | Value |
|---|---|
| Card radius | `8px` (`--cr-card-border-radius`) |
| Card shadow | `var(--cr-elevation-2)` (`--cr-card-shadow`) |
| Card background | `white` (light) / `--google-grey-900 + 4%` (dark) |
| Card overflow | `hidden` |

The **settings card is not outlined — it is elevated**. A 1px-outline card is acceptable in this library for dense admin-style layouts, but the authoritative Chromium settings card has `elevation-2`. Prefer `<Card variant="elevated">` (or the library default) over `<Card variant="outlined">` when you are specifically reproducing a settings surface.

**Section title** (`<h2>` rendered *above* the card, not inside it):

| Property | Value | Source |
|---|---|---|
| Font size | `108%` of 13px ≈ **14px** | `#header .title` |
| Font weight | `400` (regular, **not** medium) | same |
| Color | `--cr-primary-text-color` | same |
| Letter-spacing | `0.25px` | same |
| Margin-top | `21px` (`--cr-section-vertical-margin`) | same |
| Margin-bottom | `12px` | same |
| Padding-top | `8px` | same |
| Padding-bottom | `4px` | same |

Note the surprise: settings section titles are **regular weight**, not medium. This is different from subpage titles (which are 14px/500) and dialog titles (15px).

## Rows

From `chrome/browser/resources/settings/settings_shared.css`:

| Variant | Min-height | Padding |
|---|---|---|
| `.settings-box` (single-line) | `48px` | `0 20px` |
| `.settings-box.two-line` | `64px` | `0 20px` |
| `.list-frame` (indented block) | — | `0 20px 0 60px` |
| `.list-item` (child of list-frame) | `48px` | `0` |

Between rows within a card: `border-top: var(--cr-separator-line)` = `1px solid rgba(0,0,0,.06)` light / `rgba(255,255,255,.10)` dark. The first row's top border is suppressed.

**Sub-row indent**: `--cr-section-indent-padding = 60px` = `--cr-section-padding (20) + --cr-section-indent-width (40)`.

## cr-link-row (the canonical row)

From `ui/webui/resources/cr_elements/cr_link_row/`:

Slot order, left to right:

1. `#startIcon` — 20px (`--cr-icon-size`), 16px right margin (`--cr-icon-button-margin-start`).
2. `#labelWrapper` — label + sublabel stacked. `flex: 1`, `padding-block: 12px`.
3. Default slot — trailing controls (a toggle, a button).
4. End icon — `cr-icon-button` with `cr:chevron-right` by default, or `cr:open-in-new` when `external`.

The row's own min-height is `48px`; if a sublabel is present it becomes a two-line row at `64px`.

## cr-toolbar

From `ui/webui/resources/cr_elements/cr_toolbar/cr_toolbar.css`:

| Property | Value |
|---|---|
| Height | `56px` |
| Background | page background (no separate fill) |
| Border / shadow | **none** — toolbar is flat |
| Logo size | `24×24` with `margin-inline-end: 16px` |
| Icon button inside toolbar | `32px` square |
| `#rightSpacer` padding-inline-end | `12px` |

The toolbar has **no border-bottom and no shadow** of its own — the visual separation comes from the card below it having its own elevation. This contradicts the "sticky app bar with shadow" pattern common in other design systems. Keep the toolbar flat.

## cr-dialog

From `ui/webui/resources/cr_elements/cr_dialog/cr_dialog.css`:

| Property | Value |
|---|---|
| Width | `512px` (default, overridable via `--cr-dialog-width`) |
| Border-radius | `8px` (`--cr-dialog-border-radius`) |
| Background | `white` (light) / `--google-grey-900` (dark) |
| Box-shadow | `0 0 16px rgba(0,0,0,.12), 0 16px 16px rgba(0,0,0,.24)` |
| Title font-size | `calc(15/13 * 100%)` = **15px** |
| Title padding | `20px 20px 16px 20px` |
| Body padding-x | `20px` (`--cr-dialog-body-padding-horizontal`) |
| Body color | `--cr-secondary-text-color` |
| Buttons container padding | `16px` |
| Buttons `justify-content` | `flex-end` (right-aligned) |
| Cancel margin-inline-end | `8px` |

The canonical dialog is **512px wide**, not narrow. Your ~320–420px confirmation-dialog instinct is a Material/Material-Web carry-over; Chromium's `cr-dialog` default is half of 1024px.

## Form field label

From `cr_shared_style_lit.css`, `.cr-form-field-label`:

| Property | Value |
|---|---|
| Font-size | `0.625rem` (≈ **10px**) |
| Font-weight | `500` |
| Letter-spacing | `0.4px` |
| Line-height | `1` |
| Color | `var(--cr-form-field-label-color)` = `--google-grey-700` in light |
| Margin-bottom | `8px` |
| Display | `block` |

Form labels in Chromium WebUI are **tiny uppercase-feeling caps-style labels**, not the 12–13px labels typical elsewhere. This is one of the most distinctive Chromium form details.

Form field spacing:

- `--cr-form-field-bottom-spacing: 16px` — gap between fields.
- `--cr-default-input-max-width: 264px` — default max-width for input fields.

## Buttons

From `cr_button.css`:

| Property | Value |
|---|---|
| Height | `36px` (`--cr-button-height`) |
| Edge spacing | `12px` (`--cr-button-edge-spacing`) |
| Text-transform | **none** (sentence case) |
| Ripple | yes — `cr-ripple` (paper-ripple port) |
| Ripple color | `--cr-button-ripple-color` = `--cr-active-background-color` default |

`action-button` = filled primary. `cancel-button` = default outlined + `margin-inline-end: 8px`. No gradient. No `text-transform: uppercase`.

The Chromium source also defines `tonal-button` (secondary-container fill) — `chromium-ui-react` deliberately does not expose this as a Button variant. Surveying the surfaces this library targets (settings, side panels, popups, options pages), the binary `action` + `outlined` split covers every use; the tonal middle tier reliably violates the "one primary per view" colour-budget rule when adopted. Reach for `outlined` whenever you would have reached for `tonal`.

## State colors

From `cr_shared_vars.css`:

| Token | Value | Notes |
|---|---|---|
| `--cr-hover-background-color` | `rgba(on-surface, .08)` | **8%**, not 6% |
| `--cr-active-background-color` | `rgba(on-surface, .12)` | **12%**, not 10% |
| `--cr-focus-outline-color` | `= --cr-fallback-color-primary` | Blue |
| Focus outline | `2px solid` + `2px` offset | On `:host-context(.focus-outline-visible):host(:focus)` |
| Icon-button focus | `inset 0 0 0 2px` box-shadow | Inset ring, not outline |
| `--cr-disabled-opacity` | `.38` | |

Hover and active overlays are slightly darker than you might expect. Plan accordingly.

## Card sizes per surface

Different Chromium surfaces use different card widths:

| Surface | Card max-width | Source |
|---|---|---|
| Settings | `680px` | `--cr-centered-card-max-width` |
| Downloads | `clamp(550px, 80%, 680px)` | `--downloads-card-width` |
| History | `960px` | `--card-max-width` (history shared_vars) |
| Bookmarks manager | (sidebar + flex list card) | `--card-max-width` (likely 960px) |

The **680px** width is the settings/downloads default. The **960px** width is used when the content is row-rich and density matters (bookmarks, history).

## Side panel

From `chrome/browser/resources/side_panel/shared/sp_shared_vars.css`:

| Token | Value |
|---|---|
| `--sp-body-padding` | `8px` |
| `--sp-card-block-padding` | `8px` |
| `--sp-card-inline-padding` | `16px` |
| `--sp-card-padding` | `8px 16px` |
| `--sp-card-gap` | `12px` |
| `--cr-sidepanel-header-height` | `48px` (shorter than main toolbar 56px) |

The side-panel toolbar is **48px**, not 56px. The padding is tighter everywhere — 8/12/16 instead of 16/24.

## Typography — the authoritative numbers

Derived directly from percentages in the stylesheets, assuming 13px base:

| Element | Size | Weight | Source |
|---|---|---|---|
| Body (default) | 13px | 400 | `<html>` in Chromium's WebUI base CSS |
| Settings section `<h2>` | 14px | **400** | `108%` of 13px |
| Subpage `<h1>` (`.cr-title-text`) | 14px | **500** | `107.6923%` of 13px |
| `cr-dialog` title | 15px | inherit (500 in practice) | `calc(15/13 * 100%)` |
| History day header (`.card-title`) | 16px | 500 | absolute px |
| Form field label | **10px** | 500 | `0.625rem`, `letter-spacing: .4px` |
| History time / domain | 12px | 400 | absolute px |
| Downloads item name | 13px | 500 | inherits size, overrides weight |

Notably missing: any heading size above 16px in normal WebUI flow. If you have 20px+ text, you have gone off-script.

## Font family

Chromium WebUI does **not** set an explicit `font-family` in `cr_elements/*.css`. It inherits from the browser-default WebUI CSS, which sets `font-family: Roboto, 'Segoe UI', sans-serif` on `<html>`.

**"Google Sans" is not used in `cr_elements`.** That font is Google-product-specific (Gmail, Calendar, the Google website). Including it in your font stack is a soft tell that the UI is targeting a Google product feel rather than a Chromium feel. This library's token includes it for broader compatibility; if you want strict Chromium fidelity, consider overriding `--cr-font-family` to omit it.

## Library calibration notes

Small deltas between this library's tokens and Chromium source, for transparency:

| Token | Library | Chromium source | Impact |
|---|---|---|---|
| `--cr-hover-background-color` | 6% | 8% | Library hovers are subtler than Chromium. |
| `--cr-active-background-color` | 10% | 12% | Library presses are subtler. |
| `--cr-card-shadow` | `= --cr-elevation-1` | `= --cr-elevation-2` | Library cards have a lighter shadow. |
| `--cr-font-family` | includes `'Google Sans'` | does not | Library adds Google Sans as second fallback. |

These are deliberate calibrations in this library — small enough that side-by-side comparison is close, intentional enough that the API surface stays stable. If pixel-perfect parity matters for your use case, override the tokens in your own CSS.

## File index (citations)

The authoritative files backing this page:

**Shared primitives (`ui/webui/resources/cr_elements/`):**

- `cr_shared_vars.css` — every `--cr-*` token.
- `cr_shared_style_lit.css` — `.cr-row`, `.cr-title-text`, `.cr-secondary-text`, `.cr-centered-card-container`, `.cr-form-field-label`.
- `cr_button/cr_button.css` — 36px height, action/tonal/cancel variants, no uppercase.
- `cr_dialog/cr_dialog.css` — 512px width, 15px title, right-aligned buttons.
- `cr_toolbar/cr_toolbar.css` — 56px height, flat.
- `cr_link_row/cr_link_row.ts` + `cr_link_row.css` — row slots and chevron.
- `cr_icon_button/cr_icon_button.css` — 32px / 20px, inset focus ring.
- `cr_toggle/cr_toggle.css` — 26×16 bar, 80ms linear.
- `cr_checkbox/cr_checkbox.css` — 16px, 2px border, 2px radius.
- `cr_tabs/cr_tabs.css` — 48px height, 14px/500, 2px indicator.
- `cr_action_menu/cr_action_menu.css` — 128px min-width, 4px radius, elevation-2.
- `cr_radio_group/cr_radio_group.css`.
- `cr_input/cr_input.css` — 264px max-width, 10px floated label.

**Settings (`chrome/browser/resources/settings/`):**

- `settings_ui/settings_ui.html` — 266px sidebar, 980 breakpoint.
- `settings_page/settings_section.html` — section card template.
- `settings_page/settings_subpage.html` — back arrow + title.
- `settings_shared.css` — `.settings-box`, `.list-frame`, `.list-item`, `.two-line`, `.separator`.
- `settings_vars.css` — settings-specific overrides.
- `settings_menu/settings_menu.html` — sidebar list.

**Bookmarks (`chrome/browser/resources/bookmarks/`):** `app.css`, `list.css`, `item.css`, `toolbar.css`.

**History (`chrome/browser/resources/history/`):** `shared_style.css`, `shared_vars.css`, `history_item.css`, `history_list.css`.

**Downloads (`chrome/browser/resources/downloads/`):** `manager.css`, `item.css`, `toolbar.css`.

**Side panel (`chrome/browser/resources/side_panel/`):** `shared/sp_shared_vars.css`, `reading_list/reading_list_app.css`.

## Deliberate deviations

The library is honest about the places it does **not** match `chromium/src` byte-for-byte. Each row below names what Chromium ships, what the library ships instead, and why — with a link to the implementing ticket so the reasoning is one click away.

### Value-shaped deviations

| Aspect | Chromium source | Library | Why |
|---|---|---|---|
| Tabs height | 48px (`cr_tabs.css`) | 36px (`Tabs.css`) | Extension surfaces (popups, side panels) are vertical-real-estate-constrained; 48px reads as a Material tab bar. ([#0015](../../initiatives/2026-04-28-design-and-styleguide/tickets/0015-tabs-reduce-default-height.md)) |
| Section labels | ALL CAPS sometimes (some menu group labels) | sentence case everywhere except the narrow `cr-form-field-label` use | ALL CAPS reads as older Material; sentence case is the dominant Chromium pattern in modern WebUI. ([#0005](../../initiatives/2026-04-28-design-and-styleguide/tickets/0005-drop-uppercase-section-labels.md)) |
| Action-row Cancel (next to a destructive primary) | `outlined` | `text` | Two pills (red + blue-outlined) compete for attention; the quieter `text` Cancel keeps the destructive verb owning the row. The rule is scoped — `outlined` Cancel survives next to `action` primaries. ([#0017](../../initiatives/2026-04-28-design-and-styleguide/tickets/0017-action-row-secondary-as-text.md)) |
| Settings page SearchInput border | implicit on form fields | borderless by default, filled pill on toolbar surface | Matches the visible look of `chrome://settings/languages` search; the bordered form-field shape would compete with the toolbar surface. ([#0024](../../initiatives/2026-04-28-design-and-styleguide/tickets/0024-settings-search-input-header-center-no-border.md)) |
| Card default | mostly elevated in `chrome://` (settings-section etc.); some outlined in dense admin | `elevated` is the library default | Anti-pattern #10 already says "elevated is the Chromium-faithful default"; the API now matches. ([#0014](../../initiatives/2026-04-28-design-and-styleguide/tickets/0014-card-elevated-as-default.md)) |
| Badge default | various filled accents in Chromium | outline-only, neutral default | Outline-only reads quieter; neutral first means agents reach for the right shape without typing a variant. (commit `77bafca` + [#0013](../../initiatives/2026-04-28-design-and-styleguide/tickets/0013-badge-neutral-first.md)) |
| Toolbar component name | `cr-toolbar` (Chromium source class) | `Header` (library export, `cr-header` class) | The component was always a page header, never a tools shelf — anti-pattern #16 exists because the old name kept inviting the misuse. ([#0018](../../initiatives/2026-04-28-design-and-styleguide/tickets/0018-rename-toolbar-to-header.md)) |
| Side-panel composition | bare-surface flat list (Reading List) | card-per-section with elevated cards | Reading List was the wrong reference for heterogeneous extension panels; the settings-page composition generalises better. ([#0008](../../initiatives/2026-04-28-design-and-styleguide/tickets/0008-side-panel-card-per-section.md)) |
| Side panel in-panel header | 48px header strip inside the panel | forbidden in side-panel extensions (Chrome paints a system header above the iframe) | A library `Header` inside the iframe would duplicate the system strip. Drill-in `PanelHeader` for subviews is still allowed. ([#0019](../../initiatives/2026-04-28-design-and-styleguide/tickets/0019-layout-shell-content-only-default-header-banned-in-side-panel.md)) |
| Tonal Button | `cr-tonal-button` exists | dropped from the library | Three filled tiers (action / tonal / outlined) reliably violate the "one primary per view" rule on a small surface; the binary action / outlined split is what Chromium actually settles on. ([#0009](../../initiatives/2026-04-28-design-and-styleguide/tickets/0009-drop-button-tonal-variant.md)) |

### Shape-shaped deviations

- **Primary action button placement on side panels.** Chromium's settings dialogs use right-aligned `[Cancel] [Primary]`. The library's [Pattern — Primary action button](./patterns/primary-action.md) puts the single primary **centred** in a pinned footer for side-panel surfaces, because the side panel's primary verb is the user's next move and centred is unambiguously the destination. ([Pattern — Primary action](./patterns/primary-action.md))
- **Settings entry placement and naming in extension surfaces.** Chromium does not standardise this — `chrome://` surfaces rely on persistent sidebars. The library's [Pattern — Settings entry](./patterns/settings-entry.md) requires the row to be labelled `Settings` (one word, sentence case) and placed in the upper half of the surface so the user reaches for it before pressing the primary verb again. ([#0026](../../initiatives/2026-04-28-design-and-styleguide/tickets/0026-settings-entry-pattern-placement-naming.md))
- **No `fullWidth` Button.** Chromium's button stack supports stretched-to-container width in some situations; the library removed the `fullWidth` prop entirely because a stretched button stops reading as a button. ([#0003](../../initiatives/2026-04-28-design-and-styleguide/tickets/0003-drop-button-full-width.md))
- **Stop button as `variant="destructive"`.** Chromium does not have a single "Stop running operation" idiom; the library's [Pattern — Primary action](./patterns/primary-action.md) running-state replacement is destructive, because interrupting useful in-flight work is structurally destructive. ([#0025](../../initiatives/2026-04-28-design-and-styleguide/tickets/0025-running-state-stop-as-destructive.md))
- **Sidebar Menu rendering.** A Menu with `role="navigation"` (sidebar use) renders flat — no shadow, no card, no border-radius — to match `chrome://settings`. Popover Menus (the default) keep elevation-3 + 8px radius. ([#0023](../../initiatives/2026-04-28-design-and-styleguide/tickets/0023-menu-navigation-flat-no-card.md))
