import './Header.css';

function Header({ searchQuery, onSearchChange, onFilterClick }) {
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

                </div>

            </div>
        </header>
    );
}

export default Header;