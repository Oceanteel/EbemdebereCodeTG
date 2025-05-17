"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCircle, RefreshCw, LinkOff, AlertTriangle, CheckCircle2 } from "lucide-react";
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
        return "default"; // Default is usually primary
      case "Needs Re-authentication":
        return "secondary"; // Secondary or a warning color
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
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {account.avatarUrl ? (
              <Image src={account.avatarUrl} alt={account.identifier} width={40} height={40} className="rounded-full" data-ai-hint="profile avatar" />
            ) : (
              <UserCircle className="h-10 w-10 text-muted-foreground" />
            )}
            <CardTitle className="text-lg text-foreground">{account.identifier}</CardTitle>
          </div>
          <Badge variant={getStatusBadgeVariant(account.status)} className="flex items-center gap-1">
            {getStatusIcon(account.status)}
            {account.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Manage this Telegram account's connection and chat lists.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => onRefreshChats(account.id)} className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Chats
        </Button>
        <div className="flex gap-2 w-full sm:w-auto">
          {account.status !== "Active" && (
            <Button variant="secondary" size="sm" onClick={() => onReauthenticate(account.id)} className="flex-1">
              Re-authenticate
            </Button>
          )}
          <Button variant="destructive" size="sm" onClick={() => onUnlink(account.id)} className="flex-1">
            <LinkOff className="mr-2 h-4 w-4" /> Unlink
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
