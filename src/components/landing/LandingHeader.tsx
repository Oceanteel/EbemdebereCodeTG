
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const TgTeleflowLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="none">
    <rect width="20" height="20" x="2" y="2" rx="4" ry="4" fill="hsl(var(--primary))"/>
    <path d="m8 12 3 3 5-5" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#support", label: "Support" }, // This could link to footer section or a dedicated support page
];

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2.5">
          <TgTeleflowLogo />
          <span className="text-2xl font-bold text-primary">TgTeleFlow</span>
        </Link>
        
        {/* Desktop Navigation - Centered Links */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <nav className="flex items-center space-x-6 lg:space-x-8">
            {navLinks.map(link => (
              <Button key={link.label} variant="link" asChild className="text-base font-medium text-foreground/70 hover:text-primary hover:no-underline transition-colors">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
        </div>

        {/* Desktop Navigation - Auth Buttons */}
        <div className="hidden items-center space-x-3 md:flex">
          <Button variant="ghost" asChild className="text-base font-medium text-foreground/70 hover:text-primary hover:bg-muted transition-colors">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button 
            asChild 
            size="lg"
            className="text-base font-semibold bg-gradient-to-r from-primary to-[hsl(var(--accent))] text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-6 py-3"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg shadow-lg border-t border-border/40">
          <nav className="flex flex-col items-center space-y-2 p-6">
            {navLinks.map(link => (
              <Button key={link.label} variant="link" asChild className="text-lg text-foreground/80 hover:text-primary hover:no-underline w-full py-3" onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <div className="w-full pt-2 space-y-2">
              <Button variant="outline" asChild className="w-full text-lg py-3 border-primary text-primary hover:bg-primary/10" onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button 
                asChild 
                className="w-full text-lg py-3 bg-gradient-to-r from-primary to-[hsl(var(--accent))] text-primary-foreground shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
