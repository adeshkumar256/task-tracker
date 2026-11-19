import { CalendarDays, Check, Circle, MoreHorizontal } from 'lucide-react'

export default function TaskCard({ task, onToggle, onDelete }) {
    const completed = task.status === 'completed'
    const date = task.dueDate
        ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : 'No date'

    return (
        <article className={`task-card ${completed ? 'completed' : ''}`}>
            <button
                className={`task-check ${completed ? 'checked' : ''}`}
                onClick={() => onToggle(task.id)}
                aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
            >
                {completed ? <Check size={15} /> : <Circle size={17} />}
            </button>
            <div className="task-content">
                <div className="task-title-row">
                    <h3>{task.title}</h3>
                    <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                </div>
                {task.description && <p>{task.description}</p>}
                <div className="task-meta">
                    <span className="project-dot">{task.project}</span>
                    <span><CalendarDays size={14} /> {date}</span>
                </div>
            </div>
            <button className="more-button" onClick={() => onDelete(task.id)} aria-label="Delete task" title="Delete task">
                <MoreHorizontal size={19} />
            </button>
        </article>
    )
}
