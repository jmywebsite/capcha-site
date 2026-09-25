# Image Placeholders — CAPCHA Photography v2

Every image on the site is currently a gradient **SVG placeholder**, clearly
marked with a `PLACEHOLDER` badge in the top-left corner and a
`data-placeholder="true"` attribute on its `<img>` tag.

Swap each one for a real photo by replacing the file (or updating the `src`).
Keep the same aspect ratio so the layout doesn't shift.

| # | File | Used in | Slot | Recommended real photo | Suggested size |
|---|------|---------|------|------------------------|----------------|
| 1 | `images/hero-bg.svg` | Hero (full-bleed background) | Your strongest cinematic wide shot — night portrait or car at night | JPG/WebP, landscape | 1920×1080 or larger |
| 2 | `images/about-jeremiah.svg` | About section | Portrait of Jeremiah (behind the camera or headshot) | JPG/WebP, portrait 9:11 | 900×1100 |
| 3 | `images/gallery-portrait-1.svg` | Portfolio → Portraits | Best portrait work | JPG/WebP, 4:5 portrait | 800×1000+ |
| 4 | `images/gallery-portrait-2.svg` | Portfolio → Portraits | Best portrait work | JPG/WebP, 4:5 portrait | 800×1000+ |
| 5 | `images/gallery-portrait-3.svg` | Portfolio → Portraits | Best portrait work | JPG/WebP, 4:5 portrait | 800×1000+ |
| 6 | `images/gallery-event-1.svg` | Portfolio → Events | Event / nightlife coverage | JPG/WebP, 4:5 portrait | 800×1000+ |
| 7 | `images/gallery-event-2.svg` | Portfolio → Events | Event / nightlife coverage | JPG/WebP, 4:5 portrait | 800×1000+ |
| 8 | `images/gallery-event-3.svg` | Portfolio → Events | Event / nightlife coverage | JPG/WebP, 4:5 portrait | 800×1000+ |
| 9 | `images/gallery-automotive-1.svg` | Portfolio → Automotive | Car / automotive work | JPG/WebP, 4:5 portrait | 800×1000+ |
| 10 | `images/gallery-automotive-2.svg` | Portfolio → Automotive | Car / automotive work | JPG/WebP, 4:5 portrait | 800×1000+ |
| 11 | `images/gallery-automotive-3.svg` | Portfolio → Automotive | Car / automotive work | JPG/WebP, 4:5 portrait | 800×1000+ |
| 12 | `images/favicon.svg` | Browser tab icon | **Real asset — not a placeholder.** Gold "C" monogram on dark. Keep as-is. | — | — |

## How to swap

**Option A — same filename (easiest):**
Export your photo as a JPG with the *exact same name* (e.g. replace
`gallery-portrait-1.svg` with `gallery-portrait-1.jpg`), then update the one
`src` in `index.html` from `.svg` to `.jpg`.

**Option B — new filename:**
Drop the photo into `images/` and update the matching `<img src="...">` in
`index.html`. Remove the `data-placeholder="true"` attribute and update the
`alt` text to describe the real photo.

## Adding more gallery shots

Copy any existing `<figure class="shot">` block in `index.html`, change
`data-category` to `portraits`, `events`, or `automotive`, point `src` at the
new file, and update the caption. The filter, grid, and lightbox pick it up
automatically — no JS changes needed.

## Other placeholders (non-image)

- **Booking email:** `BOOKING_EMAIL` at the top of `js/main.js` is set to
  `bookings@capchapics.com` — replace with the real inbox.
- **Facebook link:** booking section + footer link to `#booking` with a
  "coming soon" note — replace with the real Facebook Page URL when ready.
- **Gallery captions:** titles like "Golden Hour Study" are sample text —
  rename to match the real photos.
