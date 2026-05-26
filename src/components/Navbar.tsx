import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo">
          <Link to="/">
            <span className="logo-text"><span className="text-gradient">Hack</span>Flow</span>
          </Link>
        </div>

        <div className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          <NavLink to="/organizers" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Organizers</NavLink>
          <NavLink to="/participants" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Participants</NavLink>
          <NavLink to="/judging" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Judging</NavLink>
          <NavLink to="/roles-tasks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Roles</NavLink>
          <NavLink to="/support" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Support</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Agency</NavLink>
        </div>

        <div className="nav-actions">
          <Link to="/support" className="btn-secondary nav-btn">Sign In</Link>
          <Link to="/organizers" className="btn-primary nav-btn">Get Started</Link>
        </div>
      </div>
    </nav>
  )
}
