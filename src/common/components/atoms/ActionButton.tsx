import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ActionButtonProps {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  showText?: boolean;
}

export const ActionButton = ({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  icon,
  showText = true,
}: ActionButtonProps) => {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md";

  const variantClasses = {
    primary: "bg-C_5EBE76 text-white",
    secondary: "bg-C_309B5F text-white",
    outline: "border border-C_5EBE76 bg-white text-C_5EBE76 ",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
  };

  return (
    <Link
      href={href}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}>
      {icon}
      {showText && <span className="hidden sm:inline">{children}</span>}
    </Link>
  );
};
