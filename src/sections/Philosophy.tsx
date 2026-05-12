import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

/**
 * The "fixed background" parallax section.
 * Background is fixed to viewport via `background-attachment: fixed`,
 * while the foreground text drifts up and fades subtly as the section
 * passes through the viewport — selling the depth illusion.
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Drift: text moves up by 60px across the scroll, mirroring original ~120px range
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])
  // Fade: 1 in the middle, dipping to ~0.65 at edges
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [0.65, 1, 0.65],
  )

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-center text-white"
      style={{
        backgroundColor: 'var(--color-navy)',
        backgroundImage: `linear-gradient(rgba(4, 44, 83, 0.55), rgba(3, 32, 61, 0.78)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div
        className="relative z-10 max-w-[880px] px-8 py-22 md:py-32"
        style={{ y, opacity, willChange: 'transform, opacity' }}
      >
        <div
          className="mb-6 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] backdrop-blur"
          style={{
            color: 'var(--color-blue-pale)',
            borderColor: 'rgba(191, 217, 242, 0.4)',
          }}
        >
          A different kind of advice
        </div>
        <h2
          className="mb-6 font-normal leading-[1.05] tracking-[-1.5px] text-white"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 6.5vw, 84px)',
            textShadow: '0 2px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          Your money should outwork the market —{' '}
          <span className="serif" style={{ color: 'var(--color-blue-pale)' }}>
            not chase it.
          </span>
        </h2>
        <p
          className="mx-auto mb-9 max-w-[620px] leading-[1.65]"
          style={{
            color: 'rgba(255,255,255,0.92)',
            fontSize: 'clamp(16px, 1.6vw, 19px)',
          }}
        >
          We don't sell products. We don't take commissions. We help you build
          wealth on terms that make sense for your life — patiently,
          transparently, and with discipline that compounds.
        </p>
        <div
          className="inline-flex items-center gap-3 text-[13px] font-medium tracking-[0.4px]"
          style={{ color: 'var(--color-blue-pale)' }}
        >
          <span
            className="h-px w-8"
            style={{ backgroundColor: 'rgba(191, 217, 242, 0.5)' }}
          />
          <span>Independent · Fee-only · FCA-regulated</span>
          <span
            className="h-px w-8"
            style={{ backgroundColor: 'rgba(191, 217, 242, 0.5)' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
