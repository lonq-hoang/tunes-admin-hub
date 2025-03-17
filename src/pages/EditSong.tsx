
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { fetchSong, updateSong } from "@/api";
import { ArrowLeft, Upload, X } from "lucide-react";

const EditSong = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadSong = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await fetchSong(parseInt(id));
        const song = response.data;
        
        setTitle(song.title);
        setArtist(song.artist);
        setAlbum(song.album);
        setDuration(song.duration);
        setYear(song.year.toString());
        setImage(song.imageUrl);
      } catch (error) {
        console.error("Error loading song:", error);
        toast.error("Không thể tải thông tin bài hát");
        navigate("/songs");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSong();
  }, [id, navigate]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !title || !artist) {
      toast.error("Vui lòng điền tên bài hát và nghệ sĩ");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const songData = {
        title,
        artist,
        album: album || "Single",
        duration: duration || "00:00",
        year: parseInt(year),
        imageUrl: image || "https://i.scdn.co/image/ab67616d0000b273496e92aaa8f7a25e501dcb86" // Placeholder image
      };
      
      await updateSong(parseInt(id), songData);
      toast.success("Cập nhật bài hát thành công!");
      navigate("/songs");
    } catch (error) {
      console.error("Error updating song:", error);
      toast.error("Không thể cập nhật bài hát");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse-subtle h-10 w-10 rounded-full bg-primary/30"></div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/songs")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <h1 className="text-3xl font-bold">Chỉnh sửa bài hát</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin bài hát</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tên bài hát</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Nhập tên bài hát"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="artist">Nghệ sĩ</Label>
                    <Input
                      id="artist"
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      placeholder="Nhập tên nghệ sĩ"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="album">Album</Label>
                    <Input
                      id="album"
                      value={album}
                      onChange={(e) => setAlbum(e.target.value)}
                      placeholder="Nhập tên album (để trống nếu là single)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Năm phát hành</Label>
                    <Input
                      id="year"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear().toString()}
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Nhập năm phát hành"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Thời lượng</Label>
                    <Input
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Ví dụ: 03:45"
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ảnh bìa bài hát</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div 
                  className="w-full aspect-square border-2 border-dashed rounded-md overflow-hidden flex items-center justify-center relative"
                >
                  {image ? (
                    <>
                      <img 
                        src={image} 
                        alt="Song cover" 
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={clearImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div 
                      className="flex flex-col items-center justify-center p-6 text-center cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium mb-1">Tải ảnh lên</p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG or GIF (Tối đa 2MB)
                      </p>
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={triggerFileInput}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {image ? "Thay đổi ảnh" : "Chọn ảnh"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditSong;
