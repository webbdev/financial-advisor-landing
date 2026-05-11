import { Reveal } from '../components/Reveal'
import { testimonials } from '../data/content'

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-28"
      style={{ backgroundColor: 'var(--color-surface-2)' }}
    >
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
            style={{ color: 'var(--color-blue)' }}
          >
            Client testimonials
          </div>
          <h2
            className="font-normal leading-[1.15] tracking-[-0.8px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 44px)',
              color: 'var(--color-ink)',
            }}
          >
            What our clients{' '}
            <span className="serif" style={{ color: 'var(--color-blue)' }}>
              say
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className="h-full rounded-[14px] border p-9"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-line)',
                }}
              >
                <div
                  className="mb-4 text-[56px] leading-[0.5]"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-blue)',
                  }}
                >
                  &ldquo;
                </div>
                <p
                  className="mb-6 text-lg italic leading-[1.55]"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
                    style={{
                      backgroundColor: 'var(--color-blue-soft)',
                      color: 'var(--color-navy)',
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-[13px]"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
