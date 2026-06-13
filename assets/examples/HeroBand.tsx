"use client";
/**
 * HeroBand — asymmetric two-column hero with page-load orchestration +
 * gentle scroll parallax + a living gradient-mesh atmosphere behind glass.
 * This is the workhorse layout: short bold stacked headline on the left,
 * copy + CTA aligned to the BOTTOM of the right cell (the intentional
 * vertical misalignment is what makes it feel designed, not generic).
 */
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  hidden: { y: 40, opacity: 0 },
  show: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease, delay: 0.12 + i * 0.1 } }),
};

export function HeroBand() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // gate so SSR/CSR don't flash

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 600], [0, -70]);   // headline drifts up
  const arcRotate = useTransform(scrollY, [0, 1400], [0, 70]); // arc rotates

  const lines = ["Short", "bold", "stacked"];

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-32 pb-16 md:px-12">
      {/* atmosphere — the glass refracts these drifting blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="blob blob--a" />
        <span className="blob blob--b" />
        <span className="blob blob--c" />
      </div>

      {/* huge thin arc bleeding off the right edge, slowly rotating on scroll */}
      <motion.div
        aria-hidden
        style={mounted ? { rotate: arcRotate } : undefined}
        className="arc pointer-events-none absolute -right-[26vw] top-1/2 hidden h-[120vh] w-[120vh] -translate-y-1/2 opacity-30 lg:block"
      />

      <motion.div
        style={mounted ? { y: titleY } : undefined}
        className="relative mx-auto grid w-full max-w-[92rem] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        <h1 className="display text-[clamp(3rem,8.2vw,7.6rem)] leading-[0.92]">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              custom={i}
              variants={rise}
              initial="hidden"
              animate={mounted ? "show" : "hidden"}
              className="block"
            >
              {i === 1 ? <span className="display-italic text-[var(--color-clay-2)]">{line}</span> : line}
            </motion.span>
          ))}
        </h1>

        <motion.div
          custom={lines.length}
          variants={rise}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="flex flex-col gap-7 lg:self-end lg:pb-3"
        >
          <p className="max-w-md text-base leading-relaxed text-[var(--color-bone-soft)] md:text-lg">
            Supporting copy kept short and confident — let the negative space carry it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="glass-btn glass-btn--clay px-7 py-3.5 text-sm font-medium">Get started</a>
            <a href="#" className="glass-btn inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              Learn more <span aria-hidden>↓</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
