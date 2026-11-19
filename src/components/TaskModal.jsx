import { useState } from 'react'
import { X } from 'lucide-react'

export default function TaskModal({ onClose, onAdd }) {
    const [form, setForm] = useState({
        title: '', description: '', project: 'Personal', priority: 'Medium', status: 'todo', dueDate: '',
    })

    const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

    const submit = (event) => {
        event.preventDefault()
        if (!form.title.trim()) return
        onAdd({ ...form, title: form.title.trim(), id: crypto.randomUUID() })
    }

    return (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <form className="modal" onSubmit={submit}>
                <div className="modal-header">
                    <div><span className="eyebrow">New task</span><h2>Add a task</h2></div>
                    <button type="button" className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button>
                </div>
                <label>Task name<input autoFocus required value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="What needs to be done?" /></label>
                <label>Description<textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Add a short description" /></label>
                <div className="form-grid">
                    <label>Project<select value={form.project} onChange={(e) => update('project', e.target.value)}><option>Personal</option><option>Website</option><option>Product</option><option>Design</option><option>Research</option></select></label>
                    <label>Priority<select value={form.priority} onChange={(e) => update('priority', e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
                    <label>Status<select value={form.status} onChange={(e) => update('status', e.target.value)}><option value="todo">To do</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></label>
                    <label>Due date<input type="date" value={form.dueDate} onChange={(e) => update('dueDate', e.target.value)} /></label>
                </div>
                <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Create task</button></div>
            </form>
        </div>
    )
}
