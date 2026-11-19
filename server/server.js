import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const PORT = 3000;

// Database connection
const db = new Database('./server/database/tasks.db');

console.log('Database connected successfully!');

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT DEFAULT 'Medium',
        due_date TEXT,
        completed INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/tasks', (req, res) => {
    const tasks = db.prepare(`
        SELECT * FROM tasks
        ORDER BY created_at DESC
    `).all();

    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = db.prepare(`
        SELECT * FROM tasks
        WHERE id = ?
    `).get(req.params.id);

    if (!task) {
        return res.status(404).json({
            error: 'Task not found'
        });
    }

    res.json(task);
});

app.post('/tasks', (req, res) => {
    const { title, description, priority, due_date } = req.body;

    if (!title) {
        return res.status(400).json({
            error: 'Task title is required'
        });
    }

    const result = db.prepare(`
        INSERT INTO tasks (title, description, priority, due_date)
        VALUES (?, ?, ?, ?)
    `).run(title, description, priority, due_date);

    const newTask = db.prepare(`
        SELECT * FROM tasks WHERE id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const { title, description, priority, due_date, completed } = req.body;

    const result = db.prepare(`
        UPDATE tasks
        SET title = ?,
            description = ?,
            priority = ?,
            due_date = ?,
            completed = ?
        WHERE id = ?
    `).run(title, description, priority, due_date, completed, req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({
            error: 'Task not found'
        });
    }

    const updatedTask = db.prepare(`
        SELECT * FROM tasks WHERE id = ?
    `).get(req.params.id);

    res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
    const result = db.prepare(`
        DELETE FROM tasks
        WHERE id = ?
    `).run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({
            error: 'Task not found'
        });
    }

    res.json({
        message: 'Task deleted successfully'
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});