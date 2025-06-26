// 再利用可能なボタンコンポーネント

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
}: ButtonProps) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg",
    secondary: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
  };
  
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3",
    large: "px-8 py-4 text-lg",
  };
  
  const widthClasses = fullWidth ? "w-full max-w-md" : "";
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;