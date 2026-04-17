---
id: checkbox
title: Checkbox
slug: /components/checkbox
description: Binary (or tri-state) selection control with an optional label and an indeterminate state.
format: mdx
---

# Checkbox

## Live preview

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Checkbox label="Remember me" defaultChecked />
  <Checkbox label="I agree to the terms" />
  <Checkbox label="Mixed selection" indeterminate />
  <Checkbox label="Disabled" disabled />
</div>
```

Renders a native `<input type="checkbox">` wrapped in a styled label. Supports the three standard states: unchecked, checked, and **indeterminate** (mixed-selection state used by "select all" toggles).

## Import

```tsx
import { Checkbox } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Text or node placed to the right of the box |
| `indeterminate` | `boolean` | `false` | Renders the mixed-state dash; overrides visual `checked` |
| `checked` | `boolean` | — | Controlled mode |
| `defaultChecked` | `boolean` | — | Uncontrolled mode |
| `onChange` | `(e: ChangeEvent) => void` | — | Standard change handler |
| `disabled` | `boolean` | `false` | Disables the control |
| `name`, `value`, `id`, ... | — | — | All native `<input>` attributes forwarded |

Ref forwards to the underlying `<input>`.

## Basic usage

```tsx
<Checkbox label="Remember me" defaultChecked />
<Checkbox label="I agree to the terms" />
<Checkbox label="Disabled" disabled />
```

## Controlled

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  label="Enable notifications"
  checked={checked}
  onChange={(e) => setChecked(e.currentTarget.checked)}
/>
```

## Indeterminate ("Select all")

```tsx
function SelectAll({ items, selected, onToggleAll }) {
  const allSelected = selected.length === items.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <Checkbox
      label={`${selected.length} selected`}
      checked={allSelected}
      indeterminate={someSelected}
      onChange={(e) => onToggleAll(e.currentTarget.checked)}
    />
  );
}
```

`indeterminate` is not part of the HTML attribute set — under the hood, the component applies it imperatively via `inputRef.current.indeterminate = true` in a `useEffect`.

## Without a label

Omit the `label` prop if you're placing the checkbox in a table cell or composing a custom layout. Provide an external `aria-labelledby` or `aria-label` in that case.

```tsx
<Checkbox aria-label="Select row 3" />
```

## Accessibility

- The label and box share one `<label>`, so clicking the label text toggles the box natively.
- Use `Toggle` instead when the control represents an on/off setting rather than a selection.
