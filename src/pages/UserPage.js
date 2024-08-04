import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [allInUse, setAllInUse] = useState(false); // State to track if all slots are in use

  useEffect(() => {
    const checkSlots = async () => {
      const username = localStorage.getItem('user'); // Extract username from local storage
      if (!username) {
        alert('User not found');
        return;
      }

      try {
        const response = await axios.get(`/local/freeslots/${username}`);
        setAllInUse(response.data.allInUse); // Set the state based on the API response
      } catch (error) {
        console.error('Error checking slots:', error);
      }
    };

    checkSlots(); // Call the function to check slots on component mount
  }, []); // Empty dependency array to run only once on mount

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

    // Check if the user has already voted for 10 albums
    if (allInUse) {
      setConfirmationMessage(`You have already voted for 10 albums`);
      return; // Exit if all slots are in use
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
      {allInUse ? (
        <p>You have already voted for 10 albums</p> // Display message if all slots are in use
      ) : (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for albums..."
          />
          <button onClick={handleSearch}>Search</button>
        </>
      )}

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
