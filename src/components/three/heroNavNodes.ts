// FRAC-178: Pure data export — no three.js / @react-three deps.
// Lives in a standalone module so the entry chunk can import the nav
// node list (for the keyboard skip-nav in Hero.tsx) WITHOUT statically
// importing OctahedronHero.tsx, which pulls in three + @react-three/*
// and would otherwise drag the 900KB three-vendor chunk onto the
// critical path defeating the lazy FractalCityScene split.
//
// OctahedronHero.tsx re-exports OUTER_NAV_NODES from this module for
// backward compatibility with any consumer that imports from it.

import { HOUSES } from "@/data/houses";

interface NavNode {
  label: string;
  route: string;
  color: string;
  vertexIndex: number;
}

// FRAC-24: House color helper — derives from canonical palette pair in
// HOUSES instead of literal hex. Falls back to magenta to surface a missing
// house id loudly in dev. (Duplicated from OctahedronHero.tsx because that
// module pulls three; we need a three-free path to the same colors.)
const housePalette = (id: string, prefer: "light" | "deep" = "light"): string => {
  const palette = HOUSES.find((h) => h.id === id)?.palette;
  return palette ? palette[prefer] : "#ff00ff";
};

// FRAC-33: exported so the FractalCityScene wrapper can render a
// keyboard-accessible skip-nav with the same routes (a parallel path
// for keyboard users, since the 3D nav nodes are pointer-only).
export const OUTER_NAV_NODES: NavNode[] = [
  { label: "Visit",          route: "/neighborhood",     color: housePalette("neighborhood"), vertexIndex: 3 },
  { label: "Events",         route: "/events",           color: housePalette("events"),       vertexIndex: 2 },
  { label: "Campus",         route: "/campus",           color: housePalette("campus"),       vertexIndex: 0 },
  { label: "Education",      route: "/new-liberal-arts", color: housePalette("school"),       vertexIndex: 1 },
  { label: "Publications",   route: "/lab",              color: housePalette("lab"),          vertexIndex: 5 },
  // FRAC-47: Story nav node at vertex 4 — fully active, navigates to /story.
  // Replaces the FRAC-36 Political Club "Coming Soon" placeholder (Political
  // Club stays hidden from Navbar per FRAC-161). Color matches Navbar Story
  // link and StoryPage STORY_COLOR (#D4BA58); Story is not a House so the
  // hex is literal rather than a palette ref.
  { label: "Story",          route: "/story",            color: "#D4BA58",                       vertexIndex: 4 },
];
