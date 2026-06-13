# Motion — animations that feel alive

Built with **motion** (`motion/react`, the successor to framer-motion). The goal: motion that feels orchestrated and intentional, never decorative jitter.

## The house easing curve

One custom cubic-bézier used everywhere gives motion a consistent signature. This one is a soft, confident ease-out:

```ts
const ease = [0.22, 1, 0.36, 1] as const;
```

Use it on nearly every transition. Consistency of easing is half of what makes motion feel "designed."

## Priority order

1. **One orchestrated page-load reveal** (staggered) — the single highest-impact moment. Do this first.
2. **Scroll-triggered entrances** — content rises in as you scroll.
3. **Micro-interactions** — glass hover lifts, button nudges. Last, and subtle.

Scattered micro-interactions impress less than one beautifully staggered load.

## Page-load orchestration (staggered reveal)

Variants with a `custom` index give each element a cascading delay. This is the hero entrance:

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  hidden: { y: 40, opacity: 0 },
  show: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease, delay: 0.12 + i * 0.1 } }),
};

export function Headline({ lines }: { lines: string[] }) {
  // mount gate avoids SSR/CSR flash — animate only after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <h1 className="display text-[clamp(3rem,8.2vw,7.6rem)] leading-[0.92]">
      {lines.map((line, i) => (
        <motion.span key={line} custom={i} variants={rise}
          initial="hidden" animate={mounted ? "show" : "hidden"} className="block">
          {line}
        </motion.span>
      ))}
    </h1>
  );
}
```

The `custom={i}` → `delay: 0.12 + i * 0.1` is the cascade. Each line arrives 100ms after the last.

## Scroll-triggered reveals

`whileInView` + `viewport={{ once: true, margin: "..." }}` fires the entrance when the element scrolls near view. The negative `margin` triggers it slightly *before* it's fully on screen so it never feels late.

```tsx
<motion.div
  initial={{ y: 26, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.8, ease }}
>
  {/* section content */}
</motion.div>
```

Stagger a group on scroll by nesting and using a container with `staggerChildren`:

```tsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6, ease } } };

<motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
  {features.map((f) => <motion.li key={f.id} variants={item}>{f.label}</motion.li>)}
</motion.ul>
```

## Scroll parallax

`useScroll` + `useTransform` map scroll position to any animatable value. Subtle parallax (a headline drifting up, an arc rotating) adds depth without distraction:

```tsx
import { motion, useScroll, useTransform } from "motion/react";

const { scrollY } = useScroll();
const titleY   = useTransform(scrollY, [0, 600],  [0, -70]); // headline drifts up
const arcRotate = useTransform(scrollY, [0, 1400], [0, 70]); // background arc rotates

<motion.div style={{ y: titleY }}>…headline…</motion.div>
<motion.div aria-hidden style={{ rotate: arcRotate }} className="arc absolute …" />
```

Keep parallax gentle (tens of pixels / degrees). Big parallax reads as gimmick.

## Animated backgrounds (the "living gradient")

CSS keyframes do the heavy lifting for ambient motion — cheaper than JS and runs off the main thread.

**Drifting gradient-mesh blobs** (the glass needs these to refract):

```css
.blob { position: absolute; border-radius: 999px; filter: blur(76px); mix-blend-mode: screen; will-change: transform; }
.blob--a {
  width: 50vw; height: 50vw; left: 42%; top: -10%;
  background: radial-gradient(circle, rgb(var(--primary-soft) / 0.78), transparent 70%);
  animation: floatA 22s ease-in-out infinite;
}
@keyframes floatA {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(-14vw,9vh) scale(1.16); }
  66%     { transform: translate(9vw,-8vh) scale(0.92); }
}
```

Use *different* long durations per blob (22s / 27s / 31s) so they never sync up — the motion stays organic.

**Flowing gradient panel** (a color-shifting section background):

```css
@keyframes gradientFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.gradient-flow { background-size: 220% 220%; animation: gradientFlow 20s ease-in-out infinite; }
```

**Ambient breathing glow** (no translate — keeps its anchor):

```css
@keyframes glowPulse { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.12); } }
.glow-pulse { animation: glowPulse 11s ease-in-out infinite; }
```

## Micro-interactions

- Buttons: `transition-transform hover:-translate-y-0.5` — a tiny lift. Subtle beats bouncy.
- Glass tiles: use `.glass-inset-hover` (see `references/liquid-glass.md`) — the tile frosts in rather than changing color.
- `layout` prop on `motion.div` animates position changes automatically (e.g. a card moving between Kanban columns).

## Reduced motion

Respect `prefers-reduced-motion` by default. If the brief explicitly calls for always-on motion (some marketing sites do), you can override — but make that a conscious, stated decision, and still avoid anything that could trigger vestibular issues (no large rapid parallax / spinning).

## Smooth scroll (optional)

For landing pages, **Lenis** gives buttery scroll that pairs well with scroll-triggered reveals. Wrap the app, and add the `.lenis` CSS hooks (in `assets/globals.css`). Don't use it inside scrollable app panels — only the main page scroll.
