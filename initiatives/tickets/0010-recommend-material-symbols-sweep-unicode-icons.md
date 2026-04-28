---
title: "Ticket 0010 — Recommend Material Symbols / Material Design Icons; sweep all Unicode-icon examples in the docs"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0010 — Recommend Material Symbols / Material Design Icons; sweep all Unicode-icon examples in the docs

## Status

**open**

## Summary

The library has no icon vocabulary recommendation today. Every live example that needs an icon hand-rolls a Unicode character (`<span>⋮</span>`, `<span>↻</span>`, `<span>✓</span>`, `<span>🔒</span>`, `<span>🔔</span>`, `<span>📁</span>`, `<span>🌐</span>`, …) — there are 81 such occurrences across the docs. Visually they look like emoji-or-symbol soup, weight-inconsistent, off-baseline, and not at all like the Chromium toolbar icons they are supposed to evoke. Pick a recommended icon library — almost certainly one of Google's two (Material Symbols, the modern Variable-font set, or Material Design Icons community sets) — document the recommendation, and rewrite every Unicode-icon example to use it.

## Context

Source of the report: cross-cutting observation across the operator's review of every component page. Triggered specifically on `IconButton` ("not stoit использовать Unicode-символы для обозначения иконок — выглядят они откровенно плохо") and reinforced on `Toolbar` ("Иконки нужно менять на Material Design Icons. Здесь в Live Preview просто другая иконка.").

Scope of the sweep:

