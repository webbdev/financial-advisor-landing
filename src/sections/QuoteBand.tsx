import { ParallaxBand } from '../components/ParallaxBand'
import { Reveal } from '../components/Reveal'

export function QuoteBand() {
  return (
    <ParallaxBand
      className="py-24 md:py-30"
      imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80"
    >
      <div className="mx-auto max-w-[820px] px-8 text-center">
        <Reveal>
          <div
            className="mb-5 text-[11px] font-semibold uppercase tracking-[1.5px]"
            style={{ color: 'var(--color-blue-pale)' }}
          >
            Our philosophy
          </div>
          <h2
            className="mb-5 font-normal leading-[1.18] tracking-[-0.6px] text-white"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 48px)',
            }}
          >
            Wealth isn't built by luck. It's built by{' '}
            <span className="serif" style={{ color: 'var(--color-blue-pale)' }}>
              good decisions, repeated.
            </span>
          </h2>
          <p
            className="mx-auto max-w-[620px] text-[17px] leading-[1.65]"
            style={{ color: 'rgba(255,255,255,0.92)' }}
          >
            We help you make smarter decisions about every pound — how to invest
            it, where to grow it, when to protect it, and how to make it last.
            No noise, no jargon, no commissions clouding the&nbsp;advice.
          </p>
        </Reveal>
      </div>
    </ParallaxBand>
  )
}
