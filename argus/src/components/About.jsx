/* CTA Banner — replaces the "About" section for Argus */
export default function About() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-navy)', position: 'relative', overflow: 'hidden' }}>
      <div className="divider" style={{ marginBottom: 100 }} />

      {/* Background accents */}
      <div className="glow-blob glow-blob-blue-dim animate-pulse-glow"
        style={{ width: 600, height: 600, bottom: '-20%', left: '-10%' }} />
      <div className="glow-blob glow-blob-cyan animate-pulse-glow-2"
        style={{ width: 400, height: 400, top: '-10%', right: '20%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Integrations section */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Integrations</span>
            <h2 className="title-xxl" style={{ color: '#fff', marginBottom: 16 }}>
              Works with your stack
            </h2>
            <p style={{ color: 'var(--color-gray-10)', maxWidth: 440, margin: '0 auto', fontSize: 16, lineHeight: 1.7 }}>
              Argus connects to the tools you already use — no migration required.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {INTEGRATIONS.map((int) => (
              <div key={int.name} className="card-dark" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{int.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: 15 }}>{int.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-gray-10)', marginTop: 2 }}>{int.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-navy-10) 0%, rgba(59,130,246,0.08) 50%, var(--color-navy-20) 100%)',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: 'var(--radius-2xl)',
          padding: '72px 64px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
              <span className="tag-primary">
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', marginRight: 8 }} />
                Join 12,000+ creators
              </span>
            </div>
            <h2 className="title-xxl" style={{ color: '#fff', marginBottom: 20 }}>
              Your next growth milestone<br />starts with the right data
            </h2>
            <p style={{ color: 'var(--color-gray-10)', maxWidth: 520, margin: '0 auto 40px', fontSize: 17, lineHeight: 1.7 }}>
              Argus is free to start. Connect your channel in under 2 minutes and see exactly what&apos;s holding your growth back.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a href="#pricing" className="btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}
                onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Start for free — no credit card
                <ArrowIcon />
              </a>
              <a href="#testimonials" className="btn-outline" style={{ fontSize: 16, padding: '16px 32px' }}
                onClick={(e) => { e.preventDefault(); document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' }) }}>
                See creator stories
              </a>
            </div>
            {/* Social proof */}
            <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
              {PROOF.map((p) => (
                <div key={p.label} style={{ textAlign: 'center' }}>
                  <div className="stat-number" style={{ fontSize: 32 }}>{p.value}</div>
                  <div style={{ color: 'var(--color-gray-10)', fontSize: 13, marginTop: 4 }}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const INTEGRATIONS = [
  { name: 'YouTube Studio', icon: '▶️', desc: 'Full data sync' },
  { name: 'Google Analytics', icon: '📊', desc: 'Traffic sources' },
  { name: 'Notion', icon: '📝', desc: 'Export reports' },
  { name: 'Slack', icon: '💬', desc: 'Alert notifications' },
  { name: 'Zapier', icon: '⚡', desc: '5,000+ automations' },
  { name: 'Email', icon: '✉️', desc: 'Scheduled reports' },
]

const PROOF = [
  { value: '12K+', label: 'Active creators' },
  { value: '4.9★', label: 'Average rating' },
  { value: '$0', label: 'To get started' },
]

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
