# FRAC-227 — Reconcile AGENTS.md / CLAUDE.md

## Finding (the "why")
The two files are NOT redundant — they cover different concerns by design:
- AGENTS.md = session protocol / orientation hub: reading order, git sync,
  house rules, DESIGN.md conformance, pre-PR validation, task closeout.
  It is also the file cross-tool agents (Codex etc.) read by default.
- CLAUDE.md = the Lattice work-tracking deep-dive that AGENTS.md points to;
  the file Claude auto-loads.
The README descriptions differ because the files differ. The real defect is an
ASYMMETRIC cross-reference: AGENTS.md -> CLAUDE.md + DESIGN.md, but CLAUDE.md
references neither. A Claude agent auto-loading CLAUDE.md never gets directed to
AGENTS.md's house rules / conformance / validation.

## Fix
1. CLAUDE.md: add a top "Orientation" block mirroring AGENTS.md's reading order
   (AGENTS.md, DESIGN.md, EDITING.md) so cross-refs are symmetric.
2. README.md: tighten the AGENTS.md/CLAUDE.md descriptions to make the
   entry-point -> deep-dive relationship explicit (resolves the confusion).

Acceptance: both files cross-link; README descriptions no longer read as two
overlapping agent docs. Docs-only, no code. Complexity: low.
