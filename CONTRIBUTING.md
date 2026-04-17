# Contributing to chromium-ui-react

Thanks for being interested! This project is small and opinionated — contributions are welcome, but a quick read of this page will save you (and me) a round-trip.

## TL;DR

1. Open an issue first if the change is non-trivial — saves you building something that won't merge.
2. Fork, branch from `main`, one logical change per PR.
3. Run `npm install` at the repo root (npm workspaces handles the rest).
4. `npm run build:lib && npm run build:docs` must pass.
5. PR into `main`. CI will run typecheck + build.

## Repository layout

```
packages/chromium-ui-react/   # the published library
docs/                         # Docusaurus documentation site
.github/workflows/            # CI + docs deploy
```

See the root [README](./README.md) for the bigger picture.

## Development setup

```bash
# from repo root
npm install
npm run dev              # library (vite --watch) + docs site in parallel
# or just one of them:
npm run dev:lib
npm run dev:docs         # http://localhost:3000
```

## Design principles

The library is deliberately narrow. Before proposing a change, please check your idea against these rules:

1. **Chromium-authentic.** The visual reference is Chromium's `cr_elements` system, not Material, not generic "Google-y". When in doubt, open `chrome://settings` or `chrome://bookmarks` and match what's there.
2. **Zero-runtime styling.** Plain CSS with `--cr-*` custom properties. No `styled-components`, no `emotion`, no runtime theming engines, no `data-theme` state in JS.
3. **Tiny API surface.** A component's prop list should fit in your head. If a prop exists to cover a "what if someone wants X" case, it doesn't exist.
4. **Accessibility is not optional.** Roles, labels, keyboard behavior have to work. If you're not sure, look at how the existing components handle it.

## Adding a component

1. Create `packages/chromium-ui-react/src/components/<Name>/`:
   - `<Name>.tsx` — the component itself, `forwardRef`, exports matching the existing pattern.
   - `<Name>.css` — styles, using `--cr-*` tokens (not raw colors).
   - `index.ts` — re-exports the component and its types.
2. Add a re-export in [`packages/chromium-ui-react/src/index.ts`](./packages/chromium-ui-react/src/index.ts).
3. Create a documentation page in `docs/docs/components/<name>.md`:
   - Frontmatter with `id`, `title`, `slug`, `description`, `format: mdx`.
   - A `## Live preview` section with a ` ```tsx live ` block.
   - Props table, variants, examples, accessibility notes.
4. Register the page in [`docs/sidebars.ts`](./docs/sidebars.ts).

Mirror the structure of the existing components (`Button`, `Checkbox`, `Dialog` cover most patterns) — consistency matters more than cleverness.

## Commit messages

Conventional Commits style (`feat:`, `fix:`, `docs:`, `refactor:`, `ci:`, ...), one commit per logical change. The CI + release tooling assumes this format.

Example:

```
feat(select): add searchable mode with keyboard filtering

Adds a `searchable` prop to Select. When true, typing in the trigger
filters the options list and preserves the selected highlight.
```

## Pull request checklist

- [ ] `npm run build:lib` passes (TypeScript + Vite build)
- [ ] `npm run build:docs` passes
- [ ] New components have a docs page with a live preview
- [ ] Dark mode works (the docs site uses `prefers-color-scheme` — check both)
- [ ] No new runtime dependencies in the library package without discussion

## What you should not do

- Don't add `styled-components`, `emotion`, `tailwindcss`, or any other styling runtime to the library.
- Don't introduce `theme={...}` / `ThemeProvider` APIs. Theming happens via CSS custom properties.
- Don't add a component "because shadcn has one". Every component in this library is here because it exists in Chromium.
- Don't rename existing props in a patch release. API stability before 1.0 is best-effort; after 1.0, it's contractual.

## Questions

Open a discussion or a draft PR — either works. For anything security-related, see [SECURITY.md](./SECURITY.md).

## Code of conduct

By participating you agree to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).
