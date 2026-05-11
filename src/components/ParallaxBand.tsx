import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

type ParallaxBandProps = {
  children: ReactNode
  /**
   * Background image URL. The component layers a navy gradient overlay
   * on top so foreground white text stays readable.
   */
  imageUrl: string
  /** Tailwind classes applied to the section element (padding, etc.) */
  className?: string
  /**
   * Overlay gradient — defaults match the original `.quote-band` look.
   * Override per section to fine-tune contrast.
   */
  overlay?: string
  id?: string
}

/**
 * Replicates the original `.parallax-band` blocks: a section with a
 * cover-fit background image that drifts as the user scrolls past.
 *
 * Uses motion's `useScroll` + `useTransform` instead of manual rAF.
 * Honours `prefers-reduced-motion` (no transform applied).
 */
export function ParallaxBand({
  children,
  imageUrl,
  className,
  overlay = 'linear-gradient(rgba(4, 44, 83, 0.82), rgba(3, 32, 61, 0.92))',
  id,
}: ParallaxBandProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Original JS translated by ~80px range across the visible window.
  // We hand motion the same range mapped to scroll progress 0 → 1.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40])

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden text-white ${className ?? ''}`}
      style={{ backgroundColor: 'var(--color-navy)' }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-0 w-full"
          style={{
            top: '-15%',
            height: '130%',
            backgroundImage: `${overlay}, url('${imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
            y,
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}
