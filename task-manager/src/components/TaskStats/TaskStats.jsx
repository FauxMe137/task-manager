import './TaskStats.css';

function TaskStats({ total, completed, pending }) {
    return (
        <section className="task-stats">

            <div className="stat-card">
                <span>Total Tasks</span>
                <h2>{total}</h2>
            </div>

            <div className="stat-card">
                <span>Completed</span>
                <h2>{completed}</h2>
            </div>

            <div className="stat-card">
                <span>Pending</span>
                <h2>{pending}</h2>
            </div>

        </section>
    );
}

export default TaskStats;