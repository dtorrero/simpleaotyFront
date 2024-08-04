import React, { useState } from 'react';
import axios from 'axios';

const AlbumSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/metalApi/search/albums/title/${searchTerm}`);
      setAlbums(response.data.slice(0, 10)); // Get the first 10 results
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleAddAlbum = async (album) => {
    const username = localStorage.getItem('user'); // Extract username from local storage
    if (!username) {
        alert('User not found');
        return;
    }

    const albumData = {
        album: parseInt(album.id, 10), // Convert Album ID to integer
        bandId: parseInt(album.band.id, 10) // Convert Band ID to integer
    };
    console.log(albumData);
    try {
        await axios.post(`/local/users/${username}/albums`, albumData);
        setConfirmationMessage('Album has been added to your collection!');
        setAlbums([]); // Reset the search results
        setSearchTerm(''); // Clear the search input
    } catch (error) {
        console.error('Error adding album:', error);
    }
};


  return (
    <div>
      <h1>Album Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for albums..."
      />
      <button onClick={handleSearch}>Search</button>

      {confirmationMessage && <p>{confirmationMessage}</p>}

      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title} by {album.band.name}
            <button onClick={() => handleAddAlbum(album)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumSearch;
