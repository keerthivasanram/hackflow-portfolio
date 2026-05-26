import { Link } from 'react-router-dom'
import { Globe, Mail, MessageSquare } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top-line" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo-link">
             <span className="footer__name"><span className="text-gradient">Hack</span>Flow</span>
          </Link>
          <p className="footer__tagline">
            The complete hackathon management platform — built by SparkInventive.
          </p>
          <div className="footer__social">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Email"><Mail size={18} /></a>
            <a href="#" aria-label="Chat"><MessageSquare size={18} /></a>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <div className="footer__col">
            <h5>Product</h5>
            <Link to="/dashboard" className="footer__link">Dashboard</Link>
            <Link to="/organizers" className="footer__link">Organizers</Link>
            <Link to="/participants" className="footer__link">Participants</Link>
            <Link to="/judging" className="footer__link">Judging</Link>
            <Link to="/roles-tasks" className="footer__link">Roles & Tasks</Link>
          </div>
          <div className="footer__col">
            <h5>Resources</h5>
            <Link to="/support" className="footer__link">Support</Link>
            <Link to="/" className="footer__link">Documentation</Link>
            <Link to="/" className="footer__link">API Reference</Link>
          </div>
          <div className="footer__col">
            <h5>Company</h5>
            <Link to="/about" className="footer__link">About Us</Link>
            <Link to="/" className="footer__link">Privacy Policy</Link>
            <Link to="/support" className="footer__link">Contact</Link>
          </div>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span className="footer__copy">
          &copy; {new Date().getFullYear()} HackFlow. All rights reserved.
        </span>
        <span className="footer__built text-gradient">
          Built by SparkInventive
        </span>
      </div>
    </footer>
  )
}
