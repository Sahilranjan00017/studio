import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google'; // Changed from Roboto to Inter
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Setup Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// export const metadata: Metadata = {
//   title: 'BhoomiLink - Digital Platform for Indian Contractors',
//   description: 'One platform for every solution in your construction business journey. From tender to completion, we have got you covered with digital tools designed specifically for Indian contractors.',
//   // manifest: '/manifest.json', // Temporarily commented out for diagnosing hydration error
//   icons: {
//     icon: '/favicon.ico', // Standard favicon
//     apple: '/apple-touch-icon.png', // Apple touch icon
//   },
// };

// export const viewport: Viewport = {
//   themeColor: '#1946BB', // Primary color from the new theme
// };


export default function RootLayout({
  children,
  params,
  searchParams,
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
        <title>BhoomiLink</title>
        <meta name="theme-color" content="#1946BB" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/gsap.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/ScrollTrigger.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/ScrollToPlugin.min.js" defer></script>
      </head>
      <body className="antialiased bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
