import { Reveal } from '../components/Reveal'
import { pillars } from '../data/content'

export function About() {
  return (
    <section id="about" className="py-22 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-10 md:gap-18 lg:grid-cols-[1fr_1.3fr]">
          {/* Left — years card + partner */}
          <Reveal>
            <div
              className="relative overflow-hidden rounded-lg p-10 text-white"
              style={{ backgroundColor: 'var(--color-navy)' }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  bottom: '-50%',
                  left: '-30%',
                  width: '80%',
                  height: '80%',
                  background:
                    'radial-gradient(circle, rgba(133, 183, 235, 0.2), transparent 70%)',
                }}
              />
              <div
                className="text-[11px] font-semibold tracking-[1.5px]"
                style={{ color: 'var(--color-blue-pale)' }}
              >
                SINCE 2011
              </div>
              <div
                className="mt-3 text-[80px] font-normal leading-[0.9] text-white"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                15
                <sup
                  className="ml-1 text-[28px] italic"
                  style={{ color: 'var(--color-blue-pale)' }}
                >
                  yrs
                </sup>
              </div>
              <div
                className="my-6 h-px"
                style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
              />
              <div
                className="text-sm leading-[1.65]"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                A boutique advisory practice rooted in independence,
                transparency, and long-term thinking.
              </div>
            </div>

            {/* Partner card */}
            <div
              className="mt-3.5 flex items-center gap-3.5 rounded-md px-5 py-4"
              style={{ backgroundColor: 'var(--color-blue-soft)' }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                style={{ backgroundColor: 'var(--color-navy)' }}
              >
                JM
              </div>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-navy)' }}
                >
                  James Morton, CFP
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: 'var(--color-blue)' }}
                >
                  Founding Partner
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — copy + pillars */}
          <Reveal delay={0.1}>
            <div
              className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
              style={{ color: 'var(--color-blue)' }}
            >
              About us
            </div>
            <h2
              className="mb-5 font-normal leading-[1.15] tracking-[-0.8px]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4vw, 44px)',
                color: 'var(--color-ink)',
              }}
            >
              Advice you can{' '}
              <span className="serif" style={{ color: 'var(--color-blue)' }}>
                trust
              </span>
              , decisions you can defend.
            </h2>
            <p
              className="mb-7 text-base leading-[1.75]"
              style={{ color: 'var(--color-muted)' }}
            >
              We're a fee-only advisory firm — no commissions, no product
              quotas, no hidden incentives. Just careful, conflict-free guidance
              for people who want their money to work as hard as they do.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <div
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: 'var(--color-blue)' }}
                  />
                  <div>
                    <div
                      className="text-[15px] font-semibold"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {p.title}
                    </div>
                    <div
                      className="mt-0.5 text-sm"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
