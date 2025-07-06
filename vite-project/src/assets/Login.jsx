import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = () => {
  const constraintsRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, error, clearError, setUser, loading } = useAuth();

  // Clear error when switching modes
  useEffect(() => {
    clearError();
  }, [isLogin, clearError]);

  // Handle login
  const handleLogin = async ({ username, password }) => {
    const result = await login(username, password);
    if (result.success) {
      if (location.state && location.state.redirectTo) {
        navigate(location.state.redirectTo, { state: { focusType: location.state.focusType } });
      } else {
        navigate("/foreground");
      }
    }
  };

  // Handle register
  const handleRegister = async ({ email, password }) => {
    const result = await register(email, password);
    if (result.success) {
      if (location.state && location.state.redirectTo) {
        navigate(location.state.redirectTo, { state: { focusType: location.state.focusType } });
      } else {
        navigate("/foreground");
      }
    }
  };

  // Guest login
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
          {isLogin ? (
            <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
          ) : (
            <RegisterForm onSubmit={handleRegister} error={error} loading={loading} />
          )}
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
