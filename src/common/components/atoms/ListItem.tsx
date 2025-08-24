import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ListItemProps {
  children?: ReactNode;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export const ListItem = ({
  children,
  icon,
  title,
  subtitle,
  actions,
  className = "",
}: ListItemProps) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-C_DEDEDE p-3 hover:bg-C_F7F7F7 hover:border-C_5EBE76 transition-all duration-200 gap-3",
        className
      )}>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-C_002E2E truncate">{title}</h3>
          {subtitle && (
            <p className="text-sm text-C_6E6E6E truncate">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      )}
    </div>
  );
};
