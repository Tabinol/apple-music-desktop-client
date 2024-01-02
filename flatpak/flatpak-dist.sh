#!/bin/sh

PACKAGE_VERSION=`node -p "require('./package.json').version"`

cd "`dirname "$0"`"

flatpak-builder build me.tabinol.apple-music-desktop-client.yml --repo=repo --force-clean
mkdir -p ../dist
flatpak build-bundle repo ../dist/apple-music-desktop-client-${PACKAGE_VERSION}.flatpak me.tabinol.apple-music-desktop-client
