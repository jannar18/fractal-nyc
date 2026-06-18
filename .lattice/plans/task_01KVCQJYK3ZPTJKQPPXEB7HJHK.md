# FRAC-1 — Restructure AGENTS.md / CLAUDE.md

## Why
Per the AGENTS.md-vs-CLAUDE.md best practice: AGENTS.md is the tool-agnostic
universal rulebook (Cursor/Copilot/Claude); CLAUDE.md is a lean Claude-specific
layer that points to it. The repo is currently inverted (CLAUDE.md heavy,
AGENTS.md lean). Lattice is agent-agnostic, so its protocol is universal → belongs
in AGENTS.md.

## Plan
- AGENTS.md becomes the universal rulebook: keep sync discipline, house rules
  (incl. consolidated mobile-first), DESIGN.md conformance, validation; MOVE IN the
  full Lattice work-tracking protocol, Frontend Gotchas, and "Where Learnings Go"
  (retargeted to AGENTS.md). Update read-order (no longer points to CLAUDE.md for tracking).
- CLAUDE.md becomes lean: a pointer + Claude `@import` of AGENTS.md (so Claude, which
  doesn't auto-load AGENTS.md, still gets the rules) + on-demand pointers to DESIGN.md/EDITING.md
  + a Claude-specific-notes stub. Remove duplication (Mobile-First was in both).
- No content lost; net session-token load unchanged (same rules, imported not inlined).

## Acceptance
- AGENTS.md self-contained universal rulebook; CLAUDE.md lean with @AGENTS.md import.
- No duplicated rules across the two; no dangling cross-refs.
- Flag separately: PRD Check points to .lattice/plans/FRAC-22.md which the reset removed.
