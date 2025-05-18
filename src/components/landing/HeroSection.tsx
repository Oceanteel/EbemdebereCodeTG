
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/30 to-muted/50">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Manage Your Telegram Effortlessly with <span className="text-primary">TgTeleFlow</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground md:text-xl">
          Streamline your Telegram communications. Schedule messages, craft engaging content with AI, and manage multiple accounts seamlessly.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-8 py-3 text-lg">
            <Link href="/login">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-sm px-8 py-3 text-lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-muted/20 p-2 ring-1 ring-inset ring-primary/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src="https://placehold.co/1200x600.png"
              alt="TgTeleFlow App Screenshot"
              width={2432}
              height={1442}
              className="rounded-md shadow-2xl ring-1 ring-foreground/10"
              data-ai-hint="app dashboard"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
