const PROJECTS = [
  {
    id: 1,
    title: 'VEGA',
    category: 'Branding & Web',
    description:
      'A Brussels-based law firm that brings together strategic insight and decisive action. We refined their visual identity and rebuilt their website.',
    tags: ['Law Firm', 'Identity', 'Web Design'],
    bg: 'linear-gradient(135deg, #0a0a14 0%, #111125 100%)',
    accent: '#4f6ef7',
    year: '2024',
    size: 'large',
  },
  {
    id: 2,
    title: 'Le Cénacle',
    category: 'Web & Content',
    description:
      'A prestigious independent senior living residence in La Hulpe, offering refinement and a warm atmosphere in Walloon Brabant.',
    tags: ['Luxury', 'Real Estate', 'Photography'],
    bg: 'linear-gradient(135deg, #0f0d08 0%, #1a1508 100%)',
    accent: '#c8a96e',
    year: '2024',
    size: 'small',
  },
  {
    id: 3,
    title: 'Maison Architecte',
    category: 'Branding',
    description:
      'Complete visual identity for a Brussels architecture firm, capturing their philosophy of functional elegance.',
    tags: ['Architecture', 'Identity', 'Print'],
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #151515 100%)',
    accent: '#999',
    year: '2023',
    size: 'small',
  },
  {
    id: 4,
    title: 'SportFlow',
    category: 'E-Commerce & Branding',
    description:
      'End-to-end digital presence for a Brussels-based sports brand — from logo to online store.',
    tags: ['Sports', 'E-Commerce', 'Branding'],
    bg: 'linear-gradient(135deg, #080f08 0%, #0d1a0d 100%)',
    accent: '#4caf50',
    year: '2023',
    size: 'large',
  },
  {
    id: 5,
    title: 'EuroAssoc',
    category: 'Web Design',
    description:
      'Digital platform for a European association, built for multilingual audiences with a focus on accessibility.',
    tags: ['Association', 'Multilingual', 'UX/UI'],
    bg: 'linear-gradient(135deg, #08090f 0%, #10111f 100%)',
    accent: '#5b8df6',
    year: '2023',
    size: 'small',
  },
  {
    id: 6,
    title: 'FinConseil',
    category: 'Branding & Web',
    description:
      'Rebranding and digital transformation for a financial consulting firm targeting high-net-worth clients.',
    tags: ['Finance', 'Luxury', 'Strategy'],
    bg: 'linear-gradient(135deg, #0a0808 0%, #150e0e 100%)',
    accent: '#d4af37',
    year: '2022',
    size: 'small',
  },
]

export default function Work() {
  return (
    <section id="work" className="section" style={{ backgroundColor: '#000' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Selected Work</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="title-xxl" style={{ color: '#fff' }}>
              Projects we&apos;re proud of
            </h2>
            <a
              href="#contact"
              className="btn-outline"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Start a project
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Projects grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24 }}>
          {PROJECTS.map((project, i) => {
            const isLarge = project.size === 'large'
            return (
              <div
                key={project.id}
                style={{
                  gridColumn: isLarge ? 'span 7' : 'span 5',
                  ...(i % 3 === 1 ? { gridColumn: 'span 5' } : {}),
                  ...(i % 3 === 2 ? { gridColumn: 'span 7' } : {}),
                }}
              >
                <ProjectCard project={project} />
              </div>
            )
          })}
        </div>

        {/* View all */}
        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault() }}>
            View all projects
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <div
      className="work-card"
      style={{ background: project.bg, cursor: 'pointer', minHeight: 300 }}
    >
      {/* Mock project visual */}
      <div
        style={{
          height: 240,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Abstract visual */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 60% 40%, ${project.accent}22 0%, transparent 70%)`,
          }}
        />
        <MockBrowser accent={project.accent} title={project.title} />
      </div>

      {/* Content overlay */}
      <div className="work-card-overlay" />

      {/* Info */}
      <div style={{ padding: '24px 28px 28px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <span style={{ fontSize: 11, color: 'var(--color-gray-10)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {project.category}
            </span>
            <h3 className="title-md" style={{ color: '#fff', marginTop: 4 }}>{project.title}</h3>
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-dark-40)' }}>{project.year}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--color-gray-10)', lineHeight: 1.6 }}>{project.description}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: '3px 10px',
                borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--color-gray-10)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MockBrowser({ accent, title }) {
  return (
    <div
      style={{
        width: '80%',
        maxWidth: 320,
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        transform: 'perspective(800px) rotateY(-5deg) rotateX(3deg)',
      }}
    >
      {/* Browser chrome */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 6, alignItems: 'center' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', opacity: 0.7 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e', opacity: 0.7 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c841', opacity: 0.7 }} />
        <div style={{ flex: 1, height: 14, borderRadius: 4, background: 'rgba(255,255,255,0.05)', marginLeft: 6 }} />
      </div>
      {/* Content */}
      <div style={{ padding: 16 }}>
        <div style={{ height: 6, borderRadius: 3, background: accent, opacity: 0.6, marginBottom: 10, width: '40%' }} />
        <div style={{ height: 10, borderRadius: 3, background: 'rgba(255,255,255,0.08)', marginBottom: 8, width: '90%' }} />
        <div style={{ height: 10, borderRadius: 3, background: 'rgba(255,255,255,0.06)', marginBottom: 8, width: '70%' }} />
        <div style={{ height: 8, borderRadius: 3, background: 'rgba(255,255,255,0.04)', marginBottom: 16, width: '80%' }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ height: 28, borderRadius: 4, background: accent, opacity: 0.7, width: 80 }} />
          <div style={{ height: 28, borderRadius: 4, border: `1px solid ${accent}44`, width: 80 }} />
        </div>
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
