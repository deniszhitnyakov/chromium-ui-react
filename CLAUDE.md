# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

npm workspaces monorepo with two workspaces, plus an internal-docs folder:

- `packages/chromium-ui-react/` — the published library (React + CSS, built with Vite).
- `docs/` — Docusaurus 3 site that also consumes the library via workspace link (`"chromium-ui-react": "*"`).
- `initiatives/` — internal project journal (Initiative-Driven Documenting framework). Not a workspace, not published. See section below.

Install once from the repo root (`npm install`); the workspace link means the docs site imports the library source directly during `dev:docs`, but a production `build:docs` needs the library's `dist/` to exist first.

## Initiative-driven internal docs (`initiatives/`)

This repository uses the [Initiative-Driven Documenting](https://github.com/ztnkv/initiative-driven-docs-framework) framework for its internal project journal — visions, decisions, plans, and the in-flight reasoning behind library / styleguide / docs changes. Distinct from `docs/`:

- **`docs/`** — public Docusaurus site (component reference for library *consumers*).
- **`initiatives/`** — internal journal (project memory for *contributors*, human and AI). Lives at the repo root specifically to avoid colliding with the Docusaurus workspace; the rationale and full navigation are in [`initiatives/README.md`](./initiatives/README.md).

Layout:

```
initiatives/
├── README.md                              # Navigation + why the folder is `initiatives/` not `docs/`
├── glossary.md                            # Shared vocabulary (Chromium surfaces, library terms, framework terms)
├── TIMELINE.md                            # Chronological register of every initiative
├── tickets/                               # Global ticket registry — one file per ticket, sequential numbering
│   ├── README.md                          # Numbering policy + ticket template + lifecycle
│   └── NNNN-<short-kebab>.md              # One ticket file (`#0001`, `#0002`, …)
└── YYYY-MM-DD-<kebab-name>/               # One folder per initiative
    ├── README.md                          # Goal, status, artifacts
    ├── journal.md                         # Reverse-chronological log
    ├── kanban.md                          # Optional Obsidian Kanban — three columns (To Do / In Progress / Done)
    └── decisions/NNNN-<kebab>.md          # Optional ADRs, numbered per-initiative
```

**Source of truth for current work:** the most recent initiative under `initiatives/` with status `in-progress`, or — if none — the most recent `approved` one. Start at [`initiatives/TIMELINE.md`](./initiatives/TIMELINE.md), then read its `kanban.md`, then drill into the linked ticket file under `initiatives/tickets/`.

**Conventions:**

- Every Markdown file in `initiatives/` opens with a YAML front-matter block: `title`, `status`, `created`, `updated`, `authors`, `type`, `language`. Ticket files add `initiative:` pointing at the originating initiative folder.
- Initiative folder names: `YYYY-MM-DD-<kebab-name>/` (start date, lowercase, hyphens). Alphabetical sort = chronological order.
- Initiative lifecycle: `planned → in-progress → approved → superseded`.
- Ticket numbering: **global, sequential, zero-padded to four digits**, never reused. Find the next number with `ls initiatives/tickets/ | grep -E '^[0-9]{4}-' | sort | tail -1`.
- Ticket lifecycle: `open → in-progress → done` (or `wontfix`). The ticket file's `status:` and the kanban card column are bumped **in the same commit** as the work itself.
- `TIMELINE.md` is updated **in the same commit** that creates or closes an initiative.
- `glossary.md` is updated **in the same commit** that introduces a new term.
- Canonical content language: **English** (matches the public docs site). Identifiers (folder names, file names, YAML keys, code) are always English. Operator-facing communication is per the operator's stated preference — that is independent of document content language.

**Packing workflow** (turning an operator-surfaced problem into a tracked unit of work):

1. Pick the next ticket number (`NNNN`).
2. Write `initiatives/tickets/NNNN-<short-kebab>.md` from the template in [`initiatives/tickets/README.md`](./initiatives/tickets/README.md). The body must include: Summary, Context (with file paths and line numbers), What hurts and why, Direction (possible implementation approaches, no commitment), Acceptance hints, Links.
3. Add a one-line card to the originating initiative's `kanban.md` under **To Do**: `- [ ] **#NNNN** — [<short title>](../tickets/NNNN-<name>.md)`.
4. **Packing is not implementation.** The agent does not start coding in the same turn unless the operator explicitly requests it. Commit the packing as `docs(initiatives): pack ticket #NNNN — <short title>`.

**Kanban workflow** (when an initiative has a `kanban.md`):

1. Three columns only: **To Do**, **In Progress**, **Done**. The Obsidian-Kanban front-matter (`kanban-plugin: basic`) lets Obsidian render the file as a board; in any other viewer it reads as a plain checklist.
2. Starting work on a card: move it To Do → In Progress *before* the work begins, and bump the ticket file's `status:` to `in-progress`. **At most one card In Progress at a time, per initiative.**
3. Finishing a card: move it In Progress → Done **in the same commit** as the code/docs change it covers, and bump the ticket file's `status:` to `done` with the commit SHA in the `## Status` section.

**Not shipped to npm.** `initiatives/` lives at the repo root, outside `packages/chromium-ui-react/`. The library's `package.json` uses an explicit `files` allowlist (`dist`, `src/styles`, `README.md`, `LICENSE`), so initiative content cannot reach the npm tarball even by accident. The folder *does* ship to GitHub — the repository is its public artifact.

## Common commands

From the repo root:

```bash
npm install                 # install everything (workspaces handle the rest)

npm run dev                 # library (vite --watch) + docs site in parallel
npm run dev:lib             # library watch build only
npm run dev:docs            # Docusaurus at http://localhost:3000

npm run build:lib           # tsc --noEmit + Vite lib build → packages/chromium-ui-react/dist
npm run build:docs          # Docusaurus static build → docs/build
npm run typecheck           # tsc --noEmit across all workspaces
```

Workspace-scoped variants:

```bash
npm --workspace chromium-ui-react run build
npm --workspace docs run typecheck
```

There is no test runner and no linter configured — CI runs typecheck + both builds. Treat `build:lib && build:docs` as the smoke test. If you change the library, `build:docs` is the integration check that catches broken imports and runtime errors in MDX live examples.

## Library architecture (`packages/chromium-ui-react/`)

**Build.** Vite library mode (`vite.config.ts`) emits ESM (`chromium-ui-react.js`) + CJS (`chromium-ui-react.cjs`). `vite-plugin-dts` with `rollupTypes: true` produces a single bundled `dist/index.d.ts`. React, ReactDOM, and `react/jsx-runtime` are externalized. All component CSS gets concatenated into one `dist/chromium-ui-react.css` (CSS code splitting is off — the asset filename is hard-coded in the rollup config). Consumers import that as `chromium-ui-react/styles.css`.

**Styling model.** Zero-runtime. Every component is a `.tsx` that imports its sibling `.css`. Styles reference `--cr-*` CSS custom properties defined in `src/styles/tokens.css` (the `:root` / `.cr-theme` selectors) plus base element resets in `src/styles/base.css`. Dark mode flips tokens via `prefers-color-scheme` — there is no theme provider, no `data-theme` attribute, no JS state for theming. The `src/styles/tokens.css` file is also published as a standalone export (`chromium-ui-react/tokens.css`) for consumers who want just the tokens.

**Component pattern.** Every component lives at `src/components/<Name>/` with exactly three files: `<Name>.tsx`, `<Name>.css`, `index.ts`. The `.tsx`:
- Uses `forwardRef`.
- Accepts the matching HTML element's attributes (`Omit`'d where the component repurposes a native prop like `color`).
- Composes classes via the local `cn` helper (`src/utils/cn.ts`) — a minimal clsx-alike. Do not add `clsx` or `classnames` as a dependency.
- Uses `cr-*` class names (kebab-case, BEM-ish: `cr-button--action`, `cr-button--full`).
- Only emits variant/size classes when the value differs from the default, to keep markup clean.

