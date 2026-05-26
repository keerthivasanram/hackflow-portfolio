import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X } from 'lucide-react'
import './PageExplainer.css'

const routeExplanations: Record<string, string> = {
  '/': "Hi! I'm your AI guide. This is the Home portal. HackFlow provides a unified ecosystem for Organizers, Participants, and Judges. Feel free to explore the features from the top navigation menu!",
  '/dashboard': "You are viewing the Master Dashboard. Here, admins get bird's-eye visibility over the entire platform, including live activity feeds and real-time registration analytics.",
  '/organizers': "Welcome to the Organizers portal. This simulates how event managers can rapidly spin up a new hackathon, configuring dates, themes, and automated announcements.",
  '/participants': "This is the Participants view. It showcases how developers seamlessly form teams and upload project submissions using our drag-and-drop interface.",
  '/judging': "You're in the Judging panel. Our real-time leaderboard syncs instantly, and judges evaluate submissions using multi-dimensional criteria sliders.",
  '/roles-tasks': "This is Roles & Tasks. We provide enterprise-grade permission management and an interactive Kanban board for delegating workflows. Try dragging the tasks!",
  '/support': "Welcome to Support. This split-screen UI handles the ticketing queue and live chat resolution, ensuring users get immediate help."
}

export default function PageExplainer() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [fullText, setFullText] = useState("");

  useEffect(() => {
    const message = routeExplanations[location.pathname];
    if (message) {
      setIsOpen(true);
      setFullText(message);
      setDisplayText("");
      
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(message.slice(0, i));
        i++;
        if (i > message.length) {
          clearInterval(interval);
        }
      }, 30);
      
      return () => clearInterval(interval);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="explainer-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="explainer-box glass-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <div className="explainer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={18} color="var(--accent-primary)" />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>AI Guide</span>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="explainer-body">
              {displayText}
              {displayText.length < fullText.length && <span className="cursor">|</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
