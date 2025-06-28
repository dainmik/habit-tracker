#!/usr/bin/env bash

set -euxo pipefail

install_node() {
    TEMP_DIR=$(mktemp -d)
    NODE_SETUP_SCRIPT="$TEMP_DIR/nodesource_setup.sh"
    echo "Downloading Node.js setup script..."
    curl -fsSL https://deb.nodesource.com/setup_24.x -o "$NODE_SETUP_SCRIPT"
    sudo bash "$NODE_SETUP_SCRIPT"
    rm "$NODE_SETUP_SCRIPT"
    sudo apt-get update
    sudo apt-get install -y nodejs
}

install_pnpm() {
    # See: https://pnpm.io/installation#using-corepack
    sudo npm install --global corepack@latest
    corepack enable pnpm
	# We use `set -e` to cause the script to exit immediately if any command fails.
	# When `pnpm -v` finishes, `yes` receives SIGPIPE when it tries to write
	# to the now-closed pipe. This causes `yes` to exit with non-zero status
	# due to broken pipe, which triggers `set -e` and makes the whole script exit.
	#
	# `pnpm -v || true` means: if command returns non-zero exit code, run true, which
	# always returns zero exit code.
    yes | pnpm -v || true
}

install_turbo() {
    sudo npm install turbo --global
    turbo telemetry disable
}

set_repo_workspace_root_env_var() {
	echo 'export REPO_WORKSPACE_ROOT="$PWD"' >> ~/.bashrc
	source ~/.bashrc
}

install_dependencies() {
	pnpm install
	pnpm --filter=@repo/habit-tracker-e2e run bootstrap
}

main() {
    install_node
    install_pnpm
    install_turbo

	set_repo_workspace_root_env_var
	install_dependencies
}

main
