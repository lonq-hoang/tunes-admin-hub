
import axios from "axios";

// Đối với ứng dụng demo, chúng ta sẽ sử dụng dữ liệu mẫu
// Trong môi trường thực tế, bạn sẽ kết nối với API backend thực

const API_BASE_URL = "https://api.example.com"; // Thay thế bằng API thực của bạn

// Định nghĩa kiểu dữ liệu
interface ApiResponse<T> {
  data: T;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  year: number;
  imageUrl: string;
}

interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
  songCount: number;
  imageUrl: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Password is optional in responses
  role: string;
  createdAt: string;
}

// Tạo instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Dữ liệu mẫu cho demo
const mockData = {
  songs: [
    { id: 1, title: "Hạ Còn Vương Nắng", artist: "DatKaa", album: "Single", duration: "04:22", year: 2023, imageUrl: "https://i.scdn.co/image/ab67616d0000b273496e92aaa8f7a25e501dcb86" },
    { id: 2, title: "Chúng Ta Của Hiện Tại", artist: "Sơn Tùng MTP", album: "Single", duration: "03:45", year: 2022, imageUrl: "https://i.scdn.co/image/ab67616d0000b2739267157567a540ea84212932" },
    { id: 3, title: "Waiting For You", artist: "MONO", album: "22", duration: "04:12", year: 2022, imageUrl: "https://i.scdn.co/image/ab67616d0000b273c9fd5f487d476bd76cbcb880" },
    { id: 4, title: "Có Chắc Yêu Là Đây", artist: "Sơn Tùng MTP", album: "Single", duration: "03:10", year: 2020, imageUrl: "https://i.scdn.co/image/ab67616d0000b273eb479abe6c3f5adae4ebc2fb" },
    { id: 5, title: "Muộn Rồi Mà Sao Còn", artist: "Sơn Tùng MTP", album: "Single", duration: "04:35", year: 2021, imageUrl: "https://i.scdn.co/image/ab67616d0000b273e6c142f6c1f2c6586fabbf4f" },
  ] as Song[],
  albums: [
    { id: 1, title: "22", artist: "MONO", year: 2022, songCount: 7, imageUrl: "https://i.scdn.co/image/ab67616d0000b273c9fd5f487d476bd76cbcb880" },
    { id: 2, title: "m-tp M-TP", artist: "Sơn Tùng MTP", year: 2017, songCount: 10, imageUrl: "https://i.scdn.co/image/ab67616d0000b2736ac35e8707be09eebde81fea" },
    { id: 3, title: "Hoàng", artist: "Hoàng Thùy Linh", year: 2019, songCount: 12, imageUrl: "https://i.scdn.co/image/ab67616d0000b2739ff63bbfd6892c7dba49b6ed" }
  ] as Album[],
  users: [
    { id: 1, username: "admin", email: "admin@example.com", password: "admin123", role: "Admin", createdAt: "2023-01-01" },
    { id: 2, username: "user1", email: "user1@example.com", password: "user123", role: "User", createdAt: "2023-02-15" },
    { id: 3, username: "artist1", email: "artist@example.com", password: "artist123", role: "Artist", createdAt: "2023-03-20" }
  ] as User[]
};

// API functions for songs
export const fetchSongs = async (): Promise<ApiResponse<Song[]>> => {
  // In a real app: return api.get('/songs');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: mockData.songs });
    }, 500);
  });
};

export const fetchSong = async (id: number): Promise<ApiResponse<Song>> => {
  // In a real app: return api.get(`/songs/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const song = mockData.songs.find(song => song.id === id);
      resolve({ data: song as Song });
    }, 300);
  });
};

export const createSong = async (songData: Omit<Song, 'id'>): Promise<ApiResponse<Song>> => {
  // In a real app: return api.post('/songs', songData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newSong = {
        id: mockData.songs.length + 1,
        ...songData
      };
      mockData.songs.push(newSong);
      resolve({ data: newSong });
    }, 500);
  });
};

