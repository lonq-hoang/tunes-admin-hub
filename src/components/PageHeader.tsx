
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  addLink?: string;
  addLabel?: string;
}

const PageHeader = ({
  title,
  description,
  addLink,
  addLabel
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      {addLink && (
        <Button 
          className="mt-4 md:mt-0 animate-float"
          asChild
        >
          <Link to={addLink}>
            <Plus className="h-4 w-4 mr-2" />
            {addLabel || "Thêm mới"}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