Each component's `index.ts` re-exports the component and its public types; the top-level `src/index.ts` re-exports every component's `index.ts` plus `cn` / `ClassValue`.

**Multi-part components.** When a component splits into subparts (e.g. `PanelStack` → `PanelStack`, `PanelView`, `PanelHeader`, `PanelRow`), keep all parts in the same `<Name>/` folder with separate `.tsx`/`.css` pairs per part, and export them all from that folder's `index.ts`. Compound state is shared via a `createContext` + `use<Name>` hook that throws outside the provider (see `PanelStack.tsx` for the canonical pattern).

**Adding a new component.** Mirror an existing one (Button / Checkbox / Dialog cover most patterns) — consistency across components matters more than micro-optimization. Then:
1. Add the folder + three files above.
2. Add a re-export line in `src/index.ts`.
3. Add a docs page at `docs/docs/components/<name>.md` (see docs section below).
4. Register the page in `docs/sidebars.ts` under the `Components` category.

## Docs site architecture (`docs/`)

**Docusaurus 3 + live codeblocks.** The `@docusaurus/theme-live-codeblock` theme renders ` ```tsx live ` blocks as editable playgrounds. The live scope is defined in `docs/src/theme/ReactLiveScope/index.tsx` — it spreads `* as ChromiumUI` plus React hooks, so every docs example can use any library component by bare name (no imports needed inside the fence). If you add a new React hook usage to an example, it must be in the scope or the playground will error.

**"Copy Markdown" plugin.** `docs/plugins/raw-markdown/index.js` is a tiny Docusaurus plugin that, on both `loadContent` (dev) and `postBuild` (prod), walks `docs/docs/` and copies every `.md` / `.mdx` file to `docs/static/llm/<relative>.md`. The swizzled `docs/src/theme/DocItem/Layout/` component renders a "Copy Markdown" button that `fetch`es `/llm/<slug>.md`. The plugin is intentionally dumb — it does not strip MDX/JSX, because the output is pasted into LLMs that tolerate the noise. `docs/static/llm/` is gitignored; it's regenerated on every build.

**MDX page convention.** Component pages start with frontmatter (`id`, `title`, `slug: /components/<name>`, `description`, `format: mdx`) followed by a `## Live preview` section containing one ` ```tsx live ` block, then `## Import`, `## Props` (markdown table), `## Variants`, examples, and accessibility notes. Match `button.md` as the template.

