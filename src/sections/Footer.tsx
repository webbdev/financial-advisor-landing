import { useReducedMotion } from 'motion/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { smoothScrollTo } from '../lib/scroll'

/**
 * Each link declares whether it's an internal route or an external/protocol
 * link (`mailto:`, `tel:`, etc). This lets us pick the right element below
 * — <Link> for routes, <a> for everything else — without sniffing strings.
 */
type FooterLink = {
  label: string
  href?: string
  /**
   * - 'route'       → client-side <Link> (whole-page navigation)
   * - 'hash'        → home-page section anchor (e.g. "#about"); cross-page
   *                   nav lands on home + scrolls; same-page click scrolls
   *                   smoothly without touching the URL
   * - 'external'    → <a> for mailto/tel/http(s)
   * - 'placeholder' → disabled-look anchor with "Coming soon" tooltip
   * - 'plain'       → not a link at all, just text (e.g. an address)
   */
  kind?: 'route' | 'hash' | 'external' | 'placeholder' | 'plain'
}

const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'Wealth', href: '/services/wealth-management', kind: 'route' },
      { label: 'Investments', href: '#', kind: 'placeholder' },
      { label: 'Savings', href: '#', kind: 'placeholder' },
      { label: 'Tax', href: '#', kind: 'placeholder' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about', kind: 'hash' },
      { label: 'Team', href: '#', kind: 'placeholder' },
      { label: 'Insights', href: '#', kind: 'placeholder' },
      { label: 'Careers', href: '#', kind: 'placeholder' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'London, UK', kind: 'plain' },
      { label: 'info@finova.co', href: 'mailto:info@finova.co', kind: 'external' },
      { label: '+44 20 7946 0000', href: 'tel:+442079460000', kind: 'external' },
    ],
  },
]

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy', kind: 'route' },
  { label: 'Accessibility', href: '/accessibility', kind: 'placeholder' },
  { label: 'Terms', href: '/terms', kind: 'placeholder' },
]

export function Footer() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const navigate = useNavigate()

  /**
   * Logo click handler — same pattern as the navbar logo:
   *   • If we're already on home, smooth-scroll to top
   *   • Otherwise let <Link> do its thing; ScrollToTop resets to top
   */
  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    }
  }

  /**
   * Renders a link with the right element:
   *   • route → <Link to>  (client-side, no reload)
   *   • external → <a href>  (mailto/tel/http(s))
   *   • placeholder → <a href="#"> with disabled-look + aria-disabled
   */
  const renderLink = (link: FooterLink) => {
    const className =
      'group inline-flex items-center gap-1 text-sm no-underline outline-none transition-colors focus-visible:underline'
    const baseStyle = { color: 'var(--color-muted)' }

    const onEnter = (e: React.MouseEvent<HTMLElement>) =>
      (e.currentTarget.style.color = 'var(--color-ink)')
    const onLeave = (e: React.MouseEvent<HTMLElement>) =>
      (e.currentTarget.style.color = 'var(--color-muted)')

    if (link.kind === 'plain') {
      // Not a link — just text. Common for addresses or non-clickable
      // info that lives in a list of links.
      return (
        <span className="inline-flex items-center text-sm" style={baseStyle}>
          {link.label}
        </span>
      )
    }

    if (link.kind === 'hash') {
      // Hash links target a section on the home page (e.g. #about).
      const hash = link.href ?? '#'
      const onHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
          smoothScrollTo(e, hash)
        } else {
          e.preventDefault()
          navigate(`/${hash}`)
        }
      }
      return (
        <a
          href={hash}
          onClick={onHashClick}
          className={className}
          style={baseStyle}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            {link.label}
          </span>
        </a>
      )
    }

    if (link.kind === 'route') {
      return (
        <Link
          to={link.href ?? '#'}
          className={className}
          style={baseStyle}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            {link.label}
          </span>
        </Link>
      )
    }

    if (link.kind === 'external') {
      return (
        <a
          href={link.href ?? '#'}
          className={className}
          style={baseStyle}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {link.label}
        </a>
      )
    }

    // Placeholder — visually present but signalled as not-yet-active.
    return (
      <a
        href={link.href ?? '#'}
        aria-disabled="true"
        title="Coming soon"
        className={className}
        style={{ ...baseStyle, opacity: 0.65, cursor: 'default' }}
        onClick={(e) => e.preventDefault()}
      >
        {link.label}
      </a>
    )
  }

  return (
    <footer
      className="border-t pb-10 pt-14"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-line)',
      }}
      // Helps assistive tech identify this as the page footer (so do
      // header/main, but being explicit doesn't hurt screen-reader UX).
      role="contentinfo"
    >
      <div className="container-x">
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
            {/* Brand block */}
            <div>
              <Link
                to="/"
                onClick={onLogoClick}
                aria-label="Finova — back to home"
                className="inline-flex items-center gap-2.5 no-underline outline-none focus-visible:opacity-80"
              >
                <div
                  className="flex h-6.5 w-6.5 items-center justify-center rounded-md text-white"
                  style={{
                    backgroundColor: 'var(--color-navy)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  F
                </div>
                <span
                  className="text-[16px] font-semibold tracking-[-0.3px]"
                  style={{ color: 'var(--color-ink)' }}
                >
                  Finova
                </span>
              </Link>
              <p
                className="mt-3.5 max-w-[280px] text-[13px] leading-[1.65]"
                style={{ color: 'var(--color-muted)' }}
              >
                Independent, fee-only financial advisory based in London.
                Authorised and regulated by the Financial Conduct Authority.
              </p>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <nav key={col.title} aria-label={`${col.title} links`}>
                <h2
                  className="mb-3.5 text-[11px] font-bold uppercase tracking-[1px]"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {col.title}
                </h2>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>{renderLink(link)}</li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} viewport={{ once: true, amount: 'some' }}>
          <div
            className="mt-12 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
            style={{
              borderColor: 'var(--color-line-2)',
              color: 'var(--color-muted)',
            }}
          >
            <p>
              &copy; {new Date().getFullYear()} Finova Advisory Ltd. Built by{' '}
              <a
                href="#"
                rel="noopener noreferrer"
                aria-label="Built by Tanya"
                className="underline-offset-2 outline-none transition-colors hover:underline focus-visible:underline"
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--color-ink)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--color-muted)')
                }
              >
                Tanya
              </a>
              .
            </p>

            <nav aria-label="Legal" className="mt-1 md:mt-0">
              <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-2 md:gap-x-4">
                {LEGAL_LINKS.map((link, i) => (
                  <li
                    key={link.label}
                    className="flex items-center gap-2.5 md:gap-4"
                  >
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: 'var(--color-line)' }}
                      />
                    )}
                    {renderLink(link)}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}