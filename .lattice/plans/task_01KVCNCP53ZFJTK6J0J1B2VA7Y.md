# FRAC-230 — Clean unreferenced files from public/

Verified by exact-basename grep across src/index.html/scripts/config (stem
search gave false positives for generic words like "texture"/"mandelbrot").

DELETE (0 exact references anywhere):
- public/images/fractal-tech-hub.png  (~7 MB)
- public/images/merlins-place.png     (~3.5 MB)
- public/images/merlins-coworking.png (~2.2 MB)
- public/images/skyline.png           (~1.4 MB)
- public/images/texture.png           (~1.1 MB)
- public/images/mandelbrot.png        (Mandelbrot decorations are inline SVG components)
- public/images/mandelbrot.svg
- public/opengraph.jpg                 (no og:image/twitter:image meta exists in index.html)

KEEP (referenced): fractal-university.png, fractal-nyc-diagram.png, hero-bg.png,
all banners/, campus/, hero/, story/ assets, favicons.

Acceptance: only unreferenced files removed; typecheck stays green; git
preserves history for restore. Complexity: low.
