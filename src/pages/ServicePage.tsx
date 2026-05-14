import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ParallaxBand } from '../components/ParallaxBand'
import { Reveal } from '../components/Reveal'
import { ServiceIcon } from '../components/ServiceIcon'
import type { FaqItem, PricingTier, ServiceContent } from '../data/services-types'

/**
 * Renders any ServiceContent into a full landing-style page:
 * Hero → Features → Process → Pricing → FAQ → CTA.
 *
 * Adding a new service is one content file + one route entry.
 */
export function ServicePage({ content }: { content: ServiceContent }) {
  return (
    <>
      <Hero content={content} />
      <Features content={content} />
      <Process content={content} />
      <Pricing content={content} />
      <Faq content={content} />
      <FinalCta />
    </>
  )
}

/* ───────────────────── Sub-sections ───────────────────── */

function Hero({ content }: { content: ServiceContent }) {
  return (
    <section className="relative pt-24 md:pt-30 pb-20 md:pb-26">
      <div className="container-x">
        <Reveal>
          <Link
            to="/#services"
            className="group mb-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1px] no-underline transition-colors"
            style={{ color: 'var(--color-blue)' }}
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1"
            >
              ←
            </span>
            <span>Back to services</span>
          </Link>
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
            style={{ color: 'var(--color-blue)' }}
          >
            {content.eyebrow}
          </div>
          <h1
            className="mb-5 max-w-[820px] font-normal leading-[1.05] tracking-[-1.5px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(40px, 5.4vw, 68px)',
              color: 'var(--color-ink)',
            }}
          >
            {content.heroTitle}{' '}
            <span className="serif" style={{ color: 'var(--color-blue)' }}>
              {content.heroEmphasis}
            </span>
          </h1>
          <p
            className="mb-9 max-w-[600px] text-[17px] leading-[1.65]"
            style={{ color: 'var(--color-muted)' }}
          >
            {content.heroLead}
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
              <span>
                Book a discovery call
              </span>
              <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-md border bg-transparent px-5 py-2.5 text-sm font-medium transition-colors no-underline"
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
              See pricing
            </a>
          </div>

          <div
            className="flex flex-wrap gap-10 md:gap-12 border-t pt-6 md:pt-7"
            style={{ borderColor: 'var(--color-line)' }}
          >
            {content.heroStats.map((s) => (
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
      </div>
    </section>
  )
}

function Features({ content }: { content: ServiceContent }) {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: 'var(--color-surface-2)' }}
    >
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
            style={{ color: 'var(--color-blue)' }}
          >
            {content.featuresEyebrow}
          </div>
          <h2
            className="font-normal leading-[1.15] tracking-[-0.8px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 44px)',
              color: 'var(--color-ink)',
            }}
          >
            {content.featuresTitle}{' '}
            <span className="serif" style={{ color: 'var(--color-blue)' }}>
              {content.featuresEmphasis}
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.05}>
              <div
                className="h-full rounded-lg border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(11,18,32,0.08)]"
                style={{ borderColor: 'var(--color-line)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--color-blue)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--color-line)')
                }
              >
                <div
                  className="mb-4.5 flex h-10 w-10 items-center justify-center rounded-md"
                  style={{ backgroundColor: 'var(--color-blue-soft)' }}
                >
                  <ServiceIcon name={f.icon} color="#0E4F8F" />
                </div>
                <div
                  className="mb-2.5 text-[19px] font-medium"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {f.title}
                </div>
                <p
                  className="text-[13.5px] leading-[1.65]"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process({ content }: { content: ServiceContent }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-start gap-10 md:gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div
              className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
              style={{ color: 'var(--color-blue)' }}
            >
              {content.processEyebrow}
            </div>
            <h2
              className="mb-5 font-normal leading-[1.15] tracking-[-0.8px]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4vw, 44px)',
                color: 'var(--color-ink)',
              }}
            >
              {content.processTitle}{' '}
              <span className="serif" style={{ color: 'var(--color-blue)' }}>
                {content.processEmphasis}
              </span>
            </h2>
            <p
              className="text-base leading-[1.75]"
              style={{ color: 'var(--color-muted)' }}
            >
              {content.processLead}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="overflow-hidden rounded-lg border bg-white"
              style={{ borderColor: 'var(--color-line)' }}
            >
              {content.processSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="flex items-start gap-4 border-b px-6 py-5.5 transition-colors hover:bg-[var(--color-surface-2)]"
                  style={{
                    borderColor:
                      i === content.processSteps.length - 1
                        ? 'transparent'
                        : 'var(--color-line-2)',
                  }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
                    style={{
                      backgroundColor:
                        i === content.processSteps.length - 1
                          ? 'var(--color-navy)'
                          : 'var(--color-blue-soft)',
                      color:
                        i === content.processSteps.length - 1
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
                      className="mt-0.5 text-[13.5px] leading-[1.6]"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {step.description}
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

function Pricing({ content }: { content: ServiceContent }) {
  return (
    <section
      id="pricing"
      // Scroll-margin-top accounts for the fixed nav so the section
      // heading clears it when "See pricing" is clicked from the hero.
      className="scroll-mt-24 py-20 md:py-28"
      style={{ backgroundColor: 'var(--color-surface-2)' }}
    >
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
            style={{ color: 'var(--color-blue)' }}
          >
            {content.pricingEyebrow}
          </div>
          <h2
            className="mb-5 font-normal leading-[1.15] tracking-[-0.8px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 44px)',
              color: 'var(--color-ink)',
            }}
          >
            {content.pricingTitle}{' '}
            <span className="serif" style={{ color: 'var(--color-blue)' }}>
              {content.pricingEmphasis}
            </span>
          </h2>
          <p
            className="mx-auto max-w-[520px] text-base leading-[1.75]"
            style={{ color: 'var(--color-muted)' }}
          >
            {content.pricingLead}
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {content.pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <PricingCard tier={tier} />
            </Reveal>
          ))}
        </div>

        {content.pricingFootnote && (
          <p
            className="mx-auto mt-10 max-w-[680px] text-center text-xs leading-[1.7]"
            style={{ color: 'var(--color-mute-2)' }}
          >
            {content.pricingFootnote}
          </p>
        )}
      </div>
    </section>
  )
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className="relative h-full rounded-lg border p-7 transition-all hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(11,18,32,0.08)]"
      style={{
        backgroundColor: tier.featured
          ? 'var(--color-navy)'
          : 'var(--color-surface)',
        borderColor: tier.featured
          ? 'var(--color-navy)'
          : 'var(--color-line)',
        color: tier.featured ? '#fff' : undefined,
      }}
    >
      {tier.featured && tier.ctaLabel && (
        <div
          className="absolute right-5 top-5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.6px] uppercase text-white"
          style={{ backgroundColor: 'rgba(255,255,255,0.22)' }}
        >
          {tier.ctaLabel}
        </div>
      )}
      <div
        className="mb-2 text-[13px] font-semibold uppercase tracking-[0.8px]"
        style={{
          color: tier.featured ? 'var(--color-blue-pale)' : 'var(--color-blue)',
        }}
      >
        {tier.name}
      </div>
      <div
        className="text-[44px] font-medium leading-[1] tracking-[-1px]"
        style={{
          fontFamily: 'var(--font-serif)',
          color: tier.featured ? '#fff' : 'var(--color-ink)',
        }}
      >
        {tier.price}
      </div>
      <div
        className="mt-1 text-[13px]"
        style={{
          color: tier.featured
            ? 'rgba(255,255,255,0.75)'
            : 'var(--color-muted)',
        }}
      >
        {tier.priceCaption}
      </div>

      <div
        className="my-6 h-px"
        style={{
          backgroundColor: tier.featured
            ? 'rgba(255,255,255,0.18)'
            : 'var(--color-line-2)',
        }}
      />

      <ul className="mb-7 space-y-3">
        {tier.includes.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm leading-[1.5]">
            <span
              aria-hidden
              className="mt-0.5 shrink-0"
              style={{
                color: tier.featured
                  ? 'var(--color-blue-pale)'
                  : 'var(--color-blue)',
              }}
            >
              ✓
            </span>
            <span
              style={{
                color: tier.featured
                  ? 'rgba(255,255,255,0.92)'
                  : 'var(--color-ink)',
              }}
            >
              {line}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/book"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium no-underline transition-all hover:-translate-y-px"
        style={{
          backgroundColor: tier.featured ? '#fff' : 'var(--color-navy)',
          color: tier.featured ? 'var(--color-navy)' : '#fff',
        }}
      >
        Get started →
      </Link>
    </div>
  )
}

