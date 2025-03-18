
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createSong } from "@/api";
import { ArrowLeft, Upload, X, Music } from "lucide-react";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAudioChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAudioFile(file);
      
      // Get duration from audio file
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.onloadedmetadata = () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        setDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      };
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const triggerAudioInput = () => {
    audioInputRef.current?.click();
  };
  
  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearAudio = () => {
    setAudioFile(null);
    if (audioInputRef.current) {
      audioInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !artist) {
      toast.error("Vui lòng điền tên bài hát và nghệ sĩ");
      return;
    }

    if (!audioFile) {
      toast.error("Vui lòng tải lên file nhạc");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const songData = {
        title,
        artist,
        album: album || "Single",
        duration,
        year: parseInt(year),
        imageUrl: image || "https://i.scdn.co/image/ab67616d0000b273496e92aaa8f7a25e501dcb86",
        audioFile
      };
      
      await createSong(songData);
      toast.success("Thêm bài hát thành công!");
      navigate("/songs");
    } catch (error) {
      console.error("Error creating song:", error);
      toast.error("Không thể thêm bài hát");
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
          onClick={() => navigate("/songs")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <h1 className="text-3xl font-bold">Thêm bài hát mới</h1>
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
                      placeholder="Tự động lấy từ file nhạc"
                      readOnly
                    />
                  </div>
                </div>

                {/* Audio File Upload */}
                <div className="mt-6 space-y-4">
                  <Label>File nhạc</Label>
                  <div className="flex flex-col items-center space-y-4">
                    <div 
                      className="w-full border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer"
                      onClick={triggerAudioInput}
                    >
                      {audioFile ? (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Music className="h-8 w-8 text-primary mr-2" />
                            <div>
                              <p className="font-medium">{audioFile.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearAudio();
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium mb-1">Tải file nhạc lên</p>
                          <p className="text-xs text-muted-foreground">
                            MP3 (Tối đa 10MB)
                          </p>
                        </>
                      )}
                    </div>
                    
                    <input
                      type="file"
                      ref={audioInputRef}
                      onChange={handleAudioChange}
                      className="hidden"
                      accept="audio/mp3"
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? "Đang lưu..." : "Lưu bài hát"}
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

export default AddSong;
