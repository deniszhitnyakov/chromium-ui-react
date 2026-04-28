---
id: styleguide-color
title: Color & surfaces
slug: /styleguide/color
description: What gets colored and what stays grey. Surface hierarchy, text hierarchy, and the short list of semantic accents.
format: mdx
---

# Color & surfaces

Chromium WebUI is overwhelmingly neutral. Most of the surface is white or grey; color is a scarce resource used only for meaning — the primary action, the focused field, the destructive confirmation, the error state. If more than ~5% of your pixels are colored, it is not a Chromium surface.

## The color budget

| Role | Token | Where |
|---|---|---|
| **Page / card background** | `--cr-fallback-color-surface` | Base of every surface |
| **Nested / tinted background** | `--cr-fallback-color-surface-1` | Subtle grouping, filled inputs, hovered card |
| **Primary text** | `--cr-fallback-color-on-surface` | Row primary, titles, button labels |
| **Secondary text** | `--cr-fallback-color-on-surface-subtle` | Row secondary, hints, placeholders, "›" chevrons |
| **Border (heavy)** | `--cr-fallback-color-outline` | Card outline, input border |
| **Border (hairline)** | `--cr-divider-color` | Divider, Header/Header bottom border, pinned-footer top border |
| **Primary accent** | `--cr-fallback-color-primary` | The single primary button, checked toggle, focus ring, links |
| **Error** | `--cr-fallback-color-error` | Destructive button, inline error text |

That is **eight roles**. You should be able to describe every colored pixel in your UI as one of these eight. The two border roles are deliberate: the *heavy* outline gives a card or input its visual edge; the *hairline* divider is the quiet seam between rows of the same surface and bracketing chrome (Header bottom, pinned-footer top). Mixing them produces the kind of one-pixel asymmetry the eye keeps re-noticing.

## Surface hierarchy

Chromium does not layer surfaces the way Material does. There is no 8-level elevation tint. There are just two surfaces: the page, and the subtle-tinted variant for nested contexts.

```tsx live
<div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
  <div style={{
    flex: 1,
    padding: 16,
    background: 'var(--cr-fallback-color-surface)',
    border: '1px solid var(--cr-fallback-color-outline)',
    borderRadius: 8,
    fontFamily: 'var(--cr-font-family)',
    fontSize: 13,
  }}>
    <div style={{ fontWeight: 500, marginBottom: 4 }}>Surface (default)</div>
    <div style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>
      Page background, card background, dialog background
    </div>
  </div>
  <div style={{
    flex: 1,
    padding: 16,
    background: 'var(--cr-fallback-color-surface-1)',
    border: '1px solid var(--cr-fallback-color-outline)',
    borderRadius: 8,
    fontFamily: 'var(--cr-font-family)',
    fontSize: 13,
  }}>
    <div style={{ fontWeight: 500, marginBottom: 4 }}>Surface-1 (subtle)</div>
    <div style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>
      Filled inputs, hovered rows, the "disabled" readonly zone, footer strips
    </div>
  </div>
</div>
```

Never introduce a third surface tint. If you feel you need one, you are probably trying to nest a card inside a card — flatten the hierarchy instead.

## Text hierarchy

Two colors. That is it.

- `--cr-fallback-color-on-surface` (primary, near-black)
- `--cr-fallback-color-on-surface-subtle` (secondary, ~60% black)

Disabled text is handled by component state, not by a third color token.

Links on body text use `--cr-fallback-color-primary`. They are **not** underlined by default in Chromium WebUI — they change color on hover and get an underline on focus. The `<Link>` component implements this.

## The primary accent

`--cr-fallback-color-primary` is the one reusable blue. It appears in:

- The single `variant="action"` button on a view.
- The checked state of `Toggle`, `Checkbox`, `Radio`.
- The focus ring (`--cr-focus-outline-color` aliases to it).
- Inline `<Link>` text.
- The active state of a navigation `MenuItem selected`.

It should **not** appear in:

- Body text.
- Icons on rows (those are subtle grey or neutral).
- Backgrounds of large regions.
- Borders (except the focus ring).

If your screen has five blue things, five is four too many. Audit and remove.

## Error / destructive color

`--cr-fallback-color-error` is used for:

- `Button variant="destructive"` — the single destructive confirmation button.
- Inline error text under a form field (`Input error="..."`).
- The `Badge variant="error"` for critical badges.
- Icons in an `error` `Toast`.

It does **not** appear on:

