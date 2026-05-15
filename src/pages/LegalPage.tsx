import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import type { LegalContent } from '../data/legal-types'

/**
 * Renders any LegalContent (Privacy, Terms, Accessibility) into a
 * consistent layout: page header, last-updated stamp, in-page table
 * of contents (with scroll-spy active state), and the section content.
 */
export function LegalPage({ content }: { content: LegalContent }) {
  // ID of the section currently considered "active" in the TOC.
  // Defaults to the first section so the TOC has a highlight on page load.
  const [activeId, setActiveId] = useState<string>(content.sections[0]?.id ?? '')

  // Scroll-spy via IntersectionObserver. As sections scroll into the top
  // of the viewport, we mark them active. The rootMargin is tuned so a
  // section becomes "active" when its top crosses ~80px from the top of
  // the viewport (just under the fixed nav).
  //
  // Why this is better than a scroll listener:
  //   - IntersectionObserver is async + browser-optimized; no jank on scroll
  //   - We don't need to read DOM positions on every scroll event
  //   - Falls back gracefully if the API is unavailable (no errors)
  useEffect(() => {
    const ids = content.sections.map((s) => s.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Of the currently-intersecting sections, pick the one closest
        // to the top of the viewport. Sorting by boundingClientRect.top
        // gives us a stable "which heading just passed under the nav"
        // result even when multiple sections are partially in view.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      {
        // Trigger when the section's top is between 80px below the
        // viewport top and 60% of the way down — a "reading band" that
        // matches where the user's eye actually is.
        rootMargin: '-80px 0px -40% 0px',
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [content.sections])

  return (
    <section className="relative pt-26 md:pt-32 pb-20 md:pb-24">
      <div className="container-x">
        {/* Template-content notice. */}
        <div
          className="mx-auto mb-10 max-w-[820px] rounded-md border-l-2 px-4 py-3 text-[13px] leading-[1.6]"
          style={{
            backgroundColor: 'var(--color-blue-soft)',
            borderLeftColor: 'var(--color-blue)',
            color: 'var(--color-navy)',
          }}
          role="note"
        >
          <strong>Template content.</strong> This page is part of a portfolio
          template for a fictional firm and is not a real privacy policy.
          Replace this content with a legally-reviewed policy before deploying
          to production.
        </div>

        <Reveal>
          <Link
            to="/"
            className="group mb-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1px] no-underline transition-colors"
            style={{ color: 'var(--color-blue)' }}
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1"
            >
              ←
            </span>
            <span>Back to home</span>
          </Link>

          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px]"
            style={{ color: 'var(--color-blue)' }}
          >
            {content.eyebrow}
          </div>

          <h1
            className="mb-3 font-normal leading-[1.05] tracking-[-1.2px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: 'var(--color-ink)',
            }}
          >
            {content.title}
            {content.titleEmphasis && (
              <>
                {' '}
                <span className="serif" style={{ color: 'var(--color-blue)' }}>
                  {content.titleEmphasis}
                </span>
              </>
            )}
          </h1>

          <div
            className="mb-8 text-sm"
            style={{ color: 'var(--color-mute-2)' }}
          >
            Last updated · {content.lastUpdated}
          </div>

          <p
            className="mb-10 md:mb-14 max-w-[720px] text-[17px] leading-[1.7]"
            style={{ color: 'var(--color-muted)' }}
          >
            {content.intro}
          </p>
        </Reveal>

        <div className="grid gap-4 md:gap-12 lg:grid-cols-[270px_1fr] lg:gap-16">
          {/* In-page table of contents — sticky on desktop. */}
          <Reveal>
            <nav
              aria-label="On this page"
              className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
            >
              <div
                className="mb-3.5 text-[12px] font-semibold uppercase tracking-[1px]"
                style={{ color: 'var(--color-mute-2)' }}
              >
                On this page
              </div>
              <ul className="space-y-2.25 text-[13.5px]">
                {content.sections.map((s) => {
                  const active = s.id === activeId
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        // The active item gets:
                        //   • a thicker font weight
                        //   • the brand blue color (vs muted gray)
                        //   • a small blue dot indicator on the left
                        // We use aria-current so screen readers know
                        // which section the user is currently reading.
                        aria-current={active ? 'location' : undefined}
                        className="relative block py-0.5 pl-3 leading-[1.5] no-underline transition-all duration-300"
                        style={{
                          color: active
                            ? 'var(--color-blue)'
                            : 'var(--color-muted)',
                          fontWeight: active ? 600 : 400,
                        }}
                        onMouseEnter={(e) => {
                          if (!active)
                            e.currentTarget.style.color = 'var(--color-ink)'
                        }}
                        onMouseLeave={(e) => {
                          if (!active)
                            e.currentTarget.style.color = 'var(--color-muted)'
                        }}
                      >
                        {/* Active-item indicator — a small bar that
                            fades in/out as the active section changes.
                            Lives on the link's pseudo-position via
                            absolute positioning. */}
                        <span
                          aria-hidden
                          className="absolute left-0 top-1/2 h-3 w-[2px] -translate-y-1/2 rounded-full transition-opacity duration-300"
                          style={{
                            backgroundColor: 'var(--color-blue)',
                            opacity: active ? 1 : 0,
                          }}
                        />
                        {s.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </Reveal>

          {/* Section content */}
          <article className="max-w-[780px]">
            <Reveal>
              <div className="space-y-12">
                {content.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <h2
                      className="mb-4 font-medium leading-[1.2] tracking-[-0.4px]"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(22px, 2.4vw, 28px)',
                        color: 'var(--color-ink)',
                      }}
                    >
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.body.map((block, i) =>
                        Array.isArray(block) ? (
                          <ul
                            key={i}
                            className="ml-5 list-disc space-y-2 text-[15px] leading-[1.7]"
                            style={{ color: 'var(--color-muted)' }}
                          >
                            {block.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p
                            key={i}
                            className="text-[15px] leading-[1.7]"
                            style={{ color: 'var(--color-muted)' }}
                          >
                            {block}
                          </p>
                        ),
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </Reveal>
          </article>
        </div>
      </div>
    </section>
  )
}
