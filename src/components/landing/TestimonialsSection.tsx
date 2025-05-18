
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon, Sparkles } from "lucide-react"; // Using QuoteIcon for better semantics
import Image from "next/image";

const testimonials = [
  {
    quote: "TgTeleFlow's AI writer is a game-changer for crafting financial updates. Scheduling is a breeze, and managing multiple crypto community channels is finally organized!",
    name: "Sarah L.",
    title: "Crypto Community Manager",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarFallback: "SL",
    aiHint: "female person professional",
  },
  {
    quote: "The ability to schedule targeted messages across different client accounts on Telegram has saved me countless hours. TgTeleFlow is efficient and incredibly user-friendly.",
    name: "Mike P.",
    title: "Digital Marketing Consultant",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarFallback: "MP",
    aiHint: "male person tech",
  },
  {
    quote: "I was looking for a reliable way to automate my stock market commentary. TgTeleFlow's scheduling and AI assistance are exactly what I needed. Highly recommended!",
    name: "Alex K.",
    title: "Independent Trader & Analyst",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarFallback: "AK",
    aiHint: "person finance",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 shadow-sm">
            <Sparkles className="mr-2 h-5 w-5" />
            USER SUCCESS STORIES
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Trusted by Professionals Like You
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear what our users are saying about how TgTeleFlow transforms their Telegram strategy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-card border-0 flex flex-col"
            >
              <CardContent className="p-8 flex flex-col flex-grow">
                <QuoteIcon className="h-10 w-10 text-primary/30 mb-6" />
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed italic flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center mt-auto pt-6 border-t border-border/50">
                  <Avatar className="h-14 w-14 mr-4 border-2 border-primary/20 p-0.5">
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                    <AvatarFallback className="text-xl">{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                    <p className="text-sm text-accent">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

