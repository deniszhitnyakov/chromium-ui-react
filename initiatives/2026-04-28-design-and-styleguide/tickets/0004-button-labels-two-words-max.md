---
title: "Ticket 0004 — Button labels: aim for one word, never more than two"
status: open
created: 2026-04-28
updated: 2026-04-28
authors: [Denis Zhitnyakov]
type: ticket
language: en
initiative: 2026-04-28-design-and-styleguide
---

# Ticket 0004 — Button labels: aim for one word, never more than two

## Status

**open**

## Summary

Native Chromium buttons are almost always one word — "Save", "Cancel", "Done", "Add", "Remove", "Sync", "Continue". Two-word labels exist ("Save changes", "Add account", "Restore defaults") but are visibly the exception, not the rule. Three-or-more-word labels do not occur. The styleguide currently has no rule on this and several library examples ship multi-word labels ("Start scraping", "Enrich visible leads", "Save selection"), so agents pattern-match on the longer copy and produce buttons like "Start new scrape" — exactly what the Google Maps scraper prototype shipped. Codify the one-or-two-words rule and tighten existing examples.

## Context

Surfaced from the same Google Maps scraper side panel screenshot that drove tickets #0001–#0003. The visible offender is the bottom-edge primary CTA "Start new scrape" — three words, written confidently because nothing in the styleguide pushes back on it.

Where the styleguide currently is silent or sets a counter-example:

- [`docs/docs/styleguide/forms.md`](docs/docs/styleguide/forms.md) — no rule on button labels; the "Submit row" section shows `[Cancel] [Save changes]`.
- [`docs/docs/styleguide/dialogs.md`](docs/docs/styleguide/dialogs.md) — uses "Save", "Cancel", "Discard" in examples (good), but does not state the rule.
- [`docs/docs/styleguide/patterns/primary-action.md`](docs/docs/styleguide/patterns/primary-action.md) — examples include "Start scraping", "Enrich visible leads", "Continue" (mixed, currently leans long).
- [`docs/docs/styleguide/checklist.md`](docs/docs/styleguide/checklist.md) — Step 6 covers footer action layout but not label content.
- [`docs/docs/components/button.md`](docs/docs/components/button.md) — example labels include "Continue", "Save changes" (acceptable) but no guidance for authors.
- [`docs/docs/styleguide/anti-patterns.md`](docs/docs/styleguide/anti-patterns.md) — has 17 anti-patterns; none about copy.

