
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-6 text-center">
        <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to Supercharge Your Telegram?
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground md:text-xl">
          Join TgTeleFlow today and transform how you manage your Telegram communications.
          Get started in minutes.
        </p>
        <div className="mt-10">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <Link href="/signup">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
