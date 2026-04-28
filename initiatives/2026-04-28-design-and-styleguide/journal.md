---
title: Journal — Design & Styleguide Refinement
status: living
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: journal
language: en
---

# Journal — Design & Styleguide Refinement

Living log of work on this initiative. Entries in reverse-chronological order (newest on top).

---

## 2026-04-28 · Session 1 — initiative setup, Badge outline-only

### What happened

The operator started building a Chrome extension on top of `chromium-ui-react` (a Google Maps scraper side panel) and used an AI agent to generate the first prototype. The prototype works structurally but reads as not-quite-Chromium in several places, mostly because the agent reached for visually heavier choices than the styleguide prefers.

The first concrete deviation was solid green / yellow `Badge` pills in a results list — exactly the "wall of color" that the styleguide's quiet-first guidance was meant to prevent. The styleguide already said "prefer outline + neutral", but the component default was still solid, so the agent took the path of least resistance to the louder visual.

Decision: instead of restating the rule more loudly, **remove the option**. Solid Badge appearance was deleted from the component (`appearance` prop and `BadgeAppearance` type both gone). Every Badge now renders as outline. The styleguide and pre-flight checklist were rewritten to match. Shipped as commit `77bafca` ("feat!: drop solid Badge appearance, outline-only by design").

The session also exposed a meta-problem worth solving structurally: prototype-driven critique was producing useful library improvements, but each fix was disappearing into commit history with no place to capture the *thread* of related observations. The operator pulled in the [Initiative-Driven Documenting](https://github.com/ztnkv/initiative-driven-docs-framework) framework as the home for that thread, and this initiative is the first instance.

### Key decisions

- The framework lives at `initiatives/`, not `docs/`, because `docs/` is already the Docusaurus workspace. Rationale captured in [`initiatives/README.md`](../README.md). No ADR — the trade-off is documentary, not architectural.
- "Tickets" in this initiative are **kanban cards**, not ADRs. ADRs are reserved for load-bearing trade-offs that survive past the fix.
- For Badge specifically: removing the option beats restating the rule. This is a working principle for the rest of the initiative — when a styleguide rule is being violated and the component still allows the violation, the first instinct is to close the API, not to add prose.

### What's open

The operator has more deviations from the prototype to surface. Each becomes a kanban card under "To Do" before any implementation. The Google Maps scraper side panel screenshot is the seed image for this round of critique.

### What's next

Operator surfaces the next problem from the prototype; agent packs it as a kanban card.

---