export const updateSong = async (id: number, songData: Partial<Song>): Promise<ApiResponse<Song>> => {
  // In a real app: return api.put(`/songs/${id}`, songData);
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockData.songs.findIndex(song => song.id === id);
      if (index !== -1) {
        mockData.songs[index] = { ...mockData.songs[index], ...songData };
        resolve({ data: mockData.songs[index] });
      }
    }, 500);
  });
};

export const deleteSong = async (id: number): Promise<ApiResponse<{ success: boolean }>> => {
  // In a real app: return api.delete(`/songs/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockData.songs.findIndex(song => song.id === id);
      if (index !== -1) {
        mockData.songs.splice(index, 1);
      }
      resolve({ data: { success: true } });
    }, 500);
  });
};

// API functions for albums
export const fetchAlbums = async (): Promise<ApiResponse<Album[]>> => {
  // In a real app: return api.get('/albums');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: mockData.albums });
    }, 500);
  });
};

export const fetchAlbum = async (id: number): Promise<ApiResponse<Album>> => {
  // In a real app: return api.get(`/albums/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const album = mockData.albums.find(album => album.id === id);
      resolve({ data: album as Album });
    }, 300);
  });
};

export const createAlbum = async (albumData: Omit<Album, 'id'>): Promise<ApiResponse<Album>> => {
  // In a real app: return api.post('/albums', albumData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newAlbum = {
        id: mockData.albums.length + 1,
        ...albumData
      };
      mockData.albums.push(newAlbum);
      resolve({ data: newAlbum });
    }, 500);
  });
};

export const updateAlbum = async (id: number, albumData: Partial<Album>): Promise<ApiResponse<Album>> => {
  // In a real app: return api.put(`/albums/${id}`, albumData);
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockData.albums.findIndex(album => album.id === id);
      if (index !== -1) {
        mockData.albums[index] = { ...mockData.albums[index], ...albumData };
        resolve({ data: mockData.albums[index] });
      }
    }, 500);
  });
};

export const deleteAlbum = async (id: number): Promise<ApiResponse<{ success: boolean }>> => {
  // In a real app: return api.delete(`/albums/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockData.albums.findIndex(album => album.id === id);
      if (index !== -1) {
        mockData.albums.splice(index, 1);
      }
      resolve({ data: { success: true } });
    }, 500);
  });
};

// API functions for users
export const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
  // In a real app: return api.get('/users');
  return new Promise(resolve => {
    setTimeout(() => {
      // Don't return passwords in the response
      const usersWithoutPasswords = mockData.users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      resolve({ data: usersWithoutPasswords });
    }, 500);
  });
};

export const fetchUser = async (id: number): Promise<ApiResponse<User>> => {
  // In a real app: return api.get(`/users/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const user = mockData.users.find(user => user.id === id);
      if (user) {
        // Don't return password in the response
        const { password, ...userWithoutPassword } = user;
        resolve({ data: userWithoutPassword as User });
      }
    }, 300);
  });
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<ApiResponse<User>> => {
  // In a real app: return api.post('/users', userData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newUser = {
        id: mockData.users.length + 1,
        ...userData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      mockData.users.push(newUser);
      
      // Don't return password in the response
      const { password, ...userWithoutPassword } = newUser;
      resolve({ data: userWithoutPassword });
    }, 500);
  });
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<ApiResponse<User>> => {
  // In a real app: return api.put(`/users/${id}`, userData);
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockData.users.findIndex(user => user.id === id);
      if (index !== -1) {
        mockData.users[index] = { ...mockData.users[index], ...userData };
        
        // Don't return password in the response
        const { password, ...userWithoutPassword } = mockData.users[index];
        resolve({ data: userWithoutPassword });
      }
    }, 500);
  });
};

export const deleteUser = async (id: number): Promise<ApiResponse<{ success: boolean }>> => {
  // In a real app: return api.delete(`/users/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockData.users.findIndex(user => user.id === id);
      if (index !== -1) {
        mockData.users.splice(index, 1);
      }
      resolve({ data: { success: true } });
    }, 500);
  });
};
