import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const constraintsRef = useRef(null); // Fixed missing import
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userName.trim()) {
      // Redirect to the Foreground page with the user's name
      navigate("/foreground", { state: { userName } });
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <motion.div ref={constraintsRef}>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className="relative flex items-center justify-center h-screen z-20"
      >
        <motion.div  whileHover={{ scale: 1.2 }} className="relative bg-gray-800 text-white p-8 rounded-lg shadow-lg w-80 z-20">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome</h1>
          <div>
            <label htmlFor="userName" className="sr-only">
              Enter your name
            </label>
            <input
              type="text"
              id="userName" // Added the id for better accessibility
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full mb-4 p-3 bg-gray-700 rounded text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <motion.button
           whileTap={{ scale: 0.9 }}
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full text-lg font-semibold transition-colors"
          >
            Enter
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
