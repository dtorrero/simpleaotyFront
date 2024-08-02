import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:5000/api'; // Adjust as needed

// Function to fetch albums
export const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/albums`);
    return response.data; // Return the data for use in components
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

// You can add more API functions here, e.g., for voting, fetching voted albums, etc.
