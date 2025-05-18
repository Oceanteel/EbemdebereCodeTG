
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, Star } from 'lucide-react';

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals getting started with Telegram automation.",
    features: [
      "1 Linked Telegram Account",
      "Up to 10 Scheduled Messages/Month",
      "Basic AI Message Suggestions",
      "Community Support",
    ],
    cta: "Sign Up Free",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$19",
    priceSuffix: "/month",
    description: "For professionals and small teams needing more power.",
    features: [
      "5 Linked Telegram Accounts",
      "Unlimited Scheduled Messages",
      "Advanced AI Message Crafting",
      "Priority Support",
      "Access to All AI Tools",
    ],
    cta: "Get Started with Pro",
    isPopular: true,
  },
  {
    name: "Business",
    price: "$49",
    priceSuffix: "/month",
    description: "Comprehensive solution for businesses and agencies.",
    features: [
      "Unlimited Linked Accounts",
      "Unlimited Scheduled Messages",
      "Full AI Suite & Customization",
      "Dedicated Account Manager",
      "Team Collaboration Features",
    ],
    cta: "Contact Sales",
    isPopular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 shadow-sm">
            PRICING PLANS
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Choose Your Plan, Unlock Your Potential
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Simple, transparent pricing. Get started for free or choose a plan that scales with your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 ${
                tier.isPopular ? 'border-2 border-primary ring-4 ring-primary/20 relative' : 'border-border'
              } bg-card`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-x-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-foreground shadow-md">
                    <Star className="h-4 w-4" />
                    MOST POPULAR
                  </div>
                </div>
              )}
              <CardHeader className="pt-8 pb-6">
                <CardTitle className="text-2xl font-semibold text-center text-primary">{tier.name}</CardTitle>
                <div className="mt-4 text-center text-foreground">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  {tier.priceSuffix && <span className="text-base font-medium text-muted-foreground">{tier.priceSuffix}</span>}
                </div>
                <CardDescription className="mt-2 text-center text-sm text-muted-foreground h-12">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-6 p-6 border-t border-border/50">
                <Button 
                  asChild 
                  size="lg" 
                  className={`w-full font-semibold text-lg ${tier.isPopular ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                >
                  {/* For "Contact Sales", you might link to a contact page or mailto */}
                  <Link href={tier.cta === "Contact Sales" ? "mailto:sales@tgteleflow.com" : "/signup"}> 
                    {tier.cta}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
         <p className="mt-10 text-center text-sm text-muted-foreground">
            All plans come with robust security features. <ShieldCheck className="inline h-4 w-4 ml-1" />
          </p>
      </div>
    </section>
  );
}
