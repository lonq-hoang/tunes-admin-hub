
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Play, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const SongTable = ({ songs, onDelete, onPlay }) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">#</TableHead>
            <TableHead>Bài hát</TableHead>
            <TableHead>Nghệ sĩ</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Thời lượng</TableHead>
            <TableHead>Năm</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={song.id} className="group hover:bg-muted/50">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 overflow-hidden rounded-md">
                    <img 
                      src={song.imageUrl} 
                      alt={song.title} 
                      className="w-full h-full object-cover"
                    />
                    {onPlay && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-white p-0"
                          onClick={() => onPlay(song.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <span className="font-medium">{song.title}</span>
                </div>
              </TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell>{song.duration}</TableCell>
              <TableCell>{song.year}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    asChild
                  >
                    <Link to={`/songs/edit/${song.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(song.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongTable;
