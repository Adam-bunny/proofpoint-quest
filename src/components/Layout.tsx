import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 border-b bg-card shadow-soft flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div className="hidden lg:block">
                <h1 className="font-semibold text-card-foreground">ProofWork Hub</h1>
                <p className="text-sm text-muted-foreground">Incentive Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Preview Mode Controls */}
              <div className="hidden md:flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Dashboard</Badge>
                <Badge variant="secondary" className="text-xs">Preview</Badge>
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>
              
              {/* Settings */}
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              
              {/* Share & Publish */}
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm">Share</Button>
                <Button size="sm" className="bg-gradient-primary">Publish</Button>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}