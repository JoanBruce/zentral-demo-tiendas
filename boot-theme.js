// Applies the cached theme (light/dark) before paint, avoiding a flash.
// Extracted from index.html so the CSP can drop 'unsafe-inline'.
(function () {
  try {
    var t = localStorage.getItem("zentral-theme");
    if (t === "dark") document.documentElement.classList.add("dark");
  } catch {}
})();