For comparison, what Chromium itself uses (chrome://, downloads, bookmarks, side panel surfaces): every button I can find is one word ("Save", "Done", "Cancel", "Add", "Open", "Remove", "Sync", "Update", "Reset", "Pin", "Edit", "Share") with rare two-word exceptions ("Save changes", "Restore defaults", "Add account"). The pattern is so consistent that it qualifies as a Chromium-native fingerprint, in the same league as the toolbar-height = 56px convention or the 680px settings max-width.

## What hurts and why

Long button labels are not just a copy issue — they cascade into three structural problems:

1. **They invite full-width buttons.** A three-word label like "Start new scrape" is too wide for a content-sized button on a 360px panel without crowding adjacent controls, so the writer reaches for `fullWidth` to make it fit. (Ticket #0003 removes that escape; without an upstream rule on label length, agents will instead resize the panel or wrap the label, neither of which is Chromium-native.)
2. **They blur the verb.** "Start new scrape" buries the verb ("Start") under a noun phrase that should live elsewhere — in the panel title, in the dialog body, or in the row's secondary text. A user scanning a footer reads the first word; "Start" alone communicates the action faster than "Start new scrape".
3. **They make the screen feel like a webapp.** Verbose CTAs are a SaaS / marketing convention ("Get started for free", "Generate insights now"). They are immediate visual evidence that a surface was not built against Chromium's restraint principle.

The deeper meta-problem is the same as the other tickets in this initiative: the styleguide tells consumers to "look like Chromium", but does not enumerate the small concrete rules that make Chromium look like Chromium. Label length is one of those small concrete rules, and once stated it is easy to follow. Today it is not stated.

## Direction (not a decision)

Three plausible directions, none committed to:

1. **Prose-only rule + example sweep.** Add a "Label content" subsection to a styleguide page (probably `forms.md` and / or a new `content-style.md`), state the one-or-two-words rule with a short rationale, add a checklist item to `checklist.md`, add an anti-pattern entry ("Multi-word button labels"). Sweep existing live examples to compress labels (e.g. "Start scraping" → "Start", "Enrich visible leads" → "Enrich", "Save changes" → "Save" where the surface gives enough context). Pros: simplest; matches how content rules are usually enforced; no API change. Cons: same failure mode as Badge prose-only-rule had — agents skim, miss the rule, ship long labels anyway. The styleguide can only do so much when the API does not push back.

2. **Prose rule + dev-time soft warning.** Same as direction 1, plus a development-only console.warn in `Button` when its `children` is a single string of more than ~20 characters or more than 2 words. Pros: nudges agents and contributors at write time, not just at review time. Cons: false positives (icons-with-text composition, intentional product names, i18n strings); fragile heuristic; hard to scope to "labels for primary actions" vs. "any string in a button".

3. **Prose rule + opinionated example pass + a separate `BUTTON_LABEL_GUIDE.md`** (or a section under styleguide/ that LLMs can fetch as a single doc). Curate a list of 30–40 canonical Chromium verbs ("Save", "Cancel", "Apply", "Continue", "Open", …) so authors and agents have a vocabulary to pick from instead of inventing prose. Pros: gives agents a positive-example list, which they pattern-match against more reliably than negative rules. Cons: more docs to maintain; risk of looking prescriptive about word choice rather than length.

Working hypothesis (subject to revision when the work starts): direction 1 + the canonical-verb list from direction 3 (folded into `forms.md` or a new `content.md` page rather than a separate file). Direction 2 is appealing but probably not worth the false-positive surface for a single content rule.

## Acceptance hints

- A "Button labels" section exists in the styleguide (location decided in the work turn — likely `forms.md` or a new `content.md`) stating the rule: one word preferred, two acceptable when needed for clarity, three or more is wrong.
- The pre-flight checklist (`docs/docs/styleguide/checklist.md`) gains one item under Step 6 or a new Step: "Are all button labels one or two words? (`Save`, `Cancel`, `Add`, `Remove`, `Sync`, …)".
- An anti-pattern is added to `docs/docs/styleguide/anti-patterns.md` ("Multi-word button labels") with a wrong / right pair using the existing visual style. Wrong: "Start new scrape", "Enrich visible leads", "Save and continue". Right: "Start", "Enrich", "Save".
- A short canonical verb list (~20–40 entries) is included somewhere in the styleguide so agents can pattern-match rather than invent. The list does not need to be exhaustive — a representative sample is enough.
- Existing live examples across the styleguide and component pages are swept: any button label longer than two words is rewritten, with a brief PR note explaining what changed.
- `npm run build:docs` stays green.

## Links

- Initiative: [`../README.md`](../README.md)
- Kanban: [`../kanban.md`](../kanban.md)
- Related tickets: #0003 (drop `fullWidth` — same screenshot, intertwined symptom; the two fixes reinforce each other).
- Related ADRs: _none yet_
- Reference surfaces for label vocabulary: `chrome://settings/`, `chrome://bookmarks/`, `chrome://downloads/`, `chrome://extensions/`, the in-browser Reading Mode side panel.
- Styleguide files likely affected: `docs/docs/styleguide/forms.md`, `docs/docs/styleguide/checklist.md`, `docs/docs/styleguide/anti-patterns.md`, `docs/docs/styleguide/patterns/primary-action.md`, possibly a new `docs/docs/styleguide/content.md`.
- Component-page examples to sweep: `docs/docs/components/button.md`, anywhere a multi-word button shows up in a live preview.
