import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import './Header.css';

const Header = () => {
  const { isLoggedIn, logout, role } = useAuth(); 

  const handleLogout = () => {
    logout(); 
  };

  const username = localStorage.getItem('user');

  return (
    <header>
      <nav>
        <div className="header-content">
          {isLoggedIn && (
            <span className="user-info">
              <Link to="/passw" style={{ textDecoration: 'none', color: 'inherit' }}>
                {username} {role === 'admin' && '(admin)'}
              </Link>
            </span>
          )}
          <div className="nav-links-container">
            <ul className="nav-links">
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
                  {role === 'admin' && ( // Show admin link if user is admin
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                  )}
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
