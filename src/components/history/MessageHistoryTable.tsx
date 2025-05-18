
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ScheduledMessage } from "@/components/scheduler/MessageComposer"; // Reuse type
import { format } from "date-fns";
import { Edit3, Trash2, Clock, CheckCircle, XCircle, SendHorizonal, History as HistoryIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface MessageHistoryListProps { // Renamed props interface for clarity
  messages: ScheduledMessage[];
  onEditMessage: (messageId: string) => void;
  onCancelMessage: (messageId: string) => void;
}

export function MessageHistoryTable({ messages, onEditMessage, onCancelMessage }: MessageHistoryListProps) {
  const { toast } = useToast();
  const [messageToCancel, setMessageToCancel] = useState<string | null>(null);

  const getStatusBadge = (status: ScheduledMessage["status"]) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline" className="bg-[hsl(var(--card-bg-orange))] text-[hsl(var(--card-icon-orange))] border-[hsl(var(--card-icon-orange))]"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case "Sent":
        return <Badge variant="outline" className="bg-[hsl(var(--card-bg-green))] text-[hsl(var(--card-icon-green))] border-[hsl(var(--card-icon-green))]"><CheckCircle className="mr-1 h-3 w-3" />Sent</Badge>;
      case "Failed":
        return <Badge variant="destructive" className="bg-[hsl(var(--card-bg-red))] text-[hsl(var(--card-icon-red))] border-[hsl(var(--card-icon-red))]"><XCircle className="mr-1 h-3 w-3" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleConfirmCancelAction = (idToCancel: string) => {
    onCancelMessage(idToCancel);
    toast({ title: "Message Cancelled", description: "The scheduled message has been cancelled." });
    setMessageToCancel(null);
  };

  if (messages.length === 0) {
    return (
        <Card className="text-center py-12 shadow-lg border-0 bg-card">
          <CardContent className="flex flex-col items-center">
            <HistoryIcon className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold">No Message History</h3>
            <p className="text-muted-foreground mt-1 mb-4">Your scheduled and sent messages will appear here as cards.</p>
            <Button variant="default" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/scheduler">Schedule a Message</Link>
            </Button>
          </CardContent>
        </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {messages.map((msg) => (
        <Card key={msg.id} className="shadow-lg flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardDescription className="text-xs">Scheduled Time</CardDescription>
                <CardTitle className="text-md leading-tight">{format(msg.scheduledTime, "MMM d, yyyy 'at' p")}</CardTitle>
              </div>
              {getStatusBadge(msg.status)}
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3 pt-0">
            <div>
              <CardDescription className="text-xs mb-0.5">Message</CardDescription>
              <p className="text-sm line-clamp-4">{msg.messageContent}</p>
            </div>
            <div>
              <CardDescription className="text-xs">Target(s)</CardDescription>
              <p className="text-sm font-medium">{msg.targetChatIds.length} chat(s)</p>
            </div>
          </CardContent>
          {msg.status === "Pending" && (
            <CardFooter className="border-t pt-4 mt-auto flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEditMessage(msg.id)} title="Edit Message">
                <Edit3 className="mr-2 h-4 w-4" /> Edit
              </Button>
              <AlertDialog open={messageToCancel === msg.id} onOpenChange={(isOpen) => !isOpen && setMessageToCancel(null)}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" title="Cancel Message" onClick={() => setMessageToCancel(msg.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to cancel this message?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The message will not be sent.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setMessageToCancel(null)}>Keep Message</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleConfirmCancelAction(msg.id)} className="bg-destructive hover:bg-destructive/90">
                      Confirm Cancel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}

