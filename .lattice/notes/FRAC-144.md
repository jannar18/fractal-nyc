# Tyler's Website Feedback — Apr 9, 2026

Source: user-pasted feedback document (origin: Tyler, user-generated and unverified per system note)
Reviewer: Tyler
Status: Captured, awaiting triage. **User direction: save this list for now, do not spin out child tasks yet.**

This note is the umbrella record. When triage runs, individual fixes should be spun out as their own FRAC tasks and linked to FRAC-144.

---

## User's Priority Direction (Apr 9 2026)

The top-priority theme is **user journey redesign** — not the individual legibility/nav bugs. The user framed it as follows:

### The "Sorting Hat" concept

> "Instead of showing the banners multiple times or giving selection to something they don't understand — which is like being shown Hufflepuff, Slytherin, Ravenclaw, and Gryffindor without knowing them — there should be a sorting hat that is like: why are you here, who are you, what do you seek?"

**The frame:** Visitors arrive without context for Fractal's internal taxonomy (the six houses, Campus vs Neighborhood vs Events, etc.). Asking them to pick from that taxonomy cold is like asking a first-year to pick a Hogwarts house before knowing what any of them stand for. The current homepage does exactly this — dumps the taxonomy and asks the visitor to self-route.

**The fix:** Replace the taxonomy-first homepage with an intent-first sorting flow that asks the visitor *why they're here*, then routes them to the right place.

### Example intents the sorting hat should recognize

These are the user's examples — not an exhaustive list, treat as seed personas:

- "I am a subletter" (looking for housing)
- "I am a curious newcomer" (just heard about Fractal)
- "I am an event seeker" (wants to attend things)
- "I know Daniel" (personal connection entry)
- "I am an eager host" (wants to host events/people)
- "I took a Fractal U class" (alumni-style re-engagement)
- "I am an investor" (funding interest)
- "I want to make a Fractal in Phoenix, AZ" (replicator / franchise interest)

The user suggested: "maybe we generate a list of options" — open to expanding the intent set beyond these examples.

### The second priority: stop repeating the same options everywhere

> "The second part is limiting the repeat of the same options both in the nav bar, the 3D model, and the banners."

Today, the same menu items appear in (at least) three places:
1. The top nav bar
2. The 3D octahedron model
3. The homepage "getting involved" banner strip

This violates the "one primary affordance" principle — repeating the same options three ways doesn't give users three choices, it gives them the same choice three times and makes each one feel weaker. Collapse the repetition. Each surface should do something distinct.

### The third priority: contrasting color pairs

> "The other priority is creating color pairs that have contrasting colors."

Tyler's legibility complaints all trace back to the same underlying problem: the site picks text colors that sit too close to their background. Page titles on Campus are "so subtle it was easy to forget what page you were on," "Get Involved" links are "very hard to read," and page titles generally are "rendered in a color too close to the background."

The directive: define **color pairs** — foreground/background combinations with intentional, verified contrast — and use those pairs consistently instead of picking colors by vibe. Per-section accent colors exist already (the per-house palettes from FRAC-37), but what's missing is a codified text-on-accent contrast system.

Rough scope for when this gets triaged:
- For each section/house accent color, define which text colors meet contrast requirements on it (both light and dark text options).
- Codify these pairs as design tokens so components can reference the pair, not the raw color.
- Audit the existing pages for violations — Campus page title, Get Involved links, Story page text, etc.
- Mobile first: contrast verification must hold at 375px viewport where text is often smaller.

### The fourth priority: fix the double-X bug on the hamburger menu popover

> "Also the double X bug on the three bar menu popover is a priority."

The hamburger menu has two close (X) buttons in the upper-right corner when opened — one of them doesn't work. This is a straight bug, not a design question. Elevated above the other nav bugs because it breaks a core affordance users reach for when they want to dismiss the menu, and because a broken close button on the primary nav is the kind of thing every visitor will hit.

