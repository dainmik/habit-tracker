#!/usr/bin/env bash

set -e

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
    yes | pnpm -v
}

install_turbo() {
    sudo npm install turbo --global
    turbo telemetry disable
}

set_repo_workspace_root_env_var() {
	echo 'export REPO_WORKSPACE_ROOT="$PWD"' >> ~/.bashrc
	source ~/.bashrc
}

main() {
    install_node
    install_pnpm
    install_turbo

	set_repo_workspace_root_env_var
}

main
