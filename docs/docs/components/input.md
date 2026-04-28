---
id: input
title: Input, Textarea & SearchInput
slug: /components/input
description: Text entry controls with built-in label/hint/error pattern. Plus a dedicated search input.
format: mdx
---

# Input, Textarea & SearchInput

## Live preview

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
  <Input label="Email" type="email" placeholder="you@example.com" />
  <Input label="Username" hint="3-20 characters, letters and numbers only" defaultValue="cr-user" />
  <Input label="Password" type="password" error="Password must be at least 8 characters" />
  <SearchInput placeholder="Search bookmarks..." />
</div>
```

Three related text-entry components that share the same label/hint/error layout. Use `Input` for single-line fields, `Textarea` for multi-line, and `SearchInput` for the compact search-with-magnifier pattern.

## Import

```tsx
import { Input, Textarea, SearchInput } from 'chromium-ui-react';
```

## Input props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Renders a `<label>` above the field |
| `hint` | `ReactNode` | — | Helper text below the field |
| `error` | `ReactNode` | — | Error text; replaces `hint` and adds error styling |
| `id` | `string` | auto-generated | Used to associate label and field |

All native `<input>` attributes are forwarded (`type`, `placeholder`, `value`, `onChange`, `required`, `minLength`, etc.) *except* `size` (which conflicts with a visual-size prop on other components). Ref forwards to the underlying `<input>`.

## Textarea props

Same as Input (`label`, `hint`, `error`, `id`) plus all native `<textarea>` attributes (`rows`, `cols`, `maxLength`, ...).

## SearchInput props

All native `<input>` attributes — it's a minimalist wrapper that renders a magnifier SVG and a pre-styled search field. No label/hint/error props.

## Basic Input

```tsx
<Input label="Email" type="email" placeholder="you@example.com" />

<Input
  label="Username"
  hint="3-20 characters, letters and numbers only"
  defaultValue="cr-user"
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>
```

## Controlled

```tsx
const [email, setEmail] = useState('');

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.currentTarget.value)}
/>
```

## Textarea

```tsx
<Textarea
  label="Notes"
  rows={4}
  placeholder="Add any extra context..."
  hint="Supports plain text only"
/>
```

## SearchInput

```tsx
<SearchInput
  placeholder="Search bookmarks"
  onChange={(e) => setQuery(e.currentTarget.value)}
/>
```

Full-width toolbar search:

```tsx
<Header>
  <SearchInput style={{ flex: 1 }} placeholder="Search history..." />
</Header>
```

## Form validation

The components don't own validation — they render whatever you pass to `error`. Pair with your form library of choice (react-hook-form, Formik, or plain state):

```tsx
<Input
  label="URL"
  value={url}
  onChange={(e) => setUrl(e.currentTarget.value)}
  error={touched && !isValidUrl(url) ? 'Enter a valid URL' : undefined}
/>
```

## Accessibility

- `label` and `id` are automatically associated via `htmlFor`.
- When `error` is present, give the field `aria-invalid="true"` and/or `aria-describedby={errorId}` if you need finer screen-reader control.
- Use `type` to unlock platform features: `type="email"` for email keyboards, `type="tel"` for numeric keypads, `type="password"` for masking.
