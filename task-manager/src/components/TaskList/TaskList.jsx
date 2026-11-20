import './TaskList.css';
import {useState} from 'react';

function TaskList({ tasks, totalTasks, loading, error, onToggleTask, onDeleteTask, onEditTask }) {
    const [loadingTaskId, setLoadingTaskId] = useState(null);
    const [loadingAction, setLoadingAction] = useState('');

    async function handleToggle(task) {
        setLoadingTaskId(task.id);
        setLoadingAction('toggle');

        try {
            await onToggleTask(task);
        } finally {
            setLoadingTaskId(null);
            setLoadingAction('');
        }
    }

    async function handleDelete(id) {
        setLoadingTaskId(id);
        setLoadingAction('delete');

        try {
            await onDeleteTask(id);
        } finally {
            setLoadingTaskId(null);
            setLoadingAction('');
        }
    }
    
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
            {tasks.map(task => {
                const isOverdue =
                    task.due_date &&
                    !task.completed &&
                    new Date(`${task.due_date}T00:00:00`) < new Date(new Date().toDateString());

                return (
                <div className={`task-card ${task.completed ? 'completed-card' : ''}`} key={task.id}>
                    <h3>{task.title}</h3>

                    {task.description && (
                        <p className="task-description">{task.description}</p>
                    )}

                    {task.due_date && (
                        <p className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
                            {isOverdue ? 'Overdue:' : 'Due:'}

                            {new Date(`${task.due_date}T00:00:00`).toLocaleDateString                  ('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    )}

                    <p className={`task-priority ${task.priority.toLowerCase()}`}>
                        Priority: {task.priority}
                    </p>

                    <p className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                        {task.completed ? 'Completed' : 'Pending'}
                    </p>

                    <div className="task-actions">
                        <button
                            className="complete-btn"
                            onClick={() => handleToggle(task)}
                            disabled={loadingTaskId === task.id}
                        >
                            {loadingTaskId === task.id && loadingAction === 'toggle'
                                ? 'Updating...'
                                : task.completed
                                    ? 'Undo'
                                    : 'Complete'}
                        </button>

                        <button
                            className="edit-btn"
                            onClick={() => onEditTask(task)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(task.id)}
                            disabled={loadingTaskId === task.id}
                        >
                            {loadingTaskId === task.id && loadingAction === 'delete'
                                ? 'Deleting...'
                                : 'Delete'}
                        </button>
                    </div>
                </div>
            )})}
        </section>
    );
}

export default TaskList;