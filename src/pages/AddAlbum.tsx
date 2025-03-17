
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createAlbum } from "@/api";
import { ArrowLeft, Upload, X } from "lucide-react";

const AddAlbum = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [songCount, setSongCount] = useState("0");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
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
    
    if (!title || !artist) {
      toast.error("Vui lòng điền tên album và nghệ sĩ");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const albumData = {
        title,
        artist,
        year: parseInt(year),
        songCount: parseInt(songCount),
        imageUrl: image || "https://i.scdn.co/image/ab67616d0000b273c9fd5f487d476bd76cbcb880"
      };
      
      await createAlbum(albumData);
      toast.success("Thêm album thành công!");
      navigate("/albums");
    } catch (error) {
      console.error("Error creating album:", error);
      toast.error("Không thể thêm album");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/albums")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <h1 className="text-3xl font-bold">Thêm album mới</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin album</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tên album</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Nhập tên album"
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
                    <Label htmlFor="songCount">Số lượng bài hát</Label>
                    <Input
                      id="songCount"
                      type="number"
                      min="0"
                      value={songCount}
                      onChange={(e) => setSongCount(e.target.value)}
                      placeholder="Số lượng bài hát"
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? "Đang thêm..." : "Thêm album"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ảnh bìa album</CardTitle>
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
                        alt="Album cover" 
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

export default AddAlbum;
