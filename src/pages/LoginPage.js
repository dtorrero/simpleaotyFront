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
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
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
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: '1px solid white',
              outline: 'none', // Remove default outline
            }}
            onFocus={(e) => e.target.style.backgroundColor = 'black'}
            onBlur={(e) => e.target.style.backgroundColor = 'black'}
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
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: '1px solid white',
              outline: 'none', // Remove default outline
            }}
            onFocus={(e) => e.target.style.backgroundColor = 'black'}
            onBlur={(e) => e.target.style.backgroundColor = 'black'}
          />
          {error && <p style={{ color: 'red', fontSize: '0.8em' }}>{error}</p>}
        </div>
        <button type="submit" style={{ backgroundColor: 'white', color: 'black' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
