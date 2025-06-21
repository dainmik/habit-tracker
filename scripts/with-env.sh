#!/usr/bin/env bash

set -euo pipefail

ENV_FILE=$1
shift

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: .env file '$ENV_FILE' not found."
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

exec "$@"
