---
id: toggle
title: Toggle
slug: /components/toggle
description: On/off switch for settings. A checkbox with role="switch" and a sliding knob visual.
format: mdx
---

# Toggle

## Live preview

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  <Toggle label="Enable sync" defaultChecked />
  <Toggle label="Send anonymous usage stats" />
  <Toggle label="Disabled setting" disabled />
</div>
```

The familiar sliding on/off switch you see in Chromium's settings pages. Semantically it's a checkbox with `role="switch"`, so it reports "on"/"off" to assistive tech instead of "checked"/"unchecked".

Use `Toggle` for **settings** (a setting is on or off) and `Checkbox` for **selections** (an item is selected or not).

## Import

```tsx
import { Toggle } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Text placed after the track |
| `checked` | `boolean` | — | Controlled value |
| `defaultChecked` | `boolean` | — | Uncontrolled initial value |
| `onChange` | `(e: ChangeEvent) => void` | — | Standard change handler |
| `disabled` | `boolean` | `false` | Disables the toggle |

All native `<input>` attributes are forwarded (other than `type` and `size`). Ref goes to the underlying `<input>`.

## Basic usage

```tsx
<Toggle label="Enable sync" defaultChecked />
<Toggle label="Send anonymous usage stats" />
<Toggle label="Disabled setting" disabled />
```

## Controlled

```tsx
const [syncEnabled, setSyncEnabled] = useState(true);

<Toggle
  label="Sync bookmarks"
  checked={syncEnabled}
  onChange={(e) => setSyncEnabled(e.currentTarget.checked)}
/>
```

## Inline in a settings row

For the most common case — a settings row whose only trailing control is the toggle — reach for [`ToggleRow`](/components/toggle-row) instead. It wraps the row in a single `<label>` so clicking anywhere on the text flips the switch, and it paints a hover fill across the whole row. That is the Chromium-native behaviour.

```tsx
<ToggleRow
  primary="Enable notifications"
  secondary="Get desktop alerts for new messages"
  defaultChecked
/>
```

A bare `Toggle` inside `<ListItem end={…}>` is *visually* the same row but *behaviourally* inert outside the switch itself — the rest of the row swallows clicks silently. Use `ListItem + Toggle` only when the row mixes the toggle with other inline controls.

## Accessibility

- The input is `role="switch"`, so screen readers announce "switch on" / "switch off" instead of checkbox state.
- Use `aria-label` when no visible label is attached to the component itself (e.g., when the label lives in a surrounding `ListItem` row).
