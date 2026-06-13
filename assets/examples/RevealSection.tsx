"use client";
/**
 * RevealSection — scroll-triggered staggered reveal with motion.
 * Children rise + fade in one after another as the section enters view.
 * `npm i motion`  →  import from "motion/react".
 */
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease } },
};

export function RevealSection({ items }: { items: { id: string; label: string; body: string }[] }) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto grid max-w-5xl gap-5 px-6 py-24 sm:grid-cols-2"
    >
      {items.map((it) => (
        <motion.article
          key={it.id}
          variants={item}
          className="glass-inset rounded-2xl border border-[var(--app-border)] p-5"
        >
          <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--app-text)]">{it.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--app-text-soft)]">{it.body}</p>
        </motion.article>
      ))}
    </motion.section>
  );
}
