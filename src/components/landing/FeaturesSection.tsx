
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BotMessageSquare, UsersRound, Clock, ShieldCheck, Settings2 } from 'lucide-react';

const features = [
  {
    icon: BotMessageSquare,
    title: "AI Message Crafting",
    description: "Leverage AI for engaging messages tailored for finance, crypto, and more. Ensure clarity and impact.",
    bgColor: "bg-purple-500/5",
    iconColor: "text-purple-600",
  },
  {
    icon: UsersRound,
    title: "Multi-Account Management",
    description: "Link and manage multiple Telegram accounts seamlessly from one intuitive dashboard.",
    bgColor: "bg-blue-500/5",
    iconColor: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Advanced Scheduling",
    description: "Precisely schedule messages. Plan your communication strategy for optimal timing.",
    bgColor: "bg-orange-500/5",
    iconColor: "text-orange-600",
  },
  {
    icon: Settings2, 
    title: "Workflow Automation",
    description: "Automate routine tasks and message sequences to save time and improve consistency.",
    bgColor: "bg-teal-500/5",
    iconColor: "text-teal-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 shadow-sm">
            CORE CAPABILITIES
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Everything You Need, Perfectly Integrated
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            TgTeleFlow combines powerful features to streamline your Telegram communications and boost your productivity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-card text-card-foreground overflow-hidden flex flex-col group"
            >
              <CardHeader className="pb-4">
                 <div className={`p-4 rounded-lg w-fit ${feature.bgColor} group-hover:scale-110 transition-transform duration-300 mb-4`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
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
