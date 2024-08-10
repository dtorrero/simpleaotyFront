import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [amount, setAmount] = useState(1); 
  const [links, setLinks] = useState([]); 
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const token = localStorage.getItem('token'); 
  const user = localStorage.getItem('user'); 

  const handleInputChange = (e) => {
    const value = Math.min(Math.max(e.target.value, 1), 10); 
    setAmount(value);
  };

  const handleGenerateLinks = async () => {
    try {
      const response = await axios.post(`/local/generate-link/${user}/${amount}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLinks(response.data.links); 
      setError(''); 
      setSuccessMessage(''); 
    } catch (err) {
      setError('Failed to generate links. Please try again.');
      setLinks([]);
      setSuccessMessage(''); 
    }
  };

  const handleCopyLinks = () => {
    const linksToCopy = links.join('\n'); 
    navigator.clipboard.writeText(linksToCopy)
      .then(() => {
        setSuccessMessage('Links copied to clipboard!'); 
        setError(''); 
      })
      .catch(err => {
        setError('Failed to copy links.'); 
        setSuccessMessage(''); 
      });
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
            <>
              {links.map((link, index) => <p key={index}>{link}</p>)}
              <button onClick={handleCopyLinks}>Copy Links to Clipboard</button>
            </>
          ) : (
            <p>No links generated yet.</p>
          )}
        </div>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AdminPage;
