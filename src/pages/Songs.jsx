
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import PageHeader from "@/components/PageHeader";
import SongCard from "@/components/SongCard";
import SongTable from "@/components/SongTable";
import AudioPlayer from "@/components/AudioPlayer";
import { fetchSongs, deleteSong } from "@/api";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const response = await fetchSongs();
        setSongs(response.data);
        setFilteredSongs(response.data);
      } catch (error) {
        console.error("Error loading songs:", error);
        toast.error("Không thể tải danh sách bài hát");
      } finally {
        setLoading(false);
      }
    };
    
    loadSongs();
  }, []);
  
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSongs(songs);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = songs.filter(song => 
      song.title.toLowerCase().includes(query) || 
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    );
    
    setFilteredSongs(filtered);
  }, [searchQuery, songs]);
  
  const handleDeleteClick = (id) => {
    setSongToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (songToDelete === null) return;
    
    try {
      await deleteSong(songToDelete);
      setSongs(prevSongs => prevSongs.filter(song => song.id !== songToDelete));
      setFilteredSongs(prevSongs => prevSongs.filter(song => song.id !== songToDelete));
      toast.success("Bài hát đã được xóa thành công");
    } catch (error) {
      console.error("Error deleting song:", error);
      toast.error("Không thể xóa bài hát");
    } finally {
      setDeleteDialogOpen(false);
      setSongToDelete(null);
    }
  };
  
  const handlePlayClick = (id) => {
    const song = songs.find(s => s.id === id);
    if (song) {
      setSelectedSong(song);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Quản lý bài hát"
        description="Thêm, sửa, xóa bài hát trong hệ thống"
        addLink="/songs/add"
        addLabel="Thêm bài hát mới"
      />
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài hát..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid" className="flex items-center gap-1">
            <Grid className="h-4 w-4" />
            <span>Grid</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-1">
            <List className="h-4 w-4" />
            <span>List</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-[300px] bg-muted/30 rounded-lg animate-pulse-subtle" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredSongs.map(song => (
                <SongCard
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  album={song.album}
                  imageUrl={song.imageUrl}
                  onDelete={handleDeleteClick}
                  onPlay={handlePlayClick}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list">
          {loading ? (
            <div className="w-full h-[400px] bg-muted/30 rounded-lg animate-pulse-subtle" />
          ) : (
            <SongTable 
              songs={filteredSongs} 
              onDelete={handleDeleteClick}
              onPlay={handlePlayClick}
            />
          )}
        </TabsContent>
      </Tabs>
      
      {/* Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa bài hát này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Audio Player */}
      {selectedSong && (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
          <AudioPlayer
            songTitle={selectedSong.title}
            artistName={selectedSong.artist}
            coverImage={selectedSong.imageUrl}
          />
        </div>
      )}
    </div>
  );
};

export default Songs;
