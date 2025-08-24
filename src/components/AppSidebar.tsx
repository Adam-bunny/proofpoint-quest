import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  FileText,
  Trophy,
  Bell,
  User,
  LogOut,
  Target
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Submit Task", url: "/submit", icon: Plus },
  { title: "My Tasks", url: "/tasks", icon: FileText },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [notificationCount] = useState(3);
  
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isExpanded = navigationItems.some((i) => isActive(i.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-gradient-primary text-primary-foreground shadow-glow font-medium"
      : "hover:bg-muted/70 transition-all duration-200";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-72"} transition-all duration-300 border-r shadow-soft`}
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        {/* App Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg text-card-foreground">ProofWork Hub</h1>
                <p className="text-xs text-muted-foreground">Incentive System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            {!collapsed ? "Navigation" : "Nav"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="ml-3 font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Notifications */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            {!collapsed ? "Updates" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="h-12">
                  <NavLink to="/notifications" className="hover:bg-muted/70 transition-all duration-200">
                    <div className="relative">
                      <Bell className="w-5 h-5" />
                      {notificationCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-5 h-5 text-xs p-0 flex items-center justify-center"
                        >
                          {notificationCount}
                        </Badge>
                      )}
                    </div>
                    {!collapsed && (
                      <span className="ml-3 font-medium">Notifications</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                BA
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1">
                <p className="font-semibold text-card-foreground">bunny adam</p>
                <p className="text-sm text-muted-foreground">User</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}