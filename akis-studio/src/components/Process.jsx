const STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'Everything starts with a conversation. We take time to understand your vision, goals, and challenges — and clarify whether the project makes sense.',
    duration: '30 min',
    icon: <PhoneIcon />,
  },
  {
    number: '02',
    title: 'Strategic Workshop',
    description:
      'We dive deep into your brand, competitors, and audience. This shapes our creative direction and ensures every design decision is intentional.',
    duration: '2–3 days',
    icon: <LightbulbIcon />,
  },
  {
    number: '03',
    title: 'Design Phase',
    description:
      'Moodboards, wireframes, and visual design — we build the full picture iteratively. Every major step gets validated together before moving forward.',
    duration: '1–3 weeks',
    icon: <PenIcon />,
  },
  {
    number: '04',
    title: 'Development',
    description:
      'We translate approved designs into a fast, secure, and scalable website. Regular check-ins keep you in the loop throughout the build.',
    duration: '2–6 weeks',
    icon: <CodeIcon />,
  },
  {
    number: '05',
    title: 'Launch',
    description:
      'A smooth launch with all technical details handled — hosting, domain, SEO setup, speed optimization, and final quality assurance.',
    duration: '1 week',
    icon: <RocketIcon />,
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description:
      'Every site includes a one-year warranty. Beyond that, we offer performance monitoring, updates, and priority support as your business grows.',
    duration: 'Long-term',
    icon: <SupportIcon />,
  },
]

export default function Process() {
  return (
    <section id="process" className="section" style={{ backgroundColor: '#000' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>How we work</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="title-xxl" style={{ color: '#fff' }}>
              Our process,<br />step by step
            </h2>
            <p className="body-text" style={{ color: 'var(--color-gray-10)', maxWidth: 380, lineHeight: 1.7 }}>
              A proven workflow built around clarity, collaboration, and results.
              No surprises — just steady progress toward your goals.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {STEPS.map((step, i) => (
            <ProcessStep key={step.number} step={step} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        {/* Guarantee banner */}
        <div
          style={{
            marginTop: 72,
            padding: '40px 48px',
            border: '1px solid rgba(237,115,26,0.2)',
            borderRadius: 'var(--radius-2xl)',
            background: 'linear-gradient(135deg, rgba(237,115,26,0.05) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ fontSize: 40 }}>🛡️</div>
          <div style={{ flex: 1 }}>
            <h3 className="title-md" style={{ color: '#fff', marginBottom: 6 }}>1-Year Warranty Included</h3>
            <p style={{ color: 'var(--color-gray-10)', fontSize: 14, lineHeight: 1.6 }}>
              Every project comes with a full 12-month bug warranty. If something breaks after launch, we fix it — at no extra charge.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Get started
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step }) {
  return (
    <div
      style={{
        padding: '36px 32px',
        borderTop: '1px solid var(--color-dark-20)',
        position: 'relative',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-dark-10)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>{step.icon}</div>
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'transparent',
            WebkitTextStroke: '1px var(--color-dark-30)',
            lineHeight: 1,
          }}
        >
          {step.number}
        </span>
      </div>
      <h3 className="title-md" style={{ color: '#fff', marginBottom: 10 }}>{step.title}</h3>
      <p style={{ color: 'var(--color-gray-10)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{step.description}</p>
      <span className="tag" style={{ fontSize: 11 }}>
        <ClockIcon />
        <span style={{ marginLeft: 6 }}>{step.duration}</span>
      </span>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M7 4h5l2 5-3 2a14 14 0 006 6l2-3 5 2v5a2 2 0 01-2 2A18 18 0 015 6a2 2 0 012-2" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function LightbulbIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4a8 8 0 016 13.2V20a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2.8A8 8 0 0114 4z" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 24h6" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function PenIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M18 4l6 6-14 14H4v-6L18 4z" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7l6 6" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function CodeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M10 9L5 14l5 5M18 9l5 5-5 5M16 6l-4 16" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function RocketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4s5 0 8 8c0 0-3 1-5 4l-3-3c3-2 4-5 4-5s-5 1-7 4c0 0 0 3 2 5l-2 6-3-3 1-4s-3-2-3-5c3-5 8-7 8-7z" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="11" r="1.5" fill="#ed731a" />
    </svg>
  )
}
function SupportIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke="#ed731a" strokeWidth="1.5" />
      <path d="M10 14a4 4 0 018 0" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="17" r="2" fill="#ed731a" opacity="0.5" />
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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
