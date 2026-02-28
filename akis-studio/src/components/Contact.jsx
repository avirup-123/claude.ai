import { useState } from 'react'

const SERVICES_OPTIONS = [
  'Branding & Identity',
  'UX & UI Design',
  'Web Development',
  'E-Commerce',
  'Other',
]

const BUDGET_OPTIONS = [
  'Under €2,000',
  '€2,000 – €5,000',
  '€5,000 – €10,000',
  '€10,000+',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="section" style={{ backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      <div className="divider" style={{ marginBottom: 100 }} />

      {/* BG blob */}
      <div
        className="glow-blob glow-blob-orange animate-pulse-glow"
        style={{ width: 600, height: 600, top: '-20%', right: '-10%' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left — info */}
          <div>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>Let&apos;s talk</span>
            <h2 className="title-xxl" style={{ color: '#fff', marginBottom: 24 }}>
              Start your project today
            </h2>
            <p className="body-text" style={{ color: 'var(--color-gray-10)', lineHeight: 1.8, marginBottom: 48 }}>
              Book a free discovery call. We&apos;ll take the time to understand your vision,
              ask the right questions, and see if we&apos;re a good fit — everything starts there.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
              {CONTACT_INFO.map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--color-dark-10)',
                      border: '1px solid var(--color-dark-20)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--color-dark-40)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                    <div style={{ color: '#fff', fontSize: 14, marginTop: 2 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 12 }}>
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--color-dark-10)',
                    border: '1px solid var(--color-dark-20)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gray-10)',
                    fontSize: 16,
                    transition: 'border-color 0.15s, color 0.15s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-dark-30)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-dark-20)'
                    e.currentTarget.style.color = 'var(--color-gray-10)'
                  }}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            style={{
              background: 'var(--color-dark-10)',
              border: '1px solid var(--color-dark-20)',
              borderRadius: 'var(--radius-2xl)',
              padding: 40,
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
                <h3 className="title-lg" style={{ color: '#fff', marginBottom: 12 }}>Message sent!</h3>
                <p style={{ color: 'var(--color-gray-10)', lineHeight: 1.7 }}>
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h3 className="title-md" style={{ color: '#fff', marginBottom: 4 }}>Tell us about your project</h3>
                <p style={{ fontSize: 14, color: 'var(--color-gray-10)', marginBottom: 8 }}>Fill in the form and we&apos;ll be in touch shortly.</p>

                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Name" required>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      style={inputStyle}
                    />
                  </Field>
                </div>

                {/* Company */}
                <Field label="Company (optional)">
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    style={inputStyle}
                  />
                </Field>

                {/* Service */}
                <Field label="Service needed" required>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">Select a service...</option>
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                {/* Budget */}
                <Field label="Estimated budget">
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">Select a range...</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </Field>

                {/* Message */}
                <Field label="Project description" required>
                  <textarea
                    placeholder="Tell us about your project, goals, and timeline..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                  />
                </Field>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                  Send message
                  <ArrowIcon />
                </button>

                <p style={{ fontSize: 12, color: 'var(--color-dark-40)', textAlign: 'center' }}>
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const inputStyle = {
  width: '100%',
  background: '#000',
  border: '1px solid var(--color-dark-20)',
  borderRadius: 8,
  padding: '12px 14px',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.15s',
  fontFamily: 'inherit',
}

function Field({ label, children, required }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--color-gray-10)', marginBottom: 6, letterSpacing: '0.04em' }}>
        {label}{required && <span style={{ color: 'var(--color-primary)', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

const CONTACT_INFO = [
  { label: 'Email', value: 'hello@akis.studio', icon: '✉️' },
  { label: 'Location', value: 'Avenue Louise, Ixelles — Brussels', icon: '📍' },
  { label: 'Languages', value: 'French & English', icon: '🌐' },
]

const SOCIALS = [
  { label: 'Instagram', icon: '📸' },
  { label: 'LinkedIn', icon: '💼' },
  { label: 'Behance', icon: '🎨' },
]

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
