import { Link } from 'react-router-dom'
import { Globe, Mail, MessageSquare } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Top row */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="text-gradient">Hack</span>Flow
            </div>
            <p className="footer-tagline">
              The complete hackathon management platform — built by SparkInventive.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Website"><Globe size={18} /></a>
              <a href="#" aria-label="Email"><Mail size={18} /></a>
              <a href="#" aria-label="Chat"><MessageSquare size={18} /></a>
            </div>
          </div>

          <div className="footer-nav">
            <div className="footer-col">
              <h5>Product</h5>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/organizers">Organizers</Link>
              <Link to="/participants">Participants</Link>
              <Link to="/judging">Judging</Link>
              <Link to="/roles-tasks">Roles & Tasks</Link>
              <Link to="/support">Support</Link>
            </div>
            <div className="footer-col">
              <h5>Resources</h5>
              <Link to="/">Documentation</Link>
              <Link to="/">API Reference</Link>
              <Link to="/">Blog</Link>
              <Link to="/">Community</Link>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <Link to="/about">About Us</Link>
              <Link to="/">Careers</Link>
              <Link to="/">Privacy Policy</Link>
              <Link to="/support">Contact</Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="footer-bottom">
          <span>© 2026 HackFlow · Built by <span className="text-gradient">SparkInventive</span></span>
          <div className="footer-legal">
            <Link to="/">Terms</Link>
            <Link to="/">Privacy</Link>
            <Link to="/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
