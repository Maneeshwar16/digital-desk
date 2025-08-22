import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Card from './Card';
import { motion } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import { todoAPI } from '../services/api';
import { FaTasks, FaRegFileAlt, FaYoutube, FaImage } from 'react-icons/fa';

const Foreground = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ type: 'task', taskName: '', taskDescription: '', content: '', imageUrl: '' });
  const [addType, setAddType] = useState('task');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [highlightType, setHighlightType] = useState(null);
  
  // MOVED FROM BELOW: These hooks are now at the top level.
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Load todos on component mount
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (user.guest) {
      // Load from localStorage for guest
      const guestTodos = JSON.parse(localStorage.getItem('guestTodos') || '[]');
      setTodoList(guestTodos);
      setLoading(false);
    } else {
      fetchTodos();
    }
  }, [user, navigate]);

  // Save guest todos to localStorage
  useEffect(() => {
    if (user && user.guest) {
      localStorage.setItem('guestTodos', JSON.stringify(todoList));
    }
  }, [todoList, user]);

  // On mount, check if we should focus/highlight a type
  useEffect(() => {
    if (location.state && location.state.focusType) {
      setHighlightType(location.state.focusType);
      // Optionally, scroll to the first card of that type after render
      setTimeout(() => {
        const el = document.querySelector(`[data-type="${location.state.focusType}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [location.state]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoAPI.getAll();
      if (Array.isArray(response.data)) {
        setTodoList(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setError('Failed to load todos - unexpected data format');
      }
    } catch (error) {
      setError('Failed to load todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add Task
  const handleAddTask = () => {
    setAddType('task');
    setNewTask({ type: 'task', taskName: '', taskDescription: '', content: '', imageUrl: '' });
    setShowAddTask(true);
  };

  const handleSaveTask = async () => {
    if (addType === 'task' && (!newTask.taskName || !newTask.taskDescription)) {
      alert('Please provide a task name and description!');
      return;
    }
    if (addType === 'article' && !newTask.content) {
      alert('Please provide the article link or text!');
      return;
    }
    if (addType === 'youtube' && !newTask.content) {
      alert('Please provide the YouTube link!');
      return;
    }
    if (addType === 'image' && !newTask.imageUrl) {
      alert('Please provide the image URL!');
      return;
    }
    let payload;
    if (addType === 'task') {
      payload = {
        taskName: newTask.taskName,
        taskDescription: newTask.taskDescription,
        type: 'task'
      };
    } else if (addType === 'article') {
      payload = {
        taskName: 'Article',
        taskDescription: newTask.content,
        type: 'article'
      };
    } else if (addType === 'youtube') {
      payload = {
        taskName: 'YouTube Video',
        taskDescription: newTask.content,
        type: 'youtube'
      };
    } else if (addType === 'image') {
      payload = {
        taskName: 'Image',
        taskDescription: newTask.imageUrl,
        type: 'image'
      };
    }
    if (user && user.guest) {
      const newTodo = { ...payload, _id: Date.now().toString(), done: false };
      setTodoList([newTodo, ...todoList]);
      setNewTask({ type: 'task', taskName: '', taskDescription: '', content: '', imageUrl: '' });
      setShowAddTask(false);
    } else {
      try {
        const response = await todoAPI.create(payload);
        setTodoList([response.data, ...todoList]);
        setNewTask({ type: 'task', taskName: '', taskDescription: '', content: '', imageUrl: '' });
        setShowAddTask(false);
      } catch (error) {
        alert('Failed to create item!');
        console.error('Error creating todo:', error);
      }
    }
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (user && user.guest) {
      setTodoList(todoList.filter((task) => task._id !== taskToDelete));
      setShowDeleteConfirm(false);
    } else {
      try {
        // For Parse Server, we need to use the objectId
        const taskObjectId = todoList.find(task => task._id === taskToDelete)?.objectId;
        if (taskObjectId) {
          await todoAPI.delete(taskObjectId);
          setTodoList(todoList.filter((task) => task._id !== taskToDelete));
        }
        setShowDeleteConfirm(false);
      } catch (error) {
        alert("Failed to delete task!");
        console.error('Error deleting todo:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  // Mark Task as Done
  const handleMarkDone = async (id) => {
    if (user && user.guest) {
      setTodoList(todoList.map((task) =>
        task._id === id ? { ...task, done: !task.done } : task
      ));
    } else {
      try {
        const task = todoList.find(t => t._id === id);
        if (task) {
          const response = await todoAPI.toggle(id);
          const updatedTask = {
            ...response.data,
            _id: id,
            taskName: response.data.taskName || response.data.content,
            taskDescription: response.data.taskDescription || '',
          };
          setTodoList(todoList.map((t) =>
            t._id === id ? updatedTask : t
          ));
        }
      } catch (error) {
        alert("Failed to update task!");
        console.error('Error updating todo:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 z-10 w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl">Loading your tasks...</div>
      </div>
    );
  }

  const filteredTodos = todoList.filter(todo => {
    const matchesSearch = todo.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.taskDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || todo.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div ref={ref} className="fixed top-0 left-0 z-10 w-full h-full p-20 flex flex-wrap gap-5 mt-4 flex space-x-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl text-white font-bold">
            Hello, {user?.username?.split('@')[0]}! <br />Here is your digital desk
          </h1>
          <div className="mt-4 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search tasks..."
              className="px-4 py-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Items</option>
              <option value="task">Tasks</option>
              <option value="article">Articles</option>
              <option value="youtube">YouTube</option>
              <option value="image">Images</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold h-10"
        >
          Logout
        </button>
      </div>
      
      {/* Floating + button */}
      <button
        onClick={handleAddTask}
        className="fixed bottom-10 right-10 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg focus:outline-none"
        title="Add Task"
      >
        +
      </button>
      
      {error && (
        <div className="w-full mb-4 p-3 bg-red-600 rounded text-white">
          {error}
        </div>
      )}
      
      {todoList.length === 0 ? (
        <div className="w-full text-center text-white text-xl">
          No items yet. Click the + button to add your first item!
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="w-full text-center text-white text-xl">
          No matching items found.
        </div>
      ) : (
        filteredTodos.map((item) => (
          <Card
            key={item._id}
            data={item}
            onAdd={handleAddTask}
            onMarkDone={handleMarkDone}
            onDelete={handleDeleteTask}
            reference={ref}
            highlight={highlightType && item.type === highlightType}
          />
        ))
      )}

      {showAddTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 rounded-2xl">
          <div className="bg-gray-800 text-white p-8 rounded shadow-lg border-red opacity-80 w-96">
            <h3 className="text-lg font-bold mb-4 text-center">What do you want to save?</h3>
            <div className="flex justify-between mb-6">
              <button
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${addType === 'task' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500`}
                onClick={() => { setAddType('task'); setNewTask({ ...newTask, type: 'task' }); }}
                title="Task"
              >
                <FaTasks className="text-2xl mb-1" />
                <span className="text-xs">Task</span>
              </button>
              <button
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${addType === 'article' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500`}
                onClick={() => { setAddType('article'); setNewTask({ ...newTask, type: 'article' }); }}
                title="Save an article link or text"
              >
                <FaRegFileAlt className="text-2xl mb-1" />
                <span className="text-xs">Article</span>
              </button>
              <button
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${addType === 'youtube' ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-500`}
                onClick={() => { setAddType('youtube'); setNewTask({ ...newTask, type: 'youtube' }); }}
                title="Save a YouTube link"
              >
                <FaYoutube className="text-2xl mb-1" />
                <span className="text-xs">YouTube</span>
              </button>
              <button
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${addType === 'image' ? 'bg-green-600' : 'bg-gray-700'} hover:bg-green-500`}
                onClick={() => { setAddType('image'); setNewTask({ ...newTask, type: 'image' }); }}
                title="Save an image URL"
              >
                <FaImage className="text-2xl mb-1" />
                <span className="text-xs">Image</span>
              </button>
            </div>
            {addType === 'task' && (
              <>
                <input
                  type="text"
                  placeholder="Task Name"
                  className="w-full mb-4 p-2 bg-gray-700 rounded"
                  value={newTask.taskName}
                  onChange={e => setNewTask({ ...newTask, taskName: e.target.value })}
                />
                <textarea
                  placeholder="Task Description"
                  className="w-full mb-4 p-2 bg-gray-700 rounded-4xl"
                  value={newTask.taskDescription}
                  onChange={e => setNewTask({ ...newTask, taskDescription: e.target.value })}
                />
              </>
            )}
            {addType === 'article' && (
              <input
                type="text"
                placeholder="Article link or text"
                className="w-full mb-4 p-2 bg-gray-700 rounded"
                value={newTask.content}
                onChange={e => setNewTask({ ...newTask, content: e.target.value })}
              />
            )}
            {addType === 'youtube' && (
              <input
                type="text"
                placeholder="YouTube link"
                className="w-full mb-4 p-2 bg-gray-700 rounded"
                value={newTask.content}
                onChange={e => setNewTask({ ...newTask, content: e.target.value })}
              />
            )}
            {addType === 'image' && (
              <input
                type="text"
                placeholder="Image URL"
                className="w-full mb-4 p-2 bg-gray-700 rounded"
                value={newTask.imageUrl}
                onChange={e => setNewTask({ ...newTask, imageUrl: e.target.value })}
              />
            )}
            <div className="flex justify-between">
              <button onClick={handleSaveTask} className="bg-green-600 px-4 py-2 rounded">Save</button>
              <button onClick={() => setShowAddTask(false)} className="bg-red-600 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="bg-gray-800 text-white p-8 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Do you want to delete?</h3>
            <div className="flex justify-between mt-4">
              <button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold">Confirm</button>
              <button onClick={cancelDelete} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-semibold">Cancel</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Foreground;