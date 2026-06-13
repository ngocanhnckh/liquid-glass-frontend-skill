# Theming — one source of truth

The entire palette derives from **three RGB triplets**. Re-skinning the whole product = editing three lines. Dark + light themes share the brand color and swap only neutral surface tokens.

## The three triplets

Space-separated R G B channels (no `rgb()`, no commas) so they compose with *any* opacity:

```css
@theme {
  --primary: 229 77 46;        /* primary accent — e.g. Radix Tomato 9 (#E54D2E) */
  --primary-soft: 240 110 80;  /* lighter tint — hover / glow */
  --accent: 226 169 91;        /* warm secondary (gold) */
}
```

**Why triplets, not hex?** Because `rgb(var(--primary) / 0.4)` gives you the brand color at any opacity, anywhere, without defining a dozen alpha variants. This composition trick is the backbone of the whole system:

```css
background: rgb(var(--primary) / 0.16);   /* 16% tint   */
border-color: rgb(var(--primary-soft) / 0.5);
box-shadow: 0 12px 32px -14px rgb(var(--primary) / 0.6);
```

## Derived brand colors

Define ready-to-use solids once, driven by the triplets — never hardcode the hex again:

```css
@theme {
  --color-clay:   rgb(var(--primary));
  --color-clay-2: rgb(var(--primary-soft));
  --color-amber:  rgb(var(--accent));
}
```

## Neutral system

Pick warm or cool neutrals to match the aesthetic — don't default to pure grey. This example uses a warm clay+ivory system (not generic blue-grey):

```css
@theme {
  --color-obsidian: #15110D;   /* warm near-black */
  --color-ivory:    #F0ECE1;   /* warm bright */
  --color-slate:    #1C1813;   /* text on light */
  --color-bone:     #F3EEE3;   /* text on dark */
  --color-bone-soft:#A79C8C;
}
```

## App surface tokens (the themeable layer)

The app reads *semantic* tokens (`--app-bg`, `--app-text`, …), never raw colors. Define them on a `[data-app]` wrapper for dark, and override under `[data-theme="light"]`. The brand triplets stay the same across themes — only neutrals + aura change.

```css
[data-app] {
  --app-bg: #15110D;
  --app-panel: #1E1813;
  --app-elev: #2A2219;
  --app-border: rgba(243,238,227,0.10);
  --app-border-strong: rgba(243,238,227,0.20);
  --app-text: #F0ECE1;
  --app-text-soft: #A79C8C;
  --app-text-faint: #6B6052;
  --app-hover: rgba(243,238,227,0.055);
  --app-shadow: 0 30px 80px -40px rgba(0,0,0,0.7);
  --aura: 0.32;            /* ambient gradient strength behind glass (dark = rich) */
  color-scheme: dark;
}
[data-app][data-theme="light"] {
  --app-bg: #EFEADE;
  --app-panel: #FBF8F1;
  --app-elev: #FFFFFF;
  --app-border: rgba(28,24,19,0.12);
  --app-border-strong: rgba(28,24,19,0.22);
  --app-text: #211C16;
  --app-text-soft: #6B6052;
  --app-text-faint: #9A8E7C;
  --app-hover: rgba(28,24,19,0.045);
  --app-shadow: 0 24px 60px -38px rgba(76,52,34,0.45);
  --aura: 0.28;            /* enough color for the frost to read as pastel */
  color-scheme: light;
}
```

Then components only ever reference semantics: `text-[var(--app-text)]`, `border-[var(--app-border)]`, `bg-[var(--app-panel)]`. Switching themes touches nothing in component code.

## The `--aura` token

`--aura` is the strength of the colored glow behind glass. It MUST be theme-aware: a dark-mode aura value reused in light mode turns everything muddy brown. Dark carries a rich aura (~0.32); light a soft pastel (~0.28). Place glows as `bg-[rgb(var(--primary)/…)] blur-3xl` at `opacity: var(--aura)` behind glass panels.

## Theme switching

Put `data-theme` on the `[data-app]` wrapper and toggle it. Persist with a cookie so SSR renders the right theme with no flash:

```tsx
// read on server: cookies().get("APP_THEME")?.value ?? "dark"
<div data-app data-theme={theme}>{children}</div>
```

A cross-fade on theme change feels far nicer than a hard snap:

```css
[data-app] * { transition: background-color .25s ease, border-color .25s ease, color .2s ease; }
```

## Gotchas

- **Hex vs triplet for third-party libs.** Some libraries (e.g. Mermaid's `plotColorPalette`) split values on commas and choke on `rgb(r, g, b)`. For those, emit comma-free hex (`#e54d2e`). Keep a small `hex()` helper that converts a triplet token to hex when a lib demands it.
- **`@theme` cache.** Tailwind v4 caches `@theme` hard. After editing tokens, `rm -rf .next` and restart — HMR may not pick them up.
- **Don't hardcode brand hex in components.** If you ever type `#E54D2E` in a component you've broken the single-source rule. Use `var(--color-clay)` or `rgb(var(--primary)/…)`.
