## Code Review
- **Date:** 2026-03-13 21:30 EST
- **Model:** Claude Opus 4.6 (claude-opus-4-6)
- **Branch:** master
- **Latest Commit:** 78fcdd9
- **Linear Story:** N/A (no story ID in branch name)
---

## Test Results

- **TypeScript typecheck:** PASS (0 errors)
- **Lint:** No lint script configured
- **Tests:** No test script configured

No blockers from automated checks.

## What This Branch Does

This branch makes three sets of changes to the Fractal NYC community website hero section:

### Commit 1: `06d089f` — Font & Typography Overhaul
Replaces the header font from Instrument Serif to **Jacquard 24** (Google Fonts). Splits the hero heading into two separate elements: "Fractal" (h1, oversized Jacquard 24) and "Collective" (p, smaller monospace). Updates both the CSS `@import` and `index.html` font link.

### Commit 2: `897b0a6` — Asset Commit
Adds attached assets (photos, video recording) and a canvas asset. No source code changes.

### Commit 3: `78fcdd9` — Hero Visual Enhancement
Replaces the old static `hero-abstract.png` background with:
1. A **3D fractal icosahedron** (three.js/R3F) centered in the hero, with a photo texture sphere core and slowly rotating wireframe layers
2. An **SVG skyline silhouette** with 3 depth layers (far/mid/near) providing an NYC skyline backdrop
3. A cream-colored `textShadow` on the hero text container for readability against the new visual elements

```
Hero section rendering order (z-index):
  z-[1]  FractalCityScene (Canvas with 3D fractal object)
  z-[2]  SkylineSilhouette (SVG, bottom 38% of viewport)
  z-10   Text content (with text-shadow for readability)
```

## Review Items

### Blockers

None.

### Important

1. **Dead code: `Skyline.tsx` is never imported** — `artifacts/fractal-nyc/src/components/three/Skyline.tsx` exports `Skyline` and `Building` but is never imported anywhere in the codebase. This appears to be an earlier 3D skyline attempt that was replaced by the SVG `SkylineSilhouette.tsx`. Should be deleted to avoid confusion. ✅ Confirmed

2. **Missing `ErrorBoundary` around 3D content** — The `FractalCityScene` is wrapped in `<Suspense>` (good), but there's no `ErrorBoundary`. If WebGL initialization fails (unsupported browser, GPU blacklist, mobile limitations), the Canvas will throw and crash the entire page. An ErrorBoundary wrapping the Suspense would allow graceful degradation to the cream background. ✅ Confirmed

3. **SVG gradient IDs are globally scoped** — `SkylineSilhouette.tsx` uses generic gradient IDs like `skyBg`, `buildFar`, `buildMid`, `buildNear`. If any other SVG on the page uses the same IDs, they'll collide. Since this is currently the only SVG, this is low-risk but worth namespacing (e.g., `skyline-skyBg`). ⬇️ Lower priority — only one SVG currently

4. **Duplicate font loading** — Jacquard 24 is loaded twice: once via the CSS `@import` in `index.css:1` and once via the `<link>` tag in `index.html:9`. Only one is needed. The CSS `@import` already loads both Instrument Sans and Jacquard 24. The `<link>` tag in `index.html` only loads Jacquard 24 without Instrument Sans. Remove the `index.html` link tag — the CSS import handles everything. ✅ Confirmed

5. **`hero-abstract.png` is now unreferenced but still in `/public/images/`** — The old background image was replaced by the 3D scene, but the file remains on disk. Minor disk waste. ⬇️ Lower priority

### Potential

6. **Performance: `Building` component creates a `new THREE.Color()` and `.lerp()` on every render** — In `Skyline.tsx:17`, each Building creates and lerps colors during render. However, since `Skyline.tsx` is dead code (see #1), this is moot. If the component is ever revived, the color computation should be memoized. ❓ Moot (dead code)

7. **3D scene on mobile: no reduced-motion or performance tier handling** — The continuously animating fractal (`useFrame` in `FractalObject.tsx:64-68`) runs at full frame rate on all devices. Consider respecting `prefers-reduced-motion` media query and potentially skipping the 3D scene entirely on low-end mobile. ⬇️ Lower priority — nice-to-have for accessibility

8. **`FractalObject` vertex deduplication uses string hashing** — `FractalObject.tsx:54` uses `.toFixed(2)` string keys for dedup. This works correctly for icosahedron vertices, but the 2-decimal precision means vertices within 0.01 of each other would be incorrectly merged. Fine for the current geometry. ⬇️ Lower priority — works correctly for this use case

9. **Inline `textShadow` style on Hero container** — `Hero.tsx:20` applies `textShadow` via inline `style` rather than a Tailwind utility or CSS class. This is fine functionally but makes it harder to adjust via responsive breakpoints or dark mode. ⬇️ Lower priority

10. **Large binary assets committed** — `hero-bg.png` (1.4MB), `image_1773445250532.png` (1.3MB), attached MP4 (7.4MB). These inflate the git history permanently. Consider using Git LFS for large binaries, or at minimum compressing the PNG images. ⬇️ Lower priority for a community website

## Summary

The branch adds a visually rich hero section with a 3D fractal element, SVG skyline, and new typography. The code is well-structured with good use of lazy loading and Suspense for the heavy three.js bundle. TypeScript types are clean.

**Key actions:**
- Delete the dead `Skyline.tsx` file (#1)
- Add an ErrorBoundary around the 3D scene (#2)
- Remove the duplicate font `<link>` tag from `index.html` (#4)
