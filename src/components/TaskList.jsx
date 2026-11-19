import TaskCard from './TaskCard'

export default function TaskList({ tasks, onToggle, onDelete }) {
    if (!tasks.length) {
        return (
            <div className="empty-state">
                <div>✓</div>
                <h3>No tasks found</h3>
                <p>Try a different filter or create a new task.</p>
            </div>
        )
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </div>
    )
}
