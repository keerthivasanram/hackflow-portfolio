import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, CheckSquare, Plus, Trash2, CheckCircle2, ChevronRight, UserCog, User, Key } from 'lucide-react'
import './RolesAndTasks.css'

const ROLES = [
  { id: 'lead-judge',  label: 'Lead Judge' },
  { id: 'organizer',  label: 'Organizer'  },
  { id: 'mentor',     label: 'Mentor'     },
  { id: 'volunteer',  label: 'Volunteer'  },
]

const PERMISSIONS = [
  { key: 'view',     label: 'View Submissions',  description: 'Can view participant project entries.' },
  { key: 'score',    label: 'Submit Scores',     description: 'Can assign multi-dimensional marks.' },
  { key: 'manage',   label: 'Manage Members',    description: 'Can invite or change user roles.' },
  { key: 'edit',     label: 'Edit Event Rules',  description: 'Can customize timeline and rubrics.' },
  { key: 'analytics',label: 'Access Analytics',  description: 'Can view registration and judging charts.' },
]

const ROLE_PERMISSIONS: Record<string, string[]> = {
  'lead-judge': ['view', 'score', 'manage', 'analytics'],
  'organizer':  ['view', 'manage', 'edit', 'analytics'],
  'mentor':     ['view'],
  'volunteer':  [],
}

const INITIAL_MEMBERS = [
  { id: 1, name: 'Alex Rivera',    roleId: 'lead-judge', email: 'alex@hackflow.dev' },
  { id: 2, name: 'Sarah Chen',     roleId: 'organizer',  email: 'sarah@hackflow.dev' },
  { id: 3, name: 'Mike Sterling',  roleId: 'mentor',     email: 'mike@hackflow.dev' },
  { id: 4, name: 'Jordan Vance',   roleId: 'volunteer',  email: 'jordan@hackflow.dev' },
]

const INITIAL_TASKS = [
  { id: 1, title: 'Review sponsor pitch decks',   assignee: 'Sarah Chen',    status: 'todo'       },
  { id: 2, title: 'Setup judging rubrics',        assignee: 'Mike Sterling', status: 'todo'       },
  { id: 3, title: 'Email accepted teams & guides', assignee: 'Alex Rivera',   status: 'inprogress' },
  { id: 4, title: 'Design event promotional banner', assignee: 'Jordan Vance',  status: 'inprogress' },
  { id: 5, title: 'Publish main landing page',    assignee: 'Alex Rivera',   status: 'done'       },
]

const COLUMNS = [
  { id: 'todo',       label: 'To Do'      },
  { id: 'inprogress', label: 'In Progress'},
  { id: 'done',       label: 'Done'       },
]

