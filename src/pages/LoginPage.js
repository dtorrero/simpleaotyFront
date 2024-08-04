import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await axios.post('/local/login', { username, password });
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', username);
      navigate('/voted-albums');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid username or password.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin} autoComplete="off">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="off"
          />
          {error && <p style={{ color: 'red', fontSize: '0.8em' }}>{error}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;


