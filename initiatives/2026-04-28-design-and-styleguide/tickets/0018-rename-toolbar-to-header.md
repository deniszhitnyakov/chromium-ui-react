---
title: "Ticket 0018 — Rename Toolbar component to Header"
status: done
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0018 — Rename Toolbar component to Header

## Status

**done** — direction 1 (hard rename, no compatibility shim). Library: `packages/chromium-ui-react/src/components/Toolbar/` removed; new `Header/` folder with `Header.tsx`, `Header.css`, `index.ts`. Component / type / interface are `Header` / `HeaderProps`. CSS classes renamed `cr-toolbar*` → `cr-header*`. Token renamed `--cr-toolbar-height` → `--cr-header-height`. `src/index.ts` re-exports `Header`. Docs: `docs/docs/components/toolbar.md` removed, `header.md` written from scratch with the same example coverage plus a new "Header vs. PanelHeader" section. Sidebar entry updated. All `<Toolbar>` JSX in styleguide / patterns / samples / one-page / other component pages swept to `<Header>` via perl (capitalized only — lowercase "toolbar" in browser-toolbar prose left alone). `layout.md` "## The toolbar" subsection retitled "## The header" with explicit Header vs. PanelHeader distinction. `docs/src/css/custom.css` Infima override comment + selectors updated to `cr-header*`. README "Layout" row updated. Build green.

## Summary

The library exposes a `Toolbar` component that is, in practice, the page header — the 56px strip at the top of every Chromium-style surface that holds the page title and (rarely) a single far-right action. The name "Toolbar" is mildly misleading: it implies the multi-purpose icon-laden chrome strip from desktop apps (Photoshop's tool palette, Word's ribbon), and the styleguide already spends a lot of words explaining that this strip is *not* a tools shelf — see anti-pattern #16 ("IconButton glued to a title in the header"). Rename the component to `Header`, which describes the role accurately and stops inviting misuse. Sweep ~101 references across the library source and the docs.

## Context

Library state:

- [`packages/chromium-ui-react/src/components/Toolbar/Toolbar.tsx`](packages/chromium-ui-react/src/components/Toolbar/Toolbar.tsx) — the component itself, exported as `Toolbar`.
- [`packages/chromium-ui-react/src/components/Toolbar/Toolbar.css`](packages/chromium-ui-react/src/components/Toolbar/Toolbar.css) — `.cr-toolbar`, `.cr-toolbar--tall`, `.cr-toolbar__title`, `.cr-toolbar__actions`. Several token names use "toolbar" too: `--cr-toolbar-height`, `--cr-sidepanel-header-height` (already calls itself "header" — a hint that "header" is the more natural noun in this domain).
- [`packages/chromium-ui-react/src/index.ts`](packages/chromium-ui-react/src/index.ts) — re-exports `Toolbar`.
- 101 occurrences of `Toolbar` across the library + docs (verified with `grep -rn "Toolbar\|<Toolbar"` against `packages/chromium-ui-react/src/` and `docs/docs/`, excluding `static/llm`). This is a large sweep — every styleguide page, every component example that wraps a surface, every pattern, every sample.

Adjacent components that already use the "header" noun (worth reconciling with):

- [`packages/chromium-ui-react/src/components/PanelStack/PanelHeader.tsx`](packages/chromium-ui-react/src/components/PanelStack/PanelHeader.tsx) — the drill-in subview header inside `PanelStack`. It is *not* the same thing as `Toolbar` — it sits inside a panel-stack subview, has a back arrow, is shorter (48px vs 56px), and is scoped to the drill-in flow. Renaming `Toolbar` to `Header` introduces a name conflict with `PanelHeader` that needs an explicit boundary statement: `Header` = top-level page header; `PanelHeader` = subview header inside a `PanelStack`.
- The CSS token `--cr-sidepanel-header-height: 48px` already uses "header" for the side-panel surface. So the codebase is half-renamed already — this ticket finishes the alignment.

Native Chromium reference:

- `chrome://settings`, `chrome://bookmarks`, `chrome://downloads`, `chrome://extensions` — every page has a 56px header strip with the page title (and a search input for some). Internally Chromium calls this `cr-toolbar`, so the original library naming was a faithful copy. But `cr-toolbar` is itself a slightly historical name (predates the cleanup in modern WebUI), and Chromium's component-author guidance for new surfaces just says "header strip" in plain English. Renaming is consistent with where Chromium itself drifted.

This ticket is paired with #0019 (layout shell is content-only by default; header forbidden in side panel). The two land together logically — when #0019 establishes "the top of a surface is a Header, not a mandatory three-part shell", #0018 makes sure the component name agrees with the prose.

## What hurts and why

Two coupled problems:

1. **The name invites the misuse the styleguide spends 80 lines warning against.** Anti-pattern #16 exists because authors keep dropping `IconButton`s into the `Toolbar`'s `actions` slot, treating it like a tools shelf. The name "toolbar" is the prompt; "header" is not. Renaming removes the invitation at the linguistic level — a component called `Header` does not read as "the strip where I park my icons".
2. **The codebase is internally inconsistent.** `--cr-sidepanel-header-height` already uses "header"; `PanelHeader` already uses "header"; the styleguide prose alternates between "toolbar" and "page header" depending on the page. Pick one noun and use it everywhere.

