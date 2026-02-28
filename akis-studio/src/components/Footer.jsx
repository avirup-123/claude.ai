const FOOTER_LINKS = {
  Services: ['Branding & Identity', 'UX & UI Design', 'Web Development', 'E-Commerce', 'Maintenance'],
  Company: ['About', 'Work', 'Process', 'Blog', 'Careers'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--color-dark-20)', paddingTop: 64, paddingBottom: 40 }}>
      <div className="container">
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <LogoIcon />
              <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>
                AKIS<span style={{ color: 'var(--color-primary)' }}>.</span>STUDIO
              </span>
            </a>
            <p style={{ fontSize: 14, color: 'var(--color-gray-10)', lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Brussels-based branding & web agency. We craft identities and websites
              that reflect who you truly are — and that drive real results.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'var(--color-dark-40)' }}>📍</span>
              <span style={{ fontSize: 13, color: 'var(--color-gray-10)' }}>Avenue Louise — Ixelles, Brussels</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--color-dark-40)' }}>✉️</span>
              <a href="mailto:hello@akis.studio" style={{ fontSize: 13, color: 'var(--color-gray-10)', transition: 'color 0.15s' }}>
                hello@akis.studio
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-dark-40)', marginBottom: 20 }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ fontSize: 14, color: 'var(--color-gray-10)', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gray-10)'}
                    >
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
          <p style={{ fontSize: 13, color: 'var(--color-dark-40)' }}>
            © {year} AKIS.STUDIO. All rights reserved.
          </p>

          {/* Awwwards badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid var(--color-dark-20)', borderRadius: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--color-dark-40)' }}>🏆</span>
            <span style={{ fontSize: 11, color: 'var(--color-dark-40)', letterSpacing: '0.04em' }}>Awwwards Honorable Mention</span>
          </div>

          {/* Lang toggle */}
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href="#"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#fff',
                padding: '4px 10px',
                border: '1px solid var(--color-dark-30)',
                borderRadius: 6,
                background: 'var(--color-dark-10)',
              }}
            >
              EN
            </a>
            <a
              href="#"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--color-gray-10)',
                padding: '4px 10px',
                border: '1px solid var(--color-dark-20)',
                borderRadius: 6,
                transition: 'border-color 0.15s, color 0.15s',
              }}
            >
              FR
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function LogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#ed731a" />
      <path d="M7 20L14 8L21 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 16H18.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
