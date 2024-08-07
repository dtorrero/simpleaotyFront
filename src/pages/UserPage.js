import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPage.css'; // Import your UserPage CSS file here

const AlbumSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [allInUse, setAllInUse] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for search
  const [addingLoading, setAddingLoading] = useState({}); // Loading state for adding albums
  const token = localStorage.getItem('token');
  const listView = localStorage.getItem('view');

  const checkSlots = async () => {
    const username = localStorage.getItem('user');
    if (!username) {
      alert('User not found');
      return;
    }

    try {
      const response = await axios.get(`/local/freeslots/${username}`);
      setAllInUse(response.data.allInUse);
    } catch (error) {
      console.error('Error checking slots:', error);
    }
  };

  useEffect(() => {
    checkSlots(); // Initial check for slots
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return; // Not empty
    setLoading(true); // Set loading to true
    try {
      const response = await axios.get(`/metalApi/search/albums/title/${searchTerm}`);
      setAlbums(response.data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const handleAddAlbum = async (album) => {
    const username = localStorage.getItem('user');
    if (!username) {
      alert('User not found');
      return;
    }

    if (allInUse) {
      setConfirmationMessage(`You have already voted for 10 albums`);
      return;
    }

    const albumData = {
      album: parseInt(album.id, 10),
      bandId: parseInt(album.band.id, 10)
    };
    console.log(albumData);

    // Set loading for this specific album
    setAddingLoading((prev) => ({ ...prev, [album.id]: true }));

    try {
      await axios.post(`/local/users/${username}/albums`, albumData, {
        headers: {
          Authorization: `Bearer ${token}`
        }});
      setConfirmationMessage('Album has been added to your collection!');
      setAlbums([]);
      setSearchTerm('');
      await checkSlots(); // Check slots again after adding the album
    } catch (error) {
      console.error('Error adding album:', error);
    } finally {
      // Reset loading for this specific album
      setAddingLoading((prev) => ({ ...prev, [album.id]: false }));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Album Search</h1>
      {allInUse ? (
        <p>You have already voted for 10 albums</p>
      ) : (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for albums..."
            style={{ backgroundColor: 'black', color: 'white', border: '1px solid white', padding: '5px' }}
          />
          <button onClick={handleSearch} style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white', border: '1px solid white' }}>Search</button>
        </>
      )}

      {confirmationMessage && <p>{confirmationMessage}</p>}

      {loading ? ( // Conditional rendering for loading state
        <div className="spinner"></div> // Use the spinner class
      ) : (
        <ul className="album-list"> {/* Apply album-list class */}
          {albums.map((album) => (
            <li key={album.id} className="album-item"> {/* Apply album-item class */}
              {album.title} by {album.band.name}
              <button
                onClick={() => handleAddAlbum(album)}
                style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white', border: '1px solid white', display: 'flex', alignItems: 'center' }}
                disabled={addingLoading[album.id]} // Disable button while loading
              >
                {addingLoading[album.id] ? (
                  <div className="spinner" style={{ width: '20px', height: '20px' }}></div> // Show spinner
                ) : (
                  'Add'
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumSearch;
