import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, Mail, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Already admin login aagi iruntha, direct-aa dashboard anuppiduvom
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      if (res.data.success) {
        if (res.data.user.role === 'admin') {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/admin-dashboard');
          window.location.reload();
        } else {
          setError('Access Denied! You are not an Admin. ❌');
        }
      }
    } catch (err) {
      setError('Invalid Admin Credentials! ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8C52FF] rounded-full mix-blend-multiply filter blur-[150px] opacity-20"></div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 w-full max-w-md rounded-2xl p-8 relative z-10 shadow-[0_0_40px_rgba(140,82,255,0.2)]">
        <div className="flex justify-center mb-6">
          <div className="bg-[#8C52FF]/20 p-4 rounded-full border border-[#8C52FF]/30">
            <ShieldAlert size={40} className="text-[#8C52FF]" />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8C52FF]">
          Admin Portal
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Authorized Personnel Only</p>

        {error && (
          <div className="bg-red-500/20 text-red-400 border border-red-500/30 p-3 mb-6 rounded-lg text-center text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input 
              type="email" placeholder="Admin ID (Email)" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8C52FF] transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input 
              type="password" placeholder="Admin Password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8C52FF] transition"
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-[#8C52FF] hover:bg-[#713be2] text-white font-bold py-3 rounded-lg transition shadow-[0_0_15px_rgba(140,82,255,0.4)] flex justify-center items-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;