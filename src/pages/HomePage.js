import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [votedAlbums, setVotedAlbums] = useState([]);
    
    
    const [isCompact, setIsCompact] = useState(() => {
        const listView = localStorage.getItem('isCompact');
        return listView === 'true'; 
    });

    useEffect(() => {
        const fetchVotedAlbums = async () => {
            const response = await axios.get('/local/albums'); 
            const sortedAlbums = response.data.sort((a, b) => b.votes - a.votes);
            setVotedAlbums(sortedAlbums);
        };
        fetchVotedAlbums();
    }, []);

    const toggleCompactView = () => {
        setIsCompact(prevState => {
            const newState = !prevState; 
            localStorage.setItem('isCompact', newState ? 'true' : 'false'); 
            return newState; 
        });
    };

    // Add global styles for the body and html
    useEffect(() => {
        document.body.style.backgroundColor = 'black';
        document.body.style.margin = '0'; // Remove default margin
        document.body.style.color = 'white'; // Set default text color
        document.documentElement.style.height = '100%'; // Ensure full height
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>AOTY 2024 Rankings</h1>
            <button onClick={toggleCompactView} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {isCompact ? 'Show Full List' : 'Show Compact List'}
            </button>
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
                            position: 'relative'
                        }}
                    >
                        <div 
                            style={{ 
                                position: 'absolute', 
                                top: '10px', 
                                left: '10px', 
                                fontSize: '24px', 
                                fontWeight: 'bold', 
                                color: 'gold'
                            }}
                        >
                            {index + 1}
                        </div>
                        {isCompact ? (
                            <>
                                <h1 style={{ fontSize: '16px', margin: '5px 0', display: 'inline-block' }}>
                                    <a 
                                        href={album.linkURL} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ color: 'lightblue', textDecoration: 'none' }}
                                    >
                                        {album.band} - {album.name}
                                    </a>
                                </h1>
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '10px', 
                                    right: '10px', 
                                    fontSize: '16px', 
                                    color: 'white' 
                                }}>
                                    Votes: {album.votes}
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>
                                    <a 
                                        href={album.linkURL} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ color: 'white', textDecoration: 'none' }}
                                    >
                                        {album.name}
                                    </a>
                                </h1>
                                <h2>{album.band}</h2>
                                <h2>{album.genre}</h2>
                                <h2>{album.releaseDate}</h2>
                                <h2>Type: {album.type}</h2>
                                <h2>Metal archive: 
                                    <a 
                                        href={album.linkURL} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ color: 'lightblue' }}
                                    >
                                        {album.linkURL}
                                    </a>
                                </h2>
                                <h2>Votes: {album.votes} times</h2>
                                <img 
                                    src={album.coverURL} 
                                    alt="Album Cover" 
                                    style={{ maxWidth: '200px', maxHeight: '200px' }} 
                                />
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
