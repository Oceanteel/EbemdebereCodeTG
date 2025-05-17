
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
  useSidebar, // Import useSidebar hook
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UsersRound, // Changed from Users
  SendHorizonal, // Changed from Send
  History,
  Settings,
  LogOut,
  // BotMessageSquare, // Not currently in navItems
  // Cable, // Not currently in navItems
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/accounts", label: "Accounts", icon: UsersRound },
  { href: "/scheduler", label: "Scheduler", icon: SendHorizonal },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

// New Teleflow Logo SVG (inspired by Taskboard logo)
const TeleflowLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="none">
    <rect width="20" height="20" x="2" y="2" rx="4" ry="4" fill="hsl(var(--sidebar-primary))"/>
    <path d="m8 12 3 3 5-5" stroke="hsl(var(--sidebar-primary-foreground))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export function AppSidebar() {
  const pathname = usePathname();
  const { logout, userProfile } = useAuth();
  const router = useRouter();
  const { state: sidebarState } = useSidebar(); // Get sidebar state

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  return (
    <Sidebar 
      collapsible="icon" 
      side="left" 
      variant="sidebar" // Standard sidebar, not floating or inset
      className="border-r bg-sidebar text-sidebar-foreground shadow-sm" // Added shadow for a bit of depth
    >
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <TeleflowLogo />
          <span className="font-semibold text-xl text-primary group-data-[collapsible=icon]:hidden">Teleflow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow p-2"> {/* Added padding to content area */}
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={item.label}
                  className={cn(
                    "justify-start w-full rounded-lg", // Ensure full width and rounded corners
                    "data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  size="lg" // Larger clickable area
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
        <div className={cn(
            "flex items-center gap-3 mb-4",
            sidebarState === 'collapsed' ? "justify-center" : ""
          )}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={userProfile?.photoURL || undefined} alt={userProfile?.displayName || "User"} />
            <AvatarFallback className="bg-muted text-muted-foreground">{getInitials(userProfile?.displayName)}</AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-sidebar-foreground truncate max-w-[120px]">{userProfile?.displayName || "User"}</p>
            <p className="text-xs text-sidebar-foreground/70 truncate max-w-[120px]">{userProfile?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            sidebarState === 'collapsed' ? "justify-center aspect-square" : "justify-start"
          )}
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
          <span className={cn("ml-2", sidebarState === 'collapsed' ? "hidden" : "group-data-[collapsible=icon]:hidden")}>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
