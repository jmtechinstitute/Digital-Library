import React, { useState } from 'react';
import axios from 'axios';
import { X, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    // Confirm password validation check
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match! ❌");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login API Call
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          window.location.reload();
        }
      } else {
        // Register API Call
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });

        if (res.data.success) {
          setIsLogin(true); // Switch to login tab after successful registration
          setSuccessMsg("Registration Success! Please Login. ✅");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong! ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Parallax / Glowing Background Element */}
      <div className="absolute w-[500px] h-[500px] bg-[#8C52FF] rounded-full mix-blend-multiply filter blur-[150px] opacity-30 animate-pulse"></div>

      <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 w-full max-w-md rounded-2xl p-8 relative shadow-[0_0_40px_rgba(140,82,255,0.2)]">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white transition">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8C52FF]">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {error && (
          <div className="p-3 mb-6 rounded-lg text-center text-sm font-bold bg-red-500/20 text-red-400 border border-red-500/30">
            {error}
          </div>
        )}
        
        {successMsg && (
          <div className="p-3 mb-6 rounded-lg text-center text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="text" name="username" placeholder="Full Name" required={!isLogin} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8C52FF] transition" />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8C52FF] transition" />
          </div>

          {!isLogin && (
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="tel" name="phone" placeholder="Phone Number" required={!isLogin} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8C52FF] transition" />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8C52FF] transition" />
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required={!isLogin} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#8C52FF] transition" />
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-[#8C52FF] hover:bg-[#713be2] text-white font-bold py-3 rounded-lg transition shadow-[0_0_15px_rgba(140,82,255,0.4)] flex justify-center items-center gap-2 mt-2">
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Login' : 'Register Now')}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMsg(''); }} className="text-[#8C52FF] font-bold hover:underline">
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;