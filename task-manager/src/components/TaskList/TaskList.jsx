import './TaskList.css';

function TaskList() {
  return (
    <section className="task-list-container">
      <h2>Your Tasks</h2>

      <div className="task-list">
        <article className="task-card">
          <div className="task-card-content">
            <div className="task-card-header">
              <h3>Complete project documentation</h3>
              <span className="task-priority high">High</span>
            </div>

            <p>Prepare the documentation for the current project.</p>

            <div className="task-card-details">
              <span>Due: Nov 25, 2026</span>
              <span>Pending</span>
            </div>
          </div>

          <div className="task-card-actions">
            <button type="button">Complete</button>
            <button type="button">Edit</button>
            <button type="button">Delete</button>
          </div>
        </article>

        <article className="task-card completed">
          <div className="task-card-content">
            <div className="task-card-header">
              <h3>Review JavaScript concepts</h3>
              <span className="task-priority medium">Medium</span>
            </div>

            <p>Revise React components, props and state.</p>

            <div className="task-card-details">
              <span>Due: Nov 18, 2026</span>
              <span>Completed</span>
            </div>
          </div>

          <div className="task-card-actions">
            <button type="button">Undo</button>
            <button type="button">Edit</button>
            <button type="button">Delete</button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default TaskList;