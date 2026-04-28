---
id: one-page
title: One-page LLM doc
slug: /one-page
sidebar_position: 2
description: The entire chromium-ui-react library condensed into a single page. Paste into an LLM chat to give the model full context.
---

# One-page LLM doc

> **Purpose.** This single page is the authoritative reference for an LLM that needs to generate code using `chromium-ui-react`. It covers installation, conventions, every component, every prop, and a runnable example for each. Hit **Copy Markdown** (top-right) and paste the result into a chat to prime the model.

---

## 1. What this library is

A React component library that reproduces Chromium's native `cr_elements` design system. Use it to build browser extensions, Google-adjacent web apps, or any surface that should feel like first-party Google UI.

- **React 18 / 19 compatible**
- **Plain CSS** — no runtime CSS-in-JS
- **Tree-shakeable** ESM + CJS bundles, `"sideEffects": ["*.css"]`
- **Automatic dark mode** via `prefers-color-scheme` (or forced with `data-cr-theme="dark"`)
- **Accessible** — ARIA, focus rings, `prefers-reduced-motion`, Windows High Contrast Mode

## 2. Install

```bash
npm install chromium-ui-react
```

```tsx
// Once, at app entry:
import 'chromium-ui-react/styles.css';
```

Peer deps: `react >=18`, `react-dom >=18`.

## 3. Conventions

1. **Class prefix.** All CSS classes use the `cr-` prefix (`cr-button`, `cr-input__field`). They come from the bundled stylesheet — you never write them by hand.
2. **Controlled & uncontrolled.** Form components (`Input`, `Checkbox`, `Toggle`, `Radio`, `Select`, `Tabs`) accept either `value` + `onChange` (controlled) or `defaultValue` + any `onChange` (uncontrolled), following standard React patterns.
3. **`className` always merges.** Every component forwards `className` and appends it to the internal classes, never replacing them.
4. **Refs.** Every interactive component is wrapped in `forwardRef`, so you can attach refs for focus management.
5. **Icons.** Components accept `ReactNode` for icons — pass any SVG, `<img>`, or icon-library element (e.g. from `lucide-react`).
6. **Theming.** Override tokens by redeclaring CSS variables under your own selector — no JS props required.
7. **No default exports.** All components use named exports.

## 4. Design tokens (most-used)

```css
--cr-fallback-color-primary       /* brand blue */
--cr-fallback-color-surface       /* default background */
--cr-fallback-color-on-surface    /* primary text */
--cr-fallback-color-on-surface-subtle  /* secondary text */
--cr-fallback-color-outline       /* default borders */
--cr-fallback-color-error         /* error red */

--cr-space-1…10                   /* 4,8,12,16,20,24,32,40 */
--cr-radius-xs|sm|md|lg|xl|full   /* 2,4,8,16,24,100 */
--cr-font-size-xs|sm|md|base|lg|xl|2xl   /* 11,12,13,14,16,20,24 */

--cr-elevation-1…5                /* shadows */
--cr-transition-duration          /* 80ms, 0ms with reduced-motion */
```

Full list: [Design Tokens](./tokens.md).

## 5. Components

Import everything from the package root:

```tsx
import {
  Button, IconButton,
  Checkbox, Radio, RadioGroup, Toggle,
  Input, Textarea, SearchInput, Select,
  Badge,
  Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription,
  Divider, Header,
  Tabs, Tab, TabList, TabPanel, TabsSimple,
  Menu, MenuItem, MenuDivider, MenuLabel,
  Spinner, Progress,
  Toast, Dialog, Tooltip, Link,
  List, ListItem, EmptyState,
  PanelStack, PanelView, PanelHeader, PanelRow, usePanelStack,
} from 'chromium-ui-react';
```

---

### Button

Filled, outlined, tonal, destructive, or text button.

**Props:** `variant?: 'outlined' | 'action' | 'destructive' | 'text'` (default `outlined`), `size?: 'sm' | 'md' | 'lg'` (default `md`), `startIcon?: ReactNode`, `endIcon?: ReactNode`, plus every `<button>` attribute. Buttons are content-sized — there is no full-width affordance. There is no `tonal` middle tier — `outlined` is the default secondary, `action` is the primary.

```tsx
<Button variant="action" onClick={save}>Save</Button>
<Button variant="outlined" disabled>Cancel</Button>
<Button variant="destructive" startIcon={<TrashIcon />}>Delete</Button>
<Button variant="text" size="sm">Learn more</Button>
```

---

### IconButton

A round, icon-only button. Always requires an `aria-label`.

