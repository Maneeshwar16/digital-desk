import React, { useState } from 'react';

const passwordChecks = [
  {
    label: 'At least 6 characters',
    test: (pw) => pw.length >= 6,
  },
  {
    label: 'At least one uppercase letter',
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    label: 'At least one number',
    test: (pw) => /[0-9]/.test(pw),
  },
  {
    label: 'At least one special character (!@#$%^&*)',
    test: (pw) => /[!@#$%^&*]/.test(pw),
  },
];

function getPasswordStrength(pw) {
  const passed = passwordChecks.filter((c) => c.test(pw)).length;
  if (passed <= 1) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
  if (passed === 2 || passed === 3) return { label: 'Moderate', color: 'bg-yellow-500', width: 'w-2/3' };
  if (passed === 4) return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
  return { label: '', color: '', width: '' };
}

const RegisterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordResults = passwordChecks.map((c) => c.test(password));
  const allPasswordValid = passwordResults.every(Boolean);
  const canSubmit = emailValid && allPasswordValid && !loading;
  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      // Replace with your registration API call
      await onSubmit?.({ email, password });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col gap-6"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
      {/* Email Field */}
      <div className="flex flex-col gap-1 relative bg-gray-900">
        <label htmlFor="email" className="font-medium">Email</label>
        <input
          id="email"
          type="email"
          className={`bg-gray-800 text-white border rounded px-3 py-2 focus:outline-none transition-colors ${
            touched.email && !emailValid ? 'border-red-500' : 'border-gray-300'
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        />
        {touched.email && !emailValid && (
          <span className="text-xs text-red-500 absolute left-0 top-full mt-1">Enter a valid email address</span>
        )}
      </div>
      {/* Password Field */}
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password" className="font-medium">Password</label>
        <input
          id="password"
          type="password"
          className={`bg-gray-800 text-white border rounded px-3 py-2 focus:outline-none transition-colors ${
            touched.password && !allPasswordValid ? 'border-red-500' : 'border-gray-300'
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        />
        {/* Password Instructions */}
        <ul className="mt-2 space-y-1 text-xs">
          {passwordChecks.map((c, i) => (
            <li key={c.label} className={`flex items-center gap-1 ${password ? (passwordResults[i] ? 'text-green-600' : 'text-red-500') : 'text-gray-400'}`}>
              <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: password ? (passwordResults[i] ? '#16a34a' : '#ef4444') : '#d1d5db' }}></span>
              {c.label}
            </li>
          ))}
        </ul>
        {/* Password Strength Bar */}
        {password && (
          <div className="mt-2">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div className={`h-2 rounded transition-all duration-300 ${strength.color} ${strength.width}`}></div>
            </div>
            <span className={`text-xs font-medium ml-1 ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
          </div>
        )}
      </div>
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm text-center">{error}</div>
      )}
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={!canSubmit}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm; 