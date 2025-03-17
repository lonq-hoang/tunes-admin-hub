
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Music, 
  Album, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Settings,
  Moon,
  Sun
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Music, label: "Bài hát", path: "/songs" },
    { icon: Album, label: "Albums", path: "/albums" },
    { icon: Users, label: "Người dùng", path: "/users" },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-full w-full">
      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar h-full fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "bg-sidebar flex flex-col border-r border-sidebar-border"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            <h1 className="font-semibold text-xl text-sidebar-foreground">Music Admin</h1>
          </Link>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <Separator className="bg-sidebar-border" />
        
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "sidebar-item",
                    isActiveRoute(item.path) 
                      ? "sidebar-item-active" 
                      : "sidebar-item-inactive"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 mt-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDarkMode}
              className="flex items-center gap-2 text-sidebar-foreground"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>
          </div>
          
          <Button 
            variant={isDarkMode ? "default" : "outline"}
            className={cn(
              "w-full justify-start",
              isDarkMode 
                ? "bg-white text-black hover:bg-white/90 border border-sidebar-border" 
                : "border-sidebar-border text-black"
            )}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen && !isMobile ? "ml-64" : "ml-0"
        )}
      >
        {/* Header */}
        <header className="h-16 border-b fixed top-0 right-0 left-0 z-10 glass">
          <div className={cn(
            "flex items-center justify-between h-full px-4",
            sidebarOpen && !isMobile ? "ml-64" : "ml-0"
          )}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="text-foreground"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-foreground"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="mt-16 p-6 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