function Faq({ content }: { content: ServiceContent }) {
  // Track which item is open (single-open accordion). Null = all closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
            style={{ color: 'var(--color-blue)' }}
          >
            {content.faqEyebrow}
          </div>
          <h2
            className="font-normal leading-[1.15] tracking-[-0.8px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 44px)',
              color: 'var(--color-ink)',
            }}
          >
            {content.faqTitle}{' '}
            <span className="serif" style={{ color: 'var(--color-blue)' }}>
              {content.faqEmphasis}
            </span>
          </h2>
        </Reveal>

        <div className="mx-auto max-w-[760px]">
          {content.faqs.map((item, i) => (
            <FaqRow
              key={item.question}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem
  open: boolean
  onToggle: () => void
}) {
  const reduce = useReducedMotion()

  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--color-line-2)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors"
      >
        <span
          className="text-[17px] font-medium"
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-ink)',
          }}
        >
          {item.question}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center text-2xl leading-none"
          style={{ color: 'var(--color-blue)' }}
        >
          +
        </motion.span>
      </button>

      {/* Animated open/close. AnimatePresence lets us animate height
          on entry/exit; `initial={false}` keeps the first paint static
          (no jarring expand-on-mount). */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="pb-5 pr-10 text-[15px] leading-[1.7]"
              style={{ color: 'var(--color-muted)' }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FinalCta() {
  return (
    <ParallaxBand
      className="py-24 md:py-32 text-center"
      imageUrl="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80"
      overlay="linear-gradient(rgba(4, 44, 83, 0.78), rgba(4, 44, 83, 0.88))"
    >
      <div className="mx-auto max-w-[640px] px-8">
        <Reveal>
          <h2
            className="mb-4 font-normal leading-[1.1] tracking-[-0.8px] text-white"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4.5vw, 48px)',
            }}
          >
            Ready to put your money{' '}
            <span className="serif" style={{ color: 'var(--color-blue-pale)' }}>
              to work?
            </span>
          </h2>
          <p
            className="mx-auto mb-9 max-w-[480px] text-base leading-[1.65]"
            style={{ color: 'rgba(255,255,255,0.92)' }}
          >
            A 30-minute consultation, on us. No pitches, no pressure — just a
            chance to see if we&rsquo;re the right fit.
          </p>
          <Link
            to="/book"
            className="group inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-medium no-underline transition-all hover:-translate-y-px"
            style={{ color: 'var(--color-navy)' }}
          >
            <span>
              Book your call
            </span>
            <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
          </Link>
        </Reveal>
      </div>
    </ParallaxBand>
  )
}
