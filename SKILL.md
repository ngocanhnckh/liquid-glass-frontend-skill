---
name: liquid-glass-frontend
description: Use when building a beautiful, distinctive, awwwards-tier web frontend — landing pages, dashboards, web apps, marketing sites — that needs Apple-style liquid-glass surfaces, choreographed motion.dev animations, and creative editorial layouts instead of the generic SaaS look (icon-card rows, centered heroes, default fonts, uniform fade-ins). Covers creative direction and signature interactions, the frost/blur glass material, single-source color tokens with dark+light theming, scroll/stagger/parallax/scroll-scrubbed animation, type-as-hero typography, and asymmetric grid-breaking composition.
---

# Liquid Glass Frontend

Build frontends people remember: real Apple-style frosted glass, motion that feels alive, layouts that break the grid on purpose, and a token system you re-skin in three numbers. This skill is the distilled, production-tested playbook behind a full enterprise app + landing site.

**The bar is an Awwwards Site of the Day — not a template.** Editorial confidence, a signature interaction, distinctive type, and intentional asymmetric composition. Never the generic SaaS vocabulary of three icon-cards in a row, a centered hero, default fonts, and uniform fade-ins. If what you're building looks like every other landing page, it's not done. `references/creative-direction.md` is the taste layer — read it.

**Announce at start:** "I'm using the liquid-glass-frontend skill to design this interface."

## The non-negotiables

These are what separate a memorable interface from generic AI output. Hold all of them:

1. **Aim for awwwards-tier, not template-tier.** Decide the ONE signature moment someone will screenshot, and over-invest there. Kill the generic component vocabulary (icon-card rows, centered hero, even spacing). See `references/creative-direction.md`.
2. **Commit to one bold aesthetic direction.** Pick an extreme (warm editorial, refined minimal, retro-futuristic, brutalist, luxury) and execute it precisely. Timid middle-ground reads as slop.
3. **Typography is the design.** Big, characterful, *mixed* — italic accents, variable-font axes, mono kickers, oversized numerals. No default fonts (Inter/Roboto/Arial/system-ui as the character face), no purple-on-white gradient. See `references/typography-color.md`.
4. **Break the grid deliberately.** Asymmetric bands, overlap, layered depth, dramatic scale contrast, generous negative space. Not rows of equal cards. See `references/layout-composition.md`.
5. **Choreograph the motion.** A signature interaction (masked text reveal, scroll-scrubbed motion, cursor-reactive aura, color chapters) + orchestrated page-load + scroll reveals — all sharing one easing signature. Not fade-in-up on everything. See `references/motion.md` and `references/creative-direction.md`.
6. **Liquid glass means real frost, not transparency.** A see-through `rgba()` box is NOT glass. Glass = heavy `backdrop-filter: blur()` + `saturate()` + a specular top edge + a colored aura *behind* it so the frost has something to refract. See `references/liquid-glass.md`.
7. **One source of truth for color.** The entire palette derives from three RGB triplets. Re-skinning is editing three lines. See `references/theming.md`.

## Workflow

1. **Decide the aesthetic + the signature moment** — tone, audience, and the ONE thing someone will screenshot. Write both down in a sentence before any code. (`references/creative-direction.md`)
2. **Lay the token foundation** — drop in `assets/globals.css`, set the three brand triplets, pick characterful fonts. This makes everything else cohesive by default.
3. **Build the atmosphere first** — background gradient mesh / blobs / grain. Glass needs something colorful behind it to read. A glass card on flat #fff is invisible.
4. **Compose editorially** — asymmetric bands, type-as-hero, layered depth, dramatic scale contrast. Kill the icon-card-row instinct. (`references/layout-composition.md` + `references/creative-direction.md`)
5. **Skin surfaces in glass** — `.glass-surface` for panels, `.glass-inset` for tiles-on-glass, `.glass-menu` for popovers, `.glass-btn` for buttons.
6. **Choreograph motion** — build the signature interaction, then page-load stagger, then scroll reveals, then micro-interactions — all on one easing curve. `references/motion.md` has copy-paste variants.
7. **Add the light theme** — the tokens already support it; verify glass still reads (light mode needs *thinner, more saturated* frost — see the gotcha below).
8. **Run the honesty check** — would it place on awwwards, or does it look like every SaaS page? If the latter, push type/layout/motion harder. (`references/creative-direction.md`)

