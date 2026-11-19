import './TaskForm.css';

function TaskForm() {
    return (
        <section className="task-form-container">

            <h2>Add a Task</h2>

            <form className="task-form">

                <div className="form-group">
                    <label htmlFor="task-title">Title</label>
                    <input
                        type="text"
                        id="task-title"
                        placeholder="What needs to be done?"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="task-description">Description</label>
                    <textarea
                        id="task-description"
                        placeholder="Add some details (optional)"
                        rows="3"
                    />
                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="task-priority">Priority</label>
                        <select id="task-priority" defaultValue="Medium">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-due-date">Due Date</label>
                        <input
                            type="date"
                            id="task-due-date"
                        />
                    </div>

                </div>

                <button type="submit" className="add-task-button">
                    Add Task
                </button>

            </form>

        </section>
    );
}

export default TaskForm;