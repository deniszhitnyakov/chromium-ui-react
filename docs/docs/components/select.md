---
id: select
title: Select
slug: /components/select
description: Native HTML dropdown styled to match Chromium. Accepts an options array or option children.
format: mdx
---

# Select

## Live preview

```tsx live
<Select
  label="Theme"
  defaultValue="auto"
  options={[
    { value: 'auto', label: 'System default' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ]}
/>
```

A styled wrapper around the native `<select>` element. Pass either an `options` array for the common case, or `<option>` / `<optgroup>` children when you need more control.

Native `<select>` is used deliberately — it gives you platform-correct keyboard navigation, mobile keyboards, and screen-reader behavior that custom dropdowns rarely match.

## Import

```tsx
import { Select } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Renders a `<label>` above the select |
| `options` | `SelectOption[]` | — | Array form: `{ value, label, disabled? }[]` |
| `id` | `string` | auto-generated | Associates label and select |
| `value`, `defaultValue`, `onChange`, ... | — | — | All native `<select>` attributes |

Ref forwards to the underlying `<select>`.

```ts
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

## Options array (common case)

```tsx
<Select
  label="Theme"
  defaultValue="auto"
  options={[
    { value: 'auto', label: 'System default' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ]}
/>
```

## Children form

Use when you need `<optgroup>` or dynamic nesting:

```tsx
<Select label="Country">
  <optgroup label="Americas">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="de">Germany</option>
    <option value="fr">France</option>
  </optgroup>
</Select>
```

## Controlled

```tsx
const [theme, setTheme] = useState('auto');

<Select
  label="Theme"
  value={theme}
  onChange={(e) => setTheme(e.currentTarget.value)}
  options={themeOptions}
/>
```

## Without a label

```tsx
<Select aria-label="Sort by" options={sortOptions} />
```

## Accessibility

- Because this is a native `<select>`, arrow-key navigation, typeahead, and mobile pickers all work without extra code.
- If you need a combobox with typeahead filtering, this is the wrong component — build it on top of `Menu` + `Input` instead.
