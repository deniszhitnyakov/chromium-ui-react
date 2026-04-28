---
id: toggle-row
title: ToggleRow
slug: /components/toggle-row
description: Settings row with a switch — whole row is clickable and paints a hover fill, matching Chromium's native settings pattern.
format: mdx
---

# ToggleRow

## Live preview

```tsx live
<Card variant="elevated" padding="none">
  <ToggleRow primary="Enable sync" secondary="Sync bookmarks, history, and open tabs" defaultChecked />
  <Divider />
  <ToggleRow primary="Send anonymous usage stats" />
  <Divider />
  <ToggleRow primary="Auto-update extensions" defaultChecked disabled />
</Card>
```

A purpose-built row for settings that toggle a single value. Clicking anywhere in the row — primary text, secondary text, leading icon — flips the switch. The whole row paints a hover fill on pointer-over.

The row is structurally one `<label>`: native HTML association ties the click target on the text to the underlying `<input>`. There is no extra event handling, no synthetic click — the affordance comes for free from the browser. That is exactly what `chrome://settings` does.

Reach for `ToggleRow` whenever a row's only trailing control is an on/off switch. For rows that drill into a sub-page, use [`PanelRow`](/components/panel-stack#panelrow-props). For rows with inline controls (Select, Input, Slider) or multiple trailing widgets, use [`ListItem`](/components/list).

## Import

```tsx
import { ToggleRow } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `primary` | `ReactNode` | — | Top (main) label |
| `secondary` | `ReactNode` | — | Helper line below `primary` |
| `icon` | `ReactNode` | — | Leading slot (small icon) |
| `checked` | `boolean` | — | Controlled value |
| `defaultChecked` | `boolean` | — | Uncontrolled initial value |
| `onChange` | `(e: ChangeEvent) => void` | — | Standard change handler |
| `disabled` | `boolean` | `false` | Disables the row and the switch |
| `rowClassName` | `string` | — | Class for the outer row label |

All other `<input>` attributes are forwarded; `className` is applied to the underlying `<input>`. Ref goes to the underlying `<input>`.

## Controlled

```tsx
const [syncEnabled, setSyncEnabled] = useState(true);

<ToggleRow
  primary="Sync bookmarks"
  secondary="Keep bookmarks in sync across devices"
  checked={syncEnabled}
  onChange={(e) => setSyncEnabled(e.currentTarget.checked)}
/>
```

## With a leading icon

```tsx
<ToggleRow
  icon={<span className="material-symbols-outlined">sync</span>}
  primary="Sync"
  secondary="Sync bookmarks, history, and open tabs"
  defaultChecked
/>
```

## Accessibility

- The whole row is the click target via standard HTML `<label>` association — no synthetic event handling.
- Only one focusable element per row (the `<input>`). The keyboard tab-order does not double up.
- Screen readers announce the switch with the row's primary text as the accessible name.
- Pressing Space on the focused switch toggles it (native `<input type="checkbox">` behaviour).

## When not to use

- **Drill-in rows** — use [`PanelRow`](/components/panel-stack#panelrow-props) with `navigateTo` (chevron, not switch).
- **Multiple trailing controls** — use [`ListItem`](/components/list) and accept that the row is no longer single-click.
- **Inline form controls inside a row** (Select, Input, Slider) — use [`ListItem`](/components/list) with the control in `end`.
