# Security Policy

## Supported versions

`chromium-ui-react` is pre-1.0 software. Security fixes land on the latest published minor, and older pre-release versions are not backported.

| Version | Supported |
|---------|-----------|
| `0.1.x` | ✅        |
| `< 0.1` | ❌        |

## Reporting a vulnerability

**Please do not open a public GitHub issue for security reports.** Public issues are indexed immediately and leave users exposed before a fix ships.

Instead, use one of:

1. **GitHub private advisory (preferred)** — open a draft advisory at  
   [github.com/ztnkv/chromium-ui-react/security/advisories/new](https://github.com/ztnkv/chromium-ui-react/security/advisories/new)  
   This sends the report privately to the maintainers and sets up a coordinated disclosure workflow.
2. **Email** — `denis.zhitnyakov@gmail.com`, subject prefix `[chromium-ui-react security]`.

Please include:

- a short description of the issue and its impact,
- a minimal reproduction (code snippet, repo link, or step list),
- the affected version(s),
- any workaround you've already found, if any.

## What to expect

- Initial acknowledgement within **3 business days**.
- First assessment (confirmed / won't-fix / needs more info) within **7 days**.
- A patch release and public advisory within **30 days** for confirmed issues, or sooner if the issue is severe.
- Credit in the published advisory, unless you'd rather stay anonymous.

## Out of scope

This library is a thin rendering layer over native HTML elements. The following are generally **not** vulnerabilities of this package and belong upstream:

- Issues in React, ReactDOM, or any peer dependency.
- Cross-site scripting caused by the consumer passing raw user HTML into `dangerouslySetInnerHTML` — the components do not accept HTML strings as props.
- Browser-specific rendering bugs that don't affect behavior or data integrity.
- Accessibility gaps (please open a regular GitHub issue instead — they're important, just not security-private).

## Coordinated disclosure

If you are a security researcher and need a longer coordination window than 30 days (for a responsible disclosure timeline), say so in your report — we'll accommodate reasonable extensions.
