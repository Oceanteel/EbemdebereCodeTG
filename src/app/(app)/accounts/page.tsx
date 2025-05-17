"use client";

import { useState } from "react";
import { PageHeader } from "@/components/general/PageHeader";
import { AccountCard, TelegramAccount } from "@/components/accounts/AccountCard";
import { LinkAccountDialog } from "@/components/accounts/LinkAccountDialog";
import { Users, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

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
      id: (accounts.length + 1).toString(),
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
        icon={Users}
        actions={<LinkAccountDialog onAccountLinked={handleAccountLinked} />}
      />

      {accounts.length === 0 ? (
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
             <Image src="https://placehold.co/300x200.png" alt="No accounts linked" width={300} height={200} className="mx-auto mb-6 rounded-lg" data-ai-hint="empty state connection" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Accounts Linked Yet</h3>
            <p className="text-muted-foreground mb-4">
              Connect your Telegram accounts to start scheduling messages and using AI tools.
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
       <div className="mt-8 p-4 border border-yellow-300 bg-yellow-50 rounded-lg shadow">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-700">Important Security Note</h4>
            <p className="text-sm text-yellow-600">
              Teleflow (in a real scenario) would securely store your Telegram session credentials. This demonstration uses mock data and does not handle real Telegram authentication or session storage. Always review permissions and be cautious when linking third-party applications to your accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
