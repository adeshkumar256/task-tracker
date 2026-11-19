import { CheckSquare2, LayoutGrid, Settings, Users } from 'lucide-react'

const navItems = [
    { label: 'My Tasks', icon: CheckSquare2 },
    { label: 'Projects', icon: LayoutGrid },
    // { label: 'Team', icon: Users },
]

export default function Sidebar({ view, setView, counts }) {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-mark">T</div>
                <span>TaskFlow</span>
            </div>

            <nav className="nav-list" aria-label="Main navigation">
                {navItems.map(({ label, icon: Icon }) => (
                    <button
                        key={label}
                        className={`nav-item ${view === label ? 'active' : ''}`}
                        onClick={() => setView(label)}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                        {label === 'My Tasks' && <small>{counts.total}</small>}
                    </button>
                ))}
            </nav>

            <button className="nav-item settings"><Settings size={18} /><span>Settings</span></button>

            <div className="user-card">
                <div className="avatar">AK</div>
                <div>
                    <strong>Adesh Kumar</strong>
                    <small>adeshkumar@gmail.com</small>
                </div>
            </div>
        </aside>
    )
}
