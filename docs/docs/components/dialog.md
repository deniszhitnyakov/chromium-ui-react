---
id: dialog
title: Dialog
slug: /components/dialog
description: Modal dialog rendered in a React portal. Backdrop click and Escape key both close it by default.
format: mdx
---

# Dialog

## Live preview

```tsx live noInline
function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete bookmark</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this bookmark?"
        actions={
          <>
            <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        This action cannot be undone.
      </Dialog>
    </>
  );
}
render(<DialogDemo />);
```

A modal dialog for confirmations, forms, and anything that needs to interrupt the user. Rendered through `createPortal` into `document.body`, so it escapes parent overflow and z-index traps.

## Import

```tsx
import { Dialog } from 'chromium-ui-react';
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | **required** | Controls visibility |
| `onClose` | `() => void` | — | Called on backdrop click, Escape key, or programmatic dismiss |
| `title` | `ReactNode` | — | Rendered as the dialog heading |
| `actions` | `ReactNode` | — | Footer action row (buttons) |
| `closeOnBackdrop` | `boolean` | `true` | Whether clicking outside closes the dialog |
| `closeOnEscape` | `boolean` | `true` | Whether pressing Escape closes the dialog |

Children render between title and actions as the body. All other `<div>` attributes are forwarded to the dialog element.

## Basic confirmation

```tsx
const [open, setOpen] = useState(false);

<>
  <Button variant="destructive" onClick={() => setOpen(true)}>Delete</Button>
  <Dialog
    open={open}
    onClose={() => setOpen(false)}
    title="Delete this bookmark?"
    actions={
      <>
        <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
      </>
    }
  >
    This action cannot be undone.
  </Dialog>
</>
```

## Form inside a dialog

```tsx
<Dialog
  open={open}
  onClose={close}
  title="Add bookmark"
  actions={
    <>
      <Button onClick={close}>Cancel</Button>
      <Button variant="action" onClick={handleSave}>Save</Button>
    </>
  }
>
  <Input label="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
  <Input label="URL" type="url" value={url} onChange={(e) => setUrl(e.currentTarget.value)} />
</Dialog>
```

## Preventing accidental close

For destructive flows (unsaved changes, in-progress upload), disable the dismiss shortcuts:

```tsx
<Dialog
  open={open}
  onClose={handleExplicitClose}
  closeOnBackdrop={false}
  closeOnEscape={false}
  title="Uploading..."
>
  <Progress value={progress} />
</Dialog>
```

## Unmounting

The Dialog returns `null` when `open={false}`, so the portal unmounts completely — you don't need to conditionally render around it.

## SSR

The component checks `typeof document === 'undefined'` and returns `null` on the server, so it's safe with Next.js / Remix / Astro.

## Accessibility

- Rendered with `role="dialog"` and `aria-modal="true"`.
- When `title` is provided, the dialog is labeled via `aria-labelledby`.
- Focus moves to the dialog on open. **Focus trapping is not built in** — if you need it, wrap the Dialog in a focus trap (e.g., `focus-trap-react`).
- On close, return focus to the triggering element yourself. The component doesn't track it.

## Common pitfalls

- Don't put a Dialog inside a list you're iterating over — one per page is enough. Use `open` + an id to pick which one to show.
- Don't forget `onClose` — without it, the Escape key and backdrop clicks become no-ops.
