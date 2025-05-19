import type { Metadata } from 'next';
import { Roboto } from 'next/font/google'; // Changed from Poppins, Montserrat
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import AppNavigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Settings, LogOut } from 'lucide-react';
import { SidebarInset } from '@/components/ui/sidebar'; // Added SidebarInset

const roboto = Roboto({ // Changed to Roboto
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto', // Changed variable name
  weight: ['300', '400', '500', '700'] // Adjusted weights for Roboto
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
    <html lang="en" suppressHydrationWarning className={`${roboto.variable}`}> {/* Updated font variable */}
      <head>
        {/* Primary color from the new theme: #1946BB */}
        <meta name="theme-color" content="#1946BB" />
      </head>
      <body className="antialiased flex min-h-screen w-full bg-background"> {/* Added bg-background here for global page bg */}
        <SidebarProvider defaultOpen>
          <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border shadow-lg bg-sidebar text-sidebar-foreground">
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
          {/* Ensure SidebarInset wraps the main content area to respect sidebar dimensions */}
          <SidebarInset className="flex-1 flex flex-col overflow-y-auto bg-background"> {/* Added bg-background to SidebarInset */}
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
