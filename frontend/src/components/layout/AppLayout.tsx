import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Top Navbar */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Branding */}
          <div
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-xl font-semibold tracking-tight">
              Clariox AI
            </h1>
            <p className="text-xs text-muted-foreground">
              Intelligent Writing Platform
            </p>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
            >
              Dashboard
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
