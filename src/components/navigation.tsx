// This file is likely no longer needed as navigation is handled by the new landing page.
// Keeping it for now, but it might be removed in future refactoring.
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ListChecks, 
  Brain,
  FileText, 
  Users, 
  Calculator,
  DraftingCompass, 
  KanbanSquare,
  Landmark, 
  ReceiptIndianRupee,
  Store
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tasks', label: 'Tasks', icon: ListChecks },
  { href: '/material-estimation', label: 'Material AI', icon: Brain },
  { href: '/tenders', label: 'Tenders', icon: FileText },
  { href: '/labor', label: 'Labor', icon: Users },
  { href: '/boq-calculators', label: 'BOQ Calculators', icon: Calculator },
  { href: '/architects', label: 'Architects', icon: DraftingCompass },
  { href: '/projects', label: 'Projects', icon: KanbanSquare },
  { href: '/financials', label: 'Financials', icon: Landmark },
  { href: '/gst', label: 'GST Info', icon: ReceiptIndianRupee },
  { href: '/market', label: 'Market Prices', icon: Store },
];

export default function AppNavigation() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="px-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              className={cn(
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
              )}
              tooltip={{ children: item.label, side: 'right', className: 'bg-popover text-popover-foreground' }}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
