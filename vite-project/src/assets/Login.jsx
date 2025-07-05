import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const constraintsRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, error, clearError, setUser } = useAuth();

  // Clear error when switching modes
  useEffect(() => {
    clearError();
  }, [isLogin, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const result = isLogin 
      ? await login(username, password)
      : await register(username, password);
    
    setLoading(false);
    
    if (result.success) {
      if (location.state && location.state.redirectTo) {
        navigate(location.state.redirectTo, { state: { focusType: location.state.focusType } });
      } else {
        navigate("/foreground");
      }
    }
  };

  const handleGuestLogin = () => {
    setUser({ username: 'Guest', guest: true });
    if (location.state && location.state.redirectTo) {
      navigate(location.state.redirectTo, { state: { guest: true, focusType: location.state.focusType } });
    } else {
      navigate('/foreground');
    }
  };

  return (
    <motion.div ref={constraintsRef}>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className="relative flex items-center justify-center h-screen z-20"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="relative bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96 z-20">
          <h1 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-600 rounded text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
            
            <motion.button
              type="submit"
              whileTap={{ scale: 0.9 }}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded w-full text-lg font-semibold transition-colors mb-4"
            >
              {loading ? "Loading..." : (isLogin ? "Login" : "Register")}
            </motion.button>
          </form>
          {/* Login as Guest Button */}
          <button
            onClick={handleGuestLogin}
            className="w-full mt-2 mb-2 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded font-semibold transition-colors"
            disabled={loading}
          >
            Login as Guest
          </button>
          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300 text-sm"
              disabled={loading}
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
