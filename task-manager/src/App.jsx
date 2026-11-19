import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import {useState, useEffect} from 'react';

export default function App(){
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleFilterClick = () => {
    console.log('Filter button clicked.');
  };

  async function addTask(newTask) {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    });

    if (!response.ok) {
        throw new Error('Failed to add task');
    }

    const createdTask = await response.json();

    setTasks(prevTasks => [createdTask, ...prevTasks]);
  }

  async function toggleTask(task) {
    const updatedTask = {
        ...task,
        completed: task.completed ? 0 : 1
    };

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    const data = await response.json();

    setTasks(prevTasks =>
        prevTasks.map(t => t.id === task.id ? data : t)
    );
  }

  async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  async function editTask(task) {
    setEditingTask(task);
  }

  async function updateTask(id, taskData) {
    const updatedTask = {
        ...tasks.find(task => task.id === id),
        ...taskData
    };

    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    const data = await response.json();

    setTasks(prevTasks =>
        prevTasks.map(task => task.id === id ? data : task)
    );

    setEditingTask(null);
}

  useEffect(() => {
    async function fetchTasks() {
      try {
          const response = await fetch('http://localhost:3000/tasks');

          if (!response.ok) {
            throw new Error('Failed to fetch tasks');
          }

          const data = await response.json();
          setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onFilterClick={handleFilterClick} />
      <Main tasks={tasks} loading={loading} error={error} onAddTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask} onEditTask={editTask} onUpdateTask={updateTask} editingTask={editingTask} setEditingTask={setEditingTask} />
      <Footer />
    </div>
  );
}