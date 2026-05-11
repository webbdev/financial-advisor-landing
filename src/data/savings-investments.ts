import type { ServiceContent } from './services-types'

export const savingsInvestments: ServiceContent = {
  slug: 'savings-investments',
  shortName: 'Savings & Investments',
  eyebrow: 'Service · Savings & investment strategy',

  heroTitle: 'Build wealth from',
  heroEmphasis: 'where you are.',
  heroLead:
    'A practical plan for saving more, investing smarter, and watching your money grow — across stocks, bonds, ISAs, and pensions. Designed for people building wealth, not just those already there.',
  heroStats: [
    { num: '7.2%', label: 'Avg. annual return*' },
    { num: '£40k', label: 'Min. portfolio size' },
    { num: '0.95%', label: 'All-in annual fee' },
  ],

  featuresEyebrow: "What's included",
  featuresTitle: 'A complete plan for the',
  featuresEmphasis: 'years ahead.',
  features: [
    {
      icon: 'coins',
      title: 'Savings strategy',
      description:
        'A clear monthly plan: how much to save, where to keep it, and how to balance short-term goals with long-term growth.',
    },
    {
      icon: 'chart',
      title: 'Diversified portfolio',
      description:
        'Built from low-cost index funds and ETFs across UK, US, and global markets — matched to your risk tolerance and timeline.',
    },
    {
      icon: 'shield',
      title: 'ISA & pension wrappers',
      description:
        'Maximise your tax-free allowances every year — Stocks & Shares ISA, Lifetime ISA, and SIPP — so the taxman gets less of your gains.',
    },
    {
      icon: 'calendar',
      title: 'Automatic rebalancing',
      description:
        'Quarterly check-ups to keep your asset mix on target, so a long bull run in one corner doesn\u2019t silently shift your risk profile.',
    },
    {
      icon: 'house',
      title: 'Goal-based pots',
      description:
        'Separate strategies for the house deposit, the wedding, the retirement — each with its own time horizon and approach.',
    },
    {
      icon: 'cube',
      title: 'Adviser support',
      description:
        'A real person to call when life changes — a new job, a baby, a windfall — and your plan needs to flex with you.',
    },
  ],

  processEyebrow: 'How it works',
  processTitle: 'From first save to',
  processEmphasis: 'compounding gains',
  processLead:
    'A repeatable, no-jargon process that takes you from "I should probably do something with my money" to a working plan you understand.',
  processSteps: [
    {
      num: '01',
      title: 'Free consultation',
      description:
        '30 minutes to talk about your goals, your timeline, and what you\u2019ve got going already. No commitment.',
    },
    {
      num: '02',
      title: 'Personal plan',
      description:
        'A written strategy: how much to save, what to invest in, which wrappers to use, and how the numbers stack up.',
    },
    {
      num: '03',
      title: 'Set up & invest',
      description:
        'We open the right accounts, transfer existing ISAs if needed, and put your first contributions to work.',
    },
    {
      num: '04',
      title: 'Stay on track',
      description:
        'Quarterly reviews, automatic rebalancing, and adviser access whenever your circumstances change.',
    },
  ],

  pricingEyebrow: 'Pricing',
  pricingTitle: 'Honest fees that',
  pricingEmphasis: 'shrink as you grow.',
  pricingLead:
    'A single annual fee that scales with your portfolio. No commissions, no transaction kickbacks, no hidden costs. Pay less as your wealth compounds — exactly the opposite of how the industry usually works.',
  pricingTiers: [
    {
      name: 'Starter',
      price: '1.20%',
      priceCaption: 'per year · £40k\u2013£100k',
      includes: [
        'Personal savings & investment plan',
        'Diversified ETF portfolio',
        'ISA & pension setup',
        'Quarterly rebalancing',
        'Annual review',
      ],
    },
    {
      name: 'Builder',
      price: '0.95%',
      priceCaption: 'per year · £100k\u2013£500k',
      includes: [
        'Everything in Starter',
        'Goal-based portfolio segmentation',
        'Tax-efficient withdrawal planning',
        'Half-yearly check-ins',
        'Direct adviser access',
      ],
      featured: true,
      ctaLabel: 'Most chosen',
    },
    {
      name: 'Established',
      price: '0.75%',
      priceCaption: 'per year · over £500k',
      includes: [
        'Everything in Builder',
        'Quarterly review meetings',
        'Tax-loss harvesting',
        'Estate-planning intro',
        'Priority phone & email',
      ],
    },
  ],
  pricingFootnote:
    '* Past performance is not a reliable indicator of future results. Investments can go down as well as up. Average return figures cover 2014\u20132024 across our balanced model portfolios.',

  faqEyebrow: 'Frequently asked',
  faqTitle: 'Your questions,',
  faqEmphasis: 'answered.',
  faqs: [
    {
      question: 'I\u2019m only just starting — is this for me?',
      answer:
        'Yes — provided you\u2019ve got around £40,000 to invest or are saving toward that level steadily. Below that, a low-cost robo-adviser like Vanguard\u2019s LifeStrategy or a simple Stocks & Shares ISA will serve you well, and we\u2019re happy to point you in that direction. Our service starts to add real value once your plan needs more than off-the-shelf can offer.',
    },
    {
      question: 'What\u2019s the difference between savings and investments?',
      answer:
        'Savings are money you keep accessible for short-term needs — usually in cash accounts or fixed-rate bonds, where the value doesn\u2019t fluctuate. Investments are money you put to work for the long term — typically 5+ years — in things like shares and bonds, which can rise and fall but historically grow faster than inflation. A good plan uses both: enough cash for emergencies and short-term goals, the rest invested for growth.',
    },
    {
      question: 'How much should I be saving each month?',
      answer:
        'A common rule of thumb is 20% of take-home pay, split across an emergency fund (3\u20136 months of expenses), short-term goals, and long-term investments. But the right number depends on your age, income, fixed costs, and goals — that\u2019s exactly what we work out together in your plan.',
    },
    {
      question: 'Can I move my existing ISA or pension?',
      answer:
        'Yes. We handle transfers from existing Stocks & Shares ISAs, Cash ISAs, and most personal pensions as part of onboarding. We\u2019ll always check exit fees, exit penalties, and any benefits you\u2019d lose (like guaranteed annuity rates on older pensions) before recommending a transfer.',
    },
    {
      question: 'What if I need to stop investing for a while?',
      answer:
        'Life happens — a job change, a big expense, a sabbatical. You can pause contributions whenever you need to. Your existing investments stay invested and continue to grow; you just stop adding new money. When you\u2019re ready to resume, we\u2019ll review the plan and pick up where you left off.',
    },
    {
      question: 'Are you regulated?',
      answer:
        'Yes. Finova is authorised and regulated by the Financial Conduct Authority (FCA). Your money is held with a regulated investment platform, separate from Finova\u2019s own assets, and protected up to £120,000 per person by the Financial Services Compensation Scheme.',
    },
  ],
}
