// FRAC-178: SVG silhouette of the front-camera octahedron projection.
// Rendered inside <Suspense fallback> while the FractalCityScene lazy
// chunk (and its ~900KB three-vendor dep) is still downloading. Gives
// the hero a recognisable shape within ~1s on 3G instead of a blank
// area until WebGL hydrates.
//
// Geometry: a 2D diamond — the front-projected silhouette of an axis-
// aligned octahedron viewed from +Z. Four edges, four vertices in the
// viewport plane. Stroked, not filled — reads as a sketch / wireframe
// so users intuit "this is loading" rather than "this is the final
// state". The real WebGL octahedron has six vertices but two of them
// (along the camera axis) collapse to the centre in this projection,
// so the diamond is the visually correct silhouette.
//
// Sizing matches the FractalCityScene canvas hit-target so layout
// doesn't jump when the real scene mounts.
export function HeroPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "min(90vmin, 550px)",
          aspectRatio: "3 / 4",
          opacity: 0.4,
        }}
      >
        {/* Front-projected octahedron silhouette: a diamond. Stroke in
            charcoal so it reads on the cream background; thin to feel
            like a sketch. */}
        <polygon
          points="50,15 85,50 50,85 15,50"
          fill="none"
          stroke="#171717"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        {/* Vertical + horizontal "spine" lines hint at the third axis
            collapsed into the camera direction, so the shape reads as
            volumetric rather than a flat rhombus. */}
        <line
          x1="50"
          y1="15"
          x2="50"
          y2="85"
          stroke="#171717"
          strokeWidth="0.4"
          strokeDasharray="1.5 1.5"
        />
        <line
          x1="15"
          y1="50"
          x2="85"
          y2="50"
          stroke="#171717"
          strokeWidth="0.4"
          strokeDasharray="1.5 1.5"
        />
      </svg>
    </div>
  );
}
