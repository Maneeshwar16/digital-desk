import React, { useState } from 'react';

const LoginForm = ({ onSubmit, error: externalError, loading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ username: false, password: false });
  const [error, setError] = useState('');

  const usernameValid = username.trim().length > 0;
  const passwordValid = password.length > 0;
  const canSubmit = usernameValid && passwordValid && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    setError('');
    if (!canSubmit) return;
    try {
      await onSubmit?.({ username, password });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form
      className="max-w-md mx-auto bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col gap-6"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
      {/* Username Field */}
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="username" className="font-medium">Username or Email</label>
        <input
          id="username"
          type="text"
          className={`bg-gray-800 text-white border rounded px-3 py-2 focus:outline-none transition-colors ${
            touched.username && !usernameValid ? 'border-red-500' : 'border-gray-300'
          }`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, username: true }))}
        />
        {touched.username && !usernameValid && (
          <span className="text-xs text-red-500 absolute left-0 top-full mt-1">Enter your username or email</span>
        )}
      </div>
      {/* Password Field */}
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password" className="font-medium">Password</label>
        <input
          id="password"
          type="password"
          className={`bg-gray-800 text-white border rounded px-3 py-2 focus:outline-none transition-colors ${
            touched.password && !passwordValid ? 'border-red-500' : 'border-gray-300'
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        />
        {touched.password && !passwordValid && (
          <span className="text-xs text-red-500 absolute left-0 top-full mt-1">Enter your password</span>
        )}
      </div>
      {/* Error Message */}
      {(error || externalError) && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm text-center">
          {error || externalError}
        </div>
      )}
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={!canSubmit}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm; 