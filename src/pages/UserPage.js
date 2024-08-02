import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch albums from the backend
    const fetchAlbums = async () => {
      const response = await axios.get('/api/albums'); // Adjust the endpoint as needed
      setAlbums(response.data);
    };
    fetchAlbums();
  }, []);

  const handleVote = async (albumId) => {
    // Handle voting logic
    await axios.post('/api/vote', { albumId }); // Adjust the endpoint as needed
  };

  return (
    <div>
      <h1>Vote for Your Favorite Albums</h1>
      {albums.map(album => (
        <div key={album.id}>
          <h2>{album.title}</h2>
          <button onClick={() => handleVote(album.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
