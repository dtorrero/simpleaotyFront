import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">AOTY2024</Link>
          </li>
          <li>
            <Link to="/user">Vote!</Link>
          </li>
          <li>
            <Link to="/voted-albums">MyAlbums</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {/* <li>
            <Link to="/signup">Signup</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
