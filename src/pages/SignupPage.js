import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import './SignupPage.css'; 
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();
  logout();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const url = `/local/create-account?token=${token}`;
      console.log(url);
      const response = await axios.post(url, { username, password });
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="NewUsername"
          required
          autoComplete="NewUsername"
          className="input-field"
        />
        <br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="NewPassword"
          required
          autoComplete="new-password"
          className="input-field"
        />
        <br></br>
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