**Props:** `variant?: 'standard' | 'filled'`, `size?: 'sm' | 'md' | 'lg'`, `icon: ReactNode`, `'aria-label': string` **(required)**.

```tsx
<IconButton aria-label="Close" icon={<CloseIcon />} onClick={onClose} />
<IconButton aria-label="More actions" variant="filled" icon={<MoreIcon />} />
```

---

### Checkbox

**Props:** `label?: ReactNode`, `checked?: boolean`, `defaultChecked?: boolean`, `indeterminate?: boolean`, `disabled?: boolean`, plus `<input type="checkbox">` attributes.

```tsx
<Checkbox label="Remember me" defaultChecked />
<Checkbox label="Select all" indeterminate />
```

---

### Radio / RadioGroup

Wrap `<Radio>`s in a `<RadioGroup>` to get automatic name binding and controlled value.

**RadioGroup props:** `name?: string`, `value?: string|number`, `defaultValue?: string|number`, `onChange?: (value: string) => void`, `orientation?: 'vertical' | 'horizontal'`, `disabled?: boolean`.

**Radio props:** `label?: ReactNode`, `value: string | number`, `disabled?: boolean`.

```tsx
<RadioGroup value={size} onChange={setSize} orientation="horizontal">
  <Radio value="sm" label="Small" />
  <Radio value="md" label="Medium" />
  <Radio value="lg" label="Large" />
</RadioGroup>
```

---

### Toggle

Material-style switch.

**Props:** `label?: ReactNode`, plus `<input type="checkbox">` attributes. Renders with `role="switch"`.

```tsx
<Toggle label="Notifications" checked={on} onChange={(e) => setOn(e.target.checked)} />
```

---

### Input / Textarea / SearchInput

Single-line text input with optional label, hint, and error.

**Input props:** `label?: ReactNode`, `hint?: ReactNode`, `error?: ReactNode`, plus `<input>` attributes.

**Textarea props:** same, renders `<textarea>`.

**SearchInput props:** `<input>` attributes. Renders a pill-shaped field with a search icon.

```tsx
<Input label="Email" type="email" placeholder="you@example.com" hint="We'll never share this." />
<Input label="Password" type="password" error="Must be at least 8 characters" />
<Textarea label="Message" rows={4} />
<SearchInput placeholder="Search bookmarks" value={q} onChange={(e) => setQ(e.target.value)} />
```

---

### Select

Chromium-styled native `<select>`. Pass `options` for the 80% case.

**Props:** `label?: ReactNode`, `options?: { value: string | number; label: string; disabled?: boolean }[]`, plus `<select>` attributes. You can also pass `<option>` children.

```tsx
<Select
  label="Theme"
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
  options={[
    { value: 'system', label: 'System default' },
    { value: 'light',  label: 'Light' },
    { value: 'dark',   label: 'Dark' },
  ]}
/>
```

---

### Badge

Small count indicator.

**Props:** `variant?: 'neutral' | 'info' | 'success' | 'warning' | 'error'` (default `'neutral'`), plus `<span>` attributes. Outline-only by design — there is no solid fill. Reach for `<Badge>` (the neutral default) first; only escalate to a colored variant when the state is something the user must react to.

```tsx
<Badge>12</Badge>
<Badge variant="error">!</Badge>
<Badge variant="success">Online</Badge>
```

---

### Card + subcomponents

**Card props:** `variant?: 'default' | 'outlined' | 'filled' | 'elevated'`, `interactive?: boolean`, plus `<div>` attributes.

Subcomponents: `CardHeader`, `CardBody`, `CardFooter`, `CardTitle`, `CardDescription` — each is a styled `<div>`/`<h3>`/`<p>` you compose freely.

```tsx
<Card variant="outlined">
  <CardHeader>
    <CardTitle>Profile</CardTitle>
    <CardDescription>Update your personal information.</CardDescription>
  </CardHeader>
  <CardBody>
    <Input label="Name" />
  </CardBody>
  <CardFooter>
    <Button variant="outlined">Cancel</Button>
    <Button variant="action">Save</Button>
  </CardFooter>
</Card>
```

---

### Divider

Horizontal/vertical separator.

**Props:** `orientation?: 'horizontal' | 'vertical'`, `subtle?: boolean`, `inset?: boolean`.

```tsx
<Divider />
<Divider subtle />
<Divider orientation="vertical" />
```

---

### Header

Side-panel / page header bar.

**Props:** `title?: ReactNode`, `actions?: ReactNode`, `tall?: boolean`, plus `<div>` attributes.

