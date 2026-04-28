---
id: styleguide-dialogs
title: Dialogs
slug: /styleguide/dialogs
description: Dialog sizing, button order, destructive confirmations, and when to use a Toast or a subpage instead.
format: mdx
---

# Dialogs

Chromium dialogs are narrow, quiet, and consistent: title at the top, a short body, an action row with `[Cancel] [Primary]` right-aligned. Treat any deviation from that as a bug.

## Canonical confirmation

```tsx live noInline
function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Remove bookmark</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Remove this bookmark?"
        actions={
          <>
            <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Remove</Button>
          </>
        }
      >
        This will permanently remove "Docs — chromium-ui-react" from this device.
      </Dialog>
    </>
  );
}
render(<ConfirmDemo />);
```

Breakdown:

- **Width:** Chromium's `cr-dialog` default is **512px** (`--cr-dialog-width`). This is wider than most design systems' confirmation dialog — stretch to it and your UI will read as native. Narrower dialogs (320–480px) are acceptable for very short confirmations. Never full-bleed.
- **Title:** **15px** in Chromium source (`calc(15/13 * 100%)` at body-13 base), rendered weight 500 in practice. Phrase as a question if the dialog is a confirmation ("Remove this bookmark?"), as a statement if it is a form ("Add bookmark"), or as a status if it is progress ("Uploading…").
- **Title padding:** `20px 20px 16px 20px` in the source.
- **Body padding-x:** `20px`. Body text color is `--cr-secondary-text-color`, not primary.
- **Body:** 13px regular, one to three lines. If you need more, you need a subpage.
- **Actions:** right-aligned, 8px apart. Order is **always** `[Cancel] [Primary]`.
- **Primary variant:**
  - `variant="action"` for non-destructive confirmations ("Save", "OK", "Continue").
  - `variant="destructive"` for destructive confirmations ("Remove", "Delete", "Clear all").
