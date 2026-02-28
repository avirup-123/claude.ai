const SERVICES = [
  {
    number: '01',
    title: 'Branding & Identity',
    description:
      'Brand strategy, logo design, and visual guidelines — the fundamentals of your image. We create identities that resonate with your audience and stand the test of time.',
    features: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines', 'Social Media Templates'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#ed731a" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5" fill="#ed731a" opacity="0.3" />
        <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'UX & UI Design',
    description:
      'Interfaces designed around real user needs. We craft wireframes, prototypes, and polished visual designs that convert visitors into customers.',
    features: ['User Research', 'Wireframes', 'UI Design', 'Prototyping', 'Design System'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="18" rx="3" stroke="#ed731a" strokeWidth="1.5" />
        <path d="M4 11H28" stroke="#ed731a" strokeWidth="1.5" />
        <circle cx="8" cy="8.5" r="1" fill="#ed731a" />
        <circle cx="12" cy="8.5" r="1" fill="#ed731a" />
        <circle cx="16" cy="8.5" r="1" fill="#ed731a" />
        <rect x="8" y="15" width="7" height="5" rx="1" fill="#ed731a" opacity="0.3" />
        <rect x="17" y="15" width="7" height="2" rx="1" fill="#ed731a" opacity="0.2" />
        <rect x="17" y="18" width="4" height="2" rx="1" fill="#ed731a" opacity="0.2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Web Development',
    description:
      'Performance, security, and scalability — websites built to last. From custom-coded solutions to powerful CMS platforms, we deliver fast, responsive, and robust sites.',
    features: ['Custom Development', 'CMS Integration', 'Performance Optimization', 'Security', 'Maintenance'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M10 12L6 16L10 20" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 12L26 16L22 20" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 8L14 24" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'E-Commerce',
    description:
      'Catalog, payments, and shipping — everything you need to sell online. We build high-converting online stores tailored to your products and audience.',
    features: ['Online Store Setup', 'Payment Integration', 'Inventory Management', 'SEO', 'Analytics'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 8H8L10 20H22L25 12H10" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="13" cy="23" r="1.5" fill="#ed731a" />
        <circle cx="21" cy="23" r="1.5" fill="#ed731a" />
        <path d="M15 16H19" stroke="#ed731a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="section" style={{ backgroundColor: '#000' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Services</span>
            <h2 className="title-xxl" style={{ color: '#fff', maxWidth: 480 }}>
              Everything you need to grow online
            </h2>
          </div>
          <p
            className="body-text"
            style={{ color: 'var(--color-gray-10)', maxWidth: 380, lineHeight: 1.7 }}
          >
            From brand strategy to launch and beyond — we handle every aspect of
            your digital presence with precision and care.
          </p>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.number} {...service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: 72,
            padding: '48px',
            background: 'linear-gradient(135deg, var(--color-dark-10) 0%, #0d0d0d 100%)',
            border: '1px solid var(--color-dark-20)',
            borderRadius: 'var(--radius-2xl)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <h3 className="title-lg" style={{ color: '#fff', marginBottom: 8 }}>
              Not sure what you need?
            </h3>
            <p style={{ color: 'var(--color-gray-10)', fontSize: 15 }}>
              Let&apos;s talk. A 30-minute call is all it takes to get clarity.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Book a free consultation
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ number, title, description, features, icon }) {
  return (
    <div
      className="card-dark"
      style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>{icon}</div>
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
          {number}
        </span>
      </div>

      <div>
        <h3 className="title-md" style={{ color: '#fff', marginBottom: 12 }}>{title}</h3>
        <p style={{ color: 'var(--color-gray-10)', fontSize: 14, lineHeight: 1.7 }}>{description}</p>
      </div>

      {/* Features */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
        {features.map((f) => (
          <span
            key={f}
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: '3px 10px',
              borderRadius: 100,
              border: '1px solid var(--color-dark-20)',
              color: 'var(--color-dark-40)',
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
