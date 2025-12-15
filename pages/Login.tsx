import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { DataService } from '../services/dataService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = await DataService.login(email, password);
    if (user) {
      setUser(user);
      navigate('/admin');
    } else {
      setError('Invalid credentials. Try admin@twinkle.com / admin');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-serif-title mb-6 text-center">Admin Access</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full p-2 border rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full p-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-gold-500 text-white py-2 rounded hover:bg-gold-600">Login</button>
        </form>
        <p className="mt-4 text-xs text-center text-gray-400">
           Demo: admin@twinkle.com / admin
        </p>
      </div>
    </div>
  );
};

export default Login;