import React, { useState } from 'react';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (username === 'admin' && password === '1234') {
      try {
        localStorage.setItem('patrolai_authenticated', 'true');
      } catch {
        // ignore storage errors
      }
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Sign in</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Use username <strong>admin</strong> and password <strong>1234</strong>.</p>

        <label className="block mb-3">
          <span className="text-sm text-slate-600 dark:text-slate-300">Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200"
            autoComplete="username"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-slate-600 dark:text-slate-300">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-200"
            autoComplete="current-password"
          />
        </label>

        {error && <div className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</div>}

        <div className="flex items-center justify-between gap-2">
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
