#!/usr/bin/env python3
"""Build/check Green Sound V19 static preview bundles deterministically.
Run: python3 .github/scripts/build_gs_v19.py --write
CI:  python3 .github/scripts/build_gs_v19.py --check
Source files are retained, to avoid editing opaque minified blobs.
"""
from pathlib import Path
import argparse
import re
import sys

ASSETS=Path("public/greensound-prototype/assets")
CSS=["site.css","v15.css","v16.css","v17.css","v18.css","v19.css"]
JS=["v17.js","v18.js","site.js","v19.js"]

def css_bundle():
    imports=[]
    styles=[]
    for name in CSS:
        raw=(ASSETS/name).read_text(encoding="utf-8")
        def extract(match):
            value=match.group(0)
            if value not in imports:
                imports.append(value)
            return ""
        raw=re.sub(r"@import\s+url\([^)]+\);",extract,raw)
        styles.append("\n/* --- "+name+" --- */\n"+raw)
    return ("/* V19 compiled production-minded preview CSS: source files retained for editing. */\n"
            +"\n".join(imports)+"\n"+"\n".join(styles))

def js_bundle():
    scripts=[]
    for name in JS:
        scripts.append("\n/* --- "+name+" --- */\n"+(ASSETS/name).read_text(encoding="utf-8"))
    return ("/* GREEN SOUND MUSIC V19 optimized preview JavaScript. Sources remain editable. */\n"
            +"\n".join(scripts))

def main():
    parser=argparse.ArgumentParser()
    group=parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--write",action="store_true")
    group.add_argument("--check",action="store_true")
    args=parser.parse_args()
    bundles={"gs-v19.bundle.css":css_bundle(),"gs-v19.bundle.js":js_bundle()}
    stale=[]
    for name,data in bundles.items():
        path=ASSETS/name
        if args.write:
            path.write_text(data,encoding="utf-8")
            print(f"Built {path}: {len(data.encode('utf-8'))} bytes")
        elif not path.exists() or path.read_text(encoding="utf-8")!=data:
            stale.append(name)
    if stale:
        print("Outdated preview bundles:",", ".join(stale),file=sys.stderr)
        print("Run python3 .github/scripts/build_gs_v19.py --write",file=sys.stderr)
        return 1
    if args.check:
        print("PASS: V19 CSS+JS bundles match source files")
    return 0

if __name__=="__main__":
    raise SystemExit(main())
