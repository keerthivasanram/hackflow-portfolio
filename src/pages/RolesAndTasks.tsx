import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCog, Shield, CheckSquare, GripVertical, Plus, Trash2, CheckCircle2 } from 'lucide-react'
import './RolesAndTasks.css'

const ROLES = [
  { id: 'lead-judge', label: 'Lead Judge', color: '#6366f1' },
  { id: 'organizer', label: 'Organizer', color: '#10b981' },
  { id: 'mentor', label: 'Mentor', color: '#f59e0b' },
  { id: 'volunteer', label: 'Volunteer', color: '#ec4899' },
]

const MEMBERS = [
  { id: 1, name: 'Alex', roleId: 'lead-judge' },
  { id: 2, name: 'Sarah', roleId: 'organizer' },
  { id: 3, name: 'Mike', roleId: 'mentor' },
  { id: 4, name: 'Jordan', roleId: 'volunteer' },
]

export default function RolesAndTasks() {
  const [members, setMembers] = useState(MEMBERS)
  const [selectedRole, setSelectedRole] = useState('lead-judge')
  const [saved, setSaved] = useState(false)
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review sponsor deck', assignee: 'Sarah', status: 'todo' },
    { id: 2, title: 'Setup judging rubrics', assignee: 'Mike', status: 'todo' },
    { id: 3, title: 'Email accepted teams', assignee: 'Alex', status: 'inprogress' },
    { id: 4, title: 'Design event banner', assignee: 'Jordan', status: 'inprogress' },
    { id: 5, title: 'Publish landing page', assignee: 'Alex', status: 'done' },
  ])
  const [newTask, setNewTask] = useState('')
  const [newAssignee, setNewAssignee] = useState('Alex')

  const roleColors: Record<string, string> = Object.fromEntries(ROLES.map(r => [r.id, r.color]))

  const assignRole = (memberId: number, roleId: string) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, roleId } : m))
  }

  const moveTask = (taskId: number, newStatus: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
  }

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(prev => [...prev, { id: Date.now(), title: newTask, assignee: newAssignee, status: 'todo' }])
    setNewTask('')
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tasksByStatus = (status: string) => tasks.filter(t => t.status === status)

  return (
    <div className="page-container roles-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-gradient">Roles & Tasks</h1>
        <p>Granular access control and intuitive task management. Assign the right jobs to the right people.</p>
      </motion.div>

      <div className="virtual-ui-container roles-grid">
        {/* Role Assignment Panel */}
        <motion.div
          className="glass-panel role-builder"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3><Shield size={20} /> Role Assignment</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            Click a member to reassign their role
          </p>

          <div className="member-list">
            {members.map((m, i) => {
              const role = ROLES.find(r => r.id === m.roleId)
              return (
                <motion.div
                  key={m.id}
                  className="member-row"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="member-info">
                    <div className="avatar-small" style={{ background: role?.color }} />
                    <span className="member-name">{m.name}</span>
                  </div>
                  <select
                    className="role-select"
                    value={m.roleId}
                    onChange={e => assignRole(m.id, e.target.value)}
                    style={{ borderColor: role?.color }}
                  >
                    {ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </motion.div>
              )
            })}
          </div>

          <div className="permission-section">
            <h4 style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Permissions for: <span style={{ color: ROLES.find(r => r.id === selectedRole)?.color }}>{ROLES.find(r => r.id === selectedRole)?.label}</span>
            </h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {ROLES.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  style={{
                    padding: '4px 12px', borderRadius: '20px', border: `1px solid ${r.color}`,
                    background: selectedRole === r.id ? r.color : 'transparent',
                    color: selectedRole === r.id ? 'white' : r.color,
                    cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s'
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="permissions-list">
              <PermissionToggle label="View Submissions" initialActive={selectedRole !== 'volunteer'} key={selectedRole + 'a'} delay={0} />
              <PermissionToggle label="Submit Scores" initialActive={selectedRole === 'lead-judge'} key={selectedRole + 'b'} delay={0.05} />
              <PermissionToggle label="Manage Members" initialActive={selectedRole === 'lead-judge' || selectedRole === 'organizer'} key={selectedRole + 'c'} delay={0.1} />
              <PermissionToggle label="Edit Event Rules" initialActive={selectedRole === 'organizer'} key={selectedRole + 'd'} delay={0.15} />
              <PermissionToggle label="Access Analytics" initialActive={selectedRole === 'organizer' || selectedRole === 'lead-judge'} key={selectedRole + 'e'} delay={0.2} />
            </div>
          </div>

          <motion.button
            className="btn-primary w-full"
            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px', background: saved ? '#10b981' : '' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
          >
            {saved ? <><CheckCircle2 size={18} /> Saved!</> : <><UserCog size={18} /> Save Role Config</>}
          </motion.button>
        </motion.div>

        {/* Kanban Board */}
        <motion.div
          className="glass-panel kanban-board"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3><CheckSquare size={20} /> Task Board</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                placeholder="New task..."
                style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '0.85rem', width: '160px' }}
              />
              <select
                value={newAssignee}
                onChange={e => setNewAssignee(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '0.85rem' }}
              >
                {members.map(m => <option key={m.id}>{m.name}</option>)}
              </select>
              <button onClick={addTask} className="btn-primary" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <div className="kanban-columns">
            {[
              { id: 'todo', label: 'To Do', color: '#6366f1' },
              { id: 'inprogress', label: 'In Progress', color: '#f59e0b' },
              { id: 'done', label: 'Done', color: '#10b981' },
            ].map(col => (
              <div className="kanban-col" key={col.id}>
                <h4 style={{ color: col.color }}>{col.label} <span style={{ background: col.color + '22', color: col.color, borderRadius: '10px', padding: '2px 8px', fontSize: '0.8rem' }}>{tasksByStatus(col.id).length}</span></h4>
                <AnimatePresence>
                  {tasksByStatus(col.id).map(task => (
                    <motion.div
                      key={task.id}
                      className="task-card"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      drag="y"
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={0.5}
                      whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                    >
                      <div className="task-drag-handle"><GripVertical size={14} /></div>
                      <div className="task-content">
                        <div className="task-title">{task.title}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                          <div className="task-assignee" style={{ color: roleColors[members.find(m => m.name === task.assignee)?.roleId || ''] || 'var(--text-secondary)' }}>
                            <div className="avatar-small" style={{ background: roleColors[members.find(m => m.name === task.assignee)?.roleId || ''] }} /> {task.assignee}
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {col.id !== 'todo' && <button onClick={() => moveTask(task.id, col.id === 'inprogress' ? 'todo' : 'inprogress')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.7rem' }}>←</button>}
                            {col.id !== 'done' && <button onClick={() => moveTask(task.id, col.id === 'todo' ? 'inprogress' : 'done')} style={{ background: 'none', border: 'none', color: col.color, cursor: 'pointer', fontSize: '0.7rem' }}>→</button>}
                            <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function PermissionToggle({ label, initialActive, delay }: any) {
  const [active, setActive] = useState(initialActive)
  return (
    <motion.div
      className="permission-row"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={() => setActive(!active)}
      style={{ cursor: 'pointer' }}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
    >
      <span>{label}</span>
      <div className={`toggle-switch ${active ? 'active' : ''}`}>
        <motion.div
          className="toggle-knob"
          initial={false}
          animate={{ x: active ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </motion.div>
  )
}
