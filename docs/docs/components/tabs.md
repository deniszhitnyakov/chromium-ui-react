---
id: tabs
title: Tabs
slug: /components/tabs
description: Switcher for mutually-exclusive views. Compose TabList + Tab + TabPanel inside Tabs, or use the TabsSimple shortcut.
format: mdx
---

# Tabs

## Live preview

```tsx live
<TabsSimple
  tabs={[
    { value: 'general', label: 'General', content: <div style={{padding:16}}>General settings go here.</div> },
    { value: 'privacy', label: 'Privacy', content: <div style={{padding:16}}>Privacy settings go here.</div> },
    { value: 'advanced', label: 'Advanced', content: <div style={{padding:16}}>Advanced settings go here.</div> },
  ]}
/>
```

A switcher between mutually-exclusive views. Two APIs: a **compositional** one (`Tabs` + `TabList` + `Tab` + `TabPanel`) for full layout control, and a **shortcut** one (`TabsSimple`) for the common case.

## Import

```tsx
import { Tabs, TabList, Tab, TabPanel, TabsSimple } from 'chromium-ui-react';
```

## Tabs props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Active tab value (controlled) |
| `defaultValue` | `string` | — | Initial tab value (uncontrolled) |
| `onValueChange` | `(value: string) => void` | — | Fires when the active tab changes |

Children render freely. The component provides context to nested `Tab` / `TabPanel`.

## Tab props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Matches this tab to a `TabPanel` |
| `disabled` | `boolean` | — | Disables the tab |

All `<button>` attributes are forwarded.

## TabPanel props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Rendered only when the parent Tabs active value equals this |

All `<div>` attributes are forwarded.

## Compositional usage

```tsx
<Tabs defaultValue="general">
  <TabList>
    <Tab value="general">General</Tab>
    <Tab value="privacy">Privacy</Tab>
    <Tab value="advanced">Advanced</Tab>
  </TabList>
  <TabPanel value="general">General settings...</TabPanel>
  <TabPanel value="privacy">Privacy settings...</TabPanel>
  <TabPanel value="advanced">Advanced settings...</TabPanel>
</Tabs>
```

## Controlled

```tsx
const [tab, setTab] = useState('general');

<Tabs value={tab} onValueChange={setTab}>
  <TabList>
    <Tab value="general">General</Tab>
    <Tab value="privacy">Privacy</Tab>
  </TabList>
  <TabPanel value="general">...</TabPanel>
  <TabPanel value="privacy">...</TabPanel>
</Tabs>
```

## Shortcut: TabsSimple

For the common pattern where each tab maps directly to one block of content:

```tsx
<TabsSimple
  tabs={[
    { value: 'general', label: 'General', content: <GeneralPanel /> },
    { value: 'privacy', label: 'Privacy', content: <PrivacyPanel /> },
    { value: 'advanced', label: 'Advanced', content: <AdvancedPanel />, disabled: true },
  ]}
/>
```

`TabsSimple` accepts the same `value`, `defaultValue`, and `onValueChange` props as `Tabs`.

## Counts in labels

```tsx
<Tab value="inbox">
  Inbox <Badge variant="error">3</Badge>
</Tab>
```

## Accessibility

- `TabList` renders with `role="tablist"`, each `Tab` with `role="tab"`, and each `TabPanel` with `role="tabpanel"`.
- `aria-selected`, `aria-controls`, and `id` linkage are wired automatically via `useId`.
- Keyboard focus: native Tab key moves between tabs; the panel is linked via `aria-labelledby`. For arrow-key navigation between tabs, add it in your own handler or rely on browser defaults.
