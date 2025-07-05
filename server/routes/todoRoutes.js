import express from 'express';
import Todo from '../models/Todo.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all todos for a user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new todo
router.post('/', auth, async (req, res) => {
  try {
    const { taskName, taskDescription } = req.body;

    if (!taskName || !taskDescription) {
      return res.status(400).json({ message: 'Task name and description are required' });
    }

    const todo = new Todo({
      taskName,
      taskDescription,
      user: req.user._id
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a todo
router.put('/:id', auth, async (req, res) => {
  try {
    const { taskName, taskDescription, done } = req.body;
    const todoId = req.params.id;

    const todo = await Todo.findOne({ _id: todoId, user: req.user._id });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (taskName !== undefined) todo.taskName = taskName;
    if (taskDescription !== undefined) todo.taskDescription = taskDescription;
    if (done !== undefined) todo.done = done;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todoId = req.params.id;
    
    const todo = await Todo.findOneAndDelete({ _id: todoId, user: req.user._id });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark todo as done/undone
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const todoId = req.params.id;
    
    const todo = await Todo.findOne({ _id: todoId, user: req.user._id });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.done = !todo.done;
    const updatedTodo = await todo.save();
    
    res.json(updatedTodo);
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 