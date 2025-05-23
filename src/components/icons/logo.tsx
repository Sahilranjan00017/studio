// This file might be deprecated if the new landing page uses FontAwesome icons directly.
import { Building } from 'lucide-react';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
      {/* Using a generic icon as placeholder if specific logo from HTML is used directly */}
      <Building className="h-7 w-7 text-primary group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
      <span className="font-semibold text-xl text-foreground group-data-[collapsible=icon]:hidden">
        ConstructX 
      </span>
    </div>
  );
}
