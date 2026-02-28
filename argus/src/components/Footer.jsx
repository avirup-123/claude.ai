import { ArgusLogoMark } from './Navbar'

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'],
  Creators: ['Success Stories', 'Blog', 'YouTube Tips', 'Creator Guide', 'Newsletter'],
  Company: ['About', 'Careers', 'Press', 'Contact', 'Affiliates'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ borderTop: '1px solid var(--color-navy-30)', paddingTop: 64, paddingBottom: 40, backgroundColor: 'var(--color-navy)' }}>
      <div className="container">
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              <ArgusLogoMark size={26} />
              <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em' }}>ARGUS</span>
            </a>
            <p style={{ fontSize: 14, color: 'var(--color-gray-10)', lineHeight: 1.8, maxWidth: 260, marginBottom: 24 }}>
              The analytics platform built for YouTube creators. Know your data. Grow your channel.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--color-gray-10)' }}>✉️ hello@argus.io</span>
            </div>
            {/* Social links */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href="#"
                  style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--color-navy-20)', border: '1px solid var(--color-navy-30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: 'var(--color-gray-10)', transition: 'border-color 0.15s, color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-navy-50)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-navy-30)'; e.currentTarget.style.color = 'var(--color-gray-10)' }}
                  title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-navy-50)', marginBottom: 20 }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#"
                      style={{ fontSize: 14, color: 'var(--color-gray-10)', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gray-10)'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: 32 }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--color-navy-50)' }}>
            © {year} Argus. All rights reserved.
          </p>

          {/* Product Hunt / rating badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid var(--color-navy-30)', borderRadius: 8 }}>
            <span style={{ fontSize: 14 }}>⭐</span>
            <span style={{ fontSize: 11, color: 'var(--color-navy-50)', letterSpacing: '0.04em' }}>4.9 / 5 · 1,200+ reviews</span>
          </div>

          <p style={{ fontSize: 12, color: 'var(--color-navy-50)' }}>
            Made for creators, by creators.
          </p>
        </div>
      </div>
    </footer>
  )
}

const SOCIALS = [
  { label: 'Twitter / X', icon: '𝕏' },
  { label: 'YouTube', icon: '▶' },
  { label: 'LinkedIn', icon: 'in' },
  { label: 'Discord', icon: '◈' },
]