- Row backgrounds. (Never highlight a whole row red.)
- Borders of fields with invalid content — the inline error text is the signal, the border stays `--cr-fallback-color-outline`.

## State colors

Chromium rows and buttons use two overlay tokens for hover / active states:

- `--cr-hover-background-color` — 8% overlay on the current `on-surface` color (the library ships 6% — see [Chromium reference / Library calibration notes](./chromium-reference.md#library-calibration-notes)).
- `--cr-active-background-color` — 12% overlay on the current `on-surface` color (library: 10%).

These flip automatically in dark mode. Do not override hover/active with a custom blue — they should read as "slightly darker" in light and "slightly lighter" in dark.

## Focus ring

Every focusable element gets:

```
outline: 2px solid var(--cr-focus-outline-color);
outline-offset: 2px;
```

The components handle this via `:focus-visible`. Rules:

- **Never disable it.** `outline: none` without a replacement fails WCAG and fails the Chromium aesthetic.
- **Never change the color.** It is `--cr-fallback-color-primary` and that is the only correct color.
- Adjust `outline-offset` if a dense layout needs it (e.g., 1px offset inside a bordered card). That is the only acceptable tweak.

## Badge and toast color

The one place where additional accents are OK:

- `Badge variant="success"` — green (`--google-green-700` border + text in light mode, `--google-green-300` in dark).
- `Badge variant="warning"` — yellow.
- `Badge variant="error"` — red.
- `Badge variant="neutral"` — grey.

These are used for small inline status indicators only: "Online", "Syncing", "3 new". They are **never** applied to full rows, buttons, or section backgrounds.

Toasts follow the same palette for their left accent strip — the body remains neutral.

### Badge defaults: quiet first

Badges are attention magnets. A row of solid-filled badges competes with the primary action for the user's eye and produces the same "too much color" feeling as a colored page background — so the library does not ship one. Every `Badge` is an outline: a 1px border and matching text color with a transparent fill. There is no `appearance` prop.

The remaining decision is which **variant** to use:

- **Prefer `variant="neutral"` over colored variants.** Most status labels ("Beta", "Draft", "Archived", "Experimental", a plain count like "3") are informational, not actionable — grey says "here is a label" without inventing a color hierarchy. Reserve `success` / `warning` / `error` for states the user actually has to react to.
- **Don't stack colored badges in a list.** A column of green/yellow/red status pills in a results table or scrape preview is exactly the "wall of color" the outline-only default is meant to prevent. If five rows in a row have a colored badge, the column has lost its meaning — drop them all to neutral, or move the differentiator into the row's secondary text.

The rule is: **neutral first, colored only when the user must react.** If you find yourself reaching for a colored badge on every row, you are decorating, not signalling.

## Dark mode

You do nothing. The tokens flip via `prefers-color-scheme: dark`, and every component re-renders correctly. **Do not write `@media (prefers-color-scheme: dark)` queries in your own CSS.** If a piece of your UI looks wrong in dark mode, the bug is almost always that you hardcoded a hex value — replace it with a token.

To force dark mode (e.g. for a dark-themed extension popup regardless of the user's OS preference):

```tsx
<div data-cr-theme="dark">
  {/* your UI */}
</div>
```

This is the only escape hatch. It is declarative, it is scoped, and it does not require a provider.

## High Contrast Mode

On Windows High Contrast Mode, the tokens resolve to system colors (`Canvas`, `CanvasText`, `Highlight`, `LinkText`, etc.) via `forced-colors` media queries that the library ships with. Do not override these.

If you use raw hex values, they stay hardcoded in High Contrast Mode and your UI becomes unreadable. This is the third reason to use tokens (after dark mode and theming) — accessibility in forced-colors environments.

## Avoid

- **Brand gradients.** Linear or radial gradients are not a Chromium pattern.
- **Tinted backgrounds for sections.** Sections differ by card outline, not background.
- **Using `--google-blue-*` raw tokens.** Always go through `--cr-fallback-color-primary`. Raw palette tokens are for edge cases (charts, highlights inside a code editor), not for component chrome.
- **Custom dark mode code.** The library does dark mode. You do not.
- **Colored text for "tone."** Don't make "Important!" red or "Tip:" green inline. Use a `Toast` or a `Badge`.
- **Removing the focus ring.** Non-negotiable.

Every time you feel an urge to add color, ask: does this communicate a state a user needs to act on? If the answer is no, it stays grey.
