import './Header.css';

function Header({ searchQuery, onSearchChange, onFilterClick, statusFilter, onStatusChange, priorityFilter, onPriorityChange, showFilters }) {
    return (
        <header className="header">
            <div className="header-container">

                <div className="header-brand">
                    <h1>TaskFlow</h1>
                </div>

                <div className="header-actions">

                    <div className="search-container">
                        <input
                            type="search"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>

                    <button
                        className="filter-button"
                        onClick={onFilterClick}
                        aria-label="Open filters"
                        title="Filter tasks"
                    >
                        <span className="material-symbols-rounded">
                            tune
                        </span>
                    </button>

                    {showFilters && (
                        <div className="filter-options">
                            <select
                                value={statusFilter}
                                onChange={(e) => onStatusChange(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>

                            <select
                                value={priorityFilter}
                                onChange={(e) => onPriorityChange(e.target.value)}
                            >
                                <option value="all">All Priorities</option>
                                <option value="low">Low Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="high">High Priority</option>
                            </select>
                        </div>
                    )}

                </div>

            </div>
        </header>
    );
}

export default Header;