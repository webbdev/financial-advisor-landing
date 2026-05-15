/**
 * Shape of content for any legal/policy page (Privacy, Terms,
 * Accessibility). The LegalPage component renders any of these.
 */

export type LegalSection = {
  /** Short id used for the in-page table-of-contents anchor. */
  id: string
  /** Section heading. */
  title: string
  /**
   * One or more paragraphs. Strings render as <p>. Nested arrays
   * render as <ul> with one <li> per item — handy for "we collect:"
   * style breakdowns.
   */
  body: (string | string[])[]
}

export type LegalContent = {
  slug: string
  /** Eyebrow above the h1, e.g. "Policy · Privacy". */
  eyebrow: string
  title: string
  /** Italic-emphasis suffix used after the title (Fraunces). */
  titleEmphasis?: string
  /** Last-updated date, e.g. "May 2026". */
  lastUpdated: string
  /** Short intro paragraph under the title. */
  intro: string
  sections: LegalSection[]
}
