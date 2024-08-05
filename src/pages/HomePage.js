import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [votedAlbums, setVotedAlbums] = useState([]);

    useEffect(() => {
        const fetchVotedAlbums = async () => {
            const response = await axios.get('/local/albums'); 
            const sortedAlbums = response.data.sort((a, b) => b.votes - a.votes);
            setVotedAlbums(sortedAlbums);
        };
        fetchVotedAlbums();
    }, []);

    return (
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <h1>AOTY 2024 Rankings</h1>
            {votedAlbums.map((album, index) => (
                <div 
                    key={album.id} 
                    style={{ marginBottom: '20px' }}
                >
                    <div 
                        style={{ 
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '15px',
                            maxWidth: '1000px',
                            margin: '0 auto',
                            textAlign: 'center',
                            backgroundColor: '#222',
                            position: 'relative' // Add relative positioning for the ranking number
                        }}
                    >
                        {/* Ranking Number */}
                        <div 
                            style={{ 
                                position: 'absolute', 
                                top: '10px', 
                                left: '10px', 
                                fontSize: '24px', 
                                fontWeight: 'bold', 
                                color: 'gold' // Change color as needed
                            }}
                        >
                            {index + 1}
                        </div>
                        <h1>{album.name}</h1>
                        <h2>{album.band}</h2>
                        <h2>{album.genre}</h2>
                        <h2>{album.releaseDate}</h2>
                        <h2>Type: {album.type}</h2>
                        <h2>Metal archive: <a href={album.linkURL} style={{ color: 'lightblue' }}>{album.linkURL}</a></h2>
                        <h2>Voted: {album.votes} times</h2>
                        <img 
                            src={album.coverURL} 
                            alt="Album Cover" 
                            style={{ maxWidth: '200px', maxHeight: '200px' }} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
