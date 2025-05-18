
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BotMessageSquare, UsersRound, SendHorizonal, Clock, ShieldCheck } from 'lucide-react'; // Added ShieldCheck

const features = [
  {
    icon: BotMessageSquare,
    title: "AI Message Crafting",
    description: "Leverage AI to generate engaging and effective messages tailored for your audience and goals.",
    bgColor: "bg-[hsl(var(--card-bg-purple))]/30",
    iconColor: "text-[hsl(var(--card-icon-purple))]",
  },
  {
    icon: UsersRound,
    title: "Multi-Account Management",
    description: "Easily link and manage multiple Telegram accounts from a single, intuitive dashboard.",
    bgColor: "bg-[hsl(var(--card-bg-blue))]/30",
    iconColor: "text-[hsl(var(--card-icon-blue))]",
  },
  {
    icon: Clock, // Changed from SendHorizonal for better "scheduling" representation
    title: "Advanced Scheduling",
    description: "Schedule your messages with precision. Plan your communication strategy in advance.",
     bgColor: "bg-[hsl(var(--card-bg-orange))]/30",
    iconColor: "text-[hsl(var(--card-icon-orange))]",
  },
  {
    icon: ShieldCheck, // New icon for security
    title: "Secure & Reliable",
    description: "Built with security in mind, ensuring your data and account connections are protected.",
    bgColor: "bg-[hsl(var(--card-bg-green))]/30",
    iconColor: "text-[hsl(var(--card-icon-green))]",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose <span className="text-primary">TgTeleFlow</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to automate and enhance your Telegram presence.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 ${feature.bgColor} text-card-foreground overflow-hidden`}>
              <CardHeader className="pb-4">
                 <div className={`p-3 rounded-lg w-fit ${feature.iconColor} bg-background/50 mb-3`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
