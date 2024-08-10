import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [amount, setAmount] = useState(1); 
  const [links, setLinks] = useState([]); 
  const [error, setError] = useState(''); 
  const token = localStorage.getItem('token'); 
  const user = localStorage.getItem('user'); 

  const handleInputChange = (e) => {
    const value = Math.min(Math.max(e.target.value, 1), 10); 
    setAmount(value);
  };

  const handleGenerateLinks = async () => {
    try {
      const response = await axios.get(`/local/generate-link/${user}/${amount}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLinks(response.data.links); 
      setError(''); 
    } catch (err) {
      setError('Failed to generate links. Please try again.');
      setLinks([]);
    }
  };

  return (
    <div>
      <h1>Admin Stuff</h1>
      <p>Welcome :)</p>
      <div>
        <label>
          Amount of links to generate:
          <input
            type="number"
            value={amount}
            onChange={handleInputChange}
            min="1"
            max="10"
          />
        </label>
        <button onClick={handleGenerateLinks}>Generate Links</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Generated Links:</h2>
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          {links.length > 0 ? (
            links.map((link, index) => <p key={index}>{link}</p>)
          ) : (
            <p>No links generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