The `actions` slot is **empty by default** on a Chromium-native surface. Do not park icon-button shortcuts (settings gear, "+", etc.) next to the title — demote them to a drill-in `ListItem` / `PanelRow` inside the content. A single `⋮` overflow `IconButton` at the far right (with `SearchInput` between it and the title — the `chrome://bookmarks` shape) is the one toolbar-icon shape that is acceptable; a `Button variant="text"` like "Clear all" also fits when the whole surface has one bulk verb.

```tsx
// Default: title-only (popups, side panels, settings pages)
<Header title="Settings" />

// Full-tab manager: SearchInput in the middle, single ⋮ at the far right
<Header
  title="Bookmarks"
  actions={<IconButton aria-label="More" icon={<MoreIcon />} />}
>
  <SearchInput placeholder="Search bookmarks" style={{ flex: 1, maxWidth: 320 }} />
</Header>
```

---

### Tabs

Two APIs: **primitive** (`Tabs` + `TabList` + `Tab` + `TabPanel`) for full control, or **`TabsSimple`** for the common case.

**Tabs props:** `value?: string`, `defaultValue?: string`, `onValueChange?: (value: string) => void`.

```tsx
<Tabs defaultValue="general">
  <TabList>
    <Tab value="general">General</Tab>
    <Tab value="advanced">Advanced</Tab>
  </TabList>
  <TabPanel value="general">General settings…</TabPanel>
  <TabPanel value="advanced">Advanced settings…</TabPanel>
</Tabs>
```

**Or one-liner:**

```tsx
<TabsSimple
  defaultValue="a"
  tabs={[
    { value: 'a', label: 'First',  content: <p>First panel</p> },
    { value: 'b', label: 'Second', content: <p>Second panel</p> },
  ]}
/>
```

---

### Menu

Popover list of actions. Position/open logic is up to you — `Menu` is only the panel.

**Subcomponents:** `Menu`, `MenuItem`, `MenuDivider`, `MenuLabel`.

**MenuItem props:** `icon?: ReactNode`, `end?: ReactNode`, `selected?: boolean`, plus `<button>` attributes.

```tsx
<Menu>
  <MenuLabel>Account</MenuLabel>
  <MenuItem icon={<UserIcon />}>Profile</MenuItem>
  <MenuItem icon={<SettingsIcon />} end="⌘,">Settings</MenuItem>
  <MenuDivider />
  <MenuItem icon={<LogoutIcon />}>Sign out</MenuItem>
</Menu>
```

---

### Spinner / Progress

**Spinner props:** `size?: 'sm' | 'md' | 'lg'`, `label?: string` (defaults to `'Loading'`).

**Progress props:** `value?: number` (0–`max`), `max?: number` (default `100`), `indeterminate?: boolean`.

```tsx
<Spinner />
<Spinner size="lg" label="Fetching comments" />
<Progress value={40} />
<Progress indeterminate />
```

---

### Toast

A single snackbar/toast cell. Position/stack it yourself (or with a portal).

**Props:** `variant?: 'default' | 'success' | 'error' | 'warning' | 'info'`, `actionLabel?: string`, `onActionClick?: () => void`, `onClose?: () => void`.

```tsx
<Toast variant="success" actionLabel="Undo" onActionClick={undo}>
  Deleted 1 item.
</Toast>
<Toast variant="error" onClose={dismiss}>Could not save.</Toast>
```

---

### Dialog

Modal dialog rendered into a portal on `document.body`.

**Props:** `open: boolean`, `onClose?: () => void`, `title?: ReactNode`, `actions?: ReactNode`, `closeOnBackdrop?: boolean` (default `true`), `closeOnEscape?: boolean` (default `true`).

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete bookmark?"
  actions={<>
    <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
  </>}
>
  This action can't be undone.
</Dialog>
```

---

### Tooltip

CSS-only tooltip that appears on hover or focus.

**Props:** `content: ReactNode`, `placement?: 'top' | 'bottom' | 'left' | 'right'`.

```tsx
<Tooltip content="Save (⌘S)">
  <IconButton aria-label="Save" icon={<SaveIcon />} />
</Tooltip>
```

---

### Link

**Props:** `subtle?: boolean`, plus `<a>` attributes.

```tsx
<Link href="/docs">Read the docs</Link>
<Link href="/changelog" subtle>View changelog</Link>
```

---

### List / ListItem

Structured row for list UIs (bookmarks, settings rows, command palette).

**ListItem props:** `icon?`, `avatar?`, `primary?`, `secondary?`, `end?`, `interactive?`, `selected?`, `dense?`.

```tsx
<List>
  <ListItem
    interactive
    icon={<FolderIcon />}
    primary="Reading list"
    secondary="12 items"
    end={<Badge>12</Badge>}
  />
  <ListItem
    interactive
    dense
    primary="Docs"
    secondary="chromium-ui-react.dev"
  />
