---
id: styleguide-pattern-primary-action
title: Pattern — Primary action button
slug: /styleguide/patterns/primary-action
description: The single, centered primary action at the bottom of a side panel — the fastest path to an extension's aha moment.
format: mdx
---

# Pattern — Primary action button

This is the one pattern in this styleguide that is a deliberate **departure from Chromium WebUI convention**. It exists for a concrete extension-product reason: extensions whose surface is a side panel need the new user to reach their first primary action in a single glance. A native Chromium surface like `chrome://bookmarks` does not carry that burden; an extension does. The rule below sits *on top of* the rest of the guide — inside every surface it does not apply to, the regular Chromium conventions still win.

## Scope

**Applies to:** browser-extension **side panels** that have exactly one meaningful primary action — the button the user came to press (Start, Capture, Scan, Generate, Export).

**Does not apply to:**

- **Extension popup.** A 380×520 popup is already small enough that the standard Chromium footer `[Cancel] [Primary]` right-aligned works — see [Pattern — Extension popup](./extension-popup.md). A centered primary inside a popup would actually *worsen* the read, because the popup has less vertical room for the eye to travel and a centered button competes with the toolbar title above it.
- **Full-tab options page.** Options pages are long, scrollable, settings-oriented; they rarely carry a single on-page primary. Follow [Pattern — Settings page](./settings-page.md).
- **Confirmation dialogs.** Always `[Cancel] [Primary]` right-aligned — see [Principle 4](../principles.md).

The extension popup case is worth naming twice: the popup opens *adjacent* to the user's pointer, never more than one scroll-length tall, and its content is usually already task-focused. The side panel does not have those advantages — it is a persistent surface of varying length, often opened before the user has any context, and that is why it specifically benefits from a louder anchor at the bottom.

## Why it exists

A typical "assembled from rows" extension side panel looks like this when you lay out its state in Chromium-native form:

```tsx live
<div style={{
  width: 360,
  height: 520,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Maps scraper" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <PanelRow primary="Columns" secondary="4 of 9 visible" navigateTo="columns" />
    <Divider subtle />
    <PanelRow
      primary="Scraping"
      secondary="Idle"
      end={<Button variant="action" size="sm">Start</Button>}
    />
    <Divider subtle />
    <PanelRow primary="Collected" secondary="4 unique · 1 duplicate · 0 errors" end={<Badge>5</Badge>} />
    <Divider subtle />
    <PanelRow primary="Rate mode" secondary="Conservative" navigateTo="rate" />
    <Divider subtle />
    <PanelRow primary="Export" secondary="CSV / XLSX / JSON" navigateTo="export" />
  </div>
</div>
```

Everything here is technically correct. The primary action is labelled, it has `variant="action"`, nothing is center-aligned that should not be. And yet a first-time user's eye has to:

1. read the title,
2. parse the first row ("Columns"),
3. parse the second row ("Scraping / Idle"),
4. notice that the pill on the right of row 2 is interactive (as opposed to the `5` badge two rows down, which is not),
5. decide that "Start" is a verb meant for them, and
6. commit to pressing it.

That is five cognitive steps between "opened the panel" and "knows what to do." Each step is a chance to bounce. In a paid-extension funnel, this is where the first-run aha moment is quietly killed.

The fix is almost embarrassing in its smallness: promote the primary action out of the row into a dedicated footer, center it, make it the only filled button on the surface. The user's decision collapses from *scan, parse, identify, decide, click* to just *click*.

## Three requirements

### 1. At the bottom, not in the middle

The primary is the **last** vertical element on the surface. It terminates the layout — the eye reaches it and stops. If content rows must live below the primary (Export, About, Feedback) either promote them into the toolbar's overflow, or demote them into a drill-in row that opens a subpage. Putting the primary mid-panel — no matter how correctly styled — is the single most common way extensions bury their own CTA.

