export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 72,
      }}
    >
      {/* Background blobs */}
      <div
        className="glow-blob glow-blob-orange animate-pulse-glow"
        style={{ width: 600, height: 600, top: '5%', left: '55%', transform: 'translate(-50%, 0)' }}
      />
      <div
        className="glow-blob glow-blob-orange-dim animate-pulse-glow-2"
        style={{ width: 400, height: 400, top: '50%', left: '20%', transform: 'translate(-50%, -50%)' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{ marginBottom: 32 }}>
          <span className="tag-primary">
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', marginRight: 8 }} />
            Brussels-based branding & web agency
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ marginBottom: 32, maxWidth: 900 }}>
          <span className="title-huge" style={{ display: 'block', color: '#fff' }}>
            We craft brands
          </span>
          <span className="title-huge" style={{ display: 'block', color: 'var(--color-primary)' }}>
            &amp; websites
          </span>
          <span className="title-huge" style={{ display: 'block', color: 'var(--color-gray-10)' }}>
            that convert.
          </span>
        </h1>

        {/* Subline */}
        <p
          className="body-text"
          style={{
            color: 'var(--color-gray-10)',
            maxWidth: 520,
            marginBottom: 48,
            lineHeight: 1.7,
            fontSize: 17,
          }}
        >
          Strategy, design, and development — crafting identities and websites
          that truly reflect who you are. From startups to established companies,
          we build digital experiences that drive results.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Book a discovery call
            <ArrowIcon />
          </a>
          <a
            href="#work"
            className="btn-outline"
            onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            View our work
          </a>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48, marginTop: 80, flexWrap: 'wrap' }}>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="stat-number">{stat.value}</div>
              <div style={{ color: 'var(--color-gray-10)', fontSize: 14, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0.4,
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gray-10)' }}>
          Scroll
        </span>
        <div
          className="animate-float"
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--color-gray-10), transparent)' }}
        />
      </div>

      {/* Trusted by marquee */}
      <div style={{ marginTop: 80, borderTop: '1px solid var(--color-dark-20)', paddingTop: 32 }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-dark-40)', marginBottom: 24 }}>
            Trusted by
          </p>
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div className="animate-marquee" style={{ gap: 64, padding: '0 32px' }}>
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <span
                key={i}
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--color-dark-30)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.01em',
                }}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const STATS = [
  { value: '50+', label: 'Projects delivered' },
  { value: '5+', label: 'Years of experience' },
  { value: '98%', label: 'Client satisfaction' },
]

const CLIENTS = [
  'VEGA Law Firm',
  'Le Cénacle',
  'European Association',
  'Sports Brand',
  'Architecture Firm',
  'Brussels SME',
  'Startup Collective',
  'Finance Group',
]

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
