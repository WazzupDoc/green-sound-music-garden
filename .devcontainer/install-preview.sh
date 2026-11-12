#!/usr/bin/env bash
# Green Sound Music / one-time Codespaces dependency bootstrap.
# Match the exact Bun version used by GitHub Actions, avoiding npm's
# "Cannot read properties of null (reading 'edgesOut')" failure here.
set -euo pipefail

export PATH="$HOME/.bun/bin:$PATH"
if ! command -v bun >/dev/null 2>&1; then
  echo "Installing Bun 1.3.3 for this Codespace (CI-pinned version)..."
  curl -fsSL https://bun.sh/install | bash -s "bun-v1.3.3"
fi

echo "Bun: $(bun --version)"
bun install --no-save
echo "Green Sound Music dependencies installed. Preview port 4175 starts automatically."
