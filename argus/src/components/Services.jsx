const FEATURES = [
  {
    number: '01',
    title: 'Deep Video Analytics',
    description: 'Track views, watch time, impressions, and click-through rates for every video — with historical comparisons and trend overlays.',
    tags: ['Views', 'Watch Time', 'CTR', 'Impressions'],
    icon: <BarChartIcon />,
  },
  {
    number: '02',
    title: 'Audience Intelligence',
    description: 'Understand who your viewers are, when they watch, and what keeps them coming back. Segmented by geography, device, and traffic source.',
    tags: ['Demographics', 'Geography', 'Retention', 'Sources'],
    icon: <UsersIcon />,
  },
  {
    number: '03',
    title: 'Competitor Tracking',
    description: 'Monitor channels in your niche and benchmark your performance. See what topics are driving growth for your competitors before you miss the wave.',
    tags: ['Benchmarking', 'Niche Trends', 'Gap Analysis'],
    icon: <RadarIcon />,
  },
  {
    number: '04',
    title: 'AI Growth Recommendations',
    description: 'Argus surfaces actionable suggestions — best upload times, optimal video length, trending topics — trained on millions of creator data points.',
    tags: ['AI Insights', 'Scheduling', 'Topics', 'Thumbnails'],
    icon: <SparkleIcon />,
  },
  {
    number: '05',
    title: 'Revenue Analytics',
    description: 'Connect AdSense and sponsorship data in one place. Understand your true RPM, top-earning videos, and revenue trends over time.',
    tags: ['AdSense', 'RPM', 'Sponsorships', 'Earnings'],
    icon: <DollarIcon />,
  },
  {
    number: '06',
    title: 'Custom Alerts & Reports',
    description: 'Set thresholds for views, subs, or engagement — Argus notifies you instantly. Schedule weekly performance reports straight to your inbox.',
    tags: ['Alerts', 'Reports', 'Email', 'Webhooks'],
    icon: <BellIcon />,
  },
]

export default function Services() {
  return (
    <section id="features" className="section" style={{ backgroundColor: 'var(--color-navy)' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Features</span>
            <h2 className="title-xxl" style={{ color: '#fff', maxWidth: 480 }}>
              Everything you need to grow on YouTube
            </h2>
          </div>
          <p className="body-text" style={{ color: 'var(--color-gray-10)', maxWidth: 380, lineHeight: 1.7 }}>
            From raw data to clear actions — Argus handles every layer of your YouTube analytics so you can focus on creating.
          </p>
        </div>

        {/* Features grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {FEATURES.map((f) => (
            <FeatureCard key={f.number} {...f} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 72,
          padding: '48px',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.05) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: 'var(--radius-2xl)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}>
          <div>
            <h3 className="title-lg" style={{ color: '#fff', marginBottom: 8 }}>
              All features included in every plan
            </h3>
            <p style={{ color: 'var(--color-gray-10)', fontSize: 15 }}>
              No feature gating. Get everything Argus offers from day one.
            </p>
          </div>
          <a href="#pricing" className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
            View pricing
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ number, title, description, tags, icon }) {
  return (
    <div className="card-dark" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>{icon}</div>
        <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1px var(--color-navy-40)', lineHeight: 1 }}>
          {number}
        </span>
      </div>
      <div>
        <h3 className="title-md" style={{ color: '#fff', marginBottom: 12 }}>{title}</h3>
        <p style={{ color: 'var(--color-gray-10)', fontSize: 14, lineHeight: 1.7 }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
        {tags.map((t) => (
          <span key={t} style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 100, border: '1px solid var(--color-navy-40)', color: 'var(--color-navy-50)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function BarChartIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="18" width="5" height="9" rx="1.5" fill="url(#fi1)" />
      <rect x="12" y="10" width="5" height="17" rx="1.5" fill="url(#fi1)" opacity="0.7" />
      <rect x="21" y="4" width="5" height="23" rx="1.5" fill="url(#fi1)" opacity="0.5" />
      <defs>
        <linearGradient id="fi1" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" /></linearGradient>
      </defs>
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="11" cy="11" r="5" stroke="url(#fi2)" strokeWidth="1.8" />
      <path d="M3 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="url(#fi2)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="22" cy="10" r="3.5" stroke="url(#fi2)" strokeWidth="1.6" opacity="0.6" />
      <path d="M26 24c0-3-1.8-5.5-4.5-6.5" stroke="url(#fi2)" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <defs>
        <linearGradient id="fi2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" /></linearGradient>
      </defs>
    </svg>
  )
}

function RadarIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="11" stroke="url(#fi3)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="15" cy="15" r="7" stroke="url(#fi3)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="15" cy="15" r="3" fill="url(#fi3)" />
      <path d="M15 15 L23 6" stroke="url(#fi3)" strokeWidth="1.8" strokeLinecap="round" />
      <defs>
        <linearGradient id="fi3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" /></linearGradient>
      </defs>
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M15 4 L16.5 13 L26 15 L16.5 17 L15 26 L13.5 17 L4 15 L13.5 13 Z" fill="url(#fi4)" />
      <defs>
        <linearGradient id="fi4" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" /></linearGradient>
      </defs>
    </svg>
  )
}

function DollarIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="11" stroke="url(#fi5)" strokeWidth="1.5" />
      <path d="M15 7v16M11 11.5c0-1.5 1.8-2.5 4-2.5s4 1 4 2.5-1.8 2.5-4 2.5-4 1-4 2.5S12.8 19 15 19s4-1 4-2.5" stroke="url(#fi5)" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="fi5" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" /></linearGradient>
      </defs>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M15 5a7 7 0 017 7v5l2 3H6l2-3v-5a7 7 0 017-7z" stroke="url(#fi6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 22c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5" stroke="url(#fi6)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="22" cy="7" r="3" fill="url(#fi6)" />
      <defs>
        <linearGradient id="fi6" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" /></linearGradient>
      </defs>
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
