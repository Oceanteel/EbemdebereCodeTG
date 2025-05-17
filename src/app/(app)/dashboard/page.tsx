import { PageHeader } from "@/components/general/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Send, History, BotMessageSquare, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  // Mock data - replace with actual data fetching
  const stats = {
    linkedAccounts: 2,
    upcomingMessages: 5,
    sentLast24h: 12,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to Teleflow! Here's an overview of your activity."
        icon={LayoutDashboard}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Linked Accounts</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.linkedAccounts}</div>
            <p className="text-xs text-muted-foreground pt-1">Manage your connected Telegram accounts.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Messages</CardTitle>
            <Send className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.upcomingMessages}</div>
            <p className="text-xs text-muted-foreground pt-1">Messages scheduled to be sent.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sent (Last 24h)</CardTitle>
            <History className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.sentLast24h}</div>
            <p className="text-xs text-muted-foreground pt-1">Messages successfully delivered recently.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-foreground">
              <Send className="h-6 w-6 text-accent" />
              Schedule New Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Craft and schedule your Telegram messages with precision. Use our AI assistant for compelling content.
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/scheduler">Go to Scheduler</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-foreground">
               <BotMessageSquare className="h-6 w-6 text-accent" />
              AI Message Crafting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Leverage AI to generate engaging messages, especially for finance and crypto topics.
            </p>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
              <Link href="/scheduler#ai-assistant">Try AI Assistant</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl text-foreground">Getting Started with Teleflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Users className="w-6 h-6"/>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">1. Link Your Telegram Accounts</h3>
                    <p className="text-sm text-muted-foreground">Navigate to the 'Accounts' section to securely connect your Telegram profiles.</p>
                </div>
            </div>
             <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <BotMessageSquare className="w-6 h-6"/>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">2. Craft Messages with AI</h3>
                    <p className="text-sm text-muted-foreground">Use the AI Assistant in the 'Scheduler' to generate engaging message drafts.</p>
                </div>
            </div>
             <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Send className="w-6 h-6"/>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">3. Schedule & Automate</h3>
                    <p className="text-sm text-muted-foreground">Set up your messages to be sent at the perfect time to your chosen chats.</p>
                </div>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
