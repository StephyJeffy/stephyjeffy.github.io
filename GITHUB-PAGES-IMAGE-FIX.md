# GitHub Pages image fix — 26 October 2026

## Root cause
The images were in the repository, but 13 image files started with `_MG_`. When GitHub Pages uses its default Jekyll processing, assets whose filenames start with `_` can be excluded from the published output. This results in broken image placeholders despite the files being visible in GitHub.

## Changes
1. Renamed 13 image files from `_MG_*.jpg` to `mg-*.jpg` under `Images/headshots/corporate/`, `Images/portraits/bsu/`, and `Images/portraits/expressive/`.
2. Updated matching image references in `index.html` (including the full-screen lightbox versions).
3. Added the empty `.nojekyll` file at the website root to disable Jekyll processing altogether.
4. Preserved the site styling, gallery categories, and videography changes from the latest archive.

## Publish to GitHub Pages
Extract the ZIP file. Upload *the contents inside* `stephyjeffy.github.io/` to the root of your GitHub repository (same folder as `index.html`). **Do not upload the ZIP as one file or nest the folder inside the repository.** Commit the files to the branch configured under Settings > Pages.

Make sure `.nojekyll` is uploaded too. After publishing, hard refresh with Ctrl+Shift+R (or open an incognito window). The updated files use `mg-` filenames. You may delete old `_MG_*.jpg` files from the repo, but they will not affect the fixed site if left in place.

## Revised image paths
- `Images/headshots/corporate/_MG_5401.jpg` => `Images/headshots/corporate/mg-5401.jpg`
- `Images/headshots/corporate/_MG_5408.jpg` => `Images/headshots/corporate/mg-5408.jpg`
- `Images/headshots/corporate/_MG_5434.jpg` => `Images/headshots/corporate/mg-5434.jpg`
- `Images/headshots/corporate/_MG_5456.jpg` => `Images/headshots/corporate/mg-5456.jpg`
- `Images/headshots/corporate/_MG_5463.jpg` => `Images/headshots/corporate/mg-5463.jpg`
- `Images/headshots/corporate/_MG_5470.jpg` => `Images/headshots/corporate/mg-5470.jpg`
- `Images/headshots/corporate/_MG_5506.jpg` => `Images/headshots/corporate/mg-5506.jpg`
- `Images/portraits/bsu/_MG_5099.jpg` => `Images/portraits/bsu/mg-5099.jpg`
- `Images/portraits/bsu/_MG_5124.jpg` => `Images/portraits/bsu/mg-5124.jpg`
- `Images/portraits/bsu/_MG_5131.jpg` => `Images/portraits/bsu/mg-5131.jpg`
- `Images/portraits/bsu/_MG_5134.jpg` => `Images/portraits/bsu/mg-5134.jpg`
- `Images/portraits/bsu/_MG_5141.jpg` => `Images/portraits/bsu/mg-5141.jpg`
- `Images/portraits/expressive/_MG_4685.jpg` => `Images/portraits/expressive/mg-4685.jpg`
