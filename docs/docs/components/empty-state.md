---
id: empty-state
title: EmptyState
slug: /components/empty-state
description: Illustrated placeholder for empty collections, zero-result searches, and first-run surfaces.
format: mdx
---

# EmptyState

## Live preview

```tsx live
<EmptyState
  icon={<div style={{ fontSize: 48 }}>📚</div>}
  title="No bookmarks yet"
  description="Bookmark your favorite pages to find them again quickly."
  action={<Button variant="action">Import from browser</Button>}
/>
```

The placeholder shown when a list, table, or view has no content to display. Has four slots: icon (or illustration), title, description, and a primary action. Drop it into a side panel, dialog, or card body whenever you'd otherwise show a blank area.

## Import

```tsx
import { EmptyState } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Large illustrative icon or SVG (48–64 px recommended) |
| `title` | `ReactNode` | — | Heading (rendered as `<h3>`) |
| `description` | `ReactNode` | — | Helper paragraph below the title |
| `action` | `ReactNode` | — | Call-to-action at the bottom (usually a Button) |

Children render between description and action — use this for custom inline content. All other `<div>` attributes are forwarded. Ref goes to the root.

## No items yet

```tsx
<EmptyState
  icon={<BookmarkIcon style={{ width: 48, height: 48 }} />}
  title="No bookmarks yet"
  description="Bookmark your favorite pages to find them again quickly."
  action={<Button variant="action">Import from browser</Button>}
/>
```

## No search results

```tsx
<EmptyState
  icon={<SearchIcon style={{ width: 48, height: 48 }} />}
  title={`No results for "${query}"`}
  description="Try a different keyword or check your spelling."
  action={<Button variant="text" onClick={resetSearch}>Clear search</Button>}
/>
```

## First-run welcome

```tsx
<EmptyState
  icon={<WelcomeIllustration />}
  title="Welcome to Chromium UI"
  description="Let's set up your first project to get started."
  action={
    <>
      <Button>Skip tour</Button>
      <Button variant="action">Get started</Button>
    </>
  }
/>
```

## Error state

Reuse EmptyState for soft errors that don't warrant a full error page:

```tsx
<EmptyState
  icon={<AlertIcon style={{ width: 48, height: 48, color: 'var(--cr-fallback-color-error)' }} />}
  title="Couldn't load bookmarks"
  description="Check your internet connection and try again."
  action={<Button onClick={retry}>Retry</Button>}
/>
```

## Accessibility

- `title` renders as `<h3>`. Check your heading hierarchy — if the page already has an `<h2>` directly above, this is correct; if it's the *only* heading in the view, upgrade via children.
- The component doesn't set `role="status"` or announce itself — if the empty state appears after an async action (e.g. search completed with no hits), announce it yourself via an `aria-live` region elsewhere.
