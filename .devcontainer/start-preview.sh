#!/usr/bin/env bash
# Preview only. Does not deploy or update greensoundmusic.com.
set -euo pipefail

if curl --silent --fail --max-time 2 http://127.0.0.1:4175/ >/dev/null; then
  echo "Green Sound Music preview is already running on port 4175."
  exit 0
fi

export PATH="$HOME/.bun/bin:$PATH"
if ! command -v bun >/dev/null 2>&1; then
  echo "Bun is missing. Run bash .devcontainer/install-preview.sh first."
  exit 1
fi
nohup bunx vite dev --host 0.0.0.0 --port 4175 > /tmp/green-sound-preview.log 2>&1 < /dev/null &
echo "Started Green Sound Music V48 preview on forwarded port 4175."
echo "The webpage will open from the Codespaces PORTS panel when the dev server is ready."
