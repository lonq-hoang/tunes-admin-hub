
import axios from "axios";

// For demo purposes, we'll use mock data
// In a real app, you would connect to your backend API

const API_BASE_URL = "https://api.example.com"; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Mock data for demo
const mockData = {
  songs: [
    { id: 1, title: "Hạ Còn Vương Nắng", artist: "DatKaa", album: "Single", duration: "04:22", year: 2023, imageUrl: "https://i.scdn.co/image/ab67616d0000b273496e92aaa8f7a25e501dcb86" },
    { id: 2, title: "Chúng Ta Của Hiện Tại", artist: "Sơn Tùng MTP", album: "Single", duration: "03:45", year: 2022, imageUrl: "https://i.scdn.co/image/ab67616d0000b2739267157567a540ea84212932" },
  ]
};

// API functions for songs
export const fetchSongs = async () => {
  // In a real app: return api.get('/songs');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: mockData.songs });
    }, 500);
  });
};

export const createSong = async (formData) => {
  // In a real app: return api.post('/songs', formData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newSong = {
        id: mockData.songs.length + 1,
        title: formData.get('title'),
        artist: formData.get('artist'),
        album: formData.get('album'),
        duration: formData.get('duration'),
        year: formData.get('year'),
        imageUrl: formData.get('image') || "https://i.scdn.co/image/ab67616d0000b273496e92aaa8f7a25e501dcb86"
      };
      mockData.songs.push(newSong);
      resolve({ data: newSong });
    }, 500);
  });
};
