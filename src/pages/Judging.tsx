import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react'
import './Judging.css'

export default function Judging() {
  const [activeTeam, setActiveTeam] = useState('NeuroSync');
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");

  const teams = [
    { name: 'NeuroSync', scores: [10, 8, 9, 7, 9], rank: 1, trend: 'up' },
    { name: 'DataWeavers', scores: [9, 7, 8, 8, 8], rank: 2, trend: 'flat' },
    { name: 'QuantumLeap', scores: [8, 9, 7, 7, 8], rank: 3, trend: 'down' },
    { name: 'CodeCatalyst', scores: [7, 8, 9, 8, 7], rank: 4, trend: 'up' },
  ];

  const currentScores = teams.find(t => t.name === activeTeam)?.scores || [5,5,5,5,5];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-container">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-gradient">For Judges</h1>
        <p>Fair, transparent, and multi-dimensional evaluation with real-time dynamic leaderboards.</p>
      </motion.div>

      <div className="virtual-ui-container">
        <div style={{ position: 'relative', width: '100%' }}>
          <motion.div 
            className="virtual-dashboard glass-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Live Leaderboard</h2>
            <div className="mock-leaderboard">
              {teams.map((t, i) => (
                <motion.div 
                  key={t.name}
                  className={`lb-row ${t.rank === 1 ? 'gold' : t.rank === 2 ? 'silver' : t.rank === 3 ? 'bronze' : ''} ${activeTeam === t.name ? 'active-row' : ''}`}
                  onClick={() => setActiveTeam(t.name)}
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + (i * 0.1) }}
                  style={{ cursor: 'pointer', border: activeTeam === t.name ? '1px solid var(--accent-primary)' : '1px solid transparent' }}
                >
                  <div className="rank">
                    {t.rank === 1 ? <Trophy size={20} /> : t.rank} 
                    {t.trend === 'up' && <ChevronUp size={16} color="#10b981" />}
                    {t.trend === 'down' && <ChevronDown size={16} color="#ef4444" />}
                  </div>
                  <div className="team">{t.name}</div>
                  <div className="score">{((t.scores.reduce((a,b)=>a+b, 0) / 50) * 100).toFixed(1)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ position: 'relative' }}>
          <motion.div 
            className="virtual-sidebar glass-panel score-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Scoring: {activeTeam}</h3>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div key={activeTeam} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <ScoreSlider label="Innovation" initialScore={currentScores[0]} />
                <ScoreSlider label="Tech Complexity" initialScore={currentScores[1]} />
                <ScoreSlider label="UI/UX" initialScore={currentScores[2]} />
                <ScoreSlider label="Scalability" initialScore={currentScores[3]} />
                <ScoreSlider label="Presentation" initialScore={currentScores[4]} />
              </motion.div>
            </AnimatePresence>

            <textarea 
              className="mock-comment-box" 
              placeholder="Leave feedback for the team..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', marginTop: '16px', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', color: 'white', minHeight: '80px', resize: 'none', fontFamily: 'var(--font-body)' }}
            />

            <motion.button 
              className={`btn-primary w-full mt-4 ${submitted ? 'success' : ''}`}
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', background: submitted ? '#10b981' : '' }}
            >
              {submitted ? <><CheckCircle2 size={18} /> Score Saved!</> : "Submit Score"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ScoreSlider({ label, initialScore }: { label: string, initialScore: number }) {
  const [score, setScore] = useState(initialScore);
  
  return (
    <div className="mock-slider-group">
      <div className="slider-labels">
        <span>{label}</span>
        <span className="slider-val">{score}/10 <Star size={12} fill="gold" color="gold" /></span>
      </div>
      <div className="slider-track" style={{ position: 'relative' }}>
        <motion.div 
          className="slider-fill"
          initial={{ width: "0%" }}
          animate={{ width: `${(score/10)*100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <input 
          type="range" min="1" max="10" value={score} 
          onChange={(e) => setScore(parseInt(e.target.value))}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
        />
      </div>
    </div>
  )
}
