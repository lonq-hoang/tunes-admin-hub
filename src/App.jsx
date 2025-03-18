
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import AddSong from "./pages/AddSong";
import EditSong from "./pages/EditSong";
import Albums from "./pages/Albums";
import AddAlbum from "./pages/AddAlbum";
import EditAlbum from "./pages/EditAlbum";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="songs" element={<Songs />} />
          <Route path="songs/add" element={<AddSong />} />
          <Route path="songs/edit/:id" element={<EditSong />} />
          <Route path="albums" element={<Albums />} />
          <Route path="albums/add" element={<AddAlbum />} />
          <Route path="albums/edit/:id" element={<EditAlbum />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
