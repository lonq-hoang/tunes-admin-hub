
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AlbumCardProps {
  id: number;
  title: string;
  artist: string;
  year: number;
  songCount: number;
  imageUrl: string;
  onDelete: (id: number) => void;
}

const AlbumCard = ({
  id,
  title,
  artist,
  year,
  songCount,
  imageUrl,
  onDelete
}: AlbumCardProps) => {
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
        
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/60 text-white border-none">
            {year}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        <p className="text-muted-foreground truncate">{artist}</p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Music className="h-3 w-3 mr-1" />
          <span>{songCount} bài hát</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-sm"
          asChild
        >
          <Link to={`/albums/edit/${id}`}>
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

export default AlbumCard;
