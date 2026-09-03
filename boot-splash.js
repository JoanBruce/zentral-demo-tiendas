// Applies the cached splash logo (if boot-branding.js resolved one).
// Extracted from index.html so the CSP can drop 'unsafe-inline'.
(function () {
  try {
    var cached = window.__ERP_SPLASH_LOGO__;
    if (cached) {
      var img = document.getElementById("app-splash-logo");
      if (img) img.src = cached;
    }
  } catch {}
})();
