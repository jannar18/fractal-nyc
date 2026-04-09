# FRAC-144 Triage Steps

**Purpose:** Step-by-step process for triaging Tyler's Apr 2026 website feedback + the user's additive design direction into actionable child tasks. Runs when the user is ready to begin the triage session.

**Parent:** FRAC-144 ("Process Tyler's Apr 2026 website feedback"). Full feedback capture in `.lattice/notes/FRAC-144.md`. Precedent: FRAC-122 (Andrew's Apr 8 feedback triage).

---

## Phase 0 — Orient

1. **Move FRAC-144 `backlog → in_planning`** before opening any files.
2. **Re-read the PRD** at `.lattice/plans/FRAC-22.md`. Confirm the feedback items still align with the PRD's architecture and constraints (especially mobile-first). Flag discrepancies, don't silently diverge.
3. **Run `lattice list --status in_progress`** and `lattice list --status in_planning` to identify overlapping in-flight work. Avoid creating duplicate tasks for things another agent is already handling.
4. **Review recent commits** (`git log --oneline -30`) to catch work landed since Tyler's feedback was captured — some items may already be fixed.

---

## Phase 1 — Verify current state

Tyler's feedback is a snapshot in time. Before spinning out tasks, confirm each issue still exists in the current build. **All verification must include mobile viewport (375px) checks — this is a mobile-first site.**

### Homepage / information hierarchy
1. **Count homepage menu options** — confirm Tyler's "8 menu options + 6 get involved" shape.
2. **Audit "Getting Involved" banner** — confirm it duplicates main menu items. Identify which items are duplicated.
3. **Audit the 3D octahedron nav nodes** — list which options appear, confirm overlap with nav bar and banner. (This is the data for priority #2: collapse repetition.)

### Legibility
4. **Audit Story page for all-caps body text** — find which components render in uppercase. Identify the CSS source (class, token, or inline).
5. **Audit "Get Involved" link readability** — contrast measure against background.
6. **Audit page titles sitewide** — size and contrast, especially Campus where Tyler said "Campus" was nearly invisible.
7. **Contrast audit for per-house accent colors** (FRAC-37) — which fg/bg pairs meet WCAG AA at 375px text sizes? Feeds the color-pair priority (#3).

### Navigation bugs
8. **Reproduce the double-X bug on the hamburger popover** — locate both close buttons in the menu component source, identify which is the dead one.
9. **Audit hamburger-menu contents on every subpage** — confirm Tyler's claim that "some options aren't available" in the 3D menu.
10. **Test the "PColitical CLub" nav text corruption** — reproduce, identify the broken rename path (regression of FRAC-126).

### Content / copy
11. **Locate the Lab page "gain of function" heading** — confirm exact wording and file path.
12. **Read the People page** — confirm it's Discord-first with no faces.
13. **Read the Neighbourhood page** — confirm the "Live near 100 friends" → subletting jump is as abrupt as described.
14. **Audit heading → content flow sitewide** — find other pages with the same disconnect pattern.

### Campus / Lab
15. **Read the Campus page** — confirm missing taglines for Merlyn's Place and Fractal Tech Hub, missing Fractal U, only two options present.
16. **Read the Lab page** — confirm blog-posts-as-research framing, confirm tags/keywords eat vertical space.

### Assets
17. **Inspect the NYC background image asset** — confirm pixelation/artifact claim.
18. **Check current state of 3D model nodes** (for the glowing-nodes direction) — confirm there's no existing glow effect to extend, and that the hit-target work from the earlier FRAC-144 short code is still the latest state.
19. **Check FRAC-112 current state** — view per-page background fractals so the SVG per-house-icon direction can be scoped without conflating.

---

## Phase 2 — Spin out child tasks

Follow the FRAC-122 precedent: FRAC-144 is the **triage umbrella**. Its job is to convert captured feedback into actionable child tasks. Implementation does NOT happen on FRAC-144 itself — each child task gets its own branch and lifecycle.

1. **Move FRAC-144 `in_planning → planned`** once the plan file reflects the triage decisions.
2. **Move FRAC-144 `planned → in_progress`** when beginning to spin out children.
3. **For each verified actionable item**, create a child task:
   ```
   lattice create "<title>" --actor agent:<your-id>
   lattice link <child> subtask_of FRAC-144 --actor agent:<your-id>
   ```
   Include in each child task's description:
   - What the fix is and why
   - Which priority theme it serves (sorting hat / collapse repetition / color pairs / double-X / identity kit / standalone)
   - Any worktree overlap warnings (per CLAUDE.md shared-worktree discipline)
   - Mobile-first acceptance criteria
4. **Priority assignment:**
   - `high`: the four user priorities (sorting hat, collapse repetition, color pairs, double-X), the PColitical regression, any item blocking the primary user journey
   - `medium`: Tyler's medium-priority items, identity-kit design-system work
   - `low`: Tyler's lower-priority items
5. **Capture blocked items as comments on FRAC-144**, not as spun-out tasks. Precedents from FRAC-122:
   - Blocked on a specific person (designer, stakeholder) waiting for input
   - Blocked on structural decisions requiring human judgment
   - Dropped / not doing (with reason)
6. **Flag the `needs_human` items** — the strategic open questions (sorting hat intent set, primary actions, Campus third offering, etc.) need human decision before any child task can be scoped. Create `needs_human` tasks with a one-line "Need:" comment each.

---

## Phase 3 — Identity kit synthesis decision

Before spinning out items 24–28 (crest, bold title, visitor quote, SVG fractal icons, iconic person), ask the user whether to bundle these into one "per-page identity kit" design-system task. If yes:

1. Create one design-system task (`per-page identity kit`).
2. Create per-house / per-page application tasks that depend on the design-system task completing first.
3. Link with `depends_on`.

If no, create each as an independent task.

**Remember:** the per-page visitor quote (#26) is explicitly separate from the sorting-hat homepage design (priority #1). Do not bundle them.

---

## Phase 4 — Close FRAC-144

1. **Move FRAC-144 `in_progress → review`**.
2. **Review sub-agent verifies** (fresh context) that:
   - All actionable items from Tyler's feedback and the user's additive direction are either spun out or captured as blocked/dropped comments.
   - The plan file reflects the triage decisions.
   - No implementation work has been committed on FRAC-144 itself.
3. **Move FRAC-144 `review → done`** once review passes. Child tasks proceed on their own lifecycles.

**Cardinal rule** (per user memory on Lattice umbrella tasks): FRAC-144 completes when the **triage** is done, NOT when all children finish. Children own their own lifecycles.

---

## Worktree discipline reminder

Multiple child tasks may be dispatched in parallel. Per CLAUDE.md: **parallel implementation sub-agents MUST use Agent `isolation: "worktree"`**. Shared worktrees cause catastrophic HEAD races even on disjoint files. This is non-negotiable.

Overlap clusters to watch for under FRAC-144:
- **3D model / hero** — glowing nodes (#22), double-X bug (#4), sorting hat (#1) if it touches the hero
- **Nav bar** — PColitical fix, collapse repetition (#2)
- **Per-page identity kit** — crest, title, quote, SVG icons, iconic person all touch page templates
- **Color system** — color pairs (#3), page titles (#25), Get Involved links all touch shared tokens

Sequential is fine when there's only one impl agent in flight. Isolation kicks in the moment a second concurrent impl agent is spawned.
