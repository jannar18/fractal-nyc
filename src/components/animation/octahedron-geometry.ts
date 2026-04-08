// ---------------------------------------------------------------------------
// Octahedron Unfold — geometry module
//
// Computes triangle transforms for each animation stage.
// The octahedron has 8 faces (4 top hemisphere + 4 bottom hemisphere).
// We render each face as an equilateral SVG triangle and animate its
// translate/rotate/scale per stage.
//
// Coordinate system: SVG viewBox is symmetric around origin (0,0). Positive
// Y points DOWN (SVG convention). All values in viewBox units.
// ---------------------------------------------------------------------------

export interface TriangleTransform {
  x: number;          // translation in viewBox units
  y: number;          // translation in viewBox units
  rotate: number;     // degrees
  scale: number;      // 1 = base size
  opacity: number;    // 0..1
  pointDown: boolean; // whether the equilateral points down (true) or up (false)
}

export interface Triangle {
  id: string;
  color: string;     // base color
  hemisphere: "top" | "bottom";
  index: number;     // 0..3 within hemisphere
}

// 6 house colors + 2 neutral gold faces (octahedron has 8 triangles, only
// 6 houses). We map 6 house colors to 6 of the 8 faces; the 2 remaining
// faces use a brand neutral and fade out when triangles align with banners.
const GOLD = "#D4BA58";

export const TRIANGLES: Triangle[] = [
  // Top hemisphere (4 faces fanning around top vertex)
  { id: "neighborhood", color: "#889460", hemisphere: "top",    index: 0 },
  { id: "events",       color: "#D4857A", hemisphere: "top",    index: 1 },
  { id: "campus",       color: "#2B5A48", hemisphere: "top",    index: 2 },
  { id: "school",       color: "#C41E20", hemisphere: "top",    index: 3 },
  // Bottom hemisphere (4 faces fanning around bottom vertex)
  { id: "forum",        color: "#6E1830", hemisphere: "bottom", index: 0 },
  { id: "lab",          color: "#E870A0", hemisphere: "bottom", index: 1 },
  { id: "gold-1",       color: GOLD,      hemisphere: "bottom", index: 2 },
  { id: "gold-2",       color: GOLD,      hemisphere: "bottom", index: 3 },
];

// Base equilateral triangle: pointing UP, centered at origin, side length BASE.
export const BASE = 60; // viewBox units per triangle side
export const HEIGHT = (BASE * Math.sqrt(3)) / 2; // ~51.96

// SVG path for an equilateral triangle pointing up, centered at origin.
// Centroid is at (0,0). Top vertex at (0, -2/3 * h). Bottom edge midpoint at (0, +1/3 * h).
export const TRIANGLE_PATH_UP = `M 0,${(-2 / 3) * HEIGHT} L ${BASE / 2},${(1 / 3) * HEIGHT} L ${-BASE / 2},${(1 / 3) * HEIGHT} Z`;

// ---------------------------------------------------------------------------
// Stage 1: Simplified octahedron silhouette
// All 8 triangles compose a 2D diamond. Top 4 form the upper diamond half,
// bottom 4 form the lower half. Each hemisphere's 4 faces stack to read as
// a flat diamond (we just show the front-facing 4: 2 top + 2 bottom).
// For a prototype we approximate: arrange the 8 as a tight diamond by
// overlapping pairs.
// ---------------------------------------------------------------------------
function stage1(): TriangleTransform[] {
  // Diamond silhouette: top hemisphere triangles stack at top point,
  // bottom hemisphere stacks at bottom point. Slightly rotated to suggest 3D.
  return TRIANGLES.map((t) => {
    if (t.hemisphere === "top") {
      // Triangle pointing up, anchored so its bottom edge sits on the equator
      // (y=0). Centroid is HEIGHT/3 above bottom edge => centroid y = -HEIGHT/3.
      // 4 top faces fan slightly around vertical axis.
      const angle = (t.index - 1.5) * 6; // small fan
      return {
        x: 0,
        y: -HEIGHT / 3,
        rotate: angle,
        scale: 1,
        opacity: 1,
        pointDown: false,
      };
    } else {
      // Triangle pointing down, anchored so its top edge sits on equator.
      // We achieve "pointing down" by rotating 180°. Centroid is HEIGHT/3
      // below the top edge, so centroid y = +HEIGHT/3.
      const angle = 180 + (t.index - 1.5) * 6;
      return {
        x: 0,
        y: HEIGHT / 3,
        rotate: angle,
        scale: 1,
        opacity: 1,
        pointDown: true,
      };
    }
  });
}

