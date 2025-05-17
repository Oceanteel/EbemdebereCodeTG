
import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, icon: Icon, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8"> {/* Consistent margin */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-7 w-7 text-primary md:h-8 md:w-8" />} {/* Slightly larger icon */}
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h1> {/* Bolder and slightly larger */}
        </div>
        {actions && <div className="mt-2 md:mt-0">{actions}</div>}
      </div>
      {description && <p className="mt-2 text-base text-muted-foreground">{description}</p>} {/* Slightly larger description */}
    </div>
  );
}
