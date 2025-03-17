
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  songTitle: string;
  artistName: string;
  coverImage: string;
}

const AudioPlayer = ({
  songTitle,
  artistName,
  coverImage
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // In a real app, you'd load the actual audio file
    const audio = new Audio();
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    });
    
    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      // In a real app, this would be the actual audio file
      // audioRef.current.src = songUrl;
      audioRef.current?.play().catch(error => {
        console.error("Playback error:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };
  
  const handleProgressChange = (newValue: number[]) => {
    const value = newValue[0];
    setProgress(value);
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <Card className="border shadow-md backdrop-blur-xs bg-card/95">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={coverImage} 
              alt={songTitle} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-grow overflow-hidden">
            <h3 className="font-semibold truncate">{songTitle}</h3>
            <p className="text-sm text-muted-foreground truncate">{artistName}</p>
            
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[progress]}
                  max={100}
                  step={0.1}
                  onValueChange={handleProgressChange}
                  className="flex-grow"
                />
                <span className="text-xs text-muted-foreground w-8">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="secondary" 
              size="icon" 
              className={cn(
                "h-10 w-10 rounded-full",
                isPlaying ? "bg-primary text-primary-foreground" : ""
              )}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 ml-2 w-32">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground h-8 w-8"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={(newValue) => setVolume(newValue[0])}
              className="flex-grow"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
