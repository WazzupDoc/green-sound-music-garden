#!/usr/bin/env python3
"""Guard client bundle weight in GitHub Actions without paid tooling.

Only built public assets are inspected, not server bundles. These are
compressed byte caps from the last verified V32 build plus headroom; they
are regression guardrails, NOT simulated LCP, INP or Lighthouse results.
"""
import gzip
import sys
from pathlib import Path

ASSETS = Path(".output/public/assets")
LIMITS = {
    "index-*.js": ("Homepage entry chunk", 190_000),
    "QuoteForm-*.js": ("Client-only quote form", 50_000),
    "styles-*.css": ("Shared design-system CSS", 52_000),
}

if not ASSETS.is_dir():
    sys.exit("FAIL: expected generated client assets at .output/public/assets")

failed = False
for pattern, (label, limit) in LIMITS.items():
    matches = list(ASSETS.glob(pattern))
    if len(matches) != 1:
        print(f"FAIL: {label}: expected 1 {pattern} asset, found {len(matches)}")
        failed = True
        continue
    asset = matches[0]
    raw = asset.stat().st_size
    compressed = len(gzip.compress(asset.read_bytes(), compresslevel=9, mtime=0))
    print(f"{label}: {compressed/1000:.1f} kB gzip / {raw/1000:.1f} kB raw; cap {limit/1000:.0f} kB gzip")
    if compressed > limit:
        print(f"FAIL: {label} exceeds the approved compressed asset-size budget")
        failed = True

if failed:
    sys.exit(1)
print("PASS: client asset size guardrails; field Core Web Vitals still require real-user measurements")
