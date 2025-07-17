import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserApi } from "@/utils/api/user";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Navbar() {
  
  const userData = localStorage.getItem("userData");
  const token: string | null = userData ? JSON.parse(userData).token : null;
  const navigate = useNavigate();

  const handleLogout=async()=>{
    const response = await UserApi.logoutUser();
    toast("Logout successful");
    navigate('/login');
  }

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/20 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  DocFlow
                </h1>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {!token ? (
                <Link to={"/login"}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    Sign In
                  </Button>
                </Link>
              ) : (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <Button onClick={handleLogout} variant={"default"}>Logout</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
