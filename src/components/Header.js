import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import './Header.css';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call the logout function from context
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">AOTY2024</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/user">Vote!</Link>
              </li>
              <li>
                <Link to="/voted-albums">MyAlbums</Link>
              </li>
            </>
          )}
          <li>
            {isLoggedIn ? (
              <Link to="/" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
