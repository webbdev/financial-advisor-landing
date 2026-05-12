import { trustItems } from '../data/content'

export function TrustBar() {
  // Two copies of the list = a seamless infinite scroll when we slide -50%.
  const trackItems = [...trustItems, ...trustItems]

  return (
    <section
      className="mb-17 md:mb-23 border-y py-7"
      style={{
        backgroundColor: 'var(--color-surface-2)',
        borderColor: 'var(--color-line-2)',
      }}
    >
      <div className="container-x">
        <div className="flex items-center gap-8">
          <div
            className="shrink-0 text-[11px] font-semibold tracking-[1.5px]"
            style={{ color: 'var(--color-muted)' }}
          >
            TRUSTED BY
          </div>

          <div className="marquee-mask relative flex-1 overflow-hidden">
            <div className="marquee-track">
              {trackItems.map((item, i) => (
                <div key={i} className="flex items-center">
                  <span
                    className={`whitespace-nowrap px-8 ${
                      item.variant === 'serif'
                        ? 'text-[18px] italic'
                        : item.variant === 'italic'
                          ? 'italic'
                          : ''
                    }`}
                    style={{
                      color: 'var(--color-muted)',
                      fontFamily:
                        item.variant === 'serif'
                          ? 'var(--font-serif)'
                          : undefined,
                      fontSize: item.variant === 'serif' ? 18 : 15,
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                    }}
                    aria-hidden={i >= trustItems.length}
                  >
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className="trust-dot-pulse h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-blue)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
