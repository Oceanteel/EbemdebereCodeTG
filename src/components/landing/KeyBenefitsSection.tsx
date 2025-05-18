
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Zap, Users, BarChart3, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Hours Weekly",
    value: "90%",
    description: "Automate scheduling & AI message crafting to reclaim your valuable time.",
    bgColor: "bg-primary/5",
    iconColor: "text-primary",
    valueColor: "text-primary",
  },
  {
    icon: Sparkles, // Changed from Zap
    title: "Boost Engagement",
    value: "+50%",
    description: "Create impactful, AI-refined messages for better audience interaction and results.",
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
    valueColor: "text-accent",
  },
  {
    icon: Users,
    title: "Streamline Management",
    value: "Effortless",
    description: "Manage multiple Telegram accounts from one centralized, intuitive dashboard.",
    bgColor: "bg-green-500/10", 
    iconColor: "text-green-600",
    valueColor: "text-green-600",
  },
];

export function KeyBenefitsSection() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <div className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4 shadow-sm">
              <BarChart3 className="mr-2 h-5 w-5" />
              TANGIBLE RESULTS
            </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Why TgTeleFlow Makes a Difference
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience significant improvements in your Telegram workflow, content quality, and overall communication strategy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card 
              key={benefit.title} 
              className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-card text-card-foreground overflow-hidden text-center group"
            >
              <CardHeader className="pb-4 pt-10">
                <div className={`p-5 rounded-full w-fit mx-auto ${benefit.bgColor} group-hover:scale-110 transition-transform duration-300 mb-5`}>
                  <benefit.icon className={`h-10 w-10 ${benefit.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
                <div className={`text-6xl font-extrabold ${benefit.valueColor} mb-3`}>{benefit.value}</div>
                <CardTitle className="text-2xl font-semibold mb-3">{benefit.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed px-4 pb-6">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
