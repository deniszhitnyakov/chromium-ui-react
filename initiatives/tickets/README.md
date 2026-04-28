---
title: Tickets — global ticket registry
status: living
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: readme
language: en
---

# Tickets

Long-form descriptions of every ticket the project has packed. One file per ticket. Numbering is **global** — sequential across all initiatives, not reset per initiative. The file is the source of truth for what a ticket is about; the per-initiative `kanban.md` is a thin board view that links here.

## Why a global registry

Tickets often outlive the initiative that surfaced them — a problem packed during a design refinement may end up implemented during a later refactor or a separate accessibility pass. A global registry keeps the ticket addressable by a stable number (`#0042`) regardless of which initiative ends up owning the work, and makes cross-initiative references cheap to write.

The link back to the originating initiative lives in the ticket's front-matter (`initiative:`); the link forward to in-progress / done state lives in that initiative's `kanban.md`.

## Numbering

- Sequential, zero-padded to four digits: `0001`, `0002`, …, `0042`, …
- Assigned at packing time. Once assigned, the number never changes — even if the ticket is closed as `wontfix` or the file is deleted, the number is retired, not reused.
- Find the next number with: `ls initiatives/tickets/ | grep -E '^[0-9]{4}-' | sort | tail -1`.

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

- **`open`** — packed, waiting in some initiative's `kanban.md` To Do column.
- **`in-progress`** — moved to In Progress on a kanban; one card per initiative at a time.
- **`done`** — shipped. The ticket file's `status:` is bumped, and the `## Status` section gets a commit SHA.
- **`wontfix`** — explicitly declined. The file stays for the audit trail; reasoning goes in the ticket body.

When a ticket changes lifecycle state, both the ticket file (front-matter `status:` + `## Status` body section) and the kanban card column are updated **in the same commit** as the work itself.

## Template

Copy this into `initiatives/tickets/NNNN-<short-kebab-name>.md`:

````markdown
---
title: "Ticket NNNN — <short title>"
status: open
created: YYYY-MM-DD
updated: YYYY-MM-DD
authors: [Operator]
type: ticket
language: en
initiative: YYYY-MM-DD-<initiative-name>
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

- Initiative: [`../<initiative>/README.md`](../<initiative>/README.md)
- Kanban: [`../<initiative>/kanban.md`](../<initiative>/kanban.md)
- Related ADRs: _none yet_
- Reference surfaces: e.g. `chrome://settings/`, `chrome://flags/`
````

Sections marked _none yet_ stay as a stub if no information exists — the template is the same shape for every ticket so a reader knows where to look.

## Index

When the registry grows past ~20 tickets, add an index table here. Until then, `ls initiatives/tickets/` is enough.
