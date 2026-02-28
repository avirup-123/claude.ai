import { useState } from 'react'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--color-navy)', position: 'relative', overflow: 'hidden' }}>
      <div className="divider" style={{ marginBottom: 100 }} />

      <div className="glow-blob glow-blob-blue animate-pulse-glow"
        style={{ width: 500, height: 500, top: '-30%', right: '5%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Get started</span>
            <h2 className="title-xxl" style={{ color: '#fff', marginBottom: 24 }}>
              Ready to watch<br />your channel grow?
            </h2>
            <p className="body-text" style={{ color: 'var(--color-gray-10)', lineHeight: 1.8, marginBottom: 40 }}>
              Join 12,000+ creators using Argus to understand their data and grow faster. Free forever — no credit card required.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {BENEFITS.map((b) => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckIcon />
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--color-gray-20)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — signup */}
          <div style={{ background: 'var(--color-navy-10)', border: '1px solid var(--color-navy-30)', borderRadius: 'var(--radius-2xl)', padding: 40 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>🎉</div>
                <h3 className="title-lg" style={{ color: '#fff', marginBottom: 12 }}>You&apos;re in!</h3>
                <p style={{ color: 'var(--color-gray-10)', lineHeight: 1.7 }}>
                  Check your inbox to confirm your email and connect your first channel.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h3 className="title-md" style={{ color: '#fff', marginBottom: 4 }}>Create your free account</h3>
                <p style={{ fontSize: 14, color: 'var(--color-gray-10)', marginBottom: 8 }}>
                  Connect your YouTube channel in under 2 minutes.
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--color-gray-10)', marginBottom: 6, letterSpacing: '0.04em' }}>
                    Email address <span style={{ color: 'var(--color-primary)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--color-navy-20)',
                      border: '1px solid var(--color-navy-40)',
                      borderRadius: 8,
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: 14,
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px 24px' }}>
                  Create free account
                  <ArrowIcon />
                </button>

                <p style={{ fontSize: 12, color: 'var(--color-navy-50)', textAlign: 'center', lineHeight: 1.6 }}>
                  By signing up, you agree to our Terms and Privacy Policy.<br />
                  No credit card required. Free forever.
                </p>

                <div style={{ borderTop: '1px solid var(--color-navy-30)', paddingTop: 20, display: 'flex', gap: 16 }}>
                  {TRUST_BADGES.map((b) => (
                    <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-navy-50)' }}>
                      <span>{b.icon}</span>
                      {b.label}
                    </div>
                  ))}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const BENEFITS = [
  'Free plan available — no expiry',
  'Connect in under 2 minutes',
  'Full analytics history from day 1',
  'No credit card required to start',
  'Cancel or downgrade anytime',
]

const TRUST_BADGES = [
  { icon: '🔒', label: 'Secure' },
  { icon: '✅', label: 'GDPR compliant' },
  { icon: '⭐', label: '4.9/5 rating' },
]

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2 6.5L4.5 9L10 3" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
