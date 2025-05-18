
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "TgTeleFlow has completely revolutionized how I manage my Telegram communications. The AI writer is a game-changer, and scheduling is a breeze!",
    name: "Sarah L.",
    title: "Crypto Community Manager",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarFallback: "SL",
    aiHint: "female person",
  },
  {
    quote: "Managing multiple client accounts on Telegram used to be a nightmare. With TgTeleFlow, it's organized, efficient, and I'm saving so much time.",
    name: "Mike P.",
    title: "Marketing Consultant",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarFallback: "MP",
    aiHint: "male person",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Users Worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear what our users are saying about TgTeleFlow.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg bg-card border-0">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-primary/50 mb-4" />
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                    <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
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
