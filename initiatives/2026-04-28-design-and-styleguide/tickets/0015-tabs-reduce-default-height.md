---
title: "Ticket 0015 — Tabs: reduce default height — 48px is too tall for extension surfaces"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0015 — Tabs: reduce default height — 48px is too tall for extension surfaces

## Status

**open**

## Summary

The library's `<Tab>` is 48px tall by default, the same as a Material-style tab and only one notch shorter than the main Toolbar. For extension popups (480–600px tall) and side panels (~600px), losing 48px of vertical real estate to a tab strip — when the tab strip is itself an exception (the styleguide is rightly skeptical of using tabs at all in extension surfaces) — is wasteful. Tighten the default to a smaller height (32–36px range to be decided in the work turn) so that tabs, when used, cost the surface less.

## Context

Library state:

- [`packages/chromium-ui-react/src/components/Tabs/Tabs.css:15`](packages/chromium-ui-react/src/components/Tabs/Tabs.css#L15) — `.cr-tab` has `height: 48px`.
- [`packages/chromium-ui-react/src/components/Tabs/Tabs.css:25`](packages/chromium-ui-react/src/components/Tabs/Tabs.css#L25) — also has `text-transform: uppercase` (covered by ticket #0005, dropped there).

Styleguide state:

- [`docs/docs/styleguide/anti-patterns.md`](docs/docs/styleguide/anti-patterns.md) (#7 "Tabs for navigation between pages") — already says tabs are not for top-level app navigation; they are an in-view switch between related views.
- [`docs/docs/styleguide/checklist.md`](docs/docs/styleguide/checklist.md) (Step 7 — Navigation) — "Tabs are the last resort, not the first."
- The styleguide's overall position: tabs *exist* in the library because some surfaces genuinely need them, but they are not a default-pick primitive for extension UIs.

Native Chromium reference: Chromium's WebUI uses a small set of tab-shaped patterns. The browser-tab strip itself is 32px tall (tightly packed). Inside `chrome://settings`, tab-style sub-navigation (e.g. the "Profile" sub-tabs, the "Pages on startup" two-column view) is typically smaller than 48px. The 48px default in the library reflects a Material Design influence that is not Chromium-faithful.

For comparison: side-panel header is 48px, side-panel rows are 48–64px. A 48px tab strip on top of those reads as a second toolbar, especially in a popup.

## What hurts and why

Two problems:

1. **The default is too tall for the target surface.** A 48px tab strip on a 360px-wide side panel takes up ~7–10% of the visible viewport before any content appears. In a 360×520 popup, it is closer to 9%. For a primitive that the styleguide explicitly says to use sparingly, the default should err on the side of compact.
2. **The current size sets the wrong tone.** A 48px tab strip looks Material — the user notices the tab strip as a feature of the surface. A 32–36px tab strip looks Chromium — the tabs read as "a small switch between related views" rather than "a navigation bar". The visual register matches the styleguide's stated intent for the primitive.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Tighten to 32px (Chromium browser-tab height).** Smallest, most aligned with Chromium's own tab idiom. Pros: maximum vertical reclaim; matches the most authoritative Chromium reference (the browser tab strip itself). Cons: tighter than most Material guidance; touch targets become small (still meets the 32px minimum but only just).

2. **Tighten to 36px (compact-but-readable).** A middle ground between the current 48px and Chromium's 32px. Pros: more vertical room than today; touch targets still comfortable; visually compact. Cons: not a one-to-one match for any specific Chromium reference — feels like a designed-by-committee number.

3. **Tighten to 40px (one notch down from current).** Smallest behavioural change. Pros: unlikely to break any existing layout. Cons: still feels Material-ish; the gain is incremental.

Working hypothesis (subject to revision when the work starts): direction 2 (36px), because the styleguide treats tabs as a sparingly-used sub-view switch — that role wants compact-but-readable, not browser-tab-tight. Direction 1 (32px) is also defensible if the comparison reference matters more than the role.

## Acceptance hints

- `.cr-tab` height in `Tabs.css` is 32px, 36px, or whatever the work turn lands at — under 48px in all cases.
- Padding inside the tab is reviewed and tightened to match (currently `padding: 0 16px`); horizontal padding can stay 16px for readability if the height drop alone gives enough vertical room.
- The tab font size and line-height are reviewed for legibility at the new height (currently `font-size: --cr-font-size-sm`).
- The active-tab underline (`border-bottom: 2px solid` on `[aria-selected="true"]`) is preserved and verified visible at the new height.
- The Tabs live preview on the docs site looks balanced at the new height — not visually crammed, not visually heavy.
- All other live previews and patterns that include a `<TabList>` are visually inspected after the change for any spacing fallout.
- `npm run build:lib && npm run build:docs` stays green.
- Release: minor version bump (visual default change).

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0005 (drop ALL CAPS) — Tabs.css line 25 also has `text-transform: uppercase` and should be fixed in the same work turn or by #0005 first.
- Related styleguide: `docs/docs/styleguide/anti-patterns.md` #7, `docs/docs/styleguide/checklist.md` Step 7.
- Related ADRs: _none yet_
- Library files in scope: `packages/chromium-ui-react/src/components/Tabs/Tabs.css`.
- Docs in scope: `docs/docs/components/tabs.md` (re-render check), and any styleguide / pattern page that uses `<TabList>` (re-render check).
