export default function Grants() {
  return (
    <section className="section" style={{ backgroundColor: '#000' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, var(--color-dark-10) 0%, #0d0d0d 60%, #0a0a00 100%)',
            border: '1px solid var(--color-dark-20)',
            borderRadius: 'var(--radius-2xl)',
            padding: '64px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background accent */}
          <div
            style={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(237,115,26,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(237,115,26,0.1)',
                  border: '1px solid rgba(237,115,26,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                🏛️
              </div>
              <div>
                <span className="tag-primary" style={{ fontSize: 11 }}>Brussels-Capital Region</span>
              </div>
            </div>

            <h2 className="title-xl" style={{ color: '#fff', marginBottom: 16 }}>
              Up to €17,500 in grants<br />for your digital project
            </h2>
            <p className="body-text" style={{ color: 'var(--color-gray-10)', maxWidth: 560, marginBottom: 48, lineHeight: 1.8 }}>
              Our digital consulting services qualify for regional grants in the Brussels-Capital Region.
              A dedicated partner handles the entire application process — helping Brussels-based SMEs
              access professional web services at a significantly reduced cost.
            </p>

            {/* Grant cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
              {GRANTS.map((grant) => (
                <GrantCard key={grant.label} {...grant} />
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <a
                href="#contact"
                className="btn-primary"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                Learn if you qualify
                <ArrowIcon />
              </a>
              <p style={{ fontSize: 13, color: 'var(--color-dark-40)' }}>
                Free eligibility check — no commitment required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GrantCard({ amount, label, description, icon }) {
  return (
    <div
      style={{
        padding: '28px 24px',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--color-dark-20)',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-primary)', marginBottom: 4 }}>
        {amount}
      </div>
      <div style={{ fontWeight: 600, color: '#fff', marginBottom: 8, fontSize: 15 }}>{label}</div>
      <p style={{ fontSize: 13, color: 'var(--color-gray-10)', lineHeight: 1.6 }}>{description}</p>
    </div>
  )
}

const GRANTS = [
  {
    amount: '€10,000',
    label: 'Digitalization Grant',
    description: 'For digital transformation projects including website creation and e-commerce development.',
    icon: '💻',
  },
  {
    amount: '€7,500',
    label: 'Consultancy Grant',
    description: 'For digital strategy and consulting services to help your business grow online.',
    icon: '📋',
  },
  {
    amount: '100%',
    label: 'Application Managed',
    description: 'Our partner handles the entire application process — you focus on your business.',
    icon: '✅',
  },
]

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
