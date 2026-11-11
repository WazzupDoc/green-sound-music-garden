#!/usr/bin/env python3
"""Materialize only the business-owned WebP photos already referenced by src/data/site.ts.

Every input is an existing *.webp.asset.json pointer in this repository.
Fetches those exact source photos from the project CDN, verifies content type and
WebP header, writes to public/media/greensound/. No image is synthesized or sourced
from third parties outside the existing asset manifest.
"""
import json
import hashlib
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, urlopen

SOURCE = Path("src/assets")
DEST = Path("public/media/greensound")
ALLOWED_HOST = "https://green-sound-music-garden.lovable.app"
ASSETS = [
    "scena-concert-lumini.webp",
    "dj-mc-green-sound.webp",
    "concert-public-lumini.webp",
    "hostess-evenimente.webp",
    "ursitoare-botez.webp",
    "ursitoare-botez-2.webp",
    "animatie-petreceri-copii.webp",
]
MAX_BYTES=8_000_000

def main():
    DEST.mkdir(parents=True,exist_ok=True)
    record=[]
    for filename in ASSETS:
        manifest=json.loads((SOURCE/(filename+".asset.json")).read_text(encoding="utf-8"))
        path=manifest["url"]
        if not path.startswith("/__l5e/assets-v1/") or not path.endswith("/"+filename):
            raise ValueError("Unexpected original asset path "+repr(path))
        url=urljoin(ALLOWED_HOST,path)
        req=Request(url,headers={"User-Agent":"GreenSoundMusic-asset-sync/1.0"})
        with urlopen(req,timeout=25) as response:
            mime=response.headers.get_content_type()
            data=response.read(MAX_BYTES+1)
        if mime!="image/webp" or len(data)>MAX_BYTES or not data.startswith(b"RIFF") or data[8:12]!=b"WEBP":
            raise ValueError(f"Source not valid WebP: {filename} ({mime}, {len(data)})")
        actual=len(data)
        if "size" in manifest and actual != manifest["size"]:
            raise ValueError(f"Original source byte-size changed for {filename}: {actual} vs {manifest['size']}")
        (DEST/filename).write_bytes(data)
        record.append({"filename":filename,"bytes":actual,"sha256":hashlib.sha256(data).hexdigest(),"source_asset_id":manifest["asset_id"]})
        print(f"Saved {filename} ({actual} bytes)")
    (DEST/"SOURCES.json").write_text(json.dumps({"original_project":"6f92a315-49af-4e13-a684-28cea7b6cd37","assets":record},indent=2,ensure_ascii=False)+"\n",encoding="utf-8")

if __name__=="__main__":
    main()
