/**
 * GlassCard — a frosted panel with the aura it needs to read as glass.
 * Requires the utilities + tokens from ../globals.css and a [data-app] (and
 * optional [data-theme="light"]) wrapper somewhere above it.
 */
export function GlassCard({
  title,
  body,
  children,
}: {
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="glass-surface relative overflow-hidden rounded-3xl border border-[var(--app-border)] p-6">
      {/* the aura — a brand glow BEHIND the frost so it has something to refract.
          Without this the card looks like a plain semi-transparent box. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[rgb(var(--primary)/0.20)] blur-3xl"
        style={{ opacity: "var(--aura)" }}
      />
      <div className="relative">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--app-text)]">{title}</h3>
        {body && <p className="mt-2 text-sm leading-relaxed text-[var(--app-text-soft)]">{body}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