- **Secondary (Cancel) variant:** follows the primary — `outlined` next to an `action` primary, `text` next to a `destructive` primary. See [Action-row pair](#action-row-pair) below.
- **Dismissal:** Esc and backdrop click close. `<Dialog>` does both by default.

## Width guidelines

| Dialog kind | Width | Note |
|---|---|---|
| Confirmation (yes/no) | 320–512px | 512 is Chromium's default; shrink only for single-line confirmations |
| Short form (1–3 fields) | **512px** | Chromium default — matches every `cr-dialog` not otherwise overridden |
| Long form (4+ fields) | 512–640px | |
| Editor (image crop, color picker) | 640–720px, max | |
| Anything larger | Not a dialog. Use a subpage or tab. | |

Give the dialog body an explicit width. `<Dialog>` does not force one — the content decides.

## Button order (the most common bug)

**Cancel on the left, Primary on the right.** Not the other way around.

The reasoning: the eye reads left-to-right; the primary action is the destination; keyboard focus moves forward to reach it. Chromium has been consistent on this for a decade, across every OS, regardless of the platform's native dialog convention (e.g., GNOME's OK-on-right matches; older Windows Explorer's OK-on-left does not).

If your design system came from elsewhere and has "Primary on the left," you need to flip it when you adopt this library.

### Wrong

```tsx live
<Card variant="outlined" style={{ maxWidth: 420, padding: 16 }}>
  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Wrong order</div>
  <div style={{ fontSize: 13, color: 'var(--cr-fallback-color-on-surface-subtle)', marginBottom: 16 }}>Primary should not be on the left.</div>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button variant="action">Save</Button>
    <Button>Cancel</Button>
  </div>
</Card>
```

### Right

```tsx live
<Card variant="outlined" style={{ maxWidth: 420, padding: 16 }}>
  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Right order</div>
  <div style={{ fontSize: 13, color: 'var(--cr-fallback-color-on-surface-subtle)', marginBottom: 16 }}>Cancel on the left, primary on the right.</div>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button>Cancel</Button>
    <Button variant="action">Save</Button>
  </div>
</Card>
```

## Action-row pair

The secondary's variant in a `[Cancel] [Primary]` pair is not free — it follows the primary:

| Primary | Cancel | Visual rationale |
|---|---|---|
| `action` (filled blue pill) | `outlined` | Filled vs. outlined pill is already enough contrast — Cancel reads as the quieter affordance, primary wins. Matches Chromium native. |
| `destructive` (red text on outlined pill) | `text` | An outlined Cancel next to a destructive pill produces two competing pills (one red-text, one blue-text). Switching Cancel to `text` removes the second pill so the destructive verb owns the row. |

This is the one styleguide divergence from Chromium's actual confirmation dialogs (`chrome://settings/clearBrowserData`, `chrome://bookmarks` "Delete folder"), which use `outlined` Cancel even with destructive primaries. The library prefers the quieter Cancel because the operator's read is consistently that two pills compete for attention. The deviation is deliberate — the rule above is the one to follow.

```tsx live
<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
  <Card variant="outlined">
    <CardHeader>
      <CardTitle>Save changes?</CardTitle>
      <CardDescription>Your edits to this entry haven't been saved yet.</CardDescription>
    </CardHeader>
    <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <Button>Cancel</Button>
      <Button variant="action">Save</Button>
    </CardFooter>
  </Card>
  <Card variant="outlined">
    <CardHeader>
      <CardTitle>Remove bookmark?</CardTitle>
      <CardDescription>This will permanently remove "Docs — chromium-ui-react" from this device.</CardDescription>
    </CardHeader>
    <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <Button variant="text">Cancel</Button>
      <Button variant="destructive">Remove</Button>
    </CardFooter>
  </Card>
</div>
```

## Three actions

If you genuinely need three actions, they are almost always:

- Cancel (secondary)
- A destructive alternative
- A non-destructive primary

Example: "You have unsaved changes" → `[Cancel] [Discard] [Save]`.

In Chromium this is rare and uses **text** buttons for the two non-primary choices, with the primary `action`:

```tsx live
<Card variant="outlined" style={{ maxWidth: 420, padding: 16 }}>
  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Unsaved changes</div>
  <div style={{ fontSize: 13, color: 'var(--cr-fallback-color-on-surface-subtle)', marginBottom: 16 }}>
    Your changes haven't been saved. Save them before closing?
  </div>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
    <Button variant="text">Cancel</Button>
    <Button variant="text">Discard</Button>
    <Button variant="action">Save</Button>
  </div>
</Card>
```

Do not style all three as `outlined` or `action` — the emphasis levels should be visibly different.

## Destructive confirmations

The canonical Chromium destructive pattern:

- Title asks the question: "Remove this bookmark?"
- Body names the item or count: "This will permanently remove *"Docs"* from this device." or "This will remove 247 bookmarks. This action can't be undone."
- Cancel is `variant="text"` (see [Action-row pair](#action-row-pair) — non-destructive primaries pair with `outlined` Cancel; destructive primaries pair with `text` Cancel).
- The destructive action uses `variant="destructive"` — error-colour text on a outlined pill.
- The destructive verb is explicit: "Remove", "Delete", "Clear", "Sign out", never "OK" or "Yes."

Never use a destructive dialog for reversible actions (undo via toast is often better — see below).

## Toast vs dialog

Don't reach for a dialog when a toast works. Toasts are for **reversible** or **non-blocking** actions:

| Action | Dialog or toast? |
|---|---|
| Delete one bookmark | **Toast** with Undo action |
| Delete all history | **Dialog** (irreversible, high-stakes) |
| Save succeeded | **Toast** |
| Save failed | **Toast** (error variant) |
| Confirm signing out | **Dialog** |
| Confirm opening an external URL | **Dialog** |

Toasts do not block the surface. Dialogs block. Block only when the user *must* decide before continuing.

## Progress dialogs

For blocking operations:

- Use a dialog with `closeOnBackdrop={false}` and `closeOnEscape={false}`.
- Title states what is happening ("Uploading…", "Syncing bookmarks…").
- Body contains a `<Progress>` bar — `indeterminate` if duration is unknown.
- Single action button, `variant="text"`, labeled "Cancel" if cancellation is supported, omitted entirely if not.

```tsx live
<Card variant="outlined" style={{ maxWidth: 420, padding: 24 }}>
  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Syncing bookmarks…</div>
  <Progress value={64} />
  <div style={{ fontSize: 12, color: 'var(--cr-fallback-color-on-surface-subtle)', marginTop: 8 }}>
    64 of 100 items
  </div>
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
    <Button variant="text">Cancel</Button>
  </div>
</Card>
```

## Accessibility

`<Dialog>` emits `role="dialog"` + `aria-modal="true"` + `aria-labelledby` when `title` is set. You still need to:

- Move focus into the dialog on open. The library component handles this (root receives focus); if you want focus to land on a specific field, use a ref + `useEffect`.
- Return focus to the trigger on close. Track the trigger ref yourself — the library does not.
- Trap focus if necessary. `<Dialog>` does **not** ship focus trapping — add `focus-trap-react` for high-stakes flows (destructive confirmations, forms).

## Avoid

- **Primary on the left.** See above.
- **Three buttons all `variant="action"`.** One primary per dialog.
- **Full-viewport dialogs.** Max ~720px wide even for editors.
- **Closing the dialog asynchronously after "Save".** Close synchronously on click; show a toast with the result.
- **Stacked dialogs.** One at a time. If a confirmation leads to another confirmation, redesign the flow.
- **Emoji in the title.** "🗑️ Delete?" is not a Chromium title. Just "Delete?"
- **Skeletons inside the body while loading.** Use a progress bar; the dialog body is small enough that a short delay is fine.
- **Persistent ("X" dismiss) in addition to the action row.** Chromium dialogs are dismissed via the Cancel button, Esc, or backdrop — no corner "X" unless the dialog has no action row at all.

Keep dialogs narrow, keep the action row right-aligned with Cancel first, keep the primary verb explicit. Everything else is decoration.
