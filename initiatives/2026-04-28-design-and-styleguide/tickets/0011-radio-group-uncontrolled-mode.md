---
title: "Ticket 0011 — RadioGroup uncontrolled mode is broken: defaultValue is accepted but never wired"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0011 — RadioGroup uncontrolled mode is broken: defaultValue is accepted but never wired

## Status

**open**

## Summary

`RadioGroup` accepts a `defaultValue` prop in its TypeScript signature, and a reader of the type (or of the docs example using `<RadioGroup defaultValue="...">`) reasonably expects uncontrolled behaviour: render with that value selected, update internal state on click, no `value` / `onChange` plumbing required. The implementation does not deliver this. `defaultValue` is destructured but never used, no internal `useState` exists, and the context provider only forwards `value`. Result: in an uncontrolled `<RadioGroup>`, every `<Radio>` computes `checked` as `group.value === value`, where `group.value` is `undefined`, so every radio is permanently unchecked and clicking does nothing visible. Live previews on the Radio docs page demonstrate the bug to the user. Wire uncontrolled state correctly.

## Context

Source of the report: the operator opened the Radio / RadioGroup component docs page and noticed that clicking the radio buttons in the live preview does not toggle them. Confirmed by reading the source — the bug is real and structural, not browser-specific.

Library state:

- [`packages/chromium-ui-react/src/components/Radio/Radio.tsx:14-21`](packages/chromium-ui-react/src/components/Radio/Radio.tsx#L14) — `RadioGroupProps` declares `value`, `defaultValue`, and `onChange`. The signature suggests a standard React controlled-or-uncontrolled pattern (mirrors `<input>`, `<Tabs>`, etc.).
- [`packages/chromium-ui-react/src/components/Radio/Radio.tsx:23-32`](packages/chromium-ui-react/src/components/Radio/Radio.tsx#L23) — the function destructures `name, value, onChange, orientation, disabled` but **omits `defaultValue`**. It is silently dropped.
- [`packages/chromium-ui-react/src/components/Radio/Radio.tsx:35`](packages/chromium-ui-react/src/components/Radio/Radio.tsx#L35) — context provider receives `{ name: name ?? autoName, value, onChange, disabled }`. Whatever the consumer passed as `defaultValue` does not enter the context; whatever the consumer expected as internal state never exists, because there is no `useState` in the component.
- [`packages/chromium-ui-react/src/components/Radio/Radio.tsx:58`](packages/chromium-ui-react/src/components/Radio/Radio.tsx#L58) — each child `<Radio>` computes `resolvedChecked = group ? group.value === value : checked`. With `group.value === undefined`, every comparison resolves to `false`. The radio inputs render unchecked.
- [`packages/chromium-ui-react/src/components/Radio/Radio.tsx:71-74`](packages/chromium-ui-react/src/components/Radio/Radio.tsx#L71) — onChange handler calls `group?.onChange?.(value)`, which is also undefined in uncontrolled use. Clicking the input fires the native `change` event, but nothing in the React tree picks it up — `value` stays unwritten.

For comparison, `Tabs` handles the same pattern correctly:

- [`packages/chromium-ui-react/src/components/Tabs/Tabs.tsx:28-35`](packages/chromium-ui-react/src/components/Tabs/Tabs.tsx#L28) — destructures `value`, `defaultValue`, `onValueChange`; tracks `useState<string>(defaultValue ?? '')`; resolves `value ?? internal`; calls both `setInternal` (when uncontrolled) and `onValueChange?.(v)`.

That is the pattern `RadioGroup` should follow.

Docs in scope (all break the same way): the Radio component page, plus any styleguide example that uses `<RadioGroup defaultValue="...">` without a controlled `value`. Implementation should grep `RadioGroup` across `docs/docs/` to enumerate all live previews to verify post-fix.

## What hurts and why

Three problems:

1. **The published live preview does not work.** A user landing on the Radio component page from the deployed docs site clicks a radio and sees nothing happen. That single experience undermines trust in the entire library.
2. **The TypeScript signature lies.** `defaultValue?: string | number` in `RadioGroupProps` advertises an API that does not exist. Any consumer reading the type and using `<RadioGroup defaultValue="...">` ships a non-functional radio group to production. There is no error, no warning — silent breakage.
3. **The pattern is solved already inside the library.** `Tabs` does this correctly. Copying that pattern across to `RadioGroup` is a small mechanical change. The bug is not a missing-design-decision, it is simply unfinished implementation.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Mirror the Tabs pattern.** Add `defaultValue` to the destructure; introduce `const [internal, setInternal] = useState<string | number | undefined>(defaultValue)`; resolve `const resolvedValue = value ?? internal`; in the context-provider's `onChange`, call `setInternal(v)` if `value === undefined`, then call the consumer-supplied `onChange?.(v)`. Pros: smallest diff; matches the existing convention in the library; type signature now matches behaviour. Cons: none material.

2. **Remove `defaultValue` from the type, document RadioGroup as controlled-only.** If the controlled-only model was intentional (which the current code suggests but the type signature contradicts), make it explicit: drop `defaultValue` from `RadioGroupProps`, add a sentence to the docs page, update examples to use a `useState` wrapper. Pros: simpler component. Cons: makes every consumer write boilerplate for what is currently a one-line uncontrolled use; inconsistent with `Tabs` and with React's standard form-element convention.

3. **Make `Radio` standalone-functional too.** If the consumer uses `<Radio>` outside a `RadioGroup`, the current `resolvedChecked = group ? ... : checked` branch sort-of works (the standalone case falls back to `checked` from props). But the `name` resolution depends on `group?.name` and the `onChange` handler relies on `group?.onChange`. Tighten the standalone path so that a bare `<Radio name="..." value="..." defaultChecked />` works without a group. Pros: more flexible. Cons: probably out of scope for the bug — fix uncontrolled-group first, the standalone case can ride a separate ticket if it surfaces.

Working hypothesis (subject to revision when the work starts): direction 1 — copy the Tabs pattern verbatim. The fix is ~6 lines.

## Acceptance hints

- `RadioGroup` with `<RadioGroup defaultValue="x">` renders the matching radio as initially selected, and clicking another radio updates the selection visually and fires `onChange` (if provided).
- `RadioGroup` with `<RadioGroup value="x" onChange={...}>` (controlled) keeps working exactly as before.
- The Radio component live preview on the deployed docs site responds to clicks.
- A short test (manual or scripted via `preview_eval`) confirms that clicking a `<Radio>` inside an uncontrolled `<RadioGroup>` updates `checked` on the input and fires the provided `onChange` with the right value.
- No regressions in any styleguide example that uses `<RadioGroup>`.
- `npm run build:lib && npm run build:docs` stays green.
- Release: patch version bump (this is a bug fix, no API surface change).

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Reference correct implementation: `packages/chromium-ui-react/src/components/Tabs/Tabs.tsx:28-35`.
- Related ADRs: _none yet_
- Library files in scope: `packages/chromium-ui-react/src/components/Radio/Radio.tsx`.
- Docs to verify post-fix: `docs/docs/components/radio.md` (or wherever the Radio live preview lives), plus any styleguide example using `<RadioGroup>`.
