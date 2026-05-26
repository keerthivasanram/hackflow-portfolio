import { motion } from 'framer-motion'
import { ArrowRight, Users, Zap, Trophy, BarChart2, Shield, Headphones, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Home.css'

const FEATURES = [
  { icon: BarChart2, title: 'Master Dashboard', desc: 'Real-time KPIs, live activity feeds, and data filters at your fingertips.', link: '/dashboard', color: '#6366f1' },
  { icon: Zap, title: 'For Organizers', desc: 'Launch hackathons instantly. Configure rules, dates, and publish to the world.', link: '/organizers', color: '#f59e0b' },
  { icon: Users, title: 'For Participants', desc: 'Form teams, invite collaborators, and submit projects with a drag-and-drop uploader.', link: '/participants', color: '#3b82f6' },
  { icon: Trophy, title: 'Judging System', desc: 'Multi-criteria scoring with a live leaderboard that updates in real time.', link: '/judging', color: '#10b981' },
  { icon: Shield, title: 'Roles & Tasks', desc: 'Granular permission controls and an interactive Kanban task board.', link: '/roles-tasks', color: '#a855f7' },
  { icon: Headphones, title: 'World-Class Support', desc: 'Built-in helpdesk with live chat, ticket management, and priority triage.', link: '/support', color: '#ec4899' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Sparkles size={14} /> HackFlow Platform v1.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Empower the Next Generation<br />of <span className="text-gradient">Innovation</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The complete hackathon management platform — from team formation and live scoring to role-based access and world-class support. All in one place.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link to="/organizers" className="btn-primary">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              View Dashboard
            </Link>
          </motion.div>

          {/* Floating notification cards */}
          <div className="hero-float-group">
            <motion.div
              className="hero-float-card glass-panel fc-1"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Trophy size={18} color="gold" />
              <span>Leaderboard Updated</span>
            </motion.div>
            <motion.div
              className="hero-float-card glass-panel fc-2"
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Users size={18} color="#a855f7" />
              <span>48 Teams Registered</span>
            </motion.div>
            <motion.div
              className="hero-float-card glass-panel fc-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <Zap size={18} color="#ec4899" />
              <span>Event Live!</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="hero-fade" />
      </section>

      {/* ── TECH MARQUEE ─────────────────────── */}
      <section className="marquee-section">
        <p className="marquee-label">BUILT ON THE MODERN WEB STACK</p>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(2)].map((_, gi) => (
              ['Next.js', 'Node.js', 'PostgreSQL', 'Clerk Auth', 'TypeScript', 'Prisma ORM', 'Redis', 'Stripe'].map((t, i) => (
                <span key={`${gi}-${i}`} className="marquee-item">{t}</span>
              ))
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────── */}
      <section className="home-features">
        <div className="home-features-header">
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >PLATFORM MODULES</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything you need to run<br /><span className="text-gradient">world-class hackathons</span>
          </motion.h2>
          <motion.p
            className="section-desc"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Six powerful modules — each interactive, each production-ready.
          </motion.p>
        </div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {FEATURES.map(f => (
            <motion.div key={f.link} variants={cardVariants}>
              <Link to={f.link} className="feature-card glass-panel">
                <div className="feature-icon-wrap" style={{ background: f.color + '18', borderColor: f.color + '30' }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="feature-cta" style={{ color: f.color }}>
                  Explore <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────── */}
      <section className="home-bottom-cta">
        <motion.div
          className="cta-card glass-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Ready to run your next hackathon?</h2>
          <p>Join thousands of organizers and builders using HackFlow to ship amazing events.</p>
          <div className="cta-actions">
            <Link to="/organizers" className="btn-primary">Start for Free <ArrowRight size={16} /></Link>
            <Link to="/about" className="btn-secondary">About SparkInventive</Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
