/* Creator Success Stories — replaces the "Work" portfolio section */
const STORIES = [
  {
    id: 1,
    channel: 'TechUnboxed',
    creator: 'Jordan K.',
    before: '620K',
    after: '2.1M',
    time: '8 months',
    metric: 'subscribers',
    highlight: '+240%',
    category: 'Tech',
    accent: '#3b82f6',
  },
  {
    id: 2,
    channel: 'FoodieWorld',
    creator: 'Sarah T.',
    before: '3.2%',
    after: '7.8%',
    time: '6 weeks',
    metric: 'CTR',
    highlight: '+144%',
    category: 'Food',
    accent: '#06b6d4',
  },
  {
    id: 3,
    channel: 'FinanceTips',
    creator: 'Priya M.',
    before: '280K',
    after: '1.1M',
    time: '12 months',
    metric: 'subscribers',
    highlight: '+293%',
    category: 'Finance',
    accent: '#8b5cf6',
  },
  {
    id: 4,
    channel: 'GamersUnite',
    creator: 'Marcus R.',
    before: '18%',
    after: '64%',
    time: '3 months',
    metric: 'audience retention',
    highlight: '+255%',
    category: 'Gaming',
    accent: '#22c55e',
  },
  {
    id: 5,
    channel: 'CodeWithMe',
    creator: 'Ana L.',
    before: '$1.2K',
    after: '$8.4K',
    time: '9 months',
    metric: 'monthly revenue',
    highlight: '+600%',
    category: 'Dev',
    accent: '#f59e0b',
  },
  {
    id: 6,
    channel: 'DailyVlogger',
    creator: 'Tom B.',
    before: '85K',
    after: '3.2M',
    time: '18 months',
    metric: 'subscribers',
    highlight: '+3,665%',
    category: 'Lifestyle',
    accent: '#ef4444',
  },
]

export default function Work() {
  return (
    <section id="work" className="section" style={{ backgroundColor: 'var(--color-navy)' }}>
      <div className="divider" style={{ marginBottom: 100 }} />
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Success stories</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 className="title-xxl" style={{ color: '#fff' }}>
              Real growth,<br />real creators
            </h2>
            <a href="#pricing" className="btn-outline"
              onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Start your story
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Stories grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {STORIES.map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryCard({ story }) {
  return (
    <div className="card-dark" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
      {/* Accent glow */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${story.accent}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>{story.channel}</div>
          <div style={{ fontSize: 12, color: 'var(--color-gray-10)', marginTop: 2 }}>by {story.creator}</div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, border: `1px solid ${story.accent}44`, color: story.accent }}>
          {story.category}
        </span>
      </div>

      {/* Before / after */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1, background: 'var(--color-navy-30)', borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--color-navy-50)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Before</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-gray-10)', letterSpacing: '-0.02em' }}>{story.before}</div>
        </div>
        <div style={{ fontSize: 18, color: 'var(--color-navy-50)' }}>→</div>
        <div style={{ flex: 1, background: `${story.accent}12`, border: `1px solid ${story.accent}30`, borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--color-navy-50)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>After</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: story.accent, letterSpacing: '-0.02em' }}>{story.after}</div>
        </div>
      </div>

      {/* Metric label */}
      <div style={{ fontSize: 13, color: 'var(--color-gray-10)', marginBottom: 20 }}>
        {story.metric}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-navy-30)', paddingTop: 16 }}>
        <span style={{ fontSize: 13, color: 'var(--color-gray-10)' }}>in {story.time}</span>
        <span style={{ fontSize: 18, fontWeight: 700, background: `linear-gradient(135deg, ${story.accent}, #06b6d4)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {story.highlight}
        </span>
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
