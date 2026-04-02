# Handoff: Interactive WebGL Hero → fractal-nyc

## What Was Built

A working prototype of an interactive 3D hero for the Fractal NYC site. The original Three.js/R3F icosahedron hero (which was replaced by a Sierpinski ASCII art hero in PR #5) has been restored and made interactive.

**Prototype repo:** `~/Documents/dev/fractal-nyc-3dprototype/` (copy of fractal-nyc, independent)
**Commit:** `cd027c0` on `master`

## Architecture

Three files were modified from the current fractal-nyc codebase:

### `src/components/sections/Hero.tsx`
- Swapped from `SierpinskiCarpet` to lazy-loaded `FractalCityScene`
- Uses `useLocation` from Wouter to pass `onNavigate` callback into the 3D scene
- Retains skyline background + bottom text overlay from original layout

### `src/components/three/FractalCityScene.tsx`
- R3F `<Canvas>` with transparent background, warm lighting rig
- `<OrbitControls>` from drei: rotation only (no zoom/pan), `rotateSpeed={0.5}`
- Accepts `onNavigate` prop, passes through to `FractalObject`

### `src/components/three/FractalObject.tsx` (main implementation)
- **3 nested icosahedron wireframe shells** (r=1.8, 1.3, 0.95) with warm gold emissive materials
  - Detail level 1 for wireframe (42 vertices, dense geodesic look)
  - Detail level 2 for solid (smoother sphere)
- **Center sphere** (r=0.7, photo-textured): click → `/the-protocol`, hover shows "Fractal Collective" tooltip
- **8 interactive nav nodes** placed on specific vertices of the middle shell (r=1.3, detail=0 = 12 base vertices):
  - Each node: colored sphere (r=0.06), breathing pulse animation, 1.8x scale on hover, emissive glow, HTML tooltip with label
  - Click navigates to the page route via Wouter

### Nav Node Mapping

| Label | Route | Color | Vertex | Position |
|-------|-------|-------|--------|----------|
| Our Story | `/story` | `#E07A5F` | 2 | top-left |
| Co-Living | `/neighborhood` | `#8B7355` | 4 | upper-back |
| Events | `/events` | `#E07A5F` | 1 | upper-front |
| Campus | `/campus` | `#457B9D` | 6 | equator right-front |
| New Liberal Arts | `/new-liberal-arts` | `#1D3557` | 5 | equator left-back |
| Political Club | `/political-club` | `#CC2936` | 10 | equator right-back |
| Lab | `/lab` | `#6B4C9A` | 9 | lower-back |
| People | `/people` | `#457B9D` | 8 | bottom-left |

Skipped vertices (4 of 12): indices 3, 0, 7, 11 — chosen to maximize spatial spread of nav nodes.

### Icosahedron Vertex Reference (detail=0, r=1.3)

```
[0]:  (-1.107, 0.000, 0.684)   equator left-front
[1]:  (0.000, 0.684, 1.107)    upper-front
[2]:  (-0.684, 1.107, 0.000)   top-left
[3]:  (0.684, 1.107, 0.000)    top-right
[4]:  (0.000, 0.684, -1.107)   upper-back
[5]:  (-1.107, 0.000, -0.684)  equator left-back
[6]:  (1.107, 0.000, 0.684)    equator right-front
[7]:  (0.000, -0.684, 1.107)   lower-front
[8]:  (-0.684, -1.107, 0.000)  bottom-left
[9]:  (0.000, -0.684, -1.107)  lower-back
[10]: (1.107, 0.000, -0.684)   equator right-back
[11]: (0.684, -1.107, 0.000)   bottom-right
```

## Dependencies (already in fractal-nyc package.json)

- `three` ^0.183.2
- `@react-three/fiber` ^9.5.0
- `@react-three/drei` ^10.7.7
- `@types/three` ^0.183.1

## To Integrate Into fractal-nyc

1. Copy these 3 files into the main repo (the `three/` directory already exists):
   - `src/components/sections/Hero.tsx` (replace current)
   - `src/components/three/FractalCityScene.tsx` (replace current)
   - `src/components/three/FractalObject.tsx` (replace current)
2. No new dependencies needed — Three.js/R3F/drei are already installed
3. The `SierpinskiCarpet` component can stay in the codebase (unused) or be removed

## Design Decisions & Open Questions

- **Geometry:** We explored square antiprism (8 vertices exactly) but it looked flat/boring. Stuck with icosahedron (12 vertices, detail=1 wireframe) for visual richness, using 8 of 12 for nav.
- **Node placement:** Hand-picked for spatial spread. May want to iterate on which pages go where based on semantic grouping.
- **Auto-rotation:** Gentle continuous rotation (y += 0.12δ, x += 0.03δ). OrbitControls overrides this when user drags. Could add logic to pause auto-rotation after user interaction.
- **Mobile:** OrbitControls handles touch natively. Node tap targets (r=0.06) may need to be larger for phone fingers.
- **Backup:** `FractalObject.icosahedron.tsx` has the original version before nav nodes were added (just decorative dots).
