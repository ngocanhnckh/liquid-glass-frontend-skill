# Liquid Glass Frontend — a Claude skill

A [Claude](https://claude.com/claude-code) **skill** for building beautiful, distinctive, *awwwards-tier* web frontends: real Apple-style **liquid-glass** surfaces, choreographed **motion.dev** animations, and creative **editorial layouts** — instead of the generic SaaS look (icon-card rows, centered heroes, default fonts, uniform fade-ins).

It's the distilled, production-tested playbook behind a full enterprise chat app + landing site: the frosted-glass material system, a three-number themeable color architecture with dark + light modes, scroll/stagger/parallax animation patterns, type-as-hero typography, and the composition rules that keep it from looking like AI slop.

## What's inside

```
SKILL.md                          # the skill entry point — methodology + non-negotiables
references/
  creative-direction.md           # awwwards-tier taste: signature moments, kill the generic vocabulary
  liquid-glass.md                 # the full frost/blur material system + layering rules
  motion.md                       # page-load orchestration, scroll reveals, parallax, scroll-scrub
  theming.md                      # 3-triplet palette, derived tokens, dark/light surfaces
  typography-color.md             # font pairing + palette choices that escape the slop look
  layout-composition.md           # asymmetric bands, overlap, depth, spacing rhythm
assets/
  globals.css                     # drop-in stylesheet: tokens + glass utilities + atmosphere
  examples/
    GlassCard.tsx                 # frosted card with the aura it needs to read as glass
    RevealSection.tsx             # scroll-triggered staggered reveal (motion)
    HeroBand.tsx                  # asymmetric two-column hero w/ load orchestration + parallax
```

## Install

**Claude Code** — drop it into your skills directory:

```bash
# personal (all projects)
git clone https://github.com/ngocanhnckh/liquid-glass-frontend-skill.git \
  ~/.claude/skills/liquid-glass-frontend

# or per-project
git clone https://github.com/ngocanhnckh/liquid-glass-frontend-skill.git \
  .claude/skills/liquid-glass-frontend
```

Claude discovers it automatically from the `name`/`description` frontmatter in `SKILL.md` and loads it when a task matches (building a landing page, dashboard, web-app UI, "make it look like liquid glass / awwwards," etc.). You can also invoke it explicitly.

**Any other agent / by hand** — `SKILL.md` and the `references/` are plain Markdown; read them as a design guide and copy `assets/globals.css` into your project.

## Quick start in a project

1. Copy `assets/globals.css` into your app, wire the three font CSS vars (`--font-display`, `--font-body`, `--font-mono`) to your chosen fonts.
2. Set the three brand triplets at the top of the stylesheet — that re-skins everything.
3. Wrap your app in `<div data-app data-theme="dark">…</div>` (toggle `data-theme` for light).
4. Build the colored atmosphere first, then lay glass over it. Reach for `.glass-surface`, `.glass-inset`, `.glass-menu`, `.glass-btn`.
5. Decide your signature moment and choreograph the motion. Steal from `assets/examples/`.

## Stack

Tailwind CSS v4 + `motion` (`motion/react`) + Next.js App Router are the reference stack, but the glass/token system is plain CSS and works anywhere; the animation patterns apply to any motion/framer-motion setup.

## License

MIT — see [LICENSE](./LICENSE).
