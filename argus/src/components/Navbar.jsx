import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s',
          backgroundColor: scrolled ? 'rgba(10,14,26,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(30,38,64,0.8)' : '1px solid transparent',
        }}
      >
        <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <ArgusLogoMark size={30} />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: '#fff' }}>
              ARGUS
            </span>
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="nav-link"
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}>
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="desktop-nav">
            <a href="#" style={{ fontSize: 14, color: 'var(--color-gray-10)', transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-gray-10)'}>
              Sign in
            </a>
            <a href="#pricing" className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}
              onClick={(e) => { e.preventDefault(); handleNav('#pricing') }}>
              Start free
              <ArrowIcon />
            </a>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}
            aria-label="Toggle menu">
            <span style={{ display: 'block', width: 24, height: 1.5, background: '#fff', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : '' }} />
            <span style={{ display: 'block', width: 24, height: 1.5, background: '#fff', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 1.5, background: '#fff', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '' }} />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ArgusLogoMark size={26} />
              <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>ARGUS</span>
            </div>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 28, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--color-gray-10)', padding: '12px 0', borderBottom: '1px solid var(--color-navy-30)', transition: 'color 0.15s' }}>
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingBottom: 24 }}>
            <a href="#pricing" className="btn-primary"
              onClick={(e) => { e.preventDefault(); handleNav('#pricing') }}
              style={{ width: '100%', justifyContent: 'center' }}>
              Start free — forever
              <ArrowIcon />
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export function ArgusLogoMark({ size = 32 }) {
  const uid = `al-${size}`
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* Outer A triangle */}
      <polygon points="16,2 30,29 2,29" fill={`url(#${uid})`} />
      {/* Inner cutout */}
      <polygon points="16,9 24,26 8,26" fill="#0a0e1a" />
      {/* Analytics dot / eye pupil */}
      <circle cx="16" cy="20" r="2.8" fill={`url(#${uid})`} />
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
