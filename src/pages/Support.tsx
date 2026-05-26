import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, Send, CheckCircle2, Plus, Clock, AlertCircle } from 'lucide-react'
import './Support.css'

const INITIAL_TICKETS = [
  { id: 1, title: 'Unable to upload ZIP file', status: 'open', user: 'Alice', priority: 'high', time: '2m ago' },
  { id: 2, title: 'Judging criteria clarification', status: 'pending', user: 'Bob', priority: 'medium', time: '15m ago' },
  { id: 3, title: 'Update team name', status: 'resolved', user: 'Charlie', priority: 'low', time: '1h ago' },
  { id: 4, title: 'Payment not processed', status: 'open', user: 'Diana', priority: 'high', time: '5m ago' },
]

const CHAT_HISTORY: Record<number, { id: number; type: string; text: string }[]> = {
  1: [
    { id: 1, type: 'received', text: "Hi, I'm trying to upload my project but it says the ZIP is too large." },
    { id: 2, type: 'sent', text: "Hello! The max file size is 50MB. Can you try compressing it or link a GitHub repo?" },
  ],
  2: [
    { id: 1, type: 'received', text: "Can you clarify how innovation is scored vs. technical complexity?" },
    { id: 2, type: 'sent', text: "Great question! Innovation is weighted at 40% and technical complexity at 30%. Judges use our rubric form." },
  ],
  3: [
    { id: 1, type: 'received', text: "I need to update our team name to 'DataWeavers Pro'." },
    { id: 2, type: 'sent', text: "Done! Your team name has been updated. Good luck in the hackathon!" },
  ],
  4: [
    { id: 1, type: 'received', text: "I registered but my payment didn't go through. I got an error code 503." },
  ],
}

export default function Support() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS)
  const [activeTicketId, setActiveTicketId] = useState(1)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [allMessages, setAllMessages] = useState(CHAT_HISTORY)
  const [filterStatus, setFilterStatus] = useState('all')
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [newTicketTitle, setNewTicketTitle] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages, isTyping, activeTicketId])

  const messages = allMessages[activeTicketId] || []
  const activeTicket = tickets.find(t => t.id === activeTicketId)

  const handleSend = () => {
    if (!inputValue.trim()) return
    const newMsg = { id: Date.now(), type: 'sent', text: inputValue }
    setAllMessages(prev => ({ ...prev, [activeTicketId]: [...(prev[activeTicketId] || []), newMsg] }))
    setInputValue('')
    setIsTyping(true)
    setTimeout(() => {
      const replies = [
        "Thanks for the update! I'll look into that right away.",
        "Got it! Our team is on it — expect a fix within the hour.",
        "Understood. Can you share your registered email for verification?",
        "I've escalated this to our technical team. Apologies for the inconvenience.",
      ]
      const reply = { id: Date.now() + 1, type: 'received', text: replies[Math.floor(Math.random() * replies.length)] }
      setAllMessages(prev => ({ ...prev, [activeTicketId]: [...(prev[activeTicketId] || []), reply] }))
      setIsTyping(false)
    }, 2000)
  }

  const resolveTicket = (id: number) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t))
  }

  const addTicket = () => {
    if (!newTicketTitle.trim()) return
    const id = Date.now()
    setTickets(prev => [...prev, { id, title: newTicketTitle, status: 'open', user: 'You', priority: 'medium', time: 'just now' }])
    setAllMessages(prev => ({ ...prev, [id]: [] }))
    setNewTicketTitle('')
    setShowNewTicket(false)
    setActiveTicketId(id)
  }

  const filtered = tickets.filter(t => filterStatus === 'all' || t.status === filterStatus)

  return (
    <div className="page-container support-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-gradient">World-Class Support</h1>
        <p>Built-in helpdesk and live chat — resolve participant and organizer issues instantly.</p>
      </motion.div>

      <div className="virtual-ui-container support-grid">
        {/* Ticket Queue */}
        <motion.div
          className="glass-panel ticket-queue"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3><Ticket size={20} /> Tickets</h3>
            <button
              className="btn-primary"
              onClick={() => setShowNewTicket(!showNewTicket)}
              style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Plus size={14} /> New
            </button>
          </div>

          <AnimatePresence>
            {showNewTicket && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden', marginBottom: '12px' }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    value={newTicketTitle}
                    onChange={e => setNewTicketTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTicket()}
                    placeholder="Describe the issue..."
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.4)', color: 'white', fontSize: '0.85rem' }}
                    autoFocus
                  />
                  <button onClick={addTicket} className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>Submit</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
            {['all', 'open', 'pending', 'resolved'].map(f => (
              <button key={f} onClick={() => setFilterStatus(f)} style={{
                padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                border: '1px solid var(--border-glass)', cursor: 'pointer', textTransform: 'capitalize',
                background: filterStatus === f ? 'var(--accent-primary)' : 'transparent',
                color: filterStatus === f ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s'
              }}>
                {f}
              </button>
            ))}
          </div>

          <div className="ticket-list">
            <AnimatePresence>
              {filtered.map(t => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => setActiveTicketId(t.id)}
                  className={`ticket-item ${activeTicketId === t.id ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div className="ticket-title">{t.title}</div>
                    {t.priority === 'high' && <AlertCircle size={14} color="#ef4444" style={{ flexShrink: 0 }} />}
                  </div>
                  <div className="ticket-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} /> {t.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className={`status-badge ${t.status}`}>{t.status}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Live Chat Panel */}
        <motion.div
          className="glass-panel live-chat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="chat-header">
            <div className="chat-user">
              <div className="avatar bg-1" />
              <div>
                <div className="chat-name">{activeTicket?.user || 'User'}</div>
                <div className="chat-status">{activeTicket?.status === 'resolved' ? '✓ Resolved' : '● Online'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className={`status-badge ${activeTicket?.priority}`} style={{ fontSize: '0.75rem' }}>{activeTicket?.priority} priority</span>
              {activeTicket?.status !== 'resolved' && (
                <motion.button
                  className="resolve-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => resolveTicket(activeTicketId)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CheckCircle2 size={14} /> Resolve
                </motion.button>
              )}
            </div>
          </div>

          <div className="ticket-context">
            <strong>Issue:</strong> {activeTicket?.title}
          </div>

          <div className="chat-body" style={{ overflowY: 'auto' }}>
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px', fontSize: '0.9rem' }}>
                  No messages yet. Start the conversation.
                </motion.p>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  className={`chat-bubble ${msg.type}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i === messages.length - 1 ? 0 : 0 }}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  className="chat-bubble received typing-bubble"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder={activeTicket?.status === 'resolved' ? 'Ticket resolved' : 'Type a reply...'}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={activeTicket?.status === 'resolved'}
            />
            <motion.button
              className="send-btn"
              onClick={handleSend}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={activeTicket?.status === 'resolved'}
            >
              <Send size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
