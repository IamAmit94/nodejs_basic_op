import express from 'express';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';

// Middleware to parse JSON bodies
const app = express();
const PORT = 3000;
app.use(express.json());

// Get the current directory path in an ES module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Path to store tasks in a JSON file
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Load tasks from the file (if it exists)
const loadTasks = () => {
  if (fs.existsSync(tasksFilePath)) {
    const data = fs.readFileSync(tasksFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

// Save tasks to the file
const saveTasks = () => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
};

// Initialize tasks from the file
let tasks = loadTasks();

// Create a task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Please provide both title and description!' });
  }

  const newTask = {
    id: uuid(),
    title,
    description,
    status: 'pending'
  };

  tasks.push(newTask);
  saveTasks();  // Save tasks to file

  return res.status(201).json({
    message: 'Task created successfully',
    task: newTask
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Update task status
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (!status || (status !== 'pending' && status !== 'completed')) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  task.status = status;
  saveTasks();  // Save updated tasks to file

  return res.status(200).json({
    message: 'Task updated successfully',
    task
  });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  saveTasks();  // Save updated tasks to file

  return res.status(200).json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
