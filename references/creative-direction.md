# Creative Direction — awwwards-tier, not template-tier

The bar is an **Awwwards Site of the Day**, not a Bootstrap landing page. The difference is almost never "more features" — it's *editorial confidence*, a *signature interaction*, and a refusal to use the generic component vocabulary. This file is the taste layer that sits above the mechanics in the other references.

## The one rule

**Every project must have ONE signature moment** — the thing someone screenshots and remembers. A hero where the headline reveals letter-by-letter as a 3D mesh drifts behind frosted glass. A cursor-reactive gradient. A scroll where sections cross-fade through color chapters. A number that counts up as a chart draws itself. Decide what yours is *before* building, and spend disproportionate effort there. A site with one unforgettable moment and clean everything-else beats a site that's uniformly "nice."

## Kill the generic vocabulary

These patterns scream "template" — avoid them as defaults:

| Generic (avoid) | Awwwards move (reach for) |
|---|---|
| Row of 3 equal cards with a circle-icon, bold title, grey paragraph | Asymmetric editorial layout; numbered index list; overlapping panels; a single large feature with type as the hero |
| Centered hero: headline + subtitle + 2 buttons on flat bg | Asymmetric band, oversized type bleeding off-edge, living atmosphere behind glass, parallax depth |
| Generic line/circle icons from a kit | Type-led sections (no icon needed), custom marks, oversized numerals, or no icons at all |
| Even, timid spacing everywhere | Dramatic scale contrast — tiny mono kicker next to a 7rem headline; vast negative space then dense detail |
| One weight, one size of sans | A characterful display face doing real work: italic accents, variable-weight, optical sizing, mixed sizes in one headline |
| Fade-in-up on everything, identically | A *choreographed* sequence — masked text reveals, clip-path wipes, staggered columns, scroll-scrubbed motion |
| Section / section / section, all same rhythm | Chapters with distinct treatments — a dark editorial block, then a full-bleed color-flip panel, then a quiet spacious one |
| Sibling cards/tiles that all share one identical shape | Vary roles: a bento (tall lead + wide + compact) or a staggered cluster (different heights/sizes, dropped to different offsets, numbered `01`/`02`/`03`). See `layout-composition.md`. |
| "Fixing" identical cards by making every section a uniform *linear list* instead | That just trades one monotony for another. Vary the **pattern** between sections; make adjacent blocks contrast (linear timeline next to varied bento, not two identical slabs). |

## Type as the hero

On awwwards sites, **typography *is* the design** more often than imagery is.

- Set headlines huge with `clamp()` and tight leading (`line-height: 0.9`). Let them bleed past the viewport edge.
- Mix within one headline: a roman line, then an *italic brand-color* line, then roman again. Variable-font axes (`WONK`, `SOFT`, `opsz`) make a serif feel alive.
- Use a **numbered index** (`01 — 02 — 03`) in mono instead of icon cards for "features" or "steps." It reads editorial, not corporate.
- Kickers (small, wide-tracked, uppercase mono) above headlines give instant editorial polish — see `references/typography-color.md`.
- Oversized numerals for stats: a `text-7xl` figure with a tiny label beneath beats a stat-card-with-icon every time.

## Signature interaction patterns (pick 1–2, don't pile them on)

- **Masked / clip-path text reveal** — headline wipes in behind a moving mask on load.
  ```tsx
  <motion.span className="block overflow-hidden">
    <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span>
  </motion.span>
  ```
- **Scroll-scrubbed motion** — tie a value to scroll progress, not just a one-shot reveal:
  ```tsx
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]); // horizontal drift / marquee
  ```
- **Cursor-reactive aura** — a brand glow that follows the pointer behind glass (spring-smoothed `useMotionValue` → CSS var on a radial-gradient).
- **Color chapters** — the page background cross-fades through a palette as you scroll sections (`gradient-flow` + scroll triggers). Each chapter feels like turning a page.
- **Living atmosphere** — the drifting gradient-mesh blobs (see `references/motion.md`) refracting through frosted glass is itself a signature look.
- **Magnetic / lift micro-interactions** — buttons and tiles that subtly pull toward the cursor or lift on hover (keep it tasteful; `translate` a few px).

Restraint matters: two well-orchestrated signature moves read as *designed*; six competing ones read as a demo reel.

## Composition principles (the awwwards feel)

- **Asymmetry over symmetry.** Unequal grids (`1.05fr 0.95fr`), content anchored to a cell's bottom, deliberate off-center placement. See `references/layout-composition.md`.
- **Depth through layering.** Things overlap. A huge thin arc behind the headline; a card overhanging a section edge; glass over a living gradient. Flatness reads generic.
- **Dramatic scale contrast.** The jump from a 0.72rem kicker to a 7rem headline is the drama. Don't make everything mid-sized.
- **Negative space is confidence.** Empty columns and generous `py-32` say "we meant this." Cramming says "template."
- **A cohesive motion signature.** One easing curve everywhere (`[0.22, 1, 0.36, 1]`), consistent durations. Motion should feel like one hand designed all of it.

## The honesty check (before you ship)

Ask: *would this place on awwwards, or does it look like every SaaS landing page?* If it has three icon-cards in a row, a centered hero, default-feeling type, and uniform fade-ins — it's template-tier. Push it:

1. Replace the icon-card row with an editorial / numbered / asymmetric treatment.
2. Make the type bigger, more characterful, mixed.
3. Add the ONE signature interaction.
4. Introduce scale contrast and intentional asymmetry.
5. Give each section its own treatment instead of one repeated rhythm.

Match ambition to the brief — a refined-minimal product still needs a signature moment, it's just a quieter one (a perfect type ramp, an exquisite hover). The enemy is *generic*, not *bold-vs-quiet*.
