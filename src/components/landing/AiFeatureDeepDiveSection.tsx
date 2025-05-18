
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AiFeatureDeepDiveSection() {
  return (
    <section id="ai-feature" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <BotMessageSquare className="mr-2 h-5 w-5" />
              AI-Powered Assistance
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Craft Compelling Messages in Seconds
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Leverage the power of advanced AI to generate engaging and effective Telegram messages. Whether you need to announce, inform, or persuade, our AI assistant helps you find the right words, tone, and structure.
            </p>
            <ul className="space-y-2 text-muted-foreground mb-8">
              <li className="flex items-center">
                <CheckCircleIcon className="mr-2 h-5 w-5 text-primary" />
                Generate multiple drafts instantly.
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="mr-2 h-5 w-5 text-primary" />
                Tailor messages for finance, crypto, and more.
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="mr-2 h-5 w-5 text-primary" />
                Refine tone and key points with ease.
              </li>
            </ul>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/scheduler#ai-assistant">
                Try AI Message Crafting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="rounded-xl bg-card p-2 shadow-xl ring-1 ring-inset ring-primary/10">
            {/* Placeholder for a UI snippet image or animation */}
            <Image
              src="https://placehold.co/800x600.png"
              alt="AI Message Crafting UI"
              width={800}
              height={600}
              className="rounded-md"
              data-ai-hint="AI message generator"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper Icon (can be moved to a shared icons file if used elsewhere)
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
