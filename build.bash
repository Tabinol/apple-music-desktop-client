#!/bin/bash

# Install packages
cd "$(dirname "$0")"
yarn install

# Build flatpak
cd flatpak
flatpak-node-generator yarn ../yarn.lock
flatpak-builder build me.tabinol.apple-music-desktop-client.yml --force-clean --repo=repo
mkdir -p ../target
flatpak build-bundle repo ../target/apple-music-desktop-client.flatpak me.tabinol.apple-music-desktop-client
