#!/usr/bin/env python3
"""Optimize portfolio images into web + full versions.

Edit JOBS below, then run:
    pip install pillow
    python optimize_images.py

Each job is: (source_path, destination_folder, slug)
The script writes:
    <destination_folder>/web/<slug>.webp
    <destination_folder>/full/<slug>.jpg
"""
from pathlib import Path
from PIL import Image

GALLERY_LONG_EDGE = 2000
FULL_LONG_EDGE = 2800
WEBP_QUALITY = 82
JPEG_QUALITY = 88

JOBS = [
    # Example:
    # ("originals/my-photo.jpg", "Images/editorial", "my-photo"),
]

def resize_long_edge(im, long_edge):
    w, h = im.size
    scale = min(1.0, long_edge / max(w, h))
    if scale == 1.0:
        return im.copy()
    return im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

def main():
    for source, dest_folder, slug in JOBS:
        source = Path(source)
        dest = Path(dest_folder)
        web_dir = dest / "web"
        full_dir = dest / "full"
        web_dir.mkdir(parents=True, exist_ok=True)
        full_dir.mkdir(parents=True, exist_ok=True)

        if not source.exists():
            print(f"[skip] {source} not found")
            continue

        im = Image.open(source).convert("RGB")
        web = resize_long_edge(im, GALLERY_LONG_EDGE)
        full = resize_long_edge(im, FULL_LONG_EDGE)
        web_path = web_dir / f"{slug}.webp"
        full_path = full_dir / f"{slug}.jpg"
        web.save(web_path, "WEBP", quality=WEBP_QUALITY, method=6)
        full.save(full_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
        print(f"[ok] {source.name} -> {web_path} ({web.width}x{web.height}) + {full_path}")

if __name__ == "__main__":
    main()
