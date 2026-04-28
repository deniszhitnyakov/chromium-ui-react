---
id: styleguide-content
title: Content & labels
slug: /styleguide/content
description: Rules for the words on buttons, headings, and rows. Chromium-native UI is built from short verbs; long labels are a webapp/SaaS fingerprint.
format: mdx
---

# Content & labels

Chromium reads short. Every visible button across `chrome://settings`, `chrome://bookmarks`, `chrome://downloads`, `chrome://extensions`, and the in-browser side panels is one or two words. The longer the label, the further the surface drifts from native feel — multi-word buttons are the single most visible "this is a webapp" tell.

This page covers the words. Layout, geometry, and colour are elsewhere.

## Button labels

**Rule.** Aim for one word. Two is acceptable when the verb genuinely needs a noun ("Save changes", "Add account", "Restore defaults"). Three or more is wrong.

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button>Cancel</Button>
    <Button variant="action">Save</Button>
  </div>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button>Cancel</Button>
    <Button variant="action">Add</Button>
  </div>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button variant="destructive">Remove</Button>
  </div>
</div>
```

The verb is the work of the button. Nouns belong on the surface around it — in the dialog title, the panel header, the row's primary text. A footer's primary action does not have to re-state what it acts on; the surface already says that.

### Why short

1. **The verb scans first.** Users land on a footer and see only the leftmost word of the primary. "Start" communicates faster than "Start new scrape" — the rest is noise once the action is clear.
2. **Short labels stay content-sized.** A three-word label like "Start new scrape" is too wide for a content-sized button on a 360px panel without crowding adjacent controls. The instinct is then to stretch the button (see [anti-pattern #19](./anti-patterns.md#19-full-width-primary-action-in-a-narrow-footer)) — which compounds the deviation.
3. **Long labels feel like a webapp.** Verbose CTAs are a SaaS / marketing convention ("Get started for free", "Generate insights now"). Even a single one of those in a footer drags the whole surface out of Chromium's idiom.

### Canonical Chromium verbs

Pick from this list before inventing prose. It is not exhaustive — but if your verb is not in it, check whether one of these covers the same intent first.

| Save and apply | Add and create | Remove and clear |
|---|---|---|
| Save · Apply · Continue · Done · OK | Add · Create · New · Import | Remove · Delete · Clear · Reset |

| Open and view | Edit and modify | Sync and refresh |
|---|---|---|
| Open · View · Show · Expand | Edit · Rename · Change · Update | Sync · Refresh · Reload · Restore |

| Confirm and proceed | Cancel and dismiss | Specialised |
|---|---|---|
| Confirm · Allow · Accept · Install | Cancel · Discard · Ignore · Close | Pin · Unpin · Hide · Block · Trust · Sign in · Sign out |

Two-word combinations that occur in native Chromium and are safe to use:

- `Save changes` (when "Save" is ambiguous about scope)
- `Add account`, `Add device`, `Add extension`
- `Restore defaults`, `Reset settings`
- `Show more`, `Show all`
- `Sign in`, `Sign out`
- `Try again`

Anything longer than two words on a button is the wrong shape — split the surface, move the noun into the title or row text, or pick a tighter verb.

## Section headings

**Rule.** Sentence case. No ALL CAPS. No bold display sizes. The settings-page section heading is `<h2>` at 14px, weight 400 — see [Typography](./typography.md).

ALL CAPS section labels (the 11px letter-spaced "APPEARANCE" / "PRIVACY" pattern from older Material designs) are **not** Chromium-native and are explicitly removed from this library's recipes.

## Row primary text

**Rule.** Sentence case, full sentences are fine, no terminal punctuation unless the line is genuinely a sentence ending in a period.

```
Show home button
Block third-party cookies
Continue running background apps when Chrome is closed
```

The third one is long because the *setting itself* is long; that is fine. What is not fine is padding short settings out into long sentences for "clarity" — `Block third-party cookies` does not become friendlier as `Always block third-party cookies from accessing your data`.

## Row secondary text

**Rule.** One sentence. Summarise the current value or describe the behaviour, never re-state the primary.

```
Primary: Theme
Secondary: System default
```

```
Primary: Block third-party cookies
Secondary: When sites can't read or write cookies from other sites
```

Two-line secondary is acceptable when the description genuinely needs it. Three lines means the row should be a drill-in; the description belongs on the subpage.

## Toast and inline message bodies

Short. One sentence. No "Oops! Something went wrong." tone — Chromium errors say what failed and (when actionable) what the user can do.

```
Couldn't sync. Check your connection.
Bookmark added.
Extension removed.
```

Avoid:

- Exclamation marks, except when reporting genuinely surprising state ("New version available!").
- Apologetic copy ("Sorry, …", "We're really sorry, but …").
- Marketing voice ("Awesome! Your changes are saved.").

## Capitalisation summary

| Element | Rule |
|---|---|
| Button label | Sentence case (`Save changes`, not `Save Changes`) |
| Section heading | Sentence case |
| Row primary | Sentence case |
| Row secondary | Sentence case |
| Dialog title | Sentence case |
| Toast | Sentence case |
| Header / Header title | Sentence case |
| Tab label | Sentence case (and short — one word preferred) |

There is no place in a Chromium-native UI for `Title Case` headings.
