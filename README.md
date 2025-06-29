# Habit Tracker

A habit tracker application that helps you with tracking your habits.

## Contents

- [What is this?](#what-is-this)
- [Why does this exist?](#why-does-this-exist)
- [Overview](#overview)
- [Install](#install)
- [Use](#use)

## What is this

This is a monorepo that contains different applications and packages that together form the final application — **Habit Tracker**.

The monorepo is a **work in progress**. It hasn't been fully migrated from a single-package repository yet and some quirks are still being addressed.

## Why does this exist

The goals of this project is to:

1. explore and get familiar with [Vue](https://vuejs.org) and its ecosystem (and compare them internally to [React](https://react.dev/))
1. explore code architecture techniques and technologies that would help with project long-term maintainability if the project were a long-lived and evolving product

## Overview

The workspace-level `app` directory contains independently deployable applications:

- [Habit tracker front-end app](./apps/habit-tracker-web/README.md)
- [Habit tracker back-end app](./apps/habit-tracker-api/README.md)
- [End-to-end test suite app](./apps/habit-tracker-e2e/README.md)

The workspace-level `libs` directory contains packages that are used by the apps, as well as shared packages that may be used by other adjacent packages.

## Install

The project was tested to work on Linux and [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install). It was not tested on MacOS.

The project requires certain software to be installed. For the quickest and best results, I recommend using [Visual Studio Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/tutorial). If you're using a dev container, the required software will be installed in the dev container automatically. If you're not using a dev container, inspect and run the [scripts/setup.sh](./scripts/setup.sh) script to install the required software.

### Step 1

1. Clone the repository (preferably in a dev container).
1. (_When not using a dev container_) Inspect and run the [scripts/setup.sh](./scripts/setup.sh) executable:
   ```sh
   ./scripts/setup.sh
   ```
1. Install packages:

   ```sh
   pnpm install
   ```

### Step 2

1. Generate a local database:

   ```sh
   pnpm --filter @repo/habit-tracker-data run db-push
   ```

1. Choose "**Yes, I want to execute all statements**"

   A `local.db` file will be generated at the root of the workspace.

### Step 3

Build and run the project:

1. Run:

   ```sh
   pnpm start
   ```

1. Wait until a green checkmark appears next to the `@repo/habit-tracker-web#build` in the terminal

### Step 4

Visit http://localhost:4173 in your browser to use the app.

> NOTE: If the app is inaccessible at http://localhost:4173, navigate in the terminal to `@repo/habit-tracker-web#start` to see its log output. Once navigated to it, the app should become accessible.

## Use

### Unit tests

Unit tests can be found in [libs/habit-tracker-data/src/model/habit/domain/habit.test.ts](./libs/habit-tracker-data/src/model/habit/domain/habit.test.ts).

To run unit tests, run `pnpm --filter @repo/habit-tracker-data test-unit`

### End-2-end tests

E2E tests can be found in [apps/habit-tracker-e2e/src](./apps/habit-tracker-e2e/src).

You can run e2e tests in `dev` or in `preview` (after building the app).

#### Run E2E in Dev:

To run e2e tests in `dev`:

- run `pnpm dev`
- run `pnpm --filter @repo/habit-tracker-e2e test-e2e`

#### Run E2E in Preview:

To run e2e tests in `preview`:

- in [env/.env](./env/.env) file, change `HABIT_TRACKER_WEB_PORT` environment variable value from `5173` to `4173`
- run `pnpm start`
- run `pnpm --filter @repo/habit-tracker-e2e test-e2e`

## Other commands of interest

- `pnpm lint`
- `pnpm type-check`
