
import { PageHeader } from "@/components/general/PageHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersRound, SendHorizonal, History, BotMessageSquare, LayoutDashboard, ArrowRight, Clock, CheckCircle, AlertTriangle } from "lucide-react"; // Updated icons
import Link from "next/link";
import Image from "next/image";

// Define a type for stat cards for easier management
interface StatCardItem {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  bgColorClass: string; // Tailwind class for background
  iconColorClass: string; // Tailwind class for icon color
  href?: string;
  actionText?: string;
}

export default function DashboardPage() {
  // Mock data - replace with actual data fetching
  const statsData = {
    linkedAccounts: 2,
    upcomingMessages: 5,
    sentLast24h: 12,
  };

  const statCards: StatCardItem[] = [
    {
      title: "Linked Accounts",
      value: statsData.linkedAccounts,
      description: "Manage connected Telegram profiles.",
      icon: UsersRound,
      bgColorClass: "bg-[hsl(var(--card-bg-blue))]",
      iconColorClass: "text-[hsl(var(--card-icon-blue))]",
      href: "/accounts",
      actionText: "View Accounts",
    },
    {
      title: "Upcoming Messages",
      value: statsData.upcomingMessages,
      description: "Messages scheduled to be sent soon.",
      icon: Clock, // Changed from SendHorizonal for "upcoming"
      bgColorClass: "bg-[hsl(var(--card-bg-purple))]",
      iconColorClass: "text-[hsl(var(--card-icon-purple))]",
      href: "/history",
      actionText: "View History",
    },
    {
      title: "Sent (Last 24h)",
      value: statsData.sentLast24h,
      description: "Successfully delivered recently.",
      icon: CheckCircle, // Changed from History for "sent"
      bgColorClass: "bg-[hsl(var(--card-bg-green))]",
      iconColorClass: "text-[hsl(var(--card-icon-green))]",
      href: "/history",
      actionText: "View History",
    },
     {
      title: "Needs Attention", // Example of another card
      value: 1,
      description: "Accounts requiring re-auth.",
      icon: AlertTriangle,
      bgColorClass: "bg-[hsl(var(--card-bg-orange))]",
      iconColorClass: "text-[hsl(var(--card-icon-orange))]",
      href: "/accounts",
      actionText: "Check Accounts",
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to Teleflow! Here's an overview of your activity."
        icon={LayoutDashboard}
      />

      {/* New Stat Cards - Inspired by "My Task" */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => (
          <Card key={item.title} className={`shadow-md hover:shadow-lg transition-shadow duration-300 border-0 ${item.bgColorClass} text-card-foreground overflow-hidden`}>
            <CardHeader className="pb-2">
              <div className={`p-3 rounded-lg w-fit ${item.iconColorClass} bg-background/30`}>
                <item.icon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow pt-0">
              <p className="text-sm text-muted-foreground font-medium">{item.title}</p>
              <div className="text-3xl font-bold ">{item.value}</div>
              <p className="text-xs text-muted-foreground pt-1">{item.description}</p>
            </CardContent>
            {item.href && item.actionText && (
              <CardFooter className="bg-black/5 p-3">
                <Button asChild variant="ghost" size="sm" className="w-full text-xs justify-start text-muted-foreground hover:text-foreground">
                  <Link href={item.href}>
                    {item.actionText} <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <SendHorizonal className="h-6 w-6 text-primary" />
              Schedule New Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Craft and schedule your Telegram messages with precision. Use our AI assistant for compelling content.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/scheduler">Go to Scheduler</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
               <BotMessageSquare className="h-6 w-6 text-primary" />
              AI Message Crafting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Leverage AI to generate engaging messages, especially for finance and crypto topics.
            </p>
            <Button asChild variant="outline" className="text-primary border-primary hover:bg-primary/10 hover:text-primary">
              <Link href="/scheduler#ai-assistant">Try AI Assistant</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="text-xl">Getting Started with Teleflow</CardTitle>
            <CardDescription>Follow these simple steps to get the most out of Teleflow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <UsersRound className="w-6 h-6"/>
                </div>
                <div>
                    <h3 className="font-semibold">1. Link Your Telegram Accounts</h3>
                    <p className="text-sm text-muted-foreground">Navigate to the 'Accounts' section to securely connect your Telegram profiles.</p>
                </div>
            </div>
             <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <BotMessageSquare className="w-6 h-6"/>
                </div>
                <div>
                    <h3 className="font-semibold">2. Craft Messages with AI</h3>
                    <p className="text-sm text-muted-foreground">Use the AI Assistant in the 'Scheduler' to generate engaging message drafts.</p>
                </div>
            </div>
             <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <SendHorizonal className="w-6 h-6"/>
                </div>
                <div>
                    <h3 className="font-semibold">3. Schedule & Automate</h3>
                    <p className="text-sm text-muted-foreground">Set up your messages to be sent at the perfect time to your chosen chats.</p>
                </div>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
