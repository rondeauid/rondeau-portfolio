/* Portfolio Inès Rondeau — main.js
   - Theme switcher (3 thèmes, persisté via localStorage)
   - Reveal-on-scroll via IntersectionObserver
*/

(function () {
  "use strict";

  /* ─── Theme switcher ───────────────────────────────── */
  const STORAGE_KEY = "ir-portfolio-theme";
  const VALID_THEMES = ["default", "sober", "night"];

  function applyTheme(theme) {
    if (!VALID_THEMES.includes(theme)) theme = "default";
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-switch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.theme === theme ? "true" : "false");
    });
  }

  function readTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || "default"; }
    catch (_) { return "default"; }
  }

  function setTheme(theme) {
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
  }

  // Apply BEFORE DOMContentLoaded to avoid flash
  applyTheme(readTheme());

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(readTheme());

    document.querySelectorAll(".theme-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTheme(btn.dataset.theme);
      });
    });

    /* ─── Reveal on scroll ───────────────────────────── */
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });

    document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
      observer.observe(el);
    });
  });
})();
