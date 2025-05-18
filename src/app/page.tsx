
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { AiFeatureDeepDiveSection } from '@/components/landing/AiFeatureDeepDiveSection';
import { KeyBenefitsSection } from '@/components/landing/KeyBenefitsSection';
import { DualFeatureHighlightSection } from '@/components/landing/DualFeatureHighlightSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { PricingSection } from '@/components/landing/PricingSection'; // New

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!loading && user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LandingHeader />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <AiFeatureDeepDiveSection />
        <PricingSection />
        <KeyBenefitsSection />
        <DualFeatureHighlightSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
