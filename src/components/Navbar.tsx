import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <span className="logo-text"><span className="text-gradient">Hack</span>Flow</span>
          </Link>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          <NavLink to="/organizers" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Organizers</NavLink>
          <NavLink to="/participants" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Participants</NavLink>
          <NavLink to="/judging" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Judging</NavLink>
          <NavLink to="/roles-tasks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Roles</NavLink>
          <NavLink to="/support" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Support</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Agency</NavLink>
        </div>

        {/* Desktop actions */}
        <div className="nav-actions">
          <Link to="/support" className="btn-secondary nav-btn">Sign In</Link>
          <Link to="/organizers" className="btn-primary nav-btn">Get Started</Link>
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mobile-drawer-links">
              <NavLink to="/dashboard" className="mobile-drawer-link" onClick={closeMenu}>
                Dashboard
              </NavLink>
              <NavLink to="/organizers" className="mobile-drawer-link" onClick={closeMenu}>
                Organizers
              </NavLink>
              <NavLink to="/participants" className="mobile-drawer-link" onClick={closeMenu}>
                Participants
              </NavLink>
              <NavLink to="/judging" className="mobile-drawer-link" onClick={closeMenu}>
                Judging
              </NavLink>
              <NavLink to="/roles-tasks" className="mobile-drawer-link" onClick={closeMenu}>
                Roles & Tasks
              </NavLink>
              <NavLink to="/support" className="mobile-drawer-link" onClick={closeMenu}>
                Support
              </NavLink>
              <NavLink to="/about" className="mobile-drawer-link" onClick={closeMenu}>
                About Agency
              </NavLink>
            </div>
            
            <div className="mobile-drawer-actions">
              <Link to="/support" className="btn-secondary mobile-action-btn" onClick={closeMenu}>Sign In</Link>
              <Link to="/organizers" className="btn-primary mobile-action-btn" onClick={closeMenu}>
                <span>Get Started</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
