import TaskStats from './TaskStats/TaskStats';
import TaskForm from './TaskForm/TaskForm';
import TaskList from './TaskList/TaskList';

function Main({ tasks, loading, error, onAddTask, onToggleTask, onDeleteTask, onEditTask, onUpdateTask, editingTask, setEditingTask }) {
    return (
        <main style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '30px auto',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
    }}>
            <TaskStats tasks={tasks} />

            <TaskForm onAddTask={onAddTask} onUpdateTask={onUpdateTask} editingTask={editingTask} onCancelEdit={() => setEditingTask(null)} />
            <TaskList tasks={tasks} loading={loading} error={error} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
        </main>
    );
}

export default Main;