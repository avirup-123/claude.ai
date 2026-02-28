const VALUES = [
  {
    title: 'Honest Partnership',
    description: 'We say what we mean and mean what we say. No hidden fees, no vague timelines — just transparent communication throughout.',
  },
  {
    title: 'Quality over Quantity',
    description: 'We take on a limited number of projects at a time so each one gets our full attention. Your project matters to us, not just your budget.',
  },
  {
    title: 'Results-Driven',
    description: 'Beautiful design is only half the goal. Everything we create is built to perform — to attract the right audience and convert them into clients.',
  },
  {
    title: 'Long-Term Thinking',
    description: 'We build for today with tomorrow in mind. Scalable code, timeless design, and post-launch support mean your investment keeps growing.',
  },
]

const TEAM = [
  {
    name: 'Dimitri',
    role: 'Founder & Creative Director',
    bio: 'With over 8 years in branding and web, Dimitri leads the studio vision — ensuring every project is both beautiful and functional.',
    initial: 'D',
    color: '#ed731a',
  },
  {
    name: 'Sophie',
    role: 'UX & UI Designer',
    bio: 'Sophie brings user-centered thinking to every interface, crafting designs that feel intuitive and purposeful.',
    initial: 'S',
    color: '#5b8df6',
  },
  {
    name: 'Lucas',
    role: 'Lead Developer',
    bio: 'Lucas transforms designs into high-performance websites — with a focus on speed, security, and scalability.',
    initial: 'L',
    color: '#4caf50',
  },
]

export default function About() {
  return (
    <section id="about" className="section" style={{ backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      <div className="divider" style={{ marginBottom: 100 }} />

      {/* Background accent */}
      <div
        className="glow-blob glow-blob-orange-dim animate-pulse-glow"
        style={{ width: 500, height: 500, bottom: '-10%', left: '-10%' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Studio intro */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
            marginBottom: 96,
          }}
        >
          <div>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>About the studio</span>
            <h2 className="title-xxl" style={{ color: '#fff', marginBottom: 24 }}>
              Built on a simple idea
            </h2>
            <p className="body-text" style={{ color: 'var(--color-gray-10)', marginBottom: 24, lineHeight: 1.8 }}>
              Your image should reflect who you actually are. That idea has been our driving force since day one,
              shaping every project we take on at AKIS.STUDIO.
            </p>
            <p className="body-text" style={{ color: 'var(--color-gray-10)', lineHeight: 1.8 }}>
              We&apos;re based in Ixelles, right in the heart of Brussels on Avenue Louise — working with businesses
              across Belgium and with international clients across Europe. Our bilingual team (French and English)
              means we can support businesses anywhere in the world.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-gray-10)', fontSize: 14 }}>
                <LocationIcon />
                Avenue Louise, Ixelles — Brussels
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-gray-10)', fontSize: 14 }}>
                <LanguageIcon />
                FR / EN
              </div>
            </div>
          </div>

          {/* Visual */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: 'var(--radius-2xl)',
                background: 'var(--color-dark-10)',
                border: '1px solid var(--color-dark-20)',
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              {/* Map-like visual */}
              <div
                style={{
                  height: 180,
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
                  border: '1px solid var(--color-dark-20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                  <GridLines />
                </div>
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Brussels, Belgium</div>
                  <div style={{ fontSize: 12, color: 'var(--color-gray-10)', marginTop: 4 }}>Avenue Louise — Ixelles</div>
                </div>
              </div>

              {/* Quick facts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {QUICK_FACTS.map((fact) => (
                  <div key={fact.label} style={{ padding: '16px', background: '#000', borderRadius: 12, border: '1px solid var(--color-dark-20)' }}>
                    <div className="stat-number" style={{ fontSize: 28 }}>{fact.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-gray-10)', marginTop: 4 }}>{fact.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div
              style={{
                position: 'absolute',
                top: -16,
                right: -16,
                background: 'var(--color-primary)',
                borderRadius: 'var(--radius-xl)',
                padding: '10px 16px',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.05em',
                boxShadow: '0 8px 24px rgba(237,115,26,0.4)',
              }}
            >
              AWWWARDS<br />
              <span style={{ fontWeight: 400, opacity: 0.8, fontSize: 11 }}>Honorable Mention</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 96 }}>
          <h3 className="title-lg" style={{ color: '#fff', marginBottom: 40 }}>What we stand for</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {VALUES.map((value) => (
              <div key={value.title} className="card-dark" style={{ padding: 28 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(237,115,26,0.1)', border: '1px solid rgba(237,115,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-primary)' }} />
                </div>
                <h4 className="title-md" style={{ color: '#fff', marginBottom: 10, fontSize: 18 }}>{value.title}</h4>
                <p style={{ color: 'var(--color-gray-10)', fontSize: 14, lineHeight: 1.7 }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="title-lg" style={{ color: '#fff', marginBottom: 40 }}>The team</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member }) {
  return (
    <div className="card-dark" style={{ padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: `${member.color}22`,
          border: `1px solid ${member.color}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 700,
          color: member.color,
          flexShrink: 0,
        }}
      >
        {member.initial}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 2 }}>{member.name}</div>
        <div style={{ fontSize: 12, color: 'var(--color-primary)', marginBottom: 10 }}>{member.role}</div>
        <p style={{ fontSize: 13, color: 'var(--color-gray-10)', lineHeight: 1.6 }}>{member.bio}</p>
      </div>
    </div>
  )
}

function GridLines() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#333" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

const QUICK_FACTS = [
  { value: '50+', label: 'Projects' },
  { value: '5+', label: 'Years' },
  { value: '3', label: 'Team members' },
  { value: 'BE/EU', label: 'Coverage' },
]

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1a4 4 0 014 4c0 3-4 8-4 8S3 8 3 5a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function LanguageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 1c-2 2-2 10 0 12M1 7h12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 4.5h11M1.5 9.5h11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
