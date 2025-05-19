import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import AppNavigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Settings, LogOut } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BhoomiLink - Indian Contractor Platform',
  description: 'Manage your construction projects, labor, and finances with BhoomiLink.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#D97706" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen w-full`}>
        <SidebarProvider defaultOpen>
          <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border shadow-md">
            <SidebarHeader className="p-4">
              <div className="flex items-center justify-between">
                <Logo />
                <SidebarTrigger className="hidden md:group-data-[collapsible=icon]:flex" />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <AppNavigation />
            </SidebarContent>
            <SidebarFooter className="p-4 mt-auto">
               {/* Placeholder for user profile/settings - future enhancement */}
              <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Settings className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <LogOut className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex-1 flex flex-col overflow-y-auto">
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