// ---------------------------------------------------------------------------
// Stage 2: Unfolded net
// Two rows of 4 triangles. Top row: 4 triangles point DOWN, bottom row: 4
// point UP, sharing edges along the equator (y=0). This forms a parallelogram
// strip — a valid octahedron unfolding.
// ---------------------------------------------------------------------------
function stage2(): TriangleTransform[] {
  return TRIANGLES.map((t) => {
    // 4 triangles per row, side length BASE. Total row width = 4 * BASE / 2
    // (alternating up/down packs them) — but we want a clean strip so we
    // just place them at index * (BASE/2) - 0.75*BASE to center.
    // Actually for octahedron unfold: think of 2 strips of 4 alternating
    // triangles. Simpler: top hemisphere row + bottom hemisphere row
    // separated by a thin gap, each row a horizontal strip of 4.
    const stripIndexX = t.index - 1.5; // -1.5 .. 1.5
    const x = stripIndexX * BASE;
    if (t.hemisphere === "top") {
      // top row, pointing down
      return {
        x,
        y: -HEIGHT / 2 - 4,
        rotate: 180,
        scale: 1,
        opacity: 1,
        pointDown: true,
      };
    } else {
      return {
        x,
        y: HEIGHT / 2 + 4,
        rotate: 0,
        scale: 1,
        opacity: 1,
        pointDown: false,
      };
    }
  });
}

// ---------------------------------------------------------------------------
// Stage 3: Separated triangles in a row
// All 8 (or 6 visible) triangles laid out in a single horizontal row,
// pointing up, evenly spaced. The 2 gold "neutral" triangles fade out.
// ---------------------------------------------------------------------------
function stage3(viewBoxWidth: number, columns: number): TriangleTransform[] {
  // Order them so house triangles come first in row order matching banners
  // (neighborhood, events, campus, school, forum, lab, gold, gold)
  const order: string[] = [
    "neighborhood",
    "events",
    "campus",
    "school",
    "forum",
    "lab",
    "gold-1",
    "gold-2",
  ];

  const visibleCount = 6; // 6 houses
  const slotWidth = viewBoxWidth / Math.max(columns, 1);

  return TRIANGLES.map((t) => {
    const orderIdx = order.indexOf(t.id);
    const isGold = t.id.startsWith("gold");
    if (isGold) {
      // Fade out and drift up off-screen
      return {
        x: 0,
        y: -120,
        rotate: 0,
        scale: 0.6,
        opacity: 0,
        pointDown: false,
      };
    }

    // Layout the 6 house triangles into `columns` columns. If columns=6,
    // single row. If columns=3, two rows. If columns=2, three rows.
    const col = orderIdx % columns;
    const row = Math.floor(orderIdx / columns);
    const rows = Math.ceil(visibleCount / columns);

    // Center the grid around origin
    const x = (col - (columns - 1) / 2) * slotWidth;
    const rowSpacing = HEIGHT * 1.4;
    const y = (row - (rows - 1) / 2) * rowSpacing;

    return {
      x,
      y,
      rotate: 0,
      scale: 0.85,
      opacity: 1,
      pointDown: false,
    };
  });
}

// ---------------------------------------------------------------------------
// Stage 4: Aligned with banners — same as Stage 3 but pushed down toward
// the bottom of the viewport (where the HouseBannerGrid sits visually).
// ---------------------------------------------------------------------------
function stage4(viewBoxWidth: number, columns: number, viewBoxHeight: number): TriangleTransform[] {
  const base = stage3(viewBoxWidth, columns);
  return base.map((t) => ({
    ...t,
    y: t.y + viewBoxHeight * 0.32, // shift toward bottom of viewport
    scale: t.opacity > 0 ? 0.95 : t.scale,
  }));
}

// ---------------------------------------------------------------------------
// Stage 6: Rotated net forming an "F" lettermark.
// This is a prototype approximation — we arrange the triangles to suggest
// an "F" silhouette on the left side of the viewport.
// ---------------------------------------------------------------------------
function stageLogoReveal(viewBoxWidth: number): TriangleTransform[] {
  // Approximate F: vertical spine (4 triangles stacked) + 2 horizontal arms
  // (top arm 2 triangles, middle arm 2 triangles).
  // We build positions in viewBox units.
  const spineX = -viewBoxWidth * 0.18;
  const positions: Record<string, { x: number; y: number; rotate: number }> = {
    // Vertical spine (4 stacked, alternating up/down for tight packing)
    neighborhood: { x: spineX,         y: -HEIGHT * 1.2, rotate: 0 },
    events:       { x: spineX,         y: -HEIGHT * 0.4, rotate: 180 },
    campus:       { x: spineX,         y: HEIGHT * 0.4,  rotate: 0 },
    school:       { x: spineX,         y: HEIGHT * 1.2,  rotate: 180 },
    // Top arm of F (2 triangles to the right)
    forum:        { x: spineX + BASE,       y: -HEIGHT * 1.2, rotate: 180 },
    lab:          { x: spineX + BASE * 1.5, y: -HEIGHT * 1.2, rotate: 0 },
    // Middle arm of F
    "gold-1":     { x: spineX + BASE,       y: HEIGHT * 0.0, rotate: 180 },
    "gold-2":     { x: spineX + BASE * 1.2, y: HEIGHT * 0.0, rotate: 0 },
  };

  return TRIANGLES.map((t) => {
    const p = positions[t.id];
    return {
      x: p.x,
      y: p.y,
      rotate: p.rotate,
      scale: 0.7,
      opacity: 1,
      pointDown: p.rotate === 180,
    };
  });
}

