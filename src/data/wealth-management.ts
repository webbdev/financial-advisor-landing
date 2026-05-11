import type { ServiceContent } from './services-types'

export const wealthManagement: ServiceContent = {
  slug: 'wealth-management',
  shortName: 'Wealth Management',
  eyebrow: 'Service · Wealth management',

  heroTitle: 'Wealth that compounds —',
  heroEmphasis: 'quietly, year after year.',
  heroLead:
    'A discretionary portfolio managed to your goals, your risk tolerance, and your timeline. Diversified, rebalanced, and reviewed every quarter — so you don\u2019t have to.',
  heroStats: [
    { num: '8.4%', label: 'Avg. annualised return*' },
    { num: '£487k', label: 'Avg. portfolio size' },
    { num: '0.85%', label: 'All-in annual fee' },
  ],

  featuresEyebrow: "What's included",
  featuresTitle: 'Everything your money needs —',
  featuresEmphasis: 'in one place.',
  features: [
    {
      icon: 'chart',
      title: 'Bespoke portfolio',
      description:
        'Built from low-cost index funds, ETFs, and select active managers. Allocated to your goals, not someone else\u2019s template.',
    },
    {
      icon: 'coins',
      title: 'Quarterly rebalancing',
      description:
        'We keep your asset mix on target as markets move, so risk doesn\u2019t drift away from what you signed up for.',
    },
    {
      icon: 'calendar',
      title: 'Annual strategy review',
      description:
        'A 60-minute meeting each year to revisit goals, tax position, and whether the plan still fits your life.',
    },
    {
      icon: 'shield',
      title: 'Tax-efficient wrappers',
      description:
        'Maximised use of ISAs, pensions, and General Investment Accounts to keep more of what your money earns.',
    },
    {
      icon: 'cube',
      title: 'Direct adviser access',
      description:
        'A named adviser who knows your situation. No call centres, no rotating account managers.',
    },
    {
      icon: 'house',
      title: 'Quarterly reporting',
      description:
        'A clear, jargon-free PDF every three months showing performance, costs, and what\u2019s changed.',
    },
  ],

  processEyebrow: 'How it works',
  processTitle: 'From first call to fully',
  processEmphasis: 'invested',
  processLead:
    'A considered, repeatable process that turns big questions into clear next steps — and keeps you informed at every stage.',
  processSteps: [
    {
      num: '01',
      title: 'Discovery call',
      description:
        '30 minutes, on us. We listen, you ask anything. No pitches, no pressure.',
    },
    {
      num: '02',
      title: 'Plan & proposal',
      description:
        'A written plan with your target allocation, projected returns, and our fee — line by line.',
    },
    {
      num: '03',
      title: 'Onboarding',
      description:
        'We handle the platform paperwork, transfers, and any consolidation from existing pensions or ISAs.',
    },
    {
      num: '04',
      title: 'Ongoing management',
      description:
        'Quarterly rebalancing, annual reviews, and direct access whenever life changes call for an adjustment.',
    },
  ],

  pricingEyebrow: 'Pricing',
  pricingTitle: 'Simple fees,',
  pricingEmphasis: 'no surprises.',
  pricingLead:
    'One annual fee. No commissions, no transaction kickbacks, no hidden costs. The fee scales with the portfolio — so you pay less as your wealth grows.',
  pricingTiers: [
    {
      name: 'Foundation',
      price: '1.00%',
      priceCaption: 'per year · up to £250k',
      includes: [
        'Bespoke portfolio',
        'Quarterly rebalancing',
        'Annual strategy review',
        'Direct adviser access',
        'Quarterly reporting',
      ],
    },
    {
      name: 'Core',
      price: '0.85%',
      priceCaption: 'per year · £250k\u2013£1m',
      includes: [
        'Everything in Foundation',
        'Tax-efficient wrapper structuring',
        'Half-yearly check-ins',
        'Cashflow planning',
        'Estate-planning intro',
      ],
      featured: true,
      ctaLabel: 'Most chosen',
    },
    {
      name: 'Private',
      price: '0.65%',
      priceCaption: 'per year · over £1m',
      includes: [
        'Everything in Core',
        'Quarterly review meetings',
        'Tax-loss harvesting',
        'Dedicated adviser team',
        'Priority phone & email',
      ],
    },
  ],
  pricingFootnote:
    '* Past performance is not a reliable indicator of future results. Investments can go down as well as up. Average return figures cover 2014\u20132024 across our model portfolios.',

  faqEyebrow: 'Frequently asked',
  faqTitle: 'Questions, answered',
  faqEmphasis: 'plainly.',
  faqs: [
    {
      question: 'What\u2019s the minimum I need to invest?',
      answer:
        'There\u2019s no hard minimum, but our service starts to add real value from around £100,000. Below that, a low-cost ETF portfolio may serve you well enough on its own, and we\u2019re happy to point you to one.',
    },
    {
      question: 'How is your fee different from a commission?',
      answer:
        'A commission is paid by a product provider when you buy their fund or policy — meaning the adviser is incentivised to sell you certain things. We charge you directly, take nothing from product providers, and have no quotas to hit. The advice you get is the advice we believe is right for you.',
    },
    {
      question: 'Can I move my existing investments to you?',
      answer:
        'Yes. We handle transfers from existing ISAs, pensions, and General Investment Accounts as part of onboarding. We\u2019ll also walk you through any exit fees, tax implications, or capital gains considerations before you commit.',
    },
    {
      question: 'What if I need my money out?',
      answer:
        'It\u2019s your money — you can withdraw at any time, with no exit fees from us. Most withdrawals settle within 5\u201310 working days depending on the underlying funds. We\u2019ll discuss tax-efficient withdrawal strategies if you\u2019re drawing down income.',
    },
    {
      question: 'Are you regulated?',
      answer:
        'Yes. Finova is authorised and regulated by the Financial Conduct Authority (FCA). Your money is held with a regulated platform, separate from Finova\u2019s own assets, and protected up to £120,000 per person by the Financial Services Compensation Scheme.',
    },
    {
      question: 'How often will I hear from you?',
      answer:
        'A quarterly written report, an annual face-to-face (or video) review, and direct access to your adviser whenever you have a question. We don\u2019t spam you with newsletters or sales calls.',
    },
  ],
}
