import { Link } from 'react-router-dom'
import { PortfolioCard } from '../components/PortfolioCard'
import { Reveal } from '../components/Reveal'
import { heroStats } from '../data/content'
import { smoothScrollTo } from '../lib/scroll'

export function Hero() {
  return (
    <section className="relative pt-24 md:pt-36 pb-16 md:pb-22">
      <div className="container-x">
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1.15fr_1fr]">
          {/* Left — copy */}
          <Reveal>
            <span
              className="mb-6 inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.2px]"
              style={{
                backgroundColor: 'var(--color-blue-soft)',
                color: 'var(--color-navy)',
              }}
            >
              Trusted since 2011
            </span>

            <h1
              className="mb-6 font-normal leading-[1.04] tracking-[-1.5px]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'normal',
                fontSize: 'clamp(40px, 5.4vw, 68px)',
                color: 'var(--color-ink)',
              }}
            >
              Make your money{' '}
              <span className="serif" style={{ color: 'var(--color-blue)' }}>
                work harder.
              </span>
            </h1>

            <p
              className="mb-8 max-w-120 text-[17px] leading-[1.65]"
              style={{ color: 'var(--color-muted)' }}
            >
              Independent advice for people who want to grow, protect, and put
              their wealth to work — with clear strategies, not&nbsp;guesswork.
            </p>

            <div className="mb-10 md:mb-12 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="group inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white no-underline transition-all hover:-translate-y-px"
                style={{ backgroundColor: 'var(--color-navy)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    'var(--color-navy-deep)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--color-navy)')
                }
              >
                <span>Get tailored advice</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <a
                href="#process"
                onClick={(e) => smoothScrollTo(e, '#process')}
                className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
                style={{
                  borderColor: 'var(--color-line)',
                  color: 'var(--color-ink)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--color-ink)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--color-line)')
                }
              >
                How we work
              </a>
            </div>

            <div
              className="flex flex-wrap gap-10 md:gap-12 border-t pt-6 md:pt-7"
              style={{ borderColor: 'var(--color-line)' }}
            >
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div
                    className="text-[28px] font-medium tracking-[-0.5px]"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--color-navy)',
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="mt-0.5 text-xs font-medium tracking-[0.3px]"
                    style={{ color: 'var(--color-mute-2)' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — animated portfolio card with skyline image,
              chart line that draws in, and staggered allocation bars.
              Lives in components/PortfolioCard.tsx since the markup
              and animation logic are substantial. */}
          <Reveal delay={0.15}>
            <PortfolioCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}