"use client";

import { PageHeader } from "@/components/general/PageHeader";
import { MessageComposer, ScheduledMessage } from "@/components/scheduler/MessageComposer";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SchedulerPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleMessageScheduled = (message: ScheduledMessage) => {
    // In a real app, you'd save this to Firestore
    console.log("Message scheduled (mock):", message);
    // Toast is handled in MessageComposer
    // Potentially redirect to history or clear form
    // For now, we'll just log it and the composer will show a toast.
    // A good UX might be to add it to a local list of "recently scheduled" or navigate.
    // router.push('/history'); // Optional: redirect after scheduling
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Schedule New Message"
        description="Craft, refine with AI, and schedule your Telegram messages with precision."
        icon={Send}
      />
      <MessageComposer onMessageScheduled={handleMessageScheduled} />
    </div>
  );
}
