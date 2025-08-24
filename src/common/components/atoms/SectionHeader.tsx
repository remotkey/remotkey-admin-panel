import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

export const SectionHeader = ({
  title,
  action,
  className = "",
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="text-xl font-semibold text-C_002E2E">{title}</h2>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
