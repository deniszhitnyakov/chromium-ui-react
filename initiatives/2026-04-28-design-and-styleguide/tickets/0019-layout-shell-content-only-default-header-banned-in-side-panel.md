---
title: "Ticket 0019 — Layout shell is content-only by default; header / footer are opt-in; header is forbidden in side-panel extensions"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0019 — Layout shell is content-only by default; header / footer are opt-in; header is forbidden in side-panel extensions

## Status

**open**

## Summary

The opening of [`docs/docs/styleguide/layout.md`](docs/docs/styleguide/layout.md) currently reads "every Chromium surface is built from the same three-part shell: toolbar, content, footer actions". The rule is too strong on two counts: (1) only the content region is genuinely required — both the header and the pinned footer are opt-in based on what the surface needs; (2) for a Chrome extension that lives in the **side-panel** surface, the host browser already paints a system header (with the extension's icon and name) above the panel's iframe, so a library-side `Header` inside the extension produces a visually duplicate strip. Tighten the rule to "content is mandatory; header / footer are opt-in; in side-panel extensions, the in-panel header is forbidden". Add a matching anti-pattern.

## Context

Source of the report: operator review of the layout.md page. Two related observations were folded into one rule statement here.

Current state of the rule being loosened:

- [`docs/docs/styleguide/layout.md:5`](docs/docs/styleguide/layout.md#L5) — page description: "The shell every Chromium WebUI page shares — toolbar, scrollable content, optional footer, with the measurements and proportions to match." (Already says "optional footer" — half right; header is still framed as mandatory.)
- [`docs/docs/styleguide/layout.md:17-22`](docs/docs/styleguide/layout.md#L17) — the table-of-the-shell prose. To re-read on implementation; the operator's report names the opening paragraph but the same framing likely repeats here.
- [`docs/docs/styleguide/checklist.md:28-46`](docs/docs/styleguide/checklist.md#L28) — Step 2 ("Shell") asserts the same three-part shell with a diagram and "Use `<Toolbar title="..." />` at the top. Never replace it with a custom `<h1>` in a header div." That sentence becomes an over-generalisation once header is optional / forbidden depending on surface.
- [`docs/docs/styleguide/principles.md`](docs/docs/styleguide/principles.md) — likely echoes the three-part framing somewhere; implementation-time read.

Why the side-panel-specific ban exists:

When a user pins a Chrome extension to the side panel slot, Chrome wraps the extension's iframe in its own chrome: a 32–40px strip across the top with the extension's icon, the extension's display name, and the standard close / settings icons. That system strip is *outside* the extension's HTML root — the extension cannot remove it, restyle it, or extend it. If the extension then renders a library-side `<Header title="My extension" />` immediately under that system strip, the user sees two visually similar horizontal bars stacked: the host header (with the icon) and the in-panel header (with the same name, repeated). It looks like a layout bug. It *is* a layout bug.

For comparison: Chrome's *built-in* side panels (Reading List, Bookmarks, Side Search) do render their own header strip — but those panels run at chrome:// URLs, not as iframed extensions, so they replace the system header rather than stack on top of it. The library cannot make this distinction at runtime; it has to be a styleguide rule that the agent assembling the extension knows to follow.

Adjacent surfaces and their shell rules (after this ticket lands):

- **Browser extension popup** (toolbar icon → 360–420px popup): header optional (a one-line title is fine; many popups skip it); footer optional (only present if there is a single primary action).
- **Browser extension side panel** (~360–400px wide, full tab height): **header forbidden** (system supplies it); footer optional; content mandatory. `PanelHeader` for drill-in subviews remains allowed — it is structurally below the surface root, not at the top.
- **Full-tab options page** (`chrome-extension://…/options.html` opened in a tab): header optional but recommended (matches `chrome://settings`); footer rare (settings save inline); content mandatory.
- **In-page injected UI** (overlay / banner inside a host page): header rarely makes sense; footer rare; content mandatory.

Ticket #0018 (rename Toolbar → Header) lands the corresponding noun cleanup. This ticket is the prose / rule cleanup. Both should land together for the styleguide to read consistently.

## What hurts and why

Three problems:

1. **The current "three-part shell" rule overfits.** A surface that is genuinely content-only (a plain log viewer, a popup with a single list, an in-page overlay) is forced by the rule to either (a) invent a header it does not need, (b) skip the header and quietly violate the rule. (a) bloats the surface; (b) erodes trust in the styleguide. Both are agent failure modes — the agent reads "every surface has a toolbar" and confidently renders a redundant one.
2. **The side-panel duplication is invisible until it ships.** An author building a side-panel extension reads the side-panel pattern, follows it (which today recommends the panel-with-header shape), and only sees the duplication at runtime when they pin the extension. The styleguide has the information to prevent this — but only *after* it states the rule. Today it does not.
3. **The styleguide already half-knows the rule.** `layout.md:5` says "optional footer". `patterns/side-panel.md` describes a 48px header *inside* the panel because the panel was modelled on Chrome's built-in Reading List (which is *not* an iframed extension). The pieces are there; they need to be assembled into one explicit rule.

The deeper meta-problem is the standard shape of this initiative: rules that are implied by a few examples but not stated explicitly become miscellaneous, and the agent picks whichever example happens to be the loudest. Stating the rule, adding the anti-pattern, and updating the affected examples is the closing move.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Tighten the rule, sweep the prose, add one anti-pattern.** Rewrite `layout.md:5` and the surrounding paragraphs so "content is mandatory; header and footer are opt-in based on the surface". Update `checklist.md` Step 2 with the same framing plus a per-surface table (popup / side panel / options page / in-page overlay → which parts are recommended / required / forbidden). Add a new anti-pattern entry to `anti-patterns.md` ("In-panel header in a side-panel extension") with wrong / right live previews — wrong shows the duplicated-header stack, right shows the panel without an in-panel header. Update `patterns/side-panel.md` so the canonical example does not include an in-panel header (this also touches the `Toolbar` → `Header` rename from #0018 and the card-per-section restructure from #0008). Pros: matches every other "make the rule explicit" pattern in this initiative. Cons: cross-cuts five styleguide pages; needs careful sequencing with #0008 and #0018.

2. **Rule change only; live examples updated separately.** Update `layout.md`, `checklist.md`, and add the anti-pattern, but leave the side-panel pattern's canonical example with its in-panel header until #0008 lands and rewrites it. Pros: smaller diff per ticket; less risk of merge-conflict if #0008 lands separately. Cons: the published styleguide briefly says "in-panel header is forbidden" while the canonical side-panel example still shows one — a window of inconsistency.

3. **Hard enforcement: introduce a `surface` prop on the layout primitive that refuses to render `<Header>` when `surface="side-panel"`.** Pros: API-level enforcement, the failure becomes impossible; matches the "close the API" precedent. Cons: requires a layout-shell primitive that does not exist yet (currently surfaces are hand-composed `<div>`s wrapping `<Header>` + content + footer); designing one is a separate piece of work; this would belong in its own dedicated ticket.

Working hypothesis (subject to revision when the work starts): direction 1, co-implemented with #0018 (rename) and #0008 (side-panel restructure) so the styleguide stays consistent across all three. Direction 3 is a compelling future extension — once a `<Surface surface="side-panel">` primitive exists, header forbidding becomes mechanical — but that is its own ticket and out of scope here.

## Acceptance hints

- The opening of `docs/docs/styleguide/layout.md` no longer asserts a mandatory three-part shell. It says "content is mandatory; header (per #0018) and footer-actions are opt-in based on the surface", with a per-surface recommendation table (popup / side panel / options page / in-page overlay).
- The same per-surface framing appears in `docs/docs/styleguide/checklist.md` Step 2.
- A new anti-pattern entry is added to `docs/docs/styleguide/anti-patterns.md` titled along the lines of "In-panel header in a side-panel extension". Wrong: a side-panel iframe with both a system header (drawn / mocked at the top) and a library `<Header>` directly underneath. Right: the same iframe with no in-panel header, just the system strip. The entry explicitly notes that the system strip already shows the extension's icon and name, so the in-panel header would only repeat them.
- `patterns/side-panel.md`'s canonical example loses its in-panel header (or replaces it with a comment showing where the system strip would sit). Coordinate with #0008 (card-per-section restructure) so both rewrites land at once.
- The boundary between `Header` (top-level page header — covered by #0018) and `PanelHeader` (drill-in subview header inside `PanelStack`) is stated explicitly in one sentence somewhere readable. `PanelHeader` for drill-ins inside a side-panel extension stays allowed — it is structurally below the surface root, not duplicating the system strip.
- `npm run build:docs` stays green.
- Release: docs-only ticket. Patch bump unless co-shipped with #0018 / #0008 in a minor.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0018 (rename Toolbar → Header) — co-implemented; the noun this ticket uses depends on it. Ticket #0008 (side panel: card-per-section) — same canonical example, co-implemented. Tickets #0006 (side-panel header border) — partially superseded: if the in-panel header is forbidden, the border-color discussion for the canonical example largely evaporates; the rule survives for popups and options pages.
- Related: ticket #0007 (drop SearchInput from side-panel pattern) — same pattern page, same review session.
- Related ADRs: _none yet_
- Reference: Chrome side-panel extension surface (the system header strip is part of `chrome://side-panel`'s host UI and is documented in the [Side Panel API](https://developer.chrome.com/docs/extensions/reference/api/sidePanel) / extension developer docs).
- Docs in scope: `docs/docs/styleguide/layout.md`, `docs/docs/styleguide/checklist.md`, `docs/docs/styleguide/anti-patterns.md`, `docs/docs/styleguide/patterns/side-panel.md`, `docs/docs/styleguide/principles.md` (re-read for three-part-shell mentions).
