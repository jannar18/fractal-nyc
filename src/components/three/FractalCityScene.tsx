import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TOUCH } from "three";
// Hero geometry variants — swap the import to try different shapes
// import { FractalObject } from "./FractalObject";       // Icosahedron (original)
// import { FractalObject } from "./MetatronCube";        // Nested hexahedra (Metatron's Cube)
import {
  FractalObject,
  fractalObjectUserRotation,
  classifyGestureAxis,
  SPIN_RADIANS_PER_PX,
  type GestureAxis,
} from "./OctahedronHero";         // Octahedron

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={1.2} color="#f5f0ea" />
      <pointLight position={[3, 4, 5]} intensity={0.8} color="#ffcc88" distance={25} decay={2} />
      <pointLight position={[-3, 3, 4]} intensity={0.5} color="#ffaa66" distance={20} decay={2} />
      <directionalLight position={[5, 8, 10]} intensity={0.7} color="#ffffff" />
      <directionalLight position={[-3, 2, -5]} intensity={0.3} color="#aabbcc" />
    </>
  );
}

interface PointerGestureState {
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  axis: GestureAxis;
  captured: boolean;
  captureTarget: Element | null;
}

export function FractalCityScene({ onNavigate }: { onNavigate: (route: string) => void }) {
  const imagePath = `${import.meta.env.BASE_URL}images/fractal-university.png`;

  // FRAC-142: One-finger axis-based gesture routing.
  //
  // We wrap the Canvas in a div whose pointer handlers classify the drag axis
  // within the first ~10px of movement:
  //   * vertical → do NOT capture, do NOT preventDefault → browser scrolls
  //   * horizontal → setPointerCapture, accumulate dx into the shared
  //     fractalObjectUserRotation ref, which FractalObject's useFrame reads.
  //
  // Multi-touch (TOUCH.NONE for ONE means single-finger never reaches
  // OrbitControls; pinch/two-finger gestures still flow to OrbitControls if
  // we keep TWO configured). We bail out the moment a second pointer enters
  // so we don't fight pinch zoom or sibling gestures.
  const gestureRef = useRef<PointerGestureState | null>(null);
  const activePointersRef = useRef<Set<number>>(new Set());

  const resetGesture = () => {
    const g = gestureRef.current;
    if (g && g.captured && g.captureTarget) {
      try {
        if (g.captureTarget.hasPointerCapture?.(g.pointerId)) {
          g.captureTarget.releasePointerCapture(g.pointerId);
        }
      } catch {
        // Ignore — capture may already be gone (e.g. element unmounted).
      }
    }
    gestureRef.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.add(e.pointerId);
    // If a second finger lands while we're tracking a one-finger gesture,
    // abandon — let OrbitControls / browser handle multi-touch from here.
    if (activePointersRef.current.size > 1) {
      resetGesture();
      return;
    }
    gestureRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      axis: null,
      captured: false,
      captureTarget: null,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointersRef.current.size > 1) return;
    const g = gestureRef.current;
    if (!g || g.pointerId !== e.pointerId) return;

    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;

    if (g.axis === null) {
      const axis = classifyGestureAxis(dx, dy);
      if (axis === null) return; // still under threshold — wait
      g.axis = axis;
      if (axis === "horizontal") {
        // Capture so we keep getting events even if the finger drifts off
        // the original target. Use the event's currentTarget (the wrapper div)
        // so capture is on a stable element.
        const target = e.currentTarget as Element;
        try {
          target.setPointerCapture?.(e.pointerId);
          g.captureTarget = target;
          g.captured = true;
        } catch {
          // Capture is best-effort; on failure we still process moves below.
        }
        // Reset baseline so the very first horizontal frame starts at delta 0.
        g.lastX = e.clientX;
      }
      // vertical: do nothing — let the browser scroll
      return;
    }

    if (g.axis === "horizontal") {
      const incrementalDx = e.clientX - g.lastX;
      g.lastX = e.clientX;
      fractalObjectUserRotation.current += incrementalDx * SPIN_RADIANS_PER_PX;
      // preventDefault is a no-op once we've captured the pointer, but be
      // explicit anyway to belt-and-suspenders block any residual scroll.
      if (e.cancelable) e.preventDefault();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.delete(e.pointerId);
    const g = gestureRef.current;
    if (g && g.pointerId === e.pointerId) {
      resetGesture();
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.delete(e.pointerId);
    const g = gestureRef.current;
    if (g && g.pointerId === e.pointerId) {
      resetGesture();
    }
  };

  return (
    <div
      className="absolute inset-0 z-[1]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ touchAction: "pan-y" }}
    >
      <Canvas
        camera={{ position: [0, 0.8, 8], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", touchAction: "pan-y" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
          gl.setClearColor(0x000000, 0);
          // FRAC-124: Belt-and-suspenders — apply touchAction directly to the
          // canvas element. R3F sets touchAction on its wrapper div, but when
          // a pointer is captured on the canvas (e.g. by onClick hit meshes),
          // iOS Safari consults the canvas element's own touch-action, not
          // the parent's — so the hint needs to live on both.
          gl.domElement.style.touchAction = "pan-y";
        }}
      >
        <SceneLighting />
        <FractalObject imagePath={imagePath} onNavigate={onNavigate} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          target={[0, 0.35, 0]}
          // FRAC-142: One-finger gestures are routed by our wrapper div's
          // pointer handler (vertical → scroll, horizontal → spin offset on
          // FractalObject). OrbitControls never sees one-finger touches.
          // TWO is kept for power-user 2-finger orbit fallback.
          touches={{ ONE: TOUCH.NONE, TWO: TOUCH.DOLLY_ROTATE }}
        />
      </Canvas>
    </div>
  );
}
