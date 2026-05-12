import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ServiceIcon } from '../components/ServiceIcon'
import { services } from '../data/content'

export function Services() {
  return (
    <section
      id="services"
      className="py-22 md:py-28"
      style={{ backgroundColor: 'var(--color-surface-2)' }}
    >
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-[740px] text-center">
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
            style={{ color: 'var(--color-blue)' }}
          >
            Our services
          </div>
          <h2
            className="mb-5 font-normal leading-[1.15] tracking-[-0.8px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 44px)',
              color: 'var(--color-ink)',
            }}
          >
            Strategies to grow what{' '}
            <span className="serif" style={{ color: 'var(--color-blue)' }}>
              you've earned
            </span>
          </h2>
          <p
            className="mx-auto max-w-[520px] text-base leading-[1.75]"
            style={{ color: 'var(--color-muted)' }}
          >
            From your first portfolio to multi-generational wealth — we shape
            our advice around how you want your money to work.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              // Stagger sibling reveals slightly so the grid doesn't pop in unison
              delay={(i % 3) * 0.05}
            >
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

type Service = (typeof services)[number]

function ServiceCard(s: Service) {
  const featured = 'featured' in s && s.featured
  const href = 'href' in s ? s.href : undefined

  const card = (
    // `group` lets the arrow inside react to hover on the whole card,
    // not just the arrow text itself. So hovering anywhere on the card
    // slides the arrow right.
    <div
      className="group relative h-full rounded-lg border p-7 transition-all hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(11,18,32,0.08)]"
      style={{
        backgroundColor: featured ? 'var(--color-navy)' : 'var(--color-surface)',
        borderColor: featured ? 'var(--color-navy)' : 'var(--color-line)',
        color: featured ? '#fff' : undefined,
      }}
      onMouseEnter={(e) => {
        if (featured) {
          e.currentTarget.style.backgroundColor = 'var(--color-navy-deep)'
        } else {
          e.currentTarget.style.borderColor = 'var(--color-blue)'
        }
      }}
      onMouseLeave={(e) => {
        if (featured) {
          e.currentTarget.style.backgroundColor = 'var(--color-navy)'
        } else {
          e.currentTarget.style.borderColor = 'var(--color-line)'
        }
      }}
    >
      {featured && 'badge' in s && s.badge && (
        <div
          className="absolute right-5 top-5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.6px] text-white"
          style={{ backgroundColor: 'rgba(255,255,255,0.22)' }}
        >
          {s.badge}
        </div>
      )}

      <div
        className="mb-4.5 flex h-10 w-10 items-center justify-center rounded-md"
        style={{
          backgroundColor: featured
            ? 'rgba(255,255,255,0.18)'
            : 'var(--color-blue-soft)',
        }}
      >
        <ServiceIcon
          name={s.icon}
          color={featured ? '#ffffff' : '#0E4F8F'}
        />
      </div>

      <div
        className="mb-2.5 text-[19px] font-medium"
        style={{
          fontFamily: 'var(--font-serif)',
          color: featured ? '#fff' : 'var(--color-ink)',
        }}
      >
        {s.title}
      </div>

      <p
        className="mb-4.5 text-[13.5px] leading-[1.65]"
        style={{
          color: featured ? 'rgba(255,255,255,0.88)' : 'var(--color-muted)',
        }}
      >
        {s.desc}
      </p>

      {/* Inline-flex so text and arrow share a baseline; the arrow gets
          its own translate transition that fires on the parent's hover.
          inline-block on the arrow is required because translate-x has
          no effect on inline elements. */}
      <div
        className="inline-flex items-center gap-1 text-[13px] font-semibold"
        style={{
          color: featured ? 'var(--color-blue-pale)' : 'var(--color-blue)',
        }}
      >
        {href ? (
          <>
            <span>Learn more</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </>
        ) : (
          'Coming soon'
        )}
      </div>
    </div>
  )

  // Wrap in Link if there's a route to send the user to.
  // Cards without href stay as inert previews until their page exists.
  return href ? (
    <Link to={href} className="block h-full no-underline">
      {card}
    </Link>
  ) : (
    card
  )
}