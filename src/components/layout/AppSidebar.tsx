"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"; // Assuming this is the shadcn sidebar
import {
  LayoutDashboard,
  Users,
  Send,
  History,
  Settings,
  LogOut,
  BotMessageSquare,
  Cable,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/accounts", label: "Accounts", icon: Users },
  { href: "/scheduler", label: "Scheduler", icon: Send },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout, userProfile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  }

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-sidebar-primary"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.06L9.06 11.9z"></path><path d="M7.01 18.92c-1.32.95-2.99 1.07-4.24.32-1.29-.78-1.9-2.32-1.62-3.8.24-1.29.96-2.46 2.04-3.25"></path><path d="m14.94 11.9-8.06 8.06a2.85 2.85 0 1 1-4.03-4.03l8.06-8.06L14.94 11.9z"></path></svg>
          <span className="font-semibold text-xl text-sidebar-foreground group-data-[collapsible=icon]:hidden">Teleflow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userProfile?.photoURL || undefined} alt={userProfile?.displayName || "User"} />
            <AvatarFallback>{getInitials(userProfile?.displayName)}</AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-sidebar-foreground">{userProfile?.displayName || "User"}</p>
            <p className="text-xs text-sidebar-foreground/70">{userProfile?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:aspect-square"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
          <span className="group-data-[collapsible=icon]:hidden ml-2">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
