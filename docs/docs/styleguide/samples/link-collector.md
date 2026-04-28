---
id: styleguide-sample-link-collector
title: Sample — Link Collector extension
slug: /styleguide/samples/link-collector
description: A full fictional extension UI (popup + options page) built entirely with chromium-ui-react and the styleguide's conventions.
format: mdx
---

# Sample — Link Collector

A fictional extension that saves links from the current page into categorized collections. This page shows the full UI — popup and options — assembled exclusively from library components, following every rule in the styleguide.

Use this as a reference when you build your own extension.

## The popup

Opens from the toolbar icon. Shows the current tab, the active collection, quick-add controls, and recent captures.

```tsx live
<div style={{
  width: 400,
  height: 560,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Link Collector" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <Card variant="filled" style={{ margin: 16, borderRadius: 8 }}>
      <CardBody style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: 'var(--cr-fallback-color-surface)',
          border: '1px solid var(--cr-fallback-color-outline)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>🌐</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            The Elements of Typographic Style Applied to the Web
          </div>
          <div style={{ fontSize: 12, color: 'var(--cr-fallback-color-on-surface-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            practicaltypography.com
          </div>
        </div>
      </CardBody>
    </Card>
    <List style={{ padding: '0 16px' }}>
      <ListItem
        primary="Settings"
        secondary="Collections, tags, sync, shortcuts"
        interactive
        end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
      />
    </List>
    <div style={{ padding: '8px 16px 0' }}>
      <Select
        label="Collection"
        defaultValue="typography"
        options={[
          { value: 'typography', label: 'Typography references (12)' },
          { value: 'design', label: 'Design systems (47)' },
          { value: 'dev', label: 'Dev reading (83)' },
          { value: 'inbox', label: 'Inbox (5)' },
        ]}
      />
      <div style={{ height: 16 }} />
      <Input label="Notes" placeholder="Optional" />
      <div style={{ height: 16 }} />
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Badge variant="info">long-read</Badge>
        <Badge>reference</Badge>
        <Badge>typography</Badge>
        <Button size="sm" variant="text" startIcon={<PlusIcon size={16} />}>tag</Button>
      </div>
    </div>
    <div style={{
      fontSize: 14,
          fontWeight: 400,
          color: 'var(--cr-fallback-color-on-surface)',
      padding: '24px 16px 8px',
    }}>
      Recently saved
    </div>
    <List>
      <ListItem
        icon={<GlobeIcon size={14} />}
        primary="A Case Study on Fixing a Memory Leak"
        secondary="v8.dev · 3 min ago"
        interactive
      />
      <Divider subtle />
      <ListItem
        icon={<GlobeIcon size={14} />}
        primary="Settling the 3xx redirect debate"
        secondary="jakearchibald.com · 1 h ago"
        interactive
      />
    </List>
  </div>
  <div style={{
    padding: 'var(--cr-space-4)',
    borderTop: '1px solid var(--cr-divider-color)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--cr-space-2)',
  }}>
    <Button variant="text">Cancel</Button>
    <Button variant="action">Save link</Button>
  </div>
</div>
```

### Design decisions

- **No hero, no logo.** The popup opens directly on the feature. The active-tab card is the first thing the user sees.
- **Filled card** for the active-tab context — visually groups "what you are about to act on" without competing with the popup's own border.
- **Inline form**, not a dialog. The popup *is* the form; opening another dialog on top would be redundant.
- **Tags via `<Badge>`.** Tags read as static labels (sentence case, neutral or info colour). Adding a new tag is a small text Button with a `+` icon — not a "compact chip" — keeping the surface in the Badge / Button vocabulary.
- **Recently saved** is a 11px all-caps section below the form — subtle, not competing for attention.
- **Footer:** `[Cancel (text)] [Save link (action)]` — right-aligned. The text-variant Cancel de-emphasizes it relative to the primary.

## The options page

The full-tab options page (opened from the `Settings` drill-in row in the upper half of the popup — see [Pattern — Settings entry](../patterns/settings-entry.md)) follows the [Settings page pattern](../patterns/settings-page.md).

