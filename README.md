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

1. Clone the repository.
1. (_When not using a dev container_) Inspect and run the [scripts/setup.sh](./scripts/setup.sh) executable:
   ```sh
   ./scripts/setup.sh
   ```
1. Install packages:

   ```sh
   pnpm install
   ```

# Use

- To develop the app, run the dev script from the workspace root:

  ```sh
  turbo dev
  ```
