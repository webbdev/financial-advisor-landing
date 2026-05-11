import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { smoothScrollTo } from '../lib/scroll'

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Approach' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // True while a click-triggered smooth scroll is in flight. Lets the scroll
  // listener distinguish "user just clicked a menu item" from "user is
  // manually scrolling down" — only the latter should hide the nav.
  // Stored in a ref because we need its current value inside an event
  // listener without re-binding the listener on every change.
  const programmatic = useRef(false)
  // Timeout id for clearing the programmatic flag. Kept in a ref so
  // rapid successive clicks reset the timer instead of stacking.
  const programmaticTimeout = useRef<number | undefined>(undefined)

  // Toggle a denser nav background once we've scrolled past the hero edge.
  // Also drives the show/hide behaviour: scrolling DOWN past a threshold
  // hides the nav, scrolling UP brings it back. We track the previous
  // scrollY in a ref-like local so we can compare frames.
  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY

      // Background-density toggle (unchanged)
      setScrolled(y > 40)

      // If the scroll was triggered by us (clicking a nav item), keep the
      // nav visible — never hide during a programmatic scroll.
      if (programmatic.current) {
        // Still update lastY so the next manual scroll has a fresh baseline
        lastY = y
        if (y < 10) setHidden(false)
        return
      }

      // Hide/show — only kick in past the first ~80px so the nav
      // doesn't disappear immediately when you barely scroll, and
      // ignore tiny deltas (<6px) which are usually trackpad jitter.
      const delta = y - lastY
      if (Math.abs(delta) > 6) {
        if (y > 80 && delta > 0) {
          // scrolling DOWN, past threshold → hide
          setHidden(true)
        } else if (delta < 0) {
          // scrolling UP → show
          setHidden(false)
        }
      }

      // At the very top, always show
      if (y < 10) setHidden(false)

      lastY = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape — small but expected accessibility nicety.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /**
   * Wraps the shared `smoothScrollTo` helper with two navbar-specific
   * concerns:
   *
   * 1. Sets a `programmatic` flag so the scroll listener doesn't hide
   *    the nav while the page glides to the destination section.
   * 2. For the mobile overlay: releases the body scroll-lock and closes
   *    the overlay in the same tick as the scroll, so the slide-up and
   *    the page scroll happen in parallel.
   *
   * Cross-page handling: section ids (#about, #services, etc.) only
   * exist on the home page. If the user clicks a nav link from /book
   * or a service page, we navigate to "/" with the hash and let the
   * existing ScrollToTop component pick up the scroll once Home mounts.
   */
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeOverlay = false,
  ) => {
    if (closeOverlay) {
      // Pre-empt the scroll-lock so navigation/scroll can take effect
      // before React's effect runs to release it.
      document.body.style.overflow = ''
      setOpen(false)
    }

    // If we're not on the home page, intercept the click and route
    // there instead. ScrollToTop handles the hash-scroll on the
    // freshly-mounted Home page.
    if (pathname !== '/') {
      e.preventDefault()
      navigate(`/${href}`) // e.g. "/#about"
      return
    }

    // Same-page click — keep the nav visible during this scroll.
    programmatic.current = true
    setHidden(false)
    window.clearTimeout(programmaticTimeout.current)
    programmaticTimeout.current = window.setTimeout(() => {
      programmatic.current = false
    }, reduce ? 0 : 1000)

    // Delegates URL-suppression, target lookup, NAV_OFFSET, and the
    // smooth-scroll itself to the shared helper.
    smoothScrollTo(e, href)
  }

  return (
    <>
      <motion.nav
        // When the mobile overlay is open we always want the nav slot
        // visible (so the slide-down animation lands smoothly). Otherwise
        // follow the hidden state derived from scroll direction.
        animate={{ y: hidden && !open ? '-100%' : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        }
        className={`fixed inset-x-0 top-0 z-[100] backdrop-blur-xl transition-[background,box-shadow] duration-300 ${
          scrolled
            ? 'bg-[rgba(250,250,247,0.95)] shadow-[0_1px_0_rgba(11,18,32,0.06)]'
            : 'bg-[rgba(250,250,247,0.85)]'
        } border-b`}
        style={{ borderBottomColor: 'var(--color-line-2)' }}
      >
        <div className="container-x flex items-center justify-between py-4">
          {/* Logo — routes to home. From any non-home page, react-router
              navigates and ScrollToTop handles the top-scroll. From the
              home page itself, react-router doesn't re-navigate (same
              pathname), so we manually scroll to top in that case. */}
          <Link
            to="/"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault()
                window.scrollTo({
                  top: 0,
                  behavior: reduce ? 'auto' : 'smooth',
                })
              }
            }}
            className="flex items-center gap-2.5 no-underline"
          >
            <div
              className="flex h-[26px] w-[26px] items-center justify-center rounded-md text-white"
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

          {/* Desktop links */}
          <div className="hidden items-center gap-8 text-sm md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="group relative transition-colors duration-200"
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--color-navy-deep)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--color-muted)')
                }
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — routes to the booking page */}
          <Link
            to="/book"
            className="hidden items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white no-underline transition-all hover:-translate-y-px md:inline-flex"
            style={{ backgroundColor: 'var(--color-navy)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--color-navy-deep)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--color-navy)')
            }
          >
            Book a call
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="relative z-[110] flex cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="var(--color-ink)"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* ───── Mobile fullscreen overlay ─────
          Slides DOWN from the top on open, and slides UP off-screen on close. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
            className="fixed inset-0 z-[105] flex flex-col md:hidden"
            style={{ backgroundColor: 'var(--color-navy)' }}
          >
            {/* Top bar inside overlay */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2.5" />

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-white transition-colors active:scale-92"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--color-blue-pale)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#ffffff')
                }
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Menu items — top-aligned, full-width rows with dividers. */}
            <div className="flex flex-1 flex-col px-10 pt-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href, true)}
                  className="block border-b py-5 text-2xl font-normal text-white no-underline transition-colors"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    borderColor: 'rgba(255,255,255,0.12)',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--color-blue-pale)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = '#ffffff')
                  }
                  onTouchStart={(e) =>
                    (e.currentTarget.style.color = 'var(--color-blue-pale)')
                  }
                  onTouchEnd={(e) =>
                    (e.currentTarget.style.color = '#ffffff')
                  }
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                  </span>
                </a>
              ))}

              <Link
                to="/book"
                onClick={() => {
                  // Mirror the same overlay-cleanup the section links do:
                  // close it and release the scroll lock so navigation
                  // commits cleanly.
                  document.body.style.overflow = ''
                  setOpen(false)
                }}
                className="mt-8 inline-flex items-center justify-center gap-2 self-start rounded-md bg-white px-6 py-3 text-sm font-medium no-underline"
                style={{ color: 'var(--color-navy)' }}
              >
                Book a call →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}