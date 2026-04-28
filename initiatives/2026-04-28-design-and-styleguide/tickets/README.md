---
title: Tickets — per-initiative ticket registry
status: living
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: readme
language: en
---

# Tickets

Long-form descriptions of every ticket packed inside this initiative. One file per ticket. Numbering is **per-initiative** — sequential within this initiative's folder, reset to `0001` for each new initiative. The file is the source of truth for what a ticket is about; the sibling [`kanban.md`](../kanban.md) is a thin board view that links here.

## Why per-initiative

The framework principle is "everything about one topic stays together". Tickets are about the work this initiative is doing — they belong inside the initiative folder, not in a global registry that outlives any single piece of work. When this initiative closes, its `tickets/` folder closes with it, becoming a self-contained archive of the problems that were considered, the directions that were weighed, and the decisions that landed (or did not).

Cross-initiative references — when a problem really does outlive an initiative — happen the same way ADRs cross initiatives: link by relative path (`../../<other-initiative>/tickets/NNNN-...md`), and call out the link explicitly in both the source and target ticket's `## Links` section.

## Numbering

- Sequential, zero-padded to four digits: `0001`, `0002`, …
- **Per-initiative.** Each initiative starts fresh from `0001`. The number is unique within its initiative, not across the project.
- Assigned at packing time. Once assigned, the number never changes — even if the ticket is closed as `wontfix` or the file is deleted, the number is retired within this initiative, not reused.
- Find the next number with: `ls initiatives/<this-initiative>/tickets/ | grep -E '^[0-9]{4}-' | sort | tail -1`.

When citing a ticket from outside its initiative, prefix the initiative name to disambiguate: `2026-04-28-design-and-styleguide#0017`. Inside the initiative, `#0017` is enough.

## File naming

```
NNNN-<short-kebab-name>.md
```

The kebab-name should be short and recognisable in a directory listing. `0001-toggle-row-interactivity.md` is good; `0001-fix-the-thing.md` is not.

## Lifecycle

```
open → in-progress → done
        ↘ wontfix
```

- **`open`** — packed, waiting in the initiative's `kanban.md` To Do column.
- **`in-progress`** — moved to In Progress on the kanban; one card in flight at a time per initiative.
- **`done`** — shipped. The ticket file's `status:` is bumped, and the `## Status` section gets a commit SHA.
- **`wontfix`** — explicitly declined. The file stays for the audit trail; reasoning goes in the ticket body.

When a ticket changes lifecycle state, both the ticket file (front-matter `status:` + `## Status` body section) and the kanban card column are updated **in the same commit** as the work itself.

## Template

Copy this into `initiatives/<this-initiative>/tickets/NNNN-<short-kebab-name>.md`:

````markdown
---
title: "Ticket NNNN — <short title>"
status: open
created: YYYY-MM-DD
updated: YYYY-MM-DD
authors: [Operator]
type: ticket
language: en
---

# Ticket NNNN — <short title>

## Status

**open**

(When this changes, replace with: `**in-progress**` · `**done** (commit `<sha>`)` · `**wontfix** — <reason>`.)

## Summary

One or two sentences. The headline a reviewer sees first.

## Context

What the situation looks like in the codebase right now. Cite files and line numbers (`packages/.../Foo.tsx:42`). If the trigger was a prototype screenshot or external surface (a `chrome://` page, a vendor extension), name it.

## What hurts and why

The user-visible or contributor-visible problem. Why the current state is bad — friction, footgun, accessibility gap, agent-collected misuse. One paragraph is usually enough.

## Direction (not a decision)

Possible implementation directions and trade-offs. Decision is **deferred** to the work turn. Listing options here lets the operator and agent skip the rediscovery on pick-up; it does not commit to any of them.

## Acceptance hints

Loose bullet list of what would make this ticket "done". Not a strict spec — the working agreement is that the implementing agent uses judgement, with the operator as the final reviewer.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related ADRs: _none yet_
- Reference surfaces: e.g. `chrome://settings/`, `chrome://flags/`
````

Note: the front-matter previously carried an `initiative:` field. With the per-initiative folder structure, that field is redundant — the initiative is whichever folder contains this ticket. Existing tickets created before this reorganisation may still carry the field; new tickets should omit it.

Sections marked _none yet_ stay as a stub if no information exists — the template is the same shape for every ticket so a reader knows where to look.

## Index

When this initiative's ticket registry grows past ~20 tickets, add an index table here. Until then, `ls .` (or your editor's file tree) is enough.
