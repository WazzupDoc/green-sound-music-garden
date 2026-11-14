#!/usr/bin/env python3
"""Own-channel YouTube film posters for the V21 Director's Cut reel.

Only downloads preview stills of Green Sound Music videos already catalogued
in src/data/site.ts. Never downloads, edits or strips anything from the videos
themselves. Optimizes to first-party WebP for sharp, fast, click-to-play posters.
"""
from pathlib import Path
from io import BytesIO
from urllib.request import Request, urlopen
import hashlib
import json

from PIL import Image

VIDEO_IDS = {
    "nunta-ramada": "37QlXW3NlxU",
    "show-lumini": "eGLykw1G0EQ",
    "studio-live": "nc_aWk8QPIU",
}
DEST = Path("public/media/greensound")
MAX_BYTES = 5_000_000

def get_poster(vid):
    last_error = "No valid poster"
    for variant in ("maxresdefault", "sddefault", "hqdefault"):
        url = f"https://i.ytimg.com/vi/{vid}/{variant}.jpg"
        try:
            request = Request(url,headers={"User-Agent":"Mozilla/5.0"})
            with urlopen(request,timeout=15) as response:
                if response.headers.get_content_type() != "image/jpeg":
                    continue
                raw=response.read(MAX_BYTES+1)
            if len(raw)>MAX_BYTES: continue
            img=Image.open(BytesIO(raw)); img.load()
            w,h=img.size
            # YouTube returns a very small 'no thumbnail' placeholder for
            # unsupported sizes. Do not upscale this.
            if w < 480 or h < 270: continue
            return img.convert("RGB"),url,variant
        except Exception as ex:
            last_error = str(ex)
    raise RuntimeError(f"No real preview available for {vid}: {last_error}")

def main():
    DEST.mkdir(parents=True,exist_ok=True)
    manifest=[]
    for name,vid in VIDEO_IDS.items():
        image,url,variant=get_poster(vid)
        path=DEST/f"film-{name}.webp"
        image.save(path,"WEBP",quality=83,method=6)
        raw=path.read_bytes()
        manifest.append({"filename":path.name,"youtube_video_id":vid,
                         "source":url,"variant":variant,
                         "original_dimensions":[image.width,image.height],
                         "bytes":len(raw),"sha256":hashlib.sha256(raw).hexdigest()})
        print(f"{name}: original={image.width}x{image.height}, {len(raw)} bytes, {variant}")
    (DEST/"FILM-POSTERS.json").write_text(json.dumps({"origin":"Green Sound Music public video thumbnails",
       "assets":manifest},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

if __name__=="__main__":
    main()
