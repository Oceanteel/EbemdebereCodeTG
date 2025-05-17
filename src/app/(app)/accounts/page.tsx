
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/general/PageHeader";
import { AccountCard, TelegramAccount } from "@/components/accounts/AccountCard";
import { LinkAccountDialog } from "@/components/accounts/LinkAccountDialog";
import { UsersRound, AlertTriangle, WifiOff } from "lucide-react"; // Changed Users to UsersRound
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"; // Import Card components
import { Button } from "@/components/ui/button";

// Mock data - replace with actual data fetching from Firestore
const initialAccounts: TelegramAccount[] = [
  { id: "1", identifier: "+19876543210", status: "Active", avatarUrl: "https://placehold.co/100x100.png?text=U1" },
  { id: "2", identifier: "MyBusinessChannel", status: "Needs Re-authentication", avatarUrl: "https://placehold.co/100x100.png?text=U2" },
  { id: "3", identifier: "+44123456789", status: "Error", avatarUrl: "https://placehold.co/100x100.png?text=U3" },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<TelegramAccount[]>(initialAccounts);
  const { toast } = useToast();

  const handleReauthenticate = (accountId: string) => {
    toast({ title: "Action", description: `Initiating re-authentication for account ${accountId} (mock).` });
    // Mock: set status to active after "re-auth"
    setAccounts(prev => prev.map(acc => acc.id === accountId ? {...acc, status: "Active"} : acc));
  };

  const handleUnlink = (accountId: string) => {
    setAccounts((prevAccounts) => prevAccounts.filter((acc) => acc.id !== accountId));
    toast({ title: "Success", description: `Account ${accountId} unlinked (mock).` });
  };

  const handleRefreshChats = (accountId: string) => {
    toast({ title: "Action", description: `Refreshing chat list for account ${accountId} (mock).` });
  };

  const handleAccountLinked = (identifier: string) => {
    const newAccount: TelegramAccount = {
      id: (accounts.length + 1 + Math.random()).toString(), // Ensure unique ID for mock
      identifier,
      status: "Active",
      avatarUrl: `https://placehold.co/100x100.png?text=U${accounts.length + 1}`
    };
    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    // Toast is handled in the dialog for success
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Linked Telegram Accounts"
        description="Manage your connected Telegram accounts, link new ones, or re-authenticate existing sessions."
        icon={UsersRound}
        actions={<LinkAccountDialog onAccountLinked={handleAccountLinked} />}
      />

      {accounts.length === 0 ? (
        <Card className="shadow-lg border-0 bg-card">
          <CardContent className="p-8 text-center flex flex-col items-center">
             <WifiOff className="h-24 w-24 text-muted-foreground/50 mb-6" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Accounts Linked Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connect your Telegram accounts to start scheduling messages and using AI tools. Clicking below will open a dialog to guide you through the process.
            </p>
            <LinkAccountDialog onAccountLinked={handleAccountLinked} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onReauthenticate={handleReauthenticate}
              onUnlink={handleUnlink}
              onRefreshChats={handleRefreshChats}
            />
          ))}
        </div>
      )}
       <div className="mt-8 p-4 border border-[hsl(var(--card-bg-orange))] bg-[hsl(var(--card-bg-orange))] rounded-lg shadow-sm">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-[hsl(var(--card-icon-orange))] mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-[hsl(var(--card-icon-orange))]">Important Security Note</h4>
            <p className="text-sm text-[hsl(var(--card-icon-orange))] opacity-80">
              Teleflow (in a real scenario) would securely store your Telegram session credentials. This demonstration uses mock data and does not handle real Telegram authentication or session storage. Always review permissions and be cautious when linking third-party applications to your accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
