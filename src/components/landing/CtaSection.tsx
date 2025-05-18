
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Gift } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="relative py-20 md:py-32 bg-muted/50 overflow-hidden">
       {/* Subtle Aurora Background Effect */}
       <div 
        aria-hidden="true" 
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl opacity-50"
      >
        <div 
          className="relative left-[calc(50%+20rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[hsl(var(--accent))] to-[hsl(var(--primary))] opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent p-3 mb-8 shadow-lg">
          <Gift className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Ready to Supercharge Your Telegram?
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground md:text-xl">
          Join TgTeleFlow today and transform how you manage your Telegram communications.
          Sign up for free and experience the future of messaging automation.
        </p>
        <div className="mt-10">
          <Button 
            size="lg" 
            asChild 
            className="px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary to-[hsl(var(--accent))] text-primary-foreground shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/signup">
              Sign Up Free & Get Started
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          No credit card required for the free plan.
        </p>
      </div>
    </section>
  );
}
