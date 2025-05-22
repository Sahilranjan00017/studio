import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Setup the Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Define a CSS variable for Inter
});

// Metadata (Temporarily commented out for debugging hydration issues - can be restored)
/*
export const metadata: Metadata = {
  title: 'ConstructX - Digital Platform for Indian Contractors',
  description:
    "One platform for every solution in your construction business journey. From tender to completion, we've got you covered with digital tools designed specifically for Indian contractors.",
  icons: {
    icon: '/favicon.ico', // Standard favicon
    apple: '/apple-touch-icon.png', // Apple touch icon
  },
  // manifest: '/manifest.json', // Keep manifest commented out if it was causing issues
};

export const viewport: Viewport = {
  themeColor: '#2563eb', // Primary color from the landing page theme
};
*/

export default function RootLayout({
  children,
  params, // Added as per previous fix attempt, keep for consistency
  searchParams, // Added as per previous fix attempt, keep for consistency
}: Readonly<{
  children: React.ReactNode;
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ConstructX</title>
        <meta name="theme-color" content="#2563eb" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/gsap.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/ScrollTrigger.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/ScrollToPlugin.min.js" defer></script>
      </head>
      <body className={`antialiased bg-background text-foreground pt-20`} suppressHydrationWarning={true}>
        {/* The pt-20 class adds padding-top: 5rem, matching the h-20 navbar height */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
