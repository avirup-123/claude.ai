const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'We called on AKIS.STUDIO for our branding and social media templates. Perfect support from start to finish. The team took all our wishes into consideration, but also knew how to advise on the best branding for our target audience.',
    author: 'Marie L.',
    company: 'Brussels Startup',
    role: 'Founder',
    rating: 5,
    category: 'Branding',
  },
  {
    id: 2,
    quote:
      "We've been working with AKIS.STUDIO for several years now, both for Belgium and France. Dimitri and his team built our online stores and handle all the maintenance. They also take care of designing all our marketing materials — and we recommend them without hesitation.",
    author: 'Thomas V.',
    company: 'Retail Group',
    role: 'CEO',
    rating: 5,
    category: 'E-Commerce',
  },
  {
    id: 3,
    quote:
      "We work with AKIS.STUDIO regularly on many projects. The team is creative, dependable, and incredibly well-organized. They quickly grasp our briefs and deliver flawless visuals on time, every time.",
    author: 'Clara D.',
    company: 'European Association',
    role: 'Communications Director',
    rating: 5,
    category: 'Web Design',
  },
  {
    id: 4,
    quote:
      'Exceptional attention to detail and a real understanding of our law firm\'s positioning. The new website perfectly captures the seriousness and dynamism we wanted to convey. Highly recommended.',
    author: 'Alexandre M.',
    company: 'VEGA Law Firm',
    role: 'Managing Partner',
    rating: 5,
    category: 'Branding & Web',
  },
  {
    id: 5,
    quote:
      'The team at AKIS.STUDIO completely transformed our digital presence. The new design has noticeably increased our inquiry rate and our clients consistently compliment the professionalism of our online image.',
    author: 'Nathalie R.',
    company: 'Le Cénacle',
    role: 'Director',
    rating: 5,
    category: 'Web & Content',
  },
]

export default function Testimonials() {
  return (
    <section className="section" style={{ backgroundColor: '#000' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Testimonials</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="title-xxl" style={{ color: '#fff' }}>
              What our clients say
            </h2>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} filled />
                ))}
              </div>
              <span style={{ color: 'var(--color-gray-10)', fontSize: 14 }}>5.0 average rating</span>
            </div>
          </div>
        </div>

        {/* Main large testimonial */}
        <div
          style={{
            padding: '48px',
            background: 'linear-gradient(135deg, var(--color-dark-10) 0%, #0d0d0d 100%)',
            border: '1px solid var(--color-dark-20)',
            borderRadius: 'var(--radius-2xl)',
            marginBottom: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              fontSize: 200,
              lineHeight: 1,
              color: 'var(--color-dark-20)',
              fontFamily: 'Georgia, serif',
              pointerEvents: 'none',
            }}
          >
            "
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
            {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} filled />)}
          </div>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.7,
              color: '#fff',
              fontWeight: 400,
              marginBottom: 32,
              maxWidth: 760,
              fontStyle: 'italic',
            }}
          >
            &ldquo;{TESTIMONIALS[0].quote}&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Avatar name={TESTIMONIALS[0].author} />
            <div>
              <div style={{ fontWeight: 600, color: '#fff' }}>{TESTIMONIALS[0].author}</div>
              <div style={{ fontSize: 13, color: 'var(--color-gray-10)' }}>
                {TESTIMONIALS[0].role}, {TESTIMONIALS[0].company}
              </div>
            </div>
            <span className="tag-primary" style={{ marginLeft: 'auto' }}>{TESTIMONIALS[0].category}</span>
          </div>
        </div>

        {/* Grid testimonials */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {TESTIMONIALS.slice(1).map((t) => (
            <div key={t.id} className="testimonial-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} filled />)}
                </div>
                <span className="tag" style={{ fontSize: 11 }}>{t.category}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-gray-10)', marginBottom: 20, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--color-dark-20)', paddingTop: 20 }}>
                <Avatar name={t.author} small />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{t.author}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-gray-10)' }}>{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StarIcon({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1l1.7 3.4L12.5 5 10 7.5l.6 3.8L7 9.5l-3.6 1.8L4 7.5 1.5 5l3.8-.6L7 1z"
        fill={filled ? '#ed731a' : 'none'}
        stroke="#ed731a"
        strokeWidth="1"
      />
    </svg>
  )
}

function Avatar({ name, small }) {
  const colors = ['#ed731a', '#5b8df6', '#4caf50', '#e91e63', '#9c27b0']
  const idx = name.charCodeAt(0) % colors.length
  const size = small ? 32 : 44
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `${colors[idx]}22`,
        border: `1px solid ${colors[idx]}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: small ? 13 : 17,
        fontWeight: 700,
        color: colors[idx],
        flexShrink: 0,
      }}
    >
      {name[0]}
    </div>
  )
}
