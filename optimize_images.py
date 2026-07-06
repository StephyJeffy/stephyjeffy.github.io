#!/usr/bin/env python3
"""
optimize_images.py
-------------------
Batch-resizes and converts your real photos into the WebP files this site
expects, and prints the exact <img> width/height attributes to paste into
index.html once you've dropped your real graduation photos in.

USAGE
  1. Put your original, full-resolution graduation photos in:
       Images/graduation/full/
     Name them however you like for now (e.g. IMG_1234.jpg).

  2. Edit the MAPPING list below so each source file points at the slug
     used in index.html (graduation-01-reflection, graduation-02-champagne-
     explosion, etc.) — the slugs already match what's wired up on the site.

  3. Run:
       pip install pillow
       python3 optimize_images.py

  This creates:
     Images/graduation/web/<slug>.webp   -> long edge ~2000px, used in the grid
     Images/graduation/full/<slug>.jpg   -> long edge ~2800px, used by the
                                             lightbox when you click a photo

  It also prints the width="" height="" values to paste into index.html so
  the <img> tags match your real files exactly (prevents layout shift).

You can reuse this same script for the two portal hero images — just add
them to MAPPING with folder="Images/portal" and no "full" output needed.
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Run: pip install pillow --break-system-packages")

# Long-edge targets per the brief:
GALLERY_LONG_EDGE = 2000   # 1800-2200px range for gallery images
HERO_LONG_EDGE = 2400      # for hero/portal images
FULL_LONG_EDGE = 2800      # slightly larger, used only when lightbox opens
WEBP_QUALITY = 82
JPEG_QUALITY = 85

# ── Edit this mapping to match your real source files ──
# (source filename in Images/graduation/full/, target slug used in index.html)
# Note: graduation-06 and graduation-10 are already filled with real photos
# (the library portrait and flag-stole photo you uploaded) — no need to add them here.
MAPPING = [
    ("REPLACE_ME_reflection.jpg",          "graduation-01-reflection"),
    ("REPLACE_ME_champagne_explosion.jpg", "graduation-02-champagne-explosion"),
    ("REPLACE_ME_champagne_spray.jpg",     "graduation-03-champagne-spray"),
    ("REPLACE_ME_suit_walking.jpg",        "graduation-04-suit-walking"),
    ("REPLACE_ME_lion_ride.jpg",           "graduation-05-lion-ride"),
    ("REPLACE_ME_lion_sitting.jpg",        "graduation-07-lion-sitting"),
    ("REPLACE_ME_lion_wide.jpg",           "graduation-08-lion-wide"),
    ("REPLACE_ME_campus_flags.jpg",        "graduation-09-campus-flags"),
]

SRC_DIR = Path("Images/graduation/full")
WEB_DIR = Path("Images/graduation/web")


def resize_long_edge(im, long_edge):
    w, h = im.size
    if w >= h:
        new_w = long_edge
        new_h = round(h * (long_edge / w))
    else:
        new_h = long_edge
        new_w = round(w * (long_edge / h))
    if new_w >= w and new_h >= h:
        return im  # don't upscale
    return im.resize((new_w, new_h), Image.LANCZOS)


def main():
    WEB_DIR.mkdir(parents=True, exist_ok=True)
    SRC_DIR.mkdir(parents=True, exist_ok=True)

    results = []
    for src_name, slug in MAPPING:
        src_path = SRC_DIR / src_name
        if not src_path.exists():
            print(f"  [skip] {src_path} not found — update MAPPING or add the file")
            continue

        im = Image.open(src_path).convert("RGB")

        # Gallery / web version (WebP)
        web_im = resize_long_edge(im, GALLERY_LONG_EDGE)
        web_path = WEB_DIR / f"{slug}.webp"
        web_im.save(web_path, "WEBP", quality=WEBP_QUALITY, method=6)

        # Slightly larger full version for the lightbox (JPEG, widely supported)
        full_im = resize_long_edge(im, FULL_LONG_EDGE)
        full_path = SRC_DIR / f"{slug}.jpg"
        full_im.save(full_path, "JPEG", quality=JPEG_QUALITY, optimize=True)

        results.append((slug, web_im.size))
        print(f"  [ok] {src_name} -> {web_path.name} ({web_im.size[0]}x{web_im.size[1]}) "
              f"+ {full_path.name}")

    if results:
        print("\nPaste these width/height values into index.html if they differ from the placeholders:\n")
        for slug, (w, h) in results:
            print(f'  {slug}: width="{w}" height="{h}"')


if __name__ == "__main__":
    main()
