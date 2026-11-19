import { Bell, Search } from 'lucide-react'

export default function Header({ search, setSearch }) {
    return (
        <header className="topbar">
            <label className="search-box">
                <Search size={17} />
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tasks..."
                />
            </label>
            <button className="icon-button" aria-label="Notifications">
                <Bell size={19} />
                <span className="notification-dot" />
            </button>
            <div className="top-avatar">AK</div>
        </header>
    )
}
