import React, { useState } from 'react';
import axios from 'axios';

const RolesPage = () => {
    const [username, setUsername] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSearchUser = async () => {
        const token = localStorage.getItem('token');
        const myuser = localStorage.getItem('user');

        if (!username) {
            alert('Please enter a username to search');
            return;
        }

        try {
            const response = await axios.post(`/local/users/search/${myuser}`, {
                username: username,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSearchResults(response.data);
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error searching user:', error);
                alert('An error occurred while searching for the user.');
            }
        }
    };

    const handleGrantAdmin = async (user) => {
        const token = localStorage.getItem('token');
        const myuser = localStorage.getItem('user');

        try {
            await axios.put(
                `/local/users/${myuser}`,
                {
                    username: user,
                    role: 'admin',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(`Admin privileges granted to ${user}`);
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error granting admin:', error);
                alert('An error occurred while granting admin privileges.');
            }
        }
    };

    const handleRevokeAdmin = async (user) => {
        const token = localStorage.getItem('token');
        const myuser = localStorage.getItem('user');

        try {
            await axios.put(
                `/local/users/${myuser}`,
                {
                    username: user,
                    role: 'revoked',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(`Admin privileges revoked from ${user}`);
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error revoking admin:', error);
                alert('An error occurred while revoking admin privileges.');
            }
        }
    };

    return (
        <div>
            <h1>Manage User Roles</h1>
            <input
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter username"
            />
            <button onClick={handleSearchUser}>Search User</button>
            <br />
            {searchResults.length > 0 ? (
                <div>
                    <h2>Search Results:</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {searchResults.map((user) => (
                            <li key={user.id}>
                                {user.username}
                                <button onClick={() => handleGrantAdmin(user.username)}>+ Admin</button>
                                <button onClick={() => handleRevokeAdmin(user.username)}>- Admin</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default RolesPage;
