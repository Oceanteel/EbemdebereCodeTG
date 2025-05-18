
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutGrid, Share2, SlidersHorizontal } from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Multi-Account Mastery",
    description: "Seamlessly connect and manage all your Telegram accounts. Switch contexts, schedule for different profiles, and maintain organization with unparalleled ease.",
    bgColor: "bg-card",
  },
  {
    icon: SlidersHorizontal,
    title: "Advanced Scheduling Precision",
    description: "Take full control of your messaging timeline. Schedule posts for specific dates and times, plan campaigns, and ensure your content reaches your audience when it matters most.",
    bgColor: "bg-card",
  },
];

export function DualFeatureHighlightSection() {
  return (
    <section id="core-features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
           <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Share2 className="mr-2 h-5 w-5" />
              Core Capabilities
            </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Powering Your Telegram Strategy
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            TgTeleFlow is packed with features designed for efficiency and impact.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className={`shadow-xl border-0 ${feature.bgColor} text-card-foreground overflow-hidden flex flex-col`}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
                        <feature.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
