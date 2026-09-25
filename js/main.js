/* CAPCHA Photography — v4 interactions. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  /* Nav scroll state */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { links.classList.remove("open"); });
  });

  /* Reveal on scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".tile, .cell, .presets-inner, .about p, .book form").forEach(function (el) {
    el.classList.add("reveal");
    io.observe(el);
  });

  /* Lightbox */
  var cells = Array.prototype.slice.call(document.querySelectorAll(".cell img"));
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var idx = 0;

  function show(i) {
    idx = (i + cells.length) % cells.length;
    lbImg.src = cells[idx].src;
    lbImg.alt = cells[idx].alt;
  }
  function open(i) {
    show(i);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  cells.forEach(function (img, i) {
    img.parentElement.addEventListener("click", function () { open(i); });
  });
  document.getElementById("lbClose").addEventListener("click", close);
  document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
  document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  /* Booking form -> email */
  document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var subject = "Booking request — " + (f.type.value || "shoot");
    var body = "Name: " + f.name.value + "\nEmail: " + f.email.value +
      "\nDate: " + f.date.value + "\nType: " + f.type.value +
      "\n\nDetails:\n" + f.details.value;
    window.location.href = "mailto:bookings@capchapics.com?subject=" +
      encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  /* Footer year */
  document.getElementById("yr").textContent = new Date().getFullYear();
})();
