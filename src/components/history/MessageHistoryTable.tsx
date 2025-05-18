
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface MessageHistoryTableProps {
  messages: ScheduledMessage[];
  onEditMessage: (messageId: string) => void;
  onCancelMessage: (messageId: string) => void;
}

export function MessageHistoryTable({ messages, onEditMessage, onCancelMessage }: MessageHistoryTableProps) {
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
        <Card className="text-center py-12 shadow-md border-0 bg-card">
          <CardContent className="flex flex-col items-center">
            <SendHorizonal className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold">No Messages Yet</h3>
            <p className="text-muted-foreground mt-1 mb-4">Your scheduled and sent messages will appear here.</p>
            <Button variant="default" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/scheduler">Schedule a Message</Link>
            </Button>
          </CardContent>
        </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            {messages.length > 0 && <TableCaption className="py-4">A list of your scheduled and sent messages.</TableCaption>}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] whitespace-nowrap">Scheduled Time</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead className="w-[150px] whitespace-nowrap">Target(s)</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="text-right w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium whitespace-nowrap">{format(msg.scheduledTime, "MMM d, yyyy 'at' p")}</TableCell>
                  <TableCell className="max-w-xs truncate hover:whitespace-normal">{msg.messageContent}</TableCell>
                  <TableCell>{msg.targetChatIds.length} chat(s)</TableCell>
                  <TableCell>{getStatusBadge(msg.status)}</TableCell>
                  <TableCell className="text-right">
                    {msg.status === "Pending" && (
                      <div className="space-x-2 flex justify-end">
                        <Button variant="outline" size="icon" onClick={() => onEditMessage(msg.id)} title="Edit Message">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <AlertDialog open={messageToCancel === msg.id} onOpenChange={(isOpen) => !isOpen && setMessageToCancel(null)}>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" title="Cancel Message" onClick={() => setMessageToCancel(msg.id)}>
                              <Trash2 className="h-4 w-4" />
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
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
