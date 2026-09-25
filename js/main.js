/* ============================================================
   CAPCHA Photography — v3 interactions
   Vanilla JS. No dependencies.
   To wire in real photos: replace the `src` values in GALLERY
   with your image paths and update titles/captions.
   ============================================================ */

// ---------- gallery data ----------
const GALLERY = [
  { src: 'images/nl-1.svg', cat: 'nightlife',  size: 'wide', title: 'Neon Pulse',        tag: 'Downtown Sacramento — Club Set' },
  { src: 'images/nl-2.svg', cat: 'nightlife',  size: 'tall', title: 'After Hours',       tag: 'DJ Booth — Late Set' },
  { src: 'images/nl-3.svg', cat: 'nightlife',  size: 'std',  title: 'Laser Dreams',      tag: 'Festival Stage — Main Room' },
  { src: 'images/nl-4.svg', cat: 'nightlife',  size: 'tall', title: 'Midnight Crowd',    tag: 'Sold-Out Night — Live' },
  { src: 'images/ev-1.svg', cat: 'events',     size: 'wide', title: 'Golden Hour Gala',  tag: 'Napa Valley — Private Event' },
  { src: 'images/ev-2.svg', cat: 'events',     size: 'std',  title: 'Brand Launch',      tag: 'Bay Area — Activation' },
  { src: 'images/ev-3.svg', cat: 'events',     size: 'tall', title: 'The Toast',         tag: 'Vacaville — Celebration' },
  { src: 'images/au-1.svg', cat: 'automotive', size: 'wide', title: 'Midnight GT',       tag: 'Studio Cut — Night Series' },
  { src: 'images/au-2.svg', cat: 'automotive', size: 'std',  title: 'Street Spec',       tag: 'Bay Cruise — Rolling' },
  { src: 'images/po-1.svg', cat: 'portraits',  size: 'tall', title: 'Editorial Study',   tag: 'Natural Light — Portrait' },
  { src: 'images/po-2.svg', cat: 'portraits',  size: 'std',  title: 'Neon Portrait',     tag: 'City Lights — Night Series' },
];

const galleryEl = document.getElementById('gallery');
let visibleItems = [];

function renderGallery(filter) {
  galleryEl.innerHTML = '';
  visibleItems = GALLERY.filter(g => g.cat === filter);
  visibleItems.forEach((g, i) => {
    const tile = document.createElement('div');
    tile.className = `tile ${g.size}`;
    tile.innerHTML = `
      <img src="${g.src}" alt="${g.title} — ${g.tag}" loading="lazy">
      <div class="tile-cap"><span>${g.cat}</span><strong>${g.title}</strong></div>`;
    tile.addEventListener('click', () => openLightbox(i));
    galleryEl.appendChild(tile);
    // stagger the entrance
    setTimeout(() => tile.classList.add('show'), 60 * i);
  });
}

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

// ---------- lightbox ----------
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
let lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  updateLightbox();
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function updateLightbox() {
  const g = visibleItems[lbIndex];
  lbImg.src = g.src;
  lbImg.alt = `${g.title} — ${g.tag}`;
  lbCap.innerHTML = `<strong>${g.title}</strong>${g.tag}`;
}
function stepLightbox(d) {
  lbIndex = (lbIndex + d + visibleItems.length) % visibleItems.length;
  updateLightbox();
}
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); stepLightbox(-1); });
document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); stepLightbox(1); });
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

// ---------- nav + sticky book ----------
const nav = document.getElementById('nav');
const stickyBook = document.getElementById('stickyBook');
const heroEl = document.querySelector('.hero');
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  const past = window.scrollY > heroEl.offsetHeight * 0.7;
  const nearBook = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
  stickyBook.classList.toggle('show', past && !nearBook);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- cursor glow (desktop) ----------
const glow = document.getElementById('cursorGlow');
let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
(function follow() {
  gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08;
  glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
  requestAnimationFrame(follow);
})();

// ---------- booking form -> mailto ----------
const BOOKING_EMAIL = 'bookings@capchapics.com'; // TODO: confirm real inbox
document.getElementById('bookForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = encodeURIComponent(`Booking inquiry — ${f.get('type')} (${f.get('name')})`);
  const body = encodeURIComponent(
    `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nPhone: ${f.get('phone') || '—'}\n` +
    `Preferred date: ${f.get('date') || '—'}\nSession type: ${f.get('type')}\n\nProject details:\n${f.get('details')}`
  );
  window.location.href = `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`;
});

// ---------- init ----------
renderGallery('nightlife');
