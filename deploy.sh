#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/sveltekit-typescript-tailwind-template"

cd "$APP_DIR"

echo "[1/5] git pull"
git pull

echo "[2/5] yarn install"
yarn install --frozen-lockfile

echo "[3/5] yarn build"
yarn build

echo "[4/5] restart app"
if command -v pm2 >/dev/null 2>&1; then
	pm2 start build/index.js --name heartlink --update-env
	pm2 save
else
	# Fallback: run in background with nohup
	nohup node build/index.js > "$ROOT_DIR/heartlink.log" 2>&1 &
	echo $! > "$ROOT_DIR/heartlink.pid"
fi

echo "[5/5] done"
