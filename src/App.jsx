import { useEffect, useMemo, useState } from 'react'
import { Plus, SlidersHorizontal } from 'lucide-react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Stats from './components/Stats'
import TaskList from './components/TaskList'
import TaskModal from './components/TaskModal'
import { seedTasks } from './data/seedTasks'

const filters = ['All', 'To do', 'In progress', 'Completed']

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow-tasks')
    return saved ? JSON.parse(saved) : seedTasks
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState('My Tasks')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks))
  }, [tasks])

  const counts = useMemo(() => ({
    total: tasks.length,
    progress: tasks.filter((task) => task.status === 'in-progress').length,
    completed: tasks.filter((task) => task.status === 'completed').length,
  }), [tasks])

  const visibleTasks = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    return tasks.filter((task) => {
      const matchesSearch = !normalized || [task.title, task.description, task.project]
        .some((value) => value?.toLowerCase().includes(normalized))
      const matchesFilter = filter === 'All'
        || (filter === 'To do' && task.status === 'todo')
        || (filter === 'In progress' && task.status === 'in-progress')
        || (filter === 'Completed' && task.status === 'completed')
      return matchesSearch && matchesFilter
    })
  }, [tasks, search, filter])

  const toggleTask = (id) => {
    setTasks((current) => current.map((task) =>
      task.id === id
        ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed' }
        : task
    ))
  }

  const deleteTask = (id) => setTasks((current) => current.filter((task) => task.id !== id))
  const addTask = (task) => {
    setTasks((current) => [task, ...current])
    setModalOpen(false)
  }

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} counts={counts} />
      <main className="main-area">
        <Header search={search} setSearch={setSearch} />
        <div className="content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">OVERVIEW</span>
              <h1>My Tasks</h1>
              <p>Stay organized and keep moving forward.</p>
            </div>
            <button className="primary-button" onClick={() => setModalOpen(true)}>
              <Plus size={18} /> Add Task
            </button>
          </div>

          <Stats counts={counts} />

          <section className="tasks-section">
            <div className="task-toolbar">
              <div className="filters">
                {filters.map((item) => (
                  <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <button className="filter-button"><SlidersHorizontal size={16} /> Filter</button>
            </div>
            <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
          </section>
        </div>
      </main>
      {modalOpen && <TaskModal onClose={() => setModalOpen(false)} onAdd={addTask} />}
    </div>
  )
}

export default App