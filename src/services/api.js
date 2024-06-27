import axios from 'axios';

const API_URL = 'https://cms.samespace.com/items/songs';

export const fetchSongs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Assuming response.data contains the songs data
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error; // Re-throw the error to handle it where fetchSongs is called
  }
};
