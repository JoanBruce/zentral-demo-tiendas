// Applies cached branding (brand color + splash logo) before paint, avoiding a
// flash of the default brand. Extracted from index.html so the CSP can drop
// 'unsafe-inline'. Must run before boot-splash.js (it sets __ERP_SPLASH_LOGO__).
(function () {
  try {
    var raw = localStorage.getItem("erp_cached_branding");
    if (!raw) return;
    var branding = JSON.parse(raw);
    var hex = branding.accentColor || branding.sidebarColor;
    var s = document.documentElement.style;
    if (branding.sidebarColor) s.setProperty("--splash-bg", branding.sidebarColor);
    // Loading logo = favicon (ZEN branding). The <img> fallback below is the
    // square mark, same default as the favicon, ideal for 96x96.
    window.__ERP_SPLASH_LOGO__ = branding.faviconUrl || null;
    if (!hex || typeof hex !== "string") return;
    var h = hex.replace("#", "");
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return;
    function c(v) { return Math.max(0, Math.min(255, Math.round(v))); }
    function ch(r, g, b) { return c(r) + " " + c(g) + " " + c(b); }
    s.setProperty("--brand-400", ch(r + (255 - r) * 0.25, g + (255 - g) * 0.25, b + (255 - b) * 0.25));
    s.setProperty("--brand-500", ch(r, g, b));
    s.setProperty("--brand-600", ch(r * 0.88, g * 0.88, b * 0.88));
    s.setProperty("--brand-700", ch(r * 0.78, g * 0.78, b * 0.78));
    // Text over brand: ink over light brand, white over dark brand (sRGB luminance)
    function lin(v) { var x = v / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }
    var lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    s.setProperty("--brand-fg", lum > 0.45 ? "11 11 12" : "255 255 255");
    var isDark = document.documentElement.classList.contains("dark");
    s.setProperty("--brand-soft", isDark
      ? ch(23 + (r - 23) * 0.15, 23 + (g - 23) * 0.15, 23 + (b - 23) * 0.15)
      : ch(r + (255 - r) * 0.88, g + (255 - g) * 0.88, b + (255 - b) * 0.88));
  } catch {}
})();
