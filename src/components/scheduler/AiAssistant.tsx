"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BotMessageSquare, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CraftTelegramMessageInput, CraftTelegramMessageOutput } from "@/ai/flows/craft-telegram-message";
import { craftTelegramMessageAction } from "@/app/(app)/scheduler/actions"; // Server action

interface AiAssistantProps {
  onDraftSelected: (draft: string) => void;
}

const topicOptions = ["Stock Market", "Cryptocurrency", "General Investment", "Community Update", "Product Announcement", "Other"];
const toneOptions = ["Professional", "Urgent", "Bullish", "Cautious", "Informative", "Engaging", "Question", "Educational", "Friendly", "Formal"];

export function AiAssistant({ onDraftSelected }: AiAssistantProps) {
  const [goal, setGoal] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState("");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [drafts, setDrafts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) {
      toast({ variant: "destructive", title: "Error", description: "Message goal/topic is required for AI assistance." });
      return;
    }
    setIsLoading(true);
    setDrafts([]);

    const input: CraftTelegramMessageInput = {
      goal,
      keyPoints: keyPoints || undefined,
      tone: tone || undefined,
      topic: topic || undefined,
      audience: audience || undefined,
    };

    try {
      const result: CraftTelegramMessageOutput | { error: string } = await craftTelegramMessageAction(input);
      if ('error' in result) {
        throw new Error(result.error);
      }
      setDrafts(result.draftMessages);
      if (result.draftMessages.length === 0) {
        toast({ title: "AI Assistant", description: "No drafts generated. Try refining your input." });
      }
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      toast({ variant: "destructive", title: "AI Error", description: error.message || "Failed to generate drafts." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card id="ai-assistant" className="shadow-lg w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <BotMessageSquare className="h-6 w-6 text-primary" />
          AI-Powered Message Crafting
        </CardTitle>
        <CardDescription>
          Let AI help you draft compelling messages. Fill in the details below and get suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="ai-goal">Goal / Topic <span className="text-destructive">*</span></Label>
            <Input
              id="ai-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Announce crypto alert, share stock insights"
              required
            />
          </div>
          <div>
            <Label htmlFor="ai-keyPoints">Key Points / Data / Links (Optional)</Label>
            <Textarea
              id="ai-keyPoints"
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="e.g., Bitcoin reaching $70k, ACME Corp earnings report, link to analysis"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ai-topic">Topic (Optional)</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger id="ai-topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {topicOptions.map(opt => <SelectItem key={opt} value={opt.toLowerCase().replace(' ', '-')}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ai-tone">Tone / Style (Optional)</Label>
               <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="ai-tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map(opt => <SelectItem key={opt} value={opt.toLowerCase()}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="ai-audience">Target Audience (Optional)</Label>
            <Input
              id="ai-audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Beginner investors, experienced traders"
            />
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Drafts
          </Button>
        </form>

        {drafts.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Generated Drafts:</h4>
            {drafts.map((draft, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm whitespace-pre-wrap">{draft}</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-2 px-0 text-primary hover:text-primary/80"
                    onClick={() => onDraftSelected(draft)}
                  >
                    Use this draft
                  </Button>
                </CardContent>
              </Card>
            ))}
             <p className="text-xs text-muted-foreground mt-2">
                AI-generated content should be reviewed before use, especially for financial topics. Teleflow is not a financial advisor.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
