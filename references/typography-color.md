# Typography & Color — escaping the AI-slop look

The fastest tell of a generic AI frontend is its fonts and its palette. Get these two right and you're already distinctive.

## Never ship these (the slop list)

- **Fonts:** Inter, Roboto, Arial, Helvetica, system-ui *as the character font*. (They're fine as a fallback in the stack, never the identity.) Also avoid the now-overused "AI default" Space Grotesk — vary your choices across projects.
- **Color:** purple/violet gradient on white. Indigo-to-pink. Evenly-distributed timid palettes where nothing dominates.
- **Layout:** centered single column, three equal feature cards, hero with one centered headline + two buttons. (See `references/layout-composition.md`.)

## Font pairing that works

Pair a **distinctive display face** (headlines, big numbers) with a **clean, characterful body face**, plus a **mono** for kickers/labels/code. Three roles, three fonts.

A proven trio (warm-editorial direction):

```ts
import { Fraunces, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";

const display = Fraunces({                 // expressive serif w/ optical sizing + WONK/SOFT axes
  subsets: ["latin", "latin-ext", "vietnamese"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display", display: "swap",
});
const body = Be_Vietnam_Pro({              // clean humanist sans, broad language coverage
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body", display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
```

Other strong display directions to vary between projects:
- **Refined/luxury:** a high-contrast serif (Fraunces, Newsreader, Playfair) + a grotesque body.
- **Retro-futuristic / techno:** a wide display (Clash Display, Druk-style) + a neutral sans.
- **Brutalist/editorial:** a monospace display + serif body, or oversized condensed.
- **Soft/organic:** a rounded humanist (e.g. a friendly slab) + airy body.

**Language coverage matters.** If the product is multilingual (e.g. Vietnamese, with its stacked diacritics), pick fonts whose subsets include `vietnamese` / `latin-ext`, or accented glyphs render in an ugly fallback. Be Vietnam Pro and Fraunces both cover it.

## Display type details

Make headlines *typographically* designed, not just big:

```css
.display {
  font-family: var(--font-display);
  font-optical-sizing: auto;
  font-weight: 360;          /* variable-font weight, slightly < 400 reads elegant at huge sizes */
  letter-spacing: -0.025em;  /* tighten large display type */
  line-height: 0.9;          /* stacked headlines want tight leading */
}
.display-italic { font-style: italic; font-variation-settings: "WONK" 1, "SOFT" 4; }
```

Fluid sizing with `clamp()` so headlines scale with the viewport instead of breaking at breakpoints:

```css
font-size: clamp(3rem, 8.2vw, 7.6rem);
```

The **kicker** (small mono eyebrow above a headline) is a cheap, high-impact editorial touch:

```css
.kicker {
  font-family: var(--font-mono);
  font-size: 0.72rem; letter-spacing: 0.34em; text-transform: uppercase;
  color: var(--color-clay-2);
}
```

## Choosing a palette

1. **Pick ONE dominant color** with conviction, plus a secondary accent. Dominant + sharp accent beats five balanced colors. A vetted color scale (Radix Colors, Open Color) saves you from muddy mid-tones — e.g. Radix *Tomato 9* `#E54D2E` as primary, a warm gold as secondary.
2. **Warm or cool neutrals, never pure grey.** Tint your blacks and whites toward the brand. This single choice makes a palette feel intentional. (Warm: ivory/clay/obsidian. Cool: slate/porcelain/ink.)
3. **High contrast for text.** Soft brand tints are for surfaces and accents, not body copy. Body text must hit readable contrast on its surface.
4. **Derive, don't enumerate.** From the three brand triplets you get every tint via opacity (`rgb(var(--primary)/0.16)`) — see `references/theming.md`.

## Texture beats flat fills

A faint grain overlay adds analog warmth and hides banding in gradients — a tiny detail that reads as "crafted":

```css
.grain::after {
  content: ""; position: fixed; inset: 0; z-index: 1; pointer-events: none;
  opacity: 0.04; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
```

`::selection` is a free brand moment most sites forget:

```css
::selection { background: var(--color-clay); color: var(--color-bone); }
```
