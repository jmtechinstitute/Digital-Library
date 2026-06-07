import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-40 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      {/* Brand Name */}
      <Link to="/" className="text-2xl font-bold text-[#8C52FF]">JM TECH</Link>
      
      {/* Direct Buttons */}
      <div className="flex gap-4 items-center">
        <Link 
          to="/" 
          className="text-white hover:text-[#8C52FF] font-bold transition"
        >
          User (Home)
        </Link>
        
        <Link 
          to="/admin-dashboard" 
          className="bg-[#8C52FF] hover:bg-[#713be2] px-4 py-2 rounded-lg font-bold text-white transition"
        >
          Admin Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;