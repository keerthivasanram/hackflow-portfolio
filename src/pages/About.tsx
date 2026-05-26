import { motion } from 'framer-motion'
import { Code, Cloud, Cpu, Sparkles, Terminal, Rocket } from 'lucide-react'
import './About.css'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="page-container about-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="agency-badge">
          <Sparkles size={16} /> SparkInventive
        </div>
        <h1 className="text-gradient">We Engineer Digital Excellence</h1>
        <p>With 3+ years of expertise in Web Development, Custom Software, SaaS Products, AI, and Automation Services.</p>
      </motion.div>

      <motion.div 
        className="bento-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="bento-card col-span-2 glass-panel" variants={itemVariants}>
          <div className="card-icon"><Code size={32} /></div>
          <h3>Web & Custom Software</h3>
          <p>We build highly scalable, performant, and beautifully designed web applications tailored to enterprise needs. From complex dashboards to lightning-fast landing pages.</p>
        </motion.div>
        
        <motion.div className="bento-card glass-panel" variants={itemVariants}>
          <div className="card-icon"><Cloud size={32} /></div>
          <h3>SaaS Products</h3>
          <p>End-to-end SaaS development, focusing on multi-tenancy, subscription billing, and seamless user experiences.</p>
        </motion.div>

        <motion.div className="bento-card glass-panel" variants={itemVariants}>
          <div className="card-icon"><Cpu size={32} /></div>
          <h3>AI Integration</h3>
          <p>Supercharge your operations with intelligent agents, LLM integrations, and predictive machine learning models.</p>
        </motion.div>
        
        <motion.div className="bento-card col-span-2 glass-panel" variants={itemVariants}>
          <div className="card-icon"><Terminal size={32} /></div>
          <h3>Workflow Automation</h3>
          <p>Eliminate manual data entry and repetitive tasks. We design robust automation pipelines that save hundreds of hours, integrating your favorite tools seamlessly.</p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="experience-banner glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Rocket size={48} color="var(--accent-primary)" />
        <div className="banner-text">
          <h2>Ready to launch your next big idea?</h2>
          <p>Partner with SparkInventive and let's build something extraordinary together.</p>
        </div>
        <button className="btn-primary">Get in Touch</button>
      </motion.div>
    </div>
  )
}
