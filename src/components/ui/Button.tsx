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
  const baseClasses = "font-semibold rounded-full shadow transition disabled:opacity-50";
  
  const variantClasses = {
    primary: "bg-purple-400 hover:bg-purple-500 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };
  
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-8 py-3 text-base",
    large: "px-10 py-4 text-lg",
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