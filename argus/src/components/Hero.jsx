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
      <div className="glow-blob glow-blob-blue animate-pulse-glow"
        style={{ width: 700, height: 700, top: '0%', left: '58%', transform: 'translate(-50%, -20%)' }} />
      <div className="glow-blob glow-blob-cyan animate-pulse-glow-2"
        style={{ width: 500, height: 500, top: '55%', left: '5%', transform: 'translate(-20%, -50%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{ marginBottom: 32 }}>
          <span className="tag-primary">
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', marginRight: 8 }} />
            SaaS for YouTube creators
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ marginBottom: 32, maxWidth: 880 }}>
          <span className="title-huge" style={{ display: 'block', color: '#fff' }}>Know your channel.</span>
          <span className="title-huge" style={{ display: 'block' }}>
            <span className="gradient-text">Grow your channel.</span>
          </span>
        </h1>

        {/* Subline */}
        <p className="body-text" style={{ color: 'var(--color-gray-10)', maxWidth: 540, marginBottom: 48, lineHeight: 1.7, fontSize: 17 }}>
          Argus watches your YouTube data around the clock — surfacing insights, predicting trends, and telling you exactly what to do next to accelerate your growth.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 80 }}>
          <a href="#pricing" className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Start for free
            <ArrowIcon />
          </a>
          <a href="#how-it-works" className="btn-outline"
            onClick={(e) => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}>
            See how it works
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-number">{s.value}</div>
              <div style={{ color: 'var(--color-gray-10)', fontSize: 14, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className="container" style={{ position: 'relative', zIndex: 1, marginTop: 80 }}>
        <DashboardPreview />
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.35 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gray-10)' }}>Scroll</span>
        <div className="animate-float" style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--color-gray-10), transparent)' }} />
      </div>

      {/* Trusted by marquee */}
      <div style={{ marginTop: 60, borderTop: '1px solid var(--color-navy-30)', paddingTop: 32 }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-navy-50)', marginBottom: 24 }}>
            Trusted by creators worldwide
          </p>
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div className="animate-marquee" style={{ gap: 64, padding: '0 32px' }}>
            {[...CREATORS, ...CREATORS].map((c, i) => (
              <span key={i} style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-navy-50)', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--color-navy-10) 0%, var(--color-navy-20) 100%)',
      border: '1px solid var(--color-navy-30)',
      borderRadius: 16,
      padding: '20px 24px',
      maxWidth: 880,
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '25%', width: 400, height: 250, background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Browser bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <div style={{ flex: 1, height: 26, background: 'var(--color-navy-30)', borderRadius: 6, marginLeft: 8, display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
          <span style={{ fontSize: 11, color: 'var(--color-navy-50)' }}>app.argus.io/dashboard</span>
        </div>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        {DASH_METRICS.map((m) => (
          <div key={m.label} style={{ background: 'var(--color-navy-20)', border: '1px solid var(--color-navy-30)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, color: 'var(--color-navy-50)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
            <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{m.value}</div>
            <div style={{ fontSize: 10, color: m.up ? '#22c55e' : '#f87171', marginTop: 4 }}>
              {m.up ? '▲' : '▼'} {m.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: 'var(--color-navy-20)', border: '1px solid var(--color-navy-30)', borderRadius: 10, padding: '16px 20px', height: 130, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: 10, color: 'var(--color-navy-50)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Views over time — last 30 days</div>
        <svg viewBox="0 0 820 70" style={{ width: '100%', height: 70 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path d="M0,65 C80,58 120,50 180,35 C240,20 280,42 340,30 C400,18 450,36 510,22 C570,8 610,25 670,12 C720,2 770,14 820,6 L820,70 L0,70Z" fill="url(#cg)" />
          <path d="M0,65 C80,58 120,50 180,35 C240,20 280,42 340,30 C400,18 450,36 510,22 C570,8 610,25 670,12 C720,2 770,14 820,6" fill="none" stroke="url(#lg)" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}

const DASH_METRICS = [
  { label: 'Total views', value: '2.4M', delta: '18% this week', up: true },
  { label: 'Subscribers', value: '84.2K', delta: '+1,240 today', up: true },
  { label: 'Watch time', value: '98K hrs', delta: '12% vs last wk', up: true },
  { label: 'CTR', value: '6.8%', delta: '0.3% vs avg', up: false },
]

const STATS = [
  { value: '12K+', label: 'Creators growing with Argus' },
  { value: '4.2B', label: 'Data points analyzed' },
  { value: '3.1×', label: 'Average growth multiplier' },
]

const CREATORS = [
  'TechUnboxed — 2.1M subs',
  'GrowthHackers — 890K subs',
  'PixelPerfect — 1.4M subs',
  'DailyVlogger — 3.2M subs',
  'CodeWithMe — 560K subs',
  'FinanceTips — 1.1M subs',
  'FoodieWorld — 4.5M subs',
  'GamersUnite — 2.8M subs',
]

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
