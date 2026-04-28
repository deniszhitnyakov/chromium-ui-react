---
kanban-plugin: basic
---

## To Do

- [ ] **Toggle rows: whole row clickable + row-level hover.** Native Chromium rows with a switch (`chrome://settings`, `chrome://flags`) toggle on click anywhere in the row and show a hover fill across the full row. In this library, neither `ListItem` nor `PanelRow` does either when a `Toggle` sits in `end` — click on the text does nothing, the hover affordance is wired only to the Toggle. Agents assembling "correct" pieces still ship a broken interaction. Direction (new `ToggleRow` primitive vs. enriched `ListItem` / `PanelRow` for the `end={<Toggle>}` case vs. a `<label>`-wrapping pattern) decided at implementation time; the goal is to make the broken composition the harder thing to build.

## In Progress



## Done

- [x] Drop solid Badge appearance — outline-only by design (commit `77bafca`)


