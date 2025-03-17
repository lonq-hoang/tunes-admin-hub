
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchSongs, fetchAlbums, fetchUsers } from "@/api";
import { toast } from "react-toastify";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import StatsCard from "@/components/StatsCard";
import AudioPlayer from "@/components/AudioPlayer";
import { Music, Album, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [songCount, setSongCount] = useState(0);
  const [albumCount, setAlbumCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentSongs, setRecentSongs] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch songs
        const songsResponse = await fetchSongs();
        setSongCount(songsResponse.data.length);
        setRecentSongs(songsResponse.data.slice(0, 5));
        
        // Generate sample chart data based on songs
        const artistCounts: Record<string, number> = {};
        songsResponse.data.forEach((song: any) => {
          artistCounts[song.artist] = (artistCounts[song.artist] || 0) + 1;
        });
        
        const chartDataArray = Object.keys(artistCounts).map(artist => ({
          name: artist,
          value: artistCounts[artist]
        }));
        
        setChartData(chartDataArray);
        
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
  
  const getRandomListeningTime = () => {
    return Math.floor(Math.random() * 10000) + 5000;
  };
  
  const formatListeningTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} giờ ${mins > 0 ? `${mins} phút` : ''}`;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        
        <StatsCard 
          title="Thời gian nghe" 
          value={formatListeningTime(getRandomListeningTime())} 
          icon={Clock}
          description="Tổng thời gian nghe nhạc"
          colorClass="text-orange-500 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Biểu đồ nghệ sĩ</CardTitle>
            <CardDescription>
              Số lượng bài hát theo nghệ sĩ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '8px',
                      borderColor: 'rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="var(--primary)" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Bài hát gần đây</CardTitle>
            <CardDescription>
              Các bài hát được thêm gần đây
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSongs.map((song, index) => (
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
      </div>
      
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
