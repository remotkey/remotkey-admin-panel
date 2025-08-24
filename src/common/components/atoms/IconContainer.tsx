import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white" | "colored";
  className?: string;
}

export const IconContainer = ({
  children,
  size = "md",
  variant = "default",
  className = "",
}: IconContainerProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const variantClasses = {
    default: "bg-C_5EBE76 bg-opacity-10",
    white: "bg-white bg-opacity-20",
    colored: "bg-C_5EBE76 bg-opacity-10",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full flex-shrink-0",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}>
      {children}
    </div>
  );
};
