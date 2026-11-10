// One easing for everything that moves, so all motion feels like one family.
export const EASE = [0.22, 1, 0.36, 1]

export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: EASE },
}

export const stagger = (i, base = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: EASE, delay: base + Math.min(i, 8) * 0.06 },
})
