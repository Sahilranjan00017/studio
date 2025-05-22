import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed from Roboto
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Setup Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ConstructX - Digital Platform for Indian Contractors',
  description: 'One platform for every solution in your construction business journey. From tender to completion, we have got you covered with digital tools designed specifically for Indian contractors.',
  // Add other relevant metadata here if needed
};

export default function RootLayout({
  children,
  params, // Added for potential future use with dynamic routes
  searchParams, // Added for potential future use
}: Readonly<{
  children: React.ReactNode;
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* FontAwesome CDN for icons used in the landing page design */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        {/* Three.js and GSAP CDN links - these will be used by the script in page.tsx */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/gsap.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/ScrollTrigger.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/ScrollToPlugin.min.js" defer></script>
      </head>
      <body className="antialiased bg-background">
        {/* The main navigation and page content will be handled by src/app/page.tsx */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
