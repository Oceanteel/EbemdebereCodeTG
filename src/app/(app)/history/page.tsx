"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/general/PageHeader";
import { MessageHistoryTable } from "@/components/history/MessageHistoryTable";
import type { ScheduledMessage } from "@/components/scheduler/MessageComposer";
import { History, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual data fetching from Firestore
const initialMessages: ScheduledMessage[] = [
  { id: "msg1", senderAccountId: "1", targetChatIds: ["chat1_1"], messageContent: "Hello Crypto World! BTC is looking bullish.", scheduledTime: new Date(Date.now() + 3600000 * 2), status: "Pending" },
  { id: "msg2", senderAccountId: "2", targetChatIds: ["chat2_1", "chat2_2"], messageContent: "Important company update: Q3 results are out!", scheduledTime: new Date(Date.now() - 3600000 * 5), status: "Sent" },
  { id: "msg3", senderAccountId: "1", targetChatIds: ["chat1_2"], messageContent: "Stock market brief: Tech stocks rally.", scheduledTime: new Date(Date.now() + 3600000 * 24), status: "Pending" },
  { id: "msg4", senderAccountId: "1", targetChatIds: ["chat1_1"], messageContent: "This message failed to send due to an API error.", scheduledTime: new Date(Date.now() - 3600000 * 10), status: "Failed" },
];

export default function HistoryPage() {
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setMessages(initialMessages.sort((a,b) => b.scheduledTime.getTime() - a.scheduledTime.getTime()));
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEditMessage = (messageId: string) => {
    // In a real app, you'd fetch the message and navigate to scheduler page with its data
    toast({ title: "Edit Action", description: `Navigating to edit message ${messageId} (mock).`});
    // router.push(`/scheduler?edit=${messageId}`); // Example navigation
    // For now, just log
    console.log("Editing message:", messageId);
    alert("Mock: Edit functionality would take you to the scheduler with this message pre-filled.");
  };

  const handleCancelMessage = (messageId: string) => {
    // In a real app, you'd update Firestore
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
    // Toast is handled in the table component
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Message History"
        description="View the status of your past and upcoming scheduled messages. You can edit or cancel pending messages."
        icon={History}
      />
      <MessageHistoryTable
        messages={messages}
        onEditMessage={handleEditMessage}
        onCancelMessage={handleCancelMessage}
      />
    </div>
  );
}
