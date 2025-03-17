
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchUser, updateUser } from "@/api";
import { ArrowLeft } from "lucide-react";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await fetchUser(parseInt(id));
        const user = response.data;
        
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.role);
      } catch (error) {
        console.error("Error loading user:", error);
        toast.error("Không thể tải thông tin người dùng");
        navigate("/users");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, [id, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !username || !email) {
      toast.error("Vui lòng điền tên người dùng và email");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const userData: any = {
        username,
        email,
        role
      };
      
      if (changePassword && password) {
        userData.password = password;
      }
      
      await updateUser(parseInt(id), userData);
      toast.success("Cập nhật người dùng thành công!");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Không thể cập nhật người dùng");
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
          onClick={() => navigate("/users")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <h1 className="text-3xl font-bold">Chỉnh sửa người dùng</h1>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Thông tin người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên người dùng</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên người dùng"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="changePassword"
                  checked={changePassword}
                  onChange={() => setChangePassword(!changePassword)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="changePassword" className="cursor-pointer">Đổi mật khẩu</Label>
              </div>
              
              {changePassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu mới</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    required={changePassword}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Vai trò</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Artist">Artist</SelectItem>
                </SelectContent>
              </Select>
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
  );
};

export default EditUser;