Rough scope for when this gets triaged:
- Find both X buttons in the menu component, identify which one is the live one vs. the dead one.
- Delete the dead one. Don't try to make both work — two close buttons in one corner is the bug even if both worked.
- Verify on mobile (375px) where finger targets matter most.

---

## Additional User Design Direction (Apr 9 2026)

Separate from Tyler's feedback — direction the user gave in the same capture session. These are design additions to build, not bugs to fix. Listed in the order given.

### 1. Make the 3D model nodes more enticing — glow around them

The user wants the **nav nodes on the 3D octahedron model** to feel more enticing, with a glow around them. These are the clickable navigation points on the homepage hero — the same nodes that got hit-target and hover-grace fixes earlier today (see recent commits under the previous FRAC-144 short code: "nav node tooltips clickable with 100ms hover grace", "hit-target box" work, etc.).

Rough scope for when this gets triaged:
- Add a glow effect (CSS filter, shader, or SVG halo — match whatever the 3D model uses) around each node.
- Consider pulse / hover-brighten states to draw the eye before interaction.
- Verify the glow doesn't interfere with the existing hit-target geometry fixes from the prior FRAC-144 work.
- Mobile-first (375px): glow must work on touch, where there's no hover state to telegraph interactivity.

### 2. Integrate the existing decorative design + banner design (same family)

The user has both a decorative design and a banner design already made — **and they're similar / part of the same design family**, not two independent assets. Both just need to be implemented.

**Open questions:**
- Where is the design asset? Need to locate the source file(s) before scoping. Could be in `public/`, a `design/` folder, Figma, a shared drive, or external.
- "Banner" here = the deck banner. Still need to clarify what a "deck banner" is in this project's vocabulary — hero banner for a specific page, a banner for a card/deck component, or a new element entirely.
- Since the two designs share a visual family, they should be implemented in one coordinated pass (or at least share design tokens), not as independent one-off tasks.

### 4. Per-page crest design

Each page should have a crest — a new identity mark per page. **Open questions:** (a) is there a template or style brief for the crest form? (b) should the crest match the per-house accent color from FRAC-37, or have its own identity? (c) where does the crest render on the page — header, hero, footer, all of the above?

### 5. Page name bigger and bolder

Spell out the page name more boldly and bigger at the top of each page. **This directly echoes Tyler's legibility complaint** (page titles "too small and rendered in a color too close to the background" — e.g., Campus). The user is affirming and extending that direction. Bundle this work with Tyler's legibility item and the color-pair priority.

### 6. Per-page target-visitor quote or description

Each page should have a short quote or description telling visitors who this page is for / what it's about. E.g., Neighborhood → "For those who want to live near creative peers." **Clarified Apr 9 2026:** this is **separate from the sorting-hat design** (priority #1). Do not conflate or bundle them — they're independent initiatives. The per-page quote stands on its own as a page-identity element, not as a sorting-hat confirmation step.

### 7. Per-house fractal icon (SVG)

**Clarified Apr 9 2026:** the user has a fractal icon they want to use for each house, and these need to be generated as **SVG art**. This is distinct from FRAC-112 (per-page fractal background *wallpapers*, already done) — those are backgrounds; this is an icon / mark.

