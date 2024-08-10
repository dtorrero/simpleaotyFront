import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './SignupPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await axios.post('/local/login', { username, password });
      const { token, role } = result.data; // Assuming the response contains the token and role
             
      login(username, role, token); // Pass the token to the login function
      navigate('/voted-albums');
    } catch (error) {
      console.error('Error during login: (LoginPage)', error);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} autoComplete="off">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          autoComplete="off"
          className="input-field"
        />
        <br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoComplete="off"
          className="input-field"
        />
        {error && <p style={{ color: 'red', fontSize: '0.8em' }}>{error}</p>}
        <br></br>
        <button type="submit" className="signup-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