- 81 occurrences of the `icon={<span` pattern across `docs/docs/`. A sample:
  - [`docs/docs/components/icon-button.md:15-18`](docs/docs/components/icon-button.md#L15) — four IconButton examples with `↻`, `⋮`, `✕`, `✎`.
  - [`docs/docs/components/toolbar.md:16`](docs/docs/components/toolbar.md#L16) — Toolbar example with `⋮`.
  - [`docs/docs/styleguide/layout.md:123-125`](docs/docs/styleguide/layout.md#L123) — Menu items with `☆`, `🔒`, `🔔` (mixing symbols and emoji).
  - [`docs/docs/styleguide/patterns/side-panel.md:56`](docs/docs/styleguide/patterns/side-panel.md#L56) — IconButton with `✓`.
  - Bookmarks-style examples with `📁`, favicons with `🌐`, and so on.

Library state:

- [`packages/chromium-ui-react/src/components/IconButton/IconButton.tsx`](packages/chromium-ui-react/src/components/IconButton/IconButton.tsx) — accepts `icon: ReactNode`. No assumption about what the icon is. No documentation of recommended icon source.
- No icon dependency in `packages/chromium-ui-react/package.json` (verified earlier in initiative). The library does not ship icons — it expects consumers to bring their own.

Candidate icon vocabularies:

- **Material Symbols** (Google Fonts, modern, variable-font, three styles: outlined / rounded / sharp). Used in modern Chromium WebUI surfaces. Distributed via Google Fonts CDN, npm `@material-symbols/svg-*`, or the SVG download. Aligns most closely with what real Chromium UI uses today.
- **Material Design Icons** (community fork at `@mdi/react` / `@mdi/font`). Larger, broader catalog, but stylistically slightly different from current Chromium. Has community-contributed icons that are not in the Google set.
- **Material Icons (legacy)** (Google Fonts ligature font). Older predecessor to Material Symbols. Mention only for completeness — not the recommendation.

Native Chromium reference: Chromium's WebUI surfaces use `iron-iconset-svg`-style icon sprites compiled from a Material-derived set. The visual register is "outlined Material Symbols at 20px, weight 400". That is the look the library examples should evoke.

## What hurts and why

Three problems:

1. **The examples look unprofessional.** Emoji renders differently per OS (Apple's `🔒` is a colourful padlock; Microsoft's is a flat black one; on a Linux build it might be a tofu box). Symbols like `⋮` and `↻` rely on the system font and end up at inconsistent baselines, weights, and sizes across browsers. A library that markets itself on "Chromium-authentic visuals" cannot ship Unicode-icon examples — they undermine the very claim.
2. **Agents pattern-match on the examples.** The Google Maps scraper prototype that drove tickets #0001–#0008 inherits the Unicode-icon style directly from the docs — it ships `✓` and `✕` for "parsed / partial" status pills (visible in the original screenshot) because that is exactly what the docs show. Without a positive recommendation, agents will keep reaching for Unicode.
3. **There is no fallback for "what icon do I use here?"** A library page like `Menu` or `IconButton` needs to demonstrate icons, and right now the only available answer is "any Unicode character that looks vaguely related." A documented recommendation gives both contributors and agents a clear fallback.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Recommend Material Symbols, supply icons in examples via inline SVG, no runtime dependency.** Add a short "Icons" section to the styleguide (probably in `principles.md` or a new `icons.md`) explaining the recommendation, link to Material Symbols, give a copy-paste recipe for fetching an icon as inline SVG. Rewrite all 81 docs occurrences to use a small set of curated inline-SVG icons (refresh, more-vert, close, edit, check, folder, lock, notification, etc.). Pros: zero dependency on the consumer side; examples render identically across browsers; visually matches Chromium. Cons: 81 sites to rewrite, by hand, with care for visual consistency; each inline SVG is 5–10 lines, so the docs grow.

2. **Recommend Material Symbols, depend on `@material-symbols/svg-400` (or similar) in the docs site only.** Same recommendation, but pull the icons from the npm package in the docs workspace (not in the library workspace — the library still ships zero icons). Define a small `<Icon name="..." />` helper for the docs `ReactLiveScope` and use it in every example. Pros: examples become one-liners (`<Icon name="more_vert" />`); easier to keep visually consistent; the package is small. Cons: adds a docs-side dependency; introduces a docs-only helper component that consumers cannot use (might confuse readers).

3. **Recommend Material Symbols *and* introduce a real `<Icon />` component into the library (with the icon set tree-shaken).** Same recommendation, plus a thin `<Icon />` primitive in `packages/chromium-ui-react/src/components/Icon/` that wraps an SVG. Library consumers can then import individual icons. Pros: gives consumers a first-class API for icons. Cons: scope creep — managing an icon set is a nontrivial subproject (versioning, tree-shaking, SVG hygiene); puts the library on the hook for icon support.

Working hypothesis (subject to revision when the work starts): direction 1 + a tiny shared scope helper in `docs/src/theme/ReactLiveScope/` that exposes ~10 hand-picked inline SVGs as named components (`<RefreshIcon />`, `<MoreIcon />`, `<CloseIcon />`, `<CheckIcon />`, …). The library remains icon-free; the docs get a consistent visual language; the styleguide writes "use Material Symbols, here is a recommended pattern, here is the SVG to copy-paste." Direction 3 is a good *future* ticket but probably out of scope for this fix.

## Acceptance hints

- A "Icons" subsection exists in the styleguide (location decided in the work turn — likely a new `docs/docs/styleguide/icons.md` or a section in `principles.md`) that:
  - Recommends **Material Symbols** (Google Fonts, outlined style, weight 400, 20–24px size) as the canonical icon vocabulary for `chromium-ui-react` consumers.
  - Briefly mentions Material Design Icons (community set) as an acceptable alternative, with a note about the visual difference.
  - Discourages Unicode characters and emoji as icon stand-ins, with an anti-pattern reference.
- A new anti-pattern is added to `docs/docs/styleguide/anti-patterns.md` ("Unicode characters as icons") with wrong / right pairs.
- Every `icon={<span...>X</span>}` occurrence in the docs (81 hits as of writing) is replaced with the chosen mechanism (inline SVG, helper component, or icon-package import). After the sweep, a grep for `icon={<span` returns zero hits.
- The `IconButton` page documents that its `icon` prop expects an SVG-style React node and shows an example with the recommended approach.
- `npm run build:docs` stays green; live previews render the icons correctly across light / dark mode.
- Library workspace (`packages/chromium-ui-react/`) remains icon-free — no new dependencies in its `package.json`, no icon assets shipped in the npm tarball.

## Links

- Initiative: [`../2026-04-28-design-and-styleguide/README.md`](../2026-04-28-design-and-styleguide/README.md)
- Kanban: [`../2026-04-28-design-and-styleguide/kanban.md`](../2026-04-28-design-and-styleguide/kanban.md)
- Related ADRs: _none yet_; this one might warrant the initiative's first ADR ("Icon vocabulary policy") because the recommendation is intended to outlive this ticket.
- Reference: Material Symbols (https://fonts.google.com/icons), Material Design Icons (https://pictogrammers.com/library/mdi/).
- Library files possibly affected: `packages/chromium-ui-react/src/components/IconButton/IconButton.tsx` (only docstring / type-doc tightening; no behaviour change).
- Docs in scope: every `.md` / `.mdx` under `docs/docs/` that contains `icon={<span` — 81 occurrences as of packing time.
