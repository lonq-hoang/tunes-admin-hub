
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import PageHeader from "@/components/PageHeader";
import AlbumCard from "@/components/AlbumCard";
import { fetchAlbums, deleteAlbum } from "@/api";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Albums = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        setLoading(true);
        const response = await fetchAlbums();
        setAlbums(response.data);
        setFilteredAlbums(response.data);
      } catch (error) {
        console.error("Error loading albums:", error);
        toast.error("Không thể tải danh sách album");
      } finally {
        setLoading(false);
      }
    };
    
    loadAlbums();
  }, []);
  
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAlbums(albums);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = albums.filter(album => 
      album.title.toLowerCase().includes(query) || 
      album.artist.toLowerCase().includes(query)
    );
    
    setFilteredAlbums(filtered);
  }, [searchQuery, albums]);
  
  const handleDeleteClick = (id: number) => {
    setAlbumToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (albumToDelete === null) return;
    
    try {
      await deleteAlbum(albumToDelete);
      setAlbums(prevAlbums => prevAlbums.filter(album => album.id !== albumToDelete));
      setFilteredAlbums(prevAlbums => prevAlbums.filter(album => album.id !== albumToDelete));
      toast.success("Album đã được xóa thành công");
    } catch (error) {
      console.error("Error deleting album:", error);
      toast.error("Không thể xóa album");
    } finally {
      setDeleteDialogOpen(false);
      setAlbumToDelete(null);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Quản lý album"
        description="Thêm, sửa, xóa album trong hệ thống"
        addLink="/albums/add"
        addLabel="Thêm album mới"
      />
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm album..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-[300px] bg-muted/30 rounded-lg animate-pulse-subtle" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAlbums.map(album => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              artist={album.artist}
              year={album.year}
              songCount={album.songCount}
              imageUrl={album.imageUrl}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}
      
      {/* Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa album này? Hành động này không thể hoàn tác.
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
    </div>
  );
};

export default Albums;
