'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  // Auto-redirect if already logged in via cookie
  useEffect(() => {
    const isLoggedIn = document.cookie
      .split('; ')
      .find((row) => row.startsWith('admin_logged_in='))
      ?.split('=')[1];

    if (isLoggedIn === 'true') {
      window.location.href = '/admin/dashboard/insights';
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data) {
      setLoading(false);
      setErrorMsg('Invalid username or password');
      return;
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      setLoading(false);
      setErrorMsg('Invalid password');
      return;
    }

    // Set cookie instead of localStorage
    document.cookie = 'admin_logged_in=true; path=/';


      window.location.href = '/admin/dashboard/insights';

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-xl shadow-xl border border-zinc-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-zinc-300 mb-1">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-400 bg-zinc-700 p-2 rounded-lg">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
