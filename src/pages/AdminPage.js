import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [amount, setAmount] = useState(1); 
  const [links, setLinks] = useState([]); 
  const [linkError, setLinkError] = useState(''); 
  const [tokenError, setTokenError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [tokens, setTokens] = useState([]); 
  const [tokenStatus, setTokenStatus] = useState('Active'); 
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
      setLinkError(''); 
      setSuccessMessage(''); 
      fetchTokens('Active'); 
    } catch (err) {
      setLinkError('Failed to generate links. Please try again.');
      setLinks([]);
      setSuccessMessage(''); 
    }
  };

  const fetchTokens = async (status) => {
    try {
      const response = await axios.get(`/local/tokens/${user}/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTokens(response.data.slice(0, 30)); 
      setTokenError(''); 
    } catch (err) {
      setTokenError('Failed to fetch tokens. Please try again.');
    }
  };

  const handleCopyLinks = () => {
    const linksToCopy = links.join('\n'); 
    navigator.clipboard.writeText(linksToCopy)
      .then(() => {
        setSuccessMessage('Links copied to clipboard!'); 
        setLinkError(''); 
      })
      .catch(err => {
        setLinkError('Failed to copy links.'); 
        setSuccessMessage(''); 
      });
  };

  const handleCopyTokens = () => {
    const tokensToCopy = tokens.map(token => `${token.token} (Used: ${token.used === 0 ? 'No' : 'Yes'})`).join('\n');
    navigator.clipboard.writeText(tokensToCopy)
      .then(() => {
        setSuccessMessage('Tokens copied to clipboard!'); 
        setTokenError(''); 
      })
      .catch(err => {
        setTokenError('Failed to copy tokens.'); 
      });
  };

  const handleToggleTokenStatus = () => {
    const newStatus = tokenStatus === 'Active' ? 'Used' : 'Active';
    setTokenStatus(newStatus);
    fetchTokens(newStatus);
  };

  useEffect(() => {
    fetchTokens(tokenStatus); 
  }, [tokenStatus]);

  return (
    <div>
      <h1>Admin Stuff</h1>
      <p>Welcome ¯\_(ツ)_/¯</p>
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
      {linkError && <p style={{ color: 'red' }}>{linkError}</p>}
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
      
      <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px', textAlign: 'center' }}>
        <h2>{tokenStatus} Links:</h2>
        {tokenError && <p style={{ color: 'red' }}>{tokenError}</p>}
        <button onClick={handleToggleTokenStatus}>Show {tokenStatus === 'Active' ? 'Used' : 'Active'} Links</button>
        <button onClick={handleCopyTokens} style={{ marginLeft: '10px' }}>Copy All Links to Clipboard</button>
        <div style={{ marginTop: '10px' }}>
          {tokens.length > 0 ? (
            tokens.map((token) => (
              <div key={token.token} style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
                <span>{token.token} (Used: {token.used === 0 ? 'No' : 'Yes'})</span>
                <span style={{ marginLeft: '10px', fontStyle: 'italic', color: '#555' }}>Created At: {token.createdAt}</span>
              </div>
            ))
          ) : (
            <p>No tokens found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
