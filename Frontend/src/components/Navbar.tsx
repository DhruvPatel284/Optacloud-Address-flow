import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MapPin,LogOut } from 'lucide-react';

interface MyToken {
  name: string;
  id: string;
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full border-2 border-teal-400 bg-teal-100 text-teal-900 flex items-center justify-center transition-all duration-300 hover:bg-teal-50">
      <span className="text-lg font-medium">{name[0].toUpperCase()}</span>
    </div>
  );
}

export const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        try {
          const decodedToken = jwtDecode<MyToken>(token);
          setUsername(decodedToken.name);
        } catch (error) {
          console.error('Failed to decode token', error);
        }
      }
    }
    getUser();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-teal-600" />
              <span className="text-2xl font-bold text-gray-900">OptaCloud</span>
            </Link>
          </div>

          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <button 
                  onClick={toggleDropdown}
                  className="focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={dropdownVisible}
                >
                  <Avatar name={username} />
                </button>
                
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                      <button
                        onClick={() => { handleLogout(); setDropdownVisible(false); }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Log Out
                      </button>

                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};