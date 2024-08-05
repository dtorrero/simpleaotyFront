import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [allInUse, setAllInUse] = useState(false);

  useEffect(() => {
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

    checkSlots();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return; // Not empty
    try {
      const response = await axios.get(`/metalApi/search/albums/title/${searchTerm}`);
      setAlbums(response.data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching albums:', error);
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
    try {
      await axios.post(`/local/users/${username}/albums`, albumData);
      setConfirmationMessage('Album has been added to your collection!');
      setAlbums([]);
      setSearchTerm('');
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', minHeight: '100vh' }}>
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

      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title} by {album.band.name}
            <button onClick={() => handleAddAlbum(album)} style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white', border: '1px solid white' }}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumSearch;
