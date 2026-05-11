import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll position on route changes.
 *
 * - Plain navigation (`/about` → `/services`) → scroll to top
 * - Hash navigation (`/about#team`) → smooth-scroll to that element,
 *   accounting for the fixed navbar height
 * - Same-route hash links are left to `smoothScrollTo` (in lib/scroll.ts),
 *   because that path already has tighter coordination with the navbar
 *   (programmatic flag + mobile overlay close).
 *
 * Drop this above <Routes> inside your <BrowserRouter>.
 */

// Keep this in sync with NAV_OFFSET in lib/scroll.ts
const NAV_OFFSET = 64

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (hash) {
      // The element from the new route may not be in the DOM yet on the
      // first render. Instead of guessing with setTimeout, poll a few
      // animation frames — race-free and cancels itself once found.
      let attempts = 0
      let raf = 0

      const tryScroll = () => {
        const target = document.getElementById(hash.replace('#', ''))
        if (target) {
          const top =
            target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
          window.scrollTo({
            top,
            behavior: prefersReduced ? 'auto' : 'smooth',
          })

          // Strip the hash from the URL once we've scrolled to it.
          // Using history.replaceState (not navigate) so this doesn't
          // trigger another route change — which would re-fire this
          // effect and create a loop. The visible URL becomes "/" while
          // the page stays scrolled to the section.
          window.history.replaceState(null, '', pathname)
          return
        }
        // Poll up to ~60 frames (~1s). Most routes mount in 1-2 frames,
        // but heavy lazy-loaded pages or routes with motion-driven
        // Reveals may need a few more frames before sections paint.
        if (++attempts < 60) raf = requestAnimationFrame(tryScroll)
      }
      raf = requestAnimationFrame(tryScroll)
      return () => cancelAnimationFrame(raf)
    }

    // Plain route change — reset to top. Instant, not smooth, because
    // a smooth scroll *across* a new page that's still painting looks
    // janky. Users expect a fresh page to start at the top, period.
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}