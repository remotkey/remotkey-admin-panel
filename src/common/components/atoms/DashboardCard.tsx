import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const DashboardCard = ({
  children,
  className = "",
  hover = true,
  onClick,
}: DashboardCardProps) => {
  const baseClasses = "rounded-2xl p-6 shadow-lg transition-all duration-300";
  const hoverClasses = hover ? "hover:scale-105 hover:shadow-2xl" : "";
  const clickClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={cn(baseClasses, hoverClasses, clickClasses, className)}
      onClick={onClick}>
      {children}
    </div>
  );
};
