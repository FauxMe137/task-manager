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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});