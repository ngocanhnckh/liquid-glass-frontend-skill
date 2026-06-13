# Liquid Glass — the material system

Apple-style liquid glass is **frosted material**, not a transparent box. Four ingredients, always together:

1. **Heavy blur** — `backdrop-filter: blur(24–44px)`. This is what actually frosts the background. A `blur(4px)` reads as "slightly smudged," not glass.
2. **Saturation boost** — `saturate(180–220%)`. Blur greys out the colors behind it; saturate puts the vibrancy back so the glass looks *alive*, not muddy.
3. **A specular top edge** — `box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.15–0.6)`. A 1px highlight along the top reads as light catching a glass lip. This single line is what sells "glass."
4. **A colored aura behind it** — glass has nothing to refract over a flat color. A gradient/blob/glow behind the surface is what makes the frost *visible*. See "The aura" below.

## The five utilities

Copy these from `assets/globals.css`. Here's what each is for and why.

### `.glass-surface` — large panels (sidebar, nav, hero card)

```css
.glass-surface {
  background: color-mix(in srgb, var(--app-panel) 42%, transparent);
  -webkit-backdrop-filter: blur(34px) saturate(190%);
  backdrop-filter: blur(34px) saturate(190%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.15),
    inset 0 0 0 1px rgb(255 255 255 / 0.03);
}
```

The `color-mix` with the theme panel token (not a hardcoded rgba) is what makes it theme-aware automatically.

### `.glass-surface-soft` — floating panels that need more depth

Heaviest frost + a drop shadow so it lifts off the page. Use for modals, command palettes, prominent cards.

### `.glass-menu` — dropdowns / popovers over busy content

```css
.glass-menu {
  background: color-mix(in srgb, var(--app-panel) 94%, transparent);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.14), var(--app-shadow);
}
```

**Why ~94% opaque?** A fully translucent dropdown over scrolling content makes its text unreadable. Keep the glass *hint* (blur + sheen) but raise opacity so content doesn't bleed through. This is the right call for anything with small text floating over a live page.

### `.glass-inset` — tiles / chips / list items INSIDE a glass panel

```css
.glass-inset {
  background: color-mix(in srgb, var(--app-elev) 60%, transparent);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.10);
}
```

**Critical: no `backdrop-filter` here.** This is the #1 mistake. You cannot nest `backdrop-filter` inside another `backdrop-filter` — it breaks GPU compositing and the inner element renders blank or garbage. The parent `.glass-surface` already frosted the background. Inset elements are just a translucent elevated tint + a top sheen so they read as *glass tiles sitting on glass*.

### `.glass-inset-hover` — hover for tabs / buttons / menu items

```css
.glass-inset-hover { transition: background-color .2s ease, box-shadow .2s ease; }
.glass-inset-hover:hover {
  background: color-mix(in srgb, var(--app-elev) 70%, transparent);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), inset 0 0 0 1px rgb(255 255 255 / 0.05);
}
```

Hover should make a frosted tile **lift in** (more opacity + brighter edge), not swap to a flat brand color. This is what makes the whole UI feel like one continuous glass material.

## Buttons: `.glass-btn` and variants

```css
.glass-btn {
  border-radius: var(--radius-pill);
  background: rgba(243,238,227,0.10);
  backdrop-filter: blur(26px) saturate(185%);
  -webkit-backdrop-filter: blur(26px) saturate(185%);
  border: 1px solid rgba(243,238,227,0.22);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -8px 18px rgba(0,0,0,0.10), 0 10px 30px -14px rgba(0,0,0,0.5);
  transition: background .3s ease, border-color .3s ease;
}
.glass-btn:hover { background: rgba(243,238,227,0.17); border-color: rgba(243,238,227,0.42); }
```

- `.glass-btn--clay` — primary, brand-tinted frosted glass (translucent brand color + brand glow shadow).
- `.glass-btn--ink` — for **light backgrounds**: light frost, dark text, white inner highlight.

A landing-page CTA that's fully transparent is the most common "doesn't get glass" mistake. The button must visibly frost what's behind it.

## The aura — why your glass might look like nothing

Glass refracts what's behind it. Over a flat `#ffffff` or `#15110D` there is nothing to refract, so frost looks like a plain semi-transparent rectangle. **You must put color behind glass surfaces.**

Two techniques:

**1. The `--aura` token** — each theme sets an ambient gradient strength. Place a soft radial-gradient glow (brand color) behind major glass panels at `opacity: var(--aura)`. Dark themes carry a rich aura (~0.32); light themes a softer pastel (~0.28).

**2. Floating gradient-mesh blobs** — large blurred radial gradients with `mix-blend-mode: screen`, slowly drifting (see `references/motion.md` → animated backgrounds). These give the glass something living to refract:

```css
.blob { position: absolute; border-radius: 999px; filter: blur(76px); mix-blend-mode: screen; }
.blob--a {
  width: 50vw; height: 50vw;
  background: radial-gradient(circle, rgb(var(--primary-soft) / 0.78), transparent 70%);
  animation: floatA 22s ease-in-out infinite;
}
```

Rule of thumb: build the colorful atmosphere FIRST, then lay glass over it. If you skin glass over a blank background you'll think the effect is broken.

## Light-mode tuning (counterintuitive)

White panels *hide* frost — the opposite of dark mode. In light theme, override to a **thinner** panel mix and **higher** saturation so the pastel aura reads through the glass:

```css
[data-app][data-theme="light"] .glass-surface {
  background: color-mix(in srgb, var(--app-panel) 30%, transparent); /* thinner, not thicker */
  -webkit-backdrop-filter: blur(30px) saturate(210%);                 /* more saturate */
  backdrop-filter: blur(30px) saturate(210%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.55), inset 0 0 0 1px rgb(255 255 255 / 0.25);
}
```

If light mode looks "muddy brown," your aura is too strong for light — make `--aura` theme-aware (lower it in light) rather than reusing the dark value.

## Stacking-context trap

An ancestor with `backdrop-filter` establishes a new stacking context that **traps `z-index`** — a dropdown declared deep in the tree can't escape above sibling content no matter how high its z-index. Fix: render popovers/modals at the app shell root with `position: fixed` and a high z-index, decoupled from where they're logically declared.

## A complete glass card

```tsx
<div className="glass-surface relative overflow-hidden rounded-3xl border border-[var(--app-border)] p-6">
  {/* aura behind the frost */}
  <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[rgb(var(--primary)/0.18)] blur-3xl" />
  <div className="relative">
    <h3 className="text-lg font-medium text-[var(--app-text)]">Frosted card</h3>
    <p className="mt-2 text-sm text-[var(--app-text-soft)]">Heavy blur + specular edge + an aura it can refract.</p>
  </div>
</div>
```
