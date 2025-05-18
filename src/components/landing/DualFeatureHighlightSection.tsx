
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, Share2, SlidersHorizontal, Settings, ListChecks, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Multi-Account Mastery",
    description: "Seamlessly connect, manage, and switch between all your Telegram accounts. Organize profiles, schedule for different identities, and maintain full control with unparalleled ease from a single hub.",
    imgSrc: "https://placehold.co/600x400.png",
    imgAlt: "Multi-account management interface",
    aiHint: "dashboard accounts",
  },
  {
    icon: SlidersHorizontal,
    title: "Advanced Scheduling Precision",
    description: "Take full command of your messaging timeline. Schedule posts, announcements, and campaigns for specific dates and times. Ensure your content reaches your audience when it matters most, globally.",
    imgSrc: "https://placehold.co/600x400.png",
    imgAlt: "Advanced scheduling interface",
    aiHint: "calendar schedule",
  },
];

export function DualFeatureHighlightSection() {
  return (
    <section id="core-features-detailed" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 shadow-sm">
              <ListChecks className="mr-2 h-5 w-5" />
              POWERFUL & INTUITIVE
            </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Streamline Your Telegram Workflow
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            TgTeleFlow is engineered with features designed for maximum efficiency, impact, and ease of use.
          </p>
        </div>
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div key={feature.title} className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 !== 0 ? "md:grid-flow-row-dense" : ""}`}>
              <div className={`rounded-xl bg-card p-2 shadow-2xl ring-1 ring-inset ring-primary/10 transform transition-all duration-500 hover:scale-105 ${index % 2 !== 0 ? "md:col-start-2" : ""}`}>
                <Image
                  src={feature.imgSrc}
                  alt={feature.imgAlt}
                  width={600}
                  height={400}
                  className="rounded-lg"
                  data-ai-hint={feature.aiHint}
                />
              </div>
              <div className={`${index % 2 !== 0 ? "md:col-start-1" : ""}`}>
                <div className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent mb-3 shadow-sm">
                  <feature.icon className="mr-2 h-4 w-4" />
                  {feature.title.toUpperCase()}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary hover:shadow-md transition-all duration-300">
                  <Link href="/signup">Explore Feature</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
