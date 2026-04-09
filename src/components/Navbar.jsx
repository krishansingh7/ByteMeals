import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, ShoppingCart, User, LogIn, Moon, Sun, MapPin, ChevronDown } from 'lucide-react';
import LocationSearchModal from './LocationSearchModal';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const { city, address } = useSelector((state) => state.location);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#121212] shadow-md dark:shadow-slate-900 border-b border-transparent dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition hover:scale-105"
        >
          <svg
            className="h-8 w-8 text-orange-500"
            viewBox="0 0 54 72"
            fill="currentColor"
          >
            <path d="M43.6 30.6c-4.6 0-8.9 1.5-12.5 4-3.6-2.5-7.9-4-12.5-4C8.3 30.6 0 38.9 0 49.3c0 10.4 8.3 18.7 18.6 18.7 4.6 0 8.9-1.5 12.5-4 3.6 2.5 7.9 4 12.5 4 10.3 0 18.6-8.3 18.6-18.7 0-10.4-8.3-18.7-18.6-18.7zM18.6 62c-7.1 0-12.8-5.7-12.8-12.7 0-7 5.7-12.7 12.8-12.7 7.1 0 12.8 5.7 12.8 12.7 0 7-5.7 12.7-12.8 12.7zm25-12.7c0 7-5.7 12.7-12.8 12.7-7.1 0-12.8-5.7-12.8-12.7 0-7 5.7-12.7 12.8-12.7 7.1 0 12.8 5.7 12.8 12.7z"></path>
            <path d="M43.6 0c-4.6 0-8.9 1.5-12.5 4-3.6-2.5-7.9-4-12.5-4C8.3 0 0 8.3 0 18.6c0 10.3 8.3 18.6 18.6 18.6 4.6 0 8.9-1.5 12.5-4 3.6 2.5 7.9 4 12.5 4 10.3 0 18.6-8.3 18.6-18.6C62.2 8.3 53.9 0 43.6 0zM18.6 31.3C11.5 31.3 5.8 25.6 5.8 18.6 5.8 11.5 11.5 5.8 18.6 5.8c7.1 0 12.8 5.7 12.8 12.8 0 7.1-5.7 12.7-12.8 12.7zm25-12.7c0 7.1-5.7 12.7-12.8 12.7-7.1 0-12.8-5.7-12.8-12.7 0-7.1 5.7-12.8 12.8-12.8 7.1 0 12.8 5.7 12.8 12.8z"></path>
          </svg>
          <span className="text-2xl font-black tracking-tight text-gray-800 dark:text-gray-100 hidden sm:block">
            ByteMeal
          </span>
        </Link>

        {/* Location Dropdown */}
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-2 hover:text-orange-500 transition-colors mx-auto ml-4 sm:ml-8 mr-auto group max-w-[200px] sm:max-w-xs text-left"
        >
          <span className="font-bold border-b-2 border-gray-800 dark:border-gray-300 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors text-sm sm:text-base text-gray-800 dark:text-gray-200">
            {city === "GPS Location" ? "GPS Target" : city || "Other"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 truncate hidden sm:inline-block w-[120px] lg:w-auto">
            {address || "New Delhi, Delhi, India"}
          </span>
          <ChevronDown size={18} className="text-orange-500 shrink-0" />
        </button>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-4 sm:gap-6 font-semibold text-gray-700 dark:text-gray-300 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hover:text-orange-500 transition hidden sm:inline-flex"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden items-center gap-2 hover:text-orange-500 lg:flex"
          >
            <Search size={20} />
            <span>Search</span>
          </button>

          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:text-orange-500"
            >
              <User size={20} />
              <span className="hidden sm:inline">
                {user.displayName || "Profile"}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-orange-500"
            >
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-orange-500"
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -right-3 -top-2 flex h-[20px] min-w-[20px] items-center justify-center rounded-[50%] bg-orange-500 px-[5px] text-[10px] text-white">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </nav>
      </div>

      {/* Slide-over Location Modal */}
      <LocationSearchModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
