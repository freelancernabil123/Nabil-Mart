import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Settings as SettingsIcon, Save } from 'lucide-react';

export default function Settings() {
  const { isAdminAuthenticated, updateAdminCredentials } = useAppContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    } else {
      // Fetch current admin credentials from local storage to populate the form
      const stored = localStorage.getItem('adminCredentials');
      if (stored) {
        const { username, password } = JSON.parse(stored);
        setUsername(username);
        setPassword(password);
      }
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminCredentials(username, password);
    setSuccessMsg('Admin credentials updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Admin Credentials</h2>

        {successMsg && (
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold p-4 rounded-xl mb-6">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Admin ID (Username)</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">New Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-slate-500 mt-2">Update your login password here.</p>
          </div>

          <button 
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-200"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
