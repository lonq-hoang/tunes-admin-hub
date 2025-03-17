
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SongCardProps {
  id: number;
  title: string;
  artist: string;
  album?: string;
  imageUrl: string;
  onDelete: (id: number) => void;
  onPlay?: (id: number) => void;
}

const SongCard = ({
  id,
  title,
  artist,
  album,
  imageUrl,
  onDelete,
  onPlay
}: SongCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-card/90 backdrop-blur-xs">
      <div className="relative group">
        <div className="aspect-square overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        {onPlay && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white h-16 w-16 rounded-full bg-primary/80 hover:bg-primary hover:scale-105 transition-all"
              onClick={() => onPlay(id)}
            >
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        <p className="text-muted-foreground truncate">{artist}</p>
        {album && <p className="text-sm text-muted-foreground mt-1">{album}</p>}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-sm"
          asChild
        >
          <Link to={`/songs/edit/${id}`}>
            <Edit className="h-4 w-4 mr-1" />
            Sửa
          </Link>
        </Button>
        
        <Button 
          variant="destructive" 
          size="sm" 
          className="flex-1 text-sm"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Xóa
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SongCard;
