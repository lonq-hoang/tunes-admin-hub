
import axios from "axios";

// Đối với ứng dụng demo, chúng ta sẽ sử dụng dữ liệu mẫu
// Trong môi trường thực tế, bạn sẽ kết nối với API backend thực

const API_BASE_URL = "https://api.example.com"; // Thay thế bằng API thực của bạn

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
  ],
  albums: [
    { id: 1, title: "22", artist: "MONO", year: 2022, songCount: 7, imageUrl: "https://i.scdn.co/image/ab67616d0000b273c9fd5f487d476bd76cbcb880" },
    { id: 2, title: "m-tp M-TP", artist: "Sơn Tùng MTP", year: 2017, songCount: 10, imageUrl: "https://i.scdn.co/image/ab67616d0000b2736ac35e8707be09eebde81fea" },
    { id: 3, title: "Hoàng", artist: "Hoàng Thùy Linh", year: 2019, songCount: 12, imageUrl: "https://i.scdn.co/image/ab67616d0000b2739ff63bbfd6892c7dba49b6ed" }
  ],
  users: [
    { id: 1, username: "admin", email: "admin@example.com", role: "Admin", createdAt: "2023-01-01" },
    { id: 2, username: "user1", email: "user1@example.com", role: "User", createdAt: "2023-02-15" },
    { id: 3, username: "artist1", email: "artist@example.com", role: "Artist", createdAt: "2023-03-20" }
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

export const fetchSong = async (id: number) => {
  // In a real app: return api.get(`/songs/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const song = mockData.songs.find(song => song.id === id);
      resolve({ data: song });
    }, 300);
  });
};

export const createSong = async (songData: any) => {
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

export const updateSong = async (id: number, songData: any) => {
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

export const deleteSong = async (id: number) => {
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
export const fetchAlbums = async () => {
  // In a real app: return api.get('/albums');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: mockData.albums });
    }, 500);
  });
};

export const fetchAlbum = async (id: number) => {
  // In a real app: return api.get(`/albums/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const album = mockData.albums.find(album => album.id === id);
      resolve({ data: album });
    }, 300);
  });
};

export const createAlbum = async (albumData: any) => {
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

export const updateAlbum = async (id: number, albumData: any) => {
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

export const deleteAlbum = async (id: number) => {
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
export const fetchUsers = async () => {
  // In a real app: return api.get('/users');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: mockData.users });
    }, 500);
  });
};

export const fetchUser = async (id: number) => {
  // In a real app: return api.get(`/users/${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const user = mockData.users.find(user => user.id === id);
      resolve({ data: user });
    }, 300);
  });
};

export const createUser = async (userData: any) => {
  // In a real app: return api.post('/users', userData);
  return new Promise(resolve => {
    setTimeout(() => {
      const newUser = {
        id: mockData.users.length + 1,
        ...userData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      mockData.users.push(newUser);
      resolve({ data: newUser });
    }, 500);
  });
};

export const updateUser = async (id: number, userData: any) => {
  // In a real app: return api.put(`/users/${id}`, userData);
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockData.users.findIndex(user => user.id === id);
      if (index !== -1) {
        mockData.users[index] = { ...mockData.users[index], ...userData };
        resolve({ data: mockData.users[index] });
      }
    }, 500);
  });
};

export const deleteUser = async (id: number) => {
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
