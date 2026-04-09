# FRAC-144: Process Tyler's Apr 2026 website feedback

## Source

User-pasted feedback document from Tyler, captured Apr 9 2026. Full notes at `.lattice/notes/FRAC-144.md`.

## Status

**Captured, not yet triaged.** Per user direction (Apr 9 2026): "for now save this list." The feedback is durably stored in the notes file; triage will happen in a later session.

## User's stated priorities (Apr 9 2026)

Four concrete priorities elevated above the rest of Tyler's feedback:

1. **Sorting hat homepage** — replace the taxonomy-first homepage (which asks visitors to pick from houses/sections they don't yet understand — "like being shown Hufflepuff, Slytherin, Ravenclaw, Gryffindor without knowing them") with an intent-first flow: "why are you here, who are you, what do you seek?" Route answers to the right place. Seed intents captured in the notes file.

2. **Stop repeating the same options** across the nav bar, the 3D model, and the banners. Collapse the duplication so each surface does something distinct.

3. **Contrasting color pairs** — define codified foreground/background text color pairs per section and use them consistently. This is the structural fix for Tyler's legibility complaints (page titles too close to background, unreadable "Get Involved" links, invisible Campus title). Per-section accent colors exist already; what's missing is a verified text-on-accent contrast system.

4. **Double-X bug on hamburger menu popover** — two close buttons in the upper-right, one of them doesn't work. A broken close button on the primary nav is the kind of thing every visitor will hit; elevated above the other nav bugs for that reason. Straight bug, not a design question.

Everything else in Tyler's feedback (remaining nav bugs, Lab heading, People page, Campus page gaps, all-caps text) is real and actionable but secondary to these four.

## Additional bug noticed during capture (Apr 9 2026)

Not from Tyler — noticed by user during this capture session. Documented here so it isn't lost:

- **Nav bar shows "PColitical CLub" instead of "Political Club"** on the Political Club nav item. Almost certainly a regression of FRAC-126 ("Political Club: rename logo to PC globally"). The pattern — "PC" inserted before "olitical" and "CL" in place of "Cl" — suggests a partial/stacked string replace that left remnants of both the old name and the new "PC" label. High-severity visual bug since it's on the primary nav and visible on every page. Not one of the four top priorities by user framing, but worth a quick surgical fix task, not a full triage cycle.

## Additional user design direction (Apr 9 2026)

Separate from Tyler's feedback — direction the user gave in the same capture session. These are design additions to build, not bugs to fix. Full detail in `.lattice/notes/FRAC-144.md`.

- **Glowing nodes** — make the 3D octahedron model's nav nodes glow / feel more enticing. (Not "notes" — nodes = the clickable nav points on the hero 3D model, same ones that got hit-target work earlier today.)
- **Decorative design + deck banner design (same family)** — user has both assets already; they're part of the same visual family, not two independent items. Implement together with shared tokens. Asset locations and the definition of "deck banner" still need clarification.
- **Per-page identity kit** — crest + bold title + visitor-targeting quote + per-house fractal icon (SVG) + iconic person. Likely collapses into one design-system task followed by per-page application tasks. Bigger/bolder page title echoes Tyler's legibility complaint; bundle with color-pair priority.
- **Per-house fractal icon (SVG)** — user has a fractal icon concept for each house, needs to be generated as SVG art per house (6 icons). Distinct from FRAC-112 (per-page background wallpapers, done); this is an icon/mark, not a wallpaper.

**Explicitly separate per user (Apr 9 2026):** the per-page visitor-targeting quote is **not** part of the sorting-hat design (priority #1). Do not bundle them — the sorting hat is homepage-level intent routing; the per-page quote is a page identity element. Independent initiatives.

Multiple open questions block scoping these into concrete tasks — captured in the notes file under "Strategic — additive design direction." Most require user input or asset locations before triage can proceed.

## Acceptance for FRAC-144 itself

FRAC-144 is a **triage umbrella** — its job is to process Tyler's feedback into actionable child tasks, following the FRAC-122 precedent. Implementation does NOT happen on this task; each child gets its own branch and lifecycle.

FRAC-144 is complete when:
1. Feedback is captured in a durable location ✓ (notes + this plan)
2. Triage has been run — actionable items spun out as `subtask_of FRAC-144` child tasks [deferred]
3. Blocked/undecided items captured as comments on this task [deferred]
4. User has confirmed triage is complete [deferred]

Steps 2–4 are deferred per user direction. When triage resumes, follow the process documented at the bottom of `.lattice/notes/FRAC-144.md`.
