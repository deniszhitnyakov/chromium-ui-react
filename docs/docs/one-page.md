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
  Checkbox, Radio, RadioGroup, Toggle, ToggleRow,
  Input, Textarea, SearchInput, Select,
  Badge,
  Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription,
  Divider, Header,
  Tabs, Tab, TabList, TabPanel, TabsSimple,
  Menu, MenuItem, MenuDivider, MenuLabel,
  Spinner, Progress,
  Toast, Dialog, Tooltip, Link,
  List, ListItem, EmptyState,
  Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell,
  PanelStack, PanelView, PanelHeader, PanelRow, usePanelStack,
} from 'chromium-ui-react';
```

---

### Button

Outlined (default), filled action, destructive, or text button.

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

### ToggleRow

A settings row whose only trailing control is a `Toggle`. The whole row is one click target (HTML `<label>` association) and paints a row-level hover fill, the way `chrome://settings` does. Reach for `ToggleRow` whenever the trailing control is *only* a switch — `<ListItem end={<Toggle />}>` swallows clicks outside the switch.

**Props:** `primary: ReactNode`, `secondary?: ReactNode`, `disabled?: boolean`, plus `<input type="checkbox">` attributes (`checked`, `defaultChecked`, `onChange`, etc.).

```tsx
<Card>
  <ToggleRow primary="Notifications" secondary="Allow notifications from this extension" defaultChecked />
  <Divider subtle />
  <ToggleRow primary="Sync across devices" />
</Card>
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

**Card props:** `variant?: 'elevated' | 'outlined' | 'filled' | 'flat'` (default `'elevated'` — the Chromium-faithful subtle elevation-2 shadow), `interactive?: boolean`, plus `<div>` attributes.

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

Top-of-surface header strip. **Opt-in everywhere except extension side panels, where it is forbidden** — Chrome paints a system header (icon + extension name) above the iframe, so an in-panel `Header` would duplicate it. Use it for popups (optional), full-tab options pages (recommended), and in-page UI (rarely). Distinct from `PanelHeader`, which is the *drill-in subview header* inside `PanelStack` and remains allowed in side panels.

**Props:** `title?: ReactNode`, `actions?: ReactNode`, `tall?: boolean`, plus `<div>` attributes.

The `actions` slot is **empty by default** on a Chromium-native surface. Do not park icon-button shortcuts (settings gear, "+", etc.) next to the title — demote them to a drill-in `ListItem` / `PanelRow` inside the content. A single `⋮` overflow `IconButton` at the far right (with `SearchInput` between it and the title — the `chrome://bookmarks` shape) is the one header-icon shape that is acceptable; a `Button variant="text"` like "Clear all" also fits when the whole surface has one bulk verb.

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

### Table

Compound API over semantic `<table>` for tabular data — scraper results, log viewers, inspector panels. Regular default (13px text, 10px 16px padding) for full-tab / options-page surfaces; opt into `density="dense"` (12px text, 6px 12px padding) for narrow surfaces like popups and side panels. Outer wrapper renders `overflow-x: auto` automatically — wider columns scroll horizontally. Opt-in `stickyHeader` requires the consumer to bound the height. **Not** a data-table: no sorting, no pagination, no virtualisation — compose those above this primitive.

**Table props:** `density?: 'regular' | 'dense'` (default `'regular'`), `stickyHeader?: boolean`, `wrapperClassName?: string`, plus `<table>` attributes.

**TableRow props:** `interactive?: boolean`, `selected?: boolean`, `disabled?: boolean`.

**TableCell / TableHeaderCell props:** `align?: 'start' | 'center' | 'end'` (default `'start'`).

