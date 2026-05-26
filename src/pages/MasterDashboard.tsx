import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Users, Globe, Zap, ArrowUpRight, RefreshCw } from 'lucide-react'
import './MasterDashboard.css'

export default function MasterDashboard() {
  const [chartData, setChartData] = useState([40, 60, 30, 80, 50, 90, 100]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('7D');

  const refreshData = (filter: string = activeFilter) => {
    if (filter !== activeFilter) setActiveFilter(filter);
    setIsRefreshing(true);
    setChartData(chartData.map(() => Math.floor(Math.random() * 80) + 20));
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="page-container dashboard-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-gradient">Master Dashboard</h1>
        <p>Global oversight of your entire hackathon ecosystem. Monitor health, activity, and analytics in real-time.</p>
      </motion.div>

      <div className="dashboard-grid">
        {/* KPI Cards */}
        <div className="kpi-row" onClick={() => refreshData()} style={{ cursor: 'pointer' }} title="Click to refresh data">
          <KpiCard title="Active Users" value="12,482" icon={<Users />} trend="+14%" delay={0.1} />
          <KpiCard title="Live Events" value="48" icon={<Globe />} trend="+2" delay={0.2} />
          <KpiCard title="System Load" value="24%" icon={<Activity />} trend="-5%" delay={0.3} />
          <KpiCard title="API Requests" value="1.2M/s" icon={<Zap />} trend="+18%" delay={0.4} />
        </div>

        {/* Charts Section */}
        <div className="charts-row">
          <motion.div 
            className="chart-panel glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: '16px' }}>
              <h3 style={{ margin: 0 }}>Registrations Over Time</h3>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  {['24H', '7D', '30D'].map(f => (
                    <button 
                      key={f} 
                      onClick={() => refreshData(f)}
                      style={{ 
                        background: activeFilter === f ? 'var(--accent-primary)' : 'transparent', 
                        color: activeFilter === f ? 'white' : 'var(--text-secondary)',
                        border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.5 }}>
                  <RefreshCw size={18} color="var(--text-secondary)" />
                </motion.div>
              </div>
            </div>
            <div className="mock-bar-chart">
              {chartData.map((h, i) => (
                <motion.div 
                  key={i}
                  className="bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="feed-panel glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>Live Activity Feed</h3>
            <div className="feed-list">
              <FeedItem text="New team created: DataNinjas" time="Just now" />
              <FeedItem text="Submission received: AI Model X" time="2m ago" />
              <FeedItem text="Judge finalized scoring for Team Alpha" time="5m ago" />
              <FeedItem text="Event 'Global Hack 2026' published" time="15m ago" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ title, value, icon, trend, delay }: any) {
  return (
    <motion.div 
      className="kpi-card glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.15)" }}
    >
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <span className="kpi-icon">{icon}</span>
      </div>
      <div className="kpi-body">
        <span className="kpi-value">{value}</span>
        <span className="kpi-trend"><ArrowUpRight size={16} /> {trend}</span>
      </div>
    </motion.div>
  )
}

function FeedItem({ text, time }: any) {
  return (
    <div className="feed-item">
      <div className="feed-dot" />
      <div className="feed-content">
        <span className="feed-text">{text}</span>
        <span className="feed-time">{time}</span>
      </div>
    </div>
  )
}
