import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotedAlbumsPage = () => {
    const [votedAlbums, setVotedAlbums] = useState([]);
    const [albumDetails, setAlbumDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCompact, setIsCompact] = useState(false); // New state for compact view
    const username = localStorage.getItem('user');

    useEffect(() => {
        const fetchVotedAlbums = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/local/votes/${username}`);
                const albumsArray = Object.keys(response.data).map(key => ({
                    name: key,
                    id: response.data[key],
                }));

                setVotedAlbums(albumsArray);

                const detailsPromises = albumsArray.map(album =>
                    axios.get(`/local/albums/${album.id}`)
                );

                const detailsResponses = await Promise.all(detailsPromises);
                const detailsData = detailsResponses.map(res => res.data);
                setAlbumDetails(detailsData);
                
            } catch (error) {
                console.error('Error fetching voted albums:', error);
                setVotedAlbums([]);
                setAlbumDetails([]);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchVotedAlbums();
        }
    }, [username]);

    const removeAlbum = async (albumId) => {
        try {
            await axios.delete(`/local/users/${username}/albums/${albumId}`);
            setVotedAlbums(prevAlbums => prevAlbums.filter(album => album.id !== albumId));
            setAlbumDetails(prevDetails => prevDetails.filter((_, index) => votedAlbums[index].id !== albumId));
        } catch (error) {
            console.error('Error removing album:', error);
        }
    };

    return (
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
            <h1>Your Voted Albums ({votedAlbums.length} / 10)</h1>
            <button 
                onClick={() => setIsCompact(prev => !prev)}
                style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                {isCompact ? 'Show Full List' : 'Compact List'}
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : votedAlbums.length > 0 ? (
                votedAlbums.map((album, index) => {
                    const details = albumDetails[index];
                    return (
                        <div 
                            key={album.id} 
                            style={{ 
                                marginBottom: '20px',
                            }}
                        >
                            <div 
                                style={{ 
                                    border: '1px solid #ccc', 
                                    borderRadius: '10px', 
                                    padding: '15px', 
                                    maxWidth: '1000px', 
                                    margin: '0 auto', 
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)' // Optional: Slightly transparent background for album details
                                }}
                            >
                                {details && (
                                    <>
                                        {isCompact ? (
                                            <div style={{ fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <p style={{ fontWeight: 'bold' }}>
                                                        <a 
                                                            href={details.linkURL} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            style={{ color: 'lightblue', textDecoration: 'none' }}
                                                        >
                                                            {details.band} - {details.name}
                                                        </a>
                                                    </p>
                                                </div>
                                                <button onClick={() => removeAlbum(album.id)} style={{ padding: '5px 10px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remove</button>
                                            </div>
                                        ) : (
                                            <>
                                                <h1>{details.band}</h1>
                                                <h2>
                                                    <a 
                                                        href={details.linkURL} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        style={{ color: 'white', textDecoration: 'none' }}
                                                    >
                                                        {details.name}
                                                    </a>
                                                </h2>
                                                <h3>{details.genre}</h3>
                                                <h3>{details.releaseDate}</h3>
                                                <h3>{details.type}</h3>
                                                <h4>
                                                    <a 
                                                        href={details.linkURL} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        style={{ color: 'white' }}
                                                    >
                                                        {details.linkURL}
                                                    </a>
                                                </h4>
                                                <img 
                                                    src={details.coverURL} 
                                                    alt="Album Cover" 
                                                    style={{ maxWidth: '200px', maxHeight: '200px' }} 
                                                />
                                                <div>
                                                    <button onClick={() => removeAlbum(album.id)} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remove</button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No voted albums found.</p>
            )}
        </div>
    );
};

export default VotedAlbumsPage;
