
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Subtle Aurora Background Effect */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[hsl(var(--accent))] to-[hsl(var(--primary))] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6 shadow-sm">
          <Zap className="mr-2 h-5 w-5 text-accent" />
          Telegram Automation, Reimagined
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Elevate Your Telegram with <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TgTeleFlow</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground md:text-xl">
          Intelligently manage multiple accounts, schedule messages with precision, and craft compelling financial content with our AI assistant.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-y-6 gap-x-6 sm:flex-row">
          <Button 
            size="lg" 
            asChild 
            className="px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary to-[hsl(var(--accent))] text-primary-foreground shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/signup">
              Sign Up Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="px-10 py-7 text-lg font-semibold shadow-md hover:shadow-lg hover:bg-muted transition-all duration-300">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <div className="rounded-xl bg-card p-2 shadow-2xl ring-1 ring-inset ring-primary/10 lg:rounded-2xl lg:p-3">
            <Image
              src="https://placehold.co/1200x700.png"
              alt="TgTeleFlow App Interface Mockup"
              width={2432}
              height={1442}
              className="rounded-lg shadow-xl ring-1 ring-foreground/5"
              data-ai-hint="app interface mockup"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
