import { Building } from 'lucide-react';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
      <Building className="h-7 w-7 text-primary group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
      <span className="font-semibold text-xl text-foreground group-data-[collapsible=icon]:hidden">
        BhoomiLink
      </span>
    </div>
  );
}
