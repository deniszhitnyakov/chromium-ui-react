---
id: radio
title: Radio & RadioGroup
slug: /components/radio
description: Single-choice selection from a list of options. Use Radio inside RadioGroup for shared name and value state.
format: mdx
---

# Radio & RadioGroup

## Live preview

```tsx live
<RadioGroup defaultValue="recommended">
  <Radio value="small" label="Small" />
  <Radio value="recommended" label="Recommended" />
  <Radio value="large" label="Large" />
</RadioGroup>
```

Use `RadioGroup` to manage a set of mutually-exclusive options. Individual `Radio` components pick up the group's `name` and current `value` via React context — you don't need to wire them up yourself.

## Import

```tsx
import { Radio, RadioGroup } from 'chromium-ui-react';
```

## RadioGroup props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | auto-generated via `useId()` | Shared `name` attribute for all nested radios |
| `value` | `string \| number` | — | Controlled selected value |
| `defaultValue` | `string \| number` | — | Initial value for uncontrolled mode |
| `onChange` | `(value: string) => void` | — | Called when selection changes (receives the new value) |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `disabled` | `boolean` | `false` | Disables all radios in the group |

## Radio props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| number` | **required** | The value this radio represents |
| `label` | `ReactNode` | — | Text or node placed to the right |
| `disabled` | `boolean` | — | Disables just this radio (falls back to group `disabled`) |

Individual `Radio` also accepts `name`, `checked`, `onChange` if used standalone without a group.

## Basic usage

```tsx
<RadioGroup defaultValue="recommended">
  <Radio value="small" label="Small" />
  <Radio value="recommended" label="Recommended" />
  <Radio value="large" label="Large" />
</RadioGroup>
```

## Controlled

```tsx
const [size, setSize] = useState('medium');

<RadioGroup value={size} onChange={setSize}>
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>
```

Note: `onChange` here receives the new string value, not the raw DOM event — that's a convenience difference from the native `<input>` API.

## Horizontal orientation

Use inside narrow rows, toolbars, or segmented settings:

```tsx
<RadioGroup defaultValue="on" orientation="horizontal">
  <Radio value="on" label="On" />
  <Radio value="off" label="Off" />
</RadioGroup>
```

## Disabling a single radio

```tsx
<RadioGroup defaultValue="a">
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B (premium)" disabled />
</RadioGroup>
```

## Accessibility

- The group renders with `role="radiogroup"` and each radio is a native `<input type="radio">` — arrow-key navigation works out of the box.
- Give the RadioGroup an `aria-label` or `aria-labelledby` if there's no visible heading above it.
