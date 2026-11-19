import './TaskList.css';

function TaskList({ tasks, totalTasks, loading, error, onToggleTask, onDeleteTask, onEditTask }) {
    if (loading) {
        return <p className="task-list-message">Loading tasks...</p>;
    }

    if (error) {
        return <p className="task-list-message">{error}</p>;
    }

    if (tasks.length === 0) {
        return <p className="task-list-message">
          {totalTasks === 0 ? 'No tasks yet. Add one to get started!' : 'No tasks match your search or filter criteria. Try changing your search or filters.'}
        </p>;
    }

    return (
        <section className="task-list">
            {tasks.map(task => (
                <div className="task-card" key={task.id}>
                    <h3>{task.title}</h3>

                    {task.description && (
                        <p className="task-description">{task.description}</p>
                    )}

                    <p className="task-priority">
                        Priority: {task.priority}
                    </p>

                    <p className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                        {task.completed ? 'Completed' : 'Pending'}
                    </p>

                    <div className="task-actions">
                        <button
                            className="complete-btn"
                            onClick={() => onToggleTask(task)}
                        >
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>

                        <button
                            className="edit-btn"
                            onClick={() => onEditTask(task)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => onDeleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default TaskList;