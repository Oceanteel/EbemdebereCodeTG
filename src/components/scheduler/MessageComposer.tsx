"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Send, Clock, Users, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { AiAssistant } from "./AiAssistant";
import { useToast } from "@/hooks/use-toast";
import type { TelegramAccount } from "@/components/accounts/AccountCard"; // Re-use type

// Mock data
const mockAccounts: TelegramAccount[] = [
  { id: "1", identifier: "+19876543210 (Personal)", status: "Active" },
  { id: "2", identifier: "MyBusinessChannel", status: "Active" },
];

const mockChats = {
  "1": [
    { id: "chat1_1", name: "Crypto Alerts Group" },
    { id: "chat1_2", name: "Stock Discussion" },
    { id: "chat1_3", name: "John Doe (Direct)" },
  ],
  "2": [
    { id: "chat2_1", name: "Company Announcements" },
    { id: "chat2_2", name: "Marketing Team Chat" },
  ],
};

export interface ScheduledMessage {
  id: string;
  senderAccountId: string;
  targetChatIds: string[];
  messageContent: string;
  scheduledTime: Date;
  status: "Pending" | "Sent" | "Failed";
}

interface MessageComposerProps {
  onMessageScheduled: (message: ScheduledMessage) => void;
  initialMessage?: Partial<ScheduledMessage>; // For editing
}

export function MessageComposer({ onMessageScheduled, initialMessage }: MessageComposerProps) {
  const [senderAccountId, setSenderAccountId] = useState<string>(initialMessage?.senderAccountId || "");
  const [targetChatIds, setTargetChatIds] = useState<string[]>(initialMessage?.targetChatIds || []);
  const [messageContent, setMessageContent] = useState<string>(initialMessage?.messageContent || "");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(initialMessage?.scheduledTime);
  const [scheduledTime, setScheduledTime] = useState<string>(initialMessage?.scheduledTime ? format(initialMessage.scheduledTime, "HH:mm") : "10:00");
  
  const [availableChats, setAvailableChats] = useState<{ id: string; name: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (senderAccountId) {
      setAvailableChats(mockChats[senderAccountId as keyof typeof mockChats] || []);
      setTargetChatIds([]); // Reset targets when sender changes
    } else {
      setAvailableChats([]);
    }
  }, [senderAccountId]);

  const handleAiDraftSelected = (draft: string) => {
    setMessageContent(draft);
    toast({ title: "Draft Applied", description: "AI draft has been added to the message composer." });
  };

  const handleScheduleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderAccountId || targetChatIds.length === 0 || !messageContent || !scheduledDate || !scheduledTime) {
      toast({ variant: "destructive", title: "Error", description: "All fields are required to schedule a message." });
      return;
    }

    const [hours, minutes] = scheduledTime.split(":").map(Number);
    const finalScheduledTime = new Date(scheduledDate);
    finalScheduledTime.setHours(hours, minutes, 0, 0);

    if (finalScheduledTime <= new Date()) {
        toast({ variant: "destructive", title: "Error", description: "Scheduled time must be in the future." });
        return;
    }

    const newMessage: ScheduledMessage = {
      id: initialMessage?.id || crypto.randomUUID(), // Use existing ID if editing
      senderAccountId,
      targetChatIds,
      messageContent,
      scheduledTime: finalScheduledTime,
      status: "Pending",
    };
    onMessageScheduled(newMessage);
    toast({
      title: "Message Scheduled!",
      description: `Your message will be sent on ${format(finalScheduledTime, "PPP p")}.`,
      action: <CheckCircle className="text-green-500" />,
    });
    // Reset form (optional, depends if it's a modal or persistent form)
    if (!initialMessage) { // Only reset if not editing
        setSenderAccountId("");
        setTargetChatIds([]);
        setMessageContent("");
        setScheduledDate(undefined);
        setScheduledTime("10:00");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <form onSubmit={handleScheduleMessage} className="lg:col-span-2 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Send className="h-6 w-6 text-primary" />
              {initialMessage ? "Edit Scheduled Message" : "Compose & Schedule Message"}
            </CardTitle>
            <CardDescription>
              Select sender, target chats, compose your message, and set a schedule.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="senderAccount">Sending Account</Label>
              <Select value={senderAccountId} onValueChange={setSenderAccountId}>
                <SelectTrigger id="senderAccount">
                  <SelectValue placeholder="Select Telegram account" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.filter(acc => acc.status === 'Active').map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>{acc.identifier}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetChats">Target Chats/Channels</Label>
              <Select
                disabled={!senderAccountId || availableChats.length === 0}
                value={targetChatIds.length > 0 ? targetChatIds.join(',') : ""} // Simplified for single select UI, real multi-select needed
                onValueChange={(value) => setTargetChatIds(value ? value.split(',') : [])} // This needs a proper multi-select component
              >
                <SelectTrigger id="targetChats">
                  <SelectValue placeholder={!senderAccountId ? "Select sending account first" : (availableChats.length === 0 ? "No chats found" : "Select target(s)")} />
                </SelectTrigger>
                <SelectContent>
                  {availableChats.map((chat) => (
                    <SelectItem key={chat.id} value={chat.id}>{chat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">Note: UI uses single select for simplicity. Multi-select needed for full feature.</p>
            </div>

            <div>
              <Label htmlFor="messageContent">Message Content</Label>
              <Textarea
                id="messageContent"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Write your Telegram message here..."
                rows={6}
                className="min-h-[150px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scheduledDate">Schedule Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="scheduledDate"
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} // disable past dates
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="scheduledTime">Schedule Time</Label>
                <Input
                  id="scheduledTime"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" size="lg">
              <Clock className="mr-2 h-5 w-5" />
              {initialMessage ? "Update Scheduled Message" : "Schedule Message"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="lg:col-span-1">
        <AiAssistant onDraftSelected={handleAiDraftSelected} />
      </div>
      
      <div className="lg:col-span-3 mt-4 p-4 border border-yellow-300 bg-yellow-50 rounded-lg shadow">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-700">Disclaimer & Mock Functionality</h4>
            <p className="text-sm text-yellow-600">
              This scheduler uses mock data for accounts and chats. Actual message sending via Telegram API and persistent storage of scheduled messages would require backend implementation (e.g., Firebase Functions, Firestore) not included in this UI demonstration. AI suggestions should be reviewed before use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
