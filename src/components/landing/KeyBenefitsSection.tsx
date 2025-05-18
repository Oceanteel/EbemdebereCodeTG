
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Zap, Users, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Hours Weekly",
    value: "90%",
    description: "Automate scheduling and message crafting, freeing up your valuable time.",
    bgColor: "bg-primary/5",
    iconColor: "text-primary",
    valueColor: "text-primary",
  },
  {
    icon: Zap,
    title: "Boost Engagement",
    value: "+50%",
    description: "Create more impactful messages with AI, leading to better audience interaction.",
    bgColor: "bg-accent/10", // Using accent color for variety
    iconColor: "text-accent",
    valueColor: "text-accent",
  },
  {
    icon: Users,
    title: "Streamline Management",
    value: "Effortless",
    description: "Manage multiple Telegram accounts and channels from one centralized dashboard.",
    bgColor: "bg-[hsl(var(--card-bg-green))]/30", // Using one of the dashboard card colors
    iconColor: "text-[hsl(var(--card-icon-green))]",
    valueColor: "text-[hsl(var(--card-icon-green))]",
  },
];

export function KeyBenefitsSection() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
           <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <BarChart3 className="mr-2 h-5 w-5" />
              Tangible Results
            </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why TgTeleFlow Makes a Difference
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience significant improvements in your Telegram workflow and communication strategy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className={`shadow-lg border-0 ${benefit.bgColor} text-card-foreground overflow-hidden text-center`}>
              <CardHeader className="pb-2 pt-8">
                <div className={`p-4 rounded-full w-fit mx-auto ${benefit.iconColor} bg-card mb-4`}>
                  <benefit.icon className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
                <div className={`text-5xl font-bold ${benefit.valueColor} mb-2`}>{benefit.value}</div>
                <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground px-4">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
