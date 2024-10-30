import React from 'react';
import { Inter, Newsreader, Space_Grotesk } from 'next/font/google';
import Providers from './providers';
import "../styles/globals.css";
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ["latin"] });


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  adjustFontFallback: false,
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-newsreader-italic',
  display: 'swap',
  adjustFontFallback: false,
});


export const metadata = {
  title: "Fireforecast",
  description: "Machine learning predicting potential fires in Brazil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background font-foreground font-sans-text min-h-screen antialiased',
          inter.variable,
          spaceGrotesk.variable,
          newsreader.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}