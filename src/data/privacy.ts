import type { LegalContent } from './legal-types'

export const privacyPolicy: LegalContent = {
  slug: 'privacy',
  eyebrow: 'Policy · Privacy',
  title: 'Privacy',
  titleEmphasis: 'policy',
  lastUpdated: 'May 2026',
  intro:
    'This Privacy Policy explains how Finova Advisory Ltd collects, uses, and protects your personal information when you visit our website or use our services. We are committed to handling your data transparently and only for the purposes set out below.',

  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: [
        'Finova Advisory Ltd ("Finova," "we," "us," "our") is an independent financial advisory firm based in London, United Kingdom. We are registered in England and Wales and authorised and regulated by the Financial Conduct Authority (FCA).',
        'For any privacy-related question, contact us at privacy@finova.co or write to: Finova Advisory Ltd, London, United Kingdom.',
      ],
    },
    {
      id: 'data-we-collect',
      title: 'Information we collect',
      body: [
        'We only collect personal information that is necessary to provide our services or improve your experience on this site. This includes:',
        [
          'Contact details you provide — name, email address, phone number, postal address',
          'Information you share during a consultation — financial goals, employment status, existing investments and pensions',
          'Booking information — preferred dates and times, topics you want to discuss',
          'Technical information — IP address, browser type, device type, and pages visited (collected automatically via standard web analytics)',
          'Communications — emails, calls, and messages you send us',
        ],
        'We never collect special-category data (such as health, political views, or religious beliefs) unless it is directly relevant to a service you have asked us to provide and you have given explicit consent.',
      ],
    },
    {
      id: 'how-we-use',
      title: 'How we use your information',
      body: [
        'We use your information to:',
        [
          'Provide the financial advice and services you have asked for',
          'Respond to your enquiries and book consultations',
          'Send you the documents, reports, and updates you have requested',
          'Comply with our legal and regulatory obligations as an FCA-authorised firm',
          'Improve our website and services based on aggregated, anonymised usage data',
        ],
        'We do not sell your data. We do not share it with third parties for marketing purposes. We do not use it to make automated decisions that significantly affect you.',
      ],
    },
    {
      id: 'legal-basis',
      title: 'Legal basis for processing',
      body: [
        'Under the UK GDPR, we process your personal data on one of the following legal bases, depending on the activity:',
        [
          'Contract — to provide the services you have engaged us for',
          'Legitimate interests — to improve our services and communicate with you about ongoing work, where this does not override your rights',
          'Legal obligation — to comply with anti-money-laundering rules, FCA regulations, and tax law',
          'Consent — for optional marketing communications, which you can withdraw at any time',
        ],
      ],
    },
    {
      id: 'how-long',
      title: 'How long we keep your information',
      body: [
        'We retain personal data only as long as needed for the purposes we collected it, or as required by law. For most clients, this means:',
        [
          'Active client records — for the duration of our engagement plus 7 years (as required by FCA rules)',
          'Enquiries that do not become engagements — up to 12 months',
          'Marketing-list subscribers — until you unsubscribe',
          'Anonymous analytics data — up to 26 months',
        ],
        'After these periods, we securely delete or anonymise the data.',
      ],
    },
    {
      id: 'sharing',
      title: 'Who we share your information with',
      body: [
        'We share your data only with parties who help us deliver our services to you, and only to the extent necessary. These include:',
        [
          'Regulated investment platforms that hold and administer your portfolio',
          'Our IT and cloud-hosting providers (for secure data storage)',
          'Professional advisers (accountants, solicitors) where you have asked us to coordinate with them',
          'Regulators and law-enforcement authorities, where we are legally required to do so',
        ],
        'All third parties we work with are bound by strict contractual obligations to protect your data and use it only for the purpose we have agreed.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and tracking',
      body: [
        'This site uses a small number of essential cookies to function properly. We do not use third-party advertising or tracking cookies.',
        'Analytics cookies (which collect anonymised, aggregated usage data) are loaded only with your consent. You can manage your preferences at any time via the cookie banner or your browser settings.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: [
        'Under UK data protection law, you have the right to:',
        [
          'Access — request a copy of the personal data we hold about you',
          'Rectification — ask us to correct anything inaccurate',
          'Erasure — ask us to delete your data (subject to our legal retention obligations)',
          'Restriction — ask us to limit how we use your data',
          'Portability — request your data in a portable, machine-readable format',
          'Objection — object to processing based on legitimate interests or for marketing',
          'Withdraw consent — at any time, where consent is the basis for processing',
        ],
        'To exercise any of these rights, email privacy@finova.co. We will respond within 30 days. If you are unhappy with our response, you can complain to the Information Commissioner\u2019s Office (ICO) at ico.org.uk.',
      ],
    },
    {
      id: 'security',
      title: 'How we protect your information',
      body: [
        'We take security seriously. Personal data is stored encrypted at rest and in transit. Access is restricted to staff who need it to do their jobs, and all team members are trained in data protection and information security.',
        'We review our security practices regularly and report any data breaches to the ICO and affected individuals within 72 hours, as required by law.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. The "last updated" date at the top of this page indicates when the most recent revision was made.',
        'For material changes, we will notify active clients by email and post a prominent notice on this site.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: [
        'If you have any questions about this Privacy Policy or how we handle your data, please contact:',
        'Email: privacy@finova.co  ·  Post: Finova Advisory Ltd, London, United Kingdom',
      ],
    },
  ],
}