Scope:
- Generate an SVG fractal icon per house (6 icons — one for each of the six houses).
- Icons render crisply at any size (that's the SVG point).
- Likely lives inside the per-page crest (#4) or alongside the bolder page title (#5), but placement needs to be designed.

**Open questions:**
- Does the user already have the fractal icon concept/reference/source, or should it be generated from scratch per house? ("I have a fractal icon I want to use for each house" — "have" suggests an existing asset or at least a clear concept.)
- If the user has source material, where is it?
- Does each house's icon derive from its per-house accent color (FRAC-37), or are all icons monochromatic?
- Is this the fractal inside the crest, or a separate element next to the crest?
- What about non-house pages (Story, Campus, Lab, People) — do they get a fractal icon too, or is this strictly a 6-house identity element?

### 8. Per-page iconic person

Each page should feature an iconic person associated with it. **Open questions:** (a) who per page — is this drawn from the existing leaders data (FRAC-50), or a separate curated roster? (b) what content about them — photo + name, or quote + bio, or something else? (c) is this a replacement for the People page's "show faces" direction (Tyler's #10 concern) or orthogonal?

### Emerging pattern: per-page identity kit

Items #4, #5, #6, #7, #8 together describe a consistent per-page identity kit: crest + bold title + visitor-targeting quote + fractal icon + iconic person. This is worth naming as a pattern when triage runs — likely a single design system task rather than 5 separate tasks, followed by per-page application tasks. Flag for the user to confirm this framing.

**Note:** the per-page visitor quote (#6) is explicitly *separate* from the sorting-hat homepage design (priority #1) per user clarification Apr 9 2026. The identity kit and the sorting hat are independent initiatives; don't bundle them.

---

## Tyler's Full Feedback (verbatim, lightly reformatted)

### Overall Assessment

The site does a strong job presenting Fractal as a brand — the aesthetic is cool and distinctive. The core issues are around information hierarchy, legibility, and user journey design. The site currently treats all content as equally important, which means nothing feels prioritized.

### High Priority

**No Clear Funnel or Information Hierarchy**

The homepage presents 8 equally weighted menu options and 6 "ways to get involved" with no prioritization. Compare this to a product site: everything funnels toward one or two key actions. Fractal's site needs to decide: what do we most want visitors to do? Then design the hierarchy around that. The "get involved" options should be ranked, with top actions featured prominently and the rest tucked into sub-options.

**User Journey Mapping Needed**

Different visitors come with different goals (e.g., someone looking to sublet, someone curious about the community, someone who wants to attend events). Right now, the site doesn't make it easy for any specific user type to quickly reach their goal. Example: a subletter wouldn't intuitively click "Neighbourhood" to find a sublet form.

**Legibility Issues (Sitewide)**

- All-caps text on the Story page (and elsewhere) tanks readability — people don't want to read walls of capitalized text.
- "Get Involved" links have the same legibility problem — some are very hard to read.
- Page titles are too small and rendered in a color too close to the background. On the Campus page, the word "Campus" was so subtle it was easy to forget what page you were on.

### Medium Priority

**Navigation Problems on Subpages**

- The only navigation option is the hamburger menu, which opens a 3D menu where some options aren't available.
- The nav menu has two X/close buttons in the upper right — one of them doesn't work.

**"Gain of Function Research" Heading (Lab Page)**

The phrase "doing gain of function research on the golden age virus" works in conversation but is jarring as a website heading. The words "gain of function" and "virus" trigger immediate alarm for most readers. This demonstrates a lack of tact for a public-facing page.

**People Page — Missed Opportunity**

If someone hears about Fractal, one of their first questions is "who are these people?" They'll click the People page expecting to see faces — people they might want to befriend, network with, or (let's be real) flirt with. Instead, they get an invitation to join a Discord. Show faces first.

**Heading-to-Content Disconnect**

On the Neighbourhood page, the heading says "Live near 100 friends and peers" and the next section is about subletting. The logical connection isn't clear — is subletting the way to live near 100 friends? If so, that needs to be spelled out. This pattern repeats elsewhere: headings don't flow naturally into the content below them.

### Lower Priority / Notes

**NYC Background Image**

The faded NYC background looks great at a glance, but up close it's slightly pixelated/artifacted. Minor, but noticeable on inspection.

**Campus Page — Missing Context & Balance**

- Merlyn's Place and Fractal Tech Hub appear as options but have no descriptions until you scroll down. A brief tagline for each would help orient visitors.
- Only two options makes it feel like Fractal's campus life is fully defined by those two vibes. A third offering would better represent the diversity of what Fractal does. (Previously, Rectangle's living room might have filled this role.)
- Fractal U is missing from the Campus page — that's arguably the most "campus-like" thing Fractal offers (learning), and it's strange not to see it here.

**Lab Page Organization**

- Blog posts sorted under "Lab" is a bit confusing (even if the idea is they're "research").
- Keywords/tags take up too much vertical space — they should move to a sidebar so visitors can see the actual content they're filtering.

**Banner Links Repeat Menu Items**

The "Getting Involved" banner links appear to duplicate the main menu items, which creates confusion — visitors expect them to lead somewhere different.

### Tyler's Recommended Next Steps

1. Define 1–2 primary actions the site should funnel visitors toward, then restructure the homepage around those.
2. Map 3–4 user personas (subletter, curious newcomer, event-seeker, potential collaborator) and trace their ideal paths through the site.
3. Fix legibility: ditch all-caps for body text, increase page title size/contrast, audit link readability.
4. Fix navigation: resolve the double-X bug, ensure all menu options are functional.
5. Add faces to the People page before the Discord invite.
6. Rewrite the Lab heading — keep the spirit, lose the bioterrorism vibes.

---

## Agent-Parsed Action Items (for future triage)

### High priority — user's four stated priorities
1. **Sorting hat homepage** — replace taxonomy-first menu with intent-first flow ("why are you here?"). Seed intents listed above.
2. **Collapse repetition** — same menu items appear in nav bar, 3D model, and banners. Each surface should do something distinct.
3. **Contrasting color pairs** — define codified fg/bg text color pairs per section, audit existing pages for violations. Underpins all the legibility items below.
4. **Double-X bug on hamburger menu popover** — two close buttons in upper-right, one doesn't work. Delete the dead one. Elevated out of nav-bugs bucket because every visitor will hit this.

### High-severity bug noticed during capture (not from Tyler)
5. **"PColitical CLub" text corruption on nav bar** — the Political Club nav item renders as "PColitical CLub" instead of "Political Club" (or "PC"). Almost certainly a regression of FRAC-126 ("Political Club: rename logo to PC globally"). Looks like a partial/stacked string replace left fragments of both the old and new labels. Surgical fix, not a triage cycle.

### High priority — supporting tasks
6. **Homepage hierarchy** — rank the 6 "get involved" options; top actions prominent, rest sub-options. (This may get absorbed into #1.)
7. **User journey paths** — ensure each seed persona can reach their goal. E.g., subletter should not need to guess "Neighbourhood."
8. **Page titles: larger size + use contrast pair** — Campus especially. (Will be fixed by #3 once the pair system exists.)
9. **"Get Involved" link readability** — apply contrast pair. (Will be fixed by #3.)
10. **Kill all-caps body text** on Story page (and elsewhere). Independent of the color work.

### Medium priority — navigation bugs
11. Nav: only hamburger available on subpages; add secondary nav.
12. Nav: 3D menu missing options that exist elsewhere.

### Medium priority — content/copy
13. Lab page heading rewrite — "gain of function research on the golden age virus" sounds like bioterrorism to cold readers.
14. People page — show faces before the Discord invite.
15. Heading→content flow — Neighbourhood page "Live near 100 friends" doesn't bridge to subletting. Audit pattern sitewide.

### Lower priority
16. NYC background image — pixelation/artifacts up close.
17. Campus page taglines for Merlyn's Place and Fractal Tech Hub.
18. Campus page third offering (Rectangle's living room successor?).
19. Fractal U missing from Campus page.
20. Lab page: blog-posts-as-research framing is confusing.
21. Lab page: move tags/keywords to sidebar to free vertical space.

### Additive design direction (from user, not Tyler — Apr 9 2026)
22. **Glowing nodes** — make the 3D octahedron model's nav nodes glow / feel more enticing. (Not "notes" — nodes = the clickable nav points on the hero 3D model.)
23. **Decorative design + deck banner design (same family)** — user already has these assets; they're part of the same visual family, not two independent items. Locate asset(s) and implement together with shared tokens.
24. **Per-page crest** — new identity mark per page. Design brief needed.
25. **Bigger/bolder page titles** — echoes Tyler #8 and #10; bundle with color-pair work (priority #3).
26. **Per-page visitor-targeting quote** — short quote/description of who the page is for. **Explicitly separate from sorting-hat design (priority #1)** per user clarification — do not bundle.
27. **Per-house fractal icon as SVG** — user has a fractal icon concept for each house; 6 SVG icons to generate, one per house. Distinct from FRAC-112 (background wallpapers). Likely renders inside crest or near page title.
28. **Per-page iconic person** — design and sourcing both need clarification.
29. **Per-page identity kit** — potential synthesis of #24, #25, #26, #27, #28 into one design-system task. Confirm with user. (Note: this is independent of the sorting-hat homepage work.)

---

## Open Questions for Triage (when we get there)

**Strategic (human decision required before scoping):**
- Sorting hat: which intent set is canonical? Tyler's 4 + user's 8 examples + more?
- For each intent, what's the destination page/flow? (Some routes don't exist yet — e.g., investor page, replicator/franchise inquiry.)
- What are the 1–2 primary actions the homepage should funnel toward?
- Campus page third offering — is Rectangle's living room returning, or a new space?
- Is Fractal U's absence from Campus an oversight or intentional?
- People page — consent/permission for showing faces publicly?
- "Get Involved" ranking — in what order?
- Lab heading rewrite — what copy preserves the spirit without the bioterrorism vibes?

**Tactical (can answer via codebase/PRD exploration):**
- Does the PRD (FRAC-22) already specify homepage funnel structure? Confirming drift vs. critiquing the PRD are very different responses.
- Is the 3D hamburger menu intentional brand or a friction point?
- Are the duplicate "Getting Involved" banner links a leftover or intentional redundancy?
- Which of these overlap with existing in-flight tasks (avoid duplicates)?

**Strategic — additive design direction (human decision required):**
- Decorative + deck banner designs — where are the source assets (file, Figma, shared drive)?
- "Deck banner" — what is a deck banner in this project's vocabulary (hero banner, card/deck component, or new element)?
- Per-page crest — is there a template/style brief? Does it reuse per-house accent colors? Does the per-house SVG fractal icon live inside it, next to it, or separately?
- Per-page iconic person — who per page? Drawn from existing leaders data (FRAC-50) or a separate curated roster? What content (photo+name, or quote+bio)? Does this replace the People page "show faces" direction (Tyler #10) or complement it?
- Per-house fractal icon — does the user already have source material/concept, or generate from scratch per house? Does each icon derive from the per-house accent color (FRAC-37)?
- Non-house pages (Story, Campus, Lab, People) — do they get a fractal icon too, or is this strictly a 6-house identity element?
- "Per-page identity kit" synthesis — does the user want #24-28 bundled as one design system pattern, or treated independently?

**Resolved clarifications (Apr 9 2026):**
- ~~"Notes" with glow~~ → **Nodes**, not notes — the clickable nav points on the 3D octahedron model.
- ~~Decorative design vs deck banner are two separate assets~~ → Same visual family; implement together.
- ~~Per-page fractal extends FRAC-112~~ → Separate element: SVG fractal icons per house, distinct from the background wallpapers.
- ~~Per-page visitor quote has synergy with sorting-hat~~ → Explicitly separate initiatives per user; do not bundle.

---

## Triage Process (when we get there)

Full step-by-step triage process is in a standalone file: **`.lattice/notes/FRAC-144-triage-steps.md`**.

Four phases:
1. **Orient** — move to `in_planning`, re-read PRD, check for overlapping in-flight work.
2. **Verify current state** — 19 concrete verification checks (mobile 375px + desktop) before spinning out anything.
3. **Spin out child tasks** — follow the FRAC-122 precedent; capture blocked items as comments, not tasks.
4. **Close FRAC-144** — review gate, then done.

Cardinal rule: FRAC-144 completes when the **triage** is done, NOT when all children finish.
