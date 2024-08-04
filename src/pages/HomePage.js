import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [votedAlbums, setVotedAlbums] = useState([]);

  useEffect(() => {
      
      const fetchVotedAlbums = async () => {
          const response = await axios.get('/local/albums'); 
          // Ordenar por votos
          const sortedAlbums = response.data.sort((a, b) => b.votes - a.votes);
          setVotedAlbums(sortedAlbums);
      };
      fetchVotedAlbums();
  }, []);

  return (
      <div>
          <h1>AOTY 2024 Rankings</h1>
          {votedAlbums.map(album => (
              <div key={album.id}>
                  <h1>{album.name}</h1>
                  <h2>{album.band}</h2>
                  <h2>{album.genre}</h2>
                  <h2>{album.releaseDate}</h2>
                  <h2>Type : {album.type}</h2>
                  <h2>Metal archive : {album.linkURL}</h2>
                  <h2>Voted : {album.votes} times</h2>
                  <img src={album.coverURL} alt="Album Cover" />
              </div>
          ))}
      </div>
  );
};

export default HomePage;

