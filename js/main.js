/* ============================================================
   CAPCHA Photography — v2 interactions
   Vanilla JS. No dependencies.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Booking inbox (placeholder — see README) ---- */
  var BOOKING_EMAIL = "bookings@capchapics.com"; // <-- replace with real inbox

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky nav state ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navLinks.classList.remove("open");
      burger.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Portfolio filtering ---- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var cat = btn.getAttribute("data-filter");
      shots.forEach(function (shot) {
        var show = cat === "all" || shot.getAttribute("data-category") === cat;
        shot.classList.toggle("hide", !show);
        shot.classList.remove("pop");
        if (show) {
          // restart pop animation
          void shot.offsetWidth;
          shot.classList.add("pop");
        }
      });
      refreshLightboxList();
    });
  });

  /* ---- Lightbox ---- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector("img");
  var lbCap = lightbox.querySelector(".lb-cap");
  var visible = shots.slice(); // currently visible shots (updated on filter)
  var current = 0;

  function refreshLightboxList() {
    visible = shots.filter(function (s) { return !s.classList.contains("hide"); });
  }

  function openLightbox(shot) {
    refreshLightboxList();
    current = visible.indexOf(shot);
    renderLb();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function renderLb() {
    var shot = visible[current];
    if (!shot) return;
    var img = shot.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    var title = shot.querySelector(".cap h3").textContent;
    var cat = shot.querySelector(".cap p").textContent;
    lbCap.innerHTML = "<strong>" + title + "</strong> &nbsp;·&nbsp; " + cat;
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  shots.forEach(function (shot) {
    shot.addEventListener("click", function () { openLightbox(shot); });
  });

  lightbox.querySelector(".lb-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  lightbox.querySelector(".lb-prev").addEventListener("click", function (e) {
    e.stopPropagation();
    current = (current - 1 + visible.length) % visible.length;
    renderLb();
  });
  lightbox.querySelector(".lb-next").addEventListener("click", function (e) {
    e.stopPropagation();
    current = (current + 1) % visible.length;
    renderLb();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      current = (current - 1 + visible.length) % visible.length;
      renderLb();
    }
    if (e.key === "ArrowRight") {
      current = (current + 1) % visible.length;
      renderLb();
    }
  });

  /* ---- Booking form -> prefilled email ----
     Static sites can't send mail on their own. This opens the
     visitor's email client with everything filled in. For a
     backend-free form endpoint, wire up Formspree or Netlify
     Forms (see README). */
  var form = document.getElementById("bookingForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (id) { return document.getElementById(id).value.trim(); };
    var name = v("f-name"), email = v("f-email"), phone = v("f-phone");
    var type = v("f-type"), date = v("f-date"), msg = v("f-msg");

    var subject = "Booking inquiry — " + type + " — " + name;
    var body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + (phone || "—") + "\n" +
      "Session type: " + type + "\n" +
      "Preferred date: " + (date || "Flexible") + "\n\n" +
      "Details:\n" + msg;

    window.location.href =
      "mailto:" + BOOKING_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
