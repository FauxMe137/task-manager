import './TaskForm.css';
import { useState, useEffect } from 'react';

function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) {
    const [title, setTitle] = useState(editingTask?.title || '');
    const [description, setDescription] = useState(editingTask?.description || '');
    const [priority, setPriority] = useState(editingTask?.priority || 'Medium');
    const [dueDate, setDueDate] = useState(editingTask?.due_date || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
    e.preventDefault();
    
    if(isSubmitting) return;

    setIsSubmitting(true);

    const taskData = {
        title,
        description,
        priority,
        due_date: dueDate
    };

    try {
        if (editingTask) {
            await onUpdateTask(editingTask.id, taskData);
        } else {
            await onAddTask(taskData);
        }

        setTitle('');
        setDescription('');
        setPriority('Medium');
        setDueDate('');
    } catch (error) {
        console.error(error);
    } finally {
        setIsSubmitting(false);
    }
}

    useEffect(() => {
    if (!editingTask) return;

    const timer = setTimeout(() => {
        setTitle(editingTask.title);
        setDescription(editingTask.description || '');
        setPriority(editingTask.priority);
        setDueDate(editingTask.due_date || '');
    }, 0);

    return () => clearTimeout(timer);
}, [editingTask]);

    return (
        <section className="task-form-container">

            <h2>Add a Task</h2>

            <form className="task-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="task-title">Title</label>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="task-description">Description</label>
                    <textarea
                        placeholder="Add some details (optional)"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={500}
                    />
                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="task-priority">Priority</label>
                        <select value={priority} defaultValue="Medium" onChange={(e) => setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-due-date">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                </div>

                <button type="submit" disabled={isSubmitting} className="add-task-button">
                    {isSubmitting ? 'Saving...' : editingTask ? 'Save Changes' : 'Add Task'}
                </button>

                {editingTask && (
                    <button type="button" className='cancel-task-button' onClick={onCancelEdit} disabled={isSubmitting}>
                        Cancel
                    </button>
)}

            </form>

        </section>
    );
}

export default TaskForm;