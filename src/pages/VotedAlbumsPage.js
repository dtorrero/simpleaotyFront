import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotedAlbumsPage = () => {
    const [votedAlbums, setVotedAlbums] = useState([]);
    const [albumDetails, setAlbumDetails] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true); // New loading state
    const username = localStorage.getItem('user');

    useEffect(() => {
        const fetchVotedAlbums = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get(`/local/votes/${username}`);

                // Transform the response object into an array of album objects
                const albumsArray = Object.keys(response.data).map(key => ({
                    name: key, // Album name
                    id: response.data[key], // Album ID
                }));

                setVotedAlbums(albumsArray);

                // Fetch album details for each album ID
                const detailsPromises = albumsArray.map(album =>
                    axios.get(`/local/albums/${album.id}`)
                );

                const detailsResponses = await Promise.all(detailsPromises);
                const detailsData = detailsResponses.map(res => res.data);
                setAlbumDetails(detailsData);
                
            } catch (error) {
                console.error('Error fetching voted albums:', error);
                setVotedAlbums([]); // Reset to an empty array on error
                setAlbumDetails([]); // Reset album details on error
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        if (username) {
            fetchVotedAlbums();
        }
    }, [username]);

    return (
        <div>
            <h1>Your Voted Albums</h1>
            {loading ? ( // Check if loading
                <p>Loading...</p> // Display loading message or animation
            ) : votedAlbums.length > 0 ? (
                votedAlbums.map((album, index) => {
                    const details = albumDetails[index]; // Get corresponding album details
                    return (
                        <div key={album.id}>
                            {details && (
                                <>
                                    <h1>{details.band}</h1>
                                    <h2>{details.name}</h2>
                                    <h3>{details.genre}</h3>
                                    <h3>{details.releaseDate}</h3>
                                    <h3>{details.type}</h3>
                                    <h4><a href={details.linkURL}>{details.linkURL}</a></h4>
                                    <img src={details.coverURL} alt="Album Cover" />
                                </>
                            )}
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
