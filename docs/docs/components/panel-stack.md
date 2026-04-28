---
id: panel-stack
title: PanelStack
slug: /components/panel-stack
description: Drill-in navigation inside a side panel, mirroring the sub-page pattern Chromium uses in chrome://settings and the side panel.
format: mdx
---

# PanelStack, PanelView, PanelHeader, PanelRow

Four composite components that together recreate the drill-in navigation pattern Chromium uses inside its side panels and `chrome://settings` — click a row, a sub-page slides in from the right; a back arrow slides it back.

This is the only composite group in the library (everything else is a primitive). It's here because the pattern is so common in Chromium-native UIs that rebuilding it per extension is wasted work.

## Import

```tsx
import {
  PanelStack,
  PanelView,
  PanelHeader,
  PanelRow,
  usePanelStack,
} from 'chromium-ui-react';
```

## Live preview

```tsx live
<div style={{
  width: 360,
  height: 520,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
}}>
  <PanelStack defaultView="main">
    <PanelView id="main">
      <PanelHeader title="Extension panel" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <PanelRow
          primary="Source"
          secondary="Current tab"
          end={<Badge variant="success">ready</Badge>}
        />
        <Divider />
        <PanelRow
          primary="Include nested items"
          secondary="Follow links one level deep"
          end={<Toggle defaultChecked />}
        />
        <Divider />
        <PanelRow
          primary="Advanced options"
          secondary="Output format, filters, columns"
          navigateTo="advanced"
        />
        <Divider />
        <PanelRow
          primary="About"
          secondary="Version, changelog, credits"
          navigateTo="about"
        />
      </div>
      <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
        <Button variant="action">Run on this page</Button>
      </div>
    </PanelView>

    <PanelView id="advanced">
      <PanelHeader title="Advanced options" back />
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{
            fontSize: 14,
            fontWeight: 400,
            color: 'var(--cr-fallback-color-on-surface)',
            marginBottom: 8,
          }}>Output format</div>
          <RadioGroup defaultValue="json">
            <Radio value="json" label="JSON" />
            <Radio value="csv" label="CSV" />
            <Radio value="md" label="Markdown" />
          </RadioGroup>
        </div>
        <Divider />
        <div>
          <div style={{
            fontSize: 14,
            fontWeight: 400,
            color: 'var(--cr-fallback-color-on-surface)',
            marginBottom: 8,
          }}>Include</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Checkbox label="Canonical URLs" defaultChecked />
            <Checkbox label="Headlines and subheadings" defaultChecked />
            <Checkbox label="Page metadata" />
          </div>
        </div>
      </div>
    </PanelView>

    <PanelView id="about">
      <PanelHeader title="About" back />
      <div style={{ padding: 16 }}>
        <p>Version 0.2.1. Built with <code>chromium-ui-react</code>.</p>
      </div>
    </PanelView>
  </PanelStack>
</div>
```

