import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
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
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
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
          backgroundColor: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
        }}
      >
        <nav
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <LogoIcon />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', color: '#fff' }}>
              AKIS<span style={{ color: 'var(--color-primary)' }}>.</span>STUDIO
            </span>
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Lang */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="desktop-nav">
            <a
              href="#"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-gray-10)',
                padding: '4px 10px',
                border: '1px solid var(--color-dark-20)',
                borderRadius: 6,
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              FR
            </a>
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: 14 }}
              onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
            >
              Book a call
              <ArrowIcon />
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'none',
              flexDirection: 'column',
              gap: 5,
            }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 24, height: 1.5, background: '#fff', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : '' }} />
            <span style={{ display: 'block', width: 24, height: 1.5, background: '#fff', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 1.5, background: '#fff', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '' }} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
            <a href="#" style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>
              AKIS<span style={{ color: 'var(--color-primary)' }}>.</span>STUDIO
            </a>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 28, lineHeight: 1 }}
            >
              ×
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                style={{
                  fontSize: 36,
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-gray-10)',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-dark-20)',
                  transition: 'color 0.15s',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingBottom: 24 }}>
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Book a discovery call
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

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#ed731a" />
      <path d="M7 20L14 8L21 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 16H18.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
