import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import {
  TRIANGLES,
  HEIGHT,
  TRIANGLE_PATH_UP,
  computeStages,
  transformAtProgress,
  TriangleTransform,
} from "./octahedron-geometry";

/**
 * OctahedronUnfold — scroll-pinned animation bridging the Hero and
 * HouseBannerGrid on the homepage.
 *
 * PROTOTYPE: Stages are visible but timing + polish are rough.
 *
 * How it works:
 * - Outer wrapper is ~500vh tall on desktop (400vh mobile).
 * - Inner sticky viewport is 100vh and contains the SVG.
 * - Framer Motion's useScroll tracks progress across the outer wrapper.
 * - For each triangle we transformAtProgress(progress) to get per-stage
 *   position/rotation/scale/opacity.
 *
 * HARD CONSTRAINT: does NOT modify the existing WebGL octahedron.
 */

const VIEWBOX_W = 1200;
const VIEWBOX_H = 700;

function getColumnsForWidth(w: number): number {
  if (w >= 1024) return 6;
  if (w >= 640) return 3;
  return 2;
}

interface AnimatedTriangleProps {
  triangleIdx: number;
  progress: MotionValue<number>;
  stages: TriangleTransform[][];
  color: string;
}

function AnimatedTriangle({ triangleIdx, progress, stages, color }: AnimatedTriangleProps) {
  // useTransform with a function that reads progress and returns the numeric field.
  const x = useTransform(progress, (p) => transformAtProgress(stages, triangleIdx, p).x);
  const y = useTransform(progress, (p) => transformAtProgress(stages, triangleIdx, p).y);
  const rotate = useTransform(progress, (p) => transformAtProgress(stages, triangleIdx, p).rotate);
  const scale = useTransform(progress, (p) => transformAtProgress(stages, triangleIdx, p).scale);
  const opacity = useTransform(progress, (p) => transformAtProgress(stages, triangleIdx, p).opacity);

  return (
    <motion.g style={{ x, y, rotate, scale, opacity }}>
      <path
        d={TRIANGLE_PATH_UP}
        fill={color}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </motion.g>
  );
}

/**
 * The pixel-serif "ractal" text that animates out to the right of the F.
 */
function FractalWordmark({ progress }: { progress: MotionValue<number> }) {
  // Reveal between 0.9 and 1.0
  const opacity = useTransform(progress, [0.88, 0.94, 1.0], [0, 0.6, 1]);
  const tx = useTransform(progress, [0.88, 1.0], [-40, 0]);
  // Horizontal shift of whole F+word so entire logo ends centered.
  // F sits at x ~= -0.18 * VIEWBOX_W; wordmark needs to balance it.
  return (
    <motion.g style={{ opacity, x: tx }}>
      <text
        x={VIEWBOX_W * 0.0}
        y={HEIGHT * 0.4}
        fontFamily="'Instrument Serif', serif"
        fontSize={160}
        fontWeight={400}
        fill="#1a1a1a"
        letterSpacing="-4"
      >
        ractal
      </text>
    </motion.g>
  );
}

export function OctahedronUnfold() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive column count for stages 3/4 layout.
  const [columns, setColumns] = useState<number>(() =>
    typeof window !== "undefined" ? getColumnsForWidth(window.innerWidth) : 6
  );

  useEffect(() => {
    function onResize() {
      setColumns(getColumnsForWidth(window.innerWidth));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const stages = useMemo(
    () =>
      computeStages({
        viewBoxWidth: VIEWBOX_W,
        viewBoxHeight: VIEWBOX_H,
        columns,
      }),
    [columns]
  );

  // Reduced motion: show a static "done" state instead of scroll-pinned.
  if (reduceMotion) {
    return (
      <section
        aria-hidden="true"
        className="relative w-full bg-[#faf8f5] py-16 flex items-center justify-center"
      >
        <div
          className="font-serif text-6xl md:text-8xl text-foreground"
          style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          fractal
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full bg-[#faf8f5] h-[400vh] md:h-[500vh]"
    >
      {/* Sticky inner viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <svg
          viewBox={`${-VIEWBOX_W / 2} ${-VIEWBOX_H / 2} ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Triangles */}
          {TRIANGLES.map((t, i) => (
            <AnimatedTriangle
              key={t.id}
              triangleIdx={i}
              progress={scrollYProgress}
              stages={stages}
              color={t.color}
            />
          ))}
          {/* Wordmark reveals in the final stage */}
          <FractalWordmark progress={scrollYProgress} />
        </svg>

        {/* Stage indicator (prototype debug, subtle) */}
        <ScrollProgressLabel progress={scrollYProgress} />
      </div>
    </section>
  );
}

// Tiny debug label — shows scroll progress 0..1. Useful during prototype.
function ScrollProgressLabel({ progress }: { progress: MotionValue<number> }) {
  const text = useTransform(progress, (p) => `scroll ${p.toFixed(2)}`);
  return (
    <motion.div
      className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-wider text-foreground/30"
      style={{ pointerEvents: "none" }}
    >
      <motion.span>{text}</motion.span>
    </motion.div>
  );
}