## PanelStack props

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultView` | `string` | first `PanelView`'s id | Uncontrolled initial view |
| `value` | `string` | — | Controlled active view id (stack is managed externally) |
| `onChange` | `(view: string) => void` | — | Fires whenever `push`, `pop`, or `reset` changes the current view |
| `transitionDuration` | `number` | `240` | Slide transition in ms; set to `0` to disable |

All other `<div>` attributes are forwarded. Ref goes to the root `<div>`.

## PanelView props

| Prop | Type | Description |
|---|---|---|
| `id` | `string` | **Required.** Matches `navigateTo` values and `usePanelStack().push(id)` calls. |

All `<section>` attributes forwarded.

## PanelHeader props

| Prop | Type | Description |
|---|---|---|
| `title` | `ReactNode` | Header title |
| `back` | `boolean` | Render a back-arrow IconButton. By default it calls `usePanelStack().pop()`. |
| `onBack` | `() => void` | Override the back-arrow behavior |
| `leading` | `ReactNode` | Custom leading slot (overrides the back button) |
| `actions` | `ReactNode` | Right-aligned action slot. **Default to leaving this empty** — see warning below. |

:::warning `actions` defaults to empty
On a Chromium-native side panel, the `PanelHeader` is **title-only**. Do not hang a settings gear, a "+", or any other `IconButton` off the `actions` slot next to the title — that is [Styleguide Anti-pattern #16](/styleguide/anti-patterns#16-iconbutton-glued-to-a-title-in-the-header). Context-specific actions belong in the content area: per-row `IconButton`s for row operations, a footer `Button` for add-style verbs, or a drill-in `PanelRow` for settings. The `actions` prop exists because there are narrow edge cases (selection-mode swap, bulk operation on a manager) — the default stays empty.
:::

## PanelRow props

| Prop | Type | Description |
|---|---|---|
| `primary` | `ReactNode` | Top text label |
| `secondary` | `ReactNode` | Subtitle below primary |
| `icon` | `ReactNode` | Leading slot |
| `end` | `ReactNode` | Trailing slot (Toggle, Badge, IconButton...) |
| `navigateTo` | `string` | If set, clicking the row calls `usePanelStack().push(navigateTo)` and a chevron is added automatically |
| `chevron` | `boolean` | Force the chevron (default: `true` when `navigateTo` is set) |
| `interactive` | `boolean` | Force the row to be clickable/focusable |
| `disabled` | `boolean` | Disable the row |

All other `<div>` attributes forwarded. If `navigateTo` or `onClick` is set (or `interactive={true}`), the row gets `role="button"`, `tabIndex={0}`, and responds to Enter / Space.

## usePanelStack hook

Inside any `PanelView`, call `usePanelStack()` to navigate imperatively:

```tsx
function MyRow() {
  const { push, pop, current } = usePanelStack();
  return <Button onClick={() => push('advanced')}>Open advanced</Button>;
}
```

Returned value:

| Field | Type | Description |
|---|---|---|
| `current` | `string` | Id of the active view |
| `stack` | `string[]` | The full navigation stack (uncontrolled mode) |
| `push(id)` | `(id: string) => void` | Push a view onto the stack |
| `pop()` | `() => void` | Pop the top view (no-op if only one view is left) |
| `reset(id)` | `(id: string) => void` | Replace the stack with a single view |

## Controlled mode

Pass `value` + `onChange` to drive the stack from outside — e.g., wire it to the URL hash or to your router:

```tsx
const [view, setView] = useState('main');

<PanelStack value={view} onChange={setView}>
  <PanelView id="main">{/* ... */}</PanelView>
  <PanelView id="advanced">{/* ... */}</PanelView>
</PanelStack>
```

In controlled mode the internal stack isn't tracked — if you need back-navigation, maintain the history yourself.

## Layout notes

- `PanelStack` is absolute/relative positioned with `overflow: hidden` so the sliding children are clipped. Give it explicit `height` (or put it inside a flex parent with `min-height: 0`) — otherwise views will collapse.
- `PanelView` is `position: absolute` and `display: flex; flex-direction: column`, so a single `<div style={{ flex: 1, overflow: 'auto' }}>` inside makes the middle scrollable while header and footer stay pinned.

## Accessibility

- Non-current views get `aria-hidden="true"`.
- `PanelRow` with `navigateTo` renders as `role="button"`, focusable, and fires on Enter/Space.
- `PanelHeader` back arrow is a real `IconButton` with `aria-label="Back"`.
- The transition honors `prefers-reduced-motion: reduce` (no animation).

## Common pitfalls

- **Empty stack.** If you neither set `defaultView` nor have children, `current` is `''` and nothing renders. Provide at least one `PanelView`.
- **Router collision.** `PanelStack` manages its own stack. If you mount it inside a framework router (react-router, Next.js App Router), keep the two separated — don't mirror `PanelStack` state into the URL unless you explicitly want deep-linkable sub-views (use controlled mode for that).
