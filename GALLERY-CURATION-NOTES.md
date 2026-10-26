# Gallery refinement (October 2026)

This revision is based on the user's visual feedback after reviewing the updated galleries.

## Events / Lifestyle
- Eight Tampa Bay Chamber corporate event photos lead the gallery.
- Only two pool-event storytelling photos remain here: `mg-0849-1.jpg` (group in pool) and `temp-1.jpg` (grilling).
- Poolside portraits, candid close-ups, and the hotdog portrait have been recategorized.
- `mg-0307-1.jpg` (food detail) is kept as an asset, but not shown in the gallery.

## Portraits / Editorial
- Pool portraits are predominantly Portraits, with the strongest stylized images shared with Editorial.
- The hotdog image (`Images/lifestyle/mg-9816.jpg`) belongs to **both Portraits and Editorial**.
- The SGU stairway group (`Images/portraits/sgu/sgu_group.webp`) belongs to **both Editorial and Portraits**, never Events.
- The solo SGU staircase portrait (`Images/portraits/sgu/aubrey.webp`) was removed from the gallery at the user's request; the original file remains.
- `data-cat` specifies the primary category and `data-cats` provides optional multi-category filtering without duplicating an image.

## All Work
- A deliberately ordered 26-image highlights gallery balances cinematic work, portraits, professional headshots, graduation, and corporate events.
- Athletic editorial/detail photographs appear near the end, and live match action is **last**.
- Any future changes to highlighted photographs should preserve the sense of visual progression.

## How filters work
The JavaScript in `main.js` uses `data-featured=true` for **All Work** and checks `data-cats` (if present), or `data-cat`, for individual filters. All existing lightbox behavior is retained.
