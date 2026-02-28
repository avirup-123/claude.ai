const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Argus completely changed how I approach content planning. I used to guess on upload times and topics — now I follow the data and my views have tripled in 4 months.',
    author: 'Jordan K.',
    channel: 'TechUnboxed',
    subs: '2.1M subscribers',
    category: 'Tech',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The competitor tracking feature alone is worth the subscription. I spotted a trending topic in my niche before anyone else and got 800K views on that video.',
    author: 'Priya M.',
    channel: 'FinanceTips',
    subs: '1.1M subscribers',
    category: 'Finance',
    rating: 5,
  },
  {
    id: 3,
    quote: "I manage 6 channels for clients. Before Argus I was drowning in spreadsheets. Now I have all the data in one place and I can actually show clients what's driving their growth.",
    author: 'Lucas D.',
    channel: 'Content Agency',
    subs: '6 channels managed',
    category: 'Agency',
    rating: 5,
  },
  {
    id: 4,
    quote: "The AI recommendations are scarily accurate. Argus told me my thumbnails were hurting my CTR and gave me specific suggestions. I implemented them and my CTR went from 3.2% to 7.8%.",
    author: 'Sarah T.',
    channel: 'FoodieWorld',
    subs: '4.5M subscribers',
    category: 'Food',
    rating: 5,
  },
  {
    id: 5,
    quote: "As a gaming creator, I need to move fast on trends. Argus alerts me when related topics start spiking so I can be one of the first to cover them. It's like having a research team.",
    author: 'Marcus R.',
    channel: 'GamersUnite',
    subs: '2.8M subscribers',
    category: 'Gaming',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-navy)' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Testimonials</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="title-xxl" style={{ color: '#fff' }}>
              Loved by creators
            </h2>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
              </div>
              <span style={{ color: 'var(--color-gray-10)', fontSize: 14 }}>4.9 average · 12,400+ creators</span>
            </div>
          </div>
        </div>

        {/* Featured testimonial */}
        <div style={{
          padding: '48px',
          background: 'linear-gradient(135deg, var(--color-navy-10) 0%, var(--color-navy-20) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: 'var(--radius-2xl)',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, fontSize: 200, lineHeight: 1, color: 'var(--color-navy-30)', fontFamily: 'Georgia, serif', pointerEvents: 'none', userSelect: 'none' }}>
            &ldquo;
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
            {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
          </div>
          <p style={{ fontSize: 20, lineHeight: 1.7, color: '#fff', fontWeight: 400, marginBottom: 32, maxWidth: 760, fontStyle: 'italic' }}>
            &ldquo;{TESTIMONIALS[0].quote}&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Avatar name={TESTIMONIALS[0].author} />
            <div>
              <div style={{ fontWeight: 600, color: '#fff' }}>{TESTIMONIALS[0].author}</div>
              <div style={{ fontSize: 13, color: 'var(--color-gray-10)' }}>
                {TESTIMONIALS[0].channel} · {TESTIMONIALS[0].subs}
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
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
                </div>
                <span className="tag" style={{ fontSize: 11 }}>{t.category}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-gray-10)', marginBottom: 20, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--color-navy-30)', paddingTop: 20 }}>
                <Avatar name={t.author} small />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{t.author}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-gray-10)' }}>{t.channel} · {t.subs}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1l1.7 3.4L12.5 5 10 7.5l.6 3.8L7 9.5l-3.6 1.8L4 7.5 1.5 5l3.8-.6L7 1z"
        fill="#3b82f6" stroke="#3b82f6" strokeWidth="0.5" />
    </svg>
  )
}

function Avatar({ name, small }) {
  const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#22c55e', '#f59e0b']
  const idx = name.charCodeAt(0) % colors.length
  const size = small ? 32 : 44
  return (
    <div style={{
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
    }}>
      {name[0]}
    </div>
  )
}
