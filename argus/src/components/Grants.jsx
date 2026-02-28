const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for new creators just getting started with data.',
    features: [
      '1 YouTube channel',
      '90-day data history',
      'Core analytics dashboard',
      'Weekly email summary',
      'Basic audience insights',
    ],
    cta: 'Start for free',
    featured: false,
  },
  {
    name: 'Creator',
    price: '$19',
    period: 'per month',
    description: 'For serious creators who want to grow faster with data-driven decisions.',
    features: [
      '3 YouTube channels',
      'Full data history',
      'AI growth recommendations',
      'Competitor tracking (5 channels)',
      'Revenue analytics',
      'Custom alerts',
      'Priority support',
    ],
    cta: 'Start 14-day free trial',
    featured: true,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'per month',
    description: 'For agencies and power creators managing multiple channels at scale.',
    features: [
      'Unlimited channels',
      'Full data history',
      'Advanced AI recommendations',
      'Competitor tracking (unlimited)',
      'Revenue & sponsorship analytics',
      'Custom reports & webhooks',
      'API access',
      'Dedicated account manager',
    ],
    cta: 'Start 14-day free trial',
    featured: false,
  },
]

export default function Grants() {
  return (
    <section id="pricing" className="section" style={{ backgroundColor: 'var(--color-navy)', position: 'relative', overflow: 'hidden' }}>
      <div className="divider" style={{ marginBottom: 100 }} />

      {/* Background accent */}
      <div className="glow-blob glow-blob-blue animate-pulse-glow"
        style={{ width: 600, height: 600, top: '-20%', right: '-10%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Pricing</span>
          <h2 className="title-xxl" style={{ color: '#fff', marginBottom: 16 }}>
            Simple, transparent pricing
          </h2>
          <p className="body-text" style={{ color: 'var(--color-gray-10)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            Start free, upgrade when you&apos;re ready. No hidden fees, no long-term commitments.
          </p>
        </div>

        {/* Plans grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* FAQ row */}
        <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
          {FAQS.map((faq) => (
            <div key={faq.q}>
              <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{faq.q}</h4>
              <p style={{ color: 'var(--color-gray-10)', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan }) {
  return (
    <div className={`pricing-card${plan.featured ? ' pricing-card-featured' : ''}`}
      style={{ position: 'relative' }}>
      {plan.badge && (
        <div style={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          borderRadius: 100,
          padding: '4px 16px',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.05em',
          color: '#fff',
          whiteSpace: 'nowrap',
        }}>
          {plan.badge}
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{plan.name}</h3>
        <p style={{ color: 'var(--color-gray-10)', fontSize: 13, lineHeight: 1.6 }}>{plan.description}</p>
      </div>

      <div style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {plan.price}
        </span>
        <span style={{ fontSize: 14, color: 'var(--color-gray-10)', marginLeft: 4 }}>/{plan.period}</span>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
        {plan.features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--color-gray-20)' }}>
            <span style={{ color: '#3b82f6', flexShrink: 0, marginTop: 2 }}>
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a href="#" className={plan.featured ? 'btn-primary' : 'btn-outline'}
        style={{ width: '100%', justifyContent: 'center' }}>
        {plan.cta}
        <ArrowIcon />
      </a>
    </div>
  )
}

const FAQS = [
  { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no cancellation fees. Cancel from your dashboard in one click.' },
  { q: 'Do I need a credit card to start?', a: 'No. The Free plan requires no payment info. Trials for paid plans do require a card.' },
  { q: 'What counts as a "channel"?', a: 'Each connected YouTube channel counts as one. You can mix and match across plan limits.' },
  { q: 'Is my data secure?', a: 'Argus uses read-only YouTube API access. We never store your credentials, only your analytics data.' },
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
