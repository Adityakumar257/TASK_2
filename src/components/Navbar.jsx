import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold">
          BlogApp
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <Link to="/create" className="hover:underline">
                Create Post
              </Link>

              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-lg">
                {user?.photo && (
                  <img
                    src={
                      user.photo.startsWith('http')
                        ? user.photo
                        : `http://localhost:3001${user.photo}`
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                )}
                <span className="text-sm font-medium">
                  Welcome, {user?.fullName?.split(' ')[0]}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-3 flex flex-col items-start px-4">
          {token ? (
            <>
              <Link to="/create" onClick={() => setMenuOpen(false)}>
                Create Post
              </Link>

              <div className="flex items-center space-x-2">
                {user?.photo && (
                  <img
                    src={
                      user.photo.startsWith('http')
                        ? user.photo
                        : `http://localhost:3001${user.photo}`
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                )}
                <span className="text-sm font-medium">
                  Welcome, {user?.fullName?.split(' ')[0]}
                </span>
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
