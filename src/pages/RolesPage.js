import React, { useState } from 'react';
import axios from 'axios';

const RolesPage = () => {
    const [username, setUsername] = useState('');

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleGrantAdmin = async () => {
        const token = localStorage.getItem('token');
        const myuser = localStorage.getItem('user');

        if (!username) {
            alert('Please enter a username');
            return;
        }

        try {
            const response = await axios.put(
                `/local/users/${myuser}`,
                {
                    username: username,
                    role: 'admin',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(`Admin privileges granted to ${username}`);
            setUsername('');
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error granting admin:', error);
                alert('An error occurred while granting admin privileges.');
            }
        }
    };

    const handleRevokeAdmin = async () => {
        const token = localStorage.getItem('token');
        const myuser = localStorage.getItem('user');

        if (!username) {
            alert('Please enter a username');
            return;
        }

        try {
            const response = await axios.put(
                `/local/users/${myuser}`,
                {
                    username: username,
                    role: 'revoked',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(`Admin privileges revoked from ${username}`);
            setUsername('');
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
            /><br></br>
            <button onClick={handleGrantAdmin}>+ Admin</button>
            <button onClick={handleRevokeAdmin}>- Admin</button>
        </div>
    );
};

export default RolesPage;
