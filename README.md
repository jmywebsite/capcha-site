# CAPCHA Photography — Website v2

A dark, cinematic, premium portfolio site for **CAPCHA Photography**
(Jeremiah Smith-White). Pure static files — HTML + CSS + vanilla JS, **no
build step**, deploys anywhere.

## Preview it

Open `index.html` directly in a browser, or serve the folder locally:

```bash
cd ~/workspace/capcha-site
python3 -m http.server 8000
# then visit http://localhost:8000
```

## File layout

```
capcha-site/
├── index.html          # All content & structure (single page)
├── css/
│   └── style.css       # Full theme: colors, layout, responsive breakpoints
├── js/
│   └── main.js         # Nav, mobile menu, scroll reveals, gallery filter,
│                       # lightbox, booking form (mailto)
├── images/
│   ├── hero-bg.svg             # PLACEHOLDER — hero background
│   ├── about-jeremiah.svg      # PLACEHOLDER — about portrait
│   ├── gallery-portrait-1..3.svg   # PLACEHOLDER
│   ├── gallery-event-1..3.svg      # PLACEHOLDER
│   ├── gallery-automotive-1..3.svg # PLACEHOLDER
│   └── favicon.svg             # Real asset (gold "C" monogram)
├── PLACEHOLDERS.md     # Every image slot: what goes where, what size
└── README.md           # This file
```

## Sections

Hero → Portfolio (filterable: All / Portraits / Events / Automotive, with
lightbox viewer) → Services (6) → About → Service Areas → Booking/Contact →
Footer.

## Swapping in real photos

See **[PLACEHOLDERS.md](PLACEHOLDERS.md)** — it lists every slot with the
recommended photo type and dimensions. Short version: replace the SVGs in
`images/` with JPGs/WebP and update the `src` attributes in `index.html`.

## Before going live

1. **`js/main.js` → `BOOKING_EMAIL`**: currently `bookings@capchapics.com`
   (placeholder). Set the real inbox.
2. **Facebook links** in the booking section + footer say "coming soon" —
   drop in the real Page URL.
3. **Gallery captions** are sample titles — rename to match the real photos.
4. **Title/meta description** in `index.html` are set; add Open Graph tags if
   you want rich link previews.

## Booking form

Right now the form opens the visitor's email app with a pre-filled inquiry
(zero backend required). To make it a true one-click submit:

- **Formspree** (easiest): sign up, get an endpoint, change the form to
  `action="https://formspree.io/f/YOUR_ID" method="POST"`.
- **Netlify Forms**: deploy on Netlify and add `netlify` to the `<form>` tag.

## Deploying

It's static — any of these work, pick one:

- **Netlify**: drag the `capcha-site/` folder onto app.netlify.com/drop
  (instant), or connect a GitHub repo for auto-deploys.
- **Vercel**: `vercel` in the folder, or import a GitHub repo.
- **GitHub Pages**: push the folder to a repo → Settings → Pages → deploy
  from branch.
- **Cloudflare Pages**: connect the GitHub repo.

Then point `capchapics.com` DNS at the new host (keep the Lovable version
live until the new one is confirmed working — see the Lovable migration
notes).

## Customizing

- **Colors**: edit the `:root` variables at the top of `css/style.css`
  (`--bg`, `--accent`, etc.).
- **Fonts**: Google Fonts (Playfair Display + Inter) are loaded in
  `index.html`; if offline, it falls back to Georgia / system fonts.
- **Copy**: all text lives directly in `index.html` — search and edit.