The deeper meta-problem is the recurring shape of this initiative: a name / API that does not match the rule the styleguide wants to enforce keeps producing the same misuse. Badge / fullWidth / tonal / Chip / section labels — all the same shape. Naming is the cheapest enforcement mechanism, and changing it once is cheaper than restating "do not use the actions slot" forever.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Hard rename, no compatibility shim.** `Toolbar` → `Header`; `cr-toolbar*` classes → `cr-header*`; `--cr-toolbar-height` token → `--cr-header-height`. Every `<Toolbar>` in docs and live previews → `<Header>`. Pre-1.0 status absorbs the breakage. Pros: clean; matches Badge / fullWidth / tonal precedent; no half-renamed library. Cons: 101-site sweep + token rename + CSS class rename — large diff, easy to miss something.

2. **Rename with deprecated alias.** Add `Header` as the canonical export; keep `Toolbar` as a type-alias / re-export with a `@deprecated` JSDoc tag for one minor cycle, then remove. Pros: consumers have a window; lower regression risk. Cons: same deprecation overhead the rest of the initiative has chosen against (Badge / fullWidth / tonal all hard-removed); two names in the API for a release.

3. **Rename only the export and the docs prose; keep CSS class names and tokens as `cr-toolbar*` / `--cr-toolbar-*`.** A "soft rename" — the public TypeScript API and prose say `Header`, but the painted CSS still says `cr-toolbar`. Pros: smaller diff; consumers using the CSS selectors directly are not affected. Cons: confusing to read the source ("why is the Header component painting a `cr-toolbar` class?"); leaves the codebase half-renamed forever; defeats the consistency argument from problem 2.

Working hypothesis (subject to revision when the work starts): direction 1, mirroring every other API rename / removal in this initiative. The 101-site sweep is grindy but mechanical — `grep -rln Toolbar | xargs sed -i 's/Toolbar/Header/g'` plus careful re-read for any false positives (e.g. URL strings, MDN references that reference "toolbar" semantically).

## Acceptance hints

- Library: `packages/chromium-ui-react/src/components/Toolbar/` is renamed to `packages/chromium-ui-react/src/components/Header/`; files inside are `Header.tsx`, `Header.css`, `index.ts`. The exported component, type, and prop interface are `Header`, `HeaderProps`. CSS classes are `.cr-header`, `.cr-header--tall`, `.cr-header__title`, `.cr-header__actions`. Tokens `--cr-toolbar-height` (and any other `--cr-toolbar-*`) are renamed to `--cr-header-*`.
- `src/index.ts` re-exports `Header` (no `Toolbar`).
- Every `<Toolbar>` in `docs/docs/` becomes `<Header>`. Every `cr-toolbar*` class reference in inline-styled live previews becomes `cr-header*` (rare but possible).
- Docs page `docs/docs/components/toolbar.md` is renamed to `docs/docs/components/header.md`, with `id`, `slug`, and front-matter `title` updated. Sidebar entry in `docs/sidebars.ts` updated.
- Styleguide prose: every mention of "toolbar" as a component name becomes "header". Mentions of "the toolbar" in the **`chrome://`-source-reference** sense (where Chromium itself uses `cr-toolbar`) may stay if quoted as a Chromium-source citation; everywhere else, "header".
- `PanelHeader` is *not* renamed. The styleguide gains one short sentence somewhere (probably in `layout.md` or `principles.md`) explicitly distinguishing `Header` (top-level page header) from `PanelHeader` (drill-in subview header inside `PanelStack`).
- A grep for `Toolbar` returns no library / docs hits outside this ticket file (and possibly archive / Chromium-source-reference quotes).
- `npm run build:lib && npm run build:docs` stays green; `npm pack --dry-run` shows the new file names.
- Release: minor version bump (breaking API rename, same rule as Badge / fullWidth / tonal removals).

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Strongly related: ticket #0019 (layout shell semantics — header optional, forbidden in side panel) — likely co-implemented.
- Related precedent: commit `77bafca` (Badge solid removal); ticket #0009 (Button `tonal`); ticket #0012 (drop Chip).
- Related ADRs: _none yet_; if a deprecation alias is chosen instead (direction 2), the divergence from the hard-removal precedent deserves a short ADR.
- Reference Chromium: `cr-toolbar` in `chrome/browser/resources/cr_components/cr_toolbar/` — name preserved in Chromium source, role described as "page header" in modern WebUI guidance.
- Library files in scope: every file under `packages/chromium-ui-react/src/components/Toolbar/`; `packages/chromium-ui-react/src/index.ts`; `packages/chromium-ui-react/src/styles/tokens.css` (header-height token).
- Docs in scope: ~101 references across `docs/docs/styleguide/`, `docs/docs/components/`, `docs/docs/styleguide/patterns/`, `docs/docs/styleguide/samples/`.