export default function RolesAndTasks() {
  const [activeTab, setActiveTab] = useState<'roles' | 'tasks'>('roles')
  const [members, setMembers]     = useState(INITIAL_MEMBERS)
  const [selectedRole, setSelectedRole] = useState('lead-judge')
  const [perms, setPerms]         = useState(ROLE_PERMISSIONS)
  const [saved, setSaved]         = useState(false)
  const [tasks, setTasks]         = useState(INITIAL_TASKS)
  const [newTask, setNewTask]     = useState('')
  const [newAssignee, setNewAssignee] = useState('Alex Rivera')

  /* ── handlers ── */
  const assignRole = (id: number, roleId: string) =>
    setMembers(p => p.map(m => m.id === id ? { ...m, roleId } : m))

  const togglePerm = (roleId: string, key: string) => {
    setPerms(p => {
      const cur = p[roleId] ?? []
      return { ...p, [roleId]: cur.includes(key) ? cur.filter(k => k !== key) : [...cur, key] }
    })
  }

  const hasPerm = (roleId: string, key: string) => (perms[roleId] ?? []).includes(key)

  const moveTask = (id: number, status: string) =>
    setTasks(p => p.map(t => t.id === id ? { ...t, status } : t))

  const deleteTask = (id: number) =>
    setTasks(p => p.filter(t => t.id !== id))

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(p => [...p, { id: Date.now(), title: newTask, assignee: newAssignee, status: 'todo' }])
    setNewTask('')
  }

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const tasksByStatus = (s: string) => tasks.filter(t => t.status === s)

  return (
    <div className="page-container roles-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      >
        <h1 className="text-gradient">Roles & Tasks</h1>
        <p>Manage team permissions and track work with a drag-and-drop task board.</p>
      </motion.div>

      {/* Segmented Tab Control */}
      <div className="segmented-control-wrapper">
        <div className="segmented-control">
          <button
            className={`control-btn ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            <Shield size={16} />
            <span>Role Manager</span>
            {activeTab === 'roles' && (
              <motion.div className="active-bg" layoutId="activeTabBg" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
          </button>
          <button
            className={`control-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <CheckSquare size={16} />
            <span>Task Board</span>
            {activeTab === 'tasks' && (
              <motion.div className="active-bg" layoutId="activeTabBg" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'roles' ? (
          <motion.div
            key="roles"
            className="rt-layout-container"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left side: Team Members Table */}
            <div className="roles-main-panel glass-panel">
              <div className="panel-header-section">
                <div className="panel-title">
                  <User size={18} className="title-icon" />
                  <h2>Team Members</h2>
                </div>
                <p className="panel-subtitle">Assign system roles and configure baseline authorization levels.</p>
              </div>

              <div className="clean-table-wrapper">
                <table className="clean-member-table">
                  <thead>
                    <tr>
                      <th className="th-name">Member</th>
                      <th className="th-email">Email</th>
                      <th className="th-role">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m, i) => (
                      <motion.tr
                        key={m.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <td className="td-name">
                          <div className="member-info">
                            <div className="member-avatar">{m.name.split(' ').map(n => n[0]).join('')}</div>
                            <span className="member-fullname">{m.name}</span>
                          </div>
                        </td>
                        <td className="td-email">{m.email}</td>
                        <td className="td-role">
                          <select
                            className="role-select"
                            value={m.roleId}
                            onChange={e => assignRole(m.id, e.target.value)}
                          >
                            {ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                          </select>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right side: Permissions Matrix */}
            <div className="roles-side-panel glass-panel">
              <div className="panel-header-section">
                <div className="panel-title">
                  <Key size={18} className="title-icon" />
                  <h2>Role Permissions</h2>
                </div>
                <p className="panel-subtitle">Select a role to configure granular platform feature flags.</p>
              </div>

              {/* Sub-tabs for role selection */}
              <div className="role-subtabs">
                {ROLES.map(r => (
                  <button
                    key={r.id}
                    className={`role-subtab-btn ${selectedRole === r.id ? 'active' : ''}`}
                    onClick={() => setSelectedRole(r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="permissions-matrix">
                {PERMISSIONS.map(p => {
                  const isEnabled = hasPerm(selectedRole, p.key)
                  return (
                    <div
                      key={p.key}
                      className={`permission-row-item ${isEnabled ? 'enabled' : 'disabled'}`}
                      onClick={() => togglePerm(selectedRole, p.key)}
                    >
                      <div className="permission-info-cell">
                        <span className="permission-name-label">{p.label}</span>
                        <span className="permission-desc-label">{p.description}</span>
                      </div>
                      <div className={`switch-toggle-outer ${isEnabled ? 'active' : ''}`}>
                        <motion.div
                          className="switch-toggle-knob"
                          animate={{ x: isEnabled ? 16 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="panel-action-footer">
                <motion.button
                  className={`btn-primary save-btn-full ${saved ? 'saved' : ''}`}
                  onClick={handleSave}
                  whileTap={{ scale: 0.98 }}
                >
                  {saved ? <><CheckCircle2 size={16} /> Configuration Saved</> : <><UserCog size={16} /> Save Changes</>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tasks"
            className="tasks-layout-container glass-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div className="panel-header-section padding-x-y">
              <div className="panel-title">
                <CheckSquare size={18} className="title-icon" />
                <h2>Task Board</h2>
              </div>
              <p className="panel-subtitle">Delegate tasks to team members and track sprint progress.</p>
            </div>

            {/* Quick Add Bar */}
            <div className="sprint-add-task-bar">
              <div className="input-group-field">
                <input
                  className="task-input-field"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTask()}
                  placeholder="What needs to be done? Enter task..."
                />
              </div>
              <div className="select-assignee-group">
                <label className="input-label-tag">Assignee:</label>
                <select
                  className="role-select"
                  value={newAssignee}
                  onChange={e => setNewAssignee(e.target.value)}
                >
                  {members.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                </select>
              </div>
              <button className="btn-primary sprint-add-btn" onClick={addTask}>
                <Plus size={16} />
                <span>Add Task</span>
              </button>
            </div>

            {/* Columns Grid */}
            <div className="sprint-kanban-grid">
              {COLUMNS.map(col => (
                <div key={col.id} className="sprint-column-panel">
                  <div className={`sprint-column-header col-accent-${col.id}`}>
                    <div className="column-title-label">
                      <span className="dot-indicator" />
                      <h3>{col.label}</h3>
                    </div>
                    <span className="task-count-badge">{tasksByStatus(col.id).length}</span>
                  </div>

                  <div className="sprint-cards-container">
                    <AnimatePresence>
                      {tasksByStatus(col.id).map(task => {
                        const prev = COLUMNS[COLUMNS.findIndex(c => c.id === col.id) - 1]?.id
                        const next = COLUMNS[COLUMNS.findIndex(c => c.id === col.id) + 1]?.id
                        return (
                          <motion.div
                            key={task.id}
                            className="sprint-task-card"
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="sprint-card-title">{task.title}</p>
                            <div className="sprint-card-footer">
                              <div className="sprint-card-assignee">
                                <div className="member-avatar sm">{task.assignee.split(' ').map(n => n[0]).join('')}</div>
                                <span className="assignee-name">{task.assignee}</span>
                              </div>
                              <div className="sprint-card-actions">
                                {prev && (
                                  <button className="sprint-action-btn" onClick={() => moveTask(task.id, prev)} title={`Move to ${prev}`}>
                                    ←
                                  </button>
                                )}
                                {next && (
                                  <button className="sprint-action-btn fwd" onClick={() => moveTask(task.id, next)} title={`Move to ${next}`}>
                                    <ChevronRight size={14} />
                                  </button>
                                )}
                                <button className="sprint-action-btn del" onClick={() => deleteTask(task.id)} title="Delete Task">
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>

                    {tasksByStatus(col.id).length === 0 && (
                      <div className="column-empty-state">
                        <span>No tasks in this column</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