// ---------------------------------------------------------------------------
// Public API: compute transform for triangle `i` at scroll progress `t`.
// `t` is 0..1 across the entire scroll-pinned section.
// ---------------------------------------------------------------------------

export interface StageConfig {
  viewBoxWidth: number;
  viewBoxHeight: number;
  columns: number; // 2 mobile, 3 tablet, 6 desktop
}

export function computeStages(config: StageConfig): TriangleTransform[][] {
  return [
    stage1(),                                                       // 0: silhouette
    stage2(),                                                       // 1: net
    stage3(config.viewBoxWidth, config.columns),                    // 2: row
    stage4(config.viewBoxWidth, config.columns, config.viewBoxHeight), // 3: aligned
    stage3(config.viewBoxWidth, config.columns),                    // 4: lift back
    stage2(),                                                       // 5: net again
    stageLogoReveal(config.viewBoxWidth),                           // 6: F logomark
    stageLogoReveal(config.viewBoxWidth),                           // 7: full logo (text reveals separately)
  ];
}

// Linear interpolation between two transforms.
export function lerpTransform(
  a: TriangleTransform,
  b: TriangleTransform,
  t: number
): TriangleTransform {
  const lerp = (x: number, y: number) => x + (y - x) * t;
  // Rotate: take shortest path
  let aR = a.rotate;
  let bR = b.rotate;
  const diff = bR - aR;
  if (diff > 180) bR -= 360;
  else if (diff < -180) bR += 360;
  return {
    x: lerp(a.x, b.x),
    y: lerp(a.y, b.y),
    rotate: lerp(aR, bR),
    scale: lerp(a.scale, b.scale),
    opacity: lerp(a.opacity, b.opacity),
    pointDown: t < 0.5 ? a.pointDown : b.pointDown,
  };
}

// Stage progress mapping. Returns [stageIndex, localT] for global progress.
export interface StageMapping {
  stages: Array<{ start: number; end: number; from: number; to: number }>;
}

// Default 8-stage timeline across 0..1.
export const DEFAULT_STAGE_MAPPING: StageMapping = {
  stages: [
    { start: 0.00, end: 0.10, from: 0, to: 0 }, // hold stage 0
    { start: 0.10, end: 0.20, from: 0, to: 1 }, // 0 -> 1
    { start: 0.20, end: 0.28, from: 1, to: 1 }, // hold stage 1
    { start: 0.28, end: 0.38, from: 1, to: 2 }, // 1 -> 2
    { start: 0.38, end: 0.45, from: 2, to: 2 }, // hold
    { start: 0.45, end: 0.55, from: 2, to: 3 }, // 2 -> 3
    { start: 0.55, end: 0.62, from: 3, to: 3 }, // hold
    { start: 0.62, end: 0.70, from: 3, to: 4 }, // 3 -> 4
    { start: 0.70, end: 0.78, from: 4, to: 5 }, // 4 -> 5
    { start: 0.78, end: 0.88, from: 5, to: 6 }, // 5 -> 6
    { start: 0.88, end: 1.00, from: 6, to: 7 }, // 6 -> 7
  ],
};

export function transformAtProgress(
  stagesArr: TriangleTransform[][],
  triangleIdx: number,
  progress: number,
  mapping: StageMapping = DEFAULT_STAGE_MAPPING
): TriangleTransform {
  // Find current stage band
  for (const band of mapping.stages) {
    if (progress >= band.start && progress <= band.end) {
      const localT = (progress - band.start) / Math.max(band.end - band.start, 0.0001);
      const a = stagesArr[band.from][triangleIdx];
      const b = stagesArr[band.to][triangleIdx];
      return lerpTransform(a, b, localT);
    }
  }
  // Past end
  if (progress > 1) return stagesArr[stagesArr.length - 1][triangleIdx];
  return stagesArr[0][triangleIdx];
}
