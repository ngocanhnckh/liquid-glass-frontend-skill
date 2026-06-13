# Layout & Composition — break the grid on purpose

Generic frontends default to centered single columns and rows of equal cards. Distinctive ones use asymmetry, overlap, and deliberate negative space. Intentionality is the whole game.

## Asymmetric two-column band (the workhorse hero)

Instead of one centered headline, split into an unequal grid: a short bold stacked headline on one side, copy + CTA aligned to the *bottom* of the other side. The vertical misalignment is what makes it feel designed.

```tsx
<section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-32 pb-16 md:px-12">
  {/* atmosphere layer sits behind everything */}
  <Atmosphere />

  <div className="relative mx-auto grid w-full max-w-[92rem] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
    <h1 className="display text-[clamp(3rem,8.2vw,7.6rem)] leading-[0.92]">
      <span className="block">Short</span>
      <span className="display-italic block text-[var(--color-clay-2)]">bold</span>
      <span className="block">stacked</span>
    </h1>

    {/* copy aligned to the bottom of its cell — the intentional asymmetry */}
    <div className="flex flex-col gap-7 lg:self-end lg:pb-3">
      <p className="max-w-md text-lg leading-relaxed text-[var(--color-bone-soft)]">Supporting copy, kept short.</p>
      <div className="flex flex-wrap gap-3">
        <a className="glass-btn glass-btn--clay px-7 py-3.5 text-sm font-medium">Primary</a>
        <a className="glass-btn px-6 py-3.5 text-sm">Secondary ↓</a>
      </div>
    </div>
  </div>
</section>
```

Keys: `grid-cols-[1fr_1fr]` (or `1.1fr_0.9fr` for more tension), `items-center` on the row but `self-end` on one cell, a stacked headline with one line in italic brand color.

## Layering with `z` and overlap

Depth comes from things overlapping. Put a large blurred geometric shape *behind* the content, let a card overhang a section edge, float a badge in a corner. Use `position: absolute` generously inside a `relative` section.

```tsx
<section className="relative">
  <span aria-hidden className="absolute -right-[26vw] top-1/2 hidden h-[120vh] w-[120vh] -translate-y-1/2 rounded-full border border-[var(--color-line-dark)] opacity-30 lg:block" />
  {/* foreground content over the arc */}
</section>
```

## Thin geometric line-art

A single huge thin-bordered circle/arc bleeding off the edge adds sophistication for almost no code (tenity-style). Rotate it slowly on scroll (`references/motion.md`).

```css
.arc { border: 1px solid var(--color-line-dark); border-radius: 999px; }
```

## Spacing rhythm

- **Generous section padding** — big vertical breathing room (`py-24`/`py-32`) signals confidence. Cramped sections read as amateur.
- **One consistent radius scale** — pick `rounded-2xl`/`rounded-3xl` for surfaces and a pill (`999px`) for buttons; stay consistent.
- **Constrain measure** — body copy `max-w-md`/`max-w-2xl` so lines stay readable even on wide layouts.
- **Negative space is a feature** — don't fill every cell. An empty column is a composition choice.

## Storytelling section flow (landing pages)

For non-technical audiences, lead with narrative then back it with substance:

1. **Hero** — the one-line promise + the unforgettable visual.
2. **Story / problem** — plain-language stakes ("knowledge keeps leaking out of your org"). No jargon yet.
3. **Engine / how** — now the technical credibility, with a living gradient or diagram.
4. **Proof** — numbers, logos, outcomes (staggered scroll reveal).
5. **CTA** — a bold full-bleed gradient panel.
6. **Footer.**

Each section gets its own scroll-reveal entrance; alternate left/right or scale entrances so it doesn't feel like one repeated motion.

## App shell layout (dashboards / web apps)

- **Frosted sidebar** (`.glass-surface`) + **frosted topbar**, content area scrolls independently (`overflow-y-auto` + `.no-scrollbar`).
- **Render popovers/menus at the shell root** with `position: fixed` (escapes the `backdrop-filter` stacking-context trap — see `references/liquid-glass.md`).
- **Responsive drawers:** off-canvas panels via `fixed translate-x-full xl:static xl:translate-x-0` toggled by state, with a backdrop. Always give a hidden panel a trigger button at smaller breakpoints — don't just `hidden md:block` something the user needs.

## Don'ts

- No three identical centered feature cards in a row as your main content. If you must use cards, vary their size/span or give them distinct accents.
- No hero that's only a centered headline + subtitle + two buttons on a flat background. Add atmosphere, asymmetry, or a strong visual.
- No filling the full width with text. Constrain measure.
- Don't mistake *more effects* for *better design*. A restrained minimal layout executed precisely beats a cluttered maximalist one. Match density to the chosen aesthetic.
