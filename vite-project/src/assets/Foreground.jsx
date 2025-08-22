import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Card from './Card';
import { motion } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import { todoAPI } from '../services/api';
import { FaTasks, FaRegFileAlt, FaYoutube, FaImage } from 'react-icons/fa';

// --- NEW, SMARTER HELPER FUNCTIONS (to make filtering robust) ---
const isYouTubeUrl = (url = '') => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url);
const isImageUrl = (url = '') => /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/.test(url.toLowerCase());
const isWebLink = (url = '') => url.startsWith('http') || url.startsWith('www.');

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
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Helper function for display name
  const getDisplayUsername = () => {
    if (!user || !user.username) return 'Guest';
    let namePart = user.username.split('@')[0];
    namePart = namePart.replace(/\d+$/, '');
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };
  const displayUsername = getDisplayUsername();

  // Load todos on component mount
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (user.guest) {
      const guestTodos = JSON.parse(localStorage.getItem('guestTodos') || '[]');
      setTodoList(guestTodos);
      setLoading(false);
    } else {
      fetchTodos();
    }
  }, [user, navigate]);
  
  // (The rest of your useEffects and functions like fetchTodos, handleSaveTask, etc., remain the same)
  // ...

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

  const handleAddTask = () => {
    setAddType('task');
    setNewTask({ type: 'task', taskName: '', taskDescription: '', content: '', imageUrl: '' });
    setShowAddTask(true);
  };

  const handleSaveTask = async () => {
    // ... (This function remains unchanged)
    let payload;
    if (addType === 'task') {
      payload = { taskName: newTask.taskName, taskDescription: newTask.taskDescription, type: 'task' };
    } else if (addType === 'article') {
      payload = { taskName: 'Article', taskDescription: newTask.content, type: 'article' };
    } else if (addType === 'youtube') {
      payload = { taskName: 'YouTube Video', taskDescription: newTask.content, type: 'youtube' };
    } else if (addType === 'image') {
      payload = { taskName: 'Image', taskDescription: newTask.imageUrl, type: 'image' };
    }
    // ... (rest of the function is unchanged)
    if (user && user.guest) {
        const newTodo = { ...payload, _id: Date.now().toString(), done: false };
        setTodoList([newTodo, ...todoList]);
      } else {
        try {
          const response = await todoAPI.create(payload);
          // Manually add the type to the returned object to fix UI until backend is fixed
          const newTodo = { ...response.data, type: payload.type };
          setTodoList([newTodo, ...todoList]);
        } catch (error) {
          alert('Failed to create item!');
        }
      }
      setNewTask({ type: 'task', taskName: '', taskDescription: '', content: '', imageUrl: '' });
      setShowAddTask(false);
  };

  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    // ... (This function remains unchanged)
  };

  const cancelDelete = () => {
    // ... (This function remains unchanged)
  };

  const handleMarkDone = async (id) => {
    // ... (This function remains unchanged)
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

  // --- START OF THE MAIN FIX ---
  const filteredTodos = todoList.filter(todo => {
    const description = todo.taskDescription || '';

    // First, check if it matches the search term
    const matchesSearch = (todo.taskName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         description.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) {
      return false; // If it doesn't match search, exclude it immediately
    }

    // Next, check if it matches the filter type
    if (filterType === 'all') {
      return true; // If filter is 'all', include it
    }

    // This is the new, smart filtering logic
    switch (filterType) {
      case 'youtube':
        return isYouTubeUrl(description);
      case 'image':
        return isImageUrl(description);
      case 'article':
        // It's an article if it's a web link but NOT a YouTube or image link
        return isWebLink(description) && !isYouTubeUrl(description) && !isImageUrl(description);
      case 'task':
        // It's a task if it's NOT any kind of web link
        return !isWebLink(description);
      default:
        return true;
    }
  });
  // --- END OF THE MAIN FIX ---


  return (
    <div ref={ref} className="fixed top-0 left-0 z-10 w-full h-full p-20 flex flex-wrap gap-5 mt-4 flex space-x-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl text-white font-bold">
            Hello, {displayUsername}! <br />Here is your digital desk
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
      
      {/* The rest of your JSX remains the same */}
      {/* ... */}
      <button
        onClick={handleAddTask}
        className="fixed bottom-10 right-10 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg focus:outline-none"
        title="Add Task"
      >+</button>
      
      {todoList.length === 0 ? (
        <div className="w-full text-center text-white text-xl">No items yet. Click the + button to add your first item!</div>
      ) : filteredTodos.length === 0 ? (
        <div className="w-full text-center text-white text-xl">No matching items found.</div>
      ) : (
        filteredTodos.map((item) => (
          <Card key={item._id} data={item} reference={ref} onAdd={handleAddTask} onMarkDone={handleMarkDone} onDelete={handleDeleteTask} />
        ))
      )}

      {/* ... The rest of your component (modals, etc.) */}

    </div>
  );
};

export default Foreground;