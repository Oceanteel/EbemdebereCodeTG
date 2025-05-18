
"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Menu } from "lucide-react"; // Added Menu
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"; 
import { Button } from "@/components/ui/button";

// Component to hold the trigger, to use useSidebar hook
function MobileSidebarControl() {
  const { isMobile } = useSidebar(); // We only need to know if it's mobile to decide rendering

  // The SidebarTrigger from shadcn/ui/sidebar is designed to be smart
  // It will only render if appropriate (e.g., sidebar is collapsible and not type 'none')
  // and will interact with the mobile sheet automatically.
  // We render it conditionally for mobile to place it specifically.
  if (!isMobile) {
    return null;
  }

  return (
    <div className="md:hidden p-3 fixed top-2 left-2 z-50 bg-background/80 rounded-md shadow-md">
      <SidebarTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle Menu">
          <Menu className="h-6 w-6 text-foreground" />
        </Button>
      </SidebarTrigger>
    </div>
  );
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background relative"> {/* Added relative for potential z-index context */}
          <MobileSidebarControl /> 
          {/* Ensure content starts below potential fixed header elements on mobile */}
          <div className="mt-12 md:mt-0">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
