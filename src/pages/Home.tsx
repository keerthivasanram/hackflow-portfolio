import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Users, Zap, Trophy, BarChart2, Shield, Headphones, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Home.css'

const FEATURES = [
  { icon: BarChart2, title: 'Master Dashboard', desc: 'Real-time KPIs, live activity feeds, and data filters at your fingertips.', link: '/dashboard', color: '#5b6cff' },
  { icon: Zap, title: 'For Organizers', desc: 'Launch hackathons instantly. Configure rules, dates, and publish to the world.', link: '/organizers', color: '#ff2da0' },
  { icon: Users, title: 'For Participants', desc: 'Form teams, invite collaborators, and submit projects with a drag-and-drop uploader.', link: '/participants', color: '#9B2FFF' },
  { icon: Trophy, title: 'Judging System', desc: 'Multi-criteria scoring with a live leaderboard that updates in real time.', link: '/judging', color: '#22c55e' },
  { icon: Shield, title: 'Roles & Tasks', desc: 'Granular permission controls and an interactive Kanban task board.', link: '/roles-tasks', color: '#5b6cff' },
  { icon: Headphones, title: 'World-Class Support', desc: 'Built-in helpdesk with live chat, ticket management, and priority triage.', link: '/support', color: '#ff2da0' },
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
  const heroRef = useRef(null)
  const heroVisible = useInView(heroRef, { once: true, margin: '-15%' })

  return (
    <>
      {/* ── HERO (KRESAI DESIGN) ─────────────────────────────── */}
      <section className="hero" id="home" ref={heroRef}>
        <div className="hero__bg-glow hero__bg-glow--pink" />
        <div className="hero__bg-glow hero__bg-glow--purple" />

        <div className="hero__container hero__grid">
          {/* Left: Text */}
          <div className="hero__text">
            <div className={`section-label anim-fade-up stagger-1 ${heroVisible ? 'visible' : ''}`}>
              <Sparkles size={14} style={{ display: 'inline-block', marginRight: '6px' }} />
              HACKFLOW PLATFORM V1.0
            </div>

            <h1 className={`hero__heading anim-fade-up stagger-2 ${heroVisible ? 'visible' : ''}`}>
              Empower the Next Generation<br />
              <span className="text-gradient">of Innovation</span>
            </h1>

            <p className={`hero__subtext anim-fade-up stagger-3 ${heroVisible ? 'visible' : ''}`}>
              The complete hackathon management platform — from team formation and live scoring to role-based access and world-class support. All in one place.
            </p>

            <div className={`hero__cta anim-fade-up stagger-4 ${heroVisible ? 'visible' : ''}`}>
              <Link to="/organizers" className="btn-primary">
                Get Started
                <ArrowRight size={16} />
              </Link>
              <Link to="/dashboard" className="hero__link">
                View Dashboard
              </Link>
            </div>

            <div className={`hero__stats anim-fade-up stagger-5 ${heroVisible ? 'visible' : ''}`}>
              <div className="hero__stat">
                <span className="hero__stat-num text-gradient">100+</span>
                <span className="hero__stat-label">Hackathons</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-num text-gradient">50k+</span>
                <span className="hero__stat-label">Builders</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-num text-gradient">99%</span>
                <span className="hero__stat-label">Uptime</span>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className={`hero__visual anim-slide-right stagger-2 ${heroVisible ? 'visible' : ''}`}>
            <div className="hero__orb hero__orb--1" />
            <div className="hero__orb hero__orb--2" />
            <div className="hero__orb hero__orb--3" />

            <div className="hero__card hero__card--main glass-panel">
              <div className="hero__card-icon">
                <Trophy size={22} color="#facc15" />
              </div>
              <span className="hero__card-label">Leaderboard</span>
              <span className="hero__card-value text-gradient">Updated</span>
            </div>

            <div className="hero__card hero__card--secondary glass-panel">
              <div className="hero__card-dot" />
              <span className="hero__card-label">Event Status</span>
              <span className="hero__card-value text-gradient">Live</span>
            </div>

            <div className="hero__card hero__card--tertiary glass-panel">
              <span className="hero__card-label">Teams Registered</span>
              <div className="hero__progress">
                <div className="hero__progress-bar" />
              </div>
              <span className="hero__card-value text-gradient">48 / 50</span>
            </div>
          </div>
        </div>

        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
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
