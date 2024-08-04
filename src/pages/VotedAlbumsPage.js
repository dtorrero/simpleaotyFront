import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotedAlbumsPage = () => {
    const [votedAlbums, setVotedAlbums] = useState([]);
    const [albumDetails, setAlbumDetails] = useState([]);
    const [search, setSearch] = useState('');
    const username = localStorage.getItem('user');

 
    useEffect(() => {
        const fetchVotedAlbums = async () => {
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
            }
        };

        if (username) {
            fetchVotedAlbums();
        }
    }, [username]);

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={search}
                    placeholder="Search"
                />
            </div>
            <h1>Your Voted Albums</h1>
            {votedAlbums.length > 0 ? (
                votedAlbums.map((album, index) => {
                    const details = albumDetails[index]; // Get corresponding album details
                    return (
                        <div key={album.id}>
                            <h1>{album.name}</h1>
                            {details && (
                                <>
                                    <h2>Band: {details.band}</h2>
                                    <h2>Genre: {details.genre}</h2>
                                    <h2>Release Date: {details.releaseDate}</h2>
                                    <h2>Type: {details.type}</h2>
                                    <h2>Link: <a href={details.linkURL}>{details.linkURL}</a></h2>
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

