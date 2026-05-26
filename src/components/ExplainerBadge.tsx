import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'
import './ExplainerBadge.css'

interface ExplainerBadgeProps {
  step: string;
  text: string;
  delay: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function ExplainerBadge({ step, text, delay, position = 'right' }: ExplainerBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`explainer-badge ${position}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <div className="badge-step">{step}</div>
          <div className="badge-text">{text}</div>
          <div className="badge-pulse"><Info size={14} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
