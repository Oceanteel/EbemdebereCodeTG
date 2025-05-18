
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCircle, RefreshCw, Link2Off, AlertTriangle, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export interface TelegramAccount {
  id: string;
  identifier: string; // Phone number or username
  status: "Active" | "Needs Re-authentication" | "Error";
  avatarUrl?: string; // Optional: if available from Telegram
}

interface AccountCardProps {
  account: TelegramAccount;
  onReauthenticate: (accountId: string) => void;
  onUnlink: (accountId: string) => void;
  onRefreshChats: (accountId: string) => void;
}

export function AccountCard({ account, onReauthenticate, onUnlink, onRefreshChats }: AccountCardProps) {
  const getStatusBadgeVariant = (status: TelegramAccount["status"]) => {
    switch (status) {
      case "Active":
        return "default"; 
      case "Needs Re-authentication":
        return "secondary"; 
      case "Error":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: TelegramAccount["status"]) => {
    switch (status) {
      case "Active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "Needs Re-authentication":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {account.avatarUrl ? (
              <Image src={account.avatarUrl} alt={account.identifier} width={40} height={40} className="rounded-full" data-ai-hint="profile avatar" />
            ) : (
              <UserCircle className="h-10 w-10 text-muted-foreground" />
            )}
            <CardTitle className="text-lg">{account.identifier}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 flex-grow"> {/* Added flex-grow */}
        <div className="flex items-center gap-2">
         {getStatusIcon(account.status)}
         <Badge variant={getStatusBadgeVariant(account.status)} className="text-xs px-2 py-0.5">
            {account.status}
          </Badge>
        </div>
        <CardDescription className="mt-2 text-sm">
          Manage this Telegram account's connection and chat lists.
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-3 pt-4 sm:flex-row sm:justify-between sm:items-center">
        <Button variant="outline" size="sm" onClick={() => onRefreshChats(account.id)} className="w-full sm:w-auto text-sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Chats
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:w-auto w-full">
          {account.status !== "Active" && (
            <Button variant="secondary" size="sm" onClick={() => onReauthenticate(account.id)} className="w-full sm:w-auto text-sm">
              Re-authenticate
            </Button>
          )}
          <Button variant="destructive" size="sm" onClick={() => onUnlink(account.id)} className="w-full sm:w-auto text-sm">
            <Link2Off className="mr-2 h-4 w-4" /> Unlink
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