```tsx
<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Type</TableHeaderCell>
      <TableHeaderCell align="end">Rating</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>The Coffee Workshop</TableCell>
      <TableCell>Coffee shop</TableCell>
      <TableCell align="end">4.7</TableCell>
    </TableRow>
  </TableBody>
</Table>
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

Side-panel extensions render **without** an in-panel `<Header>` — Chrome paints a system header (icon + extension name) above the iframe. Open the panel directly on its content. `PanelHeader` for drill-in subviews is allowed because it sits below the surface root.

```tsx
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <PanelStack defaultView="main" style={{ flex: 1, minHeight: 0 }}>
    <PanelView id="main">
      {/* Settings entry in the upper half — labelled exactly "Settings" */}
      <Card>
        <List>
          <ListItem primary="Capture mode" secondary="Selection only" interactive end={<span>›</span>} />
          <Divider subtle />
          <ListItem primary="Settings" interactive navigateTo="settings" end={<span>›</span>} />
        </List>
      </Card>
      <ItemsList />
    </PanelView>
    <PanelView id="settings">
      <PanelHeader title="Settings" back />
      {/* rows... */}
    </PanelView>
  </PanelStack>
</div>
```

### Settings rows (toggle-only)

```tsx
<Card>
  <ToggleRow primary="Show notifications" checked={on} onChange={(e) => setOn(e.target.checked)} />
  <Divider subtle />
  <ToggleRow primary="Sync across devices" />
</Card>
```

`ToggleRow` makes the whole row clickable. Use it whenever the trailing control is *only* a toggle — `<ListItem end={<Toggle />}>` swallows clicks outside the switch.

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

## 9. Notable styleguide rules (Chromium-faithful library defaults)

These are the rules an LLM most often gets wrong without context. The library defaults already enforce most of them — these notes spell out the *why* so generated code stays consistent.

- **Action-row pair.** Order is always `[Cancel] [Primary]`, right-aligned. Cancel's variant follows the primary: `outlined` next to an `action` primary (matches Chromium native), `text` next to a `destructive` primary (the library's deliberate divergence — quieter Cancel keeps the destructive verb owning the row).
- **One primary per surface.** Exactly one filled `variant="action"` Button per view. Other buttons are `outlined` or `text`. Multiple filled buttons in close proximity is an anti-pattern.
- **Settings entry.** If the extension has settings, the row is labelled `Settings` (one word, sentence case — never `Options` / `Preferences` / `Reader settings`) and placed in the upper half of the surface. Reader-mode-style content-dominant panels are the rare exception.
- **Side-panel extensions never render an in-panel `<Header>`.** Chrome paints a system header. `PanelHeader` for drill-in subviews is fine.
- **`actions` slot of `<Header>` is empty by default.** No icon-button shortcuts (settings gear, "+", typography) next to the title. The two acceptable shapes: a single `⋮` overflow `IconButton` at the far right (with `SearchInput` between it and the title — `chrome://bookmarks` shape), or a single `Button variant="text"` like "Clear all".
- **Form-control geometry is shared.** `Input`, `Textarea`, and `Select` are 32px tall, 8px corner radius, surface-variant border, 12px text — by design. Do not override per-control. (`SearchInput` is intentionally a different shape: borderless filled pill.)
- **Side-panel sections are cards, not bare lists.** Each section is its own `<Card>` (default `elevated`) with a `<h2>` heading above. The bare-list shape was modelled on Chrome's Reading List and does not generalise.
- **No `fullWidth` Button, no `tonal` Button, no `Chip`.** Removed deliberately. Stretched buttons read as banners; tonal is redundant against outlined; Chip's role overlapped Badge / Button.
- **Primary-action on a side panel is centred in a pinned footer.** Library divergence from Chromium's right-aligned dialogs — the panel's primary verb is the user's next move and centred is unambiguously the destination. See `Pattern — Primary action button`.
- **Stop button is `variant="destructive"`.** Interrupting in-flight work is destructive; the colour carries that meaning rather than reading as a neutral Cancel.
- **Sidebar `<Menu role="navigation">` renders flat** — no shadow, no card, no border-radius. Popover Menus (the default) keep elevation-3 + 8px radius. The discriminator is the required `role="navigation"` attribute.

The full styleguide, including anti-patterns and the deliberate-deviations catalogue (Library vs. Chromium source), lives at [`/styleguide`](./styleguide/overview.md) and [`/styleguide/chromium-reference#deliberate-deviations`](./styleguide/chromium-reference.md#deliberate-deviations).

## 10. Versioning

Minor versions may add new components. Breaking changes bump the major. Pin if you care.
