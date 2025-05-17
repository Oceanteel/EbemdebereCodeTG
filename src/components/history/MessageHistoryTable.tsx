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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScheduledMessage } from "@/components/scheduler/MessageComposer"; // Reuse type
import { format } from "date-fns";
import { Edit3, Trash2, Clock, CheckCircle, XCircle, Send } from "lucide-react";
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
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-300"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case "Sent":
        return <Badge variant="default" className="bg-green-100 text-green-700 border-green-300"><CheckCircle className="mr-1 h-3 w-3" />Sent</Badge>;
      case "Failed":
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleConfirmCancel = () => {
    if (messageToCancel) {
      onCancelMessage(messageToCancel);
      toast({ title: "Message Cancelled", description: "The scheduled message has been cancelled." });
      setMessageToCancel(null);
    }
  };

  if (messages.length === 0) {
    return (
        <div className="text-center py-12 border rounded-lg bg-card shadow">
            <Send className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground">No Messages Yet</h3>
            <p className="text-muted-foreground mt-1">Your scheduled and sent messages will appear here.</p>
            <Button variant="link" className="mt-2 text-primary" asChild>
              <a href="/scheduler">Schedule a message</a>
            </Button>
        </div>
    );
  }

  return (
    <>
    <Card className="shadow-lg">
    <CardContent className="p-0">
    <Table>
      <TableCaption>A list of your scheduled and sent messages.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Scheduled Time</TableHead>
          <TableHead>Message Preview</TableHead>
          <TableHead className="w-[150px]">Target(s)</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          <TableHead className="text-right w-[150px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((msg) => (
          <TableRow key={msg.id}>
            <TableCell className="font-medium">{format(msg.scheduledTime, "PPpp")}</TableCell>
            <TableCell className="max-w-xs truncate">{msg.messageContent}</TableCell>
            <TableCell>{msg.targetChatIds.length} chat(s)</TableCell> {/* Simplified display */}
            <TableCell>{getStatusBadge(msg.status)}</TableCell>
            <TableCell className="text-right">
              {msg.status === "Pending" && (
                <div className="space-x-2">
                  <Button variant="outline" size="icon" onClick={() => onEditMessage(msg.id)} title="Edit">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon" onClick={() => setMessageToCancel(msg.id)} title="Cancel">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </CardContent>
    </Card>

    <AlertDialog open={!!messageToCancel} onOpenChange={(open) => !open && setMessageToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The message will not be sent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setMessageToCancel(null)}>Keep Message</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancel} className="bg-destructive hover:bg-destructive/90">
              Confirm Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
