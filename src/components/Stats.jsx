import { CheckCircle2, CircleDashed, ListTodo } from 'lucide-react'

export default function Stats({ counts }) {
    const cards = [
        { label: 'Total Tasks', value: counts.total, icon: ListTodo, tone: 'blue' },
        { label: 'In Progress', value: counts.progress, icon: CircleDashed, tone: 'amber' },
        { label: 'Completed', value: counts.completed, icon: CheckCircle2, tone: 'green' },
    ]

    return (
        <div className="stats-grid">
            {cards.map(({ label, value, icon: Icon, tone }) => (
                <div className="stat-card" key={label}>
                    <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
                    <div><span>{label}</span><strong>{value}</strong></div>
                </div>
            ))}
        </div>
    )
}
