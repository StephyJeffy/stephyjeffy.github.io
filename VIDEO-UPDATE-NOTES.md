# Videography portfolio update — October 26, 2026

- Embedded the supplied video `https://youtu.be/-TQRYiD5jhk` into the site's existing Video / Creative gallery, replacing the non-functional Creative Project placeholder.
- Preserved the existing video-card styling, click-to-play modal, video filters, navigation, and the featured film placement.
- Added a direct YouTube link as a fallback in case the video owner or viewer settings disallow embedding.
- The video's title was not verifiable from the available public lookup. The HTML uses `Video Project` as a temporary label and attempts to update the name from public YouTube oEmbed metadata when the site loads. If YouTube restricts that request, the temporary title remains; it can be replaced directly in `index.html` after confirming the exact title.
- The remaining Tech Promo and Cinematic Work cards are still marked Coming Soon, but are now non-interactive so they no longer try to load nonexistent YouTube videos.
- The filter count now reports published, playable videos (four) rather than including upcoming previews.
- No video content is downloaded or self-hosted. Playback depends on the original YouTube upload being publicly accessible and embeddable.
- This is a local updated copy; the live GitHub Pages site has not been deployed/modified.
