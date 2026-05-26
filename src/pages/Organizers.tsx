import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Settings, BarChart, CheckCircle2, Loader2 } from 'lucide-react'
import './Organizers.css'

export default function Organizers() {
  const [activeTab, setActiveTab] = useState('create');
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
    }, 1500);
  };

  return (
    <div className="page-container">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-gradient">For Organizers</h1>
        <p>Complete operational control. Launch events, manage participants, and monitor analytics in real-time.</p>
      </motion.div>

      <div className="virtual-ui-container">
        <div style={{ position: 'relative' }}>
          <motion.div 
            className="virtual-sidebar glass-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className={`sidebar-item ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')} style={{cursor: 'pointer'}}><Plus size={20} /> Create Hackathon</div>
            <div className={`sidebar-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')} style={{cursor: 'pointer'}}><BarChart size={20} /> Analytics</div>
            <div className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')} style={{cursor: 'pointer'}}><Settings size={20} /> Settings</div>
          </motion.div>
        </div>

        <div style={{ position: 'relative', width: '100%' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'create' && (
              <motion.div 
                key="create"
                className="virtual-dashboard glass-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <h2>Create New Hackathon</h2>
                <div className="mock-form">
                  <motion.div className="mock-input" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <span className="typing-text">Global AI Hackathon 2026</span>
                  </motion.div>
                  
                  <motion.div className="mock-textarea" initial={{ height: 40 }} animate={{ height: 120 }} transition={{ duration: 0.6, delay: 0.5 }}>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                      Build the future of artificial intelligence...
                    </motion.span>
                  </motion.div>
                  
                  <motion.div className="mock-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                    <div className="mock-select">Mar 15, 2026</div>
                    <div className="mock-select">Mar 17, 2026</div>
                  </motion.div>

                  <div style={{ position: 'relative', display: 'inline-block', marginTop: '16px' }}>
                    <motion.button 
                      className={`btn-primary mock-btn ${published ? 'success' : ''}`}
                      onClick={handlePublish}
                      disabled={isPublishing || published}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, boxShadow: published ? "0 0 20px #10b981" : "0 0 20px var(--accent-glow)" }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      {isPublishing ? <Loader2 className="spinner" size={18} /> : published ? <CheckCircle2 size={18} /> : null}
                      {isPublishing ? "Publishing..." : published ? "Event Live!" : "Publish Event"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab !== 'create' && (
               <motion.div 
                 key="other"
                 className="virtual-dashboard glass-panel flex-center"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px' }}
               >
                 <p style={{ color: 'var(--text-secondary)' }}>{activeTab === 'analytics' ? 'Analytics module mock data...' : 'Settings module configuration...'}</p>
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
