import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import './ChangePasswordPage.css'; 
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const { logout } = useAuth();
  

  
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      const url = `/local/users/${username}/password`; 
      const response = await axios.put(url, { oldPassword, newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`
        }}); 
      console.log('Password change successful:', response.data);
      logout();
      navigate('/login'); 
    } catch (error) {
      console.error('Error during password change:', error);
      setError('Error changing password. Please try again.'); 
    }
  };

  return (
    <div className="change-password-container">
      <h1>Change Password</h1>
      <form onSubmit={handleChangePassword}>
        
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          required
          autoComplete="current-password"
          className="input-field"
        />
        <br />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
          autoComplete="new-password"
          className="input-field"
        />
        <br />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          required
          autoComplete="new-password"
          className="input-field"
        />
        <br />
        {error && <p className="error-message">{error}</p>} 
        <button type="submit" className="change-password-button">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
