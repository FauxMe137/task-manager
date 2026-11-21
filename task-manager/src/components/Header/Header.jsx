import './Header.css';

function Header({ searchQuery, onSearchChange, onFilterClick, statusFilter, onStatusChange, priorityFilter, onPriorityChange, showFilters }) {
    const filtersActive = statusFilter !== 'all' || priorityFilter !== 'all';
    
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
                            id="search-input"
                        />

                        {searchQuery && (
                            <button
                                type="button"
                                className="clear-search"
                                onClick={() => onSearchChange('')}
                            >
                                &times;
                            </button>
                        )}
                    </div>

                    <button
                        className={`filter-button ${filtersActive ? 'active' : ''}`}
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
                                id="task-status"
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

                            {filtersActive && (
                                <button
                                    className="clear-filters"
                                    onClick={() => {
                                        onStatusChange('all');
                                        onPriorityChange('all');
                                    }}
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    )}

                </div>

            </div>
        </header>
    );
}

export default Header;