## Tech baseline

- **Next.js (App Router) + React + TypeScript** — but the CSS system is framework-agnostic; the glass utilities are plain CSS.
- **Tailwind CSS v4** — `@theme` for tokens, `@utility`/plain classes for the glass material. (v3 works too; put the utilities in a `@layer`.)
- **motion** (`motion/react`, formerly framer-motion) — the animation engine. `import { motion, useScroll, useTransform } from "motion/react"`.
- Fonts via `next/font/google` (or `@fontsource`). Pick characterful — examples in `references/typography-color.md`.

## The five glass utilities (what to reach for)

| Class | Use for | Has `backdrop-filter`? |
|---|---|---|
| `.glass-surface` | Large panels: sidebars, nav bars, hero cards | Yes — heavy frost |
| `.glass-surface-soft` | Floating elevated panels needing more depth | Yes — heaviest |
| `.glass-menu` | Dropdowns / popovers over busy content | Yes, but ~94% opaque so text stays readable |
| `.glass-inset` | Tiles, chips, list items **inside** a glass panel | **No** — see the #1 gotcha |
| `.glass-inset-hover` | Hover state for tabs/buttons/menu items | No — sheen lift, not a color swap |
| `.glass-btn` (+`--clay`/`--ink`) | Buttons | Yes |

## Top gotchas (learned the hard way)

- **Never nest `backdrop-filter` inside `backdrop-filter`.** It breaks compositing — the inner frost renders garbage or nothing. A glass panel frosts the background once; everything inside it uses `.glass-inset` (a translucent tint + top sheen, no filter of its own).
- **Glass is invisible without a colored backdrop.** Put a gradient mesh / blob / aura behind glass surfaces. On a flat solid color there is nothing to refract and it looks like a plain semi-transparent box. The `--aura` token controls this.
- **Light mode needs the *opposite* tuning from instinct.** White panels hide the frost. In light theme, use a *thinner* panel mix (~30% instead of 42%) and *higher* `saturate()` (210%+) so the pastel aura reads through. The provided CSS already does this — keep the override.
- **Popovers get trapped behind content.** An ancestor with `backdrop-filter` creates a stacking context that traps `z-index`. Render dropdowns/modals at the shell root with `position: fixed` and a high z, not nested where they're declared.
- **Tailwind v4 `@theme` caches aggressively.** After editing tokens, restart the dev server with a clean cache (`rm -rf .next`) — HMR won't always pick up `@theme` changes.

## Reference files (load when you need depth)

- `references/creative-direction.md` — **read first.** The awwwards-tier taste layer: the signature-moment rule, the generic-vocabulary kill list, type-as-hero, signature interaction patterns, the honesty check.
- `references/liquid-glass.md` — the full material system, every utility explained, layering rules, the colored-aura technique.
- `references/motion.md` — page-load orchestration, scroll reveals, stagger, parallax, animated gradients, the house easing curve.
- `references/theming.md` — three-triplet palette, derived tokens, dark/light surface tokens, opacity composition.
- `references/typography-color.md` — font pairing that isn't slop, choosing a palette, the "avoid generic AI aesthetics" rules.
- `references/layout-composition.md` — asymmetric bands, overlap, grain, geometric line-art, spacing rhythm.

## Drop-in assets

- `assets/globals.css` — the complete stylesheet: brand tokens, glass utilities, theming, atmosphere. Copy it, set three triplets, go.
- `assets/examples/GlassCard.tsx` — a frosted card with aura.
- `assets/examples/RevealSection.tsx` — scroll-triggered staggered reveal.
- `assets/examples/HeroBand.tsx` — asymmetric two-column hero with page-load orchestration + scroll parallax.

Remember: match implementation effort to the vision. Maximalist directions need elaborate motion and layered effects; refined-minimal directions need restraint and obsessive spacing. Elegance is executing *a* clear vision fully — not turning every knob to 11.