**Typecheck quirk.** `docs` has its own `tsconfig.json` (extends `@docusaurus/tsconfig`) separate from the library. The repo-root `npm run typecheck` fans out to both via `--workspaces --if-present`.

## CI / release flow

Three workflows in `.github/workflows/`:

- **`deploy-docs.yml`** — on every push to `main`, builds lib + docs, deploys `docs/build/` to GitHub Pages (`ztnkv.github.io/chromium-ui-react`).
- **`publish-npm.yml`** — on push of a `v*` tag (or manual dispatch with a dry-run toggle), builds the library and runs `npm publish --workspace chromium-ui-react`. Needs `NPM_TOKEN`.
- **`release.yml`** — on push of a `v*` tag, creates a GitHub Release with auto-generated notes, skipping if the release already exists.

**Release process.** Bump the version in both `package.json` (repo root) and `packages/chromium-ui-react/package.json` in a single commit, push, then push a matching `v<version>` tag. The tag push triggers publish-npm and release in parallel; the preceding commit's push triggers deploy-docs. Do not rely on `npm version` — it doesn't understand the two-package version bump.

## Conventions that matter

- **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `ci:`, `chore:`) — one logical change per commit. Release tooling and changelog generation assume this.
- **No runtime styling deps.** No `styled-components`, `emotion`, `tailwindcss`, `stitches`, or runtime theming engines in the library package. Theming is CSS variables only.
- **No `clsx` / `classnames` dep.** Use the in-tree `cn` helper.
- **Pre-1.0 API stability is best-effort** but prop renames should still ride a minor bump, not a patch.
- **Chromium-authentic visuals.** When picking colors, spacing, or interaction states, the reference is Chromium's `cr_elements` / `cr_shared_vars.css`, not Material or a generic "Google-y" feel. Open `chrome://settings` or `chrome://bookmarks` when in doubt.
