import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  /** y-offset to animate from. Default 24px (matches the original CSS reveal). */
  y?: number
  /**
   * Override the viewport intersection options. Defaults work for
   * most page sections, but elements at the very bottom of the page
   * (like footer rows) may need a smaller `amount` and no negative
   * bottom margin to trigger reliably when the user scrolls to the end.
   */
  viewport?: {
    once?: boolean
    margin?: string
    amount?: number | 'some' | 'all'
  }
}

/**
 * Reveal wraps a section of content and fades + slides it into view
 * as it enters the viewport. Honours `prefers-reduced-motion`.
 *
 * Replaces the IntersectionObserver-based `.reveal` / `.visible` pattern
 * from the original HTML.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
  viewport = { once: true, margin: '0px 0px -60px 0px', amount: 0.12 },
}: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}