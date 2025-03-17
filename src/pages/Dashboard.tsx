
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchSongs, fetchAlbums, fetchUsers } from "@/api";
import { toast } from "react-toastify";
import StatsCard from "@/components/StatsCard";
import AudioPlayer from "@/components/AudioPlayer";
import { Music, Album, Users } from "lucide-react";

const Dashboard = () => {
  const [songCount, setSongCount] = useState(0);
  const [albumCount, setAlbumCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentSongs, setRecentSongs] = useState<any[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch songs
        const songsResponse = await fetchSongs();
        setSongCount(songsResponse.data.length);
        setRecentSongs(songsResponse.data.slice(0, 5));
        
        // Fetch albums
        const albumsResponse = await fetchAlbums();
        setAlbumCount(albumsResponse.data.length);
        
        // Fetch users
        const usersResponse = await fetchUsers();
        setUserCount(usersResponse.data.length);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Không thể tải dữ liệu dashboard");
      }
    };
    
    loadData();
  }, []);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="Tổng số bài hát" 
          value={songCount} 
          icon={Music}
          description="Tổng số bài hát trong hệ thống"
          colorClass="text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
        />
        
        <StatsCard 
          title="Tổng số album" 
          value={albumCount} 
          icon={Album}
          description="Tổng số album trong hệ thống"
          colorClass="text-purple-500 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300"
        />
        
        <StatsCard 
          title="Tổng số người dùng" 
          value={userCount} 
          icon={Users}
          description="Tổng số người dùng đã đăng ký"
          colorClass="text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-300"
        />
      </div>
      
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Bài hát gần đây</CardTitle>
          <CardDescription>
            Các bài hát được thêm gần đây
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSongs.map((song) => (
              <div 
                key={song.id}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={song.imageUrl} 
                    alt={song.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{song.title}</h3>
                  <p className="text-xs text-muted-foreground">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {recentSongs.length > 0 && (
        <div className="mt-6">
          <AudioPlayer 
            songTitle={recentSongs[0].title}
            artistName={recentSongs[0].artist}
            coverImage={recentSongs[0].imageUrl}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
