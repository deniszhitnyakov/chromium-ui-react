---
id: styleguide-pattern-settings-page
title: Pattern — Settings page
slug: /styleguide/patterns/settings-page
description: A full assembled settings page matching chrome://settings, with sidebar, section headings, and row variety. Built from live previews.
format: mdx
---

# Pattern — Settings page

This is the pattern a full-tab options page should follow. It is the closest reproduction `chromium-ui-react` allows of `chrome://settings` without modifying the library.

## The finished page

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
  <Toolbar title="Settings">
    <SearchInput placeholder="Search settings" style={{ flex: 1, maxWidth: 400 }} />
  </Toolbar>
  <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
    <nav style={{
      width: 260,
      borderRight: '1px solid var(--cr-fallback-color-outline)',
      padding: '12px 0',
      overflowY: 'auto',
    }}>
      <Menu role="navigation">
        <MenuItem selected>Appearance</MenuItem>
        <MenuItem>Privacy and security</MenuItem>
        <MenuItem>Autofill and passwords</MenuItem>
        <MenuItem>Performance</MenuItem>
        <MenuItem>Search engine</MenuItem>
        <MenuItem>Default browser</MenuItem>
        <MenuItem>On startup</MenuItem>
        <MenuItem>Languages</MenuItem>
        <MenuItem>Downloads</MenuItem>
        <MenuItem>Accessibility</MenuItem>
        <MenuDivider />
        <MenuItem>About</MenuItem>
      </Menu>
    </nav>
    <main style={{ flex: 1, overflowY: 'auto', padding: '24px 0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <section>
          <h2 style={{ fontSize: 14, fontWeight: 400, letterSpacing: '0.25px', margin: '0 0 12px 0', padding: '8px 0 4px' }}>
            Appearance
          </h2>
          <Card variant="elevated">
            <List>
              <ListItem
                primary="Theme"
                secondary="System default"
                interactive
                end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
              />
              <Divider subtle />
              <ListItem primary="Show home button" end={<Toggle defaultChecked />} />
              <Divider subtle />
              <ListItem primary="Show bookmarks bar" end={<Toggle />} />
              <Divider subtle />
              <ListItem
                primary="Font size"
                end={<Select options={[{ value: 'md', label: 'Medium (recommended)' }, { value: 'lg', label: 'Large' }, { value: 'xl', label: 'Very large' }]} />}
              />
              <Divider subtle />
              <ListItem
                primary="Page zoom"
                end={<Select options={[{ value: '100', label: '100%' }, { value: '110', label: '110%' }, { value: '125', label: '125%' }]} />}
              />
            </List>
          </Card>
        </section>
        <section>
          <h2 style={{ fontSize: 14, fontWeight: 400, letterSpacing: '0.25px', margin: '0 0 12px 0', padding: '8px 0 4px' }}>
            On startup
          </h2>
          <Card variant="elevated">
            <CardBody>
              <RadioGroup defaultValue="ntp" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Radio value="ntp" label="Open the New Tab page" />
                <Radio value="continue" label="Continue where you left off" />
                <Radio value="specific" label="Open a specific page or set of pages" />
              </RadioGroup>
            </CardBody>
          </Card>
        </section>
        <section>
          <h2 style={{ fontSize: 14, fontWeight: 400, letterSpacing: '0.25px', margin: '0 0 12px 0', padding: '8px 0 4px' }}>
            Advanced
          </h2>
          <Card variant="elevated">
            <List>
              <ListItem
                primary="Privacy and security"
                interactive
                end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
              />
              <Divider subtle />
              <ListItem
                primary="Languages"
                secondary="English (United States)"
                interactive
                end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
              />
              <Divider subtle />
              <ListItem
                primary="Downloads"
                secondary="Ask where to save each file before downloading"
                interactive
                end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
              />
              <Divider subtle />
              <ListItem
                primary="Accessibility"
                interactive
                end={<span style={{ color: 'var(--cr-fallback-color-on-surface-subtle)' }}>›</span>}
              />
            </List>
          </Card>
        </section>
      </div>
    </main>
  </div>
</div>
```

## What to copy from this

Every measurement above is intentional. The ones worth calling out:

- **Toolbar.** 56px tall (component default). Search field in the middle, `maxWidth: 400`. No shadow below the toolbar.
- **Sidebar.** 260px wide (Chromium uses 266; rounded to a nicer number here). Separated from content by a 1px right border, no shadow.
- **Content column.** `max-width: 680px`, centered, with 24px gutters. Sections stack with `gap: 24`.
- **Section header.** `<h2>` 14px weight-400 (regular!), letter-spacing 0.25px, above the card. Not inside.
- **Section card.** `variant="elevated"` — has the subtle `--cr-elevation-2` shadow that Chromium's `settings-section` uses. No outline.
- **Rows.** Primary text, optional secondary line, optional chevron on drill-in rows. Separated by `<Divider subtle />` (6% opacity hairline).
- **Radio group.** Lives directly in `<CardBody>` when it is the whole section, not inside a `ListItem`.
- **No save button.** Settings apply inline as toggles flip / selects change. The page has no footer.

## What NOT to do on this page

Cross-referenced against the [Anti-patterns](../anti-patterns.md) page:

- ❌ One card per setting. There are four sections here, not fifteen cards.
- ❌ Section header inside the card. The `<h2>` is above.
- ❌ `<h2>` at 20px bold. It is 14px regular.
- ❌ Tabs for "Appearance / Privacy / Autofill". Those are sidebar items.
- ❌ Primary blue buttons scattered around. No primary buttons on a settings page — settings save inline.
- ❌ Icons on every row. Only drill-in rows get a chevron; nothing leads with an icon.

## Responsive behavior

Below a ~980px viewport (Chromium's `narrow-threshold`), the sidebar should collapse into a hamburger button in the toolbar. This library does not ship that behavior out of the box — you gate on `window.innerWidth` or a media query, and render either the sidebar or a hamburger that opens a drawer:

```tsx
const narrow = useMediaQuery('(max-width: 980px)');

<Toolbar
  title="Settings"
  actions={narrow && <IconButton aria-label="Menu" icon={<MenuIcon />} onClick={openDrawer} />}
>
  {!narrow && <SearchInput placeholder="Search settings" style={{ flex: 1, maxWidth: 400 }} />}
</Toolbar>
{!narrow && <Sidebar />}
```

For a mobile width (≤ 600px), the content column goes full-width with 16px side padding and the sidebar lives behind the hamburger.

## Mapping to Chromium source

| Element | Source reference |
|---|---|
| Shell | `chrome/browser/resources/settings/settings_ui/settings_ui.html` |
| Sidebar | `chrome/browser/resources/settings/settings_menu/settings_menu.html` |
| Section card | `chrome/browser/resources/settings/settings_page/settings_section.html` |
| Row styles | `chrome/browser/resources/settings/settings_shared.css` (`.settings-box`) |
| Tokens | `ui/webui/resources/cr_elements/cr_shared_vars.css` |

If you want to dive deeper, open any real `chrome://settings` page alongside the live preview above. The two should look near-identical in structure; deviations are the calibration deltas in [Chromium source reference — Library calibration notes](../chromium-reference.md#library-calibration-notes).