```tsx live
<div style={{
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  height: 640,
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Link Collector — Options">
    <SearchInput placeholder="Search settings" style={{ flex: 1, maxWidth: 400 }} />
  </Header>
  <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
    <nav style={{ width: 240, borderRight: '1px solid var(--cr-fallback-color-outline)', padding: '12px 0', overflowY: 'auto' }}>
      <Menu role="navigation">
        <MenuItem selected>General</MenuItem>
        <MenuItem>Collections</MenuItem>
        <MenuItem>Tags</MenuItem>
        <MenuItem>Sync</MenuItem>
        <MenuItem>Keyboard shortcuts</MenuItem>
        <MenuDivider />
        <MenuItem>About</MenuItem>
      </Menu>
    </nav>
    <main style={{ flex: 1, overflowY: 'auto', padding: '24px 0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <section>
          <h2 style={{ fontSize: 14, fontWeight: 400, letterSpacing: '0.25px', margin: '0 0 12px 0', padding: '8px 0 4px' }}>
            General
          </h2>
          <Card variant="elevated">
            <List>
              <ListItem
                primary="Default collection"
                secondary="New links go here unless you choose another"
                end={<Select options={[{ value: 'inbox', label: 'Inbox' }, { value: 'typography', label: 'Typography references' }]} />}
              />
              <Divider subtle />
              <ListItem
                primary="Save selected text as note"
                secondary="Auto-fill the Notes field with the current selection"
                end={<Toggle defaultChecked />}
              />
              <Divider subtle />
              <ListItem
                primary="Show notifications"
                end={<Toggle defaultChecked />}
              />
              <Divider subtle />
              <ListItem
                primary="Open popup after saving"
                secondary="Keep the popup open so you can edit tags or notes"
                end={<Toggle />}
              />
            </List>
          </Card>
        </section>
        <section>
          <h2 style={{ fontSize: 14, fontWeight: 400, letterSpacing: '0.25px', margin: '0 0 12px 0', padding: '8px 0 4px' }}>
            Capture
          </h2>
          <Card variant="elevated">
            <CardBody>
              <div style={{ fontSize: 13, color: 'var(--cr-fallback-color-on-surface-subtle)', marginBottom: 12 }}>
                What to capture along with the URL.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Checkbox defaultChecked label="Page title" />
                <Checkbox defaultChecked label="Page description (meta tag)" />
                <Checkbox defaultChecked label="Favicon" />
                <Checkbox label="Primary image (og:image)" />
                <Checkbox label="Page content snapshot" />
              </div>
            </CardBody>
          </Card>
        </section>
        <section>
          <h2 style={{ fontSize: 14, fontWeight: 400, letterSpacing: '0.25px', margin: '0 0 12px 0', padding: '8px 0 4px' }}>
            Danger zone
          </h2>
          <Card variant="elevated">
            <List>
              <ListItem
                primary="Clear all collections"
                secondary="Remove every saved link from every collection"
                interactive
                end={<Button variant="destructive" size="sm">Clear</Button>}
              />
            </List>
          </Card>
        </section>
      </div>
    </main>
  </div>
</div>
```

### Design decisions

- **No Save button.** Changes apply inline — Chromium settings convention.
- **Three sections** with `<h2>` headers above cards. `variant="elevated"` cards with row lists.
- **Radio group inside a card body** for the "Capture" section because the whole card is one decision.
- **Destructive action** lives in its own "Danger zone" section, with a `variant="destructive"` button inside a drill-in row. Clicking it opens a dialog:

```tsx live noInline
function ClearAllDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Clear all</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Clear all collections?"
        actions={
          <>
            <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Clear</Button>
          </>
        }
      >
        <div style={{ width: 420 }}>
          This will permanently remove 147 links from 4 collections on this device. This action can't be undone.
        </div>
      </Dialog>
    </>
  );
}
render(<ClearAllDemo />);
```

- Title asks the question.
- Body states the count and that the action is irreversible.
- `[Cancel] [Clear]`, right-aligned, Clear is destructive red.

## The collection manager

For "Manage collections" (a drill-in from the options sidebar), use the [Bookmarks manager pattern](../patterns/bookmarks-manager.md) — two-pane with collections on the left and links on the right.

## What makes this Chromium-native

Run the checklist from [Pre-flight checklist](../checklist.md):

- ✅ Every color is a `--cr-*` token.
- ✅ Exactly one primary button visible at a time.
- ✅ Action rows right-aligned with Cancel on the left.
- ✅ Type sizes on the scale (11, 12, 13, 14, 16 — no 20+ in functional flow).
- ✅ Rows separated by `Divider subtle`, not gaps.
- ✅ Cards flat (outlined or elevated), never with hover shadows applied globally.
- ✅ Focus ring is the default blue 2px outline.
- ✅ No icons on every row — only on context cards and tree nodes.
- ✅ Navigation is a sidebar `Menu` (wide) and no tabs or drill-in in the popup.
- ✅ No gradient, no illustration, no marketing copy.

If any of these are "no" in your own extension, refer to the relevant styleguide page to fix.
