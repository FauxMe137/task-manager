import TaskStats from './TaskStats/TaskStats';
import TaskForm from './TaskForm/TaskForm';
import TaskList from './TaskList/TaskList';

function Main() {
    return (
        <main>
            <TaskStats
                total={15}
                completed={8}
                pending={7}
            />

            <TaskForm />
            <TaskList />
        </main>
    );
}

export default Main;