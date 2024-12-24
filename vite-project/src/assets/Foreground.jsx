import React, { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import Card from './Card';
import Background from './Background';
import UsernameCard from './UsernameCard';
import { motion } from "framer-motion";

const Foreground = () => {
  const location = useLocation();
  const userName = location.state?.userName || "User";
  const ref = useRef(null);  // Fixed typo: UseRef -> useRef
  const [todoList, setTodoList] = useState([
    { id: 1, taskName: "Buy Groceries", taskDescription: "Purchase vegetables, fruits, and dairy products.", done: false },
    { id: 2, taskName: "Attend Meeting", taskDescription: "Join the Zoom meeting with the project team at 3 PM.", done: false },
    { id: 3, taskName: "Workout", taskDescription: "Complete a 30-minute cardio session at the gym.", done: false }
  ]);
  const [newTask, setNewTask] = useState({ taskName: "", taskDescription: "" });
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToMarkDone, setTaskToMarkDone] = useState(null);

  // Add Task
  const handleAddTask = () => setShowAddTask(true);

  const handleSaveTask = () => {
    if (newTask.taskName && newTask.taskDescription) {
      setTodoList([...todoList, { id: Date.now(), ...newTask, done: false }]);
      setNewTask({ taskName: "", taskDescription: "" });
      setShowAddTask(false);
    } else {
      alert("Please provide a task name and description!");
    }
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setTodoList(todoList.filter((task) => task.id !== taskToDelete));
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  // Mark Task as Done
  const handleMarkDone = (id) => {
    const updatedTasks = todoList.map((task) =>
      task.id === id ? { ...task, done: true } : task
    );
    setTodoList(updatedTasks);
    alert("Task marked as done!");
  };

  return (
    <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-full  p-20 flex flex-wrap gap-5 mt-2 flex space-x-4">
       <h1  className="text-3xl text-white font-bold mb-6">Hello, {userName}! <br/>Here are your tasks</h1>
      {todoList.map((item) => (
        <Card
          key={item.id}
          data={item}
          onAdd={handleAddTask}
          onMarkDone={handleMarkDone}
          onDelete={handleDeleteTask}
          reference={ref}
        />
      ))}

      {showAddTask && (
        <div>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 rounded-2xl ">
          <div className="bg-gray-800 text-white p-8 rounded shadow-lg border-red opacity-80  ">
            <h3 className="text-lg font-bold mb-4">Add New Task</h3>
            <input
              type="text"
              placeholder="Task Name"
              className="w-full mb-4 p-2 bg-gray-700 rounded"
              value={newTask.taskName}
              onChange={(e) =>
                setNewTask({ ...newTask, taskName: e.target.value })
              }
            />
            <textarea
              placeholder="Task Description"
              className="w-full mb-4 p-2 bg-gray-700 rounded-4xl"
              value={newTask.taskDescription}
              onChange={(e) =>
                setNewTask({ ...newTask, taskDescription: e.target.value })
              }
            />
            <div className="flex justify-between">
              <button
                onClick={handleSaveTask}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        </div>
      )}

      {showDeleteConfirm && (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="bg-gray-800 text-white p-8 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you have completed this task</p>
            <div className="flex justify-between mt-4">
              <button onClick={confirmDelete} className="bg-red-600 px-4 py-2 rounded">Yes</button>
              <button onClick={cancelDelete} className="bg-green-600 px-4 py-2 rounded">No</button>
            </div>.
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Foreground;
