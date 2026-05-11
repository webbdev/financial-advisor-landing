/**
 * Smoothly scrolls to a section by id WITHOUT updating the URL.
 *
 * Default `<a href="#x">` behaviour appends `#x` to the address bar; we
 * prevent that and call `window.scrollTo` ourselves. Also accounts for
 * the fixed navbar height so the section heading clears it.
 *
 * Use as: `onClick={(e) => smoothScrollTo(e, '#contact')}` on any anchor.
 *
 * Honours `prefers-reduced-motion` — those users get an instant jump
 * instead of the smooth glide.
 */

// Height to offset by, so the heading isn't tucked under the fixed nav.
const NAV_OFFSET = 64

export function smoothScrollTo(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  href: string,
) {
  e.preventDefault()
  const id = href.replace(/^#/, '')
  const target = document.getElementById(id)
  if (!target) return

  // Detect reduced-motion at call time. Doing it here (rather than as a
  // hook) means non-component callers can use the helper too.
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET

  window.scrollTo({
    top,
    behavior: prefersReduced ? 'auto' : 'smooth',
  })
}
