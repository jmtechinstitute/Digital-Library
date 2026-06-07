import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Browser-la user login aagi irukkara nu check pandrom
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // 👇 PUDHU LINE: User login aagama iruntha, udane automatic-aa modal open aaganum!
      setIsAuthOpen(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <nav className="fixed w-full z-40 top-0 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#8C52FF] to-pink-400 drop-shadow-[0_0_10px_rgba(140,82,255,0.8)]">
            DIGI-LIB
          </Link>

          {/* Links & Buttons */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-[#8C52FF] transition font-medium">
              Home
            </Link>
            
            {/* Contact Now CTA */}
            <a href="#contact" className="text-gray-300 hover:text-[#8C52FF] transition font-medium">
              Contact Now
            </a>

            {/* Admin Link */}
            {user && user.role === 'admin' && (
              <Link to="/admin-dashboard" className="text-gray-300 hover:text-pink-400 transition font-bold">
                Admin Panel
              </Link>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-4 ml-2">
                <span className="text-[#8C52FF] font-bold bg-[#8C52FF]/10 px-3 py-1.5 rounded-lg border border-[#8C52FF]/30">
                  Hi, {user.username}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 font-bold transition text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="ml-2 bg-[#8C52FF] hover:bg-[#713be2] text-white font-bold py-2 px-6 rounded-lg transition shadow-[0_0_15px_rgba(140,82,255,0.4)]"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal Popup Component */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;