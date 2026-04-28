---
title: "Ticket 0032 — Cleanup: re-render the Introduction preview images after the initiative's visual changes land"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0032 — Cleanup: re-render the Introduction preview images after the initiative's visual changes land

## Status

**open**

## Summary

The library's Introduction page ([`docs/docs/intro.md`](docs/docs/intro.md)) embeds two showcase screenshots — `showcase-light.v2.png` and `showcase-dark.v2.png` ([lines 24, 32](docs/docs/intro.md#L24)) — that are the first visual the reader sees on the deployed docs site. After this initiative lands its visual changes (Badge outline-only, Card elevated default, Tabs shorter, Select / Input geometry tightened, sidebar Menu flat, ALL CAPS section labels gone, side-panel composition restructured, etc.), the existing showcase images will no longer match the library they purport to showcase. Re-render them.

## Context

Source of the report: operator named this explicitly as one of four required cleanup tickets at the close of the styleguide review.

Current state:

- [`docs/static/img/showcase-light.v2.png`](docs/static/img/showcase-light.v2.png) — light-mode showcase image embedded on the Introduction.
- [`docs/static/img/showcase-dark.v2.png`](docs/static/img/showcase-dark.v2.png) — dark-mode showcase image.
- The `.v2.png` filename suffix suggests this is already a versioned re-render — the previous `.v1.png` (or unversioned) was presumably retired when the library evolved enough to need a fresh image. This is the *third* version (`.v3.png`) that this ticket would produce.

How the current images were produced (verify on implementation): there is likely a "showcase" launch entry in `.claude/launch.json` (`port: 4321`) that serves a `docs/static/showcase` directory — the same setup that displays a curated library tour. The screenshots were probably taken from that surface.

What changed visually in this initiative that affects the showcase:

- Badge — already outline-only, will get neutral default (#0013).
- Card — will become elevated by default (#0014).
- Toolbar → Header rename (#0018) — naming change, possibly also visual if the Header docs example re-renders.
- Sidebar Menu — flat, no card / shadow (#0023).
- Tabs height tightened (#0015), uppercase removed (#0005).
- Select / Input geometry tightened (#0020 / #0021).
- ALL CAPS section labels gone (#0005).
- Side-panel composition restructured to card-per-section (#0008).
- Settings entry pattern in upper half (#0026).
- Plus footer / header border colour normalisation (#0002 / #0006), Toolbar layout for SearchInput (#0024), running-state Stop colour (#0025), …

In short: most of the visual surface area the showcase image displays.

## What hurts and why

Two problems if this is skipped:

1. **The first impression on the docs site lies.** A reader landing on the Introduction sees a screenshot that does not match the library they will actually use. The disconnect undermines trust before they read a single rule.
2. **The showcase doubles as marketing material.** When the library is shared in posts, READMEs, evaluation tools, or social media, the showcase is what people see first. Outdated screenshots make the library look behind its own changelog.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Re-render the existing showcase as `.v3.png` after substantive tickets land.** Bring up the showcase server (`npx serve docs/static/showcase -p 4321 --no-clipboard`, the existing launch entry), capture the same surface in light and dark mode, save as `showcase-light.v3.png` / `showcase-dark.v3.png`, update `intro.md` references. Pros: minimal scope; matches the existing `.v2.png` precedent; the showcase content survives. Cons: the *content* of the showcase may itself be out of date by then — re-rendering catches the visuals but not the structural changes (e.g. if the showcase has a side panel, that side panel needs to be the new card-per-section shape, not the old bare-surface shape).

2. **Refresh the showcase content first, then re-render.** Walk through the showcase's source HTML / React, update any out-of-date compositions to match post-initiative shape, then re-render. Pros: the showcase becomes a current example, not just a current screenshot. Cons: more work; the showcase may need its own rewriting pass.

3. **Replace the showcase entirely with a fresh "what it looks like now" composition.** Build a new showcase from scratch using the cleanest examples of each component (the post-initiative defaults). Pros: highest-quality result; the showcase becomes the first reference for "what the library looks like in 2026". Cons: most work; risks scope creep.

Working hypothesis (subject to revision when the work starts): direction 2. Re-render alone (direction 1) misses the structural drift in the showcase content; full rebuild (direction 3) is overkill for a cleanup ticket. The middle path catches both.

## Acceptance hints

- New showcase images exist at `docs/static/img/showcase-light.v3.png` and `docs/static/img/showcase-dark.v3.png` (or whatever version number the implementer settles on — `.v3` is the natural next).
- `docs/docs/intro.md` references the new images.
- The showcase content (the surface(s) being screenshotted) reflects the current state of the library after the substantive tickets land — Badge outline neutral, Card elevated default, sidebar Menu flat, ALL CAPS gone, Select / Input tightened, side-panel card-per-section, etc.
- Both light- and dark-mode images render correctly on the deployed docs site.
- The previous `.v2.png` files can be deleted (after verifying nothing else references them) or left alongside (filesystem-cheap; matters only if the docs build size becomes a concern).
- `npm run build:docs` stays green.
- Release: docs / asset-only ticket. Co-shipped with #0029 / #0030 / #0031 in the cleanup PR, or just before the first release that bundles the substantive changes.

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Strongly related: every substantive ticket whose visual change appears in the showcase.
- Related cleanup tickets: #0029 (actualise all docs), #0030 (one-page LLM doc), #0031 (preflight checklist).
- Related ADRs: _none yet_
- Library files in scope: possibly the showcase source under `docs/static/showcase/` if direction 2 or 3 is taken.
- Assets in scope: `docs/static/img/showcase-light.v3.png` (new), `docs/static/img/showcase-dark.v3.png` (new); `docs/docs/intro.md` (image references); old `.v2.png` files (delete or retain).
