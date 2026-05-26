import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, Upload, ShieldCheck, FileCode2, FileVideo } from 'lucide-react'
import './Participants.css'

export default function Participants() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  return (
    <div className="page-container">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-gradient">For Participants</h1>
        <p>Form your dream team, collaborate securely, and submit your project before the clock runs out.</p>
      </motion.div>

      <div className="virtual-ui-container reversed">
        <div style={{ position: 'relative', width: '100%' }}>
          <motion.div 
            className="virtual-dashboard glass-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Project Submission</h2>
            <div className="mock-upload-zone" style={{ position: 'relative', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {!uploadComplete ? (
                <>
                  <Upload size={48} color="var(--accent-secondary)" />
                  <p>Drag and drop your project files here</p>
                  
                  <motion.div 
                    className="mock-progress-bar"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    onAnimationComplete={() => setUploadComplete(true)}
                    style={{ position: 'absolute', bottom: 0, left: 0 }}
                  />
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
                >
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <FileCode2 size={48} color="#10b981" />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>source.zip</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <FileVideo size={48} color="#6366f1" />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>demo.mp4</span>
                    </div>
                  </div>
                  <motion.p className="success-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} /> Securely Locked & Submitted!
                  </motion.p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <div style={{ position: 'relative' }}>
          <motion.div 
            className="virtual-sidebar glass-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Your Team</h3>
            <div className="mock-team-member"><div className="avatar bg-1"></div> Alex (You)</div>
            <motion.div className="mock-team-member" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="avatar bg-2"></div> Sam
            </motion.div>
            <motion.div className="mock-team-member" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="avatar bg-3"></div> Jordan
            </motion.div>
            
            <button className="btn-secondary add-member-btn" onClick={() => setShowInviteModal(!showInviteModal)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', marginTop: '16px' }}>
              <UserPlus size={16} /> Invite
            </button>

            <AnimatePresence>
              {showInviteModal && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input type="email" placeholder="coder@email.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                    <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: '0.9rem' }}>Send Invite</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
