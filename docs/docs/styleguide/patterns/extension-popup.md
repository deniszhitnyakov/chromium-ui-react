---
id: styleguide-pattern-extension-popup
title: Pattern — Extension popup
slug: /styleguide/patterns/extension-popup
description: The small popup that opens from the browser toolbar icon. Narrow, functional, no landing-page fluff.
format: mdx
---

# Pattern — Extension popup

The browser-action popup is the smallest Chromium-native surface: ~360×520px, opened and dismissed in a second. Every design decision here is aimed at making the user's intended action possible in one click.

## The functional popup

A popup that shows the feature immediately — no onboarding, no logo, no "What is this?" panel.

```tsx live
<div style={{
  width: 380,
  height: 520,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Quick capture" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <Card variant="filled" style={{ margin: '16px', borderRadius: 8 }}>
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
        }}>
          🌐
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Chromium UI React Docs
          </div>
          <div style={{ fontSize: 12, color: 'var(--cr-fallback-color-on-surface-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            ztnkv.github.io/chromium-ui-react
          </div>
        </div>
      </CardBody>
    </Card>
    <div style={{ padding: '0 16px' }}>
      <div style={{
        fontSize: 14,
          fontWeight: 400,
          color: 'var(--cr-fallback-color-on-surface)',
        margin: '8px 0',
      }}>
        What to capture
      </div>
      <RadioGroup defaultValue="full" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Radio value="full" label="Full page" />
        <Radio value="selection" label="Selected text" />
        <Radio value="screenshot" label="Screenshot" />
      </RadioGroup>
      <div style={{ height: 16 }} />
      <div style={{
        fontSize: 14,
          fontWeight: 400,
          color: 'var(--cr-fallback-color-on-surface)',
        margin: '8px 0',
      }}>
        Include
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Checkbox defaultChecked label="Title and URL" />
        <Checkbox defaultChecked label="Page metadata" />
        <Checkbox label="Images" />
      </div>
      <div style={{ height: 16 }} />
      <List>
        <Divider subtle />
        <ListItem
          primary="Settings"
          secondary="Default format, shortcut, destinations"
          interactive
          end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
        />
      </List>
    </div>
  </div>
  <div style={{
    padding: 'var(--cr-space-4)',
    borderTop: '1px solid var(--cr-divider-color)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--cr-space-2)',
  }}>
    <Button variant="text">Cancel</Button>
    <Button variant="action">Capture</Button>
  </div>
</div>
```

## What to copy from this

- **Dimensions.** 380×520. Chrome enforces a max popup size of 800×600; stay well under.
- **Header.** Standard 56px `<Header>`. Title is the extension name — **nothing else in the actions slot.** No gear, no "+", no `⋮`. See [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).
- **Options entry point.** A drill-in `ListItem` (or `PanelRow`) at the bottom of the popup, leading to the full options page. Not an `IconButton` in the header.
- **Content.** One column, no sidebar. Mix of card-wrapped context (the current-page info) and ungrouped controls (radios, checkboxes).
- **Current-page card.** Use `Card variant="filled"` to visually group the "what you are about to act on" context without adding a shadow that would compete with the popup's own border.
- **Group labels.** 11px all-caps — the pattern is acceptable in popups because there is no `<h2>` hierarchy competing.
- **Footer.** 56–64px, pinned, right-aligned `[Cancel] [Primary]`.
- **Text buttons in the footer.** Popups often use `variant="text"` for Cancel (quieter, saves horizontal space) paired with `variant="action"` for the primary.

## Variants by popup type

### Empty / onboarding

For the first-run case before the extension has any state. One empty-state block, one primary action:

```tsx live
<div style={{
  width: 380,
  height: 520,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Reading list" />
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
    <EmptyState
      title="No saved pages"
      description="Pages you save will appear here. Start by adding this tab."
      action={<Button variant="action">Add tab</Button>}
    />
  </div>
</div>
```

The `<EmptyState>` is the only illustration-adjacent element Chromium ships. Keep it text-heavy and small; no hero image.

### List + detail (drill-in)

For popups with multiple items to pick from, use `PanelStack` inside the popup the same way you would in a side panel:

```tsx live
<div style={{
  width: 380,
  height: 520,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Your bookmarks" />
  <PanelStack defaultView="list" style={{ flex: 1, minHeight: 0 }}>
    <PanelView id="list">
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <List>
          <ListItem
            icon={<GlobeIcon />}
            primary="Chromium UI React"
            secondary="ztnkv.github.io"
            interactive
            onClick={() => {}}
            end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
          />
          <Divider subtle />
          <ListItem
            icon={<GlobeIcon />}
            primary="Docusaurus"
            secondary="docusaurus.io"
            interactive
            end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
          />
          <Divider subtle />
          <ListItem
            icon={<GlobeIcon />}
            primary="React"
            secondary="react.dev"
            interactive
            end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
          />
        </List>
      </div>
    </PanelView>
  </PanelStack>
</div>
```

### Status-only popup

When the popup is purely informational (e.g., ad blocker summarizing what was blocked), skip the footer and make the content itself the message:

```tsx live
<div style={{
  width: 360,
  height: 420,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Ad blocker" />
  <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Card variant="filled">
      <CardBody>
        <div style={{ fontSize: 24, fontWeight: 400 }}>47</div>
        <div style={{ fontSize: 13, color: 'var(--cr-fallback-color-on-surface-subtle)' }}>ads blocked on this page</div>
      </CardBody>
    </Card>
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Enabled on</div>
      <List>
        <ListItem primary="example.com" end={<Toggle defaultChecked />} />
        <Divider subtle />
        <ListItem primary="All other sites" end={<Toggle defaultChecked />} />
      </List>
    </div>
    <List>
      <ListItem
        primary="Settings"
        secondary="Filter lists, exceptions, advanced"
        interactive
        end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
      />
    </List>
  </div>
</div>
```

(The 24px number is the one acceptable exception to the "no display sizes" rule — a single scalar statistic on a status card. Use sparingly.)

## Common popup mistakes

- **Onboarding splash on every open.** The popup opens directly on the feature after first-run.
- **Logo + tagline in the header.** The `<Header title>` is enough.
- **"Upgrade to Pro" pinned at the bottom.** Monetization UI belongs in a subpage or options, not the popup footer.
- **Three-column layouts.** At 380px there is no room.
- **Scroll in both directions.** Vertical only; never horizontal.
- **Tiny text to fit more.** If content does not fit, drill into a subpage with `PanelStack`.
- **Full-tab options link as a giant button.** It is a drill-in `ListItem` or `PanelRow` at the bottom of the popup, labelled `Options` / `Settings`, with a chevron.
- **Gear icon next to the title.** Do not place an `IconButton` in the toolbar actions slot for the options entry — it is the most common reason a popup stops reading as Chromium-native. See [Anti-patterns #16](../anti-patterns.md#16-iconbutton-glued-to-a-title-in-the-header).

## Options page

Most extensions also have a full-tab options page reached via the `Options` / `Settings` drill-in row at the bottom of the popup. That page follows the [Settings page pattern](./settings-page.md). Between the popup and the options page, split content so that:

- **Popup** has the feature's primary action and the three most-changed settings.
- **Options** has every setting, grouped into sections.

Do not try to fit every setting in the popup. Users will discover options when they need to.