**Primary mid-surface is an anti-pattern.** See [Anti-pattern #17](../anti-patterns.md).

### 2. Horizontally centered

This is the step that departs from Chromium's `[Cancel] [Primary]` right-alignment. On a narrow surface (~360–400px) with a **single** action, right-aligning the button makes it read as a trailing accessory — the same visual family as the chevrons on the drill-in rows above it. Centering lifts the button out of that family and says: *this is the action, not a row-end affordance.*

The footer is `display: flex; justify-content: center` with a single content-sized `<Button variant="action">` — the same content-sized button that appears anywhere else, just placed in the centre of a padded strip. There is no full-width affordance: a button stretched edge-to-edge stops reading as a button and starts reading as a banner, which is exactly the shape `chrome://settings` never produces. Long verbs are a labelling problem, not a sizing one (see [Pattern — Button labels](#)).

Never right-align a single primary in a side-panel footer. It looks like a forgotten secondary.

### 3. The only primary on screen

Exactly one `variant="action"` visible at any time. Other buttons are `variant="text"`, `variant="outlined"`, or `IconButton`s — anything visually quieter. If two things both feel like they need filled-primary styling, one of them is not actually primary. Promote it to a subpage, demote it to a text link, or merge it into the primary's split menu.

This is the strict form of [Anti-pattern #11](../anti-patterns.md#11-primary-color-on-secondary-actions) applied specifically to side panels. An extension should strive for one — *one* — obvious next click per screen.

## Before & after

### Before — primary buried mid-surface

```tsx live
<div style={{
  width: 360,
  height: 520,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Maps scraper" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <PanelRow primary="Columns" secondary="4 of 9 visible" navigateTo="columns" />
    <Divider subtle />
    <PanelRow
      primary="Scraping"
      secondary="Idle"
      end={<Button variant="action" size="sm">Start</Button>}
    />
    <Divider subtle />
    <PanelRow primary="Collected" secondary="4 unique · 1 duplicate · 0 errors" end={<Badge>5</Badge>} />
    <Divider subtle />
    <PanelRow primary="Rate mode" secondary="Conservative" navigateTo="rate" />
    <Divider subtle />
    <PanelRow primary="Export" secondary="CSV / XLSX / JSON" navigateTo="export" />
  </div>
</div>
```

Labelled correctly, placed incorrectly. The verb is buried in row 2 and competes with the `5` badge two rows below. Time-to-first-action: five scan steps.

### After — single centered primary at the bottom

```tsx live
<div style={{
  width: 360,
  height: 520,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Maps scraper" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <PanelRow primary="Columns" secondary="4 of 9 visible" navigateTo="columns" />
    <Divider subtle />
    <PanelRow primary="Scraping" secondary="Idle" />
    <Divider subtle />
    <PanelRow primary="Collected" secondary="4 unique · 1 duplicate · 0 errors" end={<Badge>5</Badge>} />
    <Divider subtle />
    <PanelRow primary="Rate mode" secondary="Conservative" navigateTo="rate" />
    <Divider subtle />
    <PanelRow primary="Export" secondary="CSV / XLSX / JSON" navigateTo="export" />
  </div>
  <div style={{
    padding: 'var(--cr-space-4)',
    borderTop: '1px solid var(--cr-divider-color)',
    display: 'flex',
    justifyContent: 'center',
  }}>
    <Button variant="action">Start scraping</Button>
  </div>
</div>
```

The eye runs down the rows and lands on the one filled button. `Scraping` is now a pure status row. Time-to-first-action: one scan step.

## Variants

### Running-state replacement

When the primary's state flips (Start → Stop, Capture → Cancel), replace the button in place — do not stack two. The single-footer discipline stays the same, the verb and variant change:

```tsx live
<div style={{
  width: 360,
  height: 460,
  border: '1px solid var(--cr-fallback-color-outline)',
  borderRadius: 12,
  overflow: 'hidden',
  background: 'var(--cr-fallback-color-surface)',
  display: 'flex',
  flexDirection: 'column',
}}>
  <Header title="Maps scraper" />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <PanelRow primary="Scraping" secondary="Running · 42 of 120" end={<Spinner size={16} />} />
    <Divider subtle />
    <PanelRow primary="Collected" secondary="42 unique · 3 duplicates · 0 errors" end={<Badge>45</Badge>} />
    <Divider subtle />
    <PanelRow primary="Rate mode" secondary="Conservative" navigateTo="rate" />
  </div>
  <div style={{
    padding: 'var(--cr-space-4)',
    borderTop: '1px solid var(--cr-divider-color)',
    display: 'flex',
    justifyContent: 'center',
  }}>
    <Button variant="outlined">Stop</Button>
  </div>
</div>
```

`Stop` during a running operation is `variant="outlined"`, still centered, still the only action on screen. Two filled primaries at once is always wrong.

### No primary at all

Pure status or viewer side panels (an ad-blocker summary, a session restorer, a read-only history viewer) do not have a primary. Do not invent one. Omit the footer entirely — the same way the [status-only popup](./extension-popup.md#status-only-popup) does.

## Common mistakes

- **`size="sm"` on the primary.** Size-sm signals "secondary" in the Chromium scale. The panel's single primary is full-size.
- **Right-aligning out of habit.** The footer visually mirrors the options-page footer. A side panel is not an options page.
- **Two centered primaries stacked vertically.** One of them is not primary. Promote or drop.
- **Primary inside a row's `end` slot.** `end` is for compact trailing affordances — toggles, chevrons, badges, tiny icon buttons. The surface's primary CTA does not live there.
- **Colored footer background.** The footer uses the panel's own background with a 1px top border. No tint, no card.
- **Oversized label.** Keep the verb 1–3 words. If the label is a sentence, the action is probably two actions.
- **Stacked [Cancel] [Primary] below the centered primary.** If you genuinely need a Cancel (destructive confirm), open a `Dialog` — do not grow a second footer row.

## Relation to the rest of the styleguide

| Rule | Still applies on a side panel? |
|---|---|
| [Principle 4](../principles.md) (pair, right-aligned) | Only inside dialogs the side panel *opens*. The side panel's own main primary follows this pattern instead. |
| [Anti-pattern #9](../anti-patterns.md#9-centered-content-in-a-narrow-popup) (no centered content) | Yes, for rows. The footer is the exception the rule already permits. |
| [Anti-pattern #11](../anti-patterns.md#11-primary-color-on-secondary-actions) (one primary per view) | Yes — this pattern is its strict form. |
| [Checklist Step 6](../checklist.md) (pair, right-aligned) | Applies to dialogs and forms. Not to a side panel's own main primary. |

---

If you remember one thing: on an extension side panel, **the user's first-press action should be the last thing their eye reaches, alone, centered.** Every other rule in this styleguide defers to Chromium convention; this one defers to the extension's aha moment.
