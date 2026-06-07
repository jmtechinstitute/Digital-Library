import React, { useState } from 'react';
import axios from 'axios';
import { X, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';

const API_URL = "https://digital-library-backend-26jp.onrender.com";

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

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match! ❌");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(`https://digital-library-backend-26jp.onrender.com/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });

        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          window.location.reload();
        }
      } else {
        const res = await axios.post(`https://digital-library-backend-26jp.onrender.com/api/auth/register`, {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });

        if (res.data.success) {
          setIsLogin(true);
          setSuccessMsg("Registration Success! Please Login. ✅");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong! ❌');
    } finally {
      setLoading(false);
    }
  };

  // Remaining JSX code unchanged...
};

export default AuthModal;