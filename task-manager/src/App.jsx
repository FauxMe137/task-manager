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
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [actionError, setActionError] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && task.completed) ||
        (statusFilter === 'pending' && !task.completed);

    const matchesPriority =
        priorityFilter === 'all' ||
        task.priority.toLowerCase() === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  async function addTask(newTask) {
    setActionError('');

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to add task');
        }

        setTasks(prevTasks => [data, ...prevTasks]);
    } catch (error) {
        setActionError(error.message);
        throw error;
    }
  }

  async function toggleTask(task) {
    setActionError('');

    const updatedTask = {
        ...task,
        completed: task.completed ? 0 : 1
    };

    try {
        const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update task');
        }

        setTasks(prevTasks =>
            prevTasks.map(t => t.id === task.id ? data : t)
        );
    } catch (error) {
        setActionError(error.message);
    }
  }

  async function deleteTask(id) {
    if(!window.confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    setActionError('');

    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete task');
        }

        setTasks(prevTasks =>
            prevTasks.filter(task => task.id !== id)
        );
    } catch (error) {
        setActionError(error.message);
    }
  }

  async function editTask(task) {
    setEditingTask(task);
  }

  async function updateTask(id, taskData) {
    setActionError('');

    const updatedTask = {
        ...tasks.find(task => task.id === id),
        ...taskData
    };

    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update task');
        }

        setTasks(prevTasks =>
            prevTasks.map(task => task.id === id ? data : task)
        );

        setEditingTask(null);
    } catch (error) {
        setActionError(error.message);
        throw error;
    }
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
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onFilterClick={() => setShowFilters(prev => !prev)} statusFilter={statusFilter} onStatusChange={setStatusFilter} priorityFilter={priorityFilter} onPriorityChange={setPriorityFilter} showFilters={showFilters} />
      <Main actionError={actionError} tasks={tasks} filteredTasks={filteredTasks} loading={loading} error={error} onAddTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask} onEditTask={editTask} onUpdateTask={updateTask} editingTask={editingTask} setEditingTask={setEditingTask} />
      <Footer />
    </div>
  );
}