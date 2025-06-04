# Habit Tracker

## Getting Started

1. `pnpm install`
1. `pnpm build && pnpm preview`

## Feature Roadmap

Some important features that would improve the UX and the robostness of the app were cut to fit into the deadline:

Navigation between days:

- [ ] For each button, display indication when all/some/none habits were completed for every day
- [ ] Add option to quickly return to the currently selected day when it is no longer visible
- [ ] Upon selecting a day, scroll the selected day button into the center of the navigation
- [ ] When scrolling the navigation list, the year and month label above it should indicate what year and month currently visible date select buttons refer to

Habit list:

- [ ] Add filtering options to display or hide habits based on habit completion, active/paused status
- [ ] Add sorting options to sort by name, status, completion
- [ ] Display useful information on each habit card
  - [ ] current streak
  - [ ] message if habit scheduled to end at some point is going to end soon and functionality to extend its duration

Add/edit habit forms:

- [ ] Client-side (presentation layer) and server-side (application layer) validation for add/edit habit forms

Habit deletion:

- [ ] Show a confirmation dialog because this operation is irreversible
