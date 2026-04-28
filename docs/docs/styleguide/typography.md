---
id: styleguide-typography
title: Typography
slug: /styleguide/typography
description: The small, tight type scale actually used across Chromium WebUI. Why the default body size is 13, and when to reach for 11, 12, 14, 16, or 20.
format: mdx
---

# Typography

Chromium WebUI uses a deliberately tight type scale. The body is small (13px), the scale has few steps, and medium weight is used for emphasis instead of larger sizes. If your surface has a 28px display heading, it is not a Chromium surface.

## The scale

All sizes are `--cr-font-size-*` tokens. Do not invent values between or beyond the scale.

| Token | Size | Weight | Where it appears |
|---|---|---|---|
| `--cr-font-size-xs` | 11px | 500 | Tiny inline labels, badges, kbd hints, the rare 10–11px caps form-field label *above a single input*. **Not** a section-grouping label; section titles use `--cr-font-size-base` weight 400 — see [Sections & rows](./sections-and-rows.md). |
| `--cr-font-size-sm` | 12px | 400 | Secondary row text, hint text, timestamps, kbd shortcuts |
| `--cr-font-size-md` | 13px | 400 | **Default body.** `ListItem` primary, menu items, button labels, link row titles |
| `--cr-font-size-base` | 14px | 500 | Section titles, card titles, dialog body text |
| `--cr-font-size-lg` | 16px | 500 | `Toolbar` title, `Dialog` title |
| `--cr-font-size-xl` | 20px | 400 | Rare — only for large `settings-main`-style page headings on full-tab surfaces |
| `--cr-font-size-2xl` | 24px | 400 | Do not use in functional surfaces. Reserved for marketing-like splash pages (which are off-brand for Chromium WebUI anyway) |

Weight-500 ("medium") is the workhorse emphasis. Do not use weight-700 (bold) in body text — Chromium reserves bold for `<kbd>` indicators and specific data-emphasis cases.

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'var(--cr-font-family)' }}>
  <div style={{ fontSize: 20 }}>20px — page title (rare)</div>
  <div style={{ fontSize: 16, fontWeight: 500 }}>16px medium — toolbar / dialog title</div>
  <div style={{ fontSize: 14, fontWeight: 500 }}>14px medium — section title</div>
  <div style={{ fontSize: 13 }}>13px regular — default body (most common)</div>
  <div style={{ fontSize: 12, color: 'var(--cr-fallback-color-on-surface-subtle)' }}>12px subtle — secondary text, hints</div>
  <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--cr-fallback-color-on-surface-subtle)' }}>11px subtle — kbd hint, tiny label</div>
</div>
```

## The family

```
Roboto, 'Google Sans', 'Segoe UI', system-ui, -apple-system, sans-serif
```

The fallback order is intentional:

- **ChromeOS:** Roboto.
- **Windows:** Segoe UI (Roboto is rarely installed).
- **macOS:** SF (via system-ui / -apple-system).
- **Linux:** whatever `system-ui` resolves to.

This is what a real Chromium build uses on each platform. **Do not override `--cr-font-family`.** Importing Inter, Manrope, Plus Jakarta Sans, or a corporate font breaks the cross-platform convergence that makes the library look native.

Monospace (`--cr-font-family-mono`) is `'Roboto Mono', 'Courier New', Courier, monospace` — use for keyboard shortcuts, code, URLs in debug UIs.

## Hierarchy patterns

Chromium composes hierarchy with **three tools, in this order of preference**:

1. **Weight.** 500 vs 400 at the same size.
2. **Color.** `on-surface` vs `on-surface-subtle`.
3. **Size.** Only when weight + color is insufficient.

Almost every "this needs to stand out" situation is solved by (1) or (2). Reach for (3) last.

### Section title + description

Chromium's actual settings-section pattern: a plain `<h2>` at **14px weight 400** above the card, with optional body copy in the card at 13px.

```tsx live
<div style={{
  maxWidth: 680,
  fontFamily: 'var(--cr-font-family)',
  color: 'var(--cr-fallback-color-on-surface)',
}}>
  <h2 style={{
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: '0.25px',
    margin: '0 0 12px 0',
    padding: '8px 0 4px',
  }}>
    Privacy and security
  </h2>
  <div style={{ fontSize: 13, color: 'var(--cr-fallback-color-on-surface-subtle)' }}>
    Settings that control what information sites can use and show, including cookies, JavaScript, and pop-ups.
  </div>
</div>
```

This is the canonical pattern in `chrome://settings` (see `settings_section.html`). Note that the section title is **regular weight, not medium** — that is the single most commonly missed detail.

### The 11px caps label — form-field labels only

The 11px (or 10px in Chromium source) caps label has exactly one Chromium-native use: above a single input on a form, where it acts as the field's accessible label. The library exposes this as the `.cr-label-small` utility — `text-transform: uppercase`, `letter-spacing: .4px`, weight 500. It is not a section-grouping label and must not be reached for as one.

```tsx live
<div style={{ maxWidth: 320 }}>
  <div className="cr-label-small">Display name</div>
  <Input placeholder="Your name" style={{ marginTop: 4 }} />
</div>
```

**Section grouping** uses the 14px regular `<h2>` pattern shown above, never the 11px caps label. This is the single most-confused rule in the library — see [Anti-pattern #21](./anti-patterns.md#21-all-caps-section-labels).

### Row primary + secondary

```tsx live
<ListItem
  primary="Startup"
  secondary="Open the New Tab page"
  end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
  interactive
  style={{ maxWidth: 520, border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}
/>
```

Primary is 13px `on-surface`. Secondary is 12px `on-surface-subtle`. This is applied automatically by `<ListItem>` — do not override.

## Line-height

Line-height is set by `base.css` — 1.4 for body, 1.2 for headings. Do not override on individual components.

## Long text

Chromium surfaces rarely contain paragraphs of body text. When they do (e.g., a privacy explanation, a changelog):

- Max line length is the 680px content column. Do not stretch to 1200px — lines become unreadable.
- Use 13px (`--cr-font-size-md`) for body, 14px for quoted / emphasized prose.
- Paragraph spacing is `--cr-space-3` (12px) between `<p>`s, not `<br>`s.

## Avoid

- **Display sizes.** No 28, 32, 36, 48px text. Chromium does not have a display scale.
- **Italic for emphasis.** Use weight-500 instead. Italic is reserved for cited titles in prose.
- **Uppercase-everything buttons.** Button labels are sentence case.
- **Letter-spacing experiments.** The only tracked text in Chromium is the 10–11px caps form-field label (~0.4px). Nothing else gets tracked.
- **Custom font imports.** See "The family" above — the fallback stack is the brand.
- **Mixing 12 and 13 for the same role.** Pick one per row role and stick with it across your app.

Every time you are about to use a size not on the scale, the right answer is almost always weight-500 on the size below.
