import { ParallaxBand } from '../components/ParallaxBand'
import { Reveal } from '../components/Reveal'
import { stats } from '../data/content'

export function StatsBand() {
  return (
    <ParallaxBand
      className="py-24 md:py-[120px]"
      imageUrl="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=2000&q=80"
      overlay="linear-gradient(rgba(4, 44, 83, 0.65), rgba(3, 32, 61, 0.93))"
    >
      <div className="mx-auto max-w-[1200px] px-8">
        <Reveal>
          <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div
                className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
                style={{ color: 'var(--color-blue-pale)' }}
              >
                By the numbers
              </div>
              <h2
                className="mb-[18px] font-normal leading-[1.18] tracking-[-0.6px] text-white"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(30px, 3.6vw, 40px)',
                }}
              >
                A track record built on{' '}
                <span
                  className="serif"
                  style={{ color: 'var(--color-blue-pale)' }}
                >
                  patient
                </span>{' '}
                growth.
              </h2>
              <p
                className="text-base leading-[1.7]"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                We don't chase headlines or hot tips. Our clients' portfolios
                are built to compound steadily, weather volatility, and beat
                the benchmarks that matter to them.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-md border p-6 backdrop-blur-md"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.18)',
                  }}
                >
                  <div
                    className="text-[36px] font-medium leading-none tracking-[-0.5px] text-white"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="mt-2 text-[13px] font-medium"
                    style={{ color: 'var(--color-blue-pale)' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </ParallaxBand>
  )
}
