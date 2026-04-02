import { useRef, useMemo, useState, useCallback } from "react";
import { useFrame, useLoader, ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Nav node definitions — 6 houses + Story + People
// ---------------------------------------------------------------------------

interface NavNode {
  label: string;
  route: string;
  color: string;
}

const NAV_NODES: NavNode[] = [
  { label: "The Neighborhood", route: "/neighborhood", color: "#8B7355" },
  { label: "Events", route: "/events", color: "#E07A5F" },
  { label: "The Campus", route: "/campus", color: "#457B9D" },
  { label: "The School", route: "/new-liberal-arts", color: "#1D3557" },
  { label: "The Forum", route: "/political-club", color: "#CC2936" },
  { label: "The Lab", route: "/lab", color: "#6B4C9A" },
  { label: "Story", route: "/story", color: "#8B7355" },
  { label: "People", route: "/people", color: "#457B9D" },
];

// ---------------------------------------------------------------------------
// Icosahedron wireframe layer (unchanged)
// ---------------------------------------------------------------------------

function IcosahedronLayer({
  radius,
  emissiveColor,
  emissiveIntensity,
  wireframe,
  opacity,
}: {
  radius: number;
  emissiveColor: string;
  emissiveIntensity: number;
  wireframe: boolean;
  opacity: number;
}) {
  return (
    <mesh>
      <icosahedronGeometry args={[radius, wireframe ? 1 : 2]} />
      <meshStandardMaterial
        color="#e8e0d0"
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        wireframe={wireframe}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Clickable center sphere → /the-protocol
// ---------------------------------------------------------------------------

function PhotoCenter({
  imagePath,
  onNavigate,
}: {
  imagePath: string;
  onNavigate: (route: string) => void;
}) {
  const texture = useLoader(THREE.TextureLoader, imagePath);
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const target = hovered ? 0.75 : 0.7;
      const s = meshRef.current.scale.x;
      const next = s + (target - s) * 0.1;
      meshRef.current.scale.setScalar(next);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onNavigate("/the-protocol");
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial map={texture} color="#ffffff" />
      {hovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(250,248,245,0.92)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 12,
              fontFamily: "var(--font-body, system-ui)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              color: "#1a1a1a",
              transform: "translateY(-32px)",
            }}
          >
            The Protocol
          </div>
        </Html>
      )}
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Interactive nav node
// ---------------------------------------------------------------------------

function NavNodeMesh({
  position,
  node,
  onNavigate,
}: {
  position: [number, number, number];
  node: NavNode;
  onNavigate: (route: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const clock = useRef(Math.random() * Math.PI * 2); // offset so they don't pulse in sync

  useFrame((_, delta) => {
    if (meshRef.current) {
      clock.current += delta * 2;
      const pulse = 1 + Math.sin(clock.current) * 0.08; // subtle breathing
      const target = hovered ? 1.8 : 1.0;
      const s = meshRef.current.scale.x / pulse;
      const next = (s + (target - s) * 0.15) * pulse;
      meshRef.current.scale.setScalar(next);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onNavigate(node.route);
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={hovered ? 3.0 : 1.5}
      />
      {hovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(250,248,245,0.92)",
              border: `1.5px solid ${node.color}`,
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 12,
              fontFamily: "var(--font-body, system-ui)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              color: "#1a1a1a",
              transform: "translateY(-24px)",
            }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Decorative (non-interactive) vertex dot
// ---------------------------------------------------------------------------

function DecorativeDot({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshStandardMaterial
        color="#ddbb77"
        emissive="#cc9944"
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Main fractal object
// ---------------------------------------------------------------------------

export function FractalObject({
  imagePath,
  onNavigate,
}: {
  imagePath: string;
  onNavigate: (route: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);

  const vertices = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 0);
    const positions = geo.attributes.position;
    const verts: [number, number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < positions.count; i++) {
      const key = `${positions.getX(i).toFixed(2)},${positions.getY(i).toFixed(2)},${positions.getZ(i).toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        verts.push([positions.getX(i), positions.getY(i), positions.getZ(i)]);
      }
    }
    geo.dispose();
    return verts;
  }, []);

  // Slow auto-rotation (pauses while OrbitControls is active)
  useFrame((_, delta) => {
    if (groupRef.current && !isDragging.current) {
      const d = Math.min(delta, 0.05);
      groupRef.current.rotation.y += d * 0.12;
      groupRef.current.rotation.x += d * 0.03;
    }
  });

  // Split vertices: first 8 are nav nodes, rest are decorative
  const navVertices = vertices.slice(0, NAV_NODES.length);
  const decorativeVertices = vertices.slice(NAV_NODES.length);

  return (
    <group ref={groupRef} position={[0, 0.35, 0]}>
      {/* Wireframe shells */}
      <IcosahedronLayer
        radius={1.8}
        emissiveColor="#bb8844"
        emissiveIntensity={0.2}
        wireframe={true}
        opacity={0.08}
      />
      <IcosahedronLayer
        radius={1.3}
        emissiveColor="#cc9955"
        emissiveIntensity={0.4}
        wireframe={true}
        opacity={0.25}
      />
      <IcosahedronLayer
        radius={0.95}
        emissiveColor="#ddaa66"
        emissiveIntensity={0.6}
        wireframe={true}
        opacity={0.45}
      />

      {/* Clickable center sphere */}
      <PhotoCenter imagePath={imagePath} onNavigate={onNavigate} />

      {/* Interactive nav nodes */}
      {navVertices.map((pos, i) => (
        <NavNodeMesh
          key={`nav-${i}`}
          position={pos}
          node={NAV_NODES[i]}
          onNavigate={onNavigate}
        />
      ))}

      {/* Decorative dots for remaining vertices */}
      {decorativeVertices.map((pos, i) => (
        <DecorativeDot key={`dec-${i}`} position={pos} />
      ))}
    </group>
  );
}