</List>
```

---

### EmptyState

Centered placeholder for empty lists / zero results.

**Props:** `icon?`, `title?`, `description?`, `action?`.

```tsx
<EmptyState
  icon={<InboxIcon />}
  title="Nothing here yet"
  description="Bookmarks you save will appear here."
  action={<Button variant="action">Add bookmark</Button>}
/>
```

---

### PanelStack / PanelView / PanelHeader / PanelRow

Drill-in navigation inside a side panel. Native Chromium pattern — click a row, a sub-page slides in from the right; a back-arrow slides it back. The only **composite** group in the library; everything else is a primitive.

**PanelStack props:** `defaultView?`, `value?` (controlled), `onChange?(view)`, `transitionDuration?: number` (ms, default `240`).

**PanelView props:** `id: string` (required).

**PanelHeader props:** `title?`, `back?: boolean`, `onBack?`, `leading?`, `actions?`.

**PanelRow props:** `primary?`, `secondary?`, `icon?`, `end?`, `navigateTo?: string`, `chevron?`, `interactive?`, `disabled?`.

**Hook:** `usePanelStack()` → `{ current, stack, push(id), pop(), reset(id) }`.

```tsx
<PanelStack defaultView="main">
  <PanelView id="main">
    <PanelHeader title="Extension panel" />
    <PanelRow primary="Source" secondary="Current tab" end={<Badge variant="success">ready</Badge>} />
    <PanelRow primary="Include nested items" end={<Toggle defaultChecked />} />
    <PanelRow primary="Advanced options" secondary="Output, filters, columns" navigateTo="advanced" />
  </PanelView>
  <PanelView id="advanced">
    <PanelHeader title="Advanced options" back />
    {/* form, radios, checkboxes... */}
  </PanelView>
</PanelStack>
```

Give it an explicit `height` (or put it inside a `min-height: 0` flex parent) — otherwise views collapse to zero.

---

## 6. Composition cheat-sheet for browser extensions

### Side-panel layout

```tsx
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <Header title="My extension" />
  <PanelStack defaultView="main" style={{ flex: 1, minHeight: 0 }}>
    <PanelView id="main">
      <ItemsList />
      {/* Drill-in row for settings — not a gear in the Header actions slot */}
      <PanelRow
        primary="Settings"
        secondary="Preferences, shortcuts, about"
        navigateTo="settings"
      />
    </PanelView>
    <PanelView id="settings">
      <PanelHeader title="Settings" back />
      {/* rows... */}
    </PanelView>
  </PanelStack>
</div>
```

### Settings row

```tsx
<Card variant="outlined">
  <CardBody>
    <List>
      <ListItem primary="Show notifications" end={<Toggle checked={on} onChange={...} />} />
      <Divider />
      <ListItem primary="Sync across devices" end={<Toggle />} />
    </List>
  </CardBody>
</Card>
```

### Confirmation dialog

```tsx
<Dialog
  open={open}
  onClose={close}
  title="Clear all bookmarks?"
  actions={<>
    <Button variant="text" onClick={close}>Cancel</Button>
    <Button variant="destructive" onClick={clearAll}>Clear</Button>
  </>}
>
  This will permanently remove 247 bookmarks from this device.
</Dialog>
```

## 7. Common pitfalls

- **Forgetting the stylesheet.** If components render unstyled, you forgot `import 'chromium-ui-react/styles.css'`.
- **Using inline color hex codes.** Prefer semantic tokens (`var(--cr-fallback-color-primary)`) so dark mode stays consistent.
- **Building custom icon buttons with `<Button>`.** Use `<IconButton>` — it renders a proper circular ripple container.
- **Writing dark-mode media queries.** Don't — the library does this automatically on its tokens. Use the tokens.
- **Rendering `Tab` outside `Tabs`.** It needs the context provider. Same for `Radio` inside `RadioGroup` (optional but recommended).

## 8. Accessibility checklist

- Every `IconButton` **must** have `aria-label`.
- `Dialog` locks focus and traps `Escape`; do not disable these defaults unless you have a specific reason.
- `Toggle` renders with `role="switch"`.
- `Checkbox` with `indeterminate` prop drives native `indeterminate` state, not a third value.
- All focusable elements render a visible focus ring — don't override `:focus-visible` without replacing it.

## 9. Versioning

Minor versions may add new components. Breaking changes bump the major. Pin if you care.
