import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// FontAwesome CDN for icons used in the landing page design
// Three.js and GSAP CDN links - these will be used by the script in page.tsx

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// export const metadata: Metadata = {
//   title: 'BhoomiPlatform - Digital Platform for Indian Contractors',
//   description:
//     "One platform for every solution in your construction business journey. From tender to completion, we've got you covered with digital tools designed specifically for Indian contractors.",
//   // manifest: '/manifest.json', // Keep commented out for now
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
        <title>ConstructX</title> {/* Changed from BhoomiLink to ConstructX */}
        <meta name="theme-color" content="#2563eb" /> {/* Updated to new primary */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/gsap.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/ScrollTrigger.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/ScrollToPlugin.min.js" defer></script>
      </head>
      <body className="antialiased bg-background text-foreground" suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
