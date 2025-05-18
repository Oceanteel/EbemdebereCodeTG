
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

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth state is not loading and a user exists, redirect to dashboard
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  // If auth state is loading, show a loader
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If user is already determined and exists (but redirect hasn't completed),
  // it's better to show loader rather than flash landing page.
  if (!loading && user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // If not loading and no user, render the landing page
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-muted/30">
      <LandingHeader />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <AiFeatureDeepDiveSection />
        <KeyBenefitsSection />
        <DualFeatureHighlightSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
