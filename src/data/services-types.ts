/**
 * Shape of content for a single service page (Wealth Management,
 * Tax Planning, Estate, etc.). Each service exports one of these
 * objects; the <ServicePage> component renders it.
 *
 * Adding a new service is now: write one of these objects + register
 * one route. No layout work.
 */

export type ServiceFeature = {
  /** Short title, ~3 words. */
  title: string
  /** Sentence or two of detail. */
  description: string
  /** Icon name from ServiceIcon. */
  icon: 'chart' | 'coins' | 'calendar' | 'cube' | 'house' | 'shield'
}

export type ProcessStep = {
  /** Visible step number, e.g. "01". */
  num: string
  title: string
  description: string
}

export type PricingTier = {
  name: string
  /** Display string, e.g. "0.85% per year" or "From £2,500". */
  price: string
  /** Short tagline under the price. */
  priceCaption: string
  /** Bullet list of what's included. */
  includes: string[]
  /** Mark one tier as featured for visual emphasis. */
  featured?: boolean
  /** Override the CTA label; defaults to "Get started". */
  ctaLabel?: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type ServiceContent = {
  /** URL slug (without leading slash), e.g. "wealth-management". */
  slug: string
  /** Short label used in breadcrumbs and tab title. */
  shortName: string
  /** Eyebrow tag above the hero heading, e.g. "Service · Wealth management". */
  eyebrow: string
  /** Hero h1. The italic-emphasis word in the title. */
  heroTitle: string
  heroEmphasis: string
  /** One-paragraph summary under the h1. */
  heroLead: string
  /** Three quick stats shown in the hero. */
  heroStats: { num: string; label: string }[]

  /** "What's included" section. */
  featuresEyebrow: string
  featuresTitle: string
  featuresEmphasis: string
  features: ServiceFeature[]

  /** "How it works" process. */
  processEyebrow: string
  processTitle: string
  processEmphasis: string
  processLead: string
  processSteps: ProcessStep[]

  /** Pricing section. */
  pricingEyebrow: string
  pricingTitle: string
  pricingEmphasis: string
  pricingLead: string
  pricingTiers: PricingTier[]
  pricingFootnote?: string

  /** FAQ section. */
  faqEyebrow: string
  faqTitle: string
  faqEmphasis: string
  faqs: FaqItem[]
}
