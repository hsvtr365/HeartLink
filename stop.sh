#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$ROOT_DIR/heartlink.pid"

if command -v pm2 >/dev/null 2>&1; then
	pm2 stop heartlink || true
	pm2 delete heartlink || true
	exit 0
fi

if [[ -f "$PID_FILE" ]]; then
	PID="$(cat "$PID_FILE")"
	if kill -0 "$PID" >/dev/null 2>&1; then
		kill "$PID"
		echo "Stopped PID $PID"
	else
		echo "PID $PID not running"
	fi
	rm -f "$PID_FILE"
else
	echo "No pid file found"
fi
