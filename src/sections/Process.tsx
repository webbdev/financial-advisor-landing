import { Reveal } from '../components/Reveal'
import { processSteps } from '../data/content'

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div
              className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
              style={{ color: 'var(--color-blue)' }}
            >
              Our process
            </div>
            <h2
              className="mb-5 font-normal leading-[1.15] tracking-[-0.8px]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4vw, 44px)',
                color: 'var(--color-ink)',
              }}
            >
              Four steps.{' '}
              <span className="serif" style={{ color: 'var(--color-blue)' }}>
                No surprises.
              </span>
            </h2>
            <p
              className="text-base leading-[1.75]"
              style={{ color: 'var(--color-muted)' }}
            >
              A considered, repeatable process that turns big questions into
              clear next steps — and keeps you informed at every stage.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="overflow-hidden rounded-[14px] border"
              style={{
                borderColor: 'var(--color-line)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              {processSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="flex items-center gap-[18px] border-b px-6 py-[22px] transition-colors hover:bg-[var(--color-surface-2)]"
                  style={{
                    borderColor:
                      i === processSteps.length - 1
                        ? 'transparent'
                        : 'var(--color-line-2)',
                  }}
                >
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
                    style={{
                      backgroundColor:
                        i === processSteps.length - 1
                          ? 'var(--color-navy)'
                          : 'var(--color-blue-soft)',
                      color:
                        i === processSteps.length - 1
                          ? '#fff'
                          : 'var(--color-navy)',
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <div
                      className="text-[15px] font-semibold"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {step.title}
                    </div>
                    <div
                      className="text-[13.5px]"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {step.desc}
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
