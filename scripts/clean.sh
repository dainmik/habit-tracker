#!/usr/bin/env bash

set -euo pipefail

DIRS_TO_REMOVE=(
    ".turbo"
    "coverage"
    "coverage.json"
    "dist"
    "node_modules"
    "playwright-report"
    "test-results"
)

for dir in "${DIRS_TO_REMOVE[@]}"; do
    echo "Removing all instances of $dir..."
    find . -type d -name "$dir" -prune -exec rm -rf {} +
done

echo "Cleanup complete!"
