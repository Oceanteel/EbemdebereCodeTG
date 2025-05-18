
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-5.85c.73-.27 1.36.17 1.15.94l-2.64 12.14c-.18.84-.71 1.04-1.49.63l-4.32-3.22l-2.01 1.93c-.23.23-.42.41-.83.41z" />
  </svg>
);

const TgTeleflowLogoSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="none">
    <rect width="20" height="20" x="2" y="2" rx="4" ry="4" fill="hsl(var(--muted-foreground))"/> {/* Using muted-foreground for subtle logo */}
    <path d="m8 12 3 3 5-5" stroke="hsl(var(--background))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function LandingFooter() {
  const currentYear = new Date().getFullYear();
  const telegramSupportLink = "https://t.me/YourTgTeleFlowSupport"; // Placeholder - UPDATE THIS

  return (
    <footer className="border-t border-border/40 bg-background text-muted-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-6 flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="flex items-center space-x-2.5 mb-4">
              <TgTeleflowLogoSmall />
              <span className="text-xl font-semibold text-foreground">TgTeleFlow</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md"> 
              Transforming Telegram communication with AI-powered automation and intelligent scheduling.
            </p>
          </div>

          <div className="md:col-span-2 lg:col-span-2 text-center md:text-left">
            <h5 className="font-semibold text-foreground mb-3">Product</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2 lg:col-span-2 text-center md:text-left">
            <h5 className="font-semibold text-foreground mb-3">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2 text-center md:text-left">
             <h5 className="font-semibold text-foreground mb-3">Contact</h5>
             <a 
                href={telegramSupportLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center hover:text-primary transition-colors text-sm"
              >
                <TelegramIcon className="h-5 w-5 mr-2" /> Telegram Support
             </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 text-center text-sm">
          &copy; {currentYear} TgTeleFlow. All rights reserved.
          <p className="text-xs text-muted-foreground/70 mt-1">
            Remember to update placeholder links (Privacy, Terms, Support Telegram).
          </p>
        </div>
      </div>
    </footer>
  );
}
