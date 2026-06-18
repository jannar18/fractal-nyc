# FRAC-226 — Disable protocol button on octahedron hero

Gate the center-octahedron interactivity in `src/components/three/OctahedronHero.tsx`
behind a `PROTOCOL_BUTTON_ENABLED = false` flag: no tap → `/the-protocol`, no hover
tooltip ("The Protocol"), no pointer cursor. Center stays decorative (breathing
scale locks at rest). Trivially reversible by flipping the flag.

Acceptance: typecheck + tests green; center octahedron no longer navigates.
Complexity: low.
