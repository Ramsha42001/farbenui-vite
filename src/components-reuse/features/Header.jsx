import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import farben_logo from '/images/headerlogo.png';
import { logout } from '../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleSignup = () => {
    navigate('/auth/signup');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <header className="bg-white border-b shadow-sm z-50 sticky top-0 left-0 w-[100%] flex items-center"> {/* w-full here */}
      <div className="container mx-0 px-0 w-[100%]"> {/* mx-auto and px-4 for consistent padding */}
        <div className="flex items-center justify-between h-16 w-[100%]">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80">
              <img src={farben_logo} alt="Farben Logo" className="h-14" />
            </Link>
          </div>

          {/* Navigation */}
          {!isAuthenticated && (
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className="text-neutral-600 hover:text-primary px-3 py-2">
                Home
              </Link>
              <Link to="/dashboard" className="text-neutral-600 hover:text-primary px-3 py-2">
                Dashboard
              </Link>
              <Link to="/marketplace" className="text-neutral-600 hover:text-primary px-3 py-2">
                Marketplace
              </Link>
            </nav>
          )}

          {/* Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 ml-auto"> {/* ml-auto pushes buttons to the right */}
            {!isAuthenticated? (
              <>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-primary hover:text-white border border-primary hover:bg-primary rounded-lg transition-colors duration-300"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-300"
                >
                  Sign Up
                </button>
              </>
            ): (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-300"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-600 hover:text-primary"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen? <path d="M6 18L18 6M6 6l12 12" />: <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && isAuthenticated && ( // Corrected conditional rendering
          <div className="md:hidden py-4">
            <Link to="/" className="block text-neutral-600 hover:text-primary px-3 py-2">
              Home
            </Link>
            <Link to="/dashboard" className="block text-neutral-600 hover:text-primary px-3 py-2">
              Dashboard
            </Link>
            <Link to="/marketplace" className="block text-neutral-600 hover:text-primary px-3 py-2">
              Marketplace
            </Link>
            {/* Auth Buttons for Mobile */}
            <div className="flex flex-col space-y-2 px-3 py-2">
              {!isAuthenticated? (
                <>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-primary hover:text-white border border-primary hover:bg-primary rounded-lg transition-colors duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </>
              ): (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;