const STEPS = [
  {
    number: '01',
    title: 'Connect your channel',
    description: 'Link your YouTube account in one click. Argus pulls in your full data history — no CSV uploads, no manual work.',
    tag: '< 2 minutes',
    icon: <LinkIcon />,
  },
  {
    number: '02',
    title: 'Argus analyzes everything',
    description: 'Our engine processes your videos, audience, and niche data — cross-referencing millions of creator signals to build your unique performance profile.',
    tag: 'Runs 24/7',
    icon: <CpuIcon />,
  },
  {
    number: '03',
    title: 'Get clear insights',
    description: 'A clean dashboard shows what\'s working, what\'s not, and why. No data science degree required.',
    tag: 'Real-time',
    icon: <EyeIcon />,
  },
  {
    number: '04',
    title: 'Take action',
    description: 'Follow AI-powered recommendations: best upload times, trending topics, thumbnail improvements, and more — all tailored to your channel.',
    tag: 'Actionable',
    icon: <RocketIcon />,
  },
  {
    number: '05',
    title: 'Track your growth',
    description: 'Watch your metrics improve over time. Argus learns from your results and sharpens its recommendations as your channel evolves.',
    tag: 'Long-term',
    icon: <TrendIcon />,
  },
  {
    number: '06',
    title: 'Get alerts & reports',
    description: 'Set up custom alerts for viral moments or dips. Receive weekly automated reports summarizing your channel\'s performance.',
    tag: 'Automated',
    icon: <BellIcon />,
  },
]

export default function Process() {
  return (
    <section id="how-it-works" className="section" style={{ backgroundColor: 'var(--color-navy)' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>How it works</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="title-xxl" style={{ color: '#fff' }}>
              From data to growth,<br />in minutes
            </h2>
            <p className="body-text" style={{ color: 'var(--color-gray-10)', maxWidth: 380, lineHeight: 1.7 }}>
              Connect once, Argus does the heavy lifting. No setup complexity — just plug in and start getting insights.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        {/* Guarantee banner */}
        <div style={{
          marginTop: 72,
          padding: '40px 48px',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: 'var(--radius-2xl)',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: 36 }}>⚡</div>
          <div style={{ flex: 1 }}>
            <h3 className="title-md" style={{ color: '#fff', marginBottom: 6 }}>Up and running in under 5 minutes</h3>
            <p style={{ color: 'var(--color-gray-10)', fontSize: 14, lineHeight: 1.6 }}>
              Connect your YouTube account, and Argus has your first insights ready before your next coffee cup is empty.
            </p>
          </div>
          <a href="#pricing" className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Try it free
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

function StepCard({ step }) {
  return (
    <div
      style={{ padding: '36px 32px', borderTop: '1px solid var(--color-navy-30)', position: 'relative', transition: 'background-color 0.2s', cursor: 'default' }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy-10)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>{step.icon}</div>
        <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1px var(--color-navy-40)', lineHeight: 1 }}>
          {step.number}
        </span>
      </div>
      <h3 className="title-md" style={{ color: '#fff', marginBottom: 10 }}>{step.title}</h3>
      <p style={{ color: 'var(--color-gray-10)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{step.description}</p>
      <span className="tag" style={{ fontSize: 11 }}>
        <ClockIcon />
        <span style={{ marginLeft: 6 }}>{step.tag}</span>
      </span>
    </div>
  )
}

function LinkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M11 17l-3 3a4 4 0 005.7 5.6l5-5a4 4 0 00-1.3-6.4" stroke="url(#pi1)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17 11l3-3a4 4 0 00-5.7-5.6l-5 5a4 4 0 001.3 6.4" stroke="url(#pi1)" strokeWidth="1.6" strokeLinecap="round" />
      <defs><linearGradient id="pi1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="url(#pi2)" strokeWidth="1.6" />
      <path d="M11 5V3M14 5V3M17 5V3M11 25v-2M14 25v-2M17 25v-2M3 11h2M3 14h2M3 17h2M23 11h2M23 14h2M23 17h2" stroke="url(#pi2)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2.5" fill="url(#pi2)" opacity="0.6" />
      <defs><linearGradient id="pi2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M3 14s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="url(#pi3)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="14" cy="14" r="3.5" stroke="url(#pi3)" strokeWidth="1.6" />
      <circle cx="14" cy="14" r="1.5" fill="url(#pi3)" />
      <defs><linearGradient id="pi3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4c0 0 6 2 8 10 0 0-4 2-6 5l-2-2-1-1c3-2 4-5 4-5s-6 1-8 5c0 0 0 3 2 5l-2 4-3-3 1-4s-3-2-2-5C7 9 14 4 14 4z" stroke="url(#pi4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="10" r="1.5" fill="url(#pi4)" />
      <defs><linearGradient id="pi4" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 20l6-7 5 3 9-10" stroke="url(#pi5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 8h6v6" stroke="url(#pi5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <defs><linearGradient id="pi5" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#3b82f6"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4a7 7 0 017 7v5l2 3H5l2-3v-5a7 7 0 017-7z" stroke="url(#pi6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 22c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5" stroke="url(#pi6)" strokeWidth="1.5" strokeLinecap="round" />
      <defs><linearGradient id="pi6" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b82f6"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
