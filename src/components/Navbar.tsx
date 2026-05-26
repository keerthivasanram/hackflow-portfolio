import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Organizers', href: '/organizers' },
    { label: 'Participants', href: '/participants' },
    { label: 'Judging', href: '/judging' },
    { label: 'Roles', href: '/roles-tasks' },
    { label: 'Support', href: '/support' },
    { label: 'Agency', href: '/about' },
  ]

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-name">
            <span className="text-gradient">Hack</span>Flow
          </span>
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          {navLinks.map(link => (
            <NavLink key={link.href} to={link.href} className="navbar__link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link to="/support" className="btn-secondary nav-btn">Sign In</Link>
          <Link to="/organizers" className="btn-primary nav-btn">Get Started</Link>

          <button
            className={`navbar__hamburger ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__mobile ${isOpen ? 'open' : ''}`}>
        <nav className="navbar__mobile-nav">
          {navLinks.map(link => (
            <NavLink
              key={link.href}
              to={link.href}
              className="navbar__mobile-link"
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
