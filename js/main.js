/* Chashni Restaurant — main.js : navbar, mobile menu, sticky, scroll anim, back-to-top, active nav, smooth scroll, newsletter */
(function () {
  "use strict";

  var header = document.querySelector(".header");
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobileMenu");
  var toTop = document.getElementById("toTop");

  /* Sticky navbar + back-to-top visibility */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 30);
    if (toTop) toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile hamburger */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("open");
      });
    });
  }

  /* Active navigation state based on current page */
  var path = (window.location.pathname.split("/").pop() || "index.html").split("?")[0].split("#")[0];
  if (path === "") path = "index.html";
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    var page = a.getAttribute("data-nav");
    if (page === path || (page === "index.html" && (path === "" || path === "/"))) a.classList.add("active");
  });

  /* Smooth scrolling for in-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length > 1) {
        var el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* Back to top */
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Scroll reveal animations */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Newsletter (demo) */
  document.querySelectorAll(".newsletter").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type='email']");
      var val = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        input.focus();
        input.style.border = "1px solid #d64545";
        return;
      }
      input.value = "";
      var btn = form.querySelector("button");
      var old = btn.textContent;
      btn.textContent = "عضویت شما ثبت شد ✓";
      setTimeout(function () { btn.textContent = old; }, 2500);
    });
  });
})();
