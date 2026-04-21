---
id: styleguide-forms
title: Forms
slug: /styleguide/forms
description: How Chromium WebUI composes form fields — label above, hint below, inline errors, and inline-row variants for settings pages.
format: mdx
---

# Forms

Chromium form fields are quiet: label sits above the field in a small medium-weight sans, hint text in subtle grey below, inline error replaces the hint when validation fails. No floating labels, no placeholder-as-label, no framed form sections with stripes.

## Standalone field

The default `<Input>` composition. Used in dialogs, full-page forms, and configuration screens.

```tsx live
<div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
  <Input
    label="Email"
    type="email"
    placeholder="you@example.com"
    hint="We'll never share your email."
  />
  <Input
    label="Password"
    type="password"
    error="Must be at least 8 characters"
  />
  <Textarea
    label="Description"
    rows={3}
    placeholder="What's this extension for?"
  />
  <Select
    label="Region"
    options={[
      { value: 'us', label: 'United States' },
      { value: 'eu', label: 'European Union' },
      { value: 'uk', label: 'United Kingdom' },
    ]}
  />
</div>
```

- **Label:** 12px, weight-500, `on-surface-subtle`, 4px above field.
- **Field:** 36px tall for medium size, 1px outline, 4px radius.
- **Hint:** 12px, `on-surface-subtle`, 4px below field.
- **Error:** 12px, `--cr-fallback-color-error`, 4px below field — **replaces** the hint, does not stack with it.

These are all handled by `<Input>` automatically. Do not wrap `<Input>` in your own label tag.

## Inline-row field

Inside a settings row, the label is the `ListItem` `primary` and the control is in the `end` slot. This is the most common form surface in Chromium.

```tsx live
<Card variant="outlined" style={{ maxWidth: 520 }}>
  <List>
    <ListItem
      primary="Download location"
      secondary="/Users/you/Downloads"
      interactive
      end={<Button variant="text">Change</Button>}
    />
    <Divider subtle />
    <ListItem
      primary="Max file size (MB)"
      end={<Input type="number" defaultValue={50} style={{ width: 96 }} />}
    />
    <Divider subtle />
    <ListItem
      primary="Search engine"
      end={<Select options={[{ value: 'g', label: 'Google' }, { value: 'ddg', label: 'DuckDuckGo' }]} />}
    />
  </List>
</Card>
```

- Inline inputs should have an explicit narrow `width` (80–120px for numbers, 160–240px for text). They do not stretch.
- For a control that genuinely needs the whole row, drill in to a subpage — don't stretch the inline control to full width.
- Never put a label *next to* the inline control. The row's primary text is the label.

## Form dialogs

Short forms (add/edit) belong inside a `<Dialog>`. The dialog body is one column of stacked fields, 16px gap.

```tsx live noInline
function FormDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="action" onClick={() => setOpen(true)}>Add bookmark</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add bookmark"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="action" onClick={() => setOpen(false)}>Save</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 420 }}>
          <Input label="Name" defaultValue="Chromium UI React" />
          <Input label="URL" type="url" defaultValue="https://ztnkv.github.io/chromium-ui-react" />
          <Select
            label="Folder"
            options={[
              { value: 'bar', label: 'Bookmarks bar' },
              { value: 'other', label: 'Other bookmarks' },
            ]}
          />
        </div>
      </Dialog>
    </>
  );
}
render(<FormDialogDemo />);
```

- Fixed body width 420–480px. Do not let the dialog expand to full viewport just because the form is long — long forms belong on their own page.
- Field stack is `gap: 16px` (`--cr-space-4`).
- Action row is `[Cancel] [Primary]` at the bottom, right-aligned. See [Dialogs](./dialogs.md).

## Search inputs

`<SearchInput>` has its own visual language — pill-shaped, leading search icon, no standalone label. Use it in the toolbar or at the top of a list.

```tsx live
<Toolbar
  title="History"
  style={{ border: '1px solid var(--cr-fallback-color-outline)', borderRadius: 8 }}
>
  <SearchInput placeholder="Search history" style={{ flex: 1, maxWidth: 360 }} />
</Toolbar>
```

- Max-width ~360px. Never full-width — it becomes a form input visually.
- One search input per surface. No multi-filter toolbars with 3 search fields side by side.

## Grouped form sections

For a multi-section form (e.g., "Profile" with name + bio + social links), compose sections the same way as settings: one card per section, one 11px all-caps label per section if groups exist.

```tsx live
<div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 24 }}>
  <div>
    <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cr-fallback-color-on-surface-subtle)', padding: '0 16px 8px' }}>
      Profile
    </div>
    <Card variant="outlined">
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Name" defaultValue="Alex Doe" />
        <Input label="Display name" defaultValue="alex" hint="Appears on shared bookmarks" />
        <Textarea label="Bio" rows={3} />
      </CardBody>
    </Card>
  </div>
  <div>
    <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cr-fallback-color-on-surface-subtle)', padding: '0 16px 8px' }}>
      Links
    </div>
    <Card variant="outlined">
      <CardBody style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Website" type="url" placeholder="https://" />
        <Input label="Email" type="email" />
      </CardBody>
    </Card>
  </div>
</div>
```

Settings pages do not have a "Save" footer — changes apply as they happen. A form page (like a profile edit) *does* have a footer:

```tsx
<div style={{ padding: 16, borderTop: '1px solid var(--cr-fallback-color-outline)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
  <Button>Cancel</Button>
  <Button variant="action">Save</Button>
</div>
```

The distinction is: **settings save inline** (per-toggle, per-select), **forms save explicitly** (submit button at the end). Don't mix — if a page has a "Save" button, every setting on it should wait for that button to be pressed.

## Validation

- **Inline, on blur.** Do not validate on every keystroke (jumpy). Do not wait until submit (blames late).
- **Field-level error text replaces hint text.** Never stack both.
- **Form-level errors go in a `<Toast variant="error">`** at the bottom, not in a banner at the top.
- **Required markers:** do not add "*" next to labels. Instead, the hint says "Required" if needed — Chromium doesn't decorate labels.

## Disabled state

- Disabled inputs use `--cr-fallback-color-disabled-background` + `--cr-fallback-color-disabled-foreground` — handled by the component.
- Disable fields, not submit buttons, when a prerequisite is missing. The submit stays enabled so clicking it can trigger a form-level error message explaining what is missing.

## Avoid

- **Floating labels.** No Material-style "float up on focus."
- **Placeholder as label.** The placeholder disappears on focus; the label must not.
- **Asterisk for required.** Use the hint text or don't mark at all.
- **Inline controls stretched to 100% inside a `ListItem`.** Controls in the `end` slot hug their content.
- **Large form sections without visual grouping.** Six fields in a row without a card feel like a spreadsheet. Group into cards.
- **"Password strength" meter bars inside a row.** If you need one, put it under the password field as a subtle 12px grey line of text — no colored progress bar.
- **Left-aligned labels beside fields** (the old desktop-app pattern). Labels are above in Chromium.

Chromium forms are boring on purpose. Fewer cues, more whitespace, label-above-field. When in doubt, do less.
