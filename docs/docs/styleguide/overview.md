---
id: styleguide-overview
title: Styleguide Overview
slug: /styleguide
sidebar_position: 1
description: How to compose chromium-ui-react components so the result is indistinguishable from a native Chromium WebUI surface.
format: mdx
---

# Styleguide

This section is not about what components exist — the [Components](/components/button) section covers that. It is about **how to arrange them** so that the finished UI feels like it belongs next to `chrome://settings` and `chrome://bookmarks`, not next to a generic Material dashboard.

## Why this exists

`chromium-ui-react` gives you the right pixels (`cr-button`, `cr-input`, `cr-header`, `cr-link-row`-style list items, `PanelStack` drill-in) but does **not** prescribe composition. In practice, that freedom has produced extensions that use the right *components* with the wrong *layout*:

- Cards floating on a tinted background, spaced like a marketing page.
- Settings rows inside heavy bordered boxes.
- Primary buttons placed on the left of the action row.
- Dialogs as wide as the viewport.
- Sidebar navigation used where a drill-in panel is idiomatic.

The result passes a component-by-component review and still looks nothing like Chromium. This styleguide closes that gap by describing the **shell, rhythm, and interaction conventions** that the real Chromium WebUI surfaces all share.

## Who this is for

1. **Human developers** building browser extensions or companion apps who want the output to look native.
2. **LLM coding agents** using this library. If you are an agent, read the [Pre-flight checklist](./checklist.md) before generating any layout — it is the minimal set of rules to follow when the user just asks for "a settings page" or "a side panel."

## How to read this section

The pages are ordered from broad to narrow:

1. **[Principles](./principles.md)** — the five ideas that every Chromium surface respects.
2. **[Layout & shell](./layout.md)** — page shell, side-panel width, content max-width, toolbar position.
3. **[Typography](./typography.md)** — the 11/12/13/14/16/20 scale actually used in WebUI.
4. **[Spacing & rhythm](./spacing.md)** — the `--cr-space-*` tokens and where each one applies.
5. **[Color & surfaces](./color.md)** — when to use `surface` vs `surface-1`, and what *not* to color.
6. **[Sections & rows](./sections-and-rows.md)** — the single most important pattern: the settings row.
7. **[Forms](./forms.md)** — label position, hint text, error text, inline vs stacked.
8. **[Dialogs](./dialogs.md)** — sizing, button order, destructive confirmations.
9. **[Navigation](./navigation.md)** — when to use Tabs, PanelStack, or a sidebar Menu.
10. **[Patterns](./patterns/settings-page.md)** — full assembled examples of common Chromium surfaces.
11. **[Sample extensions](./samples/link-collector.md)** — three complete extension UIs with commentary.
12. **[Anti-patterns](./anti-patterns.md)** — things that look fine in isolation and wrong in a Chromium context.
13. **[Pre-flight checklist](./checklist.md)** — short, LLM-targeted rules to apply before writing any layout code.

## Reference surfaces

When this styleguide says "Chromium-native," it means the visual language of these specific surfaces. Open them in a real Chromium build and inspect them whenever you are unsure:

| Surface | Open at | Why it matters |
|---|---|---|
| Settings | `chrome://settings` | Section + row + subpage pattern |
| Bookmarks manager | `chrome://bookmarks` | Header + tree + list pattern |
| History | `chrome://history` | Grouped list + search pattern |
| Downloads | `chrome://downloads` | Row with progress + actions pattern |
| Reading list (side panel) | Side panel icon → Reading list | Compact list pattern |
| Bookmarks (side panel) | Side panel icon → Bookmarks | Drill-in / folder-tree pattern |
| Extensions | `chrome://extensions` | Card + toggle pattern |

Chromium's own source for these pages lives under `chrome/browser/resources/<surface>/` and the shared primitives live under `ui/webui/resources/cr_elements/`. Both are public. If something in this guide contradicts what you see in a current Chromium build, trust the build and file an issue.

## Design budget: what you are *not* free to change

When you use this library you are opting into a narrow aesthetic. The following are non-negotiable if the goal is "feels like Chromium":

- **No additional color.** Every color must come from a `--cr-*` token.
- **No additional shadow.** Only surfaces that appear in Chromium carry a shadow — dialogs (`--cr-elevation-5`), popover menus (`--cr-elevation-3`), and occasionally a hovered interactive card.
- **No additional radius values.** Use `--cr-radius-sm|md|lg|xl|full` only.
- **No per-component fonts.** One family, one scale. See [Typography](./typography.md).
- **No gradients, no glows, no animated backgrounds.** Chromium does not use them.
- **No illustrations inside functional surfaces.** An illustration belongs in an onboarding or empty state, never in a settings page.

Everything else — layout composition, information architecture, the number of toggles on a row — is yours to design. This styleguide explains how to do that so the result still reads as Chromium.
