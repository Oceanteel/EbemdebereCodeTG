
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, ArrowRight, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AiFeatureDeepDiveSection() {
  return (
    <section id="ai-feature" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1 rounded-xl bg-card p-2 shadow-2xl ring-1 ring-inset ring-primary/10 transform transition-all duration-500 hover:scale-105">
            <Image
              src="https://placehold.co/800x650.png" 
              alt="AI Message Crafting UI for TgTeleFlow"
              width={800}
              height={650}
              className="rounded-lg"
              data-ai-hint="AI message generator finance"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4 shadow-sm">
              <BrainCircuit className="mr-2 h-5 w-5" />
              AI-POWERED ASSISTANCE
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Craft Compelling Messages in Seconds
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Leverage advanced AI to generate engaging and effective Telegram messages. Whether for stock market insights, crypto updates, or general announcements, our AI helps you articulate perfectly.
            </p>
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start">
                <CheckCircleIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>Instantly generate multiple, diverse message drafts.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>Tailor content for finance, crypto, investments, and more with expert context.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>Refine tone, key points, and calls-to-action effortlessly.</span>
              </li>
               <li className="flex items-start">
                <CheckCircleIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>Ensures no financial advice is given, focuses on information delivery.</span>
              </li>
            </ul>
            <Button 
              size="lg" 
              asChild 
              className="bg-gradient-to-r from-primary to-[hsl(var(--accent))] text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8"
            >
              <Link href="/signup">
                Try AI Message Crafting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

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
