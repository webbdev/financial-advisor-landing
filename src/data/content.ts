/**
 * Static content for the landing page.
 * Keeping these out of the section components keeps JSX easier to scan
 * and lets you swap copy without touching layout.
 */

export const heroStats = [
  { num: '£2.4B', label: 'Assets advised' },
  { num: '850+', label: 'Clients served' },
  { num: '15+', label: 'Years of trust' },
] as const

export const trustItems = [
  { label: 'Hartwell & Co.', variant: 'serif' as const },
  { label: 'MERIDIAN', variant: 'plain' as const },
  { label: 'Northpoint', variant: 'italic' as const },
  { label: 'ASCEND', variant: 'plain' as const },
  { label: 'BLACKBRIAR', variant: 'plain' as const },
  { label: 'Kingsbridge', variant: 'serif' as const },
  { label: 'VANTAGE', variant: 'plain' as const },
]

export const pillars = [
  { title: 'Fiduciary first', desc: 'Your interests, always.' },
  { title: 'Transparent fees', desc: 'No hidden costs.' },
  { title: 'Growth-focused', desc: "Compound, don't coast." },
  { title: 'Personal service', desc: 'Real people, real care.' },
] as const

export const services = [
  {
    title: 'Wealth management',
    desc: 'Disciplined investing built to grow your money over years and decades — diversified, rebalanced, and aligned to your\u00A0goals.',
    featured: true,
    badge: 'POPULAR',
    icon: 'chart',
    href: '/services/wealth-management',
  },
  {
    title: 'Savings & Investment strategy',
    desc: 'Build a smart savings plan and a research-led investment strategy — across stocks, bonds, and ISAs — that grows your money steadily, year after\u00A0year.',
    icon: 'coins',
    href: '/services/savings-investments',
  },
  {
    title: 'Tax planning',
    desc: 'Year-round structuring to keep more of what you earn and grow — legally, ethically, and\u00A0efficiently.',
    icon: 'calendar',
  },
  {
    title: 'Business advisory',
    desc: 'From cashflow modelling to exit planning — guidance for founders and owner-directors growing real\u00A0value.',
    icon: 'cube',
  },
  {
    title: 'Estate & legacy',
    desc: 'Tax-efficient strategies to pass on what matters most to the people who matter\u00A0most.',
    icon: 'house',
  },
  {
    title: 'Fraud prevention',
    desc: 'Spot scams, secure your accounts, and protect your wealth from financial fraud — with practical safeguards built into every\u00A0plan.',
    icon: 'shield',
  },
] as const

export const stats = [
  { num: '8.4%', label: 'Avg. annualised return*' },
  { num: '96%', label: 'Client retention rate' },
  { num: '£0', label: 'In hidden commissions' },
  { num: '15+', label: 'Years of compounding' },
] as const

export const processSteps = [
  { num: '01', title: 'Discover', desc: 'A no-obligation conversation about your goals.' },
  { num: '02', title: 'Design', desc: 'A bespoke plan, modelled and stress-tested.' },
  { num: '03', title: 'Deliver', desc: 'We implement — paperwork, platforms, the lot.' },
  { num: '04', title: 'Review', desc: 'Quarterly check-ins. Adjust as life changes.' },
] as const

export const testimonials = [
  {
    quote:
      'Finova helped us untangle a decade of messy finances and build something I actually understand. They explain things without ever talking down to you.',
    initials: 'SH',
    name: 'Sarah Holloway',
    role: 'GP — Surrey',
  },
  {
    quote:
      'When I sold my company, the team walked me through every option calmly. No sales pitch — just a plan I trusted from day one.',
    initials: 'DC',
    name: 'Daniel Chen',
    role: 'Founder, exited 2024',
  },
] as const