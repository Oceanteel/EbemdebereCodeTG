
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Using an inline SVG for Telegram icon as lucide-react doesn't have a direct brand icon.
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


export function LandingFooter() {
  const currentYear = new Date().getFullYear();
  const telegramSupportLink = "https://t.me/YourTgTeleFlowSupport"; // Placeholder

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} TgTeleFlow. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm" asChild>
                <Link href="/privacy-policy">Privacy Policy</Link> 
            </Button>
             <Button variant="ghost" size="sm" asChild>
                <Link href="/terms-of-service">Terms of Service</Link>
            </Button>
            <Link href={telegramSupportLink} target="_blank" rel="noopener noreferrer" aria-label="Contact Support on Telegram">
              <TelegramIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
         {/* Placeholder links for privacy and terms. You'll need to create these pages. */}
        <p className="text-xs text-muted-foreground/70 text-center mt-6">
            Note: Privacy Policy and Terms of Service pages are placeholders. You need to create these.
            Remember to update the Telegram support link to your actual support channel.
        </p>
      </div>
    </footer>
  );
}